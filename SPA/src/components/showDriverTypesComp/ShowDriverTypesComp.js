import React, { Component } from "react";
import { Table, Button } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class ShowDriverTypesComp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      driverTypes: null
    };
    this.getDriverTypesRequest();
  }

  getDriverTypesRequest = async () => {
    const response = await masterDataRede.get("/driverTypes");
    this.setState({
        driverTypes: response.data.driverTypes,
    });
  };

  reload = async () => {
    await this.getDriverTypesRequest();
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
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        }
      ];
      
      const data = [];
  
      this.state.driverTypes.map((dt) => {
        data.push({
          key: dt.key, 
          name: dt.name, 
          description: dt.description
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

export default ShowDriverTypesComp;