import * as React from 'react';

import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";

import {USER_REGISTER_FETCH, USER_REGISTER_SAVE} from "../../../redux/constants/onboarding/user.constants";
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
            };

            this.handleInputChange = this.handleInputChange.bind(this);
            this.validateEmail = this.validateEmail.bind(this);
            this.checkPwd = this.checkPwd.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.validateForm = this.validateForm.bind(this);
    }
    
    getRegistrationDetails(){
        const { dispatch } = this.props;
        let props = this.props;
        console.log(props);
        // let userData;
        // let userDetails = props.user_details;
        // if('registration_status' in userDetails && userDetails.registration_status === USER_REGISTER_SAVE){
        //     userData =  userDetails.registration_data.user;
        //     this.setState({userData: userData});
        //     this.setState({phone: userData.phone});
        // }
        // else{
        //     history.push('/register');
        // }
    }

    handleInputChange(e){
      let name = e.currentTarget.name;
      this.setState({[name]:e.currentTarget.value})
      }

      validateForm(){
        
        if(this.validateEmail() && this.state.confirmEmailValid &&
            this.checkPwd() && this.state.confirmPasswordValid)
          {
              //console.log(this.state.confirmEmail);
              if(this.state.confirmEmail!='' && this.state.confirmPassword != '')
              {
                return true;
              }
              
              else{ this.setState({confirmEmailValid: false, confirmPasswordValid: false})
              return false
            }
          }
          else { 
              return false;
          }
      }
    
      handleSubmit(e){
          e.preventDefault();
          if(this.validateForm())
          {
            //   const {dispatch} = this.props;
            //   dispatch(userActions.register({phone: data.PhoneNo,
            //                                  email: this.state.email,
            //                                  password: this.state.password}, USER_REGISTER_SAVE));
              history.push('/register/security-questions');
          }
      }

    componentDidMount() {
        this.getRegistrationDetails();
    }
    
    validateEmail() {
        let re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        let result = re.test(this.state.email);
        this.setState({emailValid : result}); 
        return result;
    }

    checkPwd (){
        let str = this.state.password;
        //console.log(str);
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

        if(condition == false)
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
            } = this.state;

            let props = this.props;
            let state =  this.state;
            let userDetails = props.userDetails;
            console.log(props.userDetails);

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
                                <div className="text-danger">invalid email entered</div>
                                }
                        </div>
                        <div className={confirmEmailValid ? "input-ctn" : "input-ctn form-error" }>
                            <label>Confirm Email Address</label>
                            <input onChange={this.handleInputChange} type="email" onBlur={()=>{if(email == confirmEmail) {this.setState({ confirmEmailValid : true});} else 
                            this.setState({confirmEmailValid : false})}} name="confirmEmail" value={confirmEmail}/>
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
                            <input onChange={this.handleInputChange} type="password" onBlur={()=>{if(password == confirmPassword ) {this.setState({ confirmPasswordValid : true});} else this.setState({confirmPasswordValid:false});}} name="confirmPassword" value={confirmPassword} />
                            {!confirmPasswordValid &&
                                <div className="text-danger">password mis-match</div>
                                }
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
    console.log(state);
    return {
         user_details: state.onboarding_user_details,
        // bvn_details: state.onboarding_bvn_details,
         alert: state.alert
    }
}

export default connect(mapStateToProps)(CreateAccount);