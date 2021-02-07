import React, { Component } from "react";
import { Input, Button, message, TimePicker, Select } from "antd";
import masterDataRede from "../../apis/masterDataRede";
import masterDataViagem from "../../apis/masterDataViagem";
//import moment from 'moment';

const { Option } = Select;
const format = 'HH:mm';

class TripCreationAdHocComp extends Component {

    constructor(props) {
    super(props);
    this.state = {
      Key: "",
      Line: "",
      Path: "",
      PassingTimes: [],
      allLines: null,
      allPaths: [],
      allLinePaths: [],
      allPathNodes: [],
      pathsOfLine: [],
      display: false,
      leavingTime: -1,
      flag: true,
      currentLinePathIDS: [],
      pathNodesAtm: []
    };
    this.getLinesRequest();
    this.getLinePathsRequest();
    this.getPathsRequest();
    this.getPathNodesRequest();
  }

  getLinesRequest = async () => {
    const response = await masterDataRede.get("/lines");
    this.setState({allLines: response.data.lines});
  };

  getLinePathsRequest = async () => {
    const response = await masterDataRede.get("/linePaths/complete");
    this.setState({allLinePaths: response.data.linePaths});
  };

  getPathsRequest = async () => {
    const response = await masterDataRede.get("/paths/complete");
    this.setState({allPaths: response.data.paths});
  };

  getPathNodesRequest = async () => {
    const response = await masterDataRede.get("/pathNodes/complete");
    this.setState({allPathNodes: response.data.pathNodes});
  };

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  handleSubmit = async () => {
    if(this.state.Key.length > 20 || this.state.Key.length < 1) {
      message.error("Key is invalid. It's null or has more than 20 chars.");
    }else if(this.state.Line.length < 1){
      message.error("Must choose a line.");
    }else if(this.state.Path.length < 1){
      message.error("Must choose a Path.");
    }else if(this.state.leavingTime === -1){
      message.error("Choose a starting hour for the trip.");
    }else{
      await masterDataViagem.post("/api/Trips", {
        Key: this.state.Key,
        Line: this.state.Line,
        Path: this.state.Path,
        PassingTimes: this.state.PassingTimes
      });

      message.success("Trip successfully created.");

      this.setState({
        Key: "",
        Line: "",
        Path: "",
        PassingTimes: [],
        pathsOfLine: [],
        leavingTime: -1,
        flag: true,
        currentLinePathIDS: [],
        pathNodesAtm: []
      });
    }
  };

  onChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  onChangeLine = async (value) => {
    const found = this.state.allLines.find(line => line.key === value);
    await this.setState({ Line: value, flag: false, currentLinePathIDS: found.linePaths});
    
    var auxArray = [];
    this.state.currentLinePathIDS.map(linePathID => {
        for(var i = 0; i < this.state.allLinePaths.length; i++){
            if(linePathID === this.state.allLinePaths[i]._id){
                auxArray.push(this.state.allLinePaths[i]);
            }
        }
    })

    var auxPathsArray = [];
    await auxArray.map(linePath => {
        for(var j = 0; j < this.state.allPaths.length; j++){
            if(linePath.path === this.state.allPaths[j]._id){
                auxPathsArray.push(this.state.allPaths[j]);
            }
        }
    })
    await this.setState({ pathsOfLine: auxPathsArray}); 
  };

  onChangePath = async (value) => {
    
    const found = this.state.pathsOfLine.find(path => path.key === value); 
    await this.setState({ Path: value});                                    

    var pathNodesArray = [];
    found.pathNodes.map(pathNodeID => {
      for(var k = 0; k < this.state.allPathNodes.length; k++){
        if(pathNodeID === this.state.allPathNodes[k]._id){
          pathNodesArray.push(this.state.allPathNodes[k]);
        }
      }
    });
    this.setState({ pathNodesAtm: pathNodesArray});
  }

  onChangeTime = async (value) => {
    var dateString = value._d.toString().concat(":00");
    var hhmm = dateString.slice(16, dateString.length - 45);
    var aux = hhmm.split(':');
    var seconds = (+aux[0])*60*60 + (+aux[1])*60 + (+aux[2]); 

    await this.setState({ leavingTime: seconds});
    
    var passingTimesArray = [];
    passingTimesArray.push(seconds);
    
    for(var l = 1; l < this.state.pathNodesAtm.length; l++){
      passingTimesArray.push(passingTimesArray[l-1] + this.state.pathNodesAtm[l].duration);
    }
    await this.setState({ PassingTimes: passingTimesArray});
  }

  render() {
    let pageContent = <div></div>;
    let lineOptions;
    let pathOptions;

    if (this.state.display) {
        if (this.state.allLines != null) {
            lineOptions = [];
            pathOptions = [];
         
            this.state.allLines.map((line) => {
                lineOptions.push(<Option value={line.key}>{line.name}</Option>);
            });
            this.state.pathsOfLine.map((path) => {
                pathOptions.push(<Option value={path.key}>{path.key}</Option>);
            });
        }
      pageContent = (
        <div>
            <p>Key: <Input id="Key" value={this.state.Key} style={{width: 285}} onChange={this.onChange} placeholder="e.g. Trip: X"/></p>
            <p>Choose Line: <Select style={{ width: 232 }} onChange={this.onChangeLine}>{lineOptions}</Select></p>
            <p>Line's Paths: <Select style={{ width: 236 }} disabled={this.state.flag} onChange={this.onChangePath}>{pathOptions}</Select></p>
            Choose Starting Time: <TimePicker onChange={this.onChangeTime} style={{width: 175}} format={format} />
            <br></br><br></br><br></br>
            <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default TripCreationAdHocComp;

//defaultValue={moment('00:00', format)}   Clock Default