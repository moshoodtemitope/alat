import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import {history} from '../../_helpers/history';
import { ToggleButton }  from '../../shared/elements/_toggle';
import {connect} from 'react-redux'
// import { on } from 'cluster';


class NextOfKin extends Component {
    constructor(props){
        super(props);
        this.state = {
         user: JSON.parse(localStorage.getItem("user")),
         BVNValidity: false,
         dateValidity: false,
         bvnNumber: null,
         dateValue: null,
         birthDate: null,
         
         Occupation: null,
         AlatPin: null,
         Sector: null,
         phoneNumber: null,
         BVNnumber: null,
         SurName: null,
         EmailAddress: null,
         FirstName: null, 
         OtherName: null, 
         EmployerName: null,
         EmploymentStatus: null,
         mothersMaidenName: null,
         Gender: null,
         LocalGv: null,
         StateOfOrigin: null,
         Nationality: null,
         PlaceOfBirth: null, 
         maritalStatus: null,
         title: null,
         apartment: null,
         houseNumber: null,
         street: null,
         busStop: null,
         personalAddress: null,
         apartment2: null,
         houseNumber2: null,
         street2: null,
         busStop2: null,
         personalAddress2: null,
         nextOfKinBVN: null,
         relationship: null,
         
         NationalityValidity: false, 
         OtherNameValidity: false, 
         MothersMaidenNameValidity: false,
         DateOfBirthValidity: false,
         StateOfOriginValidity: false, 
         GenderValidity: false, 
         SurnameValidity: false, 
         FirstNameValidity: false, 
         SectorValidity: false,
         phoneNumberValidity: false,
         EmailAddressValidity: false,
         EmployersNameValidity: false, 
         EmploymentValidity: false, 
         LocalGovValidity: false, 
         PlaceOfBirthValidity: false,
         PinValidity: false,
         OccupationValidity: false,
         TitleValidity: false,
         relationshipValidity: false,
         houseNumberValidity: false,
         apartmentValidity: false,
         yourAddressValidity: false,
         busstopValidity: false,
         streetValidity: false,
         personalAddressValidity: false,
         
 
         personalAddressValidity2: false,
         streetValidity2: false,
         busstopValidity2: false,
         houseNumberValidity2: false,
         apartmentValidity2: false,
         
         isAddressSame: 'on',
         sameAddressAsAbove: "sameAddressAsAbove"
        }
    }
 
    SetBVNValidityStatus = () => {
       console.log();
       if(this.state.bvnNumber == null || this.state.bvnNumber  == "" || this.state.bvnNumber.toString().length < 11){
           this.setState({BVNValidity: true});
       }else{
           this.setState({BVNValidity: false});
       }
    }
    
    SetDateValidity = () => {
        if(this.state.birthDate == null || this.state.birthDate == ""){
            this.setState({dateValidity: true});
        }else{
            this.setState({dateValidity: false});
        }
    }
 
 
    checkValidity = () => {
        let result = 'valid';
        for(let x in this.state){
             switch(x){
                 case 'bvnNumber':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'birthDate':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'Occupation':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'AlatPin':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'Sector':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'phoneNumber':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                case 'relationship':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'SurName':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'EmailAddress':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'FirstName':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'OtherName':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'EmployerName':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                  
                 case 'EmploymentStatus':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'Gender':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'mothersMaidenName':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'LocalGv':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'StateOfOrigin':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'Nationality':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'PlaceOfBirth':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'maritalStatus':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'title':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'houseNumber':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'apartment': 
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 
                 case 'personalAddress':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'street':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'address':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'busStop': 
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'houseNumber2':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'apartment2': 
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'personalAddress2':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'street2':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                 case 'busStop2': 
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
            
             }
 
             console.log(result)
             return result;
         }
 
        console.log(result);
        return result;
    }
 
    InitiateNetworkCall = () => {
        // let data = {
        //     bvn: this.state.bvnNumber,
        //     date: this.state.dateValue
        // }
        let checkeBoxValue = '';
        switch(checkeBoxValue){
            case 'on':      
               checkeBoxValue = true;
            case 'off':  
               checkeBoxValue = false;
        }

        let data = {
            gender: this.state.Gender,
            dateOfBirth: this.state.birthDate,
            title: this.state.title,
            relationship: this.state.relationship,
            firstName: this.state.FirstName,
            surname: this.state.SurName,
            otherNames: this.state.OtherName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.EmailAddress,
            bvNumber: this.state.nextOfKinBVN,
            streetAddress: this.state.street,
            landMark: this.state.busStop,
            country: this.state.Nationality,
            state: this.state.StateOfOrigin,
            town: this.state.LocalGv,
            isAddressSame: checkeBoxValue,
            pin: this.state.AlatPin,
            address: this.state.address
        }
          
          console.log(data);
          return;
        this.props.dispatch(actions.linkBVN(this.state.user.token, data));
    }
 
