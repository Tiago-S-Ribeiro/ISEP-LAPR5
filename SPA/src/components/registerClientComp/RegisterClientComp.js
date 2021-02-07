import React, { Component } from "react";
import { Input, Button, message, Form, Checkbox, Card, Space } from "antd";
import masterDataRede from "../../apis/masterDataRede";

const tabListNoTitle = [
  {
    key: 'HandlingResponsible',
    tab: 'Handling Responsible',
  },
  {
    key: 'CollectedData',
    tab: 'Collected Data',
  },
  {
    key: 'Purposes',
    tab: 'Purposes',
  },
];

const contentListNoTitle = {
  HandlingResponsible: <p>The responsibles in charge of handling the provided information is G67 group from the Informatics Engineering
    Department at ISEP. All information is treated with proper care and it's a very secure and transparent process. Please feel free to contact
    the support team regarding any concerns you might have by reaching out to us at <b>lapr5.grupo67@gmail.com</b>.
  </p>,
  CollectedData: <p>The only information collected on the moment of registration is your name and e-mail. You'll choose a password that
    is encrypted by a third-party that our team never has access to, guaranteeing the desired security, and is only meant to allow you to
    login at any given time.
  </p>,
  Purposes: <p>The e-mail and password are required to allow the user to register and login in the application, and also for us
    to be able to verify an individual's identity. Your name, allied to your e-mail, allows us to contact our users, addressing them
    by their name, and contact them with news, upgrades and relevant information, and it also adds up to security on the moment of 
    a possible password retrieval.
  </p>,
};

class RegisterClientComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      display: false,
      checkBox: false,
      key: 'tab1',
      noTitleKey: 'app',
      emailToDelete: "",
      clients: [],
      emailID: ""
    };
    this.getClients();
  }

  getClients = async () => {
    const response = await masterDataRede.get("/clients");
    await this.setState({ clients: response.data.clients });
  };

  componentWillUpdate(nextprops) {
    if (nextprops.display !== this.props.display) {
      this.setState({ display: nextprops.display });
    }
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  onChange = (value) => {
    this.setState({ checkBox: value });
  };

  onChangeEmailToDelete = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  deleteAccount = async () => {
    if(this.state.emailToDelete.length < 1){
      message.error("Insert your e-mail if you wish to delete the account.")
    }else if(!(await this.doesClientExist(this.state.emailToDelete))){
      message.error("E-mail doesn't exist.")
    }else{
      const response = await masterDataRede.delete(`/clients/${this.state.emailID}`);
      message.success("Your account was deleted. Sad to see you go :(")
      
      console.log(response);
      this.setState({
        emailToDelete: "",
        emailID: ""
      });
    }
  }

  doesClientExist = async (value) => {
    var exists = false;
    for(var i = 0; i < this.state.clients.length; i++) {
      if (this.state.clients[i].email === value) {
        exists = true;
        await this.setState({ emailID: this.state.clients[i]._id});
        break;
      }
    }
    return exists;
  }

  onFinish = async (values) => {
    if (values.name.length > 255 || values.name.length < 2) {
      message.error("Your name must be at least 2 characters long.");
    } else if (values.email.length > 255 || values.email.length < 8) {
      message.error("Your e-mail is not valid.");
    } else if (values.password.length > 1024 || values.password.length < 8) {
      message.error("Your password is weak. Have at least 8 characters.");
    } else if (!this.state.checkBox) {
      message.error("You have to agree to the RGPD terms.");
    }else {
      try{
        const response = await masterDataRede.post("/clients/register", {
          name: values.name,
          email: values.email,
          password: values.password
        });
        
        console.log(response.data)
        message.success("You were registered "+values.name+". Welcome!");
        
        this.props.handleRegistry(true);
        this.props.isClient(true);
      }catch(error){
        console.log("Error: " +error)
        message.error("This account already exists.");
      }
    }
  };

  onFinishFailed = (errorInfo) => {
    message.error("Error registering.");
    console.log('Failed:', errorInfo);
  };

  render() {
    let pageContent = <div></div>;

    if (this.state.display) {

      pageContent = (
        <div>
          <Form name="basic" style={{width:600, padding: "0 10px 10px"}} initialValues={{remember:true}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
            <Form.Item label="Name" name="name" rules={[{required:true, message:'Please state your name!'}]}><Input/></Form.Item>
            <Form.Item label="E-mail" name="email" rules={[{required:true, message:'Please insert your e-mail!'}]}><Input/></Form.Item>
            <Form.Item label="Password" name="password" rules={[{required:true, message:'Please input your password!'}]}><Input.Password/></Form.Item>
            <Card style={{ width: '100%' }} tabList={tabListNoTitle} activeTabKey={this.state.noTitleKey} onTabChange={key => {this.onTabChange(key, 'noTitleKey');}}>{contentListNoTitle[this.state.noTitleKey]}</Card>
            <Form.Item name="rgpd" onChange={this.onChange}><Checkbox>Agree to RGPD terms.</Checkbox></Form.Item>
            <p><Form.Item> <Button type="primary" htmlType="submit">Register</Button></Form.Item></p>
          </Form>
          <p>---------------------------------------------------------------------------------------------------------</p>
          <h4><b>Delete Account</b></h4>
          <p>Insert your e-mail in the box below and press the 'Delete Account' option.</p>
          <p>
          <Space>
            <Input id="emailToDelete" value={this.state.emailToDelete} onChange={this.onChangeEmailToDelete} style={{ width: 454 }} placeholder="Insert your e-mail here"/>
            <Button onClick={this.deleteAccount} type="primary">Delete Account</Button>
          </Space>
          </p>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

export default RegisterClientComp;