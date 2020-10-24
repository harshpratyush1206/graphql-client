import React, { Component } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import * as Icon from 'react-bootstrap-icons';
import Header from './common/header';
import { createAccount, getAllClientsAndBranch, handleError } from "./common/Query";
import ToastProvider from "./common/ToastProvider";

const mapStateToProps = (store: any) => ({
    loggedIn: store.posts.loggedIn,
})
const mapDispatchToProps = (dispatch: any) => ({

})

class CreateAccount extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            branches: [],
            clients: [],
            accountNumber: '',
            branchCode: '',
            city: '',
            country: '',
            street: '',
            zip: '',
            validated: false,
            email: '',
            clientcity: '',
            clientcountry: '',
            clientstreet: '',
            clientzip: '',
            applicantName: '',
            clientId: '',
            clientContact: '',
            setValidated: false
        }
        this.submit = this.submit.bind(this);
        this.selectBranch = this.selectBranch.bind(this);
        this.selectUser = this.selectUser.bind(this);

    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push("/");
        } else {

            getAllClientsAndBranch().then(result => {
                this.setState({ branches: result.data.allBranches, clients: result.data.allClients, noDataText: 'No Data Found' });
            }).catch(error => {
                this.setState({ noDataText: 'Error in fetching data' });
                console.log(error);
            });

        }
    }
    onChange() {

    }

    selectBranch(e: any) {
        let code = e.target.value;
        this.setState({ branchCode: code });
        let branch = this.state.branches.find((d: any) => d.branchCode === code);

        if (branch) {
            this.setState({
                city: branch.city,
                country: branch.country,
                street: branch.street,
                zip: branch.zip,
            })
        } else {
            this.setState({
                city: '',
                country: '',
                street: '',
                zip: '',
            })
        }

    }


    selectUser(e: any) {
        let email = e.target.value;
        this.setState({ email: email });
        let client = this.state.clients.find((d: any) => d.email === email);

        if (client) {
            this.setState({
                clientcity: client.city,
                clientcountry: client.country,
                clientstreet: client.street,
                clientzip: client.zip,
                applicantName: client.fullName,
                clientId: client.id,
                clientContact: client.contact
            })
        } else {
            this.setState({
                clientcity: '',
                clientcountry: '',
                clientstreet: '',
                clientzip: '',
                applicantName: '',
                clientId: '',
                clientContact: ''
            })
        }

    }

    submit(e: any) {
        this.setState({ isLoading: true });
        this.setState({ validated: true, setValidated: true });
        let payload = {
            accountNumber: this.state.accountNumber,
            branchCode: this.state.branchCode,
            userId: this.state.clientId
        };
        e.preventDefault();

        const form: any = e.currentTarget;

        if (form.checkValidity()) {
            createAccount(payload).then(result => {
                ToastProvider.success('Account succesfully created');
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
                                <Card.Header className="text-center">Create A new Account</Card.Header>
                                <Card.Body>
                                    <Form
                                        noValidate
                                        className="form-padding"
                                        validated={this.state.validated}
                                        onSubmit={this.submit}
                                    >
                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="bankAccountNumber">
                                                <Form.Label>Account Number <span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Lock /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Bank Account Number"
                                                        onChange={e => this.setState({ accountNumber: e.target.value })}
                                                        name="accountNumber"
                                                        value={this.state.accountNumber}
                                                        maxLength={200}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid account number.
                            </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group as={Col} md="6" controlId="branchCode">
                                                <Form.Label>Branch Code<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Building /> </InputGroup.Text>
                                                    </InputGroup.Prepend>

                                                    <Form.Control
                                                        required
                                                        as="select"
                                                        placeholder="Branch Code"
                                                        onChange={this.selectBranch}
                                                        name="branchCode"
                                                        value={this.state.branchCode}
                                                    >
                                                        <option key={''} value={''}> {''}</option>
                                                        {this.state.branches.map((branch: any) => {
                                                            return (
                                                                <option key={branch.id} value={branch.branchCode}>
                                                                    {branch.branchCode}
                                                                </option>
                                                            );
                                                        })}
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        Please select a branch.
                                             </Form.Control.Feedback>


                                                </InputGroup>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <span className="sub-title">Branch Details</span> <hr />

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
                                                        value={this.state.street}
                                                        disabled={true}
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
                                                        disabled={true}
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
                                                        disabled={true}
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
                                                        disabled={true}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <span className="sub-title">Applicant Details</span> <hr />
                                            <Form.Group as={Col} md="4" controlId="userId">
                                                <Form.Label>Applicant<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Mailbox /> </InputGroup.Text>
                                                    </InputGroup.Prepend>

                                                    <Form.Control
                                                        required
                                                        as="select"
                                                        placeholder="Applicant Email"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.selectUser}
                                                    >
                                                        <option key={''} value={''}> {''}</option>
                                                        {this.state.clients.map((client: any) => {
                                                            return (
                                                                <option key={client.id} value={client.email}>
                                                                    {client.email}
                                                                </option>
                                                            );
                                                        })}
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        Please select a applicant.
                                             </Form.Control.Feedback>


                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="applicantName">
                                                <Form.Label>Applicant Name<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.PersonBadge /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Applicant Name"
                                                        name="applicantName"
                                                        value={this.state.applicantName}
                                                        disabled={true}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="clientContact">
                                                <Form.Label>Contact<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Phone /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Contact"
                                                        name="clientContact"
                                                        value={this.state.clientContact}
                                                        disabled={true}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="clientstreet">
                                                <Form.Label>Street<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Bicycle /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Street"
                                                        name="clientstreet"
                                                        value={this.state.clientstreet}
                                                        disabled={true}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="clientzip">
                                                <Form.Label>Zip<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.EnvelopeOpen /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Zip"
                                                        name="clientzip"
                                                        value={this.state.clientzip}
                                                        disabled={true}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="clientcity">
                                                <Form.Label>City<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Truck /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="City"
                                                        name="clientCity"
                                                        value={this.state.clientcity}
                                                        disabled={true}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="clientcountry">
                                                <Form.Label>Country<span className="mandat-astrik">*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>  <Icon.Globe /> </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Country"
                                                        name="clientcountry"
                                                        value={this.state.clientcountry}
                                                        disabled={true}
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
                                                        )} Create Account
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);