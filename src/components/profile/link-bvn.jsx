import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import {history} from '../../_helpers/history';
import { connect } from 'react-redux';
import {profile} from '../../redux/constants/profile/profile-constants';
import moment from 'moment';
import CompletedprofileImage from '../../assets/img/selected.svg';
import NotCompletedprofileImage from '../../assets/img/unsuccessfull.svg'

var profileMenuStore = {}
class LinkBvN extends Component {
   constructor(props){
       super(props);
       this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            BVNValidity: false,
            dateValidity: false,
            bvnNumber: null,
            dateValue: null,
            birthDate: null,

            isBvNLinked: false,
            isProfileInformation: false,
            isContactDetails: false,
            isDocument: false,
            navToNextOfKin: false,
            isImageUploaded: false,
            residentialAddress: false,
            residentialAddress: false
       }

       this.GetUserProfileMenu();
       this.GetResidentialAddress();
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

GetUserProfileMenu = () => {
    this.props.dispatch(actions.profileMenu(this.state.user.token));
 }

GetResidentialAddress = () => {
    this.props.dispatch(actions.GetResidentialAddress(this.state.user.token));
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

   SetBVNValidityStatus = () => {
    //   console.log();
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
                            // console.log(x)
                            result = null;
                            break;
                        }else{
                            if(this.state[x].toString().length < 11){
                                // console.log(this.state[x]);
                                result = null;
                                break;
                            }
                        }
                case 'birthDate':
                        if(this.state[x] == null || this.state[x] == ""){
                            // console.log(x)
                            result = null;
                            break;
                        }
            }
        }

    //    console.log(result);
       return result;
   }

   InitiateNetworkCall = () => {
       let data = {
           bvn: this.state.bvnNumber,
           channelId: 2,
           dob: moment(this.state.birthDate).format("MMMM,DD,YYYY"),
           phoneNo: this.state.user.phoneNo,
           isOnBoarding: false
       }

    //    console.log(data)
    //    return;
       this.props.dispatch(actions.linkBVN(this.state.user.token, data));
   }

   SetBvNNumber = (event) => {
       this.setState({bvnNumber: event.target.value});
   }

   SetBirthDay = (birthDate) => {
    //    console.log(birthDate + " " + "ududududu");
        this.setState({
            birthDate: birthDate
        }, () => {
            // console.log(this.state.birthDate);
        });

        // console.log("fififififif");
   }

   HandleSubmit = (event) => {
       event.preventDefault();
       this.SetDateValidity();
       this.SetBVNValidityStatus();

    //    console.log('was fired');

       switch(this.checkValidity()){
           case null:
            //  console.log('Empty value was found');
             break;
           case 'valid': 
            //  console.log("No Empty Value Found");
             this.InitiateNetworkCall();
             break;
       }
   }

   DispatchSuccessMessage = (data) => {
        this.props.dispatch(actions.profileSuccessMessage(data));
   }
  
   NavigateToSuccessPage = () => {
        this.DispatchSuccessMessage("BVN Linked Successfully!");
   }
   
   NavigateResidentialAddress = () => {
    if(this.props.GetResidentialAddress.message === profile.GET_RESIDENTIAL_ADDRESS_SUCCESS){
        this.DispatchSuccessMessage('Residential Address has been Created');
        return
    }

    history.push('/profile/profile-residential-address');
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
       const {residentialAddress, isImageUploaded, dateValidity, BVNValidity, birthDate,  isBvNLinked, isProfileInformation, isContactDetails, isDocument, navToNextOfKin} = this.state;

            if(this.props.GetResidentialAddress.message === profile.GET_RESIDENTIAL_ADDRESS_SUCCESS)
                 this.ChangeResidentialStatus();

            if(this.props.profileMenu.data == undefined){
                this.GetUserProfileMenu();
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
                                                <p>Loading Data ...</p>
                                            </div>
                                        </div>
                                        </div>
            
                     </Fragment>
                   )
            }

            if(this.props.profileMenu.message === profile.LINK_BVN_PENDING){
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
                                                <p>Loading Data  ...</p>
                                            </div>
                                        </div>
                                        </div>
            
                     </Fragment>
                   )
            }

            if(this.props.profileMenu.message === profile.LINK_BVN_SUCCESS){
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
                                                <div className="col-sm-6">
                                                <form onSubmit={this.HandleSubmit} className="parentForm">
                                                        <p className="formHeading">Link BVN</p>
                                                        <div className="form-row">
                                                                    <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                                        <label className="label-text">BVN</label>
                                                                        <input type="Number" className="form-control linkBVN input-border-radius" onChange={this.SetBvNNumber} placeholder="0000 0000 0000"/>
                                                                    </div>
                                                        </div>
                                                        
                                                        <div className="form-row">
                                                                <div className={dateValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                                        <label className="label-text">Date of Birth</label>
                                                                        <DatePicker className="form-control linkBVN input-border-radius" selected={birthDate} 
                                                                        placeholder="June 31, 2019"
                                                                        dateFormat="MMMM d, yyyy"
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        onChange={this.SetBirthDay}
                                                                        dropdownMode="select"
                                                                        // minDate={new Date()}
                                                                        />
                                                                        
                                                                </div>
                                                        </div>
                                                        <div className="button-alignment">
                                                                
                                                            <button type="submit" className="twoBut button-size no-border">Back</button>
                                                    
                                                    
                                                            <button disabled={this.props.linkBvn === profile.LINK_BVN_PENDING} type="submit" className="twoBut no-border">
                                                            {this.props.linkBvn === profile.LINK_BVN_PENDING ? "Processing..." :"Submit"}
                                                    </button>
                                                                
                                                        </div>
                                                    </form>
                                                
                                                </div>
                                            </div>
            
                                            
                                                
                                
                                            </div>
                                        </div>
                                        </div>
            
                     </Fragment>
                   )
            }

            if(this.props.profileMenu.message == profile.LINK_BVN_FAILURE){
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
                                                <p>Please Check Your network  ...</p>
                                            </div>
                                        </div>
                                        </div>
                     </Fragment>
                   )
            }

            if(this.props.profileMenu.data != undefined){
                if(this.props.profileMenu.data.response != undefined){
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
                                                    <div className="col-sm-6">
                                                    <form onSubmit={this.HandleSubmit} className="parentForm">
                                                            <p className="formHeading">Link BVN</p>
                                                            <div className="form-row">
                                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                                            <label className="label-text">BVN</label>
                                                                            <input type="Number" className="form-control linkBVN input-border-radius" onChange={this.SetBvNNumber} placeholder="0000 0000 0000"/>
                                                                        </div>
                                                            </div>
                                                            
                                                            <div className="form-row">
                                                                    <div className={dateValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                                            <label className="label-text">Date of Birth</label>
                                                                            <DatePicker className="form-control linkBVN input-border-radius" selected={birthDate} 
                                                                            placeholder="June 31, 2019"
                                                                            dateFormat="MMMM d, yyyy"
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            onChange={this.SetBirthDay}
                                                                            dropdownMode="select"
                                                                            // minDate={new Date()}
                                                                            />
                                                                            
                                                                    </div>
                                                            </div>
                                                            <div className="button-alignment">
                                                                    
                                                                <button type="submit" className="twoBut button-size no-border">Back</button>
                                                        
                                                        
                                                                <button disabled={this.props.linkBvn === profile.LINK_BVN_PENDING} type="submit" className="twoBut no-border">
                                                                {this.props.linkBvn === profile.LINK_BVN_PENDING ? "Processing..." :"Submit"}
                                                        </button>
                                                                    
                                                            </div>
                                                        </form>
                                                    
                                                    </div>
                                                </div>
                
                                                
                                                    
                                    
                                                </div>
                                            </div>
                                            </div>
                
                         </Fragment>
                    );
                }else{
                    // this.GetUserProfileMenu();
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
                                                    <p>wait for it ...</p>
                                                </div>
                                            </div>
                                            </div>
                         </Fragment>
                       )
                }
                
            }
    }
}

const mapStateToProps = (state) => {
    return {
        profileMenu: state.profileMenu,
        profileSuccessMessage: state.profileSuccessMessage.data,
        linkBvn: state.linkBVN.message,
        alert: state.alert,
        GetResidentialAddress: state.GetResidentialAddress
    }
}

export default connect(mapStateToProps)(LinkBvN);
