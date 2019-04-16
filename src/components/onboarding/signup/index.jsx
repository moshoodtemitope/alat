import * as React from 'react';
import {BrowserRouter, NavLink} from "react-router-dom";
// import {ApiService} from "../../shared/apiService";
// import {routes} from "../../shared/urls";
import {history} from "./../../../_helpers/history";
import {SubmissionError} from "redux-form";
// import {userActions} from "../../_actions";
import OnboardingContainer from "../Container";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {Route, Switch} from "react-router";
import Bvn from "./bvn";
import {Fragment} from "react";
import {Select} from "react-select";
import {FETCH_BANK_FAILURE, FETCH_BANK_PENDING, FETCH_BANK_SUCCESS} from "../../../redux/constants/transfer.constants";
import flags from "./../../../assets/img/flags.png";
import {ReactTelephoneInput} from "react-telephone-input";
import "./../onboarding.scss";

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
        };
        this.renderDropdown = this.renderDropdown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        // const { name, value } = e.target;
        const re = /^[0-9\b]+$/;
        // this.setState({ [name]: value });
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({phone: e.target.value});
        }

    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { phone, error, formError } = this.state;
        const { dispatch } = this.props;
        console.log(phone);
        if(!phone || phone.length < 11){
            console.log("in here");
            this.setState({ formError: true });
            console.log(this.state);
            this.setState({ submitted: false });
            return;
        }
        if (phone) {
            let data = {
                PhoneNo: phone,
                channelId: 2
            };

            let consume = ApiService.request(routes.SIGNUP_PHONE, "POST", data);
            return consume.then(function (response){
                console.log(response);
                history.push('/register/bvn');
            }).catch(err => {
                // console.log(err.response.data.message);
                console.log(err.response);
                this.setState({ submitted: false, error: err.response.data.message});
                // throw new SubmissionError({ _error: err.response.data.message});
            });
        }
    }

    renderDropdown(){
        // console.error(props);
        var countriesData = require('../countries.json');
        //console.log(countriesData);
        for(let i of countriesData){
            console.log(i);
        }

        // axios.get('../countries.json')
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((err) => {
        //         //dispatch({type:'SIGNUP_COUNTRIES_FAILURE', payload:err});
        //     })




        // let consume = ApiService.request('../countries.json', "GET", null);
        // return consume.then(function (response){
        //     console.log(response);
        //
        // }).catch(err => {
        //     console.log(err.response);
        // });


        // switch(banksStatus){
        //     case FETCH_BANK_PENDING:
        //         return (
        //             <select disabled>
        //                 <option>Fetching Banks...</option>
        //             </select>
        //         );
        //     case FETCH_BANK_SUCCESS:
        //         let banksList = props.bankList.banks_data.response;
        //         for(var bank in banksList){
        //             options.push({value: banksList[bank].BankCode, label: banksList[bank].BankName});
        //         }
        //         const { selectedBank } = this.state;
        //         return(
        //             <Select
        //                 value={selectedBank}
        //                 options={options}
        //             />
        //             /*<select>
        //                 {banksList.map(function(bank, code){
        //                     return(
        //                         <option key={code} value={bank.BankCode}>{bank.BankName}</option>
        //                     );
        //                 })}
        //             </select>
        //             */
        //         );
        //     case FETCH_BANK_FAILURE:
        //         this.showRetry();
        //         return(
        //             <select disabled>
        //                 <option>Unable to load banks</option>
        //             </select>
        //         );
        // }
    }

    handleInputChange(telNumber, selectedCountry) {
        console.log('input changed. number: ', telNumber, 'selected country: ', selectedCountry);
    }

    render(){
        const { phone, submitted, error, formError } = this.state;
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
                            <div className="input-ctn">
                                <label>Select your Country</label>
                                <ReactTelephoneInput
                                    value="ng"
                                    defaultCountry="ng"
                                    flagsImagePath={flags}
                                    onChange={this.handleInputChange}
                                />
                                {/*<Select*/}
                                    {/*value=""*/}
                                    {/*options={countriesData}*/}
                                {/*/>*/}
                            </div>

                            <div className={ !formError ? "input-ctn" : "input-ctn form-error" }>
                                <label>Please enter your phone number</label>
                                <input type="text" pattern="\d*" maxLength="20" name="phone" value={phone} onChange={this.handleChange} placeholder="08123456789" />
                                {formError &&
                                    <div className="text-danger">A Valid phone Number is required</div>
                                }
                            </div>
                            <button type="submit" disabled={submitted} className="btn-alat btn-block">{ submitted ? "Processing..." : "Get Started" }</button>
                        </form>
                        <p className="text-center">Already have an account? <NavLink to="/">Login</NavLink></p>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}

export default Signup

//
// ReactDom.render(
//     <Signup />,
//     document.getElementById('root')
// );