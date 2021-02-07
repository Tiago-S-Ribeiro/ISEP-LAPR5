import React, { Component } from "react";
import { Input, Button, message, Select } from "antd";
import masterDataRede from "../../apis/masterDataRede";
const { Option } = Select;

class LinePathCreationComp extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      key: "",
      path: "",
      orientation: "Go",
      pathsList: null,
      display: false
    };
    this.getPathsRequest();
  }

  getPathsRequest = async () => {
    const response = await masterDataRede.get("/paths/complete");
    this.setState({
      pathsList: response.data.paths,
    });
    //console.log(this.state)
  };

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  handleSubmit = async () => {
    console.log(this.state)
    if(this.state.key.length > 20 || this.state.key.length < 1) {
      message.error("Key is invalid. It's null or has more than 20 chars.");
    }else{
      const response = await masterDataRede.post("/linePaths", {
        key: this.state.key,
        path: this.state.path,
        orientation: this.state.orientation,
      });
      //console.log(this.state)
      
      message.success("Line Path successfully created.");
  
      console.log(response.data);
  
      this.setState({
        key: "",
        path: "",
        orientation: "",
      });
    }
  };

  onChange = async ({ target: { id, value } }) => {
    this.setState({ [id]: value });
    await this.getPathsRequest();
  };

  onChangePath = (value) => {
    this.setState({ path: value });
  };

  onChangeOrientation = (value) => {
    this.setState({ orientation: value });
  };

  render() {
    let pageContent = <div></div>;

    let pathOptions;

    if (this.props.display) {
      if (this.state.pathsList != null) {
        pathOptions = [];

        this.state.pathsList.map((path) => {
          pathOptions.push(<Option value={path._id}>{path.key}</Option>);
        });
      }
      pageContent = (
        <div><p>Key: <Input id="key" value={this.state.key} onChange={this.onChange} placeholder="e.g. (LinePath: X)"/></p>
          <p>Path: <Select style={{ width: 200 }} onChange={this.onChangePath}>{pathOptions}</Select></p>
          <p>Orientation: <Select defaultValue="Go" style={{ width: 157 }} onChange={this.onChangeOrientation}>
              <Option value="Return">Return</Option>
              <Option value="Go">Go</Option>
          </Select></p>
          <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default LinePathCreationComp;