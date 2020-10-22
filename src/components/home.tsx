import React, { Component } from "react";
import Header from './common/header'
import { LOGIN } from "./../reducers/types";
import { connect } from "react-redux";
import store from "./../store";
import {
  Spinner,
  InputGroup,
  Navbar,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Nav,
  Card,
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { getAllbank } from './common/Query';


const initialState = {
  selectedOption: "",
  otpSent: false,
  isLoading: false,
};

interface LoginState {
    username:string,
    isLoading: boolean,
    password:string,
    validated:boolean;
    setValidated:boolean;
  }
  interface LoginProps {
    history: any;
    loggedIn:boolean;
  }

class Home extends Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state= {accountList:
        []};
    getAllbank().then(result=>{
        this.setState({accountList:result.data.allBank});
    }).catch(error=> console.log(error))
}

  componentDidMount() {
      
  }


  render(){
    return (
        <Row>
          <Col md={12} lg={12}>
            <div className="displayTableOverflow">
              {this.state.accountList && this.state.accountList.length > 0
                ? this.state.accountList.map((doc:any) => {
                    return (
                      <ListGroup.Item key={doc.accountNumber}>
                        <Row>
                          <Col className={doc.changed ? "newValue" :"" }  md={4} xs={12}>
                            {doc.accountNumber}
                          </Col>
                          <Col className={doc.changed ? "newValue" :"" }  md={4} xs={12}>
                            {doc.branchCode}
                          </Col>
                          <Col className={doc.changed ? "newValue" :"" }  md={4} xs={12}>
                            {doc.accountNumber}
                          </Col>
                        
                          <Col md={2} >
                            {doc.accountStatus}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })
                : ""}
            </div>
          </Col>
        </Row>
      );
  }
  
  }
export default Home;
