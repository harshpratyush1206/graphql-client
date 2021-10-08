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


const mapStateToProps = (store: any) => ({
    loggedIn: store.posts.loggedIn,
})
const mapDispatchToProps = (dispatch: any) => ({

})

const BRANCH_KEYS: {
    value: string;
    label: string;
    order: number;
}[] = [{
    "value": "branchCode",
    "label": "Branch Code",
    "order": 1
},
{
    "value": "street",
    "label": "Street",
    "order": 2
},
{
    "value": "zip",
    "label": "Zip",
    "order": 3
},
{
    "value": "city",
    "label": "City",
    "order": 4
},
{
    "value": "country",
    "label": "Country",
    "order": 5
}];

class AllBranches extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            branchList: [],
            noDataText: 'Loading Data',
            selectedBranchKeys: BRANCH_KEYS
        };
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push("/");
        }
        else {
            this.loadBranches(this.state.selectedBranchKeys);
        }
    }

    handleKeyChanges = (selectedTypes: any) => {
        selectedTypes = selectedTypes ? selectedTypes : [];
        if (selectedTypes.findIndex((d: any) => d.order === 1) < 0) {
            selectedTypes.push(BRANCH_KEYS.find((d: any) => d.order === 1))
        }

        selectedTypes.sort((a: any, b: any) => { return a.order - b.order });
        this.setState(
            {
                selectedBranchKeys: selectedTypes,
            });
        this.loadBranches(selectedTypes);
    };

    loadBranches(selectedKeys: any[]) {
        let query = prepareQuery(selectedKeys, 'allBranches');
        this.setState({ branchList: [], noDataText: 'Loading Data' })
        executeQuery(query).then(result => {
            this.setState({
                branchList: result.data.allBranches,
                noDataText: 'No Data Found'
            });
        }).catch(error => {
            handleError(error);
            this.setState({ noDataText: 'Error in fetching data' });
        });
    }


    render() {
        return (
            <div className="main-container">
                <Header history={this.props.history} />
                <Container fluid>
                    <Row>
                        <Col md={12} lg={12}>
                            <Row>
                                <Col md={3} className="offset-md-7 float-right">
                                    <Form.Group controlId="formBusinessType">
                                        {/* <Form.Label>Visible Columns</Form.Label> */}

                                        <ReactSelect
                                            isMulti
                                            placeholder="Visible Columns"
                                            className="select-container"
                                            value={this.state.selectedBranchKeys}
                                            onChange={this.handleKeyChanges}
                                            options={BRANCH_KEYS}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={2} >
                                    <Button
                                        variant="success"
                                        className="margin-bottom-20 float-right" onClick={() => { this.props.history.push('createBranch') }}
                                    ><Icon.PlusCircle></Icon.PlusCircle>
                               &nbsp; Create New Branch
                                </Button>
                                </Col>
                            </Row>
                            <Table bordered hover responsive>
                                <thead>
                                    <tr>
                                        {this.state.selectedBranchKeys.map((branchKey: any) => {
                                            return (
                                                <th key={branchKey.value}>{branchKey.label}</th>
                                            )
                                        })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.branchList && this.state.branchList.length > 0
                                        ? this.state.branchList.map((branch: any) => {
                                            return (
                                                <tr key={branch.branchCode}>
                                                    {  this.state.selectedBranchKeys.map((branchKey: any) => {
                                                        return (
                                                            <td key={branchKey.value} >{branch[branchKey.value]}</td>
                                                        )
                                                    })
                                                    }
                                                </tr>
                                            )
                                        })
                                        : <tr><td colSpan={this.state.selectedBranchKeys.length} className="text-center big bold">{this.state.noDataText}</td></tr>
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
export default connect(mapStateToProps, mapDispatchToProps)(AllBranches);
