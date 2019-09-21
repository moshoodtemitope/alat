import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink} from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import {history} from '../../_helpers/history';
import {profile} from '../../redux/constants/profile/profile-constants';
import { connect } from 'react-redux';
import { getContactDetails } from "../../redux/actions/profile/profile-action";
import moment from 'moment';
import { Switch } from '../../shared/elements/_toggle';
import AlatPinInput from '../../shared/components/alatPinInput';

var profileMenuStore = {}
var residentialAddress = null;
var allStatesInfo = null;
var allCityData = null;
var localGov2 = null;
var localGov1 = null;
var theState = null;
var theCity = null;
class ResidentialAddress extends Component {
   constructor(props){
       super(props);
       this.state = {
        user: JSON.parse(localStorage.getItem("user")),
 
        LocalGv: null,
        StateOfOrigin: null,

        Nationality: null,
        PlaceOfBirth: null, 

        apartment: null,
        houseNumber: null,
        street: null,
        busStop: null,
        personalAddress: null,

        NationalityValidity: false, 
        StateOfOriginValidity: false, 

        LocalGovValidity: false, 

        PlaceOfBirthValidity: false,
        houseNumberValidity: false,
        apartmentValidity: false,
        busstopValidity: false,
        streetValidity: false,
        personalAddressValidity: false,


        cityStores: null,
        localGvId: null,

        stateGvId: null,

        isBvNLinked: false,
        isProfileInformation: false,
        isContactDetails: false,
        isDocument: false,
        navToNextOfKin: false,
        isImageUploaded: false,
        Pin:"",
        isPinInvalid: false,

       }

       this.fetchContactDetails();
       this.GetResidentialAddress();
   }

   componentDidMount = () => {
       this.CheckIfStoreInformationIsSet();
       this.setProfile();
   }

