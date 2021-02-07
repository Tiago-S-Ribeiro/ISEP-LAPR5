import React, { Component } from "react";
import { Table, Tag, InputNumber, Space, Button, message } from "antd";
import masterDataRede from "../../apis/masterDataRede";
import masterDataPlanning from "../../apis/masterDataPlanning";
import {ReloadOutlined} from "@ant-design/icons";

class ShowGenSolutionsComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genSolutions: null,
      one: -1,
      two: -1,
      three: -1,
      four: -1,
      five: -1,
      six: -1,
      seven: -1,
    };
    this.getGenSolutionsRequest();
  }

  getGenSolutionsRequest = async () => {
    const response = await masterDataRede.get("/geneticSolutions");
    await this.setState({ genSolutions: response.data.allGenSolutions });
    console.log(this.state.genSolutions);
  };

  reload = async () => {
    await this.getGenSolutionsRequest();
}

  handleSubmit = async () => {

      await masterDataPlanning.get("/gera", {
        params: {
          ng: this.state.one,
          dp: this.state.two,
          pc: this.state.three,
          pm: this.state.four,
          t: this.state.five,
          av: this.state.six,
          g: this.state.seven
        }
      });
      message.success("Genetic Solution Calculated.");
}
  
  onChange1= async (value) => { this.setState({ one: value });}
  onChange2= async (value) => { this.setState({ two: value });}
  onChange3= async (value) => { this.setState({ three: value });}
  onChange4= async (value) => { this.setState({ four: value });}
  onChange5= async (value) => { this.setState({ five: value });}
  onChange6= async (value) => { this.setState({ six: value });}
  onChange7= async (value) => { this.setState({ seven: value });}

  render() {
    let pageContent = <div></div>;

    if (this.props.display) {
      if (this.state.genSolutions != null) {
        const columns = [
            {
            title: "Drivers",
            key: "drivers",
            dataIndex: "drivers",
                render: (drivers) => (<>{drivers.map((driver) => {
                  let color = "purple";
                  return (<Tag color={color} key={driver}>{driver.toString().toUpperCase()}</Tag>);
                })}</>),
            },
            {
            title: "Evaluation",
            dataIndex: "score",
            key: "score",
            },
        ];

        const data = [];

        this.state.genSolutions.map(async (genSolution) => {
          data.push({
            drivers: genSolution.drivers,
            score: genSolution.score,
          });
        });
        pageContent = (
        <div>
          <Space direction="horizontal">
            <p>Generations Nº: <InputNumber style={{width: 53}} min={1} onChange={this.onChange1}/></p>
            <p>Population Density: <InputNumber style={{width: 50}} min={1} onChange={this.onChange2}/></p>
            <p>Crossing Chance: <InputNumber style={{width: 50}} min={0} max={100} onChange={this.onChange3}/></p>
            <p>Mutation Chance: <InputNumber style={{width: 60}} min={0} max={100} onChange={this.onChange4}/></p>
          </Space>
          <Space direction="horizontal">
            <p>Time Cap (Secs): <InputNumber style={{width: 50}} min={1} onChange={this.onChange5}/></p>
            <p>Specific Evaluation: <InputNumber style={{width: 53}} min={0} onChange={this.onChange6}/></p>
            <p>Stabilization Nº: <InputNumber style={{width: 56}} min={0} onChange={this.onChange7}/></p>
            <p><Button onClick={this.handleSubmit} type="primary" style={{width: 105}}>Compute</Button></p>
            <p><Button onClick={this.reload} style={{width: 60}} type="primary" icon={<ReloadOutlined />}></Button></p>
          </Space>
          <br></br><br></br>
          <p><Table columns={columns} dataSource={data} /></p>
        </div>
        );
      }
    }
    return <div>{pageContent}</div>;
  }
}

export default ShowGenSolutionsComp;
