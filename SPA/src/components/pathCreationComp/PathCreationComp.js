import React, { Component } from "react";
import { Input, Button, message, Select, Radio} from "antd";
import masterDataRede from "../../apis/masterDataRede";

const { Option } = Select;

class PathCreationComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      isEmpty: false,
      pathNodes: [],
      allPathNodes: null,
      display: false,
      allPathsAtm: []
    };
    this.getPathNodesRequest();
    this.getPaths();
  }

  getPathNodesRequest = async () => {
    const response = await masterDataRede.get("/pathNodes/complete");
    this.setState({
      allPathNodes: response.data.pathNodes,
    });
  };

  getPaths = async () => {
    const response = await masterDataRede.get("/paths");
    this.setState({allPathsAtm: response.data.paths});
  };

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  doesPathExist = async (value) => {
    var exists = false;
    for(var i = 0; i < this.state.allPathsAtm.length; i++) {
      if (this.state.allPathsAtm[i].key === value) {
        exists = true;
        break;
      }
    }
    return exists;
  }

  handleSubmit = async () => {
    if (this.state.key.length > 20 || this.state.key.length < 1) {
      message.error("Key is invalid. It's null or has more than 20 chars.");
    } else if(this.state.pathNodes.length < 2){
      message.error("Must choose at least 2 Path Nodes.");
    } else if(await this.doesPathExist(this.state.key)){
      message.error("Error. Path already exists.");
    } else {
        await masterDataRede.post("/paths", {
        key: this.state.key,
        isEmpty: this.state.isEmpty,
        pathNodes: this.state.pathNodes,
      });

      message.success("Path successfully created.");
      const allPaths = await masterDataRede.get("/paths");
      await this.setState({allPathsAtm: allPaths.data.paths})

      this.setState({
        key: "",
        isEmpty: false,
        pathNodes: [],
      });
    }
  };

  onChange = async ({ target: { id, value } }) => {
    this.setState({ [id]: value });
    await this.getPathNodesRequest();
  };

  onChangePathNodes = (value) => {
    this.setState({ pathNodes: value });
  };

  onChangeEmpty = (value) => {
    //console.log(value.target.value)
    this.setState({ isEmpty: value.target.value});
  };

  render() {
    let pageContent = <div></div>;
    let pathNodesArr;

    if (this.state.display) {
      if (this.state.allPathNodes != null) {
        pathNodesArr = [];

        this.state.allPathNodes.map((pn) => {
          pathNodesArr.push(<Option value={pn._id}>{pn.key}</Option>);
        });
      }

      pageContent = (
        <div>
          <p>Key: <Input id="key" value={this.state.key} onChange={this.onChange} placeholder="e.g. (Path: X)"/></p>
          <p>Is Path Empty: <Radio.Group defaultValue={false} onChange={this.onChangeEmpty} buttonStyle="solid">
          <Radio.Button value={false}>No</Radio.Button>
                <Radio.Button value={true}>Yes</Radio.Button>
          </Radio.Group></p>
          <p>PathNodes: <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Choose Path Nodes" 
             value={this.state.linePaths} onChange={this.onChangePathNodes}>{pathNodesArr}</Select><br/></p>
          <p><Button onClick={this.handleSubmit} type="primary">Create</Button></p>
        </div>
      );
    }

    return <div>{pageContent}</div>;
  }
}

export default PathCreationComp;