   GetResidentialAddress = () => {
    this.props.dispatch(actions.GetResidentialAddress(this.state.user.token));
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

   fetchContactDetails(){
        const { dispatch } = this.props;
        dispatch(getContactDetails(this.state.user.token));
   };


   checkIfUserInputsAreValid = () => {
       let result = 'valid';
            for(let x in this.state){
                switch(x){
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
                                result = null;
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
                }
            }
            
            console.log(result);
            return result;
   }

   
   InitiateNetworkCall = () => {
      let data = {
                    "street": this.state.street,
                    "town": parseInt(this.state.localGvId),
                    "landmark": this.state.busStop,
                    "buildingNo": this.state.houseNumber,
                    "apartment": this.state.apartment,
                    "stateId": parseInt(this.state.stateGvId),
                    "lgaId": parseInt(this.state.localGvId),
                    "lcdaId": parseInt(this.state.localGvId),
                    "isReactivation": false,
                    "address": this.state.personalAddress
                 }
                 console.log(data);
                //  return;
      this.props.dispatch(actions.addResidentialAddress(this.state.user.token, data));
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

   HandleSubmit = (event) => {
       event.preventDefault();
      
       
       this.checkLocalGovValidity(); 
       this.checkPlaceOfBirthValidity();
       this.checkNationalityValidity(); 
       this.checkStateOfOriginValidity();

       this.checkDateOfBirthValidity();
       this.checkApartmentValidity();
       this.checkHouseNumberValidity();
       this.checkPersonalAddressValidity();
       this.checkBusstopValidity();
       this.checkStreetValidity();

       switch(this.checkIfUserInputsAreValid()){
           case null:
             console.log('Empty value was found');
             break;
           case 'valid': 
             console.log("No Empty Value Found");
             this.InitiateNetworkCall();
             break;
       }
    }


    SetInputValue = (e) => {
        let {name, value} = e.target;
        this.setState({
            [name]: value
        });
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
        if(this.state.Nationality == null || this.state.Nationality == "" || this.state.Nationality == "Select Country"){
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

 StoreInforMation = () => {
    console.log('INFO SOMETHING WAS FIRED LET SEE WHATS IT IS');
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
        const {isImageUploaded,  LocalGovValidity, PlaceOfBirthValidity,  NationalityValidity, StateOfOriginValidity,
         streetValidity, busstopValidity, apartmentValidity, personalAddressValidity, 
          houseNumberValidity,   isBvNLinked, isProfileInformation, isContactDetails, isDocument, navToNextOfKin} = this.state;
        const {GetResidentialAddress, profileMenu, getContactDetail } = this.props;
        
        if(GetResidentialAddress.message === profile.GET_RESIDENTIAL_ADDRESS_SUCCESS)
             this.ChangeResidentialStatus();

        if(getContactDetail.message === profile.GET_CONTACT_DETAILS_PENDING){
            console.log('NOTHING EVER HAPPENED HERE')
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
                    <p className="loading-info">Loading data ...</p>
                    </div>
                    </div>
                    </div>
                    {/* </InnerContainer> */}
                </Fragment>      
            )
        }
 
        if(getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && profileMenu.message === profile.GET_PROFILE_MENU_SUCCESS){
            this.UseGottenStateInfo();
            // this.StoreLocationInformation();
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
                                                    <p className="formHeading">Residential Address</p>
                                                    <div className="form-row">
                                                            <div className={houseNumberValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                            <label className="label-text">House Number</label>
                                                                            <input type="text" name="houseNumber" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="house number"/>
                                                                    
                                                            </div>

                                                            <div className={apartmentValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                            <label className="label-text">Apartment</label>
                                                                            <input type="text" name="apartment" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder=""/>
                                                            </div>
                                                        
                                                    </div>
                                                    <div className="form-row">
                                                                <div className={streetValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Streat / Compound Name</label>
                                                                    <input type="text" name="street" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder=""/>
                                                                </div>
                                                    </div>
                                                    <div className="form-row">
                                                                <div className={busstopValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Nearest Bustop</label>
                                                                    <input type="text" name="busStop" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder=""/>
                                                                </div>
                                                    </div>

                                                    <div className="form-row">
                                                                <div className={personalAddressValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                                    <label className="label-text">Address</label>
                                                                    <input type="text" name="personalAddress" className="form-control input-border-radius" onChange={this.SetInputValue} placeholder="Address"/>
                                                                </div>
                                                    </div>

                                                    <div className="form-row">
                                                                <div className={NationalityValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">Country</label>

                                                                    <select name="Nationality" onChange={this.SetInputValue} className="form-control input-border-radius">
                                                                            <option value="Select Country">Select Country</option>

                                                                       <option value="Nigeria" >Nigeria</option>
                                                                    </select>
                                                                    {/* <input type="text" name="Nationality" className="form-control" onChange={this.SetInputValue} placeholder="Nationality"/> */}
                                                                </div>

                                                                <div className={StateOfOriginValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">State</label>
                                                                    <select name="StateOfOrigin" className="form-control input-border-radius" onChange={this.SetInputValue5}>
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
                                                                    <select onChange={this.SetInputValue4} name="LocalGv" className="height-39 input-border-radius" >
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

                                                                <div className={PlaceOfBirthValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                    <label className="label-text">City</label>
                                                                    <select onChange={this.SetInputValue4} name="PlaceOfBirth" className="form-control enter-city" onChange={this.SetInputValue}>
                                                                            <option>Select City Government</option>
                                                                            {                                      
                                                                                getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && 
                                                                                getContactDetail.data.response.cities.map(city=> {
                                                                                    return <option  value={city.name}>
                                                                                    {city.name}</option>
                                                                                })
                                                                            } 
                                                                    </select>
                                                                </div>
                                                    </div>

                                                    <div className="align-button">
                                                    <button disabled={this.props.addContactDetails.message === profile.POST_CONTACT_DETAILS_PENDING} type="submit" className="twoBut no-border">
                                                    {this.props.addContactDetails.message === profile.POST_CONTACT_DETAILS_PENDING ? "Processing..." :"Submit"}
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

        if(getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && profileMenu.message === profile.GET_PROFILE_MENU_PENDING){
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
                    <p className="loading-info">Loading data Contact Details...</p>
                    </div>
                    </div>
                    </div>
                 
                </Fragment>  
            );    
        }

        if(getContactDetail.message === profile.GET_CONTACT_DETAILS_SUCCESS && profileMenu.message === profile.GET_PROFILE_MENU_FAILURE){
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
                    <p>Please Check Your Network ...</p>
                    </div>
                    </div>
                    </div>
                 
                </Fragment>  
            );    
        }

        if(getContactDetail.message == undefined){
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
                    <p className="loading-info">Loading data Contact Details...</p>
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
                    <p className="loading-info">Loading Profile data...</p>
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
        getContactDetail:state.getContactDetail,
        alert:state.alert,
        addContactDetails:state.addContactDetails,
        GetResidentialAddress: state.GetResidentialAddress
    }
}

export default connect(mapStateToProps)(ResidentialAddress);








































