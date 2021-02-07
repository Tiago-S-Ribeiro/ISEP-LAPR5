import React, { Component } from "react";
import { Input, Button, message, Select } from "antd";
import masterDataRede from "../../apis/masterDataRede";
import { SliderPicker } from "react-color";

const { Option } = Select;

class LineCreationComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      name: "",
      color: [],
      linePaths: [],
      allLinePaths: null,
      display: false,
      allLinesAtm: []
    };
    this.getLinePathsRequest();
    this.getLines();
  }

  getLinePathsRequest = async () => {
    const response = await masterDataRede.get("/linePaths/complete");
    this.setState({
      allLinePaths: response.data.linePaths,
    });
  };

  getLines = async () => {
    const response = await masterDataRede.get("/lines");
    this.setState({allLinesAtm: response.data.lines});
  };

  doesLineExist = async (value) => {
    var exists = false;
    for(var i = 0; i < this.state.allLinesAtm.length; i++) {
      if (this.state.allLinesAtm[i].key === value) {
        exists = true;
        break;
      }
    }
    return exists;
  }

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  onChange = async ({ target: { id, value } }) => {
    this.setState({ [id]: value });
    await this.getLinePathsRequest();
  };

  onChangeLinePaths = (value) => {
    this.setState({ linePaths: value });
  };

  handleChangeComplete = (color) => {
    let rgbCombo = [];

    rgbCombo.push(color.rgb.r);
    rgbCombo.push(color.rgb.g);
    rgbCombo.push(color.rgb.b);

    this.setState({ color: rgbCombo });
  };

  handleSubmit = async () => {
    if (this.state.key.length > 20 || this.state.key.length < 1) {
      message.error("Key is invalid. It's null or has more than 20 chars.");
    } else if (this.state.name.length > 20 || this.state.name.length < 1) {
      message.error("Name is invalid. It's null or has more than 200 chars.");
    } else if(await this.doesLineExist(this.state.key)){
      message.error("Error. Line already exists.");
    }else {
      await masterDataRede.post("/lines", {
        key: this.state.key,
        name: this.state.name,
        color: this.state.color,
        linePaths: this.state.linePaths,
      });

      message.success("Line successfully created.");
      const allLines = await masterDataRede.get("/lines");
      await this.setState({allLinesAtm: allLines.data.lines})

      this.setState({
        key: "",
        name: "",
        color: [],
        linePaths: [],
      });
    }
  };

  render() {
    let pageContent = <div></div>;
    let linePathsArr;

    if (this.state.display) {
      if (this.state.allLinePaths != null) {
        linePathsArr = [];

        this.state.allLinePaths.map((lp) => {
          linePathsArr.push(<Option value={lp._id}>{lp.key}</Option>);
        });
      }

      pageContent = (
        <div>
          <p>Key: <Input id="key" value={this.state.key} onChange={this.onChange} placeholder="e.g. (Line: X)"/></p>
          <p>Name: <Input id="name" value={this.state.name} onChange={this.onChange} placeholder="e.g. San Francisco - Oakland"/></p>
          <p>Color: <SliderPicker color={this.state.color} onChangeComplete={this.handleChangeComplete}/></p>
          <p>Line Paths: <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Choose Line Paths" 
             value={this.state.linePaths} onChange={this.onChangeLinePaths}>{linePathsArr}</Select><br/></p>
          <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }

    return <div>{pageContent}</div>;
  }
}

export default LineCreationComp;