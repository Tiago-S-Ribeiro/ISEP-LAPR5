import React, { Component } from "react";
import { Input, Button, message, DatePicker, Space, InputNumber, Select } from "antd";
import masterDataRede from "../../apis/masterDataRede";
import masterDataViagem from "../../apis/masterDataViagem";
const { Option } = Select;

class DriverCreationComp extends Component {

    constructor(props) {
    super(props);
    this.state = {
      MechanographicNumber: "",
      Name: "",
      DateBirth: 0,
      CitizenCardNumber: 0,
      NIF: 0,
      DrivingLicenseNumber: 0,
      DrivingLicenseExpirationDate: 0,
      DriverTypes: [],
      EntryDateCompany: 0,
      DepartureDateCompany: 0,
      allDriverTypes: null,
    };
    this.getDriverTypes();
  }

  getDriverTypes = async () => {
    const response = await masterDataRede.get("/driverTypes");
    this.setState({allDriverTypes: response.data.driverTypes});
  };

  calculateAge = (dateTimeStamp) => {
    var ageDifMs = Date.now() - dateTimeStamp;
    var ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  handleSubmit = async () => {
    const currentDate = new Date(); const dateNow = currentDate.getTime();
    if (this.state.MechanographicNumber.length > 9 || this.state.MechanographicNumber.length < 9) {
      message.error("Mechanographic Number is invalid. It's null or has more than 9 chars.");
    } else if (this.state.Name.length > 255 || this.state.Name.length < 1) {
      message.error("Name is invalid. It's null or has more than 250 chars.");
    } else if(this.state.DriverTypes.length < 1){
      message.error("Must choose at least one Driver Type."); 
    } else if(this.state.NIF === 0 || this.state.CitizenCardNumber === 0 || this.state.DrivingLicenseNumber === 0){
      message.error("Invalid Identification Numbers. Please check your inserted values."); 
    } else if(this.calculateAge(this.state.DateBirth) < 18 || this.state.DateBirth === 0){
      message.error("Must be at least 18 years old.");
    } else if(this.state.EntryDateCompany > dateNow || this.state.EntryDateCompany === 0){
      message.error("Invalid Company admission date."); 
    } else if(this.state.DrivingLicenseExpirationDate <= dateNow){
      message.error("Driver's License appears to have expired already."); 
    } else {
      try{
        const response = await masterDataViagem.post("/api/Drivers", {
          MechanographicNumber: this.state.MechanographicNumber,
          Name: this.state.Name,
          DateBirth: this.state.DateBirth,
          CitizenCardNumber: this.state.CitizenCardNumber,
          NIF: this.state.NIF,
          DrivingLicenseNumber: this.state.DrivingLicenseNumber,
          DrivingLicenseExpirationDate: this.state.DrivingLicenseExpirationDate,
          DriverTypes: this.state.DriverTypes,
          EntryDateCompany: this.state.EntryDateCompany,
          DepartureDateCompany: this.state.DepartureDateCompany
        });
      message.success("Driver successfully created.");
      console.log(response.data);

      this.setState({ //RESET UI
        MechanographicNumber: "",
        Name: "",
        DateBirth: 0,
        CitizenCardNumber: 0,
        NIF: 0,
        DrivingLicenseNumber: 0,
        DrivingLicenseExpirationDate: 0,
        DriverTypes: [],
        EntryDateCompany: 0
      });
      }catch(error){
        message.error("Error. Driver already registered.")
        console.log("Error: " + error)
      }
    }
  };

  onChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  onChangeNIF = (value) => {
    this.setState({ NIF: value });
  };

  onChangeCC = (value) => {
    this.setState({ CitizenCardNumber: value });
  };

  onChangeDL = (value) => {
    this.setState({ DrivingLicenseNumber: value });
  };

  onChangeDriverTypes = (value) => {
    this.setState({ DriverTypes: value });
  };

  //ON_CHANGE: DATES
  onChangeBirthDate = (value) => {
    this.setState({ DateBirth: value._d.getTime()})
  };
  onChangeLicenseExpiration = (value) => {
    this.setState({ DrivingLicenseExpirationDate: value._d.getTime() })
  };
  onChangeAdmissionDate = (value) => {
    this.setState({ EntryDateCompany: value._d.getTime() })
  };

  render() {
    let pageContent = <div></div>;
    let driverTypesArray;

    if (this.props.display) {
        if (this.state.allDriverTypes != null) {
            driverTypesArray = [];
    
            this.state.allDriverTypes.map((driverType) => {
                driverTypesArray.push(<Option value={driverType.key}>{driverType.name}</Option>);
            });
        }

      pageContent = (
        <div><p>Mechanographic Number: <Input id="MechanographicNumber" value={this.state.MechanographicNumber} onChange={this.onChange} placeholder="e.g. 111XXX222"/></p>
          <p>Name: <Input id="Name" value={this.state.Name} onChange={this.onChange} placeholder="e.g. Jean-Claude Van Damme"/></p>
          
          <p>Driver Types: <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Choose Driver Types" 
             value={this.state.DriverTypes} onChange={this.onChangeDriverTypes}>{driverTypesArray}</Select><br/></p>
          
          <p>Fiscal Number: <InputNumber id="NIF" style={{width: 200}} min={100000000} max={999999999} onChange={this.onChangeNIF}/></p> 
          <p>Citizen Identification: <InputNumber id="CitizenCardNumber" style={{width: 162}} min={10000000} max={99999999} onChange={this.onChangeCC}/></p> 
          <p>Driver's License ID: <InputNumber id="DrivingLicenseNumber" style={{width: 177}} min={100000000} max={999999999} onChange={this.onChangeDL}/></p>
          
          <Space direction="horizontal">
            Date of Birth: <DatePicker onChange={this.onChangeBirthDate}/>
            Driver's License Expiration: <DatePicker onChange={this.onChangeLicenseExpiration}/>
            Date of Admission: <DatePicker onChange={this.onChangeAdmissionDate}/>
          </Space>

          <br></br><br></br><br></br>
          <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default DriverCreationComp;