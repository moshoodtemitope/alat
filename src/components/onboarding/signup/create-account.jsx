import * as React from 'react';

import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";
import {SystemConstant} from "../../../shared/constants";

import {USER_REGISTER_FETCH, USER_REGISTER_SAVE, SKIP_BVN_SUCCESS, BVN_VERIFICATION_SUCCESS} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";


class CreateAccount extends React.Component{

    constructor(props){
        super(props);
            this.state={
                email:'',
                password:'',
                confirmEmail:'',
                confirmPassword:'',
                emailValid: true,
                confirmEmailValid: true,
                passwordValid: true,
                passwordInvalidMessage: '',
                confirmPasswordValid: true,
                formValid: false,
                refferalCode:''
            };

            this.handleInputChange = this.handleInputChange.bind(this);
            this.validateEmail = this.validateEmail.bind(this);
            this.checkPwd = this.checkPwd.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.validateForm = this.validateForm.bind(this);
            this.valConfirmPasswordValid = this.valConfirmPasswordValid.bind(this);
            this.ValConfirmEmail = this.ValConfirmEmail.bind(this);
    }
    
    getRegistrationDetails(){
        const { dispatch } = this.props;
        let props = this.props;
        
        if(props.user_details.registration_data==null || props.user_details.registration_data==undefined || props.user_details.registration_data =='undefined'){
            history.push('/register');
            return;
        }
         let userData,
            userDetails = props.user_details,
            bvnVerificationData = props.bvn_details.hasOwnProperty('bvn_verification_data')? props.bvn_details.bvn_verification_data.response: null;
            // bvnVerificationData = props.bvn_details.state.bvn_verification_data.response;
                 
        
        //  console.log('user data', props.user_details);
        if('registration_status' in userDetails && userDetails.registration_status === USER_REGISTER_SAVE){
            if(userDetails.registration_data.user !== undefined){
                userData =  userDetails.registration_data.user;
                if(bvnVerificationData ==null){
                    this.setState({userData: userData, phone: userData.phone});
                }else{
                    this.setState({userData: userData, phone: userData.phone, isExistingCustomer:bvnVerificationData.isExistingCustomer,  finacleEmail: bvnVerificationData.finacleEmail });
                }
                
            }
            else {
                history.push('/register');
            }
        }
        else{
            history.push('/register');
        }
    }

    valConfirmPasswordValid(){
        if(this.state.password === this.state.confirmPassword){
            this.setState({confirmPasswordValid : true});
            return true;
        }
        else{
            this.setState({confirmPasswordValid : false});
            return false;
        }
    }

    ValConfirmEmail(){
        if(this.state.email.toLowerCase() === this.state.confirmEmail.toLowerCase()){
            this.setState({confirmEmailValid : true})
           return true; 
            
        }else{
            this.setState({confirmEmailValid : false})
            return false;
        }

        
    }

    handleInputChange(e){
      let name = e.currentTarget.name;
      this.setState({[name]:e.currentTarget.value})
    }

    validateForm(){
    
        if(this.validateEmail() && this.valConfirmPasswordValid() &&
            this.checkPwd() && this.ValConfirmEmail()){
                
            if(this.state.confirmEmail!=='' && this.state.confirmPassword !== ''){
                
                return true;
            }else{ 
                this.setState({confirmEmailValid: false, confirmPasswordValid: false})
               
                return false
            }
        }else { 
            
            return false;
        }
    }
    
    handleSubmit(e){
        e.preventDefault();
        if(this.validateForm())
        {
            const {dispatch} = this.props;

            // if(this.props.bvn_details.bvn_verification_status == BVN_VERIFICATION_SUCCESS.toString()){
                dispatch(userActions.register({
                    email: this.state.email.toLowerCase(),
                    password: this.state.password,
                phone:this.state.phone,
                refferalCode: this.state.refferalCode}, USER_REGISTER_SAVE));
            history.push('/register/security-questions');
            //}
        }
    }

    componentDidMount() {
        this.getRegistrationDetails();
    }
    
