import React, { Component } from "react";
import { Table, Tag, Button } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class ShowPathsComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paths: null,
            pathNodes: null,
            nodes: null
        };
        this.getPathsRequest();
        this.getPathNodesRequest();
        this.getNodesRequest();
    }

    getPathsRequest = async () => {
        const response = await masterDataRede.get("/paths");
        this.setState({
            paths: response.data.paths,
        });
    };

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
        await this.getPathsRequest();
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
                    title: 'Nodes',
                    key: 'pathNodes',
                    dataIndex: 'pathNodes',
                    render: pathNodes => (
                        <>
                            {pathNodes.map(pathNode => {
                                let color = 'purple';
                                return (
                                    <Tag color={color} key={pathNode}>
                                        {pathNode.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                }
            ];
            var arrayTemp = [];
            const data = [];
            
            this.state.paths.map(async (path) => {
                arrayTemp = [];
                for(var i = 0; i < path.pathNodes.length; i++){
                    const pathNodeByID = this.state.pathNodes.find(pathNode => pathNode._id === path.pathNodes[i]);
                    const nodeByID = this.state.nodes.find(node => node._id === pathNodeByID.node);
                    arrayTemp.push(nodeByID.shortName)
                }
                
                data.push({
                    key: path.key,
                    pathNodes: arrayTemp
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

export default ShowPathsComp;