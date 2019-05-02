import * as React from 'react';
//import DatePicker from 'react-bootstrap-date-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import  "../../../assets/scss/datepicker.scss"
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";

import {USER_REGISTER_FETCH, USER_REGISTER_SAVE} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";
import Modal from 'react-responsive-modal';

//var DatePicker = require("react-bootstrap-date-picker");

class Bvn extends React.Component{

    constructor(props){
        super(props);
        this.state={
            bvn: '',
            dob: null,
            bvnIvalid: false,
            dobInvalid: false,
            openModal: false,
            formInvalid: true
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDatePicker = this.handleDatePicker.bind(this);
        this.submitSkipBVN = this.submitSkipBVN.bind(this);
    }
    
    handleChange(e){
        const name = e.target.name;
        if(name == 'bvn'){
            this.setState({bvn: e.target.value.replace(/\D/,'')})
            if(this.state.bvn.length == 10)
            this.validateBvn(0);
        }
        else
        e.preventDefault();
    }

    handleDatePicker=(dob)=>{
        dob.setHours( dob.getHours() + 1 );
        this.setState ({dob : dob});
    }
    
    formValidation=()=>{
        
        if(this.validateBvn(1) == false & this.validateDob() == false)
        {
            this.setState({formInvalid: false});
            return false;
        }
        else {
            this.setState({formInvalid: true});
            return true;
        }
    }

    validateBvn=(zeroIndex)=>{
        if( (this.state.bvn.length - zeroIndex) == 10){
             this.setState({bvnIvalid: false});
             return false;
        }
       else {
           this.setState({bvnIvalid : true});
           return true;
        }
    }

    validateDob=()=>{
        if(this.state.dob == null){
            this.setState({dobInvalid: true});
            return true;
        }
            else {this.setState({dobInvalid : false});
        return false;
        }
    }

    handleSubmit(e){
        e.preventDefault();
         
        //console.log(this.formValidation());
        if(this.formValidation() == false)  
        {
            this.verifyBvn();
        }
        else {
            
        }
    }

    verifyBvn(){
        const { dispatch } = this.props;
        let data = {
            bvn: this.state.bvn,
            dob: this.state.dob,
            phoneNo : this.state.phone,
            isOnboarding: true,
            channelId: 2
          };
       this.props.dispatch(userActions.bvnVerify(data));
      // userActions.bvnVerify(data);
       // console.error(this.state);
    }

    submitSkipBVN(){
        this.toggleModal();
        const {dispatch} = this.props;
        
        dispatch(userActions.skipBvn(this.state));
    }


    getRegistrationDetails(){
        const { dispatch } = this.props;
        let props = this.props;
        let userData;
        let userDetails = props.user_details;
        if('registration_status' in userDetails && userDetails.registration_status === USER_REGISTER_SAVE){
            if(userDetails.registration_data.user !== undefined){
            userData =  userDetails.registration_data.user;
            this.setState({userData: userData});
            this.setState({phone: userData.phone});
            }
            else {
                history.push('/register');
            }
        }
        else{
            history.push('/register');
        }
    }

    componentDidMount() {
        
        this.getRegistrationDetails();
    }
    
    toggleModal(){
        if(this.state.openModal == false)
         this.setState({openModal : true});
         else if(this.state.openModal == true)
         this.setState({openModal : false});
    }

    render(){
        const {bvn, dob, bvnIvalid, dobInvalid, formInvalid, openModal, imei} = this.state;
        let props = this.props;

        let phone = '';
        let state = this.state;
        let userDetails = props.user_details;

        // phone =

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
                            {props.alert && props.alert.message &&
                             <div className={`info-label ${props.alert.type}`}>{props.alert.message}</div>
                            }
                           <div className={!bvnIvalid ? "input-ctn" : "input-ctn form-error" }>
                                <label>Enter your BVN</label>
                                <input type="text" onChange={this.handleChange} maxLength="11" name="bvn" value={bvn} placeholder="Enter your BVN"/>
                                {bvnIvalid &&
                                <div className="text-danger">A valid bvn is 11 digits</div>
                                }
                            </div>

                            <div className={ !dobInvalid ? "input-ctn" : "input-ctn form-error" }>
                                <label>Your Date of Birth</label>
                                {/* <input type='text' name="dob" value={dob} className="datepicker-here" data-position='top left'
                                       data-language="en" onSelect={this.handleChange} /> */}
                                 <DatePicker placeholderText="06/19/1992" selected={dob} 
                                 onChange={this.handleDatePicker}
                                 onChangeRaw={(e)=>this.handleChange(e)}
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
                            <button type="submit" disabled={props.bvn_details.bvn_verification_status == "BVN_VERIFICATION_PENDING"} className="btn-alat btn-block">
                            { props.bvn_details.bvn_verification_status == "BVN_VERIFICATION_PENDING" ? "Processing..." : "Continue"}</button>
                        </form>
                        <p className="text-right pull-right"><a href="#" onClick={this.toggleModal}>Skip BVN</a></p>
                        <p className="text-left pull-left"><NavLink to="/register">Go Back</NavLink></p>
                    </div>
                </div>
                <Modal open={openModal} onClose={this.toggleModal} center>
                  <div>
                  <div className="div-modal">
                        <h3>Do you actually want to skip BVN?</h3>
                    <div className="btn-opt">
                        <button onClick={this.toggleModal} className="border-btn">Back</button>
                        <button onClick={this.submitSkipBVN} className="btn-alat">Proceed</button>
                    </div>
                    </div>
                  </div>
                </Modal>
            </OnboardingContainer>
        );
    }
}


function mapStateToProps(state){
    //console.error(state);
    
    return {
        user_details: state.onboarding_user_details,
        bvn_details: state.onboarding_bvn_details,
        alert: state.alert
    }
    
    //state.onboarding_user_details;
}

export default connect(mapStateToProps)(Bvn);