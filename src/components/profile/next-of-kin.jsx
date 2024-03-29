import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import {history} from '../../_helpers/history';
import { ToggleButton }  from '../../shared/elements/_toggle';
import { getContactDetails,getResidentialDetails,nextOfKinsRelationship} from "../../redux/actions/profile/profile-action";
import {profile} from '../../redux/constants/profile/profile-constants';
import {connect} from 'react-redux';
import moment from 'moment';
import AlatPinInput from '../../shared/components/alatPinInput';
import { Switch } from '../../shared/elements/_toggle';
import CompletedprofileImage from '../../assets/img/selected.svg';
import NotCompletedprofileImage from '../../assets/img/unsuccessfull.svg'


var profileMenuStore = {}
var residentialAddress = null;
var theState = null;
var theCity = null;
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
         Nationality: "Nigeria",
         city: null, 
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
         cityValidity: false,
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
         
         sameAddressAsAbove: "sameAddressAsAbove",

         checkBoxStatus: true,

          isBvNLinked: false,
          isProfileInformation: false,
          isContactDetails: false,
          isDocument: false,
          isToNextOfKin: false,
          navToNextOfKin: false,
          isImageUploaded: false,
          Pin: "",
          isPinInvalid: false,
          residentialAddress: false
        }
        this.handleAlatPinChange=this.handleAlatPinChange.bind(this)
        this.fetchResidentialAddress();
        this.fetchContactDetails();
        this.GetUserProfileMenu();
        this.fetchNextOfKin();

        this.GetResidentialAddress();
    }

    GetResidentialAddress = () => {
        this.props.dispatch(actions.GetResidentialAddress(this.state.user.token));
    }
    

    componentDidMount = () => {
        this.CheckIfStoreInformationIsSet();
        this.setProfile();
       }
    
    setProfile = () => {
        let localStore = window.localStorage;
        setTimeout(() => {
            this.setState({
                isProfileInformation: JSON.parse(localStore.getItem('isProfileInformation')),
                isContactDetails: JSON.parse(localStore.getItem('isContactDetails')),
                isDocument: JSON.parse(localStore.getItem('isDocument')),
                isToNextOfKin: JSON.parse(localStore.getItem('navToNextOfKin')),
                isBvNLinked: JSON.parse(localStore.getItem('isBvNLinked')),
            }); 
        }, 20);
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
    

    fetchResidentialAddress = () => {
        const { dispatch } = this.props;
        dispatch(actions.getResidentialDetails(this.state.user.token));
    }

    fetchContactDetails(){
        const { dispatch } = this.props;
        dispatch(actions.getContactDetails(this.state.user.token));
    };
    fetchNextOfKin(){
        const {dispatch}=this.props;
        dispatch(actions.nextOfKinsRelationship(this.state.user.token))
    }
 
    SetBVNValidityStatus = () => {
    //    console.log();
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
                            //  console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'birthDate':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'Occupation':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'Pin':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'Sector':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'phoneNumber':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                case 'relationship':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'SurName':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'EmailAddress':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'FirstName':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'OtherName':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'EmployerName':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                  
                 case 'EmploymentStatus':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'Gender':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'mothersMaidenName':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'LocalGv':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'StateOfOrigin':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'Nationality':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'city':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'maritalStatus':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'title':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'houseNumber':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'apartment': 
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 
                 case 'personalAddress':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'street':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'address':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'busStop': 
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
             }
 
            //  console.log(result)
             return result;
         }
 
        // console.log(result);
        return result;
    }

    checkValidity2 = () => {
        let result = 'valid';
        for(let x in this.state){
             switch(x){
                 case 'bvnNumber':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'birthDate':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }

                 case 'Pin':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'phoneNumber':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }

                case 'relationship':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }

                 case 'SurName':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }

                 case 'EmailAddress':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }

                 case 'FirstName':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
 
                 case 'OtherName':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }

                 case 'Gender':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
            
                 case 'title':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
             
             }

            //  console.log(result)
             return result;
         }
 
        // console.log(result);
        return result;
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
        history.push('/profile/profile-success-message');
    }
 
    HandleSubmit = (event) => {
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
 

        // console.log('code got here');
        // const checkStatus = this.state.checkBoxStatus;
        // return; 
        // console.log('was fired');
        // this.InitiateNetworkCall();
        // return;

        const checkStatus = this.state.checkBoxStatus;
        
        switch(checkStatus){
            case true:
               this.sameMailingAddress();
               break;
            case false:
               this.NotSameAddress();
        }
    }

    NotSameAddress = () => {
        switch(this.checkValidity2()){
            case 'valid':
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
                    isAddressSame: false,
                    pin: this.state.Pin,
                    address: this.state.address
                }
          
                // console.log(data);
                // return;
                this.props.dispatch(actions.addNextOfKin(this.state.user.token, data));
                break;
            case null:
                // console.log('Network was not called');
        }
    }

    sameMailingAddress = () => {
        switch(this.checkValidity()){
            case 'valid':
                let data = {
                    Gender: this.state.Gender,
                    dateOfBirth: this.state.birthDate,
                    title: this.state.title,
                    relationship: this.state.relationship,
                    firstName: this.state.FirstName,
                    surname: this.state.SurName,
                    otherNames: this.state.OtherName,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.EmailAddress,
                    bvNumber: this.state.nextOfKinBVN,
                    streetAddress: residentialAddress.street,
                    landMark: residentialAddress.landmark,
                    country: 'Nigeria',
                    state: theState,
                    town: theCity,
                    isAddressSame: true,
                    pin: this.state.Pin,
                    address: residentialAddress.address
                }

                // console.log(data);
                // return;
                this.props.dispatch(actions.addNextOfKin(this.state.user.token, data));
                break;
            case null:
                // console.log('network was not called');
        }
    }
    
    SetInputValue = (event) => {
        let name = event.target.name;
        this.setState({[name] : event.target.value});
        // console.log("  was just invoked");
    } 
    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }

    checkTitleValidity = () => {
         if(this.state.title == null || this.state.title == ""){
             this.setState({TitleValidity: true});
         }else{
             this.setState({TitleValidity: false});
         }
    }
 
     checkrelationshipValidity = () => {
         if(this.state.relationship == null || this.state.relationship == "" || this.state.relationship == "Select Relationship"){
             this.setState({relationshipValidity: true});
         }else{
             this.setState({relationshipValidity: false});
         }
     }
 
     checkPinValidity = () => {
         if(this.state.Pin == null || this.state.Pin == ""){
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

     checkCityValidity = () => {
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
 
    NavigateToSuccessPage = () => {
        history.push('/profile/profile-success-message');
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
    
    NavigateResidentialAddress = () => {
        if(this.props.GetResidentialAddress.message === profile.GET_RESIDENTIAL_ADDRESS_SUCCESS){
            this.DispatchSuccessMessage('Residential Address has been Created');
            return
        }

        history.push('/profile/profile-residential-address');
    }
 
    DispatchSuccessMessage = (data) => {
        this.props.dispatch(actions.profileSuccessMessage(data));
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
 

    GetUserProfileMenu = () => {
        this.props.dispatch(actions.profileMenu(this.state.user.token));
    }

    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }

    StoreResidentialDetails = () => {
        residentialAddress = this.props.getResidential.data.response.residentialAddress;
        // console.log(residentialAddress);
        // console.log('Residential Address');
    }

    StoreLocationInformation = () => {
        let states = this.props.getContactDetail.data.response.states;
        states.map(element => {
            if(element.cityId == residentialAddress.stateId)
                   theState = element.name;
        });

        let cities = this.props.getContactDetail.data.response.cities;
        cities.map(element => {
            // console.log(element.cityId);
            if(element.cityId == residentialAddress.town)
                 theCity = element.name;
        });
    }

    StoreInforMation = () => {
        // console.log('INFO SOMETHING WAS FIRED LET SEE WHATS IT IS');
        profileMenuStore = this.props.profileMenu.data.response;
     
        let localStore = window.localStorage;
        localStore.setItem('isProfileInformation', this.props.profileMenu.data.response.personalInfoComplete);
        localStore.setItem('isContactDetails', this.props.profileMenu.data.response.contactDetailsComplete);
        localStore.setItem('isDocument', this.props.profileMenu.data.response.documentUploaded);
        localStore.setItem('navToNextOfKin', this.props.profileMenu.data.response.nextOfKinComplete);
        localStore.setItem('isBvNLinked', this.props.profileMenu.data.response.bvnLinked);
    }

    ChangeResidentialStatus = () => {
        setTimeout(() => {
            this.setState({residentialAddress: true});
        }, 1000)
    }
    
   render(){
    const {residentialAddress, isImageUploaded, isBvNLinked, isProfileInformation, isContactDetails, isToNextOfKin, isDocument, navToNextOfKin, birthDate, PinValidity, streetCompoundValidity, yourAddressValidity, sameAddressAsAbove, SurnameValidity, relationshipValidity, TitleValidity, phoneNumberValidity, LocalGovValidity, NationalityValidity, StateOfOriginValidity,
        EmailAddressValidity, cityValidity, streetValidity, GenderValidity, busstopValidity, DateOfBirthValidity, FirstNameValidity, OtherNameValidity
        } = this.state;
 
        const {GetResidentialAddress, profileMenu, getContactDetail, nextOfKinsRelationship,getResidential} = this.props;
        
        if(GetResidentialAddress.message === profile.GET_RESIDENTIAL_ADDRESS_SUCCESS)
             this.ChangeResidentialStatus();

        if(getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS 
            && getResidential.message === profile.GET_RESIDENTIAL_SUCCESS){
            this.StoreLocationInformation();
        }

        if(getResidential.message === profile.GET_RESIDENTIAL_SUCCESS){
             this.StoreResidentialDetails();
        }

        if(profileMenu.message === profile.GET_PROFILE_MENU_PENDING){
            return(
                <Fragment>
                      {/* <InnerContainer> */}
                           <div className="">
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
                                 
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p className="loading-info">Loading Profile Information...</p>
                    </div>
                    </div>
                    </div>
                    {/* </InnerContainer> */}
                </Fragment>      
            )
        }

        if(profileMenu.message === profile.GET_PROFILE_MENU_SUCCESS){
            return(
                <Fragment>
                            <div className="">
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
                                                           
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        <div className="row packageContent">
                                            <div className="col-sm-4">
                                                <div className="forProfilePicture">
                                                {isImageUploaded ? <div className="profilePixCircle" style={{backgroundImage: 'url("'+this.props.profileMenu.data.response.imagePath+'")'}}></div>
                                                        : <div className="profilePixCircle"></div> }
                                                        <p className="personsName">{this.props.profileMenu.data.response.fullName}</p>
                                                        <p className="details">{this.props.profileMenu.data.response.username}</p>
                                                        <p className="details">{moment(this.props.profileMenu.data.response.lastLoginDate).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                                        <hr />
        
                                                    <div className="tickItems" onClick={this.NavigateToBVN}>
                                                        {isBvNLinked ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage} alt="" className="largeVectorI"/>}
                                                        <p className="pSubs">Link BVN</p>
                                                    </div>
                                                    
                                                    <div className="tickItems" onClick={this.NavigateToPersonalInfo}>
                                                        {isProfileInformation ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage} alt="" className="largeVectorI"/>}
                                                        <p className="pSubs">Personal Information</p>
                                                    </div>
                                                    <div className="tickItems" onClick={this.NavigateToContact}>
                                                        {isContactDetails ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage}  alt="" className="largeVectorI"/>}
                                                        <p className="pSubs">Contact Details</p>
                                                    </div>
                                                    <div className="tickItems" onClick={this.NavigateToDocuments}>
                                                        {isDocument ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage} alt=""  className="largeVectorI" />}
                                                        <p className="pSubs">Document Upload</p>
                                                    </div>
                                                    <div className="tickItems" onClick={this.NavigateToNextOfKin}>
                                                        {/* {typeof isToNextOfKin} */}
                                                        {isToNextOfKin ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage} alt="" className="largeVectorI"/>} 
                                                        <p className="pSubs">Next of Kin</p>
                                                    </div>
                                                    <div className="tickItems" onClick={this.NavigateResidentialAddress}>
                                                        {residentialAddress ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage} alt="" className="largeVectorI"/>} 
                                                        <p className="pSubs">Residential Address</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="col-sm-7">
                                            <form onSubmit={this.HandleSubmit} className="parentForm">
                                                    <p className="formHeading">Next Of Kin</p>
                                                
                                                    <div className="form-row">
                                                                <div className={TitleValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Title</label>
                                                                    <select onChange={this.SetInputValue} name="title" placeholder="title" className="input-border-radius height-39">
                                                                        <option value="Mr">Mr</option>
                                                                        <option value="Mrs">Mrs</option>
                                                                        <option value="Dr">Dr</option>
                                                                        <option value="Prof">Prof</option>
                                                                        <option value="master">Master</option>
                                                                    </select>
                                                                </div>
        
                                                                <div className={relationshipValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Relationship</label>
                                                                    <select onChange={this.SetInputValue} name="relationship" className="input-border-radius height-39" placeholder="marital status">
                                                                    <option  value="Select Relationship">Select Relationship</option>
                                                                    {
                                                                        nextOfKinsRelationship.message === profile.GET_NEXT_OF_KIN_RELATIONSHIP_SUCCESS && 
                                                                        nextOfKinsRelationship.data.response.map(relationship=> {
                                                                    
                                                                            return <option value={relationship}>{relationship}</option>
                                                                        })

                                                                    }
                                                                    
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
                                                                <div className={GenderValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Gender</label>
                                                                    <select className="select-gender input-border-radius" onChange={this.SetInputValue} name="Gender" placeholder="Gender">
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
                                                           <div className="form-group col-md-12">
                                                              <div>Next of Kin Full Address</div>
                                                           </div>
                                                    </div>

                                                    <div className="form-row space-between">
                                                           <div className="form-group col-md-6">
                                                                <p className="text-size-14">Same As Mine</p>
                                                           </div>

                                                           <div class="custom-control custom-switch float-right">
                                                                 <Switch isChecked={this.state.checkBoxStatus} handleToggle={this.HandleCheckBoxInput} />  
                                                           </div>
                                                    </div>
                                                    
                                                    
                                                    <div className={sameAddressAsAbove + " " + "form-row"}>
                                                                <div className={streetValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text"> Address </label>
                                                                    <input type="text" name="address" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Address" />
                                                                </div>
                                                    </div>
                                         
                                                    <div className={sameAddressAsAbove + " " + "form-row"}>
                                                                <div className={streetCompoundValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Street / Compound Name</label>
                                                                    <input type="text" name="street" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Streat / Compound Name" />
                                                                </div>
                                                    </div>
        
                                                    <div className={sameAddressAsAbove + " " + "form-row"}>
                                                                <div className={busstopValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Nearest Bustop</label>
                                                                    <input type="text" name="busStop" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Nearest Bus - stop"/>
                                                                </div>
                                                    </div>
        
        
                                                    <div className={sameAddressAsAbove + " " + "form-row"}>
                                                                <div className={NationalityValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Nationality</label>
                                                                    <select name="Nationality" value="Nigeria" className="form-control input-border-radius" onChange={this.SetInputValue}>
                                                                         <option value="Nigeria">Nigeria</option>
                                                                    </select>

                                                                    {/* <input type="text" name="Nationality" className="form-control" value="Nigeria" readOnly onChange={this.SetInputValue} placeholder="Nationality"/> */}
                                                                </div>
                                                      
                                                                <div className={StateOfOriginValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">State of Origin</label>
                                                                    <select name="StateOfOrigin"  className="form-control input-border-radius" onChange={this.SetInputValue}>
                                                                            <option>Select State of Origin</option>
                                                                            {                                      
                                                                                getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
                                                                                getContactDetail.data.response.states.map(state => {
                                                                            
                                                                                    return <option value={state.name}>
                                                                                    {state.name}</option>
                                                                                })
                                                                            }     
                                                                    </select>
                                                                   
                                                                </div>
                                                    </div>
                        
                                                    <div className={sameAddressAsAbove + " " + "form-row"}>
                                                                <div className={LocalGovValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Local Government</label>
                                                                    <select name="LocalGv" className="form-control input-border-radius" onChange={this.SetInputValue} >
                                                                            <option>Select Local Government</option>
                                                                            {                                      
                                                                                getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
                                                                                getContactDetail.data.response.cities.map(city=> {
                                                                                    
                                                                                    return <option value={city.name}>
                                                                                    {city.name}</option>
                                                                                })
                                                                            } 
                                                                    </select>
                                                                </div>
                                                    </div>
        
                                                    
                                                           
                                                    <div className="form-row">
                                                                <div className={PinValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    {/* <label className="label-text">Alat Pin</label> */}
                                                                    <AlatPinInput
                                                                    value={this.state.Pin}
                                                                    onChange={this.handleAlatPinChange}
                                                                    PinInvalid={this.state.isPinInvalid}
                                                                    maxLength={4} />
                                                                    {/* <input type="number" name="AlatPin" className="form-control" onChange={this.SetInputValue} placeholder="Alat Pin"/> */}
                                                                </div>
                                                    </div>
                                                    <div className="align-button">
                                                        <button type="submit" className="twoBut no-border">Submit</button>
                                                    </div>
                                                   
                                                    {/* <button type="submit" className="twoBut">Submit</button> */}
                                                </form>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                         {/* </InnerContainer> */}
                </Fragment>
               )
        }

        if(profileMenu.message === profile.GET_PROFILE_MENU_FAILURE){
            this.GetUserProfileMenu();
            return(
                <Fragment>
                      {/* <InnerContainer> */}
                           <div className="">
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
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p className="loading-info">Please Check Your Internet Connection ...</p>
                    </div>
                    </div>
                    </div>
                    {/* </InnerContainer> */}
                </Fragment>      
            );
        }

        if(profileMenu.data == undefined){
            this.GetUserProfileMenu();
            return(
                <Fragment>
                      {/* <InnerContainer> */}
                           <div className="">
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
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p className="loading-info">Loading Profile Information...</p>
                    </div>
                    </div>
                    </div>
                    {/* </InnerContainer> */}
                </Fragment>      
            )
        }

        if(profileMenu.data != undefined && profileMenu.data.response != undefined){
            return(
                <Fragment>
                     {/* <InnerContainer> */}
                            <div className="">
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
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {this.props.alert && this.props.alert.message &&
                                                <div style={{width: "100%", marginRight:"120px",marginLeft:"120px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                          }
                                        
                                        <div className="row packageContent">
                                            <div className="col-sm-4">
                                                <div className="forProfilePicture">
                                                        <div className="profilePixCircle">
        
                                                        </div>
                                                        <p className="personsName">{profileMenu.data.response.fullName}</p>
                                                        <p className="details">{profileMenu.data.response.username}</p>
                                                        <p className="details">{moment(profileMenu.data.response.lastLoginDate).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                                        <hr />
                                                    <div className="tickItems" onClick={this.NavigateToBVN}>
                                                        {isBvNLinked ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage} alt="" className="largeVectorI"/>}
                                                        <p className="pSubs">Link BVN</p>
                                                    </div>
                                                    
                                                    <div className="tickItems" onClick={this.NavigateToPersonalInfo}>
                                                        {isProfileInformation ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage} alt="" className="largeVectorI"/>}
                                                        <p className="pSubs">Personal Information</p>
                                                    </div>
                                                    <div className="tickItems" onClick={this.NavigateToContact}>
                                                        {isContactDetails ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage}  alt="" className="largeVectorI"/>}
                                                        <p className="pSubs">Contact Details</p>
                                                    </div>
                                                    <div className="tickItems" onClick={this.NavigateToDocuments}>
                                                        {isDocument ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage} alt=""  className="largeVectorI" />}
                                                        <p className="pSubs">Document Upload</p>
                                                    </div>
                                                    <div className="tickItems" onClick={this.NavigateToNextOfKin}>
                                                        {/* {typeof isToNextOfKin} */}
                                                        {isToNextOfKin ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage} alt="" className="largeVectorI"/>} 
                                                        <p className="pSubs">Next of Kin</p>
                                                    </div>
                                                    <div className="tickItems" onClick={this.NavigateResidentialAddress}>
                                                        {residentialAddress ? <img className="improveImgSize" src={CompletedprofileImage} alt="" /> : <img src={NotCompletedprofileImage} alt="" className="largeVectorI"/>} 
                                                        <p className="pSubs">Residential Address</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="col-sm-7">
                                            <form onSubmit={this.HandleSubmit} className="parentForm">
                                                    <p className="formHeading">Next Of Kin</p>
                                                
                                                    <div className="form-row">
                                                                <div className={TitleValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Title</label>
                                                                    <select onChange={this.SetInputValue} name="title" placeholder="title" className="input-border-radius height-39">
                                                                        <option value="Mr">Mr</option>
                                                                        <option value="Mrs">Mrs</option>
                                                                        <option value="Dr">Dr</option>
                                                                        <option value="Prof">Prof</option>
                                                                        <option value="master">Master</option>
                                                                    </select>
                                                                </div>
        
                                                                <div className={relationshipValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Relationship </label>
                                                                    <select onChange={this.SetInputValue} name="relationship" placeholder="marital status" className="input-border-radius height-39">
                                                                        <option value="Sister">Sister</option>
                                                                        <option value="Brother">Brother</option>
                                                                    </select>
                                                                </div>
                                                    </div>
        
                                                    <div className="form-row">
                                                                <div className={SurnameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Surname</label>
                                                                    <input type="text" name="SurName" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Surname"/>
                                                                </div>
                                                    </div>
        
                                                    <div className="form-row">
                                                                <div className={FirstNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">First Name</label>
                                                                    <input type="text" name="FirstName" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="First Name"/>
                                                                </div>
                                                    </div>
                                                    
                                                    
                                                    <div className="form-row">
                                                                <div className={OtherNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Other Name</label>
                                                                    <input type="text" name="OtherName" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Other Name"/>
                                                                </div>
                                                    </div>
                           
                                                    <div className="form-row">
                                                                <div className={phoneNumberValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Phone Number</label>
                                                                    <input type="number" name="phoneNumber" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Telephone"/>
                                                                </div>
                                                    </div>       
        
                                                    <div className="form-row">
                                                                <div className={EmailAddressValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Email</label>
                                                                    <input type="email" name="EmailAddress" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Email"/>
                                                                </div>
                                                    </div>
        
                                                    <div className="form-row">
                                                                <div className="form-group col-md-12">
                                                                    <label className="label-text">Next of Kin BVN (Optional)</label>
                                                                    <input type="number" name="nextOfKinBVN" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="BVN"/>
                                                                </div>
                                                    </div>
                                                   
                                                    <div className="form-row">
                                                                <div className={GenderValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Gender</label>
                                                                    <select className="select-gender input-border-radius" onChange={this.SetInputValue} name="Gender" placeholder="Gender">
                                                                        <option value=""> </option>
                                                                        <option value="Male"> Male </option>
                                                                        <option value="Female"> Female</option>
                                                                    </select>
                                                                </div>
        
                                                                <div className={DateOfBirthValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                        <label className="label-text">Date of Birth</label>
                                                                        <DatePicker className="form-control input-border-radius" selected={birthDate} 
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
                                                           <div className="form-group col-md-12">
                                                              <div>Next of Kin Full Address</div>
                                                           </div>
                                                    </div>
                                                    
                                                    
                                                    <div className={"form-row"}>
                                                                <div className={streetValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text"> Address </label>
                                                                    <input type="text" name="address" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Address"/>
                                                                </div>
                                                    </div>
        
                                                    <div className={"form-row"}>
                                                                <div className={streetCompoundValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Streat / Compound Name</label>
                                                                    <input type="text" name="street" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Streat / Compound Name"/>
                                                                </div>
                                                    </div>
        
                                                    <div className={"form-row"}>
                                                                <div className={busstopValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Nearest Bustop</label>
                                                                    <input type="text" name="busStop" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Nearest Bus - stop"/>
                                                                </div>
                                                    </div>
        
        
                                                    <div className={"form-row"}>
                                                                <div className={NationalityValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Nationality</label>
                                                                    <input type="text" name="Nationality" className="form-control input-border-radius" value="Nigeria" readOnly onChange={this.SetInputValue} placeholder="Nationality"/>
                                                                </div>
                                                      
                                                                <div className={StateOfOriginValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">State of Origin</label>
                                                                    <select name="StateOfOrigin" className="form-control input-border-radius" onChange={this.SetInputValue}>
                                                                            <option>Select State of Origin</option>
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
                        
                                                    <div className={"form-row"}>
                                                                <div className={LocalGovValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Local Government</label>
                                                                    <select name="LocalGv" className="form-control input-border-radius" onChange={this.SetInputValue} >
                                                                            <option>Select Local Government</option>
                                                                            {                                      
                                                                                getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
                                                                                getContactDetail.data.response.cities.map(city=> {
                                                                                    
                                                                                    return <option value={city.name}>
                                                                                    {city.name}</option>
                                                                                })
                                                                            } 
                                                                    </select>
                                                                </div>
                                                    </div>
        
                                                    
                                                           
                                                    <div className="form-row">
                                                                
                                                    </div>
                                                    <div className="align-button">
                                                    <button disabled={this.props.addNextOfKin.message ===profile.POST_NEXT_OF_KIN_PENDING} type="submit" className="twoBut no-border">
                                                    {this.props.addNextOfKin.message === profile.POST_NEXT_OF_KIN_PENDING ? "Processing..." :"Submit"}
                                                    </button>
                                                    </div>
                                                   
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

        return(
            <Fragment>
                  {/* <InnerContainer> */}
                       <div className="">
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
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="loading-info">Loading Profile Information...</p>
                </div>
                </div>
                </div>
                {/* </InnerContainer> */}
            </Fragment>      
        );
   }
}

const mapStateToProps = (state) => {
    return {
        profileMenu:state.profileMenu,
        nextOfKinsRelationship: state.nextOfKinsRelationship.data,
        getContactDetail:state.getContactDetail,
        alert:state.alert,
        getResidential:state.getResidential,
        addNextOfKin:state.addNextOfKin,
        nextOfKinsRelationship:state.nextOfKinsRelationship,
        GetResidentialAddress: state.GetResidentialAddress
    }
}

export default connect(mapStateToProps)(NextOfKin);



