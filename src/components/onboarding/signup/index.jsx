import * as React from 'react';
import {BrowserRouter, NavLink} from "react-router-dom";
import {history} from "./../../../_helpers/history";
import {SubmissionError} from "redux-form";
import OnboardingContainer from "../Container";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {Route, Switch} from "react-router";
import Bvn from "./bvn";
import {Fragment} from "react";
import {Select} from "react-select";
import {FETCH_BANK_FAILURE, FETCH_BANK_PENDING, FETCH_BANK_SUCCESS} from "../../../redux/constants/transfer.constants";
import flags from "../../../assets/img/flags.png";
import {ReactTelephoneInput} from "react-telephone-input";
import "./../onboarding.scss";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {USER_REGISTER_SAVE, USER_REGISTER_FETCH} from "../../../redux/constants/onboarding/user.constants";
import {connect} from "react-redux";
import phoneimage from "../../../assets/img/phone-bvn.svg"
import Modal from 'react-responsive-modal';
import { modelStateErrorHandler } from '../../../shared/utils';
 
require('react-telephone-input/lib/withStyles');
// const ReactTelInput = require('react-telephone-input');
const axios = require('axios');

class Signup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            error: '',
            formError: '',
            openModal: false,
            inputProps :{
             maxLength:20,
             onInput : this.handleInputChange,
             tabIndex : 1
            }
            // international_code: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    onOpenModal = () => {
        this.setState({ openModal: true });
    };

    onCloseModal = () => {
        this.setState({ submitted: false });
        this.setState({ openModal: false });
    };

    handleChange(e) {
        const { name, value } = e.target;
        e.preventDefault();
        const re = /^[0-9\b]+$/;
        // this.setState({ [name]: value });
        this.setState({ [name]: value });
        // if (e.target.value === '' || re.test(e.target.value)) {
        //     this.setState({phone: e.target.value});
        // }

    }

    formatPhone(phone){
        let {numPrefix} = this.state;
        // console.log('phone is', phone);
        let tempPhone = phone.replace(/-/g,'');
        if(tempPhone.indexOf('(')>-1){
            tempPhone = tempPhone.replace(/\(/g,'');
            tempPhone = tempPhone.replace(/\)/g,'');
        }
        // console.log('unformatted phone is', tempPhone);
        var slashFrom = tempPhone.length - 10;
        return numPrefix + tempPhone.substring(slashFrom);
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.setState({ submitted: true });
        let { phone, error, formError } = this.state;
        const { dispatch } = this.props;
        phone = this.formatPhone(phone);
        

        if(!phone || phone.length < 11 || phone.length > 20){
            this.setState({ formError: true });
            // this.setState({ submitted: false });
            return;
        }
        if (phone) {
           
            this.setState({phoneInputted: phone});
            this.onOpenModal();

            // let data = {
            //     PhoneNo: phone,
            //     channelId: 2
            // };
            //this.submitData(data);
            //
            // let consume = ApiService.request(routes.SIGNUP_PHONE, "POST", data);
            // return consume.then(function (response){
            //     console.log(response);
            //     dispatch(userActions.register({phone: phone}, USER_REGISTER_SAVE));
            //     history.push('/register/bvn');
            // }).catch(err => {
            //     // console.log(err.response.data.message);
            //     console.log(err.response);
            //     this.setState({ submitted: false, error: err.response.data.message});
            //     // throw new SubmissionError({ _error: err.response.data.message});
            // });
        }
    }

    submitData = () => {
        this.setState({ submitted: true });
        const { dispatch } = this.props;
        let data = {
            PhoneNo: this.state.phoneInputted.replace(/[^a-zA-Z0-9]/g, ''),
            channelId: 2
        };
        dispatch(userActions.register({phone : data.PhoneNo}, USER_REGISTER_FETCH));
        let consume = ApiService.request(routes.SIGNUP_PHONE, "POST", data);
        return consume.then(function (response){
            dispatch(userActions.register({phone: data.PhoneNo}, USER_REGISTER_SAVE));
            history.push('/register/bvn');
        }).catch(err => {
            this.onCloseModal();
            this.setState({ submitted: false, error: modelStateErrorHandler(err)});
        });
    };


    handleInputChange(e) {
        // console.log(e.currentTarget.value)
        //  let s = e.currentTarget.value; 
        //  console.log(s.replace(/\D/g, '').length);
        // if(s.replace(/\D/g, '').length >=13){
        //     console.log("in here");
        //  e.setAttribute("value","");
        // }
        //e.preventDefault();
        //console.log('input changed. number: ', telNumber, 'selected country: ', selectedCountry);
        // this.setState({international_code: telNumber});
    }

    handleInputBlur(telNumber, selectedCountry) {
        //console.log(telNumber);
        // console.log(
        //     'Focus off the ReactTelephoneInput component. Tel number entered is: ',
        //     telNumber,
        //     ' selected country is: ',
        //     selectedCountry
        // );
        let tempNum, numPrefix, phoneNum;
        if(telNumber.indexOf('-')>-1){
            tempNum = telNumber.split(/-(.+)/)[1];
            numPrefix = telNumber.split(/-(.+)/)[0];
                if (tempNum.charAt(0)==='0'){
                    tempNum = tempNum.replace('0','')
                }
            
            // phoneNum = numPrefix+tempNum;
            // console.log('temp num is', phoneNum);
        }

        // let tempNum = telNumber.split()
        this.setState({phone: tempNum, numPrefix}, ()=>console.log('number is',this.state.phone));
        // this.setState({phone: phoneNum}, ()=>console.log('number is',this.state.phone));
    }

    render(){
        const { phone, international_code, submitted, error, formError, openModal } = this.state;
        let props = this.props;
       
        // var countriesData = require('../countries.json');

        return (
            <OnboardingContainer>

                <div className="row">
                    <div className="col-12">
                        <h3>Hello there!<span></span></h3>
                        <p>We’re so glad you’re ready to come onboard. Let’s start by getting to know you better.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form className="onboard-form" onSubmit={this.handleSubmit}>
                            {error && <div className="info-label error">{error}</div>}
                            <div className={ !formError ? "input-ctn" : "input-ctn form-error" }>
                                <label>Please enter your phone number (e.g +234-813-000-1111)</label>
                                <ReactTelephoneInput
                                    inputProps = {this.state.inputProps}
                                    defaultCountry="ng"
                                    flagsImagePath={flags}
                                    //onBlur={this.handleInputBlur}
                                    onChange={this.handleInputBlur}
                                    id="phoneInput"
                                />
                                {formError &&
                                <div className="text-danger">A Valid phone Number is required</div>
                                }

                            </div>

                            {/*<div className={ !formError ? "input-ctn" : "input-ctn form-error" }>*/}
                                {/*<label>Please enter your phone number</label>*/}
                                {/*<input type="text" pattern="\d*" maxLength="16" name="phone" value={phone} onChange={this.handleChange} placeholder="8123456789" />*/}
                                {/*{formError &&*/}
                                    {/*<div className="text-danger">A Valid phone Number is required</div>*/}
                                {/*}*/}
                            {/*</div>*/}
                            <button type="submit" disabled={submitted} className="btn-alat btn-block">{ submitted ? "Processing..." : "Get Started" }</button>
                        </form>
                        <p className="text-center">Already have an account? <NavLink to="/">Login</NavLink></p>
                        <p className="text-center m-t-20">Need help? <a target="_blank" href="http://www.alat.ng/contact-us">We are here for you</a></p>
                    </div>
                </div>
                <Modal open={openModal} onClose={this.onCloseModal} center>
                    <div className="div-modal">
                        <img src={phoneimage}/>

                        <h3>Your phone number is <br/><strong><span>{this.state.phoneInputted}</span></strong>.<br/> Do you want to proceed?</h3>

                    <div className="btn-opt">
                        <button onClick={this.onCloseModal} className="border-btn">Back</button>
                        <button onClick={this.submitData} disabled={submitted}
                         className="btn-alat">{ submitted ? "Processing..." : "Proceed"}</button>
                    </div>
                    </div>
                </Modal>
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state){
    return state.onboarding_user_details;
}

export default connect(mapStateToProps)(Signup);
