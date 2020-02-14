import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import  RemitaOtpSetupComponent  from '../../../shared/components/loans/_remita-otp-setup';

class LoanRemitaOtpSetUp extends React.Component {
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
        this.props.history.push('/loans/salary/terms');
    }

    NavigateToKyc=()=>{
        this.props.history.push('/loans/salary/kyc');
    }

    NavigateToLoanDashBoard=()=>{
        this.props.dispatch(LoanActions.clearLoanOnboardingStore());
        this.props.history.push('/loans/salary/dashboard');
    }

    render() {
        return (<RemitaOtpSetupComponent
            onConfirmClick={this.onConfirm}
            NavigateToPreviousPage={this.goBack}
            // gotoDashboard={this.NavigateToLoanDashBoard}
            NavigateToKyc={this.NavigateToKyc}
        />);
    }
}

function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps)(LoanRemitaOtpSetUp)
