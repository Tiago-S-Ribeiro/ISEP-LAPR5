import React, { Component } from "react";
import { Table } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class ShowClientsComp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clients: null
    };
    this.getClientsRequest();
  }

  getClientsRequest = async () => {
    const response = await masterDataRede.get("/clients");
    this.setState({
      clients: response.data.clients,
    });
  };

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
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
        }
      ];
      
      const data = [];
  
      this.state.clients.map((client) => {
        data.push({
          name: client.name, 
          email: client.email
        });
      })
      pageContent = (
        <div>
          <p><Table columns={columns} dataSource={data} /></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default ShowClientsComp;