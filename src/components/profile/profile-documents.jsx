import React, { Component } from 'react';
import "./profile.css"; 
import DatePicker from "react-datepicker";
// import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import * as actions from '../../redux/actions/profile/profile-action';
import {history} from '../../_helpers/history';
import {connect} from 'react-redux';
import {profile} from '../../redux/constants/profile/profile-constants';
import moment from 'moment';


class ProfileDocuments extends Component {
   constructor(props){
       super(props);
       this.state = {
          user: JSON.parse(localStorage.getItem("user")),
          file1: null,
          file2: null,
          file3: null,

          photoGraphUploadValidity: false, 
          signatureValidity: false, 
          idCardValidity: false,

          isBvNLinked: false,
          isProfileInformation: false,
          isContactDetails: false,
          isDocument: false,
          navToNextOfKin: false,
          isImageUploaded: false
       }
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


   checkPhotoGraphUploadValidity = () => {
       if(this.state.file1 == null || this.state.file1 == ""){
           this.setState({photoGraphUploadValidity: true});
       }else{
           this.setState({photoGraphUploadValidity: false});
       }
   }

   checkSignatureValidity = () => {
        if(this.state.file2 == null || this.state.file2 == ""){
            this.setState({signatureValidity: true});
        }else{
            this.setState({signatureValidity: false});
        }
   }
   
   checkIdCardValidity = () => {
        if(this.state.file3 == null || this.state.file3 == ""){
            this.setState({idCardValidity: true});
            console.log('CODE NEVER RAN2')
        }else{
            console.log('CODE NEVER RAN1')
            this.setState({idCardValidity: false});
        }

        console.log('CODE NEVER RAN')
   }


   checkValidity = () => {
       let result = 'valid';
       for(let x in this.state){
           switch(x){
               case 'file1':
                    if(this.state[x] == null || this.state[x] == ""){
                        console.log(this.state[x]);
                        result = null;
                        break;
                    }
               case 'file2':
                    if(this.state[x] == null || this.state[x] == ""){
                        console.log(this.state[x]);
                        result = null;
                        break;
                    }
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

   HandleFileUpLoad = (event) => {
       let name = event.target.name;
       console.log(name);
       console.log(event.target.files[0]);
    //    return;
       this.setState({[name]: event.target.value});
   }

   SubmitDocuments = () => {
       let payload = {
          file1: this.state.file1,
          file2: this.state.file2,
          file2: this.state.file3
       }
            
       this.props.dispatch(addDocuments(payload(this.state.user.token, payload)));
   }


   HandleSubmit = (event) => {
        event.preventDefault();

        this.checkIdCardValidity();
        this.checkSignatureValidity(); 
        this.checkPhotoGraphUploadValidity();
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

   NavigateToUploadPicture = () => {
       history.push("/profile/profile-upload-photograph");
   }

   NavigateToUploadSignature = () => {
       history.push("/profile/profile-signature-upload");
   }

   NavigateToDocumentUpload = () => {
       history.push("/profile/profile-identiy-card");
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
      const {isImageUploaded, isBvNLinked,navToNextOfKin, isProfileInformation, isContactDetails, isDocument, photoGraphUploadValidity, signatureValidity, idCardValidity} = this.state;

      if(this.props.profileMenu.message == undefined){
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

      if(this.props.profileMenu.message === profile.GET_PROFILE_MENU_SUCCESS){
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
                                                            <li>Pin Management</li>
                                                            <li>Security Questions</li>
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
                                               <p className="formHeading">Documents</p>
                                               <div className="form-row">
                                                    <div className={photoGraphUploadValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label htmlFor="file-upload1" onClick={this.NavigateToUploadPicture}>Photograph</label>
                                                            {/* <input type="file" name="file1" id="file-upload1" readOnly onClick={this.NavigateToUploadPicture} onChange={this.PreventDefault}/> */}
                                                    </div>
                                               </div>
    
                                               <div className="form-row">
                                                    <div className={signatureValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                                <label htmlFor="file-upload2" onClick={this.NavigateToUploadSignature}>Signature</label>
                                                                {/* <input name="file2" type="file" id="file-upload2"  onChange={this.HandleFileUpLoad}/> */}
                                                    </div>
                                               </div>
    
                                               <div className="form-row">
                                                    <div className={idCardValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                                <label htmlFor="file-upload3" onClick={this.NavigateToDocumentUpload}>Identity Card</label>
                                                                {/* <input name="file3" type="file" id="file-upload3"  onChange={this.HandleFileUpLoad}/> */}
                                                    </div>
                                               </div>
                                               
                                               <div className="align-buttons">
                                                    <button type="submit" className="twoBut no-border">Submit</button>
                                                </div>
                                        </form>
                                        
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
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
                <p className="loading-info">Loading Profile Information...</p>
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
                <p className="loading-info">Please Check Your Internet Connection...</p>
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
        profileMenu: state.profileMenu
    }
}

export default connect(mapStateToProps)(ProfileDocuments);