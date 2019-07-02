import React, {Component} from 'react';
import { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink, Route } from 'react-router-dom';

import Index from '.';
import Billers from './billers';
// import BuyData from './buy-data';
// import ConfirmData from './confirm-data';
// import Success from './success';
// import  VerifyOtp from './verify-otp'
// import Modal from 'react-responsive-modal';
import * as actions from '../../../redux/actions/bills/export';

class PayBills extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    componentDidMount() {
        if(this.props.bills < 1){
            this.props.fetchBills(this.state.user.token);
        }
    }

    onCloseModal = () => {
        // this.props.resetPinState();
    }


   render() {
    console.log("in billllllssss now- render method")
       return(
           
           <Fragment>
                {this.props.children}
                <Route exact path='/bills/paybills' render={(props) => <Index {...props} />} />
                <Route exact path='/bills/paybills/biller' render={(props) => <Billers {...props} />} />
           </Fragment>
       );
   }
}

const mapStateToProps = state => {
    return{
        bills: state.bills_reducer.bills,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBills : (token) => dispatch(actions.fetchBillBeneficiaries(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayBills);