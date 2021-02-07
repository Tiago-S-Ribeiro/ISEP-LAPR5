import React, { Component } from "react";
import { Input, Button, message, Select, DatePicker } from "antd";
import masterDataViagem from "../../apis/masterDataViagem";
const { Option } = Select;

class DriverDutyAdHocComp extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      Key: "",
      Driver: "",
      Workblocks: [],
      allDrivers: null,
      allWorkblocks: [],
      allVehicleDuties: [],
      allTrips: [],
    };
    this.getDriversRequest();
    this.getWorkblocks();
    this.getVehicleDuties();
    this.getTrips();
  }

  getDriversRequest = async () => {
    const response = await masterDataViagem.get("api/Drivers");
    await this.setState({ allDrivers : response.data})
  };

  getWorkblocks = async () => {
    const response = await masterDataViagem.get("api/Workblocks");
    await this.setState({ allWorkblocks : response.data})
  };

  getVehicleDuties = async () => {
    const response = await masterDataViagem.get("api/vehicleDuties");
    await this.setState({ allVehicleDuties : response.data})
  };

  getTrips = async () => {
    const response = await masterDataViagem.get("api/trips");
    await this.setState({ allTrips : response.data})
  };

  isDriverWorkingMoreThan8Hours = async () => {
    var wb;
    var counter;
    var time;

    await this.state.Workblocks.map((workblock) => {
        wb = this.state.allWorkblocks.find(block => block.id === workblock);
        time = wb.endTime - wb.startTime;
        counter += time;
    })
    return counter;
  }

  handleSubmit = async () => {
    if(this.state.Key.length > 20 || this.state.Key.length < 1) {
        message.error("Key is invalid. It's null or has more than 20 chars.");
    }else if(this.state.Driver.length < 1){
      message.error("Choose a Driver.");
    }else if(this.state.Workblocks.length === 0){
      message.error("Choose at least one workblock.");
    }else if(await this.isDriverWorkingMoreThan8Hours() > 28800){
      message.error("The driver can't be set to work over 8 hours.");
    }else{
        await masterDataViagem.post("/api/driverDuties", {
            Key: this.state.Key,
            Driver: this.state.Driver,
            Workblocks: this.state.Workblocks,
        });   
      
        message.success("Driver Duty successfully created.");
      
        this.setState({
            Key: "",
            Driver: "",
            Workblocks: [],
        });
    }
  };

  onChange = async ({ target: { id, value } }) => {
    this.setState({ [id]: value });
    await this.getDriversRequest();
    await this.getWorkblocks();
    await this.getVehicleDuties();
    await this.getTrips();
  };

  onChangeWorkblocks = async (value) => {
    await this.setState({ Workblocks: value });
  };

  onChangeDriver = async (value) => {
    await this.setState({ Driver: value });
  }

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
    let driverOptions;
    let workblockOptions;
    let vd;
    let date;
    let trip;
    let pathOfTrip;
    let start;
    let end;

    if (this.props.display) {
        if (this.state.allDrivers != null && this.state.allWorkblocks != null) {
            driverOptions = [];
            workblockOptions = [];

            this.state.allDrivers.map((driver) => {
                driverOptions.push(<Option value={driver.id}>{driver.mechanographicNumber} - {driver.name}</Option>);
            });

            this.state.allWorkblocks.map((workblock) => {
                
                vd = this.state.allVehicleDuties.find(vd => vd.id === workblock.vehicleDutyKey);
                date = vd.date.slice(0, 10);
                
                trip = this.state.allTrips.find(trip => trip.id === workblock.listOfTrips[0]);

                if(trip != undefined){
                  pathOfTrip = trip.path
                }

                start = this.secondsToHoursMinutes(workblock.startTime);
                end = this.secondsToHoursMinutes(workblock.endTime);

                workblockOptions.push(<Option value={workblock.id}>{workblock.key}, on: {date}, for: [{pathOfTrip}] - ({start}-{end})</Option>);
            });
            
        }
      pageContent = (
        <div><p>Key: <Input id="Key" style={{ width: 374 }} value={this.state.Key} onChange={this.onChange} placeholder="e.g. (VD: X)"/></p>
          <p>Choose Driver: <Select style={{ width: 309 }} onChange={this.onChangeDriver}>{driverOptions}</Select></p>
          <p>Workblocks: <Select mode="multiple" allowClear style={{ width: 368 }} placeholder="Choose Workblocks" 
             value={this.state.Workblocks} onChange={this.onChangeWorkblocks}>{workblockOptions}</Select><br/></p>

          <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default DriverDutyAdHocComp;