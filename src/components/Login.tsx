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
} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { login } from "./common/Query";


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

class Login extends Component<LoginProps,LoginState> {
  constructor(props:LoginProps) {
    super(props);
    this.state = {
        username:'',
        isLoading:false,
        password:'',
        setValidated:false,
        validated: false
    };
    this.finalLogin = this.finalLogin.bind(this);
}

  componentDidMount() {
  }

  finalLogin(e:any){
    this.setState({ isLoading: true });
    e.preventDefault();
    
    const form:any = e.currentTarget;

    this.setState({ validated: true, setValidated: true });

    if (form.checkValidity()){
        login(this.state.username,this.state.password).then(result=>{
            store.dispatch({
                type: LOGIN,
                payload: {
                    loggedIn:true,
                    username:this.state.username,
                    token: result.data.login.token
                }
              })
        }).catch(d=>{
            console.log(d)
        }).finally(()=>{      
            this.setState({ isLoading: false });
        })

      }else{
        this.setState({ isLoading: false });
      }
  }

  render(){
      return (<div className="main-container">
      <Header history={this.props.history} />
      
      <Container fluid className="login-container">
                    <Row  className="justify-content-md-center">
                      <Col md={4} >
                      <Card>
                      <Card.Header>Login</Card.Header>
          <Card.Body>
                        <Form
                          className="form-padding"
                          noValidate
                          validated={this.state.validated}
                          onSubmit={this.finalLogin}
                        >
                          <Form.Row>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom01"
                            >
                              <Form.Label>Email</Form.Label>
                              <InputGroup>
                              <InputGroup.Text>  
                              <Icon.PersonCircle/></InputGroup.Text>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Email"
                                  name="username"
                                  onChange={e => this.setState({ username: e.target.value })}
                                  value={this.state.username}
                                />
                              </InputGroup>

                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom01"
                            >
                              <Form.Label>Password</Form.Label>
                              <InputGroup>
                                <InputGroup.Prepend>
                                  <InputGroup.Text>  <Icon.Lock/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                  type="text"
                                  placeholder="Enter your pasword"
                                  name="password"
                                  onChange={e => this.setState({ password: e.target.value })}
                                  value={this.state.password}
                                />
                              </InputGroup>
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form.Row>
                          <div>
                            <Row>
                            </Row>
                            <Row className="mt-10">
                              <Col className="mt-10" md={12}>
                                <Button
                                  type="submit"
                                  size="sm"
                                  variant="success"
                                  className="ml-10 float-right"
                                >
                                  {this.state.isLoading ? (
                                    <Spinner
                                      as="span"
                                      animation="border"
                                      role="status"
                                      aria-hidden="true"
                                      size ="sm"
                                    />
                                  ) : (
                                    ""
                                  )} Login
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Form>
                        </Card.Body>
      </Card>
                      </Col>
                    </Row>
                  </Container>
    
     </div>
      );
  }
  
  }
export default Login;
