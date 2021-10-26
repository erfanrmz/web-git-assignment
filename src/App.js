import './App.css';
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {getToken} from "./slices/loginSlice"
import NavBar from "./component/navBar"
import LoginForm from "./component/loginForm"
import Devices from "./component/devices"
import Map from "./component/map"
import Logout from "./component/logout"
import 'leaflet/dist/leaflet.css';


function App() {
  const dispatch = useDispatch();
  dispatch(getToken());
  const {token} = useSelector(state => state.loginReducer);
  const {isSuccess} = useSelector(state => state.deviceReducer);
  return (
    <React.Fragment>
        <NavBar />
        <main className="container">
        <Switch>
            <Route path="/home" render ={props =>{
              if(!token) return <Redirect to = "/login" />;
              return <Devices {...props} />
            }} />
            <Route path="/map" render={props =>{
              if(!token) return <Redirect to="/login" />;
              if(token && !isSuccess) return <Redirect to="/home" />;
              return <Map {...props} />;
            }} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component = {Logout} />
            <Redirect from="/" exact to="/home" />
        </Switch>
        </main>
    </React.Fragment>
    
  );
}

export default App;
