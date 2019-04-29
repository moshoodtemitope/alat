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
                
                    emailValid: false,
                    confirmEmailValid: false,
                    passwordValid: false,
                    confirmPasswordValid: false,
                    formValid: false
                
            };

            this.handleInputChange = this.handleInputChange.bind(this);
            this.validateEmail = this.validateEmail.bind(this);
    }
    
    getRegistrationDetails(){
        // const { dispatch } = this.props;
        // let props = this.props;
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
      console.log(name);
      console.log(e.currentTarget.value);

      this.setState({[name]:e.currentTarget.value})

      switch(name){
          case 'email':
          break;
          case 'confirmEmail':
          break;
          case 'password':
          break;
          case 'confirmPassword':
          break;
      }

      console.log(this.state);
    }

    

    componentDidMount() {
        this.getRegistrationDetails();
    }
    
    validateEmail(email) {
        var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        this.setState({emailValid : re.test(email)}); 
        console.log(this.state.emailValid);
    }

    validatePassword(password){

    }
 

    render(){
        const { emailValid,
                confirmEmailValid,
                passwordValid,
                confirmPasswordValid,
                formValid ,
                email,
                password,
                confirmEmail,
                confirmPassword,
            } = this.state;

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
                        <div className="input-ctn">
                            <label>Email Address</label>
                            <input onChange={this.handleInputChange} onBlur={this.validateEmail} type="email" name="email" value={email} />
                        </div>
                        <div className="input-ctn">
                            <label>Confirm Email Address</label>
                            <input onChange={this.handleInputChange} type="email" onBlur={()=>{if(email == confirmEmail) this.setState({ confirmEmailValid : true});}} name="confirmEmail" value={confirmEmail}/>
                        </div>
                        <div className="input-ctn">
                            <label>Create a Password</label>
                            <input onChange={this.handleInputChange} type="password" name="password" value={password} />
                            <div className="pw-hint">Your password must contain an <b>upper-case letter</b>, a <b>lower-case letter</b>, a <b>number</b> and a <b>special character</b>.</div>
                        </div>
                        <div className="input-ctn">
                            <label>Confirm Password</label>
                            <input onChange={this.handleInputChange} type="password" onBlur={()=>{if(password == confirmPassword ) this.setState({ confirmPasswordValid : true});}} name="confirmPassword" value={confirmPassword} />
                        </div>
                        <input type="submit" value="Next" className="btn-alat btn-block"/>
                    </form>
                </div>
            </div>
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state){
    return {
       
        // user_details: state.onboarding_user_details,
         bvn_details: state.onboarding_bvn_details,
         alert: state.alert
    }
}

export default connect(mapStateToProps)(CreateAccount);