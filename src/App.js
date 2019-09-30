import React from 'react';
import './App.css';
import Login from './components/login';
import Register from "./components/register";
import Todolist from "./components/todolist";
import { Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">  
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/todolist" exact component={Todolist}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