    SetBvNNumber = (event) => {
        this.setState({bvnNumber: event.target.value});
    }
 
    SetBirthDay = (birthDate) => {
         this.setState({
             birthDate: birthDate
         });
    }
     
    NavigateToSuccessPage = () => {
        history.push('/profile-success-message');
    }
 
    HandleSubmit = () => {
        event.preventDefault();
        this.SetDateValidity();
        this.SetBVNValidityStatus();
 
        this.checkPinValidity(); 
        this.checkOccupationValidity();
        this.checkSectorValidity(); 
        this.checkphoneNumberValidity();
        this.checkEmailAddressValidity(); 
        this.checkEmployersNameValidity(); 
        this.checkLocalGovValidity(); 
        this.checkPlaceOfBirthValidity();
        this.checkTitleValidity();
        this.checkrelationshipValidity();
        this.checkNationalityValidity(); 
        this.checkStateOfOriginValidity();
        this.checkSurnameValidity(); 
        this.checkFirstNameValidity() 
        this.checkGenderValidity() 
        this.checkDateOfBirthValidity();
        this.checkEmploymentValidity();
        this.checkOtherNameValidity();
        this.checkMothersMaidenNameValidity();
        this.checkApartmentValidity();
        this.checkHouseNumberValidity();
        this.checkPersonalAddressValidity();
        this.checkBusstopValidity();
        this.checkStreetValidity();
        this.checkStreetValidity2();
        this.checkBusstopValidity2(); 
        this.checkPersonalAddressValidity2();
        this.checkHouseNumberValidity2();
        this.checkApartmentValidity2();
        this.checkYourAddressValidity();
 

        console.log('code got here');
 
        // return;
        console.log('was fired');
        this.InitiateNetworkCall();
        switch(this.checkValidity()){
            case null:
              console.log('Empty value was found');
              break;
            case 'valid': 
              console.log("No Empty Value Found");
            //   this.InitiateNetworkCall();
              break;
        }
    }
    
    SetInputValue = (event) => {
        let name = event.target.name;
        this.setState({[name] : event.target.value});
        console.log("  was just invoked");
    } 
    
    checkTitleValidity = () => {
         if(this.state.title == null || this.state.title == ""){
             this.setState({TitleValidity: true});
         }else{
             this.setState({TitleValidity: false});
         }
    }
 
     checkrelationshipValidity = () => {
         if(this.state.relationship == null || this.state.relationship == ""){
             this.setState({relationshipValidity: true});
         }else{
             this.setState({relationshipValidity: false});
         }
     }
 
     checkPinValidity = () => {
         if(this.state.AlatPin == null || this.state.AlatPin == ""){
             this.setState({PinValidity: true});
         }else{
             this.setState({PinValidity: false});
         }
     }

     checkOccupationValidity = () => {
         if(this.state.Occupation == null || this.state.Occupation == ""){
             this.setState({OccupationValidity: true});
         }else{
             this.setState({OccupationValidity: false});
         }
     }

     checkSectorValidity = () => {
         if(this.state.Sector == null || this.state.Sector == ""){
             this.setState({SectorValidity: true});
         }else{
             this.setState({SectorValidity: false});
         }
     }
     jy
     checkphoneNumberValidity = () => {
         if(this.state.phoneNumber == null || this.state.phoneNumber == ""){
             this.setState({phoneNumberValidity: true});
         }else{
             this.setState({phoneNumberValidity: false});
         }
     }
 
     checkEmailAddressValidity = () => {
         if(this.state.EmailAddress == null || this.state.EmailAddress == ""){
             this.setState({EmailAddressValidity: true});
         }else{
             this.setState({EmailAddressValidity: false});
         }
     }
     checkEmployersNameValidity = () => {
         if(this.state.EmployerName == null || this.state.EmployerName == ""){
             this.setState({EmployersNameValidity: true});
         }else{
             this.setState({EmployersNameValidity: false});
         }
     }
     checkEmploymentValidity = () => {
         if(this.state.EmploymentStatus == null || this.state.EmploymentStatus == ""){
             this.setState({EmploymentValidity: true});
         }else{
             this.setState({EmploymentValidity: false});
         }
     }
 
