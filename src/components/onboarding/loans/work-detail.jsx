import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import EmployerDetails from '../../../shared/components/loans/_employer-details';

import SalaryDetail from '../../../shared/components/loans/_salary-detail';
//import { getBanks } from "../../../redux/actions/transfer/cash-transfer.actions";
const options = [
];

class LoanOnboardingWorkDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
    }

    render() {
        return (
            <LoanOnboardingContainer UserName={this.state.user.firstname}>
                <EmployerDetails
                    token={this.state.user.token}
                    forwardUrl={'/loan/salary-detail'}
                    // backwardUrl={'/loans/salary/calc'}
                />
            </LoanOnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        //loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        loan_val_otp: state.loanOnboardingReducerPile.loanOnboardingValidateOTP,
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        loan_step3: state.loanOnboardingReducerPile.loanOnboardingStep3,
        bankList: state.transferReducerPile.transfer_bankList,
        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
        //user_detail: state.loanOnboardingReducerPile.loanUserDetails,
    };
}
export default connect(mapStateToProps)(LoanOnboardingWorkDetail);