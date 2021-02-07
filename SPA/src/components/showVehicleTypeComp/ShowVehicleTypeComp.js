import React, { Component } from "react";
import { Table, Button } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class ShowVehicleTypeComp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vehicleTypes: null
    };
    this.getVehicleTypesRequest();
  }

  getVehicleTypesRequest = async () => {
    const response = await masterDataRede.get("/vehicleTypes");
    this.setState({
        vehicleTypes: response.data.vehicleTypes,
    });
  };

  reload = async () => {
    await this.getVehicleTypesRequest();
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
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        }
      ];
      
      const data = [];
  
      this.state.vehicleTypes.map((vt) => {
        data.push({
          key: vt.key, 
          name: vt.name
        });
      })
      pageContent = (
        <div>
          <p><Button onClick={this.reload} style={{width: 75, height: 30}} type="primary">Reload</Button></p>
          <p><Table columns={columns} dataSource={data} /></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default ShowVehicleTypeComp;