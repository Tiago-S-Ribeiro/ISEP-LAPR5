import React, { Component } from "react";
import { Table, Tag } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class ShowSolutionsComp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      solutions: null
    };
    this.getSolutionsRequest();
  }

  getSolutionsRequest = async () => {
    const response = await masterDataRede.get("/closestPath");
    this.setState({
      solutions: response.data.allSolutions,
    });
  };

  render() {
    let pageContent = <div></div>;

    if (this.props.display) {
      const columns = [
        {
          title: 'Start Node',
          dataIndex: 'startNode',
          key: 'startNode',
        },
        {
          title: 'End Node',
          dataIndex: 'endNode',
          key: 'endNode',
        },
        {
          title: 'Start Time',
          dataIndex: 'startTime',
          key: 'startTime',
        },
        {
          title: 'Arriving Time',
          dataIndex: 'arrivingTime',
          key: 'arrivingTime',
        },
        {
          title: 'Path',
          key: 'paths',
          dataIndex: 'paths',
          render: paths => (
            <>
              {paths.map(path => {
                let color = 'purple';
                return (
                  <Tag color={color} key={path}>
                    {path.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        }
      ];
      
      const data = [];
  
      this.state.solutions.map((solution) => {
        data.push({
          startNode: solution.startingNode, 
          endNode: solution.endNode, 
          startTime: solution.leavingTime, 
          arrivingTime: solution.arrivingTime,
          paths: solution.fullPath
        });
      })
      pageContent = (
        <div><p><Table columns={columns} dataSource={data} /></p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default ShowSolutionsComp;