import React, { Component } from 'React';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Input } from '../../../airtime-bills/data/input';
import verifyOtp from '../../../../assets/img/verify-phone.svg';
import { alertActions } from "../../../../redux/actions/alert.actions";
import { maskString } from '../../../../shared/utils'
import * as settingsActions from "../../../../redux/actions/account-settings/export";

const pattern = /^\d+$/;
class VerifyOtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otpFormData: {
                otp: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: ''
                    },
                    value: '',
                },
            },
            hasError: false,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
    }

    validateInputedOTP = (value) => {

        return (value.length >= 4 && value.length <= 6 && pattern.test(value));
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.clearError();
        if (this.validateInputedOTP(this.state.otpFormData.otp.value)) {
            let payload = {
                phoneNo: this.props.forgotPinData.otpPhone,
                otp: this.state.otpFormData.otp.value
            };

            console.log(payload);
            this.props.verifyOtpInputed(this.state.user.token, payload);
        } else {
            this.setState({ hasError: true });
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        if (this.state.hasError == true) {
            this.setState({ hasError: false });
        }
        const updatedotpFormData = {
            ...this.state.otpFormData
        }
        const updatedFormElement = {
            ...updatedotpFormData[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        if (updatedFormElement.value.length >= 1) {
            if (!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 6) {
                return;
            }
        }
        updatedFormElement.valid = true;
        updatedFormElement.touched = true;
        updatedotpFormData[inputIdentifier] = updatedFormElement;
        this.setState({ otpFormData: updatedotpFormData });
    }

    render() {
        let verify = <Redirect to="/settings/pin-management" />
        if (this.props.forgotPinData) {
            const formElementArray = [];
            for (let key in this.state.otpFormData) {
                formElementArray.push({
                    id: key,
                    config: this.state.otpFormData[key]
                });
            }

            verify = (
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">Create ALAT PIN</h4>


                                    <div className="m-t-30 width-300">

                                        <img src={verifyOtp} className="m-t-20 m-b-20" alt="Verify OTP" />
                                        {(this.props.alert.message) ?
                                            <div className="info-label error  m-t-10">{this.props.alert.message}</div> : null
                                        }
                                        <p className="m-b-20" >We just sent a verification code to your mobile number ({maskString(this.props.forgotPinData.otpPhone, "****", 4, 9)})</p>
                                        <form>



                                            {formElementArray.map((formElement) => {
                                                return (
                                                    <div className="input-ctn" key={formElement.id}>
                                                        <Input
                                                            elementType={formElement.config.elementType}
                                                            elementConfig={formElement.config.elementConfig}
                                                            value={formElement.config.value}
                                                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                            />
                                                        {this.state.hasError ? <span className="text-danger">Enter a valid OTP</span> : null}
                                                    </div>
                                                )
                                            })}


                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <button disabled={this.props.fetching} onClick={this.onSubmitForm} class="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Confirm"}</button>

                                                        <p onClick={() => { this.props.fetchOtpAgain(this.state.user.token, this.props.storedInfo, true) }} className="resend-otp">Didn't get OTP? Resend Code.</p>
                                                    </center>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.props.pageState == 0) {
            this.props.resetPageState();
            verify = <Redirect to="/settings/pin-management/create/create-pin" />
        }

        return verify;
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert,
        fetching: state.settings_reducer.isFetching,
        pageState: state.settings_reducer.pageState,
        forgotPinData: state.settings_reducer.forgotPinData,
        storedInfo: state.settings_reducer.storedInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPageState: () => dispatch(settingsActions.resetPageState()),
        verifyOtpInputed: (token, data) => dispatch(settingsActions.verifyOtpForForgotPassword(token, data)),
        fetchOtpAgain: (token, data, isResending) => dispatch(settingsActions.checkSecurityQuestionAnswer(token, data, isResending)),
        clearError: () => dispatch(alertActions.clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
