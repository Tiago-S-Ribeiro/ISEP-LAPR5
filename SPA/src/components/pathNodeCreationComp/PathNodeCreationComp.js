import React, { Component } from "react";
import { Input, Button, InputNumber, Select, message } from "antd";
import masterDataRede from "../../apis/masterDataRede";
const { Option } = Select;

class PathNodeCreationComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      node: "",
      duration: 500,
      distance: 1000,
      nodeList: null,
      display: false,
    };
    this.getNodesRequest();
  }

  getNodesRequest = async () => {
    const response = await masterDataRede.get("/nodes/complete");
    this.setState({
      nodeList: response.data.nodes,
    });
  };

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  handleSubmit = async () => {

    if (this.state.key.length > 20 || this.state.key.length < 1) {
      message.error("Key is invalid. It's null or has more than 20 chars");
    
    } else {
      const response = await masterDataRede.post("/pathNodes", {
        key: this.state.key,
        node: this.state.node,
        duration: this.state.duration,
        distance: this.state.distance,
      });

      message.success("PathNode successfully created.");

      console.log(response.data);

      this.setState({
        key: "",
        node: "",
        duration: 500,
        distance: 1000,
      });
    }
  };

  onChangeKey = async ({ target: { id, value } }) => {
    this.setState({ [id]: value });
    await this.getNodesRequest();
  };

  onChangeDuration = (value) => {
    this.setState({ duration: value });
  };

  onChangeDistance = (value) => {
    this.setState({ distance: value });
  };

  onChangeNode = (value) => {
    this.setState({ node: value });
  };

  render() {
    let pageContent = <div></div>;

    let nodeOptions;
    if (this.state.display) {
      if (this.state.nodeList != null) {
        nodeOptions = [];
        
        this.state.nodeList.map((node) => {
          nodeOptions.push(<Option value={node._id}>{node.name}</Option>);
        });
      }

      pageContent = (
        <div>
          <p>Key: <Input id="key" value={this.state.key} onChange={this.onChangeKey} placeholder="e.g. (PathNode: X)"/></p>
          <p>Node: <Select style={{ width: 200 }} onChange={this.onChangeNode}>{nodeOptions}</Select></p>
          <p>Duration: <InputNumber id="duration" min={0} style={{ width: 180 }} max={5000} defaultValue={this.state.duration} onChange={this.onChangeDuration}/></p>
          <p>Distance: <InputNumber id="distance" min={0} style={{ width: 180 }} max={9999} defaultValue={this.state.distance} onChange={this.onChangeDistance}/></p>
          
          <br/><p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default PathNodeCreationComp;