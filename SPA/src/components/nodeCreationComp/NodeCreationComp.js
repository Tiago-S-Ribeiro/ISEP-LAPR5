import React, { Component } from "react";
import { Switch, Input, Button, message } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class NodeCreationComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      name: "",
      latitude: "",
      longitude: "",
      shortName: "",
      isDepot: false,
      isReliefPoint: false,
      allNodesAtm: []
    };
    this.getNodes();
  }

  getNodes = async () => {
    const response = await masterDataRede.get("/nodes");
    this.setState({allNodesAtm: response.data.nodes});
  };

  doesNodeExist = async (value) => {
    var exists = false;
    for(var i = 0; i < this.state.allNodesAtm.length; i++) {
      if (this.state.allNodesAtm[i].key === value) {
        exists = true;
        break;
      }
    }
    return exists;
  }

  handleSubmit = async () => {

    if(this.state.key.length > 20 || this.state.key.length < 1) {
      message.error("Key is invalid. It's null or has more than 20 chars.");
    }else if(this.state.name.length > 200 || this.state.name.length < 1){
      message.error("Name is invalid. It's null or has more than 200 chars.");
    }else if(this.state.latitude > 90 || this.state.latitude < -90){
      message.error("Latitude is invalid. (Max: 90 Min: -90)");
    }else if(this.state.longitude > 180 || this.state.longitude < -180){
      message.error("Longitude is invalid. (Max: 180 Min: -180)");
    }else if(this.state.shortName.length > 10 || this.state.shortName.length < 1){
      message.error("Short Name is invalid. It's null or has more than 10 chars.");
    } else if(await this.doesNodeExist(this.state.key)){
      message.error("Error. Node already exists.");
    }else{
      const response = await masterDataRede.post("/nodes", {
        key: this.state.key,
        name: this.state.name,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        shortName: this.state.shortName,
        isDepot: this.state.isDepot,
        isReliefPoint: this.state.isReliefPoint,
      });
  
      message.success("Node successfully created.");
      console.log(response.data);

      const allNodes = await masterDataRede.get("/nodes");
      await this.setState({allNodesAtm: allNodes.data.nodes})
  
      this.setState({
        key: "",
        name: "",
        latitude: "",
        longitude: "",
        shortName: "",
        isDepot: false,
        isReliefPoint: false,
      });
    }
  };

  onChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  onChangeSwitchDepot = (checked) => {
    this.setState({ isDepot: checked });
  };

  onChangeSwitchRelief = (checked) => {
    this.setState({ isReliefPoint: checked });
  };

  render() {
    let pageContent = <div></div>;

    if (this.props.display) {
      pageContent = (
        <div><p>Key: <Input id="key" value={this.state.key} onChange={this.onChange} placeholder="e.g. (Node: X)"/></p>
          <p>Name: <Input id="name" value={this.state.name} onChange={this.onChange} placeholder="e.g. San Francisco, Bay Area"/></p>
          <p>ShortName: <Input id="shortName" value={this.state.shortName} onChange={this.onChange} placeholder="e.g. SFBA"/></p>
          <p>Latitude: <Input id="latitude" style={{ width: 312 }} value={this.state.latitude} onChange={this.onChange} placeholder="e.g. 22.593726"/></p>
          <p>Longitude: <Input id="longitude" style={{ width: 300 }} value={this.state.longitude} onChange={this.onChange} placeholder="e.g. -11.074219"/></p>
          <p>Is Depot? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Switch onChange={this.onChangeSwitchDepot}/></p>
          <p>Is Relief Point? <Switch onChange={this.onChangeSwitchRelief}/></p><br/>
          
          <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default NodeCreationComp;