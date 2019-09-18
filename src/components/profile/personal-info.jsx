import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import {connect} from 'react-redux'
import {history} from '../../_helpers/history';
import {profile} from '../../redux/constants/profile/profile-constants';
import {occupationAndSector, getResidentialDetails, getContactDetails,getPersonalInfo,getStates} from "../../redux/actions/profile/profile-action"
import moment from 'moment';
import AlatPinInput from '../../shared/components/alatPinInput';


class PersonalInfoMation extends Component {
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
        EmployerPhoneNumber: null,
        BVNnumber: null,
        SurName: null,
        EmployersAddress: null,
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
        NationalityValidity: false, 
        OtherNameValidity: false, 
        MothersMaidenNameValidity: false,
        DateOfBirthValidity: false,
        StateOfOriginValidity: false, 
        GenderValidity: false, 
        SurnameValidity: false, 
        FirstNameValidity: false, 
        SectorValidity: false,
        EmployerPhoneNumberValidity: false,
        EmailAddressValidity: false,
        EmployersNameValidity: false, 
        EmploymentValidity: false, 
        LocalGovValidity: false, 
        PlaceOfBirthValidity: false,
        PinValidity: false,
        OccupationValidity: false,
        TitleValidity: false,
        MaritalStatusValidity: false,

        isBvNLinked: false,
        isProfileInformation: false,
        isContactDetails: false,
        isDocument: false,
        navToNextOfKin: false,
        isImageUploaded: false,
        Pin:"",
        isPinInvalid: false,

       }
       this.handleAlatPinChange = this.handleAlatPinChange.bind(this)

       this.fetchOccupation();
       this.fetchResidentialDetails();
       this.fetchContactDetails();
       this.fetchPersonalInfo();
       this.fetchStates();
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

   fetchOccupation(){
    const { dispatch } = this.props;
    dispatch(occupationAndSector(this.state.user.token));
    };
    fetchResidentialDetails(){
        const { dispatch } = this.props;
        dispatch(getResidentialDetails(this.state.user.token));
    };
    fetchContactDetails(){
        const { dispatch } = this.props;
        dispatch(getContactDetails(this.state.user.token));
    };
    fetchPersonalInfo(){
        const{ dispatch } =this.props;
        dispatch(getPersonalInfo(this.state.user.token))
    };
    fetchStates(){
        const {dispatch}=this.props;
        dispatch(getStates(this.state.user.token))
    }

   InitiateNetworkCall = () => {
        
        let data = {
            title: this.state.title,
            maritalStatus: this.state.maritalStatus,
            firstName: this.state.FirstName,
            surname: this.state.SurName,
            otherNames: this.state.OtherName,
            gender: this.state.Gender,
            birthDate: this.state.birthDate,
            nationality: this.state.Nationality,
            stateOrigin: this.state.StateOfOriginValidity,
            lga: this.state.LocalGv,
            birthPlace: this.state.PlaceOfBirth,
            motherMaidenName: this.state.mothersMaidenName,
            bvn: this.state.bvnNumber,
            pin: this.state.AlatPin,
            occupation: this.state.Occupation,
            employerName: this.state.EmployerName,
            employerAddress: this.state.EmployersAddress,
            employerPhoneNumber: this.state.EmployerPhoneNumber,
            employmentSectorCode: this.state.Sector,
            employmentStatus: this.state.EmploymentStatus
        }

        console.log(data);
    
        this.props.dispatch(actions.capturePersonalInformation(this.state.user.token, data));
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
                        }else{
                            if(this.state[x].toString().length < 11){
                                console.log(this.state[x]);
                                result = null;
                                break;
                            }
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

                case 'EmployerPhoneNumber':
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

                case 'EmployersAddress':
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
            }
        }

       console.log(result);
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
       this.checkEmployerPhoneNumberValidity();
       this.checkEmailAddressValidity(); 
       this.checkEmployersNameValidity(); 
       this.checkLocalGovValidity(); 
       this.checkPlaceOfBirthValidity();
       this.checkTitleValidity();
       this.checkMaritalStatusValidity();
       this.checkNationalityValidity(); 
       this.checkStateOfOriginValidity();
       this.checkSurnameValidity(); 
       this.checkFirstNameValidity() 
       this.checkGenderValidity() 
       this.checkDateOfBirthValidity();
       this.checkEmploymentValidity();
       this.checkOtherNameValidity();
       this.checkMothersMaidenNameValidity();
       console.log('code got here');

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
   
   checkTitleValidity = () => {
        if(this.state.title == null || this.state.title == ""){
            this.setState({TitleValidity: true});
        }else{
            this.setState({TitleValidity: false});
        }
   }

    checkMaritalStatusValidity = () => {
        if(this.state.maritalStatus == null || this.state.maritalStatus == ""){
            this.setState({MaritalStatusValidity: true});
        }else{
            this.setState({MaritalStatusValidity: false});
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
    checkEmployerPhoneNumberValidity = () => {
        if(this.state.EmployerPhoneNumber == null || this.state.EmployerPhoneNumber == ""){
            this.setState({EmployerPhoneNumberValidity: true});
        }else{
            this.setState({EmployerPhoneNumberValidity: false});
        }
    }

    checkEmailAddressValidity = () => {
        if(this.state.EmployersAddress == null || this.state.EmployersAddress == ""){
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

   NavigateToSuccessPage = () => {
       history.push('/profile/profile-success-message');
   }

   PersonalInfomationHasBeenLinked = () => {
        this.DispatchSuccessMessage('Personal Information Linked Successfully');
   }

   DispatchSuccessMessage = (data) => {
        this.props.dispatch(actions.profileSuccessMessage(data));
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
       const {isImageUploaded, isBvNLinked, isProfileInformation, isContactDetails, isDocument, navToNextOfKin, BVNValidity, birthDate, PinValidity, SectorValidity, EmployerPhoneNumberValidity,EmploymentValidity, AddressValidity, EmployersNameValidity, LocalGovValidity, PlaceOfBirthValidity, NationalityValidity, StateOfOriginValidity,
        SurnameValidity, EmailAddressValidity, FirstNameValidity, MaritalStatusValidity, TitleValidity, OccupationValidity,GenderValidity, DateOfBirthValidity, OtherNameValidity, MothersMaidenNameValidity} = this.state;
        const {profileMenu, occupationAndSector, getContactDetail} = this.props
        console.log('=======',occupationAndSector)

    //    if(this.props.capturePersonalInformation.response != undefined){
    //        this.PersonalInfomationHasBeenLinked();
    //    }
       
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
                                <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="loading-info">Loading Profile Information ...</p>
                </div>
                </div>
                </div>
                {/* </InnerContainer> */}
            </Fragment>      
        )
       }

       if(profileMenu.message === profile.GET_PROFILE_MENU_FAILURE){
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
                                <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p>Please Check Your Internet Connection ...</p>
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
                                                            <li><NavLink to={'/profile'}>Profile</NavLink></li>
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
                                            {isImageUploaded ? <div className="profilePixCircle" style={{backgroundImage: 'url("'+this.props.profileMenu.data.response.imagePath+'")'}}></div>
                                                        : <div className="profilePixCircle"></div> }
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
                                                <p className="formHeading">Personal Information</p>
                                            
                                                <div className="form-row center-alignment">
                                                            <div className={TitleValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">Title</label>
                                                                <select className="select-size" onChange={this.SetInputValue} name="title" className="input-border-radius" placeholder="title">
                                                                    <option value="Mr">Mr</option>
                                                                    <option value="Mrs">Mrs</option>
                                                                    <option value="Dr">Dr</option>
                                                                    <option value="Prof">Prof</option>
                                                                    <option value="master">Master</option>
                                                                </select>
                                                            </div>
    
                                                            <div className={MaritalStatusValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">Marital Status</label>
                                                                <select className="select-size select-married input-border-radius" onChange={this.SetInputValue} name="maritalStatus" placeholder="marital status">
                                                                    
                                                                    <option value="Mr">Married</option>
                                                                    <option value="Mrs">Single</option>
                                                                </select>
                                                            </div>
                                                </div>
    
                                                <div className="form-row">
                                                            <div className={SurnameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                <label className="label-text">Surname Name</label>
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
                                                            <div className={GenderValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">Gender</label>
                                                                <select className="select-size input-border-radius" onChange={this.SetInputValue} name="Gender" placeholder="Gender">
                                                                    <option value=""> </option>
                                                                    <option value="Male"> Male </option>
                                                                    <option value="Female"> Female</option>
                                                                </select>
                                                            </div>
    
                                                            <div className={DateOfBirthValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Date of Birth</label>
                                                                    <DatePicker className="form-control date-picker-size input-border-radius" selected={birthDate} 
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
                                                            <div className={NationalityValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">Nationality</label>
                                                                <input type="text" name="Nationality" className="form-control input-border-radius enter-national" onChange={this.SetInputValue} placeholder="Nationality"/>
                                                            </div>
    
                                                            <div className={StateOfOriginValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">State of Origin</label>
                                                                <select className="select-size state-origin input-border-radius" onChange={this.SetInputValue} name="StateOfOrigin" >
                                                                        <option>Select State of Origin</option>
                                                                        {                                      
                                                                            getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
                                                                            getContactDetail.data.response.states.map(state=> {
                                                                                
                                                                                return <option key={state} value={state}>
                                                                                {state.name}</option>
                                                                            })
                                                                        } 
                                                                </select>
                                                            </div>
                                                </div>
    
                                                <div className="form-row">
                                                            <div className={LocalGovValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">Local Government</label>
                                                                <select className="select-size input-border-radius" onChange={this.SetInputValue} name="StateOfOrigin" >
                                                                        <option>Select Local Government</option>
                                                                        {                                      
                                                                            getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
                                                                            getContactDetail.data.response.cities.map(city=> {
                                                                                
                                                                                return <option key={city.name} value={city.name}>
                                                                                {city.name}</option>
                                                                            })
                                                                        } 
                                                                </select>
                                                                {/* <input type="text" name="LocalGv" className="form-control" onChange={this.SetInputValue} placeholder="Local Government"/> */}
                                                            </div>
    
                                                            <div className={PlaceOfBirthValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">Place of Birth (State of Origin)</label>
                                                                <input type="text" name="PlaceOfBirth" className="birth-place form-control input-border-radius" onChange={this.SetInputValue} placeholder="Place of Birth"/>
                                                            </div>
                                                </div>
                                                
                                                <div className="form-row">
                                                            <div className={MothersMaidenNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                <label className="label-text">Mothers Maiden Name</label>
                                                                <input type="text" name="mothersMaidenName" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="First Name"/>
                                                            </div>
                                                </div>
                                               
                                                <div className="form-row">
                                                <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">BVN</label>
                                                                <input type="Number" name= "BVNnumber" className="form-control enter-bvn input-border-radius" onChange={this.SetBvNNumber} placeholder="0000 0000 0000"/>
                                                            </div>
    
                                                            <div className={EmploymentValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">Employment Status</label>
                                                                <select className="select-size input-border-radius" onChange={this.SetInputValue} name="EmploymentStatus" >
                                                                        <option>Select Employment Status</option>
                                                                        {                                      
                                                                            occupationAndSector.message === profile.OCCU_AND_SECTOR_SUCCESS && 
                                                                            occupationAndSector.data.response.result.employmentStatus.map(status=> {
                                                                                
                                                                                return <option key={status} value={status}>
                                                                                {status}</option>
                                                                            })
                                                                        } 
                                                                    </select>
                                                            </div>
                                                </div>
                                               
                                                <div className="form-row">
                                                            <div className={EmployersNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                <label className="label-text">Employer's Name</label>
                                                                <input type="text" name="EmployerName" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Employers Name"/>
                                                            </div>
                                                </div>
                                              
                                                <div className="form-row">
                                                            <div className={EmailAddressValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                <label className="label-text">Employer's Address</label>
                                                                <input type="text" name="EmployersAddress" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Employers Address"/>
                                                            </div>
                                                </div>
    
                                                <div className="form-row">
                                                            <div className={EmployerPhoneNumberValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                <label className="label-text">Employer's Phone Number</label>
                                                                <input type="number" name="EmployerPhoneNumber" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Employers Phone Number"/>
                                                            </div>
                                                </div>
                                                
                                                <div className="form-row">
                                                            <div className={SectorValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                <label className="label-text">Sector</label>
                                                                     <select className="select-size select-sector-occupation input-border-radius" onChange={this.SetInputValue} name="Sector" >
                                                                        <option>Select Sector</option>
                                                                        {                                      
                                                                            occupationAndSector.message === profile.OCCU_AND_SECTOR_SUCCESS && 
                                                                            occupationAndSector.data.response.result.employmentSectors.map(sector=> {
                                                                                
                                                                                return <option key={sector.description} value={sector.code + " " + sector.description}>
                                                                                {sector.description}</option>
                                                                            })
                                                                        } 
                                                                    </select>
                                                            </div>
                                                </div>
    
                                                <div className="form-row">
                                                            <div className={OccupationValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                <label className="label-text">Occupation</label>
                                                                
                                                                    <select className="select-size select-sector-occupation input-border-radius" onChange={this.SetInputValue}  name="Occupation">
                                                                        <option>Select Occupation</option>
                                                                        {                                      
                                                                            occupationAndSector.message === profile.OCCU_AND_SECTOR_SUCCESS && 
                                                                            occupationAndSector.data.response.result.occupations.map(occupation=> {
                                                                                
                                                                                return <option key={occupation.code} value={occupation.description}>
                                                                                {occupation.description}</option>
                                                                            })
                                                                        } 
                                                                    </select>
                                                                </div>
                                                             </div>
                                              
                                                <div className="form-row">
                                                            <div className={PinValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                <label className="label-text">Alat Pin</label>
                                                                <AlatPinInput
                                                                    value={this.state.Pin}
                                                                    onChange={this.handleAlatPinChange}
                                                                    PinInvalid={this.state.isPinInvalid}
                                                                    maxLength={4} />
                                                                {/* <input type="text" name="AlatPin" className="form-control" onChange={this.SetInputValue} placeholder="Alat Pin"/> */}
                                                            </div>
                                                </div>
                                                <div className="align-button">
                                                    <button disabled={this.props.capturePersonalInformation.message ===profile.POST_PROFILE_INFORMATION_PENDING} type="submit" className="twoBut no-border">
                                                        
                                                        {this.props.capturePersonalInformation.message === profile.POST_PROFILE_INFORMATION_PENDING ? "Processing..." :"Submit"}

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
                 
           )
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
   }
}



function mapStateToProps(state){
    return {
        profileMenu:state.profileMenu,
        occupationAndSector:state.occupationAndSector,
        getResidential:state.getResidential,
        getContactDetail:state.getContactDetail,
        getStates:state.getStates,
        alert:state.alert,
        capturePersonalInformation:state.capturePersonalInformation

    };
}

export default connect(mapStateToProps)(PersonalInfoMation);




// import React, { Component } from 'react';
// import "./profile.css";
// import DatePicker from "react-datepicker";
// import * as actions from '../../redux/actions/profile/profile-action';
// import {Fragment} from "react";
// import { Link, NavLink, Route, Switch } from 'react-router-dom';
// import InnerContainer from '../../shared/templates/inner-container';
// import {connect} from 'react-redux'
// import {history} from '../../_helpers/history';
// import {profile} from '../../redux/constants/profile/profile-constants';
// import {occupationAndSector, getResidentialDetails, getContactDetails,getPersonalInfo,getStates} from "../../redux/actions/profile/profile-action"
// import moment from 'moment';

// class PersonalInfoMation extends Component {
//    constructor(props){
//        super(props);
//        this.state = {
//         user: JSON.parse(localStorage.getItem("user")),
//         BVNValidity: false,
//         dateValidity: false,
//         bvnNumber: null,
//         dateValue: null,
//         birthDate: null,
//         Occupation: null,
//         AlatPin: null,
//         Sector: null,
//         EmployerPhoneNumber: null,
//         BVNnumber: null,
//         SurName: null,
//         EmployersAddress: null,
//         FirstName: null, 
//         OtherName: null, 
//         EmployerName: null,
//         EmploymentStatus: null,
//         mothersMaidenName: null,
//         Gender: null,
//         LocalGv: null,
//         StateOfOrigin: null,
//         Nationality: null,
//         PlaceOfBirth: null, 
//         maritalStatus: null,
//         title: null,
//         NationalityValidity: false, 
//         OtherNameValidity: false, 
//         MothersMaidenNameValidity: false,
//         DateOfBirthValidity: false,
//         StateOfOriginValidity: false, 
//         GenderValidity: false, 
//         SurnameValidity: false, 
//         FirstNameValidity: false, 
//         SectorValidity: false,
//         EmployerPhoneNumberValidity: false,
//         EmailAddressValidity: false,
//         EmployersNameValidity: false, 
//         EmploymentValidity: false, 
//         LocalGovValidity: false, 
//         PlaceOfBirthValidity: false,
//         PinValidity: false,
//         OccupationValidity: false,
//         TitleValidity: false,
//         MaritalStatusValidity: false,

//         isBvNLinked: false,
//         isProfileInformation: false,
//         isContactDetails: false,
//         isDocument: false,
//         navToNextOfKin: false
//        }

//        this.fetchOccupation();
//        this.fetchResidentialDetails();
//        this.fetchContactDetails();
//        this.fetchPersonalInfo();
//        this.fetchStates();
//    }

//    componentDidMount = () => {
//        this.CheckIfStoreInformationIsSet();
//    }

// CheckIfStoreInformationIsSet = () => {
    
//  if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_SUCCESS){
//   //    console.log(this.props.profileMenu.response.personalInfoComplete);
//      this.setState({isProfileInformation: this.props.profileMenu.data.response.personalInfoComplete});
//      this.setState({isContactDetails: this.props.profileMenu.data.response.contactDetailsComplete});
//      this.setState({isDocument: this.props.profileMenu.data.response.documentUploaded});
//      this.setState({navToNextOfKin: this.props.profileMenu.data.response.nextOfKinComplete});
//      this.setState({isBvNLinked: this.props.profileMenu.data.response.bvnLinked});
//  }
// }

//    fetchOccupation(){
//     const { dispatch } = this.props;
//     dispatch(occupationAndSector(this.state.user.token));
//     };
//     fetchResidentialDetails(){
//         const { dispatch } = this.props;
//         dispatch(getResidentialDetails(this.state.user.token));
//     };
//     fetchContactDetails(){
//         const { dispatch } = this.props;
//         dispatch(getContactDetails(this.state.user.token));
//     };
//     fetchPersonalInfo(){
//         const{ dispatch } =this.props;
//         dispatch(getPersonalInfo(this.state.user.token))
//     };
//     fetchStates(){
//         const {dispatch}=this.props;
//         dispatch(getStates(this.state.user.token))
//     }

//    InitiateNetworkCall = () => {
        
//         let data = {
//             title: this.state.title,
//             maritalStatus: this.state.maritalStatus,
//             firstName: this.state.FirstName,
//             surname: this.state.SurName,
//             otherNames: this.state.OtherName,
//             gender: this.state.Gender,
//             birthDate: this.state.birthDate,
//             nationality: this.state.Nationality,
//             stateOrigin: this.state.StateOfOriginValidity,
//             lga: this.state.LocalGv,
//             birthPlace: this.state.PlaceOfBirth,
//             motherMaidenName: this.state.mothersMaidenName,
//             bvn: this.state.bvnNumber,
//             pin: this.state.AlatPin,
//             occupation: this.state.Occupation,
//             employerName: this.state.EmployerName,
//             employerAddress: this.state.EmployersAddress,
//             employerPhoneNumber: this.state.EmployerPhoneNumber,
//             employmentSectorCode: this.state.Sector,
//             employmentStatus: this.state.EmploymentStatus
//         }

//         console.log(data);
    
//         this.props.dispatch(actions.capturePersonalInformation(this.state.user.token, data));
//    }
   

//    SetBVNValidityStatus = () => {
//       console.log();
//       if(this.state.bvnNumber == null || this.state.bvnNumber  == "" || this.state.bvnNumber.toString().length < 11){
//           this.setState({BVNValidity: true});
//       }else{
//           this.setState({BVNValidity: false});
//       }
//    }
   
//    SetDateValidity = () => {
//        if(this.state.birthDate == null || this.state.birthDate == ""){
//            this.setState({dateValidity: true});
//        }else{
//            this.setState({dateValidity: false});
//        }
//    }


//    checkValidity = () => {
//        let result = 'valid';
//        for(let x in this.state){
//             switch(x){
//                 case 'bvnNumber':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }else{
//                             if(this.state[x].toString().length < 11){
//                                 console.log(this.state[x]);
//                                 result = null;
//                                 break;
//                             }
//                         }
//                 case 'birthDate':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'Occupation':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }

//                 case 'AlatPin':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'Sector':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }

//                 case 'EmployerPhoneNumber':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'SurName':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }

//                 case 'EmployersAddress':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'FirstName':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }

//                 case 'OtherName':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'EmployerName':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }

//                 case 'EmploymentStatus':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'Gender':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'mothersMaidenName':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'LocalGv':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'StateOfOrigin':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'Nationality':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'PlaceOfBirth':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'maritalStatus':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//                 case 'title':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//             }
//         }

//        console.log(result);
//        return result;
//    }


//    SetBvNNumber = (event) => {
//        this.setState({bvnNumber: event.target.value});
//    }

//    SetBirthDay = (birthDate) => {
//         this.setState({
//             birthDate: birthDate
//         });
//    }

//    NavigateToSuccessPage = () => {
//        history.push('/profile/profile-success-message');
//    }

//    HandleSubmit = () => {
//        event.preventDefault();
//        this.SetDateValidity();
//        this.SetBVNValidityStatus();
//        this.checkPinValidity(); 
//        this.checkOccupationValidity();
//        this.checkSectorValidity(); 
//        this.checkEmployerPhoneNumberValidity();
//        this.checkEmailAddressValidity(); 
//        this.checkEmployersNameValidity(); 
//        this.checkLocalGovValidity(); 
//        this.checkPlaceOfBirthValidity();
//        this.checkTitleValidity();
//        this.checkMaritalStatusValidity();
//        this.checkNationalityValidity(); 
//        this.checkStateOfOriginValidity();
//        this.checkSurnameValidity(); 
//        this.checkFirstNameValidity() 
//        this.checkGenderValidity() 
//        this.checkDateOfBirthValidity();
//        this.checkEmploymentValidity();
//        this.checkOtherNameValidity();
//        this.checkMothersMaidenNameValidity();
//        console.log('code got here');

//        console.log('was fired');

//        switch(this.checkValidity()){
//            case null:
//              console.log('Empty value was found');
//              break;
//            case 'valid': 
//              console.log("No Empty Value Found");
//              this.InitiateNetworkCall();
//              break;
//        }
//     }
   
//    SetInputValue = (event) => {
//        let name = event.target.name;
//        this.setState({[name] : event.target.value});
//        console.log("was just invoked");
//    } 
   
//    checkTitleValidity = () => {
//         if(this.state.title == null || this.state.title == ""){
//             this.setState({TitleValidity: true});
//         }else{
//             this.setState({TitleValidity: false});
//         }
//    }

//     checkMaritalStatusValidity = () => {
//         if(this.state.maritalStatus == null || this.state.maritalStatus == ""){
//             this.setState({MaritalStatusValidity: true});
//         }else{
//             this.setState({MaritalStatusValidity: false});
//         }
//     }

//     checkPinValidity = () => {
//         if(this.state.AlatPin == null || this.state.AlatPin == ""){
//             this.setState({PinValidity: true});
//         }else{
//             this.setState({PinValidity: false});
//         }
//     }
//     checkOccupationValidity = () => {
//         if(this.state.Occupation == null || this.state.Occupation == ""){
//             this.setState({OccupationValidity: true});
//         }else{
//             this.setState({OccupationValidity: false});
//         }
//     }
//     checkSectorValidity = () => {
//         if(this.state.Sector == null || this.state.Sector == ""){
//             this.setState({SectorValidity: true});
//         }else{
//             this.setState({SectorValidity: false});
//         }
//     }
//     checkEmployerPhoneNumberValidity = () => {
//         if(this.state.EmployerPhoneNumber == null || this.state.EmployerPhoneNumber == ""){
//             this.setState({EmployerPhoneNumberValidity: true});
//         }else{
//             this.setState({EmployerPhoneNumberValidity: false});
//         }
//     }

//     checkEmailAddressValidity = () => {
//         if(this.state.EmployersAddress == null || this.state.EmployersAddress == ""){
//             this.setState({EmailAddressValidity: true});
//         }else{
//             this.setState({EmailAddressValidity: false});
//         }
//     }
//     checkEmployersNameValidity = () => {
//         if(this.state.EmployerName == null || this.state.EmployerName == ""){
//             this.setState({EmployersNameValidity: true});
//         }else{
//             this.setState({EmployersNameValidity: false});
//         }
//     }
//     checkEmploymentValidity = () => {
//         if(this.state.EmploymentStatus == null || this.state.EmploymentStatus == ""){
//             this.setState({EmploymentValidity: true});
//         }else{
//             this.setState({EmploymentValidity: false});
//         }
//     }

//     checkLocalGovValidity = () => {
//         if(this.state.LocalGv == null || this.state.LocalGv == ""){
//             this.setState({LocalGovValidity: true});
//         }else{
//             this.setState({LocalGovValidity: false});
//         }
//     }
//     checkPlaceOfBirthValidity = () => {
//         if(this.state.PlaceOfBirth == null || this.state.PlaceOfBirth == ""){
//             this.setState({PlaceOfBirthValidity: true});
//         }else{
//             this.setState({PlaceOfBirthValidity: false});
//         }
//     } 
//     checkNationalityValidity = () => {
//         if(this.state.Nationality == null || this.state.Nationality == ""){
//             this.setState({NationalityValidity: true});
//         }else{
//             this.setState({NationalityValidity: false});
//         }
//     }
//     checkStateOfOriginValidity = () => {
//         if(this.state.StateOfOrigin == null || this.state.StateOfOrigin == ""){
//             this.setState({StateOfOriginValidity: true});
//         }else{
//             this.setState({StateOfOriginValidity: false});
//         }
//     }
//     checkSurnameValidity = () => {
//         if(this.state.SurName == null || this.state.SurName == ""){
//             this.setState({SurnameValidity: true});
//         }else{
//             this.setState({SurnameValidity: false});
//         }
//     }
//     checkFirstNameValidity = () => {
//         if(this.state.FirstName == null || this.state.FirstName == ""){
//             this.setState({FirstNameValidity: true});
//         }else{
//             this.setState({FirstNameValidity: false});
//         }
//     }
//     checkGenderValidity = () => {
//         if(this.state.Gender == null || this.state.Gender == ""){
//             this.setState({GenderValidity: true});
//         }else{
//             this.setState({GenderValidity: false});
//         }
//     }
//     checkDateOfBirthValidity = () => {
//         if(this.state.birthDate == null || this.state.birthDate == ""){
//             this.setState({DateOfBirthValidity: true});
//         }else{
//             this.setState({DateOfBirthValidity: false});
//         }
//     }
//     checkOtherNameValidity = () => {
//         if(this.state.OtherName == null || this.state.OtherName == ""){
//             this.setState({OtherNameValidity: true});
//         }else{
//             this.setState({OtherNameValidity: false});
//         }
//     }
//     checkMothersMaidenNameValidity = () => {
//         if(this.state.mothersMaidenName == null || this.state.mothersMaidenName == ""){
//             this.setState({MothersMaidenNameValidity: true});
//         }else{
//             this.setState({MothersMaidenNameValidity: false});
//         }
//     }

//    NavigateToSuccessPage = () => {
//        history.push('/profile/profile-success-message');
//    }

//    PersonalInfomationHasBeenLinked = () => {
//         this.DispatchSuccessMessage('Personal Information Linked Successfully');
//    }

//    DispatchSuccessMessage = (data) => {
//         this.props.dispatch(actions.profileSuccessMessage(data));
//    }

//    NavigateToBVN = () => {
//     if(this.props.profileMenu.data.response.bvnLinked == true){
//           this.DispatchSuccessMessage('BVN has Been Linked');
//           return;
//     }

//     history.push('/profile/linkBVN');
// }

// NavigateToPersonalInfo = () => {
//      if(this.props.profileMenu.data.response.personalInfoComplete == true){
//          this.DispatchSuccessMessage('Personal Information Created');
//          return;
//      }

//      history.push('/profile/profile-personalInfo');
// }

// NavigateToContact = () => {
//      if(this.props.profileMenu.data.response.contactDetailsComplete == true){
//              this.DispatchSuccessMessage('Contact Created Successfully');
//              return;
//      }

//      history.push('/profile/profile-contact-detail');
// }


// NavigateToDocuments = () => {
//      if(this.props.profileMenu.data.response.documentUploaded == true){
//          this.DispatchSuccessMessage('Document uploaded successfully');
//          return;
//      }

//      history.push('/profile/profile-documents');
// }

// NavigateToNextOfKin = () => {
//      if(this.props.profileMenu.data.response.nextOfKinComplete == true){
//          this.DispatchSuccessMessage('Next of kin has been Created');
//          return
//      }

//     history.push('/profile/profile-next-of-kin');
// }

// DispatchSuccessMessage = (data) => {
//     this.props.dispatch(actions.profileSuccessMessage(data));
// }

// GetUserProfileMenu = () => {
//     this.props.dispatch(actions.profileMenu(this.state.user.token));
//  }

//    render(){
//        const {isBvNLinked, isProfileInformation, isContactDetails, isDocument, navToNextOfKin, BVNValidity, birthDate, PinValidity, SectorValidity, EmployerPhoneNumberValidity,EmploymentValidity, AddressValidity, EmployersNameValidity, LocalGovValidity, PlaceOfBirthValidity, NationalityValidity, StateOfOriginValidity,
//         SurnameValidity, EmailAddressValidity, FirstNameValidity, MaritalStatusValidity, TitleValidity, OccupationValidity,GenderValidity, DateOfBirthValidity, OtherNameValidity, MothersMaidenNameValidity} = this.state;
//         const {profileMenu, occupationAndSector, getContactDetail} = this.props
//         console.log('=======',occupationAndSector)

//     //    if(this.props.capturePersonalInformation.response != undefined){
//     //        this.PersonalInfomationHasBeenLinked();
//     //    }
       
//     //    if(profileMenu.message === profile.GET_PERSONAL_INFO_PENDING){
//     //     return(
//     //         <Fragment>
//     //               <InnerContainer>
//     //                    <div className="">
//     //                          <div className="container">
//     //                  <div className="coverPropertiesofComponent">
//     //                      <div className="col-sm-12">
//     //                       <p className="page-title">Account Setting</p>
//     //                     </div>

//     //             <div className="col-sm-12">
//     //                 <div>
//     //                     <div className="sub-tab-nav" style={{marginBottom: 10}}>
//     //                         <ul>
//     //                             <li><NavLink to={'/profile'} >Profile</NavLink></li>
//     //                             <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
//     //                             <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
//     //                         </ul>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //             <p>loading data ...</p>
//     //             </div>
//     //             </div>
//     //             </div>
//     //             </InnerContainer>
//     //         </Fragment>      
//     //     )
//     //    }

//     //    if(profileMenu.message === profile.GET_PERSONAL_INFO_SUCCESS){
//         return(
//             <Fragment>
//                  {/* <InnerContainer> */}
//                         <div className="">
//                              <div className="container">
//                                     <div className="coverPropertiesofComponent">
//                                         <div className="col-sm-12">
//                                             <p className="page-title">Account Setting</p>
//                                         </div>
    
//                                         <div className="col-sm-12">
//                                             <div>
//                                                 <div className="sub-tab-nav" style={{marginBottom: 10}}>
//                                                     <ul>
//                                                             <li><NavLink to={'/profile'} >Profile</NavLink></li>
                                                            
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         {this.props.alert && this.props.alert.message &&
//                                         <div style={{width: "100%", marginRight:"120px",marginLeft:"120px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
//                                     }
                                    
//                                     <div className="row packageContent">
//                                         <div className="col-sm-4">
//                                             <div className="forProfilePicture">
//                                                     <div className="profilePixCircle">
    
//                                                     </div>
//                                                     <p className="personsName">{this.props.profileMenu.data.response.fullName}</p>
//                                                     <p className="details">{this.props.profileMenu.data.response.username}</p>
//                                                     <p className="details">{moment(this.props.profileMenu.data.response.lastLoginDate).format("MMMM Do YYYY, h:mm:ss a")}</p>
//                                                     <hr />
    
//                                                     <div className="tickItems" onClick={this.NavigateToBVN}>
//                                                         {isBvNLinked === true ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
//                                                         <p className="pSubs">Link BVN</p>
//                                                     </div>
//                                                     <div className="tickItems" onClick={this.NavigateToPersonalInfo}>
//                                                         {isProfileInformation ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
//                                                         <p className="pSubs">Personal Information</p>
//                                                     </div>
//                                                     <div className="tickItems" onClick={this.NavigateToContact}>
//                                                         {isContactDetails ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
//                                                         <p className="pSubs">Contact Details</p>
//                                                     </div>
//                                                     <div className="tickItems" onClick={this.NavigateToDocuments}>
//                                                         {isDocument ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt=""  className="largeVectorI" />}
//                                                         <p className="pSubs">Document Upload</p>
//                                                     </div>
//                                                     <div className="tickItems" onClick={this.NavigateToNextOfKin}>
//                                                         {navToNextOfKin ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>} 
//                                                         <p className="pSubs">Next of Kin</p>
//                                                     </div>
//                                             </div>
                                            
//                                         </div>
//                                         <div className="col-sm-7">
//                                         <form onSubmit={this.HandleSubmit} className="parentForm">
//                                                 <p className="formHeading">Personal Information</p>
                                            
//                                                 <div className="form-row center-alignment">
//                                                             <div className={TitleValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
//                                                                 <label className="label-text">Title</label>
//                                                                 <select className="select-size" onChange={this.SetInputValue} name="title" placeholder="title">
//                                                                     <option value="Mr">Mr</option>
//                                                                     <option value="Mrs">Mrs</option>
//                                                                     <option value="Dr">Dr</option>
//                                                                     <option value="Prof">Prof</option>
//                                                                     <option value="master">Master</option>
//                                                                 </select>
//                                                             </div>
    
//                                                             <div className={MaritalStatusValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
//                                                                 <label className="label-text">Marital Status</label>
//                                                                 <select className="select-size select-married" onChange={this.SetInputValue} name="maritalStatus" placeholder="marital status">
                                                                    
//                                                                     <option value="Mr">Married</option>
//                                                                     <option value="Mrs">Single</option>
//                                                                 </select>
//                                                             </div>
//                                                 </div>
    
//                                                 <div className="form-row">
//                                                             <div className={SurnameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
//                                                                 <label className="label-text">Surname Name</label>
//                                                                 <input type="text" name="SurName" className="form-control" onChange={this.SetInputValue} placeholder="Surname"/>
//                                                             </div>
//                                                 </div>
    
//                                                 <div className="form-row">
//                                                             <div className={FirstNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
//                                                                 <label className="label-text">First Name</label>
//                                                                 <input type="text" name="FirstName" className="form-control" onChange={this.SetInputValue} placeholder="First Name"/>
//                                                             </div>
//                                                 </div>
                                                
                                                
//                                                 <div className="form-row">
//                                                             <div className={OtherNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
//                                                                 <label className="label-text">Other Name</label>
//                                                                 <input type="text" name="OtherName" className="form-control" onChange={this.SetInputValue} placeholder="Other Name"/>
//                                                             </div>
//                                                 </div>
                                               
//                                                 <div className="form-row">
//                                                             <div className={GenderValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
//                                                                 <label className="label-text">Gender</label>
//                                                                 <select className="select-size" onChange={this.SetInputValue} name="Gender" placeholder="Gender">
//                                                                     <option value=""> </option>
//                                                                     <option value="Male"> Male </option>
//                                                                     <option value="Female"> Female</option>
//                                                                 </select>
//                                                             </div>
    
//                                                             <div className={DateOfBirthValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
//                                                                     <label className="label-text">Date of Birth</label>
//                                                                     <DatePicker className="form-control date-picker-size" selected={birthDate} 
//                                                                     placeholder="June 31, 2019"
//                                                                     dateFormat=" MMMM d, yyyy"
//                                                                     showMonthDropdown
//                                                                     showYearDropdown
//                                                                     onChange={this.SetBirthDay}
//                                                                     dropdownMode="select"
//                                                                     // minDate={new Date()}
//                                                                     />
//                                                             </div> 
//                                                 </div>
    
//                                                 <div className="form-row">
//                                                             <div className={NationalityValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
//                                                                 <label className="label-text">Nationality</label>
//                                                                 <input type="text" name="Nationality" className="form-control enter-national" onChange={this.SetInputValue} placeholder="Nationality"/>
//                                                             </div>
    
//                                                             <div className={StateOfOriginValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
//                                                                 <label className="label-text">State of Origin</label>
//                                                                 <select className="select-size state-origin" onChange={this.SetInputValue} name="StateOfOrigin" >
//                                                                         <option>Select State of Origin</option>
//                                                                         {                                      
//                                                                             getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
//                                                                             getContactDetail.data.response.states.map(state=> {
                                                                                
//                                                                                 return <option key={state} value={state}>
//                                                                                 {state.name}</option>
//                                                                             })
//                                                                         } 
//                                                                 </select>
//                                                             </div>
//                                                 </div>
    
//                                                 <div className="form-row">
//                                                             <div className={LocalGovValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
//                                                                 <label className="label-text">Local Government</label>
//                                                                 <select className="select-size" onChange={this.SetInputValue} name="StateOfOrigin" >
//                                                                         <option>Select Local Government</option>
//                                                                         {                                      
//                                                                             getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
//                                                                             getContactDetail.data.response.cities.map(city=> {
                                                                                
//                                                                                 return <option key={city.name} value={city.name}>
//                                                                                 {city.name}</option>
//                                                                             })
//                                                                         } 
//                                                                 </select>
//                                                                 {/* <input type="text" name="LocalGv" className="form-control" onChange={this.SetInputValue} placeholder="Local Government"/> */}
//                                                             </div>
    
//                                                             <div className={PlaceOfBirthValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
//                                                                 <label className="label-text">Place of Birth (State of Origin)</label>
//                                                                 <input type="text" name="PlaceOfBirth" className="birth-place form-control " onChange={this.SetInputValue} placeholder="Place of Birth"/>
//                                                             </div>
//                                                 </div>
                                                
//                                                 <div className="form-row">
//                                                             <div className={MothersMaidenNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
//                                                                 <label className="label-text">Mothers Maiden Name</label>
//                                                                 <input type="text" name="mothersMaidenName" className="form-control" onChange={this.SetInputValue} placeholder="First Name"/>
//                                                             </div>
//                                                 </div>
                                               
//                                                 <div className="form-row">
//                                                 <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
//                                                                 <label className="label-text">BVN</label>
//                                                                 <input type="Number" name= "BVNnumber" className="form-control enter-bvn" onChange={this.SetBvNNumber} placeholder="0000 0000 0000"/>
//                                                             </div>
    
//                                                             <div className={EmploymentValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
//                                                                 <label className="label-text">Employment Status</label>
//                                                                 <select className="select-size" onChange={this.SetInputValue} name="EmploymentStatus" >
//                                                                         <option>Select Employment Status</option>
//                                                                         {                                      
//                                                                             occupationAndSector.message === profile.OCCU_AND_SECTOR_SUCCESS && 
//                                                                             occupationAndSector.data.response.result.employmentStatus.map(status=> {
                                                                                
//                                                                                 return <option key={status} value={status}>
//                                                                                 {status}</option>
//                                                                             })
//                                                                         } 
//                                                                     </select>
//                                                             </div>
//                                                 </div>
                                               
//                                                 <div className="form-row">
//                                                             <div className={EmployersNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
//                                                                 <label className="label-text">Employer's Name</label>
//                                                                 <input type="text" name="EmployerName" className="form-control" onChange={this.SetInputValue} placeholder="Employers Name"/>
//                                                             </div>
//                                                 </div>
                                              
//                                                 <div className="form-row">
//                                                             <div className={EmailAddressValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
//                                                                 <label className="label-text">Employer's Address</label>
//                                                                 <input type="text" name="EmployersAddress" className="form-control" onChange={this.SetInputValue} placeholder="Employers Address"/>
//                                                             </div>
//                                                 </div>
    
//                                                 <div className="form-row">
//                                                             <div className={EmployerPhoneNumberValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
//                                                                 <label className="label-text">Employer's Phone Number</label>
//                                                                 <input type="number" name="EmployerPhoneNumber" className="form-control" onChange={this.SetInputValue} placeholder="Employers Phone Number"/>
//                                                             </div>
//                                                 </div>
                                                
//                                                 <div className="form-row">
//                                                             <div className={SectorValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
//                                                                 <label className="label-text">Sector</label>
//                                                                      <select className="select-size select-sector-occupation" onChange={this.SetInputValue} name="Sector" >
//                                                                         <option>Select Sector</option>
//                                                                         {                                      
//                                                                             occupationAndSector.message === profile.OCCU_AND_SECTOR_SUCCESS && 
//                                                                             occupationAndSector.data.response.result.employmentSectors.map(sector=> {
                                                                                
//                                                                                 return <option key={sector.description} value={sector.code + " " + sector.description}>
//                                                                                 {sector.description}</option>
//                                                                             })
//                                                                         } 
//                                                                     </select>
//                                                             </div>
//                                                 </div>
    
//                                                 <div className="form-row">
//                                                             <div className={OccupationValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
//                                                                 <label className="label-text">Occupation</label>
                                                                
//                                                                     <select className="select-size select-sector-occupation" onChange={this.SetInputValue}  name="Occupation">
//                                                                         <option>Select Occupation</option>
//                                                                         {                                      
//                                                                             occupationAndSector.message === profile.OCCU_AND_SECTOR_SUCCESS && 
//                                                                             occupationAndSector.data.response.result.occupations.map(occupation=> {
                                                                                
//                                                                                 return <option key={occupation.code} value={occupation.description}>
//                                                                                 {occupation.description}</option>
//                                                                             })
//                                                                         } 
//                                                                     </select>
//                                                                 </div>
//                                                              </div>
                                              
//                                                 <div className="form-row">
//                                                             <div className={PinValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
//                                                                 <label className="label-text">Alat Pin</label>
//                                                                 <input type="text" name="AlatPin" className="form-control" onChange={this.SetInputValue} placeholder="Alat Pin"/>
//                                                             </div>
//                                                 </div>
//                                                 <div className="align-button">
//                                                     <button type="submit" className="twoBut no-border">Submit</button>
//                                                 </div>
                                               
                                                
//                                             </form>
                                        
//                                         </div>
//                                     </div>
//                                     </div>
//                                 </div>
//                             </div>
//                      {/* </InnerContainer> */}
//             </Fragment>
                
//            )
//     //    }

//     //    if(profileMenu.data == undefined){
//     //     this.GetUserProfileMenu();
//     //     return(
//     //         <Fragment>
//     //               <InnerContainer>
//     //                    <div className="">
//     //                          <div className="container">
//     //                  <div className="coverPropertiesofComponent">
//     //                      <div className="col-sm-12">
//     //                       <p className="page-title">Account Setting</p>
//     //                     </div>

//     //             <div className="col-sm-12">
//     //                 <div>
//     //                     <div className="sub-tab-nav" style={{marginBottom: 10}}>
//     //                         <ul>
//     //                             <li><NavLink to={'/profile'} >Profile</NavLink></li>
//     //                             <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
//     //                             <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
//     //                         </ul>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //             <p>loading data ...</p>
//     //             </div>
//     //             </div>
//     //             </div>
//     //             </InnerContainer>
//     //         </Fragment>      
//     //     )
//     //    }
//    }
// }



// function mapStateToProps(state){
//     return {
//         profileMenu:state.profileMenu,
//         occupationAndSector:state.occupationAndSector,
//         getResidential:state.getResidential,
//         getContactDetail:state.getContactDetail,
//         getStates:state.getStates,
//         alert:state.alert,
//         capturePersonalInformation:state.capturePersonalInformation
//     };
// }

// export default connect(mapStateToProps)(PersonalInfoMation);
