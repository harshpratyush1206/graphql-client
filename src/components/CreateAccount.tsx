import React,{ Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import Header from './common/header';

const mapStateToProps = (store: any) => ({
    loggedIn: store.posts.loggedIn,
})
const mapDispatchToProps = (dispatch: any) => ({

})

class CreateAccount extends Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state={
            new:""
        }
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push("/");
        }
    }

    render(){
        return (
        <div className="main-container">
        <Header history={this.props.history} />
        <Container fluid>
        This is a new form

            </Container>
            </div>
        )
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);