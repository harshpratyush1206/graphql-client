import React, { Component } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import * as Icon from 'react-bootstrap-icons';
import Header from './common/header';
import { createBranch, handleError } from "./common/Query";
import ToastProvider from "./common/ToastProvider";

const mapStateToProps = (store: any) => ({
    loggedIn: store.posts.loggedIn,
})
const mapDispatchToProps = (dispatch: any) => ({

})

class CreateBranch extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            branchCode: '',
            city: '',
            country: '',
            street: '',
            zip: '',
            validated: false,
            setValidated: false,
            isLoading:false
        }
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push("/");
        }
    }
    onChange() {

    }


    submit(e: any) {
        this.setState({ isLoading: true });
        this.setState({ validated: true, setValidated: true });
        let payload = Object.assign({},this.state as any);
        e.preventDefault();

        const form: any = e.currentTarget;

        if (form.checkValidity()) {
            delete payload.validated;
            delete payload.setValidated;
            delete payload.isLoading;
            createBranch(payload).then(result => {
                ToastProvider.success('Branch succesfully created');
                this.props.history.push('/home')
            }).catch(d => {
                handleError(d)
            }).finally(() => {
                this.setState({ isLoading: false });
            })

        } else {
            this.setState({ isLoading: false });
        }

    }

    render() {
        return (
            <div className="main-container">
                <Header history={this.props.history} />
                <Container fluid>
                    <Row>
                        <Col md={12} >
                            <Card>
                                <Card.Header className="text-center">Create Branch</Card.Header>
                                <Card.Body>
                                    <Form
                                        noValidate
                                        className="form-padding"
                                        validated={this.state.validated}
                                        onSubmit={this.submit}
                                    >

                                        <Form.Row>
                                            <span className="sub-title">Branch Details</span> <hr />


                                            <Form.Group as={Col} md="4" controlId="branchCode">
                                                <Form.Label>Branch Code<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Building /> </InputGroup.Text>
                                                    </InputGroup.Prepend>

                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Branch Code"
                                                        name="branchCode"
                                                        onChange={e => this.setState({ branchCode: e.target.value })}
                                                        value={this.state.branchCode}
                                                    >
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        Please enter valid branch code.
                                             </Form.Control.Feedback>


                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="street">
                                                <Form.Label>Street<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Bicycle /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Street"
                                                        name="street"
                                                        onChange={e => this.setState({ street: e.target.value })}
                                                        value={this.state.street}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="zip">
                                                <Form.Label>Zip<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.EnvelopeOpen /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Zip"
                                                        name="zip"
                                                        value={this.state.zip}
                                                        onChange={e => this.setState({ zip: e.target.value })}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="city">
                                                <Form.Label>City<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Truck /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="City"
                                                        name="accountNumber"
                                                        value={this.state.city}
                                                        onChange={e => this.setState({ city: e.target.value })}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="country">
                                                <Form.Label>Country<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Globe /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Country"
                                                        name="country"
                                                        value={this.state.country}
                                                        onChange={e => this.setState({ country: e.target.value })}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </Form.Row>
                                        <Row className="mt-10">
                                            <Col className="mt-10" md={12}>
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    variant="success"
                                                    className="ml-10 float-right"
                                                    disabled={this.state.isLoading}
                                                >
                                                    {this.state.isLoading ? (
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            role="status"
                                                            aria-hidden="true"
                                                            size="sm"
                                                        />
                                                    ) : (
                                                            ""
                                                        )} Create Branch
                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBranch);