import React, { Component } from "react";
import { Button, message, Select} from "antd";
import masterDataRede from "../../apis/masterDataRede";
const { Option } = Select;

class PathToLineComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: "",
      linePaths:[],
      allLines: null,
      allLinePaths: null,
      display: false,
      updateKey: "",
      updateName: "",
      updateColor: []
    };
    this.getLinesRequest();
    this.getLinePathsRequest();
  }

  getLinesRequest = async () => {
    const response = await masterDataRede.get("/lines/complete");
    this.setState({allLines: response.data.lines});
  };

  getLinePathsRequest = async () => {
    const response = await masterDataRede.get("/linePaths/complete");
    this.setState({allLinePaths: response.data.linePaths,});
  };

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  onChangeLines = (value) => {
    this.setState({ line: value });
  };

  onChangeLinePaths = (value) => {
    this.setState({ linePaths: value });
  };

  handleSubmit = async () => {
    
    if (this.state.line == "") {
        message.error("Please choose a Line.");
    } else if (this.state.linePaths.length == 0) {
        message.error("Please choose at least one LinePath.");
    } else {
        await masterDataRede.get(`/lines/${this.state.line}`).then(async (lineData)=>{
            await masterDataRede.put(`/lines/${this.state.line}`, {
                key: lineData.data.line.key,
                name: lineData.data.line.name,
                color: lineData.data.line.color,
                linePaths: this.state.linePaths,
            });
        });
        
        message.success("LinePath/s successfully added to the Line.");
  
        this.setState({
          line: "",
          linePaths: []
        });
    }
  };

  reload = async () => {
    await this.getLinesRequest();
    await this.getLinePathsRequest();
  }

  render() {
    let pageContent = <div></div>;
    let linesArray;
    let linePathsArray;

    if (this.state.display) {
      if (this.state.allLines != null && this.state.allLinePaths != null) {
        linesArray = [];
        linePathsArray = [];

        this.state.allLines.map((line) => {
          linesArray.push(<Option value={line._id}>{line.key} - {line.name}   |   RGB({line.color[0]}, {line.color[1]}, {line.color[2]})</Option>);
        });
        
        this.state.allLinePaths.map((lp) => {
            linePathsArray.push(<Option value={lp._id}>{lp.key} - {lp.orientation}</Option>);
        });
      }

      pageContent = (
        <div>
          <p><Button onClick={this.reload} style={{width: 75, height: 30}} type="primary">Reload</Button></p>
          <p>Line: <Select allowClear style={{ width: "100%" }} placeholder="Choose a Line you wish to add a Path to." 
             value={this.state.line} onChange={this.onChangeLines}>{linesArray}</Select><br/></p>
          <p>Line Path: <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Choose the Line Path you wish to add." 
             value={this.state.linePaths} onChange={this.onChangeLinePaths}>{linePathsArray}</Select><br/></p>

          <p><Button onClick={this.handleSubmit} type="primary">Add Path/s to Line</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}
export default PathToLineComp;