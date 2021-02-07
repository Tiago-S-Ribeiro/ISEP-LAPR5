import React, { Component } from "react";
import { Table, Button } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class ShowVehicleTypeComp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pathNodes: null,
      nodes: null
    };
    this.getPathNodesRequest();
    this.getNodesRequest();
  }

  getPathNodesRequest = async () => {
    const response = await masterDataRede.get("/pathNodes/complete");
    this.setState({
        pathNodes: response.data.pathNodes,
    });
  };

  getNodesRequest = async () => {
    const response = await masterDataRede.get("/nodes/complete");
    this.setState({
      nodes: response.data.nodes,
    });
  };

  reload = async () => {
    await this.getPathNodesRequest();
    await this.getNodesRequest();
  }

  render() {
    let pageContent = <div></div>;

    if (this.props.display) {
      const columns = [
        {
          title: 'Name',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'Node',
          dataIndex: 'node',
          key: 'node',
        },
        {
          title: 'Duration',
          dataIndex: 'duration',
          key: 'duration',
        },
        {
          title: 'Distance',
          dataIndex: 'distance',
          key: 'distance',
        }
      ];
      
      const data = [];
  
      this.state.pathNodes.map(async (pn) => {
        const nodeByID = this.state.nodes.find(node => node._id === pn.node);
        data.push({
          key: pn.key,
          node: nodeByID.name,
          duration: pn.duration, 
          distance: pn.distance
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