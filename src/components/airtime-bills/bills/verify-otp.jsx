import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Input } from '../../airtime-bills/data/input';
import Select from 'react-select';
import verifyOtp from '../../../assets/img/verify-phone.svg';
import {alertActions} from "../../../redux/actions/alert.actions";

import * as actions from '../../../redux/actions/bills/export';

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
        if(this.validateInputedOTP(this.state.otpFormData.otp.value)){
            let data = {...this.props.otpPayload};
            delete data.Charge;

            let payload = {...data, OTP: this.state.otpFormData.otp.value};
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
        if(updatedFormElement.value.length >= 1){
            if(!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 6){
                return;
            }
        }
        updatedFormElement.valid = true;
        updatedFormElement.touched = true;
        updatedotpFormData[inputIdentifier] = updatedFormElement;
        this.setState({ otpFormData: updatedotpFormData });
    }

    render() {
        var verify;
        //check
        if (this.props.billsInfo != null && this.props.otpConfirmed == 2) {
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
                        <div className="info-label error  m-t-10">{this.props.alert.message}</div> : null
                        }
                                        <p className="m-b-20" >We just sent a verification code to your mobile number</p>
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
                                                    <button disabled={this.props.fetching} onClick={this.onSubmitForm} class="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Confirm"}</button>

                                                        <p onClick={() => {this.props.fetchOtp(this.state.user.token, this.props.otpPayload, true)}} className="resend-otp">Didn't get OTP? Resend Code.</p>
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
        }else if (this.props.otpConfirmed == 0) {
            console.log("redirected on otpC 0");
            this.props.resetPageState(2);
            verify = <Redirect to="/bills/paybills/success" />
        }else{
            console.log("got nothing n redi");
            verify = <Redirect to="/bills/paybills/biller" />
        }

        return verify;
    }
}

const mapStateToProps = state => {
    return {
        billsInfo: state.bills_reducer.billToPay,
        otpConfirmed: state.bills_reducer.pageState,
        alert: state.alert,
        fetching: state.bills_reducer.isFetching,
        phoneNumber: state.authentication.user.phoneNo || state.authentication.user.response.phoneNo,
        otpPayload: state.bills_reducer.otpData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOtp: (token, data, isResending) => dispatch(actions.fetchOtpForCustomer(token, data, isResending)),
        resetPageState: (code) => dispatch(actions.resetBillPage(code)),
        verifyOtpInputed: (token, data) => dispatch(actions.verifyOtpForCustomer(token, data)),
        clearError: () => dispatch(alertActions.clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
