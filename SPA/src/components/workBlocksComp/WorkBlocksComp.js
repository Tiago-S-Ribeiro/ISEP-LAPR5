import React, { Component } from "react";
import { Input, Button, message, Select, InputNumber } from "antd";
import masterDataViagem from "../../apis/masterDataViagem";
const { Option } = Select;

class WorkblocksComp extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      Key: "",
      allVehicleDuties: null,
      allTrips: [],
      Duration: 0,
      NumWorkblocks: 0,
      VehicleDuty: "",
      currentVehicleDuty: "",
      currentTripsIDs: [],
      currentTrips: [],
      max: 0,
    };
    this.getVehicleDutiesRequest();
    this.getTrips();
  }

  getVehicleDutiesRequest = async () => {
    const response = await masterDataViagem.get("api/VehicleDuties");
    await this.setState({ allVehicleDuties : response.data})
  };

  getTrips = async () => {
    const response = await masterDataViagem.get("api/Trips");
    await this.setState({ allTrips : response.data})
  };

  handleSubmit = async () => {
    if (this.state.Key.length < 1) {
      message.error("Key is invalid. Please insert any Key.");
    }else if (this.state.VehicleDuty.length < 1) {
      message.error("Please choose a vehicle Duty.");
    }else if (this.state.Duration === 0){
      message.error("Please choose a Duration for the workblock.");
    }else if (this.state.Duration > 57600){  //57600 = 16 hours in seconds
      message.error("A workblock can't be superior to 16 hours.");
    }else if (this.state.NumWorkblocks === 0){
      message.error("Please define a number of blocks to be defined.");
    }else if (this.state.NumWorkblocks * this.state.Duration > 57600){
      message.error("Total is over 16 hours. That's not possible.");
    }else if (this.state.Duration < this.state.max){
      message.error("Allow for more workblock time for your desired Trips.");
    }else if (this.state.NumWorkblocks < this.state.currentTrips.length){
      message.error("Please increase the maximum number of workblocks for the desired trips.");
    }else{

      for(var j = 0; j < this.state.currentTrips.length; j++){
        var aux = this.state.currentTrips[j].passingTimes.length;
        var tripList = [];
        tripList.push(this.state.currentTrips[j].id)

        await masterDataViagem.post("/api/workblocks", {
          Key: this.state.Key.concat(j),
          VehicleDutyKey: this.state.VehicleDuty,
          ListOfTrips: tripList,
          StartTime: this.state.currentTrips[j].passingTimes[0],
          EndTime: this.state.currentTrips[j].passingTimes[aux-1]
        }); 
      }

      message.success("Workblocks were successfully created.");
      this.setState({
        Key: "",
        Duration: 0,
        NumWorkblocks: 0,
        VehicleDuty: "",
        currentVehicleDuty: "",
        currentTripsIDs: [],
        currentTrips: [],
        max: 0,
      })
    }
  };

  onChange = async ({ target: { id, value } }) => {
    this.setState({ [id]: value });
    await this.getVehicleDutiesRequest();
    await this.getTrips();
  };
  onChangeVehicleDuty = async (value) => {
    await this.setState({ VehicleDuty: value });

    await this.state.allVehicleDuties.map(async vd => {
      if(vd.id === this.state.VehicleDuty){
        await this.setState({ currentVehicleDuty: vd, currentTripsIDs: vd.trips });
      }//currentVehicleDuty = objecto VehicleDuty todo, currentTripsIDS = IDS das trips DESSE VehicleDuty
    })
    
    var aux = [];
    await this.state.currentTripsIDs.map(async tripID => {
      var found = this.state.allTrips.find(trip => trip.id === tripID)
      aux.push(found);
    })
    await this.setState({currentTrips: aux}); //currentTrips = Objectos Trips completos, DESSE vehicleDuty
    //console.log(this.state.currentTrips)
    var max = 0;
    var size;
    var duration;
    await this.state.currentTrips.map(trip => {
      size = trip.passingTimes.length;
      duration = trip.passingTimes[size-1] - trip.passingTimes[0]; //Arrival - Starting = Duration
      if(duration > max){
        max = duration; 
      }
    })
    
    await this.setState({max: max});  //max = maior duraçao das viagens DESSE vehicleDuty
    //console.log(this.state.max)

  }
  onChangeDuration = async (value) => {
    await this.setState({ Duration: value*60*60 }); //In seconds
    //console.log("duration: " + this.state.Duration)
  };
  onChangeNumWorkblocks = (value) => {
    this.setState({ NumWorkblocks: value });
  };

  render() {
    let pageContent = <div></div>;
    let vehicleDutyOptions;

    if (this.props.display) {
      if (this.state.allVehicleDuties != null) {
        vehicleDutyOptions = [];
            
        this.state.allVehicleDuties.map((vehicleDuty) => {
          var aux = vehicleDuty.date.split("T");
          if(vehicleDuty.trips.length > 0){
            vehicleDutyOptions.push(<Option value={vehicleDuty.id}>Vehicle Duty Assigned To: [{vehicleDuty.vehicle}], Day: {aux[0]}</Option>);
          }
        });
      }
      pageContent = (
        <div>
          <p>Key: <Input id="Key" value={this.state.Key} style={{ width: 434 }} onChange={this.onChange} placeholder="e.g. (WB: X)"/></p>
          <p>Vehicle Duty: <Select style={{ width: 380 }} onChange={this.onChangeVehicleDuty}>{vehicleDutyOptions}</Select></p>
          <p>Block Duration (Hours): <InputNumber style={{width: 124}} min={1} max={16} defaultValue={this.state.Duration} onChange={this.onChangeDuration}/></p>
          <p>Nº of Workblocks: <InputNumber style={{width: 156}} min={1} max={16} defaultValue={this.state.NumWorkblocks} onChange={this.onChangeNumWorkblocks}/></p>
          <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default WorkblocksComp;