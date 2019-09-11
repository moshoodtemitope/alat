import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import {history} from '../../_helpers/history';
import {profile} from '../../redux/constants/profile/profile-constants';
import { connect } from 'react-redux';
import { getContactDetails } from "../../redux/actions/profile/profile-action";
import moment from 'moment';


var allStatesInfo = null;
var allCityData = null;
var localGov2 = null;
var localGov1 = null;
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
        StateOfOrigin2: null,
        Nationality: null,
        Nationality2: null,
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
        NationalityValidity2: false,
        OtherNameValidity: false, 
        MothersMaidenNameValidity: false,
        DateOfBirthValidity: false,
        StateOfOriginValidity: false, 
        StateOfOriginValidity2: false,
        GenderValidity: false, 
        SurnameValidity: false, 
        FirstNameValidity: false, 
        SectorValidity: false,
        phoneNumberValidity: false,
        EmailAddressValidity: false,
        LocalGovValidity: false, 
        LocalGovValidity2: false,
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

        sameAddressAsAbove: "sameAddressAsAbove",
        isAddressSame: 'on',
        checkBoxStatus: true,
        cityStores: null,
        localGvId: null,
        localGvId2: null,
        stateGvId2: null,
        stateGvId: null,

        isBvNLinked: false,
        isProfileInformation: false,
        isContactDetails: false,
        isDocument: false,
        navToNextOfKin: false
       }

       this.fetchContactDetails();
   }

   componentDidMount = () => {
       this.CheckIfStoreInformationIsSet();
   }

