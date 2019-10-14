import * as React from 'react';
import {connect, Provider} from "react-redux";
// import {ApiService} from "../../shared/apiService";
// import {routes} from "../../shared/urls";
import {history} from "../../../_helpers/history";
import {NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {alertActions} from "../../../redux/actions/alert.actions";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import {
    GET_QUESTION_FORPINRESET_SUCCESS,
    GET_QUESTION_FORPINRESET_PENDING,
    GET_QUESTION_FORPINRESET_FAILURE,
    SEND_ANSWER_FORPINRESET_SUCCESS,
    SEND_ANSWER_FORPINRESET_PENDING,
    SEND_ANSWER_FORPINRESET_FAILURE,
    SEND_OTP_OR_TOKEN_FORPINRESET_SUCCESS,
    SEND_OTP_OR_TOKEN_FORPINRESET_PENDING,
    SEND_OTP_OR_TOKEN_FORPINRESET_FAILURE,
    SEND_NEWPIN_FORPINRESET_SUCCESS,
    SEND_NEWPIN_FORPINRESET_PENDING,
    SEND_NEWPIN_FORPINRESET_FAILURE,
} from "../../../redux/constants/onboarding/user.constants";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


class ResetCustomerPin extends React.Component{
      constructor(props) {
          super(props);
          this.state = {
              answer:'',
              Pin:'',
              showAnswer:false,
              securityanswer:'',
              // hasErrors: false,
              // errors: {
              //     email: '',
              //     password: ''
              // }
          };
          const { dispatch } = this.props;
          history.listen((location, action) => {
            //  dispatch(alertActions.clear());
          });
          
          //dispatch(userActions.logout());
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.renderSecurityQuestion = this.renderSecurityQuestion.bind(this);
          this.renderOTPToken = this.renderOTPToken.bind(this);
          this.renderNewPin = this.renderNewPin.bind(this);
          this.sendSecurityAnswer = this.sendSecurityAnswer.bind(this);
      }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    componentDidMount(){
        // if(Object.keys(this.props.sendemailfor_forgotpw).length<1){
        //     history.push('/forgot-password');
        // }
        this.sendToken();
    }

    sendToken(){
        const { dispatch } = this.props;
        let locationHasheed = window.location.hash,
            token = locationHasheed.split('#/')[1];

        
        dispatch(userActions.getQuestionForPinReset(token));
    }
      

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { Pin, securityanswer } = this.state;
        const { dispatch } = this.props;
       
    }

    renderSecurityQuestion(){
        // let locationHasheed = window.location.hash,
        //         token = locationHasheed.split('#/')[1];

        let {securityanswer} = this.state;
        // const { dispatch } = this.props;
        // dispatch(userActions.getQuestionForPinReset(token));
        let props = this.props,
            getSecurityQuestion = props.get_questionforpinreset,
            send_answerforpinreset = props.send_answerforpinreset;

        // let get_questionforpinreset = this.props.get_questionforpinreset;

        switch(getSecurityQuestion.fetch_status){
            case GET_QUESTION_FORPINRESET_PENDING:
                    
                return( 
                    <div className="text-center loading-txt">Please wait...</div>
                );
            case GET_QUESTION_FORPINRESET_SUCCESS:
                    let securityQuestionReturned = getSecurityQuestion.getquestion_data.response.data;
                
                    
                return(
                    <div>
                        <div className="row">
                            <div className="col-12">
                                <h3>Security<span></span></h3>
                            </div>
                        </div>
                        {(send_answerforpinreset.is_processing===false && send_answerforpinreset.fetch_status===SEND_ANSWER_FORPINRESET_FAILURE ) &&
                            <div className="info-label error">{send_answerforpinreset.otpinfo_data.error}</div>
                        }
                        
                        <div className="answer-wrap">
                            <div className="input-ctn">
                                {/* <label>{(Object.keys(this.props.sendemailfor_forgotpw).length>1) && <span>{sendemailrequest.sendmail_status.response.data.securityQuestion}</span> }</label> */}
                                <label> {securityQuestionReturned.question} </label>
                                <Textbox
                                    tabIndex="1"
                                    id={'securityanswer'}
                                    name="securityanswer"
                                    type="password"
                                    value={securityanswer}
                                    onChange={(securityanswer, e) => {
                                        this.setState({ securityanswer });
                                    }}
                                />
                            </div>
                            <center>
                                <button type="submit" 
                                        className="btn-alat btn-block"
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            if(this.state.securityanswer!=='' && this.state.securityanswer.trim().length>=2){
                                                this.sendSecurityAnswer()
                                            }
                                        }}
                                        disabled={send_answerforpinreset.is_processing}>
                                        {send_answerforpinreset.is_processing?'Please wait...':'Proceed'}</button>
                            </center>
                            
                        </div>
                    </div>
                )
            case GET_QUESTION_FORPINRESET_FAILURE:
                let requesteError = getSecurityQuestion.getquestion_data.error;
                return(
                    <div className="text-center">
                        <div className="info-label error">{requesteError}</div>
                        <div>Please get in touch with our support team via help@alat.ng</div>
                        {/* <NavLink to="/"><button type="button" className="btn-alat">Okay</button></NavLink> */}
                    </div>
                    
                )
        }

        
    }
    sendSecurityAnswer(){
        const { dispatch } = this.props;
        let locationHasheed = window.location.hash,
            token = locationHasheed.split('#/')[1];

        let payload = {
            question: this.props.get_questionforpinreset.getquestion_data.response.data.question,
            answer: this.state.securityanswer
        }
        dispatch(userActions.sendAnswerForPinReset(payload, token));
    }

    renderOTPToken(isValidatedWithWemaToken){
        let {OTPorToken} = this.state;
        let props = this.props,
            send_answerforpinreset = props.send_answerforpinreset.otpinfo_data.response.data,
            send_otportokenforpinreset = props.send_otportokenforpinreset;
           
        return(
            <div>
                <div className="row">
                    <div className="col-12">
                        <h3>{isValidatedWithWemaToken?"Enter your token":"Enter OTP"}<span></span></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {(send_otportokenforpinreset.is_processing===false && send_otportokenforpinreset.fetch_status===SEND_OTP_OR_TOKEN_FORPINRESET_FAILURE ) &&
                            <div className="info-label error">{send_otportokenforpinreset.sentotpinfo_data.error}</div>
                        }
                        <div className="pin-wrap">
                            <div className="input-ctn">
                                <label>{isValidatedWithWemaToken?"Enter your 10-digit token":"Please enter OTP sent to "+send_answerforpinreset.phoneNo}</label>
                                <Textbox
                                    tabIndex="1"
                                    id={'OTPorToken'}
                                    name="OTPorToken"
                                    type="password"
                                    maxLength={isValidatedWithWemaToken?"10":"6"}
                                    placeholder= {isValidatedWithWemaToken?"Enter your 10-digit token":"Please enter OTP sent to "+send_answerforpinreset.phoneNo}
                                    value={OTPorToken}
                                    onChange={(OTPorToken, e) => {
                                        this.setState({ OTPorToken });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <center>
                            <button type="button" 
                                    className="btn-alat btn-block"
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        if(this.state.OTPorToken!=='' && isValidatedWithWemaToken===true && this.state.OTPorToken.trim().length===10){
                                            this.sendCustomerOtpToken();
                                        }
                                        if(this.state.OTPorToken!=='' && isValidatedWithWemaToken===false && this.state.OTPorToken.trim().length===6){
                                            this.sendCustomerOtpToken();
                                        }
                                    }}
                                    disabled={send_otportokenforpinreset.is_processing}>
                                    {send_otportokenforpinreset.is_processing?'Please wait...':'Proceed'}</button>
                        </center>
                    </div>
                    
                </div>
            </div>
        )
    }
    sendCustomerOtpToken(){
        const { dispatch } = this.props;
        let locationHasheed = window.location.hash,
            token = locationHasheed.split('#/')[1];

       
        let payload ={
            answer: this.state.securityanswer,
            question: this.props.get_questionforpinreset.getquestion_data.response.data.question,
            otp: this.state.OTPorToken,
            phoneNo:this.props.send_answerforpinreset.otpinfo_data.response.data.phoneNo
        }
          
        dispatch(userActions.sendOtpOrTokenForPinReset(payload, token));
    }
    renderNewPin(){
        let{Pin, ConfirmPin} = this.state;
        let digitPattern =/^\d*$/g;
        let props = this.props,
            send_newpinforpinreset = props.send_newpinforpinreset;
        return(
            <div>
                <div className="row">
                    <div className="col-12">
                        <h3>Reset your ALAT PIN<span></span></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                    {(send_newpinforpinreset.is_processing===false && send_newpinforpinreset.fetch_status===SEND_NEWPIN_FORPINRESET_FAILURE ) &&
                            <div className="info-label error">{send_newpinforpinreset.sendnewpin_data.error}</div>
                    }
                        <div className="pin-wrap">
                            <div className="input-ctn">
                                <label>Enter your New ALAT Pin</label>
                                <Textbox
                                    tabIndex="1"
                                    id={'Pin'}
                                    name="Pin"
                                    type="password"
                                    maxLength="4"
                                    placeholder= "Enter your new ALAT Pin"
                                    value={Pin}
                                    onChange={(Pin, e) => {
                                        if( digitPattern.test(Pin)){
                                            this.setState({ Pin });
                                        }
                                        
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="pin-wrap">
                            <div className="input-ctn">
                                <label>Confirm your New ALAT Pin</label>
                                <Textbox
                                    tabIndex="1"
                                    id={'ConfirmPin'}
                                    name="ConfirmPin"
                                    type="password"
                                    maxLength="4"
                                    placeholder= "re-Enter your new ALAT Pin"
                                    value={ConfirmPin}
                                    onChange={(ConfirmPin, e) => {
                                        if( digitPattern.test(ConfirmPin)){
                                            this.setState({ ConfirmPin });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <center>
                            <button type="button" 
                                    className="btn-alat btn-block"
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        if(this.state.Pin!=='' && this.state.Pin.trim().length===4 && this.state.ConfirmPin!=='' && this.state.ConfirmPin.trim().length===4){
                                            this.sendNewCustomerPin();
                                        }
                                    }}
                                    disabled={send_newpinforpinreset.is_processing}>
                                    {send_newpinforpinreset.is_processing?'Please wait...':'Change Pin'}</button>
                        </center>
                    </div>
                    
                </div>
            </div>
        )
    }
    sendNewCustomerPin(){
        const { dispatch } = this.props;
        let locationHasheed = window.location.hash,
            token = locationHasheed.split('#/')[1];

        let payload = {
            pinNumber: this.state.Pin,
            question: this.props.get_questionforpinreset.getquestion_data.response.data.question,
            answer: this.state.securityanswer
        }
          
        dispatch(userActions.sendNewPinForPinReset(payload, token));
    }

    render(){
        const {submitted, error } = this.state;
        const {alert } = this.props;

        let props = this.props,
            send_answerforpinreset = props.send_answerforpinreset,
            send_otportokenforpinreset = props.send_otportokenforpinreset;
            // send_otportokenforpinreset = this.props.send_otportokenforpinreset,
            // send_newpinforpinreset = this.props.send_newpinforpinreset;
        
            
        return (
            <OnboardingContainer>
                <div>
                    {send_answerforpinreset.fetch_status!==SEND_ANSWER_FORPINRESET_SUCCESS && this.renderSecurityQuestion()}
                    {(send_answerforpinreset.is_processing===false && 
                      send_answerforpinreset.fetch_status===SEND_ANSWER_FORPINRESET_SUCCESS &&
                      send_otportokenforpinreset.fetch_status!==SEND_OTP_OR_TOKEN_FORPINRESET_SUCCESS) && 
                        this.renderOTPToken(send_answerforpinreset.otpinfo_data.response.data.validatedWithWemaMobileToken)
                    }
                    {(send_otportokenforpinreset.is_processing===false && send_otportokenforpinreset.fetch_status===SEND_OTP_OR_TOKEN_FORPINRESET_SUCCESS ) && 
                        this.renderNewPin()
                    }

                    <div className="row">
                        <div className="col-12">
                            <p className="text-center m-t-20">Need help? <a target="_blank" href="http://www.alat.ng/contact-us">We are here for you</a></p>
                        </div>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
      const { alert } = state;
      
      // const { storage } = state.storage_reducer;
    return {
        alert,
        get_questionforpinreset : state.get_questionforpinreset_request,
        send_answerforpinreset : state.send_answerforpinreset_request,
        send_otportokenforpinreset : state.send_otportokenforpinreset_request,
        send_newpinforpinreset : state.send_newpinforpinreset_request,
    };
}

export default connect(mapStateToProps)(ResetCustomerPin);