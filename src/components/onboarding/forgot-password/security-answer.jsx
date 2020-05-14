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
    SENDANSWERFOR_FORGOTPW_SUCCESS,
    SENDANSWERFOR_FORGOTPW_PENDING,
    SENDANSWERFOR_FORGOTPW_FAILURE,} from "../../../redux/constants/onboarding/user.constants";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


class ProvideSecurityAnswer extends React.Component{
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
      }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    componentDidMount(){
        if(Object.keys(this.props.sendemailfor_forgotpw).length<1){
            history.push('/forgot-password');
        }
    }
      

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { Pin, securityanswer } = this.state;
        const { dispatch } = this.props;
        if (securityanswer!=='') {
            this.setState({ submitted: true });
            let payload ={
                        IsPinAvailable:this.props.sendemailfor_forgotpw.sendmail_status.response.data.hasFinacialTrans,
                        Answer:securityanswer,
                        Email:this.props.sendemailfor_forgotpw.sendmail_status.payload.email,
                        Question:this.props.sendemailfor_forgotpw.sendmail_status.response.data.securityQuestion}
                       
                        if(this.state.Pin!==''){
                            payload.Pin = Pin
                        }
            dispatch(userActions.sendForgotPwAnswer(payload));
        }
        else{
            this.setState({ submitted: false });
        }
    }

    render(){
        const {submitted, error } = this.state;
        const {alert } = this.props;

        let   sendemailrequest = this.props.sendemailfor_forgotpw,
                sendanswerrequest= this.props.sendanswerfor_forgotpw,
                {Pin, showAnswer,securityanswer} = this.state;
            //   console.log('telling gh tell', sendemailrequest);
            
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>Forgot Password<span></span></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        
                        <form className="onboard-form" onSubmit={this.handleSubmit}>
                        {(sendanswerrequest.is_processing===false && sendanswerrequest.fetch_status===SENDANSWERFOR_FORGOTPW_FAILURE)&&
                            <div className="info-label error">{sendanswerrequest.sendanswer_status.error}</div>
                        }

                            { this.state.showPinLengthError===true &&
                                <div className="info-label error">Enter your 4-digits PIN</div>
                            }

                            {(!showAnswer 
                                && Object.keys(this.props.sendemailfor_forgotpw).length>1  
                                && this.props.sendemailfor_forgotpw.sendmail_status.response.data.hasFinacialTrans===true)&&
                                <div className="pin-wrap">
                                    <div className="input-ctn">
                                        <label>Enter your ALAT Pin</label>
                                        <Textbox
                                            tabIndex="1"
                                            id={'Pin'}
                                            name="Pin"
                                            type="password"
                                            maxLength="4"
                                            placeholder= "Enter your ALAT Pin"
                                            value={Pin}
                                            autoComplete="off"
                                            onChange={(Pin, e) => {
                                                this.setState({ Pin });
                                                if(e.target.value!=='' && e.target.value.length===4){
                                                    this.setState({showPinLengthError: false})
                                                }else{
                                                    this.setState({showPinLengthError: true})
                                                }
                                            }}
                                            onBlur={(e) => { }}
                                            validationOption={{
                                                name: 'password/Pin',
                                                check: true,
                                                required: true
                                            }}
                                        />
                                    </div>
                                    <center>
                                        <button type="button" className="btn-alat btn-block"
                                                onClick={(e)=>{
                                                    e.preventDefault();
                                                    if(this.state.Pin!=='' && this.state.Pin.length===4){
                                                        this.setState({showAnswer:true, showPinLengthError: false})
                                                    }else{
                                                        this.setState({showPinLengthError: true})
                                                    }
                                                }}
                                                    >Proceed</button>
                                    </center>
                                </div>
                            }
                            {(showAnswer || ( Object.keys(this.props.sendemailfor_forgotpw).length>1 && this.props.sendemailfor_forgotpw.sendmail_status.response.data.hasFinacialTrans===false)) &&
                                <div className="answer-wrap">
                                    <div className="input-ctn">
                                        <label>{(Object.keys(this.props.sendemailfor_forgotpw).length>1) && <span>{sendemailrequest.sendmail_status.response.data.securityQuestion}</span> }</label>
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
                                        <button type="submit" className="btn-alat btn-block"
                                                disabled={sendanswerrequest.is_processing}>{sendanswerrequest.is_processing?'Submitting...':'Submit'}</button>
                                        {(Object.keys(this.props.sendemailfor_forgotpw).length>1  
                                            && this.props.sendemailfor_forgotpw.sendmail_status.response.data.hasFinacialTrans===true) 
                                            &&
                                            <span className="text-center error-msg linkcta"
                                              onClick={()=>this.setState({showAnswer:false})}>Back to pin</span>
                                        }
                                    </center>
                                    
                                </div>
                            }
                        </form>
                        <p className="text-center m-t-20"> <NavLink to="/forgot-password">Back to email</NavLink></p>
                        <p className="text-center m-t-20">Need help? <a target="_blank" href="http://www.alat.ng/contact-us">We are here for you</a></p>
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
        sendemailfor_forgotpw : state.sendemailfor_forgotpw_request,
        sendanswerfor_forgotpw : state.sendanswerfor_forgotpw_request,
    };
}

export default connect(mapStateToProps)(ProvideSecurityAnswer);