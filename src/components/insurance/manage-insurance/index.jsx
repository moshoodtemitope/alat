
import React, { Component, Fragment } from 'react';
import {Link, NavLink, Route} from 'react-router-dom';
import { connect } from "react-redux";

import ManageInsurance from "./manage-insurance";
import BuyPolicy from "./buy-policy";
import SelectInsuranceCover from "./select-cover";
import ProvideDetails from "./provide-details";
import PolicyDetails from "./policy-details";
import MakePaymentForInsurance from "./makepayment";
import PaymentSuccess from "./payment-success";

class ManageInsuranceContainer extends Component {
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
                <Route exact path='/insurance' render={(props) => <ManageInsurance {...props} />} />
                <Route exact path='/insurance/buy-insurance' render={(props) => <BuyPolicy {...props} />} />
                <Route exact path='/insurance/buy-insurance/choose-cover' render={(props) => <SelectInsuranceCover {...props} />} />
                <Route exact path='/insurance/buy-insurance/details' render={(props) => <ProvideDetails {...props} />} />
                <Route exact path='/insurance/buy-insurance/policydetails' render={(props) => <PolicyDetails {...props} />} />
                <Route exact path='/insurance/buy-insurance/makepayment' render={(props) => <MakePaymentForInsurance {...props} />} />
                <Route exact path='/insurance/payment-success' render={(props) => <PaymentSuccess {...props} />} />
           </Fragment>
       );
   }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
    };
}

export default connect(mapStateToProps)(ManageInsuranceContainer);
//export default Airtime;