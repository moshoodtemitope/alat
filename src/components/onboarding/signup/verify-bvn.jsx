import * as React from 'react';
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {
    BVN_VERIFICATION_SUCCESS,
    USER_REGISTER_FETCH,
    USER_REGISTER_SAVE,
    OTP_VERIFICATION_FAILURE,
    DATA_FROM_BVN,
    SKIP_BVN_SUCCESS,
    SAVE_BVN_INFO,
    OTP_VERIFICATION_PENDING
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
            this.setState({userData: userData, phone: userData.phone});
        }
    }

    getBvnDetails(){
        const { dispatch } = this.props;
        let bvnDetails = this.props.customer_bvnverification_details;
        let bvnSkipDetails = this.props.customer_bvnskip_details;
        let bvnSkipStatus = bvnSkipDetails.bvn_verification_status;
        
        let bvnStatus = bvnDetails.bvn_verification_status;
        let phoneEmail = "";
        if(bvnStatus === BVN_VERIFICATION_SUCCESS){
            let resp = bvnDetails.bvn_verification_data.response;
            this.setState({otpSent: true, bvnPhoneNo: resp.bvnPhoneNo, phoneNo: resp.phoneNo});
        }
        else if(bvnSkipStatus ===SKIP_BVN_SUCCESS){
            let resp = bvnSkipDetails.bvn_verification_data.response;
            this.setState({otpSent: true,phoneNo: resp.phoneNo, maskedPhoneNo:resp.maskedPhoneNo});
        }
        else{
            this.setState({otpSent: false});
             history.push('/register');
             
        }
        
    }

    resendCode(){
        this.setState({resendingOtp: true});
        this.setState({error: ''});
        let data = {
            phoneNo: this.state.phoneNo,
            otpType: null,
            imei: '123456789012345'
        },
        consume = ApiService.request(routes.RESENDOTP, "POST", data);
        return consume.then((response)=>{
            // return (this.setState({resendingOtp: false, otpSent: true,  resendStatus: "OPT sent!"}));
            
            this.setState({resendingOtp: false, otpSent: true, failedVerfication:false,  resendStatus: "OPT sent!"})
            
        })
        .catch(err=>{
            //new
           
            this.setState({resendingOtp: false, otpSent: false, otpStatusMessage: modelStateErrorHandler(err.response.data)});
           
           
        })
    }

    componentDidMount() {
        this.getRegistrationDetails();
        this.getBvnDetails();
    }

    submitOtp(e){
        e.preventDefault();
        if(document.querySelector('#otpValue').value.length < 6){
            this.setState({submitDisabled: true});
            document.querySelector('.OtpTextVal').classList.add('form-error');
        }else{
            // this.setState({emptyOtp: false});
            
            // this.setState({submitDisabled: false});
            if(document.querySelector('.OtpTextVal').classList.contains('form-error')){
                document.querySelector('.OtpTextVal').classList.remove('form-error')
            }
        
        
            this.setState({otpStatusMessage: '',otpSent:false, submitted: true, submitDisabled : true, failedVerfication: false});
        
            const {otpValue} = this.state;
            let props = this.props;
            const { dispatch } = this.props;
            let data = {
                phoneNo: this.state.phoneNo,
                otp: this.state.otpValue
            };
            
            if(!data.phoneNo){
                this.setState({ submitted: false,submitDisabled : true, failedVerfication:true, otpStatusMessage: 'This action is not allowed'})
                 setTimeout(()=>history.push('/register'), 2000);
            }else{
                let consume = ApiService.request(routes.VERIFYBVNOTP, "POST", data);
                return consume.then(function(response){
                    console.log(response);
                    dispatch(userActions.saveBvnData(response, SAVE_BVN_INFO));
                    history.push('/register/confirm-bvndetails', 
                    {userPhone:props.location.state.userPhone});
                })
                .catch(err=>{
                    console.log('error msg is ', err);
                    this.setState({ submitted: false,submitDisabled : false, failedVerfication:true, otpStatusMessage: modelStateErrorHandler(err.response.data), error: err.response.data.message })
                    
                    // history.push('/register/confirm-bvndetails');
                    
                })
            }

            // dispatch(userActions.saveBvnInfo(data));

            // return consume.then(function(response){
            
            //     this.setState({ submitted: false });
            //     history.push('/register/confirm-bvndetails');
            // })
            // .catch(err=>{
            //     this.setState({ submitted: false, error: err.response.data.message })

            //     this.setState({submitDisabled : false})
            //     history.push('/register/confirm-bvndetails');
                
            // })
        }
    }

    handleInputBlur(OtpValue){
        this.setState({otpValue: OtpValue});
    }

    render(){
        let userState = this.props.onboarding_user_details;
        let phone = '';
        let state = this.state;
        let props = this.props;
        state.resendingOtp = false;
        state.resendStatus = "";
        
        
        const {otpValue, error,submitted, emptyOtp, submitDisabled} = this.state;
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>BVN verification<span></span></h3>
                        {state.otpSent===true &&
                            <div className="info-label success">
                                We have sent a verification code to ( {(state.bvnPhoneNo) && state.bvnPhoneNo} {(!state.bvnPhoneNo && state.maskedPhoneNo) && state.maskedPhoneNo} )<br/>
                                Type the code you received below
                            </div>
                        }

                        {(state.otpSent===false || state.failedVerfication ===true ) && (state.otpStatusMessage!=="" && state.otpStatusMessage!==undefined) &&
                            <div className="info-label error">
                               {state.otpStatusMessage}
                            </div>
                        }

                            {/* {props.alert && props.alert.message &&
                                <div className={`info-label ${props.alert.type}`}>{props.alert.message}</div>
                            } */}

                        {/* {otpSent==false &&
                            
                        } */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <form className="onboard-form" onSubmit={this.submitOtp}>
                        {/* {error && <div className="info-label error">{error}</div>} */}
                            <div className="input-ctn OtpTextVal">
                                <label>Enter OTP code</label>
                                <Textbox
                                    tabIndex="2"
                                    id={'otpValue'}
                                    name="otpValue"
                                    type="password"
                                    maxLength="6"
                                    value={otpValue}
                                    placeholder= "Enter code sent to your phone"
                                    onChange={(otpValue, e) => {
                                        this.setState({ otpValue, error: '', otpStatusMessage: '' });
                                        if(otpValue.length < 6){
                                            this.setState({submitDisabled: true, emptyOtp: true });
                                            document.querySelector('.OtpTextVal').classList.add('form-error');
                                        }else{
                                            this.setState({emptyOtp: false, submitDisabled: false});
                                            document.querySelector('.OtpTextVal').classList.remove('form-error')
                                        }
                                        
                                    }}
                                    
                                    
                                    
                                />
                                <small className="error-text">Six-digit OTP code required</small>
                                {/* <input type="number" onBlur={this.handleInputBlur}/> */}
                            </div>

                            <button type="submit" disabled={submitDisabled} className={"btn-alat btn-block "}>{ submitted ? "Verifying..." : "Continue" }</button>

                        </form>

                        <p>
                            <span className="text-left pull-right cta-link">
                                {state.resendingOtp === false && state.resendStatus === "" &&
                                    <a className="cta-link" onClick={this.resendCode}>Resend code</a>
                                }
                                {state.resendingOtp === true &&
                                    <span>Resend code</span>
                                }
                                {state.resendingOtp === false && state.resendStatus !== "" &&
                                    <span>{state.resendStatus}</span>
                                }

                            </span>
                            {/* <span className="text-right pull-right cta-link">
                                <a href="#">Call my phone</a>
                            </span> */}
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
        customer_bvnverification_details: state.onboarding_bvn_details,
        customer_bvnskip_details: state.onboarding_bvnskip_details,
        alert: state.alert
    }
}

export default connect(mapStateToProps)(VerifyBvn);