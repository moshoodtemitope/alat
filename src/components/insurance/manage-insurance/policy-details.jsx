import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import {Checkbox} from "react-inputs-validation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import * as utils from '../../../shared/utils';
import {Textbox} from "react-inputs-validation";
import whitelogo from "../../../assets/img/white-logo.svg"; 
import  {routes} from '../../../services/urls';
import successIcon from "../../../assets/img/success-tick.svg";
import noPolicy from "../../../assets/img/empty-policy.svg";

import {
 }from "../../../redux/constants/insurance/insurance.constants";


 import {
    saveCustomerDetails,
    saveCustomerPolicyData
    // clearCardsStore
} from "../../../redux/actions/insurance/insurance.actions";
import { compose } from "redux";

// const options = [
// ];

const BASEURL = routes.BASEURL;

class PolicyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
           
        };


        this.handleCustomerPolicyDetails = this.handleCustomerPolicyDetails.bind(this);
        
    }

    componentDidMount() {
    }

    handleCustomerPolicyDetails(e){
        e.preventDefault()
    }

    renderGetCustomerAutoPolicyDetails(){
        let{autoRegNo,
            autoEngineNo,
            autoChasisNo,
            autoEstimatedvalue} = this.state;
        return(
            <div>
                 <h4 className="m-b-10 center-text hd-underline brand-title">Personal Information</h4>
                <div className="transfer-ctn">
                    <form onSubmit={this.handleCustomerPolicyDetails}>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                    <label>Registration Number</label>
                                    <Textbox
                                    id={'autoRegNo'}
                                    name="autoRegNo"
                                    type="text"
                                    autoComplete ="off"
                                    value={autoRegNo}
                                    placeholder= "Enter Car registration number"
                                    onChange= {(autoRegNo, e)=>{
                                        this.setState({autoRegNo});
                                    }}
                                />
                            </div>
                            <div className="input-ctn">
                                <button type="button"
                                    className="btn-alat btn-inverse m-t-10 m-b-20 text-center">Get Details    
                                </button>
                            </div>
                        </div>
                        <div className="input-ctn">
                            <label>Engine Number</label>
                            <Textbox
                                id={'autoEngineNo'}
                                name="autoEngineNo"
                                type="text"
                                autoComplete ="off"
                                value={autoEngineNo}
                                placeholder= "Enter car engine number"
                                onChange= {(autoEngineNo, e)=>{
                                    this.setState({autoEngineNo});
                                }}
                            />
                        </div>
                        <div className="input-ctn">
                            <label>Chasis Number</label>
                            <Textbox
                                id={'autoChasisNo'}
                                name="autoChasisNo"
                                type="text"
                                autoComplete ="off"
                                value={autoChasisNo}
                                placeholder= "Enter car chasis number"
                                onChange= {(autoChasisNo, e)=>{
                                    this.setState({autoChasisNo});
                                }}
                            />
                        </div>
                        <div className="input-ctn">
                            <label>Estimated Value</label>
                            <Textbox
                                id={'autoEstimatedvalue'}
                                name="autoEstimatedvalue"
                                type="text"
                                autoComplete ="off"
                                value={autoEstimatedvalue}
                                placeholder= "Enter car estimated value"
                                onChange= {(autoEstimatedvalue, e)=>{
                                    this.setState({autoEstimatedvalue});
                                }}
                            />
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>Year of Make</label>
                                <Select
                                    options={allGenders}
                                    placeholder="Choose manufacture year"
                                    onChange={this.handleSelectedGender}
                                />
                            </div>
                            <div className="input-ctn">
                                <label>Car Make</label>
                                <Select
                                    options={allGenders}
                                    placeholder="Choose car make"
                                    onChange={this.handleSelectedGender}
                                />
                            </div>
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>Car Model</label>
                                <Select
                                    options={allGenders}
                                    placeholder="Choose car model"
                                    onChange={this.handleSelectedGender}
                                />
                            </div>
                            <div className="input-ctn">
                                <label>Body Type</label>
                                <Select
                                    options={allGenders}
                                    placeholder="Choose body type"
                                    onChange={this.handleSelectedGender}
                                />
                            </div>
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>Car Color</label>
                                <Select
                                    options={allGenders}
                                    placeholder="Choose car color"
                                    onChange={this.handleSelectedGender}
                                />
                            </div>
                            <div className="input-ctn">
                                <label>Cubic Cap</label>
                                <Select
                                    options={allGenders}
                                    placeholder="Choose cubic cap"
                                    onChange={this.handleSelectedGender}
                                />
                            </div>
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>Driver Licence number</label>
                                <Textbox
                                    id={'driverLicenceNo'}
                                    name="driverLicenceNo"
                                    type="text"
                                    autoComplete ="off"
                                    value={driverLicenceNo}
                                    placeholder= "Enter driver licence number"
                                    onChange= {(driverLicenceNo, e)=>{
                                        this.setState({driverLicenceNo});
                                    }}
                                />
                            </div>
                            <div className="input-ctn">
                                <label>Years of Driving Experience</label>
                                <Textbox
                                    id={'yrsOfDriving'}
                                    name="yrsOfDriving"
                                    type="text"
                                    autoComplete ="off"
                                    value={yrsOfDriving}
                                    onChange= {(yrsOfDriving, e)=>{
                                        this.setState({yrsOfDriving});
                                    }}
                                />
                            </div>
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>Driver License Issue Date</label>
                                <DatePicker placeholderText="" 
                                    onChange={this.handleDoB}
                                    selected={dob}
                                    //onChangeRaw={(e) => this.handleChange(e)}
                                    dateFormat="d MMMM, yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                />
                            </div>
                            <div className="input-ctn">
                                <label>Policy Start Date</label>
                                <DatePicker placeholderText="" 
                                    onChange={this.handleDoB}
                                    selected={dob}
                                    //onChangeRaw={(e) => this.handleChange(e)}
                                    dateFormat="d MMMM, yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                />
                            </div>
                        </div>
                        <div className="input-ctn">
                            <label> Policy End Date</label>
                            <DatePicker placeholderText="" 
                                onChange={this.handleDoB}
                                selected={dob}
                                //onChangeRaw={(e) => this.handleChange(e)}
                                dateFormat="d MMMM, yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={new Date()}
                            />
                        </div>
                        <center>
                            <button type="submit"  
                                    className="btn-alat m-t-10 m-b-20 text-center"
                                    > Submit</button>
                        </center>
                    </form>
                </div>
            </div>
        )
    }
    


    renderDetailsContainer(){
        let {showCustomerForm} = this.state;
        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                {this.renderGetCustomerAutoPolicyDetails()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    

    

   
   

    
    render() {
        return (
            <Fragment>
                {this.renderDetailsContainer()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
        newPolicyDataChunk   : state.insurancePile.getNewPolicyDataChunk,
        getProductCovers   : state.insurancePile.getCoversInPoductRequest
    };
}

export default connect(mapStateToProps)(PolicyDetails);
