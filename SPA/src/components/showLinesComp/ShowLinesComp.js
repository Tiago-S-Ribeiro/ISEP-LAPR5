import React, { Component } from "react";
import { Table, Tag, Button } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class ShowLinesComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lines: null,
            linePaths: null,
            pathNodes: null
        };
        this.getLinesRequest();
        this.getLinePathsRequest();
        this.getPathsRequest();
    }

    getLinesRequest = async () => {
        const response = await masterDataRede.get("/lines/complete");
        this.setState({
            lines: response.data.lines,
        });
    };

    getLinePathsRequest = async () => {
        const response = await masterDataRede.get("/linePaths/complete");
        this.setState({
            linePaths: response.data.linePaths,
        });
    };

    getPathsRequest = async () => {
        const response = await masterDataRede.get("/paths/complete");
        this.setState({
            paths: response.data.paths,
        });
    };

    reload = async () => {
        await this.getLinesRequest();
        await this.getLinePathsRequest();
        await this.getPathsRequest();
    }

    rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')

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
                    title: 'Line Paths',
                    key: 'linePaths',
                    dataIndex: 'linePaths',
                    render: linePaths => (
                        <>
                            {linePaths.map(linePath => {
                                let color = 'purple';
                                return (
                                    <Tag color={color} key={linePath}>
                                        {linePath.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                },
                {
                    title: 'Color',
                    dataIndex: 'color',
                    key: 'color',
                }
            ];
            var arrayTemp = [];
            const data = [];
            
            this.state.lines.map(async (line) => {
                arrayTemp = [];
                for(var i = 0; i < line.linePaths.length; i++){
                    const linePathByID = this.state.linePaths.find(linePath => linePath._id === line.linePaths[i]);
                    const pathByID = this.state.paths.find(path => path._id === linePathByID.path);
                    arrayTemp.push(pathByID.key)
                }
                var tempColor = this.rgbToHex(line.color[0],line.color[1],line.color[2]);
                data.push({
                    name: line.name,
                    linePaths: arrayTemp,
                    color: <Tag color={tempColor}>_________</Tag>
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

export default ShowLinesComp;