CheckIfStoreInformationIsSet = () => {
    
 if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_SUCCESS){
  //    console.log(this.props.profileMenu.response.personalInfoComplete);
     this.setState({isProfileInformation: this.props.profileMenu.data.response.personalInfoComplete});
     this.setState({isContactDetails: this.props.profileMenu.data.response.contactDetailsComplete});
     this.setState({isDocument: this.props.profileMenu.data.response.documentUploaded});
     this.setState({navToNextOfKin: this.props.profileMenu.data.response.nextOfKinComplete});
     this.setState({isBvNLinked: this.props.profileMenu.data.response.bvnLinked});
 }
}

   fetchContactDetails(){
        const { dispatch } = this.props;
        dispatch(getContactDetails(this.state.user.token));
   };

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

   sameMailingAddress = () => {
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

                    case 'alternatePhoneNumber': 
                            if(this.state[x] == null || this.state[x] == ""){
                                console.log(x)
                                result = null;
                                break;
                            }

                    case 'alternateEmail' :
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
                }
            }
            console.log(result);
            return result;
   }

   NotSameAddress = () => {
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
                    case 'alternatePhoneNumber': 
                            if(this.state[x] == null || this.state[x] == ""){
                                console.log(x)
                                result = null;
                                break;
                            }
                    case 'alternateEmail' :
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

                    case 'StateOfOrigin2': 
                            if(this.state[x] == null || this.state[x] == ""){
                                console.log(x);
                                result == null;
                                break;
                            }
                
                    case 'Nationality2':
                            if(this.state[x] == null || this.state[x] == ""){
                                console.log(x)
                                result = null;
                                break;
                            }
                    case 'LocalGv2':
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
                    // case 'street2':
                    //         if(this.state[x] == null || this.state[x] == ""){
                    //             console.log(x)
                    //             result = null;
                    //             break;
                    //         }
                }
            }
            
            console.log(result);
            return result;
   }

   checkValidity = () => {
       const checkStatus = this.state.checkBoxStatus;

       switch(checkStatus){
          case true:
            return this.sameMailingAddress();
             break;
          case false: 
            return this.NotSameAddress();
       }
   }

   InitiateNetworkCall = () => {
      let data = null;
      console.log(this.state.checkBoxStatus);
      switch(this.state.checkBoxStatus){
          case true:
                data = {
                    mailingAddress: this.state.personalAddress,  
                    email: this.state.EmailAddress, 
                    alternateEmail: this.state.alternateEmail,
                    phoneNumber: parseInt(this.state.phoneNumber),
                    alternatePhoneNumber: parseInt(this.state.alternatePhoneNumber),
                    country: "Nigeria", 
                    mailingCountry: 'Nigeria',
                    mailingStateId: parseInt(this.state.stateGvId),
                    mailingCityId: parseInt(this.state.localGvId),
                    pin: parseInt(this.state.AlatPin),
                    residentialAddress: {
                        street: this.state.street,
                        town: parseInt(this.state.localGvId),
                        landmark: this.state.busStop,
                        buildingNo: parseInt(this.state.houseNumber),
                        apartment: this.state.apartment,
                        stateId: parseInt(this.state.stateGvId), 
                        lgaId: parseInt(this.state.localGvId),
                        // lcdaId: 8,
                        isReactivation: false,
                        address: this.state.personalAddress
                    }
                }

                break;
                case false: 
                    data = {
                        mailingAddress: this.state.personalAddress,       
                        email: this.state.EmailAddress, 
                        alternateEmail: this.state.alternateEmail,
                        phoneNumber: parseInt(this.state.phoneNumber),
                        alternatePhoneNumber: parseInt(this.state.alternatePhoneNumber),
                        country: 'Nigeria', 
                        mailingCountry: 'Nigeria',
                        mailingStateId: parseInt(this.state.stateGvId2),
                        mailingCityId: parseInt(this.state.localGvId2),
                        pin: parseInt(this.state.AlatPin),
                        residentialAddress: {
                            street: this.state.street,
                            town: parseInt(this.state.localGvId),
                            landmark: this.state.busStop,
                            buildingNo: parseInt(this.state.houseNumber),
                            apartment: this.state.apartment, 
                            stateId: parseInt(this.state.stateGvId), 
                            lgaId: parseInt(this.state.localGvId),
                            // lcdaId: 8,
                            isReactivation: false,
                            address: this.state.personalAddress
                        }
            }
      }
      console.log(data);
    //   return;
      this.props.dispatch(actions.addContactDetails(this.state.user.token, data));
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
       this.checkLocalGovValidity2();
       this.checkPlaceOfBirthValidity();
    //    this.checkTitleValidity();
       this.checkNationalityValidity(); 
       this.checkNationalityValidity2();
       this.checkStateOfOriginValidity();
       this.checkStateOfOriginValidity2();
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
    //    this.InitiateNetworkCall();
    //    return;
    //    console.log('was fired');

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

    SetInputValue4 = (event) => {
        let name = event.target.name;
        this.setState({[name] : event.target.value});
        allCityData.map(element => {
            if(event.target.value == element.name)
                 this.setState({localGvId: element.cityId})
                 this.setState({stateGvId: element.stateId});
        });
    }

    SetInputValue5 = (event) => {
        let name = event.target.name;
        this.setState({[name] : event.target.value});
    }

    SetInputValue2 = (event) => {
       let name = event.target.name;
       console.log(event.target.value);
       
       this.setState({[name] : event.target.value});
       allCityData.map(element => {
           if(event.target.value == element.name){
                console.log(element.name);
                this.setState({localGvId2: element.cityId})
                this.setState({stateGvId2: element.stateId});
           }
       });
    }  

    SetInputValue3 = (event) => {
        let name = event.target.name;
        this.setState({[name] : event.target.value});
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

    checkLocalGovValidity2 = () => {
        if(this.state.LocalGv2 == null || this.state.LocalGv2 == ""){
            this.setState({LocalGovValidity2: true});
        }else{
            this.setState({LocalGovValidity2: false})
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

    checkNationalityValidity2 = () => {
        if(this.state.Nationality2 == null || this.state.Nationality == ""){
            this.setState({NationalityValidity2: true});
        }else{
            this.setState({NationalityValidity2: false});
        }
    }

    checkStateOfOriginValidity = () => {
        if(this.state.StateOfOrigin == null || this.state.StateOfOrigin == ""){
            this.setState({StateOfOriginValidity: true});
        }else{
            this.setState({StateOfOriginValidity: false});
        }
    }

    checkStateOfOriginValidity2 = () => {
        if(this.state.StateOfOrigin2 == null || this.StateOfOrigin2 == ""){
            this.setState({StateOfOriginValidity2: true});
        }else{
            this.setState({StateOfOriginValidity2: false});
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

   HandleCheckBoxInput = () => {
       this.setState({checkBoxStatus: !this.state.checkBoxStatus}, () => {
           if (this.state.checkBoxStatus) {
                  this.setState({sameAddressAsAbove: "sameAddressAsAbove"})  
           }
           else {
                  this.setState({sameAddressAsAbove: "notSameAddressAsAbove"})
           }  
       })
   }

   allStatesTrigger = () => {
       console.log('DEBUGGING CODE');
    //    console.log(allStatesInfo);
   }

   UseGottenStateInfo = () => { 
       let cityData = this.props.getContactDetail.data.response.cities;
       let stateData = this.props.getContactDetail.data.response.states;
 
       allStatesInfo = stateData;
       allCityData = cityData;

       console.log(stateData);
       console.log(cityData);
   }

   NavigateToBVN = () => {
    if(this.props.profileMenu.data.response.bvnLinked == true){
          this.DispatchSuccessMessage('BVN has Been Linked');
          return;
    }

    history.push('/profile/linkBVN');
}

NavigateToPersonalInfo = () => {
     if(this.props.profileMenu.data.response.personalInfoComplete == true){
         this.DispatchSuccessMessage('Personal Information Created');
         return;
     }

     history.push('/profile/profile-personalInfo');
}

NavigateToContact = () => {
     if(this.props.profileMenu.data.response.contactDetailsComplete == true){
             this.DispatchSuccessMessage('Contact Created Successfully');
             return;
     }

     history.push('/profile/profile-contact-detail');
}


NavigateToDocuments = () => {
     if(this.props.profileMenu.data.response.documentUploaded == true){
         this.DispatchSuccessMessage('Document uploaded successfully');
         return;
     }

     history.push('/profile/profile-documents');
}

NavigateToNextOfKin = () => {
     if(this.props.profileMenu.data.response.nextOfKinComplete == true){
         this.DispatchSuccessMessage('Next of kin has been Created');
         return
     }

    history.push('/profile/profile-next-of-kin');
}

DispatchSuccessMessage = (data) => {
    this.props.dispatch(actions.profileSuccessMessage(data));
}

GetUserProfileMenu = () => {
    this.props.dispatch(actions.profileMenu(this.state.user.token));
 }

   render(){
        const { PinValidity, AlternateEmailValidity, sameAddressAsAbove,SectorValidity, phoneNumberValidity, LocalGovValidity2, LocalGovValidity, PlaceOfBirthValidity, NationalityValidity2, NationalityValidity, StateOfOriginValidity,
        EmailAddressValidity, streetValidity, busstopValidity, apartmentValidity, personalAddressValidity, StateOfOriginValidity2,
        personalAddressValidity2, alternatePhoneNumberValidity, houseNumberValidity,   isBvNLinked, isProfileInformation, isContactDetails, isDocument, navToNextOfKin} = this.state;
        const {profileMenu, getContactDetail } = this.props;
        
        if(getContactDetail.message === profile.GET_CONTACT_DETAILS_PENDING){
            console.log('NOTHING EVER HAPPENED HERE')
        
         return(
             <Fragment>
                   {/* <InnerContainer> */}
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
                                 <li><NavLink to={'/profile'} >Profile</NavLink></li>
                                 <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                 <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                             </ul>
                         </div>
                     </div>
                 </div>
                 <p>loading data ...</p>
                 </div>
                 </div>
                 </div>
                 {/* </InnerContainer> */}
             </Fragment>      
         )
        }
 
        if(getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && profileMenu.message === profile.GET_PROFILE_MENU_SUCCESS){
            this.UseGottenStateInfo();
            return(
                <Fragment>
                    {/* <InnerContainer> */}
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
                                                            <li><NavLink to={'/profile'} >Profile</NavLink></li>
                                                            <li>Pin Management</li>
                                                            <li>Security Questions</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        <div className="row packageContent">
                                            <div className="col-sm-4">
                                                <div className="forProfilePicture">
                                                        <div className="profilePixCircle">

                                                        </div>
                                                        <p className="personsName">{this.props.profileMenu.data.response.fullName}</p>
                                                        <p className="details">{this.props.profileMenu.data.response.username}</p>
                                                        <p className="details">{moment(this.props.profileMenu.data.response.lastLoginDate).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                                        <hr />

                                                        <div className="tickItems" onClick={this.NavigateToBVN}>
                                                            {isBvNLinked === true ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
                                                            <p className="pSubs">Link BVN</p>
                                                        </div>
                                                        <div className="tickItems" onClick={this.NavigateToPersonalInfo}>
                                                            {isProfileInformation ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
                                                            <p className="pSubs">Personal Information</p>
                                                        </div>
                                                        <div className="tickItems" onClick={this.NavigateToContact}>
                                                            {isContactDetails ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
                                                            <p className="pSubs">Contact Details</p>
                                                        </div>
                                                        <div className="tickItems" onClick={this.NavigateToDocuments}>
                                                            {isDocument ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt=""  className="largeVectorI" />}
                                                            <p className="pSubs">Document Upload</p>
                                                        </div>
                                                        <div className="tickItems" onClick={this.NavigateToNextOfKin}>
                                                            {navToNextOfKin ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>} 
                                                            <p className="pSubs">Next of Kin</p>
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-7">
                                            <form onSubmit={this.HandleSubmit} className="parentForm">
                                                    <p className="formHeading">Contact Details</p>
                                                    <div className="form-row">
                                                            <div className={houseNumberValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                            <label className="label-text">House Number</label>
                                                                            <input type="number" name="houseNumber" className="form-control" onChange={this.SetInputValue} placeholder="1"/>
                                                                    
                                                            </div>

                                                            <div className={apartmentValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
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
                                                                <div className={NationalityValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Country</label>
                                                                    <input type="text" name="Nationality" className="form-control" onChange={this.SetInputValue} placeholder="Nationality"/>
                                                                </div>

                                                                <div className={StateOfOriginValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">State</label>
                                                                    <select name="StateOfOrigin" className="form-control" onChange={this.SetInputValue5}>
                                                                            <option>Select State of Origin</option>
                                                                            {                                      
                                                                                getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
                                                                                getContactDetail.data.response.states.map(state=> {
                                                                            
                                                                                    return <option  value={state}>
                                                                                    {state.name}</option>
                                                                                })
                                                                            }     
                                                                    </select>
                                                                </div>
                                                    </div>

                                                    <div className="form-row">
                                                                <div className={LocalGovValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Local Government</label>
                                                                    <select onChange={this.SetInputValue4} name="LocalGv" >
                                                                            <option>Select Local Government</option>
                                                                            {                                      
                                                                                getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
                                                                                getContactDetail.data.response.cities.map(city=> {
                                                                                    return <option  value={city.name}>
                                                                                    {city.name}</option>
                                                                                })
                                                                            } 
                                                                    </select>
                                                                </div>

                                                                <div className={"form-group col-md-6"}>
                                                                    <label className="label-text">City</label>
                                                                    <input type="text" name="PlaceOfBirth" className="form-control enter-city" onChange={this.SetInputValue} placeholder="City"/>
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
                                                                    <div class="custom-control custom-switch float-right">
                                                                            <input type="checkbox" checked={this.state.checkBoxStatus} class="custom-control-input" id="customSwitch1" 
                                                                                    onChange={ this.HandleCheckBoxInput }/>
                                                                            <label class="custom-control-label" for="customSwitch1"></label>
                                                                    </div>
                                                                </div>
                                                    </div>
                                                    
                        

                                                    <div className={sameAddressAsAbove + " " + "form-row"}>
                                                                <div className={personalAddressValidity2 ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Mailing Address</label>
                                                                    <input type="text" name="personalAddress2" className="form-control" onChange={this.SetInputValue} placeholder="Address"/>
                                                                </div>
                                                    </div>
                                                    
                                                    <div className={sameAddressAsAbove + " " + "form-row"}>
                                                                <div className={NationalityValidity2 ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Mailing Country</label>
                                                                    <input type="text" name="Nationality2" className="form-control" onChange={this.SetInputValue} placeholder="Country"/>
                                                                </div>
                                                    </div>

                                                    <div className={sameAddressAsAbove + " " + "form-row"}>
                                                                <div className={StateOfOriginValidity2 ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Mailing State</label>
                                                                    <select name="StateOfOrigin2" className="form-control state-mailing" onChange={this.SetInputValue3}>
                                                                            <option>Select State</option>
                                                                            {                                      
                                                                                getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
                                                                                getContactDetail.data.response.states.map(state=> {
                                                                                    return <option value={state}>
                                                                                    {state.name}</option>
                                                                                })
                                                                            }     
                                                                    </select>
                                                                </div>
                                                    </div>

                                                    <div className={sameAddressAsAbove + " " + "form-row"}>
                                                                <div className={LocalGovValidity2 ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Mailing Local Government</label>
                                                                    <select onChange={this.SetInputValue2} name="LocalGv2">
                                                                            <option>Select Local Government</option>
                                                                            {                                      
                                                                                getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
                                                                                getContactDetail.data.response.cities.map(city => {
                                                                                    return <option value={city.name}>
                                                                                    {city.name}</option>
                                                                                })
                                                                            } 
                                                                    </select>
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
                                                                    <label className="label-text">Alternate Phone Number</label>
                                                                    <input type="number" name="alternatePhoneNumber" className="form-control" onChange={this.SetInputValue} placeholder="Alternate Phone Number"/>
                                                                </div>
                                                    </div>
                                                    
                                                    <div className="form-row">
                                                                <div className={PinValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Alat Pin</label>
                                                                    <input type="number" name="AlatPin" className="form-control" onChange={this.SetInputValue} placeholder="Alat Pin"/>
                                                                </div>
                                                    </div>

                                                    <div className="align-button">
                                                        <button type="submit" className="twoBut no-border">Submit</button>
                                                    </div>

                                                    {/* <button type="submit" className="twoBut">Submit</button>    */}
                                                </form>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                        {/* </InnerContainer> */}
                </Fragment>         
            );
        }

        if(getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && profileMenu.message === profile.GET_PROFILE_MENU_PENDING){
            return(
                <Fragment>
                       
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
                                    <li><NavLink to={'/profile'} >Profile</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p>Loading data Contact Details...</p>
                    </div>
                    </div>
                    </div>
                 
                </Fragment>  
            );    
        }

        if(getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && profileMenu.message === profile.GET_PROFILE_MENU_FAILURE){
            return(
                <Fragment>
                       
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
                                    <li><NavLink to={'/profile'} >Profile</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p>Please Check Your Internet Connection...</p>
                    </div>
                    </div>
                    </div>
                 
                </Fragment>  
            );    
        }



        if(getContactDetail.message === profile.GET_CONTACT_DETAILS_FAILURE){
            return(
                <Fragment>
                       
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
                                    <li><NavLink to={'/profile'} >Profile</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p>Please Check Your Network ...</p>
                    </div>
                    </div>
                    </div>
                 
                </Fragment>  
            );    
        }


        if(getContactDetail.message === undefined){
            return(
                <Fragment>
                       
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
                                    <li><NavLink to={'/profile'} >Profile</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p>Loading data Contact Details...</p>
                    </div>
                    </div>
                    </div>
                 
                </Fragment>  
            );    
        }

        if(profileMenu.data == undefined){
            console.log('NOTHING EVER HAPPENED HERE')
            this.GetUserProfileMenu();
            return(
                <Fragment>
                        {/* <InnerContainer> */}
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
                                    <li><NavLink to={'/profile'} >Profile</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p>loading data ...</p>
                    </div>
                    </div>
                    </div>
                    {/* </InnerContainer> */}
                </Fragment>      
            )
        }

   }
}

const mapStateToProps = (state) => {
    return {
        profileMenu:state.profileMenu,
        getContactDetail:state.getContactDetail
    }
}

export default connect(mapStateToProps)(ContactDetails);










































