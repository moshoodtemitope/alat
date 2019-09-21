import React, { Component } from 'react';
import "./profile.css"; 
import DatePicker from "react-datepicker";
// import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import * as actions from '../../redux/actions/profile/profile-action';
import { connect } from 'react-redux';
import {profile} from '../../redux/constants/profile/profile-constants';
import moment from 'moment';
import {history} from '../../_helpers/history';


var profileMenuStore = {}
class SignatureUpload extends Component {
   constructor(props){
       super(props);
       this.state = {
          user: JSON.parse(localStorage.getItem("user")),
          file1: null,
          file2: null,
          file3: null,

          idCardType: null,
          idCardNumber: null,

          idCardNumberValidity: false,
          idTypeValidity: false, 
          idFrontFace: false, 
          idCardValidity: false,

          isBvNLinked: false,
          isProfileInformation: false,
          isContactDetails: false,
          isDocument: false,
          navToNextOfKin: false
       }

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



   checkidFrontFace = () => {
        if(this.state.file2 == null || this.state.file2 == ""){
            this.setState({idFrontFace: true});
        }else{
            this.setState({idFrontFace: false});
        }
   }
   

   checkValidity = () => {
       let result = 'valid';
       for(let x in this.state){
           switch(x){
               case 'file3':
                    if(this.state[x] == null || this.state[x] == ""){
                        console.log(this.state[x]);
                        result = null;
                        break;
                    }
           }
       }

       console.log(result);
       return result;
   }

   HandleSelectedCardType = (event) => {
       this.setState({idCardType: event.target.value});
   }

   HandleFileUpLoad = (event) => {
       let name = event.target.name;
    //    console.log(name);
       console.log(event.target.files[0]);

       this.setState({file3: event.target.files[0]});
   }

   SubmitDocuments = () => {

    const formData = new FormData()
        formData.append('DocumentType', "Signature")
        formData.append('File', this.state.file3, this.state.file3.name)
        console.log(formData);
        // return;
        this.props.dispatch(actions.addDocuments(this.state.user.token, formData));
   }

   HandleSubmit = (event) => {
        event.preventDefault();
        
        console.log("code Got here");

        switch(this.checkValidity()){
            case null: 
                console.log('Empty Field Found');
                break;
            case 'valid': 
                console.log('No Empty Field Found');
                this.SubmitDocuments();
        }
   }

   GetIdCardInputs = (event) => {
       this.setState({idCardNumber: event.target.value});
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
      const {residentialAddress, isBvNLinked,navToNextOfKin, isProfileInformation, isContactDetails, isDocument, idTypeValidity, idFrontFace, idCardValidity, idCardNumberValidity} = this.state;
       
      if(this.props.GetResidentialAddress.message === profile.GET_RESIDENTIAL_ADDRESS_SUCCESS)
             this.ChangeResidentialStatus();

       if(this.props.profileMenu.message === profile.GET_PROFILE_MENU_PENDING){
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
                                   
                                      <p className="loading-info">Loading page ...</p>
                                   </div>
                               </div>
                           </div>
           </Fragment>
          )
       }

       if(this.props.profileMenu.message === profile.GET_PROFILE_MENU_SUCCESS){
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
                                        <div className="col-sm-6">
                                        <form onSubmit={this.HandleSubmit} className="parentForm docUpLoadFormProfile">
                                               <p className="formHeading">Signature Upload</p>
               
                                               <div className="form-row">
                                                    <div className={idCardValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                        <p className="upLoadDiscription">Upload a picture of your signature on a plain white background</p>
                                                        <div className="signatureUploadTemp">
                                                                <label htmlFor="file-upload3" className="resizeLabel">Upload</label>
                                                                <input name="file3" accept="image/*" type="file" id="file-upload3"  onChange={this.HandleFileUpLoad}/>
                                                        </div>
                                                    </div>
                                               </div>
                                               
                                               <div className="align-buttons">
                                                    <button type="submit" className="twoBut">Submit</button>
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

       if(this.props.profileMenu.message === profile.GET_PROFILE_MENU_FAILURE){
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
                                   
                                      <p>Something went wrong ...</p>
                                   </div>
                               </div>
                           </div>
           </Fragment>
          )
       }

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
                                    
                                        <p className="loading-info">Loading Data ...</p>
                                    </div>
                                </div>
                            </div>
            </Fragment>
            )
       }
   }
}

function mapStateToProps(state) {
    return {
        profileMenu: state.profileMenu,
        alert:state.alert,
        GetResidentialAddress: state.GetResidentialAddress
    }
}

export default connect(mapStateToProps)(SignatureUpload);