import React, { Component } from "react";
import Header from './common/header'
import { connect } from "react-redux";
import {
    Button,
    Container,
    Row,
    Col,
    Table,
    Form,
} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { executeQuery, handleError, prepareQuery } from './common/Query';
import ReactSelect from "react-select";

const BANKDETAILS_KEYS: {
    value: string;
    label: string;
    order: number;
    key: string;
    parentKey?: String;
}[] = [{
    "value": "accountNumber",
    "label": "Account Number",
    "order": 1,
    "key": "accountNumber"
},
{
    "value": "user{fullName}",
    "label": "Account Holder",
    "order": 2,
    "key": "fullName",
    "parentKey": "user"
},
{
    "value": "user{address}",
    "label": "Address",
    "order": 3,
    "key": "address",
    "parentKey": "user"
},
{
    "value": "user{email}",
    "label": "Email Address",
    "order": 4,
    "key": "email",
    "parentKey": "user"
},
{
    "value": "user{contact}",
    "label": "Contact",
    "order": 4,
    "key": "contact",
    "parentKey": "user"
},
{
    "value": "branchDetails{branchCode}",
    "label": "Branch Code",
    "order": 5,
    "key": "branchCode",
    "parentKey": "branchDetails"
},
{
    "value": "branchDetails{address}",
    "label": "Branch Address",
    "order": 6,
    "key": "address",
    "parentKey": "branchDetails"
},
{
    "value": "balance",
    "label": "Balance",
    "order": 7,
    "key": "balance"
},
{
    "value": "accountStatus",
    "label": "Account Status",
    "order": 8,
    "key": "accountStatus"
}];

const DEFAULT_KEYS = [{
    "value": "accountNumber",
    "label": "Account Number",
    "order": 1,
    "key": "accountNumber"
},
{
    "value": "user{fullName}",
    "label": "Account Holder",
    "order": 2,
    "key": "fullName",
    "parentKey": "user"
},
{
    "value": "balance",
    "label": "Balance",
    "order": 7,
    "key": "balance"
},
{
    "value": "accountStatus",
    "label": "Account Status",
    "order": 8,
    "key": "accountStatus"
}];


const mapStateToProps = (store: any) => ({
    loggedIn: store.posts.loggedIn,
})
const mapDispatchToProps = (dispatch: any) => ({

})

class Home extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            accountList:
                [],
            noDataText: 'Loading Data',
            selectedBankDetails: DEFAULT_KEYS
        };
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push("/");
        }
        else {
            this.loadBankData(this.state.selectedBankDetails);
        }
    }


    handleKeyChanges = (selectedTypes: any) => {
        selectedTypes = selectedTypes ? selectedTypes : [];
        if (selectedTypes.findIndex((d: any) => d.order === 1) < 0) {
            selectedTypes.push(BANKDETAILS_KEYS.find((d: any) => d.order === 1))
        }

        selectedTypes.sort((a: any, b: any) => { return a.order - b.order });
        this.setState(
            {
                selectedBankDetails: selectedTypes,
            });
        this.loadBankData(selectedTypes);
    };

    loadBankData(selectedKeys: any[]) {
        this.setState({ accountList: [], noDataText: 'Loading Data' })
        executeQuery(prepareQuery(selectedKeys, 'allBank')).then(result => {
            this.setState({ accountList: result.data.allBank, noDataText: 'No Data Found' });
        }).catch(error => {
            handleError(error);
            this.setState({ noDataText: 'Error in fetching data' });
        })
    }


    render() {
        return (
            <div className="main-container">
                <Header history={this.props.history} />
                <Container fluid>
                    <Row>
                        <Col md={12} lg={12}>
                            <Row>
                                <Col md={4} className="offset-md-6 float-right">
                                    <Form.Group controlId="formBankKeys">
                                        {/* <Form.Label>Visible Columns</Form.Label> */}

                                        <ReactSelect
                                            isMulti
                                            placeholder="Visible Columns"
                                            className="select-container"
                                            value={this.state.selectedBankDetails}
                                            onChange={this.handleKeyChanges}
                                            options={BANKDETAILS_KEYS}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={2} >
                                    <Button
                                        variant="success"
                                        className="margin-bottom-20 float-right" onClick={() => { this.props.history.push('newAccount') }}
                                    ><Icon.PlusCircle></Icon.PlusCircle>
                               &nbsp; Create New Account
                                </Button>
                                </Col>
                            </Row>


                            <Table className="table-bordered" hover responsive>
                                <thead>
                                    <tr>
                                        {this.state.selectedBankDetails.map((bankKey: any) => {
                                            return (
                                                <th key={bankKey.value}>{bankKey.label}</th>
                                            )
                                        })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.accountList && this.state.accountList.length > 0
                                        ? this.state.accountList.map((account: any) => {
                                            return (
                                                <tr key={account.accountNumber}>
                                                    {  this.state.selectedBankDetails.map((bankKey: any) => {
                                                        return (
                                                            <td key={bankKey.value}>{bankKey.parentKey && account[bankKey.parentKey]
                                                                ? account[bankKey.parentKey][bankKey.key] : account[bankKey.key]}</td>
                                                        )
                                                    })
                                                    }
                                                </tr>
                                            )
                                        })
                                        : <tr><td colSpan={this.state.selectedBankDetails.length} className="text-center big bold">{this.state.noDataText}</td></tr>
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
