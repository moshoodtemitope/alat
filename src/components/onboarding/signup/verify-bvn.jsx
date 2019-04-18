import * as React from 'react';
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {USER_REGISTER_FETCH, USER_REGISTER_SAVE} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";

import {Textbox} from "react-inputs-validation";

class VerifyBvn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            error: '',
            otpValue: '',
            formError: ''
        };

        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.submitOtp = this.submitOtp.bind(this);
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

    componentDidMount() {
        this.getRegistrationDetails();
    }

    submitOtp(e){
        e.preventDefault();
        this.setState({ submitted: true });
        
        const {otpValue} = this.state;
        console.log('Submitted', otpValue);

        let data = {
            phoneNo: '08137835331',
            otp: this.state.otpValue
        },
        consume = ApiService.request(routes.VERIFYBVNOTP, "POST", data);
        return consume.then(function(response){
           console.log('Succeeded');
        })
        .catch(function(err){
            
            this.setState({ submitted: false, error: err.response.data.message })
        })
    }

    handleInputBlur(OtpValue){
        this.setState({otpValue: OtpValue});
    }

    render(){
        let userState = this.props.onboarding_user_details;
        let phone = '';
        let state = this.state;
        const {otpValue, error,submitted} = this.state;
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>BVN verification<span></span></h3>
                        <p>We have sent a verification code to the phone number ( {state.phone} ) registered to your BVN</p>
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
                                <a href="#">Resend code</a>
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
    return state.onboarding_user_details;
}

export default connect(mapStateToProps)(VerifyBvn);