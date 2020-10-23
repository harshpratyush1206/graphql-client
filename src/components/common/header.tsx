import React, { Component } from "react";
import "./header.css";
import { Navbar, Form, Nav, FormControl, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import store from './../../store';
import { connect } from 'react-redux';
import { LOGOUT } from './../../reducers/types';
import { Link, NavLink } from "react-router-dom";

interface HeaderState {
  viewSignOut:boolean;
}
interface HeaderProps {
  history: any;
  loggedIn:string;
}

const mapStateToProps = (store:any) => ({
  loggedIn: store.posts.loggedIn,
})
const mapDispatchToProps = (dispatch:any) => ({

})
class Header extends Component<HeaderProps,HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      viewSignOut: false
    };
    if (props.loggedIn) {
      this.state = {
        viewSignOut: true
      };
    }
    this.signOut = this.signOut.bind(this);
    // this.returnLogoFileName = this.returnLogoFileName.bind(this);
  }
componentDidMount(){

}

  signOut() {
    store.store.dispatch({
      type: LOGOUT,
      payload: {
      }
    })
    this.props.history.push('/login')
  }
  render() {
    return (
      <div className="header-main">
      <Navbar bg="dark" expand="md" variant="dark">
        <Navbar.Brand>     <img
        src="./logo192.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />{' '}
     OakNorth Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {this.state.viewSignOut ?<Nav className="mr-auto">
    
          <Nav.Link as={NavLink}  to="/home">Home</Nav.Link>
          <Nav.Link as={NavLink}  to="/newAccount">Create Account</Nav.Link>
          <Nav.Link as={NavLink}  to="/pricing">Pricing</Nav.Link>:
          
        </Nav>: ""}
        <Form inline>
            {this.state.viewSignOut ? <Nav.Link className="text-white" onClick={this.signOut}> <Icon.BoxArrowInRight /> Sign Out</Nav.Link> : ""}
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button> */}
        </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);