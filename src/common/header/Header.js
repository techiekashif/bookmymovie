import React from 'react';
import './Header.css';
import logoUrl from '../../assets/logo.svg';
import { Component } from 'react';
import Button from "@material-ui/core/Button";
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import FormHelperText from '@material-ui/core/FormHelperText';


const customStylesForLoginPopup = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)'
  }
}
const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  );
}

class Header extends Component {

  constructor() {
    super();
    this.state = {
      loginPopupIsOpen: false,
      loggedIn: false,
      value: 0,
      username: "",
      usernameRequired: "dispNone",
      password: "",
      passwordRequired: "dispNone",
      email: "",
      firstName: "",
      lastName: "",
      mobile: "",
      passwordReg: "",
      firstnameRequired: "dispNone",
      lastnameRequired: "dispNone",
      mobileRequired: "dispNone",
      passwordRegRequired: "dispNone",
      registrationSuccess: false,
      emailRequired: "dispNone"

    }

  }

  openLoginHandler = () => {
    this.setState({ loginPopupIsOpen: true })
  }

  closeLoginHandler = () => {
    this.setState({ loginPopupIsOpen: false })
  }

  tabChangeHandler = (event, value) => {
    console.log(this.state.value)
    this.setState({ value });
    console.log(this.state.value)
  }

  loginClickHandler = () => {

    this.state.username === '' ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
    this.state.password === '' ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

    if (this.state.username === "" || this.state.password === "") { return }

  }

  registerClickHandler = () => {
    console.log("base URl" + this.props.baseUrl)
    this.state.email === '' ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
    this.state.firstName === '' ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
    this.state.lastName === '' ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
    this.state.mobile === '' ? this.setState({ mobileRequired: "dispBlock" }) : this.setState({ mobileRequired: "dispNone" });
    this.state.passwordReg === '' ? this.setState({ passwordRegRequired: "dispBlock" }) : this.setState({ passwordRegRequired: "dispNone" });
    if (this.state.email === "" || this.state.firstname === "" || this.state.lastname === "" || this.state.mobile === "" || this.state.passwordReg === "") { return; }

    let dataForSignUp = JSON.stringify({
      "email_address": this.state.email,
      "first_name": this.state.firstName,
      "last_name": this.state.lastName,
      "mobile_number": this.state.mobile,
      "password": this.state.password
    })

    let xhrSignUpRequest = new XMLHttpRequest();
    let par = this;
    xhrSignUpRequest.addEventListener("readystatechange", function(){
      if(this.readyState === 4){
        console.log(this.responseText);
        par.setState({registrationSuccess: true})
      }
    })

    xhrSignUpRequest.open("POST", this.props.baseUrl +"signup");
    xhrSignUpRequest.setRequestHeader("Content-Type", "application/json");
    xhrSignUpRequest.setRequestHeader("Cache-Control", "no-cache");
    xhrSignUpRequest.send(dataForSignUp);

  }

  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value })
  }

  inputPasswordChangeHandler = (e) => {
    console.log(e)
    console.log(e.target)
    console.log(e.target.value)
    this.setState({ password: e.target.value })
  }

  inputEmailChangeHandler = (e) => {
    this.setState({ email: e.target.value })
  }

  inputFirstnameChangeHandler = (e) => {
    this.setState({ firstName: e.target.value })
  }

  inputLastnameChangeHandler = (e) => {
    this.setState({ lastName: e.target.value })
  }

  inputMobileChangeHandler = (e) => {
    this.setState({ mobile: e.target.value })
  }

  inputPasswordRegChangeHandler = (e) => {
    this.setState({ passwordReg: e.target.value })
  }



  render() {
    return (
      <div>
        <header className='header'>
          <img src={logoUrl} className='header-logo' alt='logo' />
          {!this.state.loggedIn ?
            <div className='login-button'>
              <Button variant='contained' color='default' onClick={this.openLoginHandler}>Login</Button>
            </div>
            :
            <div className='login-button'>
              <Button variant='contained' color='default'>Logout</Button>
            </div>
          }
        </header>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.loginPopupIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeLoginHandler}
          style={customStylesForLoginPopup}>

          <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {this.state.value === 0 &&

            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="username"> Username </InputLabel>
                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              <FormControl required>
                <InputLabel htmlFor="password"> Password </InputLabel>
                <Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
                <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
            </TabContainer>}

          {this.state.value === 1 &&
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" onChange={this.inputEmailChangeHandler} />
                <FormHelperText className={this.state.emailRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              <FormControl required>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input id="firstname" onChange={this.inputFirstnameChangeHandler} />
                <FormHelperText className={this.state.firstnameRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              <FormControl required>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input id="lastname" onChange={this.inputLastnameChangeHandler} />
                <FormHelperText className={this.state.lastnameRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              <FormControl required>
                <InputLabel htmlFor="mobile">Mobile Number</InputLabel>
                <Input id="mobile" onChange={this.inputMobileChangeHandler} />
                <FormHelperText className={this.state.mobileRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              <FormControl required aria-describedby="name-helper-text">
                <InputLabel htmlFor="passwordReg">Password</InputLabel>
                <Input type="password" id="passwordReg" onChange={this.inputPasswordRegChangeHandler} />
                <FormHelperText className={this.state.passwordRegRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              {this.state.registrationSuccess === true &&
                <FormControl>
                  <span className="successText"> Registration Successful. Please Login!</span>
                </FormControl>}<br /><br />
              <Button variant="contained" color="primary" onClick={this.registerClickHandler}>
                REGISTER
              </Button>
            </TabContainer>
          }
        </Modal>


      </div>
    )
  }

}

export default Header;