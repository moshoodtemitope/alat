import * as React from 'react';
//import DatePicker from 'react-bootstrap-date-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import /datepicker.scss"
import  "../../../assets/scss/datepicker.scss"
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";
import {USER_REGISTER_FETCH, USER_REGISTER_SAVE} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";

//var DatePicker = require("react-bootstrap-date-picker");

class Bvn extends React.Component{

    constructor(props){
        super(props);
        this.state={
            bvn: '',
            dob: null,
            bvnIvalid: false,
            dobInvalid: false,
            formInvalid: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDatePicker = this.handleDatePicker.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }
    
    handleChange(e){
        const name = e.target.name;
        if(name == 'bvn'){
            this.setState({bvn: event.target.value.replace(/\D/,'')})
        }
        else
        e.preventDefault();
    }

    handleDatePicker=(dob)=>{
        this.setState ({dob : dob});
    }
    
    formValidation=()=>{
        this.validateBvn();
        this.validateDob();
        
        if(this.state.bvnIvalid == false && this.state.dobInvalid == false){
            this.setState({formInvalid: false});
        }
         else {this.setState({formInvalid: true});}
    }

    validateBvn=()=>{
        if(this.state.bvn.length <12)
             this.setState({bvnIvalid: true});
             else this.setState({bvnIvalid : false});
    }

    validateDob=()=>{
        if(this.state.dob == null)
            this.setState({dobInvalid: true});
            else this.setState({dobInvalid : false});
    }

    handleValidation=(e)=>{
     if(e.target.name=='bvn')
         this.validateBvn();
     else  
       this.validateDob();
    }

    handleSubmit(e){
        this.formValidation();
       
        if(this.state.formInvalid === true){
              
        } else{
          
        }
        e.preventDefault();
      
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

    render(){
        const {bvn, dob, bvnIvalid, dobInvalid, formInvalid} = this.state;
        let props = this.props;
        let userState = this.props.onboarding_user_details;
        let phone = '';
        let state = this.state;

        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>Link your BVN<span></span></h3>
                        <p>We’re so glad you’re ready to come onboard. Let’s start by getting to know you better.</p>
                        <p>Your phone number is {state.phone}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form className="onboard-form" onSubmit={this.handleSubmit}>
                           <div className={ !bvnIvalid ? "input-ctn" : "input-ctn form-error" }>
                                <label>Enter your BVN</label>
                                <input type="text" onChange={this.handleChange} onBlur={this.handleValidation} maxLength="12" name="bvn" value={bvn} placeholder="249087653214"/>
                                {bvnIvalid &&
                                <div className="text-danger">A valid bvn is 12 digits</div>
                                }
                            </div>

                            <div className={ !dobInvalid ? "input-ctn" : "input-ctn form-error" }>
                                <label>Your Date of Birth</label>
                                {/* <input type='text' name="dob" value={dob} className="datepicker-here" data-position='top left'
                                       data-language="en" onSelect={this.handleChange} /> */}
                                 <DatePicker placeholderText="06/19/1992" selected={dob} 
                                 onChange={this.handleDatePicker}
                                 onChangeRaw={(e)=>this.handleChange(e)}
                                 onBlur = {this.handleValidation}
                                 peekNextMonth
                                 showMonthDropdown
                                 showYearDropdown
                                 dropdownMode="select"
                                 maxDate={new Date()}
                                 />
                                 {dobInvalid &&
                                <div className="text-danger">select a valid date</div>
                                }
                            </div>
                            <input type="submit" value="Continue" className="btn-alat btn-block"/>
                        </form>
                        <p className="text-center"><NavLink to="/">Skip BVN</NavLink></p>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}


function mapStateToProps(state){
    return state.onboarding_user_details;
}

export default connect(mapStateToProps)(Bvn);