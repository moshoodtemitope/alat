import React, {Component} from 'react';
import { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink, Route } from 'react-router-dom';

import Index from './index';
import Modal from 'react-responsive-modal';
import * as actions from '../../../redux/actions/bills/export';

class PayBills extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    componentDidMount() {
        console.log("heeyyyyy Im here paybills")
        // this.props.resetPinState();
        // if(this.props.bills.length < 1){
        //     this.props.fetchBills(this.state.user.token);
        // }
        
    }

    onCloseModal = () => {
        // this.props.resetPinState();
    }


   render() {
       return(
           <Fragment>
                {this.props.children}
                <Route exact path='/bills/bills' render={(props) => <Index {...props} />} />
                {/* <Route exact path='/bills/data/buy' render={(props) => <BuyData {...props} />} />
                <Route path='/bills/data/buy/confirm' render={(props) => <ConfirmData {...props} />} />
                <Route path='/bills/data/buy/success' render={(props) => <Success {...props} />} />
                <Route path='/bills/data/buy/verify' render={(props) => <VerifyOtp {...props} />} /> */}
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