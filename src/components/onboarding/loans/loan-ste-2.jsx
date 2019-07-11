import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import OnboardingContainer from '../Container';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants' ;

class LoanOboardingStep2 extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(<h1>Page 3</h1>);
    }

}
function mapStateToProps(state) {
    return {
        alert: state.alert,
        loan_step1: state.loanOnboardingReducerPile.loanOnboardingStep1,
    };
}
export default connect(mapStateToProps)(LoanOboardingStep2);