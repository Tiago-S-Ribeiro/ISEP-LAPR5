import React, { Component } from "react";
import { Input, Button, message } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class DriverTypeCreationComp extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      key: "",
      name: "",
      description: "",
      allDriversAtm: []
    };
    this.getDTsRequest();
  }

  getDTsRequest = async () => {
    const response = await masterDataRede.get("/driverTypes");
    this.setState({allDriversAtm: response.data.driverTypes});
  };

  doesDriverTypeExist = async (value) => {
    var exists = false;
    for(var i = 0; i < this.state.allDriversAtm.length; i++) {
      if (this.state.allDriversAtm[i].key === value) {
        exists = true;
        break;
      }
    }
    return exists;
  }

  handleSubmit = async () => {
    if(this.state.key.length > 20 || this.state.key.length < 1) {
      message.error("Key is invalid. It's null or has more than 20 chars.");
    }else if(this.state.name.length > 250 || this.state.name.length < 1){
      message.error("Name is invalid. It's null or has more than 250 chars.");
    }else if(this.state.description.length > 250 || this.state.description.length < 1){
      message.error("Description is invalid. It's null or has more than 250 chars.");
    }else if(await this.doesDriverTypeExist(this.state.key)){
      message.error("Error. Driver Type already exists.");
    }else{
      await masterDataRede.post("/driverTypes", {
        key: this.state.key,
        name: this.state.name,
        description: this.state.description,
      });
      
      message.success("Driver Type successfully created.");
      const allDTs = await masterDataRede.get("/driverTypes");
      await this.setState({allDriversAtm: allDTs.data.driverTypes})
      
      this.setState({
        key: "",
        name: "",
        description: ""
      });
    }
  };

  onChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  render() {
    let pageContent = <div></div>;

    if (this.props.display) {
      pageContent = (
        <div><p>Key: <Input id="key" value={this.state.key} onChange={this.onChange} placeholder="e.g. (Type: X)"/></p>
          <p>Name: <Input id="name" value={this.state.name} onChange={this.onChange} placeholder="e.g. Tourist Specialist"/></p>
          <p>Description: <Input id="description" value={this.state.description} onChange={this.onChange} placeholder="e.g. Highly skilled with people."/></p>
          
          <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default DriverTypeCreationComp;