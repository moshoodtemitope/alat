import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import * as util from '../../../shared/utils';
import  RemitaOtpSetupComponent  from '../../../shared/components/loans/_remita-otp-setup';


class LoanOnboardingRemitaOtpSetUp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user : JSON.parse(localStorage.getItem("user")),
        }
    }

    onConfirm = () => {
        this.props.dispatch(LoanActions.loanValidateRemitaOtp(this.state.user.token));
        //console.log("fired");
      }
  
      goBack=()=>{
          this.props.history.push('/loans/terms');
      }
  
      NavigateToKyc=()=>{
          this.props.history.push('/loans/kyc');
      }

    render() {
        return (
            <LoanOnboardingContainer UserName={this.state.user.fullName}>
                <RemitaOtpSetupComponent
                    onConfirmClick={this.onConfirm}
                    NavigateToPreviousPage={this.goBack}
                    NavigateToKyc={this.NavigateToKyc}
                />
            </LoanOnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
    }
}

export default connect(mapStateToProps)(LoanOnboardingRemitaOtpSetUp);