    validateEmail() {
        let re = /^[a-zA-Z][a-zA-Z0-9_\-.]*(\.[a-zA-Z][a-zA-Z0-9_\-.]*)?@[a-zA-Z][a-zA-Z-0-9]*\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
        
        // let result = SystemConstant.EMAILREGEX.test(this.state.email);
        let result = re.test(this.state.email.toLowerCase());
        
        // this.ValConfirmEmail()
        if(result){
             //Has existing wema account before and provided is equal to email from BVN
            if((this.state.isExistingCustomer===true && this.state.finacleEmail!== null && this.state.finacleEmail!=='')
                && (this.state.email.toLowerCase() === this.state.finacleEmail.toLowerCase())){
                
                this.setState({ emailValid : true});
                return true;
            }

            //Has existing wema account and email provided is not equal to email from BVN
            if((this.state.isExistingCustomer===true && this.state.finacleEmail!== null && this.state.finacleEmail!=='')
                && (this.state.email.toLowerCase() !== this.state.finacleEmail.toLowerCase())){
                
                this.setState({ emailValid : false, emailErrorMsg: 'Please, enter the email tied to your Wema account'});
                return false;
            }

            //Has a wema account before and BVN email is empty
            if((this.state.isExistingCustomer===true && (this.state.finacleEmail == null || this.state.finacleEmail ==''))){
                this.setState({ emailValid : false, emailErrorMsg: 'Please visit the nearest Wema bank branch to update your email on your BVN'});
                return false;
            }

            if(this.state.isExistingCustomer===false){
                this.setState({ emailValid : true});
                return true;
            }

            this.setState({emailValid : result}); 
        }else{
            this.setState({emailValid : result, emailErrorMsg:'invalid email entered'});
        }

        if(this.state.confirmEmail!==''){
            this.ValConfirmEmail();
        }
        
        return result;
    }

    checkPwd (){
        let str = this.state.password;
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
 

    render(){
        const { emailValid,
                confirmEmailValid,
                passwordValid,
                confirmPasswordValid,
                passwordInvalidMessage,
                formValid ,
                email,
                password,
                confirmEmail,
                confirmPassword,
                refferalCode
            } = this.state;

            let props = this.props;
            let state =  this.state;
            let userDetails = props.userDetails;
            

        return (
            <OnboardingContainer>
                <div className="row">
                {/* <!-- Header --> */}
                <div className="col-12">
                    <h3>Create an account<span></span></h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form className="onboard-form">
                    <div className={emailValid ? "input-ctn" : "input-ctn form-error" }>
                        <label>Email Address</label>
                        <input onChange={this.handleInputChange} onBlur={this.validateEmail} type="email" name="email" value={email} />
                        {!emailValid &&
                            // <div className="text-danger">invalid email entered</div>
                            <div className="text-danger">{this.state.emailErrorMsg}</div>
                            }
                    </div>
                    <div className={confirmEmailValid ? "input-ctn" : "input-ctn form-error" }>
                        <label>Confirm Email Address</label>
                        <input onChange={this.handleInputChange} type="email" onBlur={this.ValConfirmEmail} name="confirmEmail" value={confirmEmail}/>
                        {!confirmEmailValid &&
                            <div className="text-danger">email mis-match</div>
                            }
                    </div>
                    <div className={passwordValid ? "input-ctn" : "input-ctn form-error" }>
                        <label>Create a Password</label>
                        <input onChange={this.handleInputChange} type="password" name="password" value={password} onBlur={this.checkPwd} />
                        {passwordValid && <div className="pw-hint">Your password must contain an <b>upper-case letter</b>, a <b>lower-case letter</b>, a <b>number</b> and a <b>special character</b>.</div>}
                        {!passwordValid &&
                            <div className="text-danger">{passwordInvalidMessage}</div>
                            }
                    </div>
                    <div className={confirmPasswordValid ? "input-ctn" : "input-ctn form-error" }>
                        <label>Confirm Password</label>
                        <input onChange={this.handleInputChange} type="password" onBlur={this.valConfirmPasswordValid} name="confirmPassword" value={confirmPassword} />
                        {!confirmPasswordValid &&
                            <div className="text-danger">password mis-match</div>
                            }
                    </div>
                    <div className="input-ctn">
                        <label>Refferal Code</label>
                        <input onChange={this.handleInputChange} placeholder="" type="text" name="refferalCode" value={refferalCode} maxLength="8" />
                        {/* {!confirmPasswordValid &&
                            <div className="text-danger">password mis-match</div>
                            } */}
                    </div>
                        <input type="submit" onClick={this.handleSubmit} value="Next" className="btn-alat btn-block"/>
                    </form>
                </div>
            </div>
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state){
    //test to know if the data to return and redirect the user 
    // if('registration_status' in state.onboarding_user_details)
    // {
    //     return{
    //         user_details: state.onboarding_user_details.state.state.state,
    //         bvn_details: state.onboarding_bvn_details,
    //         alert: state.alert
    //     }
    // }
    //  else{
        return {
            user_details: state.onboarding_user_details,//.state.state.state,
            bvn_details: state.onboarding_bvn_details,
            skip_bvn_details: state.onboarding_bvnskip_details,
            alert: state.alert
        }
     // }
}

export default connect(mapStateToProps)(CreateAccount);