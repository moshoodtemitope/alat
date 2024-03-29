import React, { Component } from 'react';
import "./profile.css"; 
import DatePicker from "react-datepicker";
// import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import * as actions from '../../redux/actions/profile/profile-action';
import {connect} from 'react-redux';
import {profile} from '../../redux/constants/profile/profile-constants';
import moment from 'moment';
import {history} from '../../_helpers/history';
import CompletedprofileImage from '../../assets/img/selected.svg';
import NotCompletedprofileImage from '../../assets/img/unsuccessfull.svg'


var profileMenuStore = {}
class IdentityCardUpload extends Component {
   constructor(props){
       super(props);
       this.state = {
          user: JSON.parse(localStorage.getItem("user")),
          file1: null,
          file2: null,
          file3: null,

          idCardType: null,
          idCardNumber: null,
          birthDate: null, 

          idCardNumberValidity: false,
          idTypeValidity: false, 
          idFrontFace: false, 
          idCardValidity: false,
          isImageUploaded: false,
          residentialAddress: false,

          isBvNLinked: false, navToNextOfKin: false,
          isProfileInformation: false, 
          isContactDetails: false, 
        //   isToNextOfKin: false,
          isDocument: false, 
          isToNextOfKin: false,
          frontPhotoLabel: "Upload",
          photoFrontStatus: false,
          backPhotoLabel: "Upload",
          photoBackStatus: false
       }

       this.GetResidentialAddress();
   }

   SetBirthDay = (birthDate) => {
        this.setState({
            birthDate: birthDate
        });
   }

