import * as React from 'react';
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {
    BVN_VERIFICATION_SUCCESS,
    USER_REGISTER_FETCH,
    USER_REGISTER_SAVE
} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";

import {Textbox} from "react-inputs-validation";
import {alertActions} from "../../../redux/actions/alert.actions";
import {modelStateErrorHandler} from "../../../shared/utils";

class VerifyBvn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            error: '',
            otpValue: '',
            formError: '',
            // resendingOtp: false,
            // resendStatus: ""
        };

        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.submitOtp = this.submitOtp.bind(this);
        this.resendCode = this.resendCode.bind(this);
    }

    getRegistrationDetails(){
        const { dispatch } = this.props;
        let props = this.props;
        let userData;
        let registrationStatus = props.registration_status;
        if(registrationStatus === USER_REGISTER_SAVE){
            userData =  props.registration_data.user;
            this.setState({userData: userData});
            this.setState({phone: userData.phone});
            console.log(userData)
        }
    }

    getBvnDetails(){
        const { dispatch } = this.props;
        let bvnDetails = this.props.bvn_details;
        let bvnStatus = bvnDetails.bvn_verification_status;
        let phoneEmail = "";
        if(bvnStatus === BVN_VERIFICATION_SUCCESS){
            let resp = bvnDetails.bvn_verification_data.response;
            this.setState({bvnPhoneNo: resp.bvnPhoneNo, phoneNo: resp.phoneNo});
        }
        else{
           // history.push('/register');
        }
        //dispatch(alertActions.success(this.props.response.data.message.toString()));
    }

    resendCode(){
        this.setState({resendingOtp: true});
        let data = {
            phoneNo: this.state.phoneNo,
            otpType: null,
            imei: '123456789012345'
        },
        consume = ApiService.request(routes.RESENDOTP, "POST", data);
        return consume.then(function(response){
            console.log("Success 🌚🌚");
            console.log(response);
            return (this.setState({resendingOtp: false, resendStatus: "OPT sent!"}));
            // this.setState({resendStatus: "OPT sent!"})
        })
        .catch(err=>{
            console.log(err);
            return(this.setState({resendingOtp: false, resendStatus: err.message}));
        })
    }

    componentDidMount() {
        this.getRegistrationDetails();
        this.getBvnDetails();
    }

    submitOtp(e){
        e.preventDefault();
        this.setState({ submitted: true });
        
        const {otpValue} = this.state;
        // console.log('Submitted', otpValue);
        let props = this.props;
        console.log('Phone number', props.phone);
        let data = {
            phoneNo: this.state.phoneNo,
            otp: this.state.otpValue
        },
        consume = ApiService.request(routes.VERIFYBVNOTP, "POST", data);
        return consume.then(function(response){
           console.log('Succeeded');
            this.setState({ submitted: false });
            history.push('/bvn-customer-details');
        })
        .catch(err=>{
            this.setState({ submitted: false, error: err.response.data.message })
            // this.setState({ submitted: false, error: modelStateErrorHandler(err, 'value.Otp')})
        })
    }

    handleInputBlur(OtpValue){
        this.setState({otpValue: OtpValue});
    }

    render(){
        let userState = this.props.onboarding_user_details;
        let phone = '';
        let state = this.state;
        state.resendingOtp = false;
        state.resendStatus = "";

        const {otpValue, error,submitted} = this.state;
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>BVN verification<span></span></h3>
                        <div className="info-label success">
                            We have sent a verification code to ( {state.bvnPhoneNo} )<br/>
                            Type the code you received below
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <form className="onboard-form" onSubmit={this.submitOtp}>
                        {error && <div className="info-label error">{error}</div>}
                            <div className="input-ctn">
                                <label>Enter OTP code</label>
                                <Textbox
                                    tabIndex="2"
                                    id={'otpValue'}
                                    name="otpValue"
                                    type="number"
                                    maxLength="6"
                                    value={otpValue}
                                    placeholder= "Enter code sent to your phone"
                                    onChange={(otpValue, e) => {
                                        this.setState({ otpValue });
                                    }}
                                    
                                    validationCallback={res =>
                                        this.setState({ hasOtpError: res, validate: false })
                                    }
                                    validationOption={{
                                        name: 'OTP',
                                        check: true,
                                        type: 'number',
                                        min: 6,
                                        msgOnError: 'Six-digit OTP code required',
                                        required: true
                                    }}
                                />
                                {/* <input type="number" onBlur={this.handleInputBlur}/> */}
                            </div>

                            <button type="submit" disabled={submitted} className="btn-alat btn-block">{ submitted ? "Verifying..." : "Continue" }</button>

                        </form>

                        <p>
                            <span className="text-left pull-left">
                                {state.resendingOtp === false && state.resendStatus === "" &&
                                    <a onClick={this.resendCode}>Resend code</a>
                                }
                                {state.resendingOtp === true &&
                                    <span>Resend code</span>
                                }
                                {state.resendingOtp === false && state.resendStatus !== "" &&
                                    <span>{state.resendStatus}</span>
                                }

                            </span>
                            <span className="text-right pull-right">
                                <a href="#">Call my phone</a>
                            </span>
                        </p>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}


function mapStateToProps(state){
    return {
        user_details: state.onboarding_user_details,
        bvn_details: state.onboarding_bvn_details,
        alert: state.alert
    }
}

export default connect(mapStateToProps)(VerifyBvn);