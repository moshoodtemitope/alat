import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import * as util from '../../../shared/utils';
import RemitaMandateSetupComponent from '../../../shared/components/loans/_remita-mandate-setup';


class LoanOnboardingRemitaMandateSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        }
    }

    confirmClick = () => {
        this.props.dispatch(LoanActions.loanMandateStatus(this.state.user.token));
    }

    NavigateToCollectionDone =()=>{
        this.props.history.push("/loan/wema-setup");
    }

    checkKycStatus = () => {
        //this.props.dispatch();
        this.props.history.push("/loan/kyc");
    }
    goBack=()=>{}

    render() {
        return (
            <LoanOnboardingContainer UserName={this.state.user.fullName}>
                <RemitaMandateSetupComponent
                    onConfirm={this.confirmClick}
                    NavigateToCollectionDone ={this.NavigateToCollectionDone}
                    NavigateToKyc={this.checkKycStatus}
                    NavigateToPreviousPage = {this.goBack}
                />
            </LoanOnboardingContainer>);
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
    }
}

export default connect(mapStateToProps)(LoanOnboardingRemitaMandateSetup);