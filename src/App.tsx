import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Home from './components/home';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home}/>
        {/* <Route path="/home" exact component={Landing} />
        <Route path="/prescreeningComments" exact component={PreScreeningComments} />
        <Route path="/submitted" exact component={LandingSubmittedForm} />
        <Route path="/forgiveness-document" exact component={LandingForgivePage} />
        <Route path="/forgiveness-followup" exact component={ForgivenessFollowup} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
