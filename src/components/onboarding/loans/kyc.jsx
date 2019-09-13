import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import * as util from '../../../shared/utils';
import  LoanKycComponent  from '../../../shared/components/loans/_kyc';


class LoanOnbaordingKyc extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        }
    }
    goToNextPage=()=>{
        //this.props.dispatch(LoanActions.clearLoanOnboardingStore());
        this.props.history.push('/loans/salary/dashboard');
    }

    render(){
        return(<LoanOnboardingContainer>
            <LoanKycComponent
             goForward={this.goToNextPage}
            />
        </LoanOnboardingContainer>)
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
       // standing_order: state.loanOnboardingReducerPile.loanStandingOrder,
    }
}

export default connect(mapStateToProps)(LoanOnbaordingKyc);