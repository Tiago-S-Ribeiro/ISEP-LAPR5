import React, { Component } from "react";
import { Table, Select, Space, Button, message } from "antd";
import masterDataViagem from "../../apis/masterDataViagem";
import masterDataRede from "../../apis/masterDataRede";
const { Option } = Select;

class ShowTripsOfLineComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trips: null,
            lines: null,
            currentLineKey: "",
            data: [],
            currentTrips: [],
            currentLineNameForDisplay: "",
        };
        this.getLinesRequest();
        this.getTrips();
    }

    getLinesRequest = async () => {
        const response = await masterDataRede.get("/lines/complete");
        await this.setState({ lines: response.data.lines });
    };
    getTrips = async () => {
        const response = await masterDataViagem.get("api/Trips");
        await this.setState({ trips : response.data })
    };
    onChangeLine = async (value) => {
        await this.setState({ currentLineKey: value });
    };

    secondsToHoursMinutes = (timeInSecs) =>{
        timeInSecs = Number(timeInSecs);
        var hours = Math.floor(timeInSecs / 3600);
        var mins = Math.floor(timeInSecs % 3600 / 60);
        var returnString;
        if(mins < 10){
            returnString = hours.toString().concat(" : ", "0", mins);
        }else{
            returnString = hours.toString().concat(" : ", mins);
        }
        
        return returnString;
    }

    reload = async () => {
        await this.getLinesRequest();
        await this.getTrips();
        var dataArray = [];
        var aux = [];
        for(var i = 0; i < this.state.trips.length; i++){
            if(this.state.trips[i].line === this.state.currentLineKey){
                aux.push(this.state.trips[i]);
            }
        }
        try{
            await this.setState({ currentTrips: aux});
            var lineObj = this.state.lines.find(obj => obj.key === this.state.currentTrips[0].line);
            await this.setState({ currentLineNameForDisplay : lineObj.name});
        }catch(error){
            message.error("That Line doesn't have trips associated.")
        }
        var size;
        await this.state.currentTrips.map(trip => {
            size = trip.passingTimes.length;

            dataArray.push({
                line: this.state.currentLineNameForDisplay,
                StartTime: this.secondsToHoursMinutes(trip.passingTimes[0]),
                EndTime: this.secondsToHoursMinutes(trip.passingTimes[size-1])
            });
        })
        await this.setState({data: dataArray})
    }

    render() {
        let pageContent = <div></div>;
        let lineOptions;
        let columns;
        if (this.props.display) {
            if (this.state.lines != null) {
                columns = [
                    {title: 'Line',dataIndex: 'line',key: 'line',},
                    {title: 'Starts At:',dataIndex: 'StartTime',key: 'StartTime',},
                    {title: 'Arrives At:',dataIndex: 'EndTime',key: 'EndTime',}
                ];
                lineOptions = [];
            
                this.state.lines.map((line) => {
                    lineOptions.push(<Option value={line.key}>{line.name}</Option>);
                });
            }
            pageContent = (
                <div>
                    <Space direction="horizontal">
                    Select Line: <Select style={{ width: 200 }} onChange={this.onChangeLine}>{lineOptions}</Select>
                    <Button onClick={this.reload} style={{width: 75, height: 30}} type="primary">Search</Button>
                    </Space><br></br><br></br>
                    <p><Table columns={columns} dataSource={this.state.data} /></p>
                </div>
            );
        }
        return <div>{pageContent}</div>;
    }
}

export default ShowTripsOfLineComp;