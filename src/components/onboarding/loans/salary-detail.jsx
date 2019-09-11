import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import OtpValidation from '../../../shared/components/otpvalidation';
import Select from 'react-select';
import {
    FETCH_BANK_PENDING,
    FETCH_BANK_SUCCESS,
    FETCH_BANK_FAILURE,
} from "../../../redux/constants/transfer.constants";
import SalaryDetail from '../../../shared/components/loans/_salary-detail';
//import { getBanks } from "../../../redux/actions/transfer/cash-transfer.actions";
const options = [
];
//import OTPInput from '../../../shared/components/otpInput' //'./otpInput';

class LoanOnbaordingSalaryDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        }
    }
    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.loan_step3)
            if (this.props.loan_step3.loan_step3_status == loanOnboardingConstants.LOAN_STEP3_SUCCESS) {
               // this.fetchBanks();
              //this.setState({ FirstName :this.props.user_detail.loan_userdetails_data.data.FirstName });   
            } else this.props.history.push("/loan/bvn-info");
        else { this.props.history.push("/loan/bvn-info") }
    }

    
    // gotoNextPage = () => {
    //     if (this.props.loan_reqStat)
    //         if (this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS) {
    //             var data = {
    //                 ...this.props.loan_reqStat.loan_reqStat_data.data
    //             };
    //             if (data.response.Response.NextScreen == 0)
    //                 this.props.history.push("/loan/ticket"); //props.forwardurl();
    //             if (data.response.Response.NextScreen == 2)
    //                 this.props.history.push("/loan/salary-entry"); //props.forwardUrl();
    //         }
    // }

    returnToken=()=>{
        if(this.props.loan_step3_data)
        return this.props.loan_step3.loan_step3_data.data.response.token
    }


    render() {
        const { employerName, accountNumber, employerNameInvalid, accountNumberInvalid,
            selectedBankInvalid } = this.state;
        let props = this.props;
        return (
            <LoanOnboardingContainer UserName={this.state.user.firstname}>
                {/* //{this.gotoNextPage()} */}
                <SalaryDetail
                token={this.returnToken()}
                ticketUrl={"/loan/ticket"}
                salaryEntryUrl={"/loan/salary-entry"}
                statementUploadUrl={"/loan/statement-upload"}
                backwardUrl={""}
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
export default connect(mapStateToProps)(LoanOnbaordingSalaryDetails);






