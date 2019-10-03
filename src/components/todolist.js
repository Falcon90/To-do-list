import React, {Component} from 'react';
import logo from '../blue-logo.53ec088f.png';
import './todolist.css';
import { Button, ButtonToolbar, Table, DropdownButton, Dropdown, ButtonGroup, Modal } from 'react-bootstrap';
import axios from 'axios';

class Todolist extends Component {

    constructor(){
        super();
        if(!this.isAuthenticated()){
            
        }
    }

    state = {
        name : "",
        token : "",
        activities : [],
        show: 0
    }

    isAuthenticated(){
        const token = localStorage.getItem('token');
        if(token && token.length > 10){
            return true;
        }else{
            return false;
        }
    }

    logOut(){
        localStorage.removeItem('token');
        this.props.history.push({
            pathname:"/login",
        });
    }

    componentDidMount(){
        const token_var = localStorage.getItem('token');
        if(token_var && token_var.length > 10){
        
        console.log(token_var);
        this.setState({
            token: token_var
        })

       axios({
            url: 'https://engine-staging.viame.ae/assessment/user/list',
            method: 'get',
            headers: {
                'x-access-token' : token_var
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
    }else{
        this.props.history.push({
            pathname:"/login",
        });
    }

    }

    

    changeStatus = (new_status, activity_id, activity_title, activity_description) => {
        var action = "";
        if(parseInt(new_status) === 20){
            action = "DELETE";
        }else{
            action = "PUT";
        }
        axios({
            url: 'https://engine-staging.viame.ae/assessment/user/task/'+activity_id,
            data: { todolist: {title: activity_title, description: activity_description, status: parseInt(new_status)} },
            method: action,
            headers: {
                'x-access-token' : this.state.token
            }
        }).then(response => {
            var temp_activities = this.state.activities;
            if(parseInt(new_status) !== 20){
            temp_activities.map((activity) => {
                if(activity._id === activity_id){
                    activity.status = parseInt(new_status);
                    if(parseInt(new_status) === 1){
                        activity.Textstatus = "Created.";
                    }else if(parseInt(new_status) === 2){
                        activity.Textstatus = "Working.";
                    }else if(parseInt(new_status) === 3){
                        activity.Textstatus = "Finished.";
                    }else if(parseInt(new_status) === 4){
                        activity.Textstatus = "Cancelled.";
                    }else{
                        activity.Textstatus = "Created.";
                    }
                }
            })
            }else if(parseInt(new_status) === 20){
                temp_activities = temp_activities.filter(function(activity){
                    return activity._id !== activity_id;
                });
            }
            console.log(temp_activities);
            this.setState({
                activities: temp_activities
            })
        }).catch(err => {
            console.log(err);
        });
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
                <DropdownButton title="Actions" id="bg-nested-dropdown" onSelect={(new_status) => {this.changeStatus(new_status, activity._id,activity.title,activity.description)}}> 
                    <Dropdown.Item eventKey="3">Finished</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Working</Dropdown.Item>
                    <Dropdown.Item eventKey="4">Cancel task</Dropdown.Item>
                    <Dropdown.Item eventKey="20">Delete</Dropdown.Item>
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
                            <Button variant="primary" onClick={() => {this.logOut()}}>Logout</Button>
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
        <Modal.Dialog show={this.state.show}>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    </div>
  );
}
}

export default Todolist;
