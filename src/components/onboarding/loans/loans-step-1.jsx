import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import OnboardingContainer from '../Container';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants' ;
class LoanOboardingStep1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            phoneNumber: "",

            emailInvalid: false,
            phoneNumberInvalid: false,
            isSubmitted: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if(this.state.isSubmitted){
             this.validateEmail();
        }
    }

    handlePhoneNumberChange = (e) => {
        let re = /^\d+$/
        if(re.test(e.target.value)){
        this.setState({[e.target.name]: e.target.value},()=>{
            if(this.state.isSubmitted){
              this.validatePhoneNumber(11);
            }
        });
        
        }else if(e.target.value.length == 0) {this.setState({[e.target.name]: ""});}
    }

    validatePhoneNumber= (max) =>{
      if(this.state.phoneNumber.length != max){
          this.setState({phoneNumberInvalid : true}); return true; 
      } 
      if(this.state.phoneNumber.length == max) { 
           this.setState({phoneNumberInvalid : false});
            return false;
         }
    }

    validateEmail=()=>{
        let re = /^[a-zA-Z][a-zA-Z0-9_\-.]*(\.[a-zA-Z][a-zA-Z0-9_\-.]*)?@[a-zA-Z][a-zA-Z-0-9]*\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
        
        let result = re.test(this.state.email.toLowerCase());
        if(!result)
        {this.setState({emailInvalid : true}); return true }
        else{ this.setState({emailInvalid : false}); return false }
    }

    handleSubmit =(e)=>{
        console.log("clicked");
        e.preventDefault();
        this.setState({isSubmitted : true});
        if(this.validateEmail() || this.validatePhoneNumber(11)){
            console.log("here");
        }else { 
            var payload ={
                PhoneNumber : this.state.phoneNumber,
                EmailAddress : this.state.email
            }
            this.props.dispatch(actions.loanOnbaordingStep1(payload));
         }
    }
    
    renderRedirect =()=>{
        if(this.props.loan_step1.loan_step1_status == loanOnboardingConstants.LOAN_STEP1_SUCCESS)
        return (<Redirect to={"loan/step-2"}/>)
    }

    render() {
        return (
            <OnboardingContainer>
                <Fragment>
                    {this.renderRedirect()}
                    <div className="row">
                        <div className="col-12">
                            <h3>Welcome to ALAT's Salary based Lending platform</h3>
                            {/* <p style={{ "marginTop : 20px"}}>Let's get to know you</p> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <form className="onboard-form" onSubmit={this.handleSubmit}>
                            {this.props.alert && this.props.alert.message &&
                             <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }
                                <div  className={this.state.emailInvalid ? "input-ctn form-error" : "input-ctn"}>
                                    <label>Email</label>
                                    <input type="text" name="email" value={this.state.email} onChange={this.handleEmail} />
                                </div>
                                <div  className={this.state.phoneNumberInvalid ? "input-ctn form-error" : "input-ctn"}>
                                    <label>Phone Number</label>
                                    <input type='text'name="phoneNumber" value={this.state.phoneNumber} maxLength={11}
                                    onChange={this.handlePhoneNumberChange} />
                                </div>
                                <input type="submit" value={this.props.loan_step1.loan_step1_status == loanOnboardingConstants.LOAN_STEP1_PENDING ? "Processing..." : "Next"} 
                                className="btn-alat btn-block" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        loan_step1: state.loanOnboardingReducerPile.loanOnboardingStep1,
    };
}
export default connect(mapStateToProps)(LoanOboardingStep1);