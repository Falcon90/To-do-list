import React, {Component} from 'react';
import logo from '../blue-logo.53ec088f.png';
import './todolist.css';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import axios from 'axios';

class Todolist extends Component {

    state = {
        name : "",
        token : ""
    }

    componentDidMount(){
        var token_var = this.props.location.state.key;
        console.log(token_var.token);
        this.setState({
            token: token_var.token
        })

       axios({
        url: 'http://engine-staging.viame.ae/assessment/list',
        method: 'get',
        headers: {
            'x-access-token' : token_var.token
        }
     })
     .then(response => {
        console.log(response)
     }) 
     .catch(err => {
        console.log(err);
     });

    }

    handleRegister = (e) => {
        this.setState({
            success : "",
            error: ""
        })
        e.preventDefault();
        axios.post(`https://engine-staging.viame.ae/assessment/users`, {users: {email: this.state.name, password: this.state.pass}})
        .then(res => {
            console.log(res);
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
                        <ButtonToolbar className="toolbar">
                            <Button variant="primary">Logout</Button>
                            <Button variant="primary">Add new task</Button>
                        </ButtonToolbar>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Task</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    </tr>
                                   <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
}

export default Todolist;
