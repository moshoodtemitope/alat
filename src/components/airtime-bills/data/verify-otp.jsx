import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Input } from './input';
import Select from 'react-select';
import verifyOtp from '../../../assets/img/verify-phone.svg';

import {maskString } from '../../../shared/utils';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/dataActions/export';

class VerifyOtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otpFormData: {
                otp: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                },
            },
            hasError: false,
            // saveBeneficiary: true,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        this.props.resetPinState();
    }

    validateInputedOTP = (value) => {
        const pattern = /^\d+$/;
        return (value.length >= 4 && value.length <= 6 && pattern.test(value));
    } 

    onSubmitForm = (event) => {
        event.preventDefault();
        if(this.validateInputedOTP(this.state.otpFormData.otp.value)){
            let payload = {...this.props.dataInfo, OTP: this.state.otpFormData.otp.value};
        delete payload.NetworkCode;
        delete payload.PaymentItem;

        // console.log(payload);
        this.props.verifyOtpInputed(this.state.user.token, payload);
        }else{
            this.setState({ hasError : true});
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        if(this.state.hasError == true){
            this.setState({hasError : false});
        }
        const updatedotpFormData = {
            ...this.state.otpFormData
        }
        const updatedFormElement = {
            ...updatedotpFormData[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = true;
        updatedFormElement.touched = true;
        updatedotpFormData[inputIdentifier] = updatedFormElement;
        this.setState({ otpFormData: updatedotpFormData });
    }

    render() {
        let verify = <Redirect to="/bills/data/buy" />
        //check
        if (this.props.dataInfo != null) {
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

                                    <center>
                                        <img src={verifyOtp} className="m-t-20" alt="Verify OTP" />
                                    </center>

                                    <div className="m-t-30 width-300">
                                        <p className="m-b-20" >We just sent a verification code to your mobile number {this.props.phoneNumber ? " (+"+maskString(this.props.phoneNumber, "****", 8, 11)+")" : "" }</p>
                                        <form>



                                                {formElementArray.map((formElement) => {
                                                    return (
                                                        <div className="input-ctn" key={formElement.id}>
                                                            <Input
                                                                elementType={formElement.config.elementType}
                                                                elementConfig={formElement.config.elementConfig}
                                                                value={formElement.config.value}
                                                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                                wrongInput={!formElement.config.valid}
                                                                isTouched={formElement.config.touched}
                                                                errormsg={formElement.config.error}
                                                                isDisabled={formElement.config.isDisabled} />
                                                                {this.state.hasError ? <small className="text-danger">Enter a valid OTP</small> : null}
                                                        </div>
                                                    )

                                                })}


                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                    <button disabled={this.props.fetching} onClick={this.onSubmitForm} class="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Confirm"}</button>

                                                        <p onClick={() => {this.props.verifyInputedPIN(this.state.user.token, this.props.dataInfo, true)}} className="resend-otp">Didn't get OTP? Resend Code.</p>
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
            if (this.props.otpConfirmed == 0) {
                this.props.resetPinState();
                verify = <Redirect to="/bills/data/buy/success" />
            }
        }

        return verify;
    }
}

const mapStateToProps = state => {
    return {
        dataInfo: state.data_reducer.dataToBuy,
        dataPlans: state.data_reducer.dataPlans,
        accounts: state.data_reducer.debitableAccounts,
        phoneNumber: state.authentication.user.phoneNo,
        fetching: state.data_reducer.isFetching,
        otpConfirmed: state.data_reducer.pinVerified,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPinState: () => dispatch(actions.pinVerificationTryAgain()),
        verifyOtpInputed: (token, data) => dispatch(actions.otpVerificationStart(token, data)),
        verifyInputedPIN : (token, data, isResending) => dispatch(actions.pinVerificationStart(token, data, isResending)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
