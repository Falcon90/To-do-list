import React, {Component} from 'react';
import logo from '../blue-logo.53ec088f.png';
import './register.css';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

class Register extends Component {

    state = {
        name : "",
        pass: "",
        success: "",
        error: ""
    }

    componentDidMount(){
       
    }

    handleRegister = (e) => {
        this.setState({
            success : "",
            error: ""
        })
        e.preventDefault();
        axios.post(`https://engine-staging.viame.ae/assessment/users`, {users: {email: this.state.name, password: this.state.pass}})
        .then(res => {
            this.setState({
                success : "active",
                error: ""
            })
        }).catch(error => {
            console.log(error.response);
            this.setState({
                success : "",
                error: "active"
            })
        });
        /*
        axios.get("https://engine-staging.viame.ae/assessment/users").then(res => {
            console.log(res.data);
            this.setState({
                users: res.data
            })
        })
        */
    }

    changeName = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    changePass = (e) => {
        this.setState({
            pass : e.target.value
        })
    }




render(){
  return (
    <div className="container-fluid">
        <div className="App-header row">
            <div className="col">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Form onSubmit={this.handleRegister} className="registerForm">
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" id="emailReg" placeholder="Your email" required  onChange={this.changeName}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" id="passReg" placeholder="Your password" required  onChange={this.changePass}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Register
                                </Button> 
                                <Link className="linkBtn" to="/login">Already have account? So, login.</Link>
                            </Form>
                            <Alert className={this.state.success} id="successRegister" key="success" variant="success">Thank you for registering, you can<Link className="linkBtn" to="/login">login</Link> now!</Alert>
                            <Alert className={this.state.error} id="faildRegister" key="danger" variant="danger">You are already regisetered!</Alert>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
}

export default Register;
