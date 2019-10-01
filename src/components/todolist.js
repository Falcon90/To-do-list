import React, {Component} from 'react';
import logo from '../blue-logo.53ec088f.png';
import './todolist.css';
import { Button, ButtonToolbar, Table, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';

class Todolist extends Component {

    state = {
        name : "",
        token : "",
        activities : []
    }

    componentDidMount(){
        var token_var = this.props.location.state.key;
        console.log(token_var.token);
        this.setState({
            token: token_var.token
        })

       axios({
            url: 'https://engine-staging.viame.ae/assessment/user/list',
            method: 'get',
            headers: {
                'x-access-token' : token_var.token
            }
        })
     .then(response => {
        this.setState({
            activities: response.data
        })
        console.log(this.state.activities)
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
    const activities = this.state.activities;
    const activitiesList = activities.map((activity) => {
        if(activity.status === 1){
            activity.Textstatus = "Created.";
        }else if(activity.status === 2){
            activity.Textstatus = "Working.";
        }else if(activity.status === 3){
            activity.Textstatus = "Finished.";
        }else if(activity.status === 4){
            activity.Textstatus = "Cancelled.";
        }else{
            activity.Textstatus = "Created.";
        }
        return(
            <tr key={activity._id}> 
                <td>{activity.title}</td>
                <td>{activity.description}</td>
                <td>{activity.Textstatus}</td>
                <td>
                <ButtonGroup>
                <DropdownButton title="Actions" id="bg-nested-dropdown">
                    <Dropdown.Item eventKey="1">Finished</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Working</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Cancel task</Dropdown.Item>
                    <Dropdown.Item eventKey="4">Delete</Dropdown.Item>
                </DropdownButton>
                </ButtonGroup>
                </td>
            </tr>
        )
    })
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
                                    {activitiesList}
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
