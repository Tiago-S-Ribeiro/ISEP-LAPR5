import React, { Component } from "react";
import { Table, DatePicker, Tag, Space, Button, message } from "antd";
import masterDataViagem from "../../apis/masterDataViagem";

class ShowVehicleDutyByDay extends Component {

    constructor(props) {
        super(props);
        this.state = {
          allVehicleDuties: [],
          trips: [],
          date: "",
          data: [],
          temp: []
        };
        this.getVehicleDuties();
        this.getTrips();
      }
    
      getVehicleDuties = async () => {
        const response = await masterDataViagem.get("/api/VehicleDuties");
        await this.setState({ allVehicleDuties: response.data });
      };
      getTrips = async () => {
        const response = await masterDataViagem.get("api/Trips");
        await this.setState({ trips : response.data })
      };  

      onChangeDate = async (value) => {
          var paramDate = await value._d.toString();
          var aux = paramDate.slice(34, paramDate.length);

          if(aux === "(Western European Standard Time)"){
            var year = await paramDate.slice(11, paramDate.length - 51);
            var day = await paramDate.slice(8, paramDate.length - 56);
            var month = await (value._d.getMonth() + 1);
            var monthString;
          
            if(month < 10){
                monthString = "0".concat(month.toString())
            }else{
                monthString = month;
            }
          }else{
            var year = await paramDate.slice(11, paramDate.length - 49);
            var day = await paramDate.slice(8, paramDate.length - 54);
            var month = await (value._d.getMonth() + 1);
            var monthString;
          
            if(month < 10){
                monthString = "0".concat(month.toString())
            }else{
                monthString = month;
            }
          }
          var dateToSet = year.concat("-", monthString, "-", day)
          await this.setState({date: dateToSet});
          //console.log(this.state.date)
      }

      reload = async () => {
        await this.getVehicleDuties();
        await this.getTrips();
        var data = [];
        this.state.allVehicleDuties.map(async (vd) => {
            var auxDate = vd.date.split("T");
            
            if(auxDate[0] === this.state.date){
                var aux = [];
                var trip;
                try{
                    for(var i = 0; i < vd.trips.length; i++){
                        trip = this.state.trips.find(trip => trip.id === vd.trips[i]);
                        aux.push(trip.path)
                    }
                }catch(error){
                    message.error("Error. Vehicle Duty doesn't have trips.")
                }
                data.push({
                    key: vd.key, 
                    vehicle: vd.vehicle,
                    trips: aux
                });
            }
        })
        await this.setState({data: data})
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
              title: 'Vehicle',
              dataIndex: 'vehicle',
              key: 'vehicle',
            },
            {
                title: 'Trips',
                key: 'trips',
                dataIndex: 'trips',
                render: trips => (
                    <>
                        {trips.map(trip => {
                            let color = 'purple';
                            return (
                                <Tag color={color} key={trip}>{trip}</Tag>
                            );
                        })}
                    </>
                ),
            }
          ];
          
          pageContent = (
            <div>
              <Space direction="horizontal">
                Pick the Day: <DatePicker onChange={this.onChangeDate} style={{ width: 322 }}/>
                <Button onClick={this.reload} style={{width: 75, height: 30}} type="primary">Search</Button>
              </Space><br></br><br></br>
              <p><Table columns={columns} dataSource={this.state.data} /></p>
            </div>
          );
        }
        return <div>{pageContent}</div>;
      }
    }

export default ShowVehicleDutyByDay;