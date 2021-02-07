import React, { Component } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined, DownCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import masterDataViagem from "../../apis/masterDataViagem";

class ImporterComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
      display: false
    };
  }

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });

    this.setState({
      uploading: true,
    });

    axios({
      url: "https://MDR_URL",
      method: "post",
      processData: false,
      data: formData,
    }).then(async(response) =>{
      try{
        const resp = await masterDataViagem.post("/api/Importer", {});
        if(response.status == 200 && resp.status == 204){
          console.log(response);
          console.log(resp);
          this.setState({
            fileList: [],
            uploading: false,
          });
          message.success("File uploaded with success.");
        }else{
          this.setState({
            fileList: [],
            uploading: false,
          });
          message.success("File failed to upload.");
        }
      }catch(error){
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.error("There was an error uploading the file.")
      }
      
      
    });
  };

  render() {
    let pageContent = <div></div>;
    
    if (this.state.display) {
    
      const { uploading, fileList } = this.state;
      const props = {
        onRemove: (file) => {
          this.setState((state) => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
        },
        beforeUpload: (file) => {
          this.setState((state) => ({
            fileList: [...state.fileList, file],
          }));
          return false;
        },
      fileList,
    };

    pageContent=(
      <div>
        <h4>Click the button below to select the file, and then click "Start Upload".</h4>
        <Upload {...props}><Button icon={<DownCircleOutlined />} 
                style={{ marginTop: 16, width: 445 }}>Select File</Button>
        </Upload>
        <Button type="primary" icon={<UploadOutlined />} onClick={this.handleUpload} 
                disabled={fileList.length === 0} loading={uploading} style={{ marginTop: 16 , width: 445}}>
                {uploading ? "Uploading" : "Start Upload"}
        </Button>
      </div>
    );
    }
    return <div>{pageContent}</div>;
  }
}

export default ImporterComp;