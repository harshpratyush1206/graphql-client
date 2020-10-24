import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Home from './components/home';
import CreateAccount from './components/CreateAccount'
import AllBranches from './components/AllBranches'
import { Slide, ToastContainer } from 'react-toastify';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={true}
        transition={Slide}
      />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/newAccount" exact component={CreateAccount} />
        <Route path='/allBranch' exact component={AllBranches} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
