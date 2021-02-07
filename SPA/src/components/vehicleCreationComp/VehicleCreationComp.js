import React, { Component } from "react";
import { Input, Button, message, DatePicker, Space, Select } from "antd";
import masterDataRede from "../../apis/masterDataRede";
import masterDataViagem from "../../apis/masterDataViagem";
const { Option } = Select;

class VehicleCreationComp extends Component {

    constructor(props) {
    super(props);
    this.state = {
      LicensePlate: "",
      VIN: "",
      Type: "",
      ServiceAdmission: 0,
      allVehicleTypes: null,
      lp1: "",
      lp2: "",
      lp3: "",
      display: false,
    };
    this.getVehicleTypes();
  }

  getVehicleTypes = async () => {
    const response = await masterDataRede.get("/vehicleTypes");
    this.setState({allVehicleTypes: response.data.vehicleTypes});
  };

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  defineLicensePlate = () => {
      const result = this.state.lp1.concat("-", this.state.lp2, "-", this.state.lp3);
      this.setState({ LicensePlate: result})
  }

  handleSubmit = async () => {
    const currentDate = new Date(); 
    const dateNow = currentDate.getTime();

    this.state.LicensePlate = this.state.lp1.concat("-", this.state.lp2, "-", this.state.lp3);

    if (!/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/.test(this.state.LicensePlate)) {
        console.log(this.state.LicensePlate)
        message.error("Invalid License plate number. Make sure the format is the national standard.");
    }else if (!/^[A-Z0-9]{17}$/.test(this.state.VIN)){
        message.error("Invalid Vehicle Identification Number. Must be a 17 chars alpha-numeric value.");
    }else if(this.state.Type.length === 0){
        message.error("Must choose a vehicle type.");
    }else if(this.state.ServiceAdmission > dateNow || this.state.ServiceAdmission === 0){
        message.error("Invalid Service admission date.");
    } else {
      try{
        const response = await masterDataViagem.post("/api/Vehicles", {
          LicensePlate: this.state.LicensePlate,
          VIN: this.state.VIN,
          Type: this.state.Type,
          ServiceAdmission: this.state.ServiceAdmission,
        });
      message.success("Vehicle successfully created.");
      console.log(response.data);

      this.setState({ //RESET UI
        LicensePlate: "",
        VIN: "",
        Type: "",
        ServiceAdmission: 0,
        lp1: "",
        lp2: "",
        lp3: ""
      });
      }catch(error){
        message.error("Error. Vehicle already registered.")
        console.log("Error: " + error)
      }
    }
 };

  onChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  //ON_CHANGE: DATES
  onChangeDate = (value) => {
    this.setState({ ServiceAdmission: value._d.getTime()})
  };

  onChangeVT = (value) => {
    this.setState({ Type: value });
  };

  render() {
    let pageContent = <div></div>;
    let vehicleTypeOptions;
    
    if (this.state.display) {
        if (this.state.allVehicleTypes != null) {
            vehicleTypeOptions = [];
         
            this.state.allVehicleTypes.map((vt) => {
                vehicleTypeOptions.push(<Option value={vt.key}>{vt.key} - {vt.name}</Option>);
            });
        }

      pageContent = (
        <div>
        <Space direction="horizontal">
        License Plate: <Input id="lp1" value={this.state.lp1} style={{width: 45}} onChange={this.onChange} placeholder="XX"/> 
        - <Input id="lp2" value={this.state.lp2} style={{width: 45}} onChange={this.onChange} placeholder="YY"/>
        - <Input id="lp3" value={this.state.lp3} style={{width: 45}} onChange={this.onChange} placeholder="00"/>
        </Space><br></br><br></br>
          
        <p>VIN: <Input id="VIN" value={this.state.VIN} style={{width: 238}} onChange={this.onChange} placeholder="00000111110000011"/></p>
          
        <p>Type: <Select style={{ width: 232 }} onChange={this.onChangeVT}>{vehicleTypeOptions}</Select></p>

        Service Admission: <DatePicker onChange={this.onChangeDate} style={{ width: 149 }}/>

        <br></br><br></br><br></br>
        <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default VehicleCreationComp;