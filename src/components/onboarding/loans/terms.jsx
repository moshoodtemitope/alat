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

    PgotoPreviousPage = () => {
        this.props.history.push('/loans')
    }

    PNavigateToWema = () => {
        this.props.history.push('/loans/wema-setup');
    }

    PNavigateToRemitaOtpSetup = () => {
        this.props.history.push("/loans/remita-otp")
    }

    PNavigateToRemitaBankSetup = () => {
        this.props.history.push('/loans/remita-mandate');
    }


    render() {
        return (
            <LoanOnboardingContainer UserName={this.state.user.fullName}>
                <LoanTermsComponent
                    NavigateToWema={this.PNavigateToWema}
                    NavigateToRemitaOtpSetup={this.PNavigateToRemitaOtpSetup}
                    NavigateToRemitaBankSetup={this.PNavigateToRemitaBankSetup}
                    NavigateToPreviousPage={this.PgotoPreviousPage}
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