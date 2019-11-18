import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import OtpValidation from '../../../shared/components/otpvalidation';
import OTPInput from '../../../shared/components/otpInput' //'./otpInput';

class LoanOnboardingValidateOTP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OtpInvalid: false,
            Otp: "",
            bvn: "",
            phoneNumber: "",
            finacleEmail: ""

        };
    }

    componentDidMount=()=>{
        this.init();
    }
    init=()=>{
        if (this.props.loan_bvn)
        if (this.props.loan_bvn.loan_bvn_status == loanOnboardingConstants.LOAN_VERIFY_BVN_SUCCESS) {
            var data = {
                ...this.props.loan_bvn.loan_bvn_data.data
            };
            this.setState({ phoneNumber : data.request.phoneNo, 
                bvnPhoneNo : data.response.bvnPhoneNo,
                bvn: data.request.bvn, 
                finacleEmail : data.response.finacleEmail  })
        }else {
            this.props.history.push("/loan/step-3");
        }
        else{ this.props.history.push("/loan/step-3"); }
    }

    handleOnChange = (e) => {
        this.setState({ Otp: e.TransactionPin });
    }

    onSubmit = (otp) => {
        this.props.dispatch(actions.validateOtp({
            "bvn": this.state.bvn,
            "otp": otp.TransactionPin,
            "phoneNo": this.state.phoneNumber
        }));
    }

    onReSubmit=()=> {
        this.props.dispatch(actions.ReSendOtp({bvn : this.state.bvn}));
        // this.props.dispatch(airtimeWebPinpayment(this.state.user.token, bill));
    }

    gotoNextPage=()=>{
        if(this.props.loan_val_otp)
        if(this.props.loan_val_otp.loan_valOtp_status == loanOnboardingConstants.LOAN_VALIDATEOTP_SUCCESS){
            return (<Redirect to="/loan/bvn-info"/>)
        }
    }

    returnOtpValidationMsg() {
        // console.log(this.props.airtime.airtime_buydata_data);
        if (this.props.loan_bvn)
        if (this.props.loan_bvn.loan_bvn_status == loanOnboardingConstants.LOAN_VERIFY_BVN_SUCCESS) {
            return  `OTP has been sent to ${this.props.loan_bvn.loan_bvn_data.data.response.bvnPhoneNo}`;
        }else return "";
    }

    render() {
        return (<LoanOnboardingContainer>
            {this.gotoNextPage()}
            <div className="col-sm-12">
                <div className="max-500">
                    <div className="loan-header-text text-center">
                        <h4 className="text-black">Validate your BVN</h4>
                        <p>Please input the OTP code sent to your mobile phone.</p>
                    </div>
                    <OtpValidation
                        backLink={"/bills/airtime/select-account"}
                        forwardLink={"bills/airtime/done"}
                        ActionText={"Validate"}
                        submitAction={this.onSubmit}
                        maxLength={6}
                        busyAction={this.props.loan_val_otp.loan_valOtp_status == loanOnboardingConstants.LOAN_VALIDATEOTP_PENDING}
                        retryAction={this.onReSubmit}
                        onResubmitBusyAction={this.props.resend_otp.resendotp_status == loanOnboardingConstants.LOAN_RESENTOTP_PENDING}
                        // retryAction={this.onReSubmit}
                        // onResubmitBusyAction={this.props.airtime.airtime_buydata == airtimeConstants.AIRTIME_WEBPIN_PENDING}
                        displayMessage={this.returnOtpValidationMsg()}
                    />
                </div>
            </div>
        </LoanOnboardingContainer>);
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        loan_val_otp: state.loanOnboardingReducerPile.loanOnboardingValidateOTP,
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        resend_otp: state.loanOnboardingReducerPile.loanResendOTP
    };
}
export default connect(mapStateToProps)(LoanOnboardingValidateOTP);
