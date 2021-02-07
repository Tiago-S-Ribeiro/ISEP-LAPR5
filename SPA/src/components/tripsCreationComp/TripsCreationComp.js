import React, { Component } from "react";
import { Input, Button, message, TimePicker, Select, InputNumber } from "antd";
import masterDataRede from "../../apis/masterDataRede";
import masterDataViagem from "../../apis/masterDataViagem";

const { Option } = Select;
const format = 'HH:mm';

class TripsCreationComp extends Component {

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
      pathNodesAtm: [],
      frequency: 10,
      totalNumberOfTrips: 0,
      durations: [],
      durationsReturn: [],
      passingTimesReturn: []
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
      message.error("Must choose a Line.");
    }else if(this.state.Path.length < 1){
      message.error("Must choose the 'Go' Path.");
    }else if(this.state.leavingTime === -1 || this.state.endTime === -1){
      message.error("Choose a start/end hour for the trips.");
    }else if(this.state.leavingTime >= this.state.endTime){
        message.error("Invalid times. Starting hour must be earlier than the end hour.");
    } else {
      for(var i = 0; i < this.state.totalNumberOfTrips; i++){
        if(i < 2){
          if(this.state.Path === this.state.pathsOfLine[0].key){
            console.log("GO: " + this.state.pathsOfLine[0].key)              
            console.log(this.state.PassingTimes)                             
            
            await masterDataViagem.post("/api/Trips", {
                Key: this.state.Key,
                Line: this.state.Line,
                Path: this.state.Path,
                PassingTimes: this.state.PassingTimes
            }); 

            await this.setState({Path : this.state.pathsOfLine[1].key});   //switch

          }else{
            console.log("RETURN: " + this.state.pathsOfLine[1].key)            
            console.log(this.state.passingTimesReturn)              

            await masterDataViagem.post("/api/Trips", {
                Key: this.state.Key,
                Line: this.state.Line,
                Path: this.state.Path,
                PassingTimes: this.state.passingTimesReturn
            });   
            
            await this.setState({Path : this.state.pathsOfLine[0].key});    //switch
          }
        }else{
          this.updateGoPassingTimes();
          if(this.state.Path === this.state.pathsOfLine[0].key){
            console.log("GO: " + this.state.pathsOfLine[0].key)             
            console.log(this.state.PassingTimes)                    

            await masterDataViagem.post("/api/Trips", {
                Key: this.state.Key,
                Line: this.state.Line,
                Path: this.state.Path,
                PassingTimes: this.state.PassingTimes
            });  
            await this.setState({Path : this.state.pathsOfLine[1].key});   //switch
          }else{
            this.updateReturnTimes();
            console.log("RETURN: " + this.state.pathsOfLine[1].key)              
            console.log(this.state.passingTimesReturn)             

            await masterDataViagem.post("/api/Trips", {
                Key: this.state.Key,
                Line: this.state.Line,
                Path: this.state.Path,
                PassingTimes: this.state.passingTimesReturn
            });
            await this.setState({Path : this.state.pathsOfLine[0].key});    //switch
          }
        }
      }

      message.success("Trip successfully created.");
      //RESET
      this.setState({
        Key: "",
        Line: "",
        Path: "",
        PassingTimes: [],
        pathsOfLine: [],
        leavingTime: -1,
        flag: true,
        currentLinePathIDS: [],
        pathNodesAtm: [],
        frequency: 10,
        totalNumberOfTrips: 0,
        durations: [],
        durationsReturn: [],
        passingTimesReturn: []
      });
    }
  };
  
    updateGoPassingTimes = async () => {
      var aux = [];
      for(var i = 0; i < this.state.PassingTimes.length; i++){
        aux.push(this.state.PassingTimes[i] + this.state.frequency)
      }
      await this.setState({PassingTimes : aux})
    }

    updateReturnTimes = async () => {
      var aux = [];
      for(var i = 0; i < this.state.passingTimesReturn.length; i++){
        aux.push(this.state.passingTimesReturn[i] + this.state.frequency)
      }
      await this.setState({passingTimesReturn : aux})
    }

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

    onChangeStartTime = async (value) => {
        var dateString = value._d.toString().concat(":00");
        var hhmm = dateString.slice(16, dateString.length - 45);
        var aux = hhmm.split(':');
        var seconds = (+aux[0])*60*60 + (+aux[1])*60 + (+aux[2]); 

        await this.setState({ leavingTime: seconds});

        var passingTimesArray = [];
        var passingTimesReturnArray = [];
        passingTimesArray.push(seconds);
        var durationsArray = [];

        for(var l = 1; l < this.state.pathNodesAtm.length; l++){
          durationsArray.push(this.state.pathNodesAtm[l].duration);
          passingTimesArray.push(passingTimesArray[l-1] + this.state.pathNodesAtm[l].duration);
        }

        await this.setState({ PassingTimes: passingTimesArray});
        await this.setState({ durations: durationsArray});
        await this.setState({ durationsReturn: this.reverseArr(durationsArray)});

        passingTimesReturnArray.push(this.state.PassingTimes[passingTimesArray.length-1]);
        
        for(var k = 1; k < this.state.pathNodesAtm.length; k++){
          passingTimesReturnArray.push(passingTimesReturnArray[k-1] + this.state.durationsReturn[k-1]);
        }

        await this.setState({ passingTimesReturn: passingTimesReturnArray});
    }

    onChangeFrequency = async (value) => {
        this.setState({ frequency: value * 60 });
    }

    onChangeTotalTrips = async (value) => {
        this.setState({ totalNumberOfTrips: value });
    }

    reverseArr = (input) => {
      var returnArray = [];
      for(var i = input.length-1; i >= 0; i--) {
          returnArray.push(input[i]);
      }
      return returnArray;
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
            <p>Key: <Input id="Key" value={this.state.Key} style={{width: 328}} onChange={this.onChange} placeholder="e.g. Trip: X"/></p>
            <p>Choose Line: <Select style={{ width: 274 }} onChange={this.onChangeLine}>{lineOptions}</Select></p>
            <p>Go/Return Paths: <Select style={{ width: 250 }} disabled={this.state.flag} onChange={this.onChangePath}>{pathOptions}</Select></p><br></br>
            
            <p>Choose Starting Time: <TimePicker onChange={this.onChangeStartTime} style={{width: 175}} format={format} /></p>
            <p>Frequency (Minutes): <InputNumber style={{width: 181}} min={10} defaultValue={this.state.frequency} onChange={this.onChangeFrequency}/></p>
            
            <p>Total Number of Trips: <InputNumber style={{width: 175}} disabled={this.state.totalNumFlag} min={1} max={100} onChange={this.onChangeTotalTrips}/></p>
            
            <br></br><br></br><br></br>
            <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
    }
}

export default TripsCreationComp;