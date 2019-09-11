import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import {Checkbox} from "react-inputs-validation";
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
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
    saveCustomerDetails
    // clearCardsStore
} from "../../../redux/actions/insurance/insurance.actions";
import { compose } from "redux";

// const options = [
// ];

const BASEURL = routes.BASEURL;

class ProvideDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            showCustomerForm: true,
            dob:null,
            firstName:'',
            surname:'',
            customerInsuranceEmail:'',
            customerInsurancePhoneNo:'',
            customerAddress:'',
            selectedGender:'',
            selectedState:'',
            selectedLga:'',
            selectedTitle:'',
            stateLgas:[],
            isInComplete:false
        };

        this.handleCustomerDetails =  this.handleCustomerDetails.bind(this);
        this.handleSelectedState   =  this.handleSelectedState.bind(this);
        this.handleSelectedTitle   =  this.handleSelectedTitle.bind(this);
        this.handleSelectedGender  =  this.handleSelectedGender.bind(this);
        this.handleDoB             =  this.handleDoB.bind(this);
        this.handleSelectedLga     =  this.handleSelectedLga.bind(this);
        
    }

    componentDidMount() {
        this.verifyStage();
        this.getStates()
    }

    verifyStage(){
        if(Object.keys(this.props.saveProductCoverId).length===0){
            this.props.history.push("/insurance");
            return false;
        }
    }
    

    handleCustomerDetails(e){
        e.preventDefault();
        if(this.validateCustomerData()){
            this.setState({isInComplete:false})
            this.props.history.push("/insurance/buy-insurance/policydetails")
        }else{
            this.setState({isInComplete:true})
        }
    }

    validateCustomerData(){
        if(this.state.selectedTitle!==''&& this.state.selectedGender!==''
            && this.state.firstName!==''&& this.state.surname!==''
            && this.state.selectedState!==''&& this.state.selectedLga!==''
            && this.state.customerInsuranceEmail!==''&& this.state.customerInsurancePhoneNo!==''
            && this.state.dob!==null && this.state.customerAddress!==''
        ){
            let customerData = {
                FirstName: this.state.firstName,
                LastName:this.state.surname,
                DateOfBirth:this.state.dobConverted,
                EmailAddress:this.state.customerInsuranceEmail,
                PhysicalAddrs:this.state.customerAddress,
                SmsTel:this.state.customerInsurancePhoneNo,
                TownId:this.state.selectedLga,
                TitleId:this.state.selectedTitle,
                GenderId:this.state.selectedGender
            };

            

            const { dispatch } = this.props;
            dispatch(saveCustomerDetails(customerData));

            return true;
        }else{
            return false;
        }
    }

    handleSelectedTitle(selectedTitle){
        this.setState({selectedTitle:selectedTitle.value});
    }

    handleSelectedGender(selectedGender){
        this.setState({selectedGender:selectedGender.value});
    }
    

    handleDoB = (dob) => {
        // this.setState({ dob });
        if(typeof dob ==='object'){
            dob.setHours(dob.getHours() + 1);
            let month = new Date(dob).getUTCMonth()+1, 
                day   = new Date(dob).getUTCDate();

            let dobConverted;

                if(month.toString().length===1){
                    month = '0'+month;
                }

                if(day.toString().length===1){
                    day = '0'+day;
                }

             dobConverted = new Date(dob).getUTCFullYear()+'-'+month+'-'+day+'T00:00:00';
            
            this.setState({ dob, dobConverted});
        }else{
            
            this.setState({ dob:'', dobConverted:'' });
        }
    }

    getStates(){
        if(Object.keys(this.props.saveProductCoverId).length===0){
            this.props.history.push("/insurance");
            return false;
        }
        let newPolicyData    = this.props.newPolicyDataChunk.newpolicy_data.response,
            statesTemp       = [],
            lgasTemp         = [],
            allLgas          = [];

            newPolicyData.Lga.map(state=>{
                statesTemp.push({value:state.Name.split('-')[0], label:state.Name.split('-')[0]});
                lgasTemp.push({state:state.Name.split('-')[0], lga:state.Name.split('-')[1]})
            })

            this.getLgas('save', lgasTemp);

            const allStates = statesTemp.reduce((acc, current) => {
                const x = acc.find(item => item.value === current.value);
                if (!x) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
            }, []);

            this.setState({allStates})
    }

    handleSelectedState(selectedState){
        this.setState({selectedState: selectedState.value}, this.getLgas('retrieve',selectedState.value));
    }
    
    handleSelectedLga(selectedLga){
        this.setState({selectedLga: selectedLga.value});
    }

    getLgas(action, data){
        if(action==='save'){
            this.setState({allLgasChunk:data})
        }

        if(action==='retrieve'){
            let lgaChunk = this.state.allLgasChunk,
                lgasInState=[];

                lgaChunk.map(eachStateLga=>{
                    if(eachStateLga.state===data){
                        lgasInState.push({value:eachStateLga.lga, label:eachStateLga.lga})
                    }
                })
            this.setState({stateLgas:lgasInState})
        }
    }

    renderCustomerDetailsForm(){
        if(this.props.newPolicyDataChunk.newpolicy_data===undefined){
            this.props.history.push("/insurance");
            return false;
        }
        let newPolicyData    = this.props.newPolicyDataChunk,
            allTitles        = [],
            allGenders       = [],
            statesTemp       = [],
            // allStates        = [],
            lgasTemp         = [],
            allLgas          = [];
       
        if(Object.keys(this.props.newPolicyDataChunk).length!==0){
            newPolicyData = newPolicyData.newpolicy_data.response;
        }
        let{firstName,
            surname,
            customerInsuranceEmail,
            customerInsurancePhoneNo,
            customerAddress,
            allStates,
            stateLgas,
            isInComplete,
            dob}   =this.state;

            newPolicyData.Genders.map(gender=>{
                allGenders.push({value:gender.Id, label:gender.Name})
            })

            newPolicyData.Titles.map(title=>{
                allTitles.push({value:title.Id, label:title.Name})
            })

            

        return(
            <div>
                <h4 className="m-b-10 center-text hd-underline brand-title">Personal Information</h4>
                <div className="transfer-ctn">
                    <form className="detailsform"  onSubmit={this.handleCustomerDetails}>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>Title</label>
                                <Select
                                    options={allTitles}
                                    placeholder="Choose title"
                                    onChange={this.handleSelectedTitle}
                                />
                            </div>
                            <div className="input-ctn">
                                <label>Gender</label>
                                <Select
                                    options={allGenders}
                                    placeholder="Your gender"
                                    onChange={this.handleSelectedGender}
                                />
                            </div>
                        </div>
                        <div className="input-ctn textwrap">
                            <label>First Name</label>
                            <Textbox
                                id={'firstName'}
                                name="firstName"
                                type="text"
                                autoComplete ="off"
                                value={firstName}
                                placeholder= "Enter first name"
                                onChange= {(firstName, e)=>{
                                    this.setState({firstName});
                                }}
                            />
                        </div>
                        <div className="input-ctn textwrap">
                            <label> Surname</label>
                            <Textbox
                                id={'surname'}
                                name="surname"
                                type="text"
                                autoComplete ="off"
                                value={surname}
                                placeholder= "Enter surname"
                                onChange= {(surname, e)=>{
                                    this.setState({surname});
                                }}
                            />
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>State</label>
                                <Select
                                    options={allStates}
                                    placeholder="Select state"
                                    onChange={this.handleSelectedState}
                                />
                            </div>
                            <div className="input-ctn">
                                <label>LGA</label>
                                <Select
                                    options={stateLgas}
                                    placeholder="Select Lga"
                                    onChange={this.handleSelectedLga}
                                />
                            </div>
                        </div>
                        <div className="input-ctn textwrap">
                            <label> Email</label>
                            <Textbox
                                id={'customerInsuranceEmail'}
                                name="customerInsuranceEmail"
                                type="email"
                                autoComplete ="off"
                                value={customerInsuranceEmail}
                                placeholder= "Enter email"
                                onChange= {(customerInsuranceEmail, e)=>{
                                    this.setState({customerInsuranceEmail});
                                }}
                            />
                        </div>
                        <div className="input-ctn textwrap">
                            <label> Phone Number</label>
                            <Textbox
                                id={'customerInsurancePhoneNo'}
                                name="customerInsurancePhoneNo"
                                type="text"
                                autoComplete ="off"
                                value={customerInsurancePhoneNo}
                                placeholder= "Enter phone no"
                                onChange= {(customerInsurancePhoneNo, e)=>{
                                    this.setState({customerInsurancePhoneNo});
                                }}
                            />
                        </div>
                        <div className="input-ctn">
                            <label> Date of birth</label>
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
                        <div className="input-ctn textwrap">
                            <label> Address</label>
                            <Textbox
                                id={'customerAddress'}
                                name="customerAddress"
                                type="text"
                                autoComplete ="off"
                                value={customerAddress}
                                placeholder= "Enter address"
                                onChange= {(customerAddress, e)=>{
                                    this.setState({customerAddress});
                                }}
                            />
                        </div>
                        <center>
                            <button type="submit"  
                                    className="btn-alat m-t-10 m-b-20 text-center"
                                                   > Next</button>
                                <div><Link to={'/insurance/buy-insurance/choose-cover'}>Back</Link></div>
                                
                        </center>

                        {isInComplete && <div className="error-msg text-center">Please provide all details</div>}
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
                                {showCustomerForm && this.renderCustomerDetailsForm()}
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
        saveProductCoverId   : state.insurancePile.saveProductCoverId,
        getProductCovers   : state.insurancePile.getCoversInPoductRequest
    };
}

export default connect(mapStateToProps)(ProvideDetails);