     checkLocalGovValidity = () => {
         if(this.state.LocalGv == null || this.state.LocalGv == ""){
             this.setState({LocalGovValidity: true});
         }else{
             this.setState({LocalGovValidity: false});
         }
     }
     checkPlaceOfBirthValidity = () => {
         if(this.state.PlaceOfBirth == null || this.state.PlaceOfBirth == ""){
             this.setState({PlaceOfBirthValidity: true});
         }else{
             this.setState({PlaceOfBirthValidity: false});
         }
     } 
     checkNationalityValidity = () => {
         if(this.state.Nationality == null || this.state.Nationality == ""){
             this.setState({NationalityValidity: true});
         }else{
             this.setState({NationalityValidity: false});
         }
     }
     checkStateOfOriginValidity = () => {
         if(this.state.StateOfOrigin == null || this.state.StateOfOrigin == ""){
             this.setState({StateOfOriginValidity: true});
         }else{
             this.setState({StateOfOriginValidity: false});
         }
     }
     checkSurnameValidity = () => {
         if(this.state.SurName == null || this.state.SurName == ""){
             this.setState({SurnameValidity: true});
         }else{
             this.setState({SurnameValidity: false});
         }
     }
     checkFirstNameValidity = () => {
         if(this.state.FirstName == null || this.state.FirstName == ""){
             this.setState({FirstNameValidity: true});
         }else{
             this.setState({FirstNameValidity: false});
         }
     }
     checkGenderValidity = () => {
         if(this.state.Gender == null || this.state.Gender == ""){
             this.setState({GenderValidity: true});
         }else{
             this.setState({GenderValidity: false});
         }
     }
     checkDateOfBirthValidity = () => {
         if(this.state.birthDate == null || this.state.birthDate == ""){
             this.setState({DateOfBirthValidity: true});
         }else{
             this.setState({DateOfBirthValidity: false});
         }
     }
     checkOtherNameValidity = () => {
         if(this.state.OtherName == null || this.state.OtherName == ""){
             this.setState({OtherNameValidity: true});
         }else{
             this.setState({OtherNameValidity: false});
         }
     }
     checkMothersMaidenNameValidity = () => {
         if(this.state.mothersMaidenName == null || this.state.mothersMaidenName == ""){
             this.setState({MothersMaidenNameValidity: true});
         }else{
             this.setState({MothersMaidenNameValidity: false});
         }
     }
 
     checkApartmentValidity = () => {
         if(this.state.apartment == null || this.state.apartment == ""){
             this.setState({apartmentValidity: true});
         }else{
             this.setState({apartmentValidity: false});
         }
     }
 
     checkHouseNumberValidity = () => {
         if(this.state.houseNumber == null || this.state.houseNumber == ""){
             this.setState({houseNumberValidity: true});
         }else{
             this.setState({houseNumberValidity: false});
         }
     }
 
     checkStreetValidity = () => {
         if(this.state.street == null || this.state.street == ""){
             this.setState({streetValidity: true});
         }else{
             this.setState({streetValidity: false});
         }
     }
 
     checkBusstopValidity = () => {
         if(this.state.busStop == null || this.state.busStop == ""){
             this.setState({busstopValidity: true});
         }else{
             this.setState({busstopValidity: false});
         }
     }
 
     checkPersonalAddressValidity = () => {
         if(this.state.personalAddress == null || this.state.personalAddress == ""){
             this.setState({personalAddressValidity: true});
         }else{
             this.setState({personalAddressValidity: false});
         }
     }
 
     checkApartmentValidity2 = () => {
         if(this.state.apartment2 == null || this.state.apartment2 == ""){
             this.setState({apartmentValidity2: true});
         }else{
             this.setState({apartmentValidity2: false});
         }
     }
 
     checkHouseNumberValidity2 = () => {
         if(this.state.houseNumber2 == null || this.state.houseNumber2 == ""){
             this.setState({houseNumberValidity2: true});
         }else{
             this.setState({houseNumberValidity2: false});
         }
     }
     
