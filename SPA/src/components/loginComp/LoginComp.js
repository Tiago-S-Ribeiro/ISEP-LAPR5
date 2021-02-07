import React, { Component } from "react";
import { Input, Button, message, Form } from "antd";
import masterDataRede from "../../apis/masterDataRede";

class LoginComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      display: false
    };
  }

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  onFinish = async (values) => {
    if (values.email.length > 255 || values.email.length < 8) {
      message.error("Your e-mail is not valid.");
    } else if (values.password.length > 1024 || values.password.length < 8) {
      message.error("Your password is weak. Have at least 8 characters.");
    } else {
        try{
            await masterDataRede.post("/clients/login", {
                email: values.email,
                password: values.password
            });
            message.success("Logged in!");
              
            this.props.handleLogin(true);
            if(values.email === "1181444@isep.ipp.pt" || values.email === "1180778@isep.ipp.pt" || values.email === "1171247@isep.ipp.pt" || values.email === "1170691@isep.ipp.pt"){
              this.props.isClient(false);
            }else{
              this.props.isClient(true);
            }
        }catch(error){
            console.log("Error: " +error)
            message.error("Wrong e-mail or password");
        }
    }
  };

  onFinishFailed = (errorInfo) => {
    message.error("Error registering. Possible invalid e-mail syntax.");
    console.log('Failed:', errorInfo);
  };

  render() {
    let pageContent = <div></div>;

    if (this.state.display) {

      pageContent = (
        <div>
          <Form name="basic" style={{width:600, padding: "0 10px 10px"}} initialValues={{remember:true}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
            <Form.Item label="E-mail" name="email" rules={[{required:true, message:'Please insert your e-mail!'}]}><Input/></Form.Item>
            <Form.Item label="Password" name="password" rules={[{required:true, message:'Please input your password!'}]}><Input.Password/></Form.Item>
            <Form.Item> <Button type="primary" htmlType="submit">Login</Button></Form.Item>
          </Form>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default LoginComp;