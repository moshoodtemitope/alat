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
            phoneNumber: ""
        };
    }

    componentDidMount=()=>{
        this.init();
    }
    init=()=>{
        if (this.props.loan_bvn)
        if (this.props.loan_bvn.loan_bvn_status == loanOnboardingConstants.LOAN_VERIFY_BVN_SUCCESS) {
            var data = {

            };
        }else {
            this.props.history.push("/loan/step-3");
        }
        else{ this.props.history.push("/loan/step-3"); }
    }

    handleOnChange = (e) => {
        this.setState({ Otp: e });
    }

    onSubmit = () => {
        this.props.dispatch(actions.validateOtp({

        }));
    }

    onReSubmit() {
        // var bill = {
        //     ...this.props.airtime.airtime_buydata_data.obj.request
        // }
        // this.props.dispatch(airtimeWebPinpayment(this.state.user.token, bill));
    }

    returnOtpValidationMsg() {
        // console.log(this.props.airtime.airtime_buydata_data);
        if(this.props.loan_bvnverify)
        if(this.props.loan_bvnverify.loan_valOtp_status == loanOnboardingConstants.LOAN_VALIDATEOTP_SUCCESS){
            return "It has been sent";
        }
        // if (this.props.airtime.airtime_buydata_data) {
        //         if (this.props.airtime.airtime_buydata_data.obj) {
        //             return this.props.airtime.airtime_buydata_data.obj.response.ValidationMsg;
        //         }
        //         else return "";
        // }else return "";
    }

    render() {
        return (<LoanOnboardingContainer>
            <div className="col-sm-12">
                <div className="max-500">
                    <div className="loan-header-text text-center">
                        <h4 className="text-black">Validate your BVN</h4>
                        <p>Please input the OTP code sent to your mobile phone.</p>
                    </div>
                    <OtpValidation
                        backLink={"/bills/airtime/select-account"}
                        forwardLink={"bills/airtime/done"}
                        submitAction={this.onSubmit}
                        maxLength={6}
                        busyAction={this.props.loan_bvnverify.loan_valOtp_status == loanOnboardingConstants.LOAN_VALIDATEOTP_PENDING}
                        retryAction={null}
                        onResubmitBusyAction={null}
                        displayMessage={this.returnOtpValidationMsg()}
                    />
                    {/* <div className="al-card no-pad">
                        <div className="transfer-ctn">
                            {this.props.alert && this.props.alert.message &&
                                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }
                            <form>
                                <div class="input-ctn">
                                    <label>OTP</label>
                                    <input type="tel" />
                                </div>
                                <label>OTP</label>
                                <OTPInput
                                    //OTP is returned as { TransactionPIN }, so do something like OTP = otp.TransactionPIN
                                    OTPInvalid={this.state.OtpInvalid}
                                    value={this.state.Otp}
                                    onChange={this.handleOnChange}
                                    maxLength={6}
                                />

                                <div className="row">
                                    <div className="col-sm-12">
                                        <center>
                                            <input onClick={this.onSubmit} type="button" value="Validate" className="btn-alat m-t-10 m-b-20 text-center" />
                                        </center>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> */}
                </div>
            </div>
        </LoanOnboardingContainer>);
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingValidateOTP
    };
}
export default connect(mapStateToProps)(LoanOnboardingValidateOTP);