   componentDidMount = () => {
        this.CheckIfStoreInformationIsSet();

        this.setProfile();
        this.checkProfileuploads();
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
 
//    checkBirthDateValidity  = () => {
//         if(this.state.file1 == null || this.state.file1 == ""){
//             this.setState({idTypeValidity: true});
//         }else{
//             this.setState({idTypeValidity: false});
//         }
//    }

   checkidTypeValidity = () => {
       if(this.state.idCardType == null || this.state.idCardType == ""){
           this.setState({idTypeValidity: true});
       }else{
           this.setState({idTypeValidity: false});
       }
   }

    checkProfileuploads=()=>{
        this.props.dispatch(actions.checkProfileUploads(this.state.user.token));
    }

   checkIdCardNumberValidity = () => {
        if(this.state.idCardNumber == null || this.state.idCardNumber == ""){
            this.setState({idCardNumberValidity: true});
        }else{
            this.setState({idCardNumberValidity: false});
        }
   }

   checkidFrontFace = () => {
        if(this.state.file2 == null || this.state.file2 == ""){
            this.setState({idFrontFace: true});
        }else{
            this.setState({idFrontFace: false});
        }
   }
   
   checkIdCardValidity = () => {
        if(this.state.file3 == null || this.state.file3 == ""){
            this.setState({idCardValidity: true});
            // console.log('CODE NEVER RAN2')
        }else{
            // console.log('CODE NEVER RAN1')
            this.setState({idCardValidity: false});
        }

        // console.log('CODE NEVER RAN')
   }


   checkValidity = () => {
       let result = 'valid';
       for(let x in this.state){
           switch(x){
               case 'idCardType':
                    if(this.state[x] == null || this.state[x] == ""){
                        // console.log(this.state[x]);
                        result = null;
                        break;
                    }
               case 'idCardNumber':
                    if(this.state[x] == null || this.state[x] == ""){
                        // console.log(this.state[x]);
                        result = null;
                        break;
                    }
               case 'file2':
                    if(this.state[x] == null || this.state[x] == ""){
                        // console.log(this.state[x]);
                        result = null;
                        break;
                    }
               case 'file3':
                    if(this.state[x] == null || this.state[x] == ""){
                        // console.log(this.state[x]);
                        result = null;
                        break;
                    }
           }
       }

    //    console.log(result);
       return result;
   }

   HandleSelectedCardType = (event) => {
       this.setState({idCardType: event.target.value});
   }

   HandleFileUpLoad = (event) => {
       let name = event.target.name;
    //    console.log(name);
    //    console.log(event.target.files[0]);
    //    return;

    var reader = new  FileReader();

    if(name==="file2"){
        reader.onload = function(e){
        
                document.querySelector('#frontface-preview').style.background = `url(${e.target.result})`;
                document.querySelector('#frontface-preview').style.backgroundSize = `cover`;
                document.querySelector('#frontface-preview').style.backgroundRepeat = `no-repeat`;
                document.querySelector('#frontface-preview').style.backgroundPosition = `center center`;
            
            
        
        }
        reader.readAsDataURL(document.querySelector('#file-upload2').files[0]);
        this.setState({frontPhotoLabel:'Change Upload', photoFrontStatus: true});
    }
    if(name==="file3"){
        reader.onload = function(e){
        
                document.querySelector('#backface-preview').style.background = `url(${e.target.result})`;
                document.querySelector('#backface-preview').style.backgroundSize = `cover`;
                document.querySelector('#backface-preview').style.backgroundRepeat = `no-repeat`;
                document.querySelector('#backface-preview').style.backgroundPosition = `center center`;
            
            
        
        }
        reader.readAsDataURL(document.querySelector('#file-upload3').files[0]);
        this.setState({backPhotoLabel:'Change Upload', photoBackStatus: true});
    }
    
    // 
       this.setState({[name]: event.target.files[0]});
   }

   SubmitDocuments = () => {
    //    let payload = {
    //       DocumentType: 'Identity',
    //       IdentityType: this.state.idCardType,
    //       IdentificationNumber: this.state.idCardNumber,
    //       File: this.state.file2,
    //       BackFile: this.state.file3
    //    }

       let formData = new FormData();
       formData.append('DocumentType', 'Identity');
       formData.append('BackFile', this.state.file3, this.state.file3.name);
       formData.append('File', this.state.file2, this.state.file2.name);
       formData.append('IdentificationNumber', this.state.idCardNumber);
       formData.append('IdentityType', this.state.idCardType);

    //    console.log(formData);

    //    return; 
    //    this.props.dispatch(actions.addDocuments(this.state.user.token, formData));
       this.asynAddRequest(this.state.user.token, formData)
            .then(()=>{

                if(this.props.addDocuments.message === profile.DOCUMENTS_SUCCESS){
                                                    
                                                    
                    setTimeout(() => {
                        this.props.dispatch(actions.addDocuments(this.state.user.token, "CLEAR"))
                    }, 2000);
                }
                
            })
   }

    asynAddRequest = async (token, data)=>{
        const {dispatch} = this.props;

        await  dispatch(actions.addDocuments(token, data));
    }


   HandleSubmit = (event) => {
        event.preventDefault();

        this.checkIdCardValidity();
        this.checkidFrontFace(); 
        this.checkidTypeValidity();
        // this.checkBirthDateValidity();
        this.checkIdCardNumberValidity();
        // console.log("code Got here");

        switch(this.checkValidity()){
            case null: 
                // console.log('Empty Field Found');
                break;
            case 'valid': 
                // console.log('No Empty Field Found');
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

NavigateResidentialAddress = () => {
    if(this.props.GetResidentialAddress.message === profile.GET_RESIDENTIAL_ADDRESS_SUCCESS){
        this.DispatchSuccessMessage('Residential Address has been Created');
        return
    }

    history.push('/profile/profile-residential-address');
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

renderIdForm =()=>{
    let checkedProfileResponse =  this.props.checkProfileUploads;   
    let addDocumentsRequest = this.props.addDocuments;
    const {residentialAddress, isImageUploaded, isBvNLinked,navToNextOfKin, isProfileInformation, isContactDetails, isDocument, isToNextOfKin, birthDate, birthDateValidity, idTypeValidity, idFrontFace, idCardValidity, idCardNumberValidity} = this.state;
    switch (checkedProfileResponse.message){
        case (profile.CHECK_PROFILE_UPLOADS_PENDING):
            return(
                <div className="parentForm text-center">
                    Please wait...
                </div>
            )
        case (profile.CHECK_PROFILE_UPLOADS_SUCCESS):
            let profileStatusData = checkedProfileResponse.data.response.ResponseDict
            return(
                <div>
                    <form onSubmit={this.HandleSubmit} className="parentForm docUpLoadFormProfile">
                    <p className="formHeading">Identity Card Details</p>
                        {addDocumentsRequest.message !== profile.DOCUMENTS_SUCCESS &&
                            <div>
                                {(profileStatusData['Identity Back'] === "No" || profileStatusData.Identity === "No") &&
                                    <div>
                                        <div className="form-row">
                                            <div className={idTypeValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                <label className="profileOtherLabel">Select Id Type</label>
                                                <select onChange={this.HandleSelectedCardType} className="select-identity">
                                                    <option value="International Passport">International Passport</option>
                                                    <option value="Drivers License">Drivers License</option>
                                                    <option value="NIMC">NIMC</option>
                                                    <option value="Permanent Voters Card">Permanent Voters Card</option>
                                                    <option value="School id">School id</option>
                                                    <option value="Nysc id">Nysc id</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                            </div>


                                        </div>
                                        <div className="form-row">
                                            <div className={idCardNumberValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                <label className="profileOtherLabel">Identity Card number</label>
                                                <input type="text" name="idCardNumber" id="file-upload1" onChange={this.GetIdCardInputs} />
                                            </div>
                                        </div>
                                    </div>
                                }

                                <div className="form-row upload-identity">
                                    <div className={idFrontFace ? "form-group form-error col-sm-5" : "form-group col-sm-5"}>
                                        <p className="hdStyle">Identity Card Front</p>
                                        {profileStatusData.Identity === "Yes" &&
                                            <div className="inlineCardsProfile" id="frontface-preview">

                                                <label htmlFor="file-upload2" className="completedupload">
                                                    <img className="doneIcon" src={CompletedprofileImage} alt="" />Uploaded
                                        </label>

                                            </div>
                                        }
                                        {profileStatusData.Identity === "No" &&
                                            <div className="inlineCardsProfile" id="frontface-preview">

                                                <label htmlFor="file-upload2" className={this.state.photoFrontStatus === true ? "activated-label forIdentityCards" : "forIdentityCards"}>{this.state.frontPhotoLabel}</label>
                                                <input accept="image/*" name="file2" type="file" id="file-upload2" onChange={this.HandleFileUpLoad} />
                                            </div>
                                        }
                                    </div>

                                    <div className={idCardValidity ? "form-group form-error col-md-5" : "form-group col-md-5"}>
                                        <p className="hdStyle">Identity Card Back</p>




                                        {profileStatusData['Identity Back'] === "Yes" &&
                                            <div className="inlineCardsProfile" id="backface-preview">

                                                <label htmlFor="file-upload3" className="completedupload">
                                                    <img className="doneIcon" src={CompletedprofileImage} alt="" />Uploaded
                                            </label>

                                            </div>
                                        }
                                        {profileStatusData['Identity Back'] === "No" &&
                                            <div className="inlineCardsProfile" id="backface-preview">

                                                <label htmlFor="file-upload3" className={this.state.photoBackStatus === true ? "activated-label forIdentityCards" : "forIdentityCards"}>{this.state.backPhotoLabel}</label>
                                                <input accept="image/*" name="file3" type="file" id="file-upload3" onChange={this.HandleFileUpLoad} />
                                            </div>
                                        }
                                    </div>
                                </div>


                                {(profileStatusData['Identity Back'] === "No" || profileStatusData.Identity === "No") &&
                                <div className="align-buttons">
                                    <button type="submit" 
                                     disabled={addDocumentsRequest.is_processing}
                                     className="twoBut">{addDocumentsRequest.is_processing?"Please wait...":"Submit"}</button>
                                </div>
                                }

                                {(addDocumentsRequest.is_processing===false || addDocumentsRequest.is_processing===undefined) &&
                                    <div className="back-cta text-center">
                                        <Link className="" to="/profile/profile-documents">Back</Link>
                                    </div>
                                }

                            </div>
                        }

                            {
                                addDocumentsRequest.message===profile.DOCUMENTS_SUCCESS &&
                                <div  className="info-label success upload-alert">Successfully Uploaded signature</div>
                            }

                            {
                                addDocumentsRequest.message===profile.DOCUMENTS_FAILURE &&
                                <div  className="info-label error upload-alert m-t-10">{addDocumentsRequest.data.error}</div>
                            }
                    </form>
                </div>
            )
        case (profile.CHECK_PROFILE_UPLOADS_FAILURE):
            return(
                <div className="parentForm text-center">
                    An error occured
                </div>
            )

    }
}


   render(){
      const {residentialAddress, isImageUploaded, isBvNLinked,navToNextOfKin, isProfileInformation, isContactDetails, isDocument, isToNextOfKin, birthDate, birthDateValidity, idTypeValidity, idFrontFace, idCardValidity, idCardNumberValidity} = this.state;
       
      if(this.props.GetResidentialAddress.message === profile.GET_RESIDENTIAL_ADDRESS_SUCCESS)
           this.ChangeResidentialStatus();

       if(this.props.profileMenu.message === profile.GET_PROFILE_MENU_SUCCESS){
        return(
            <Fragment>
                 {/* <InnerContainer> */}
                        <div className="dashboard-wrapper profileWrapper">
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
                                                          {/* <li>Pin Management</li>
                                                          <li>Security Questions</li> */}
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
                                        <div className="col-sm-6">
                                            {this.renderIdForm()}
                                        
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                     {/* </InnerContainer> */}
            </Fragment>
           );
       }
       if(this.props.profileMenu.message === profile.GET_PROFILE_MENU_FAILURE){
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
                <p className="loading-info">Please Check Your Internet Connection ...</p>
                </div>
                </div>
                </div>
                {/* </InnerContainer> */}
            </Fragment>   
          );
      }

       if(this.props.profileMenu.message === profile.GET_PROFILE_MENU_PENDING){
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
                <p className="loading-info">Loading Profile Information ...</p>
                </div>
                </div>
                </div>
                {/* </InnerContainer> */}
            </Fragment>   
          );
      }

      if(this.props.profileMenu.data == undefined){
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
                <p className="loading-info">Loading Profile Information ...</p>
                </div>
                </div>
                </div>
                {/* </InnerContainer> */}
            </Fragment>   
          );
      }
   }
}

const mapStateToProps = (state) => {
    return {
        profileMenu: state.profileMenu,
        alert:state.alert,
        checkProfileUploads: state.checkProfileUploads,
        addDocuments: state.addDocuments,
        GetResidentialAddress: state.GetResidentialAddress
    }
}

export default connect(mapStateToProps)(IdentityCardUpload);