     checkStreetValidity2 = () => {
         if(this.state.street2 == null || this.state.street2 == ""){
             this.setState({streetValidity2: true});
         }else{
             this.setState({streetValidity2: false});
         }
     }
 
     checkBusstopValidity2 = () => {
         if(this.state.busStop2 == null || this.state.busStop2 == ""){
             this.setState({busstopValidity2: true});
         }else{
             this.setState({busstopValidity2: false});
         }
     }
 
     checkYourAddressValidity = () => {
         if(this.state.address == null || this.state.address == ""){
             this.setState({yourAddressValidity: true});
         }else{
             this.setState({yourAddressValidity: false});
         }
     }

     checkPersonalAddressValidity2 = () => {
        if(this.state.personalAddress2 == null || this.state.personalAddress2 == ""){
            this.setState({personalAddressValidity2: true});
        }else{
            this.setState({personalAddressValidity2: false});
        }
    }

    checkStreetCompoundValidity = () => {
        if(this.state.street == null || this.state.street == ""){
            this.setState({streetCompoundValidity: true});
        }else{
            this.setState({streetCompoundValidity: false});
        }
    }

    HandleCheckBoxInput = (event) => {
        console.log(event.target.value);
        this.setState({isAddressSame: event.target.value});
    }

 
    NavigateToSuccessPage = () => {
        history.push('/profile-success-message');
    }
    
