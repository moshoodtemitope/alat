import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import LoanTermsComponent from '../../../shared/components/loans/_loan-terms';

class LoanTerms extends React.Component {
    constructor(props) {
        super(props);
    }

    init = () => {

    }

    PgotoPreviousPage=()=>{
        this.props.history.push('/loans/salary/dashboard')
    }

    PNavigateToWema=()=>{
        this.props.history.push('/loans/salary/wema-setup');
    }

    PNavigateToRemitaOtpSetup=()=>{
        this.props.history.push("/loans/salary/remita-otp")
    }

    PNavigateToRemitaBankSetup=()=>{
        this.props.history.push('/loans/salary/remita-mandate');
    }

    render() {
        return (<Fragment>
            <LoanTermsComponent
                NavigateToWema={this.PNavigateToWema}
                NavigateToRemitaOtpSetup = {this.PNavigateToRemitaOtpSetup}
                NavigateToRemitaBankSetup= { this.PNavigateToRemitaBankSetup}
                NavigateToPreviousPage= { this.PgotoPreviousPage}
            />
        </Fragment>);
    }
}

function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps)(LoanTerms)
