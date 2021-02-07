import React, { Component } from "react";
import { Table, Tag, Button, DatePicker, Space } from "antd";
import masterDataViagem from "../../apis/masterDataViagem";

class ShowDriverDuties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            driverDuties: [],
            drivers: [],
            workblocks: [],
            vehicleDuties: [],
            trips: [],
            data: [],
            date: ""
        };
        this.getDriverDuties();
        this.getDrivers();
        this.getWorkblocks();
        this.getVehicleDuties();
        this.getTrips();
    }

    getDriverDuties = async () => {
        const response = await masterDataViagem.get("/api/driverDuties");
        this.setState({ driverDuties: response.data});
    };
    getDrivers = async () => {
        const response = await masterDataViagem.get("/api/drivers");
        this.setState({drivers: response.data});
    };
    getWorkblocks = async () => {
        const response = await masterDataViagem.get("/api/workblocks");
        this.setState({workblocks: response.data});
    };
    getVehicleDuties = async () => {
        const response = await masterDataViagem.get("/api/vehicleDuties");
        this.setState({vehicleDuties: response.data});
    };
    getTrips = async () => {
        const response = await masterDataViagem.get("/api/trips");
        this.setState({linePaths: response.data});
    };
    onChangeDate = async (value) => {
        var paramDate = await value._d.toString();
        var aux = paramDate.slice(34, paramDate.length);
        var year;
        var day;
        var month;
        var monthString;
        if(aux === "(Western European Standard Time)"){
          year = await paramDate.slice(11, paramDate.length - 51);
          day = await paramDate.slice(8, paramDate.length - 56);
          month = await (value._d.getMonth() + 1);
        
          if(month < 10){
              monthString = "0".concat(month.toString())
          }else{
              monthString = month;
          }
        }else{
          year = await paramDate.slice(11, paramDate.length - 49);
          day = await paramDate.slice(8, paramDate.length - 54);
          month = await (value._d.getMonth() + 1);
        
          if(month < 10){
              monthString = "0".concat(month.toString())
          }else{
              monthString = month;
          }
        }
        var dateToSet = year.concat("-", monthString, "-", day)
        await this.setState({date: dateToSet});
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

    reload = async () => {
        await this.getDriverDuties();
        await this.getDrivers();
        await this.getWorkblocks();
        await this.getVehicleDuties();
        await this.getTrips();
        await this.setState({data : []})
        var workblock;//, dDutyWBId, driver, scheduleString;
        var dDutyWBId;
        var driver;
        var dataArray = [];
        var blocks = [];
        var times = [];
        var scheduleString;
        this.state.vehicleDuties.map( async (vd) => {                                                                                                       //iterate vehicleDuties
            if(vd.date.slice(0,10) === this.state.date){                                                                                                    //check if any date in vehicleDuty = selected date

                for(var i = 0; i < this.state.workblocks.length; i++){                                                                                      //iterate workblocks
                    if(this.state.workblocks[i].vehicleDutyKey === vd.id){                                                                                  //check if vehicleDuty at workblocks = above vehicleDuty ID
                        workblock = this.state.workblocks[i];                                                                                               //if yes, we save the entire workblock object

                        for(var l = 0; l < this.state.driverDuties.length; l++){                                                                            //iterate driverDuties
                            dDutyWBId = this.state.driverDuties[l].workblocks.find(wb => wb === workblock.id)                                               //for every driverDuty, check their workblockIDs list, and if they match the above workblockID
                            if(dDutyWBId != undefined){                                                         
                                driver = this.state.drivers.find(d => d.id === this.state.driverDuties[l].driver);                                          //if yes, go to drivers list and get the entire driver object by the driverID at driverDuty
                                blocks.push(workblock.key)                                                                                                  //add the workblock key to the 'blocks' array to later add to 'data' array
                                scheduleString = this.secondsToHoursMinutes(workblock.startTime).concat("-", this.secondsToHoursMinutes(workblock.endTime)) //make a string with startTime and endTime of the workblock like "15:00 - 16:00"
                                times.push(scheduleString)                                                                                                  //add that string to the 'times' array to later add to the 'data' array
                                dataArray.push({                                                                                                            //add everything to the data array according to the columns
                                    key: this.state.driverDuties[l].key,
                                    driverNum: driver.mechanographicNumber,
                                    name: driver.name,
                                    vehicle: vd.vehicle,
                                    wbs: blocks,
                                    times: times
                                })
                                blocks = [];                                                                                                                //reset both temporary arrays
                                times = []; 
                            }
                        }
                    }
                }
            }
        })
        await this.setState({data: dataArray})
    }

    render() {
        let pageContent = <div></div>;

        if (this.props.display) {
            const columns = [
                {
                    title: 'Key',
                    dataIndex: 'key',
                    key: 'key',
                },
                {
                    title: 'Driver Nº',
                    dataIndex: 'driverNum',
                    key: 'driverNum',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Vehicle',
                    dataIndex: 'vehicle',
                    key: 'vehicle',
                },
                {
                    title: 'Workblocks',
                    key: 'wbs',
                    dataIndex: 'wbs',
                    render: wbs => (
                        <>
                            {wbs.map(wb => {
                                let color = 'purple';
                                return (
                                    <Tag color={color} key={wb}>
                                        {wb.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                },
                {
                    title: 'Times',
                    key: 'times',
                    dataIndex: 'times',
                    render: times => (
                        <>
                            {times.map(time => {
                                let color = 'purple';
                                return (
                                    <Tag color={color} key={time}>
                                        {time.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                }
            ];
            
            pageContent = (
                <div>
                    <Space direction="horizontal"> Pick the Day: <DatePicker onChange={this.onChangeDate} style={{ width: 322 }}/>
                        <Button onClick={this.reload} style={{width: 75, height: 30}} type="primary">Search</Button>
                    </Space><br></br><br></br>
                    <p><Table columns={columns} dataSource={this.state.data} /></p>
                </div>
            );
        }
        return <div>{pageContent}</div>;
    }
    
}

export default ShowDriverDuties;