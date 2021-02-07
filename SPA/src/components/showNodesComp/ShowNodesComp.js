import React, { Component } from "react";
import { Table, Button } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class ShowNodesComp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nodes: null
    };
    this.getNodesRequest();
  }

  getNodesRequest = async () => {
    const response = await masterDataRede.get("/nodes/complete");
    this.setState({
      nodes: response.data.nodes,
    });
  };

  reload = async () => {
    await this.getNodesRequest();
  }

  render() {
    let pageContent = <div></div>;

    if (this.props.display) {
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Short Name',
          dataIndex: 'shortName',
          key: 'shortName',
        },
        {
          title: 'Latitude',
          dataIndex: 'latitude',
          key: 'latitude',
        },
        {
          title: 'Longitude',
          dataIndex: 'longitude',
          key: 'longitude',
        }
      ];
      
      const data = [];
  
      this.state.nodes.map((node) => {
        data.push({
          name: node.name, 
          shortName: node.shortName, 
          latitude: node.latitude, 
          longitude: node.longitude
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

export default ShowNodesComp;