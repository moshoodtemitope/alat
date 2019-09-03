import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import {history} from '../../_helpers/history';


class ContactDetails extends Component {
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
        alternateEmail: null,
        alternatePhoneNumber: null,

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
        LocalGovValidity: false, 
        PlaceOfBirthValidity: false,
        PinValidity: false,
        OccupationValidity: false,
        TitleValidity: false,
        MaritalStatusValidity: false,
        houseNumberValidity: false,
        apartmentValidity: false,
        busstopValidity: false,
        streetValidity: false,
        personalAddressValidity: false,
        AlternateEmailValidity: false,
        alternatePhoneNumberValidity: false,
        personalAddressValidity2: false,
        streetValidity2: false,
        busstopValidity2: false,
        houseNumberValidity2: false,
        apartmentValidity2: false,

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
                case 'AlatPin':
                        if(this.state[x] == null || this.state[x] == ""){
                            console.log(x);
                            result = null;
                            break;
                        }
                case 'phoneNumber':
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
               
                case 'LocalGv':
                        if(this.state[x] == null || this.state[x] == ""){
                            console.log(x)
                            result = null;
                            break;
                        }
                case 'StateOfOrigin':
                        if(this.state[x] == null || this.state[x] == ""){
                            console.log(x);
                            result = null;
                            break;
                        }
                case 'Nationality':
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
        }

       console.log(result);
       return result;
   }

   InitiateNetworkCall = () => {
    //    let data = {
    //        bvn: this.state.bvnNumber,
    //        date: this.state.dateValue
    //    }

    let data =   {
        mailingAddress: this.state.personalAddress,
        email: this.state.EmailAddress,
        alternateEmail: this.state.alternateEmail,
        phoneNumber: this.state.phoneNumber,
        alternatePhoneNumber: this.state.alternatePhoneNumber,
        country: "sample string 6",
        mailingCountry: "sample string 7",
        mailingStateId: 8,
        mailingCityId: 9,
        pin: this.state.AlatPin,
        residentialAddress: {
          street: this.state.street,
          town: 2,
          landmark: this.state.busStop,
          buildingNo: this.state.houseNumber,
          apartment: this.state.apartment,
          stateId: 6, 
          lgaId: 7,
          lcdaId: 8,
          isReactivation: true,
          address: this.state.personalAddress
        }
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
      
       this.checkPinValidity(); 
       this.checkphoneNumberValidity();
       this.checkEmailAddressValidity(); 
       this.checkLocalGovValidity(); 
       this.checkPlaceOfBirthValidity();
    //    this.checkTitleValidity();
       this.checkNationalityValidity(); 
       this.checkStateOfOriginValidity();
       this.checkDateOfBirthValidity();
       this.checkApartmentValidity();
       this.checkHouseNumberValidity();
       this.checkPersonalAddressValidity();
       this.checkBusstopValidity();
       this.checkStreetValidity();
       this.checkAlternateEmailValidity();
       this.checkAlternatePhoneNumberValidity();
       this.checkStreetValidity2();
       this.checkBusstopValidity2(); 
       this.checkPersonalAddressValidity2();
       this.checkHouseNumberValidity2();
       this.checkApartmentValidity2();
       this.checkSectorValidity();
       console.log('code got here');

       return;
       console.log('was fired');

       switch(this.checkValidity()){
           case null:
             console.log('Empty value was found');
             break;
           case 'valid': 
             console.log("No Empty Value Found");
             this.InitiateNetworkCall();
             break;
       }
    }
   
    SetInputValue = (event) => {
        let name = event.target.name;
        this.setState({[name] : event.target.value});
        console.log("was just invoked");
    } 

    checkAlternatePhoneNumberValidity = () => {
       if(this.state.alternateEmail == null || this.state.alternateEmail == ""){
           this.setState({alternatePhoneNumberValidity: true});
       }else{
           this.setState({alternatePhoneNumberValidity: false});
       }
    }

    checkPinValidity = () => {
        if(this.state.AlatPin == null || this.state.AlatPin == ""){
            this.setState({PinValidity: true});
        }else{
            this.setState({PinValidity: false});
        }
    }

    checkAlternateEmailValidity = () => {
        if(this.state.alternateEmail == null || this.state.alternateEmail == ""){
             this.setState({AlternateEmailValidity: true});
        }else{
            this.setState({AlternateEmailValidity: false});
        }
    }

    
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

    checkSectorValidity = () => {
        if(this.state.Sector == null || this.state.Sector == ""){
            this.setState({SectorValidity: true});
        }else{
            this.setState({SectorValidity: false});
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
    
    checkDateOfBirthValidity = () => {
        if(this.state.birthDate == null || this.state.birthDate == ""){
            this.setState({DateOfBirthValidity: true});
        }else{
            this.setState({DateOfBirthValidity: false});
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
        console.log('was invoked  iiiiiiii');
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

    checkPersonalAddressValidity2 = () => {
        if(this.state.personalAddress2 == null || this.state.personalAddress2 == ""){
            this.setState({personalAddressValidity2: true});
        }else{
            this.setState({personalAddressValidity2: false});
        }
    }


   NavigateToSuccessPage = () => {
       history.push('/profile-success-message');
   }

   render(){
       const { PinValidity, AlternateEmailValidity, sameAddressAsAbove,SectorValidity, phoneNumberValidity, LocalGovValidity, PlaceOfBirthValidity, NationalityValidity, StateOfOriginValidity,
        EmailAddressValidity, streetValidity, streetValidity2, busstopValidity, busstopValidity2, apartmentValidity, apartmentValidity2, personalAddressValidity, 
        personalAddressValidity2, alternatePhoneNumberValidity, houseNumberValidity, houseNumberValidity2} = this.state;

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
                                                    <li><NavLink to={'/default-page'}>Pin Management</NavLink></li>
                                                    <li><NavLink to={'/default-page'}>Security Questions</NavLink></li>
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
                                            <p className="formHeading">Contact Details</p>
                                            <div className="form-row">
                                                    <div className={houseNumberValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">House Number</label>
                                                                    <input type="text" name="houseNumber" className="form-control" onChange={this.SetInputValue} placeholder="1"/>
                                                               
                                                    </div>

                                                    <div className={apartmentValidity ? "form-group form-error col-md-5" : "form-group col-md-5"}>
                                                                    <label className="label-text">Apartment</label>
                                                                    <input type="text" name="apartment" className="form-control" onChange={this.SetInputValue} placeholder=""/>
                                                    </div>
                                                
                                            </div>
                                            <div className="form-row">
                                                        <div className={streetValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Streat / Compound Name</label>
                                                            <input type="text" name="street" className="form-control" onChange={this.SetInputValue} placeholder=""/>
                                                        </div>
                                            </div>
                                            <div className="form-row">
                                                        <div className={busstopValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Nearest Bustop</label>
                                                            <input type="text" name="busStop" className="form-control" onChange={this.SetInputValue} placeholder=""/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={personalAddressValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Address</label>
                                                            <input type="text" name="personalAddress" className="form-control" onChange={this.SetInputValue} placeholder="Address"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={NationalityValidity ? "form-group form-error col-md-5" : "form-group col-md-5"}>
                                                            <label className="label-text">Country</label>
                                                            <input type="text" name="Nationality" className="form-control" onChange={this.SetInputValue} placeholder="Nationality"/>
                                                        </div>

                                                        <div className={StateOfOriginValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">State</label>
                                                            <input type="text" name="StateOfOrigin" className="form-control" onChange={this.SetInputValue} placeholder="state of origin"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={LocalGovValidity ? "form-group form-error col-md-5" : "form-group col-md-5"}>
                                                            <label className="label-text">Local Government</label>
                                                            <input type="text" name="LocalGv" className="form-control" onChange={this.SetInputValue} placeholder="Local Government"/>
                                                        </div>

                                                        <div className={PlaceOfBirthValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">City</label>
                                                            <input type="text" name="PlaceOfBirth" className="form-control" onChange={this.SetInputValue} placeholder="Place of Birth"/>
                                                        </div>
                                            </div>
                                            
                                            <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label className="label-text">Mailing Address</label>
                                    
                                                            
                                                        </div>
                                            </div>
                                            <div className="form-row">
                                                        <div className="form-group col-md-9">
                                                            <label className="label-text">Same as address above</label>
                                                        </div>
                                                        <div className="form-group col-md-3">                                 
                                                            
                                                        </div>
                                            </div>
                                            
                                            <div className={sameAddressAsAbove + " " + "form-row"}>
                                                    <div className={houseNumberValidity2 ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">House Number</label>
                                                                    <input type="text" name="houseNumber2" className="form-control" onChange={this.SetInputValue} placeholder="1"/>
                                                               
                                                    </div>

                                                    <div className={apartmentValidity2 ? "form-group form-error col-md-5" : "form-group col-md-5"}>
                                                                    <label className="label-text">Apartment</label>
                                                                    <input type="text" name="apartment2" className="form-control" onChange={this.SetInputValue} placeholder=""/>
                                                    </div>
                                                
                                            </div>
                                            <div className={sameAddressAsAbove + " " + "form-row"}>
                                                        <div className={streetValidity2 ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Streat / Compound Name</label>
                                                            <input type="text" name="street2" className="form-control" onChange={this.SetInputValue} placeholder=""/>
                                                        </div>
                                            </div>
                                            <div className={sameAddressAsAbove + " " + "form-row"}>
                                                        <div className={busstopValidity2 ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Nearest Bustop</label>
                                                            <input type="text" name="busStop2" className="form-control" onChange={this.SetInputValue} placeholder=""/>
                                                        </div>
                                            </div>

                                            <div className={sameAddressAsAbove + " " + "form-row"}>
                                                        <div className={personalAddressValidity2 ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Address</label>
                                                            <input type="text" name="personalAddress2" className="form-control" onChange={this.SetInputValue} placeholder="Address"/>
                                                        </div>
                                            </div>
                                            <div className="form-row">
                                                        <div className={EmailAddressValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Email Address</label>
                                                            <input type="email" name="EmailAddress" className="form-control" onChange={this.SetInputValue} placeholder="Email Address"/>
                                                        </div>
                                            </div>
                                            
                                            <div className="form-row">
                                                        <div className={AlternateEmailValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Alternate Email</label>
                                                            <input type="email" name="alternateEmail" className="form-control" onChange={this.SetInputValue} placeholder="Alternate Email"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={phoneNumberValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Phone Number</label>
                                                            <input type="number" name="phoneNumber" className="form-control" onChange={this.SetInputValue} placeholder="Phone Number"/>
                                                        </div>
                                            </div>
                                            <div className="form-row">
                                                        <div className={alternatePhoneNumberValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Phone Number</label>
                                                            <input type="number" name="alternatePhoneNumber" className="form-control" onChange={this.SetInputValue} placeholder="Alternate Phone Number"/>
                                                        </div>
                                            </div>
                                            
                                            <div className="form-row">
                                                        <div className={SectorValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Sector</label>
                                                            <input type="text" name="Sector" className="form-control" onChange={this.SetInputValue} placeholder="Sector"/>
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

export default ContactDetails;