import React, {Component} from 'react';
import logo from '../blue-logo.53ec088f.png';
import './login.css';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';


class Login extends Component{

    constructor(){
        super();
    }

    state = {
        name : "",
        pass: "",
        active:""
    }

    componentDidMount(){
        
    }

    handleLogin = (e) => {
        e.preventDefault();
        axios.post(`https://engine-staging.viame.ae/assessment/login`, {users: {email: this.state.name, password: this.state.pass}})
        .then(res => {
            if(res.data.error === true){
                console.log("error");
                this.setState({
                    active : "active"
                })
            }else{
                this.setState({
                    active : ""
                })
                this.props.history.push({
                    pathname:"/todolist",
                    state:{
                        key: res.data
                    }
                });
                localStorage.setItem('token', res.data);
            } 
        })
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
    return(
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
                            <Form onSubmit={this.handleLogin} className="loginForm">
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" id="email" placeholder="Your email" required onChange={this.changeName}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" id="password" placeholder="Your password" required onChange={this.changePass}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Login
                                </Button> 
                                <Link className="linkBtn" to="/register">Don't have account? Register.</Link>
                            </Form>
                            <Alert className={this.state.active} id="faildLogin" key="danger" variant="danger">Username or Password is wrong!</Alert>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
}

export default Login;
