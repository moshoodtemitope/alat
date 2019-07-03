import React, {Component} from 'react';
import { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink, Route } from 'react-router-dom';

import Index from '.';
import BuyData from './buy-data';
import ConfirmData from './confirm-data';
import Success from './success';
import  VerifyOtp from './verify-otp'
import Modal from 'react-responsive-modal';
import * as actions from '../../../redux/actions/dataActions/export';

class Data extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    componentDidMount() {
        console.log("in data now")
        this.props.resetPinState();
        if(this.props.beneficiaries < 1){
            this.props.fetchBeneficiaries(this.state.user.token);
        }
        
    }

    onCloseModal = () => {
        this.props.resetPinState();
    }


   render() {
    console.log("in data now- render method")
       return(
           
           <Fragment>
                {this.props.children}
                <Route exact path='/bills/data' render={(props) => <Index {...props} beneficiaries={this.props.beneficiaries} isFetching={this.props.fetching} />} />
                <Route exact path='/bills/data/buy' render={(props) => <BuyData {...props} />} />
                <Route path='/bills/data/buy/confirm' render={(props) => <ConfirmData {...props} />} />
                <Route path='/bills/data/buy/success' render={(props) => <Success {...props} />} />
                <Route path='/bills/data/buy/verify' render={(props) => <VerifyOtp {...props} />} />
           </Fragment>
       );
   }
}

const mapStateToProps = state => {
    return{
        beneficiaries : state.data_reducer.beneficiaries,
        fetching: state.data_reducer.isFetching,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBeneficiaries : (token) => dispatch(actions.fetchDataBeneficiaries(token)),
        resetPinState: () => dispatch(actions.pinVerificationTryAgain()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Data);