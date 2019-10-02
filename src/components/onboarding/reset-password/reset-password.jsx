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
    SEND_CUSTOMERTOKEN_SUCCESS,
    SEND_CUSTOMERTOKEN_PENDING,
    SEND_CUSTOMERTOKEN_FAILURE,
    SEND_NEWPASSWORDINFO_SUCCESS,
    SEND_NEWPASSWORDINFO_PENDING,
    SEND_NEWPASSWORDINFO_FAILURE} from "../../../redux/constants/onboarding/user.constants";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


class ResetPassword extends React.Component{
      constructor(props) {
          super(props);
          this.state = {
            newPassword:'',
            confirmPassword:'',
            Pin: ''
          };
          const { dispatch } = this.props;
          history.listen((location, action) => {
            //  dispatch(alertActions.clear());
          });

          
          //dispatch(userActions.logout());
        //   this.handleChange = this.handleChange.bind(this);
        this.checkPwd = this.checkPwd.bind(this);
        this.valConfirmPasswordValid = this.valConfirmPasswordValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    //   handleChange(e) {
    //       const { name, value } = e.target;
    //       this.setState({ [name]: value });
    //   }

    componentDidMount(){
        this.sendToken();
    }

    sendToken(){
        const { dispatch } = this.props;
        let locationHasheed = window.location.hash,
            token = locationHasheed.split('#/')[1];

        // console.log('location hash is', locationHasheed)
        dispatch(userActions.sendTokenResetPassword(token));
    }

    checkPwd (){
        let str = this.state.newPassword;
        var digitEx = new RegExp(/\d/);
        var lowerEx = new RegExp(/[a-z]/);
        var upperCase = new RegExp(/[A-Z]/);
        var spCharacter = new RegExp(/[^a-zA-Z0-9]/);
        var condition = true;
        var message = "";
        if (str.length < 8) {
            message = "Password must be up to 8 characters";
            condition = false;
        } else if (!digitEx.test(str)) {
            message = "Password must contain a digit";
            condition = false;
        } else if (!lowerEx.test(str)) {
            message = "Password must contain a lower case alphabet";
            condition = false;
        } else if (!upperCase.test(str)) {
            message = "Password must contain a upper case alphabet";
            condition = false;
        }
        else if (!spCharacter.test(str)) {
            message = "Password must contain atleast a special character";
            condition = false;
        }

        if(condition === false)
       { this.setState({passwordValid : false, passwordInvalidMessage : message});
          return false;
         }
        else{ this.setState({ passwordValid : true });
        return true;
     }
        
    }

    valConfirmPasswordValid(){
        if(this.state.newPassword === this.state.confirmPassword){
            this.setState({confirmPasswordValid : true});
            return true;
        }
        else{
            this.setState({confirmPasswordValid : false});
            return false;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        let { newPassword, confirmPassword} = this.state;
        const { dispatch } = this.props;
        let isCustomerHasPin = this.props.send_customertoken.sendtoken_data.response.data;
        if(this.checkPwd()){
            if (newPassword!=='' && confirmPassword!=='' && newPassword===confirmPassword) {
                this.setState({ submitted: true });
                let locationHasheed = window.location.hash,
                token = locationHasheed.split('#/')[1];

                let payload = {
                    token,
                    password: newPassword,
                    confirmPassword: confirmPassword
                }

                if(isCustomerHasPin.hasPin && this.state.Pin!=='' && this.state.Pin.length===4){
                    payload.Pin = this.state.Pin;
                    dispatch(userActions.sendNewPasswordDetails(payload));
                }

                if(isCustomerHasPin.hasPin===false){
                    dispatch(userActions.sendNewPasswordDetails(payload));
                }
                
                
            }
            else{
                this.setState({ submitted: false });
            }
        }
    }

    renderResetPassword(){
        let {newPassword,
            confirmPassword, Pin,  
            passwordValid,
            confirmPasswordValid,
            passwordInvalidMessage,} = this.state;
        let props = this.props,
            sendCustomerToken = props.send_customertoken,
            sendCustomerNewPassword = props.send_newcustomerpassword;
            
            switch(sendCustomerToken.fetch_status){
                case SEND_CUSTOMERTOKEN_PENDING:
                        
                    return(
                        <div className="text-center loading-txt">Please wait...</div>
                    );
                case SEND_CUSTOMERTOKEN_SUCCESS:
                    let isCustomerHasPin = sendCustomerToken.sendtoken_data.response.data;
                    // console.log('customer has pin', isCustomerHasPin);
                    return(
                        <div>
                            <div className="input-ctn">
                                <label>Enter new password</label>
                                <Textbox
                                    tabIndex="1"
                                    id={'newPassword'}
                                    name="newPassword"
                                    type="password"
                                    placeholder= "Enter your new password"
                                    value={newPassword}
                                    onBlur={(e)=>{
                                        this.checkPwd()
                                    }}
                                    onChange={(newPassword, e) => {
                                        this.setState({ newPassword });
                                    }}
                                />
                                {passwordValid && <div className="pw-hint">Your password must contain an <b>upper-case letter</b>, a <b>lower-case letter</b>, a <b>number</b> and a <b>special character</b>.</div>}
                                {!passwordValid &&
                                    <div className="text-danger">{passwordInvalidMessage}</div>
                                    }
                            </div>
                            <div className="input-ctn">
                                <label>Confirm new password</label>
                                <Textbox
                                    tabIndex="2"
                                    id={'confirmPassword'}
                                    name="confirmPassword"
                                    placeholder= "Enter your new password again"
                                    type="password"
                                    value={confirmPassword}
                                    onBlur={(e)=>{
                                        this.valConfirmPasswordValid()
                                    }}
                                    onChange={(confirmPassword, e) => {
                                        this.setState({ confirmPassword });
                                    }}
                                />
                                {!confirmPasswordValid &&
                                    <div className="text-danger">password mis-match</div>
                                }
                            </div>
                            {isCustomerHasPin.hasPin &&
                                <div className="input-ctn">
                                    <label>ALAT Pin</label>
                                    <Textbox
                                        tabIndex="2"
                                        id={'Pin'}
                                        name="Pin"
                                        type="password"
                                        maxLength="4"
                                        placeholder= "Enter your ALAT Pin"
                                        value={Pin}
                                        onChange={(Pin, e) => {
                                            this.setState({ Pin });
                                        }}
                                    />
                                </div>
                            }

                            <button type="submit"
                                    className="btn-alat btn-block"
                                    disabled={sendCustomerNewPassword.is_processing}>
                                        {sendCustomerNewPassword.is_processing?'Please wait...':'Submit'}
                                    </button>
                        {(sendCustomerNewPassword.is_processing===false && sendCustomerNewPassword.fetch_status===SEND_NEWPASSWORDINFO_FAILURE)&&
                            <div className="info-label error m-t-20">{sendCustomerNewPassword.sendnewpassword_data.error}</div>
                        }
                        </div>
                    );
                case SEND_CUSTOMERTOKEN_FAILURE:
                    let requesteError = sendCustomerToken.sendtoken_data.error;
                    return(
                        <div className="text-center">
                            <div className="info-label error">{requesteError}</div>
                            <div>Please get in touch with our support team via help@alat.ng</div>
                            <NavLink to="/"><button type="button" className="btn-alat">Okay</button></NavLink>
                        </div>
                        
                    )
            }
    }

      render(){
        
        const {alert } = this.props;
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>Reset Password<span></span></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form className="onboard-form" onSubmit={this.handleSubmit}>
                        
                            {this.renderResetPassword()}
                        </form>
                        
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
        send_customertoken : state.send_customertoken_request,
        send_newcustomerpassword : state.send_newcustomerpassword_request,
    };
}

export default connect(mapStateToProps)(ResetPassword);