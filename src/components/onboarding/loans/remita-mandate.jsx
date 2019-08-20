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

    checkKycStatus = () => {
        //this.props.dispatch();
        this.props.history.push("/loans/kyc");
    }

    render() {
        return (
            <LoanOnboardingContainer UserName={this.state.user.fullName}>
                <RemitaMandateSetupComponent
                    onConfirmClick={this.onConfirm}
                    NavigateToKyc={this.checkKycStatus}
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