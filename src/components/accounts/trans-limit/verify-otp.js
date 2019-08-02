import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Input } from '../../airtime-bills/data/input';
import verifyOtp from '../../../assets/img/verify-phone.svg';
import { alertActions } from "../../../redux/actions/alert.actions";
import successLogo from '../../../assets/img/success.svg';
import { maskString } from '../../../shared/utils';

import * as actions from '../../../redux/actions/accounts/export';

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
            let payload = { ...this.props.limitInfo, OTP: this.state.otpFormData.otp.value };

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
        var verify =<Redirect to='/account/account-limit' />;
        if (this.props.limitInfo != null) {
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
                                    <h4 className="m-b-10 center-text hd-underline">OTP Verification</h4>


                                    <div className="m-t-30 width-300">

                                        <img src={verifyOtp} className="m-t-20 m-b-20" alt="Verify OTP" />
                                        {(this.props.alert.message) ?
                                            <div className="info-label error  m-t-10">{this.props.alert.message} {this.props.alert.message.indexOf("this PIN is wrong. Retry with the right") != -1 ? <Link to='/account/account-limit' className="btn-alat m-t-10 m-b-20 text-center">Click to retry pin</Link>: null}</div> : null
                                        }
                                        <p className="m-b-20" >We just sent a verification code to your mobile number ({maskString(this.props.phoneNumber,"****", 5, 9)})</p>
                                        <form>
                                            {formElementArray.map((formElement) => {
                                                return (
                                                    <div className="input-ctn" key={formElement.id}>
                                                        <Input
                                                            elementType={formElement.config.elementType}
                                                            elementConfig={formElement.config.elementConfig}
                                                            value={formElement.config.value}
                                                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                                        {this.state.hasError ? <small className="text-danger">Enter a valid OTP</small> : null}
                                                    </div>
                                                )

                                            })}


                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <button disabled={this.props.sending} onClick={this.onSubmitForm} class="btn-alat m-t-10 m-b-20 text-center">{this.props.sending ? "Processing..." : "Confirm"}</button>

                                                        <p onClick={() => { this.props.fetchOtp(this.state.user.token, {PhoneNo: this.props.phoneNumber}, true) }} className="resend-otp">Didn't get OTP? Resend Code.</p>
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
        if (this.props.otpConfirmed == 0 ) {
            // this.props.resetPageState(2);
            verify = (
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card">
                                    <center>
                                        <img src={successLogo} className="m-b-30 m-t-20" alt="Success" />
                                    </center>
                                    <h4 className="center-text red-text">Transaction limit set successfully</h4>
                                    <div className="row m-t-30">
                                        <div className="col-sm-12">
                                            <center>
                                                <Link to='/account/account-limit' class="btn-alat m-t-10 m-b-20 text-center">Go Back</Link>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return verify;
    }
}

const mapStateToProps = state => {
    return {
        limitInfo: state.accountsM_reducer.limitData,
        otpConfirmed: state.accountsM_reducer.pageState,
        alert: state.alert,
        phoneNumber: state.authentication.user.phoneNo || state.authentication.user.response.phoneNo,
        sending: state.accountsM_reducer.isFetching,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNewLimit: (token, payload) => dispatch(actions.sendTransactionLimit(token, payload)),
        clearError: () => dispatch(alertActions.clear()),
        resetPageState: (value) => dispatch(actions.resetPageState(value)),
        fetchOtp : (token, data, isResending) => dispatch(actions.getOtpForCustomer(token, data, isResending)),
        verifyOtpInputed: (token, payload) => dispatch(actions.sendTransactionLimit(token,payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
