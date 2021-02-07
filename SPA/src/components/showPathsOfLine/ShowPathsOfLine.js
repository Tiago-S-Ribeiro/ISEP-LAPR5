import React, { Component } from "react";
import { Table, Tag, Button } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class ShowPathsOfLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paths: [],
            pathNodes: [],
            nodes: [],
            lines: [],
            linePaths: [],
            data: []
        };
        this.getLinesRequest();
        this.getPathsRequest();
        this.getPathNodesRequest();
        this.getNodesRequest();
        this.getLinePathsRequest();
    }

    getPathsRequest = async () => {
        const response = await masterDataRede.get("/paths/complete");
        this.setState({ paths: response.data.paths,});
    };
    getPathNodesRequest = async () => {
        const response = await masterDataRede.get("/pathNodes/complete");
        this.setState({pathNodes: response.data.pathNodes,});
    };
    getNodesRequest = async () => {
        const response = await masterDataRede.get("/nodes/complete");
        this.setState({nodes: response.data.nodes,});
    };
    getLinesRequest = async () => {
        const response = await masterDataRede.get("/lines");
        this.setState({lines: response.data.lines,});
    };
    getLinePathsRequest = async () => {
        const response = await masterDataRede.get("/linePaths/complete");
        this.setState({linePaths: response.data.linePaths,});
    };

    reload = async () => {
        await this.getLinesRequest();
        await this.getPathsRequest();
        await this.getPathNodesRequest();
        await this.getNodesRequest();
        await this.getLinePathsRequest();

        var dataArray = [];
        var fullLP;
        var fullPath;
        var pnByID;
        var nodeByID;
        var arrayTemp;

        this.state.lines.map(async (line) => {                                                      //iterate all lines
            for(var i = 0; i < line.linePaths.length; i++){                                         //iterate all linePath ID's array of each line
                fullLP = this.state.linePaths.find(lp => lp._id === line.linePaths[i]);             //get entire linePath object from each ID
                fullPath = this.state.paths.find(p => p._id === fullLP.path);                       //get entire path from pathID on linePath object

                arrayTemp = [];
                for(var l = 0; l < fullPath.pathNodes.length; l++){                                 //iterate all pathNode ID's on each path object
                    pnByID = this.state.pathNodes.find(pn => pn._id === fullPath.pathNodes[l]);     //get entire pathNode object from each ID
                    nodeByID = this.state.nodes.find(node => node._id === pnByID.node);             //get entire node from nodeID on pathNode object
                    arrayTemp.push(nodeByID.shortName)                                              //add the node shortName to temp array
                }

                dataArray.push({
                    line: line.name,
                    orientation: fullLP.orientation,
                    linePath: fullLP.key,
                    path: arrayTemp
                });
            }
            
        })
        await this.setState({data: dataArray})
    }

    render() {
        let pageContent = <div></div>;

        if (this.props.display) {
            const columns = [
                {
                    title: 'Line',
                    dataIndex: 'line',
                    key: 'line',
                },
                {
                    title: 'Orientation',
                    dataIndex: 'orientation',
                    key: 'orientation',
                },
                {
                    title: 'Line Path',
                    dataIndex: 'linePath',
                    key: 'linePath',
                },
                {
                    title: 'Path',
                    key: 'path',
                    dataIndex: 'path',
                    render: path => (
                        <>
                            {path.map(p => {
                                let color = 'purple';
                                return (
                                    <Tag color={color} key={p}>
                                        {p.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                }
            ];
            
            pageContent = (
                <div>
                    <p><Button onClick={this.reload} style={{width: 75, height: 30}} type="primary">Reload</Button></p>
                    <p><Table columns={columns} dataSource={this.state.data} /></p>
                </div>
            );
        }
        return <div>{pageContent}</div>;
    }
}

export default ShowPathsOfLine;