   render(){
    const { birthDate, PinValidity, streetCompoundValidity, yourAddressValidity, sameAddressAsAbove, SurnameValidity, relationshipValidity, TitleValidity, phoneNumberValidity, LocalGovValidity, PlaceOfBirthValidity, NationalityValidity, StateOfOriginValidity,
        EmailAddressValidity, streetValidity, GenderValidity, busstopValidity, DateOfBirthValidity, FirstNameValidity, OtherNameValidity
        } = this.state;
       
       return(
        <Fragment>
             <InnerContainer>
                    <div className="dashboard-wrapper">
                         <div className="container">
                                <div className="coverPropertiesofComponent">
                                    <div className="col-sm-12">
                                        <p className="page-title">Account Setting</p>
                                    </div>

                                    <div className="col-sm-12">
                                        <div>
                                            <div className="sub-tab-nav" style={{marginBottom: 10}}>
                                                <ul>
                                                    <li><NavLink to={'/default-page'} className="active">Profile</NavLink></li>
                                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                
                                <div className="row packageContent">
                                    <div className="col-sm-4">
                                        <div className="forProfilePicture">
                                                <div className="profilePixCircle">

                                                </div>
                                                <p className="personsName">Laketu Adeleke</p>
                                                <p className="details">subrigana@gmail.com</p>
                                                <p className="details">Last Login: 8th January 2019, 11:00am</p>
                                                <hr />

                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Link BVN</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Personal Information</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Contact Details</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Document Upload</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Next of Kin</p>
                                                </div>
                                        </div>
                                        
                                    </div>
                                    <div className="col-sm-7">
                                    <form onSubmit={this.HandleSubmit} className="parentForm">
                                            <p className="formHeading">Next Of Kin</p>
                                        
                                            <div className="form-row">
                                                        <div className={TitleValidity ? "form-group form-error col-md-5" : "form-group col-md-5"}>
                                                            <label className="label-text">Title</label>
                                                            <select onChange={this.SetInputValue} name="title" placeholder="title">
                                                                <option value="Mr">Mr</option>
                                                                <option value="Mrs">Mrs</option>
                                                                <option value="Dr">Dr</option>
                                                                <option value="Prof">Prof</option>
                                                                <option value="master">Master</option>
                                                            </select>
                                                        </div>

                                                        <div className={relationshipValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">Relationship</label>
                                                            <select onChange={this.SetInputValue} name="relationship" placeholder="marital status">
                                                                <option value="Sister">Sister</option>
                                                                <option value="Brother">Brother</option>
                                                            </select>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={SurnameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Surname</label>
                                                            <input type="text" name="SurName" className="form-control" onChange={this.SetInputValue} placeholder="Surname"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={FirstNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">First Name</label>
                                                            <input type="text" name="FirstName" className="form-control" onChange={this.SetInputValue} placeholder="First Name"/>
                                                        </div>
                                            </div>
                                            
                                            
                                            <div className="form-row">
                                                        <div className={OtherNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Other Name</label>
                                                            <input type="text" name="OtherName" className="form-control" onChange={this.SetInputValue} placeholder="Other Name"/>
                                                        </div>
                                            </div>
                   
                                            <div className="form-row">
                                                        <div className={phoneNumberValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Phone Number</label>
                                                            <input type="number" name="phoneNumber" className="form-control" onChange={this.SetInputValue} placeholder="Telephone"/>
                                                        </div>
                                            </div>       

                                            <div className="form-row">
                                                        <div className={EmailAddressValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Email</label>
                                                            <input type="email" name="EmailAddress" className="form-control" onChange={this.SetInputValue} placeholder="Email"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label className="label-text">Next of Kin BVN (Optional)</label>
                                                            <input type="number" name="nextOfKinBVN" className="form-control" onChange={this.SetInputValue} placeholder="BVN"/>
                                                        </div>
                                            </div>
                                           
                                            <div className="form-row">
                                                        <div className={GenderValidity ? "form-group form-error col-md-5" : "form-group col-md-5"}>
                                                            <label className="label-text">Gender</label>
                                                            <select onChange={this.SetInputValue} name="Gender" placeholder="Gender">
                                                                <option value=""> </option>
                                                                <option value="Male"> Male </option>
                                                                <option value="Female"> Female</option>
                                                            </select>
                                                        </div>

                                                        <div className={DateOfBirthValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">Date of Birth</label>
                                                                <DatePicker className="form-control" selected={birthDate} 
                                                                placeholder="June 31, 2019"
                                                                dateFormat=" MMMM d, yyyy"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                onChange={this.SetBirthDay}
                                                                dropdownMode="select"
                                                                // minDate={new Date()}
                                                                />
                                                        </div> 
                                            </div>

                                            <div className="form-row">
                                                        <div className={NationalityValidity ? "form-group form-error col-md-5" : "form-group col-md-5"}>
                                                            <label className="label-text">Nationality</label>
                                                            <input type="text" name="Nationality" className="form-control" onChange={this.SetInputValue} placeholder="Nationality"/>
                                                        </div>
                                              
                                                        <div className={StateOfOriginValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">State of Origin</label>
                                                            <input type="text" name="StateOfOrigin" className="form-control" onChange={this.SetInputValue} placeholder="state of origin"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={LocalGovValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Local Government</label>
                                                            <input type="text" name="LocalGv" className="form-control" onChange={this.SetInputValue} placeholder="Local Government"/>
                                                        </div>
                                            </div>
                                            
                                            <div className="form-row">
                                                   <div className="form-group col-md-12">
                                                      <p>Full Address</p>
                                                   </div>
                                            </div>

                                            <div className="form-row">
                                                   <div className="form-group col-md-9">
                                                         <p>Same as mine</p>
                                                   </div>
                                                   <div className="form-group col-md-3">
                                                      <div class="custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input" id="customSwitch1" />
                                                            <label class="custom-control-label" for="customSwitch1"></label>
                                                      </div>
                                                   </div>
                                            </div>
                                            
                                            <div className={yourAddressValidity + " " + "form-row"}>
                                                        <div className={streetValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text"> Address </label>
                                                            <input type="text" name="address" className="form-control" onChange={this.SetInputValue} placeholder="Address"/>
                                                        </div>
                                            </div>

                                            <div className={"form-row"}>
                                                        <div className={streetCompoundValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Streat / Compound Name</label>
                                                            <input type="text" name="street" className="form-control" onChange={this.SetInputValue} placeholder="Streat / Compound Name"/>
                                                        </div>
                                            </div>

                                            <div className={"form-row"}>
                                                        <div className={busstopValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Nearest Bustop</label>
                                                            <input type="text" name="busStop" className="form-control" onChange={this.SetInputValue} placeholder="Nearest Bus - stop"/>
                                                        </div>
                                            </div>
                                                   
                                            <div className="form-row">
                                                        <div className={PinValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Alat Pin</label>
                                                            <input type="number" name="AlatPin" className="form-control" onChange={this.SetInputValue} placeholder="Alat Pin"/>
                                                        </div>
                                            </div>

                                           
                                            <button type="submit" className="twoBut">Submit</button>
                                        </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                 </InnerContainer>
        </Fragment>
       )
   }
}

const mapStateToProps = (state) => {
    return {
        nextOfKinsRelationship: state.nextOfKinsRelationship.data
    }
}

export default connect(mapStateToProps)(NextOfKin);