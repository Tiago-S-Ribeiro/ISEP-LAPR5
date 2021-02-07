import React, { Component } from "react";
import { Input, Button, message, Select, DatePicker } from "antd";
import masterDataViagem from "../../apis/masterDataViagem";
const { Option } = Select;

class VehicleDutyAdHocComp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Key: "",
      Vehicle: "",
      Date: 0,
      Trips: [],
      Workblocks: [],
      allVehicles: null,
      allTrips: []
    };
    this.getVehiclesRequest();
    this.getTripsRequest();
  }

  getVehiclesRequest = async () => {
    const response = await masterDataViagem.get("api/Vehicles");
    await this.setState({ allVehicles : response.data})
  };

  getTripsRequest = async () => {
    const response = await masterDataViagem.get("api/Trips");
    await this.setState({ allTrips : response.data})
  };

  handleSubmit = async () => {
    const currentDate = new Date(); 
    const dateNow = currentDate.getTime();

    if(this.state.Key.length > 20 || this.state.Key.length < 1) {
        message.error("Key is invalid. It's null or has more than 20 chars.");
    }else if(this.state.Vehicle.length < 1){
      message.error("Choose a Vehicle.");
    }else if(this.state.Trips.length === 0){
      message.error("Choose at least one trip.");
    }else if(this.state.Date === 0){
        message.error("Pick the date.");
    }else if(this.state.Date < dateNow){
        message.error("Invalid Date.");
    }else{
        await masterDataViagem.post("/api/VehicleDuties", {
            Key: this.state.Key,
            Vehicle: this.state.Vehicle,
            Date: this.state.Date,
            Trips: this.state.Trips,
            Workblocks: this.state.Workblocks,
        });   
      
      message.success("Vehicle Duty successfully created.");
      
      this.setState({
        Key: "",
        Vehicle: "",
        Date: 0,
        Trips: [],
        Workblocks: []
      });
    }
  };

  onChange = async ({ target: { id, value } }) => {
    this.setState({ [id]: value });
    await this.getVehiclesRequest();
    await this.getTripsRequest();
  };

  onChangeVehicle = async (value) => {
    await this.setState({ Vehicle: value });
  }

  onChangeTrips = async (value) => {
    await this.setState({ Trips: value });
  };

  onChangeDate = (value) => {
    this.setState({ Date: value._d.getTime()})
  };

  secondsToHoursMinutes = (timeInSecs) =>{
    timeInSecs = Number(timeInSecs);
    var hours = Math.floor(timeInSecs / 3600);
    var mins = Math.floor(timeInSecs % 3600 / 60);
    var returnString;
    if(mins < 10){
        returnString = hours.toString().concat(":", "0", mins);
    }else{
        returnString = hours.toString().concat(":", mins);
    }
    
    return returnString;
}

  render() {
    let pageContent = <div></div>;
    let vehicleOptions;
    let tripOptions;
    let start;
    let end;
    let size;

    if (this.props.display) {
        if (this.state.allVehicles != null) {
            vehicleOptions = [];
            tripOptions = [];
            
            this.state.allVehicles.map((vehicle) => {
                vehicleOptions.push(<Option value={vehicle.licensePlate}>{vehicle.licensePlate} - {vehicle.type}</Option>);
            });
            this.state.allTrips.map((trip) => {
              size = trip.passingTimes.length - 1;
              start = this.secondsToHoursMinutes(trip.passingTimes[0]);
              end = this.secondsToHoursMinutes(trip.passingTimes[size]);
              tripOptions.push(<Option value={trip.id}>{trip.line} - [{trip.path}]  -  ( {start}  -  {end} )</Option>);
            });
        }
      pageContent = (
        <div><p>Key: <Input id="Key" style={{ width: 374 }} value={this.state.Key} onChange={this.onChange} placeholder="e.g. (VD: X)"/></p>
          <p>Choose Vehicle: <Select style={{ width: 302 }} onChange={this.onChangeVehicle}>{vehicleOptions}</Select></p>
          <p>Trips: <Select mode="multiple" allowClear style={{ width: 368 }} placeholder="Choose Trips" 
             value={this.state.Trips} onChange={this.onChangeTrips}>{tripOptions}</Select><br/></p>

            <p>Pick the Day: <DatePicker onChange={this.onChangeDate} style={{ width: 322 }}/></p><br></br>

          <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default VehicleDutyAdHocComp;