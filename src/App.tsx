import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Home from './components/home';
import CreateAccount from './components/CreateAccount'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home}/>
        <Route path="/newAccount" exact component={CreateAccount}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
