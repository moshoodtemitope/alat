import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { Link, NavLink, Route } from 'react-router-dom';

import Index from '.';
import CreateWithdarwal from './create-withdrawal';
import ConfirmWithdrawal from './confirm-withdrawal';
import VerifyOtp from './verify-otp';
import Success from './success';

class CardlessWithdrawal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    componentDidMount() {

    }



   render() {
       return(
           <Fragment>
                {this.props.children}
                <Route exact path='/cardless-withdrawal' render={(props) => <Index {...props} />} />
                <Route path='/cardless-withdrawal/create' render={(props) => <CreateWithdarwal {...props} />} />
                <Route path='/cardless-withdrawal/confirm' render={(props) => <ConfirmWithdrawal {...props} />} />
                <Route path='/cardless-withdrawal/verify' render={(props) => <VerifyOtp {...props} />} />
                <Route path='/cardless-withdrawal/success' render={(props) => <Success {...props} />} />
           </Fragment>
       );
   }
}


export default CardlessWithdrawal;