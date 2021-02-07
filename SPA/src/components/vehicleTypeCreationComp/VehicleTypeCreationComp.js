import React, { Component } from "react";
import { Input, Button, message, InputNumber, Select } from "antd";
import masterDataRede from "../../apis/masterDataRede";
const { Option } = Select;

class VehicleTypeCreationComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      name: "",
      autonomy: 500000,
      cost: 5,
      averageSpeed: 30,
      energySource: 0,
      consumption: 10,
      emissions: 500,
      display: false,
      flag: false
    };
  }

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  handleSubmit = async () => {
    if (this.state.key.length > 20 || this.state.key.length < 1) {
      message.error("Key is invalid. It's null or has more than 20 chars.");
    } else if (this.state.name.length > 250 || this.state.name.length < 1) {
      message.error("Name is invalid. It's null or has more than 250 chars.");
    } else if (this.state.energySource == 0) {
      message.error("Please choose an energy source.");
    } else {
      const response = await masterDataRede.post("/vehicleTypes", {
        key: this.state.key,
        name: this.state.name,
        autonomy: this.state.autonomy,
        cost: this.state.cost,
        averageSpeed: this.state.averageSpeed,
        energySource: this.state.energySource,
        consumption: this.state.consumption,
        emissions: this.state.emissions,
      });

      message.success("Vehicle Type successfully created.");

      console.log(response.data);

      this.setState({
        key: "",
        name: "",
        autonomy: 500000,
        cost: 5,
        averageSpeed: 30,
        energySource: 23,
        consumption: 10,
        emissions: 500,
      });
    }
  };

  onChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };
  onChangeAutonomy = (value) => {
    this.setState({ autonomy: value });
  };
  onChangeCost = (value) => {
    this.setState({ cost: value });
  };
  onChangeAvgSpeed = (value) => {
    this.setState({ averageSpeed: value });
  };
  onChangeConsumption = (value) => {
    this.setState({ autonomy: value });
  };
  onChangeEmissions = (value) => {
    this.setState({ emissions: value });
  };
  onChangeEnergySource = (value) => {
    if(value == 75){    //If value is 75(Electric), Sets emissions to 0, despite what is actually there
        this.setState({ energySource: value, emissions: 0, flag: true});
    }else{
        this.setState({ energySource: value, flag: false});
    }
  };

  render() {
    let pageContent = <div></div>;

    let options;
    if (this.state.display) {
      options = [];
      options.push(<Option value={1}>{"Gasolina"}</Option>);
      options.push(<Option value={23}>{"Gasóleo"}</Option>);
      options.push(<Option value={20}>{"GPL"}</Option>);
      options.push(<Option value={75}>{"Elétrico"}</Option>);
      options.push(<Option value={50}>{"Hidrogénio"}</Option>);

      pageContent = (
        <div>
          <p>Key:<Input id="key" value={this.state.key} onChange={this.onChange} placeholder="e.g. (VehicleType: X)"/></p>
          <p>Name:<Input id="name" value={this.state.name} onChange={this.onChange} placeholder="e.g. Two Floor Bus"/></p>
          <p>Autonomy: <InputNumber id="autonomy" style={{width: 143}} min={1} max={999999} defaultValue={this.state.autonomy} onChange={this.onChangeAutonomy}/></p>
          <p>Cost: <InputNumber id="cost" style={{width: 180}} min={1} max={100} defaultValue={this.state.cost} onChange={this.onChangeCost}/></p>
          <p>Average Speed: <InputNumber id="averageSpeed" style={{width: 114}} min={10} max={60} defaultValue={this.state.averageSpeed} onChange={this.onChangeAvgSpeed}/></p>
          <p>Energy Source: <Select style={{ width: 120 }} onChange={this.onChangeEnergySource}>{options}</Select></p>
          <p>Consumption: <InputNumber id="consumption" style={{width: 124}} min={1} max={200} defaultValue={this.state.consumption} onChange={this.onChangeConsumption}/></p>
          <p>Emissions: <InputNumber id="emissions" style={{width: 148}} min={1} max={9999} disabled={this.state.flag} defaultValue={this.state.emissions} onChange={this.onChangeEmissions}/></p>

          <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default VehicleTypeCreationComp;