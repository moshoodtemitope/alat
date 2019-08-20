import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import * as util from '../../../shared/utils';
import LoanTermsComponent from '../../../shared/components/loans/_loan-terms';

class LoanOnboardingTerms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.stringify(localStorage.getItem("user")),
        }
    }

    gotoPreviousPage = () => {
        this.props.history.push('/loans')
    }

    NavigateToWema = () => {
        this.props.history.push('/loans/wema-setup');
    }

    NavigateToRemitaOtpSetup = () => {
        this.props.history.push("/loans/remita-otp")
    }

    NavigateToRemitaBankSetup = () => {
        this.props.history.push('/loans/remita-mandate');
    }


    render() {
        return (
            <LoanOnboardingContainer UserName={this.state.user.fullName}>
                <LoanTermsComponent
                    NavigateToWema={this.NavigateToWema}
                    NavigateToRemitaOtpSetup={this.NavigateToRemitaOtpSetup}
                    NavigateToRemitaBankSetup={this.NavigateToRemitaBankSetup}
                    NavigateToPreviousPage={this.gotoPreviousPage}
                />
            </LoanOnboardingContainer>);
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
    }
}

export default connect(mapStateToProps)(LoanOnboardingTerms);