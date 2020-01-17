import React, { Component } from 'react';
import "./profile.css"; 
import DatePicker from "react-datepicker";
// import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import InnerContainer from '../../shared/templates/inner-container';
import * as actions from '../../redux/actions/profile/profile-action';
import { connect } from 'react-redux';
import {profile} from '../../redux/constants/profile/profile-constants';
import moment from 'moment';
import {history} from '../../_helpers/history';
import CompletedprofileImage from '../../assets/img/selected.svg';
import NotCompletedprofileImage from '../../assets/img/unsuccessfull.svg'


var profileMenuStore = {}
class PhotographUpload extends Component {
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
          idPhotographValid: false,

          isBvNLinked: false,
          isProfileInformation: false,
          isContactDetails: false,
          isDocument: false,
          isToNextOfKin: false,
          navToNextOfKin: false,
          isImageUploaded: false,
          residentialAddress: false,
          photoUploadLabel: "Upload",
          photoUploadStatus: false
       }

       this.GetResidentialAddress();
   }

   componentDidMount = () => {
    this.CheckIfStoreInformationIsSet();
    this.setProfile();
    this.checkProfileuploads();
   }

   GetResidentialAddress = () => {
    this.props.dispatch(actions.GetResidentialAddress(this.state.user.token));
    }

    checkProfileuploads=()=>{
        this.props.dispatch(actions.checkProfileUploads(this.state.user.token));
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
      
    //    return;

    var reader = new  FileReader();

        reader.onload = function(e){
            document.querySelector('#signatureUploadTemp').style.background = `url(${e.target.result})`;
            document.querySelector('#signatureUploadTemp').style.backgroundSize = `cover`;
            document.querySelector('#signatureUploadTemp').style.backgroundRepeat = `no-repeat`;
            document.querySelector('#signatureUploadTemp').style.backgroundPosition = `center center`;
           
        }
        reader.readAsDataURL(document.querySelector('#file-upload3').files[0]);
        this.setState({photoUploadLabel:'Change Upload', photoUploadStatus: true});
        
       this.setState({file3: event.target.files[0]});
   }
   
   NavigateResidentialAddress = () => {
    if(this.props.GetResidentialAddress.message === profile.GET_RESIDENTIAL_ADDRESS_SUCCESS){
        this.DispatchSuccessMessage('Residential Address has been Created');
        return
    }

    history.push('/profile/profile-residential-address');
}

    SubmitDocuments = () => {
        const formData = new FormData()
        formData.append('DocumentType', "Passport")
        formData.append('File', this.state.file3,this.state.file3.name)
        // console.log(formData);
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

renderPhotoForm =()=>{
    let checkedProfileResponse =  this.props.checkProfileUploads;   
    let addDocumentsRequest = this.props.addDocuments;
    const {residentialAddress, isImageUploaded, isBvNLinked,navToNextOfKin, isProfileInformation, isContactDetails, isDocument, isToNextOfKin, idTypeValidity, idFrontFace, idPhotographValid, idCardNumberValidity} = this.state;
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
                        {addDocumentsRequest.message !== profile.DOCUMENTS_SUCCESS &&
                            <div>
                                <p className="formHeading">Passport Upload</p>
                                <div className="form-row">
                                    <div className={idPhotographValid ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                    {(profileStatusData.Passport === "No") &&
                                        <p className="upLoadDiscription">Upload a picture of your face in a well lit place with your ears clearly visible</p>
                                    }   

                                    {profileStatusData.Passport === "No" &&
                                        <div className="signatureUploadTemp" id="signatureUploadTemp">
                                            <label htmlFor="file-upload3" className={this.state.photoUploadStatus === true ? "activated-label resizeLabel" : "resizeLabel"}>{this.state.photoUploadLabel}</label>
                                            {/* <ImageUploader
                                                                    withIcon={true}
                                                                    singleImage={true}
                                                                    withPreview={true}
                                                                    label='Upload your Photograph'
                                                                    className="selfieBtn"
                                                                    buttonText='Choose image'
                                                                    onChange={this.HandleFileUpLoad}
                                                                    imgExtension={['.jpg', '.png', '.jpeg']}
                                                                    maxFileSize={5242880}
                                                                /> */}
                                            <input name="file3" accept="image/*" type="file" id="file-upload3" onChange={this.HandleFileUpLoad} />
                                     </div>
                                    } 

                                    {profileStatusData.Passport === "Yes" &&
                                        <div className="signatureUploadTemp" id="signatureUploadTemp">
                                            <label htmlFor="file-upload3"className="completedupload resizeLabel">
                                            <img className="doneIcon" src={CompletedprofileImage} alt="" />Uploaded
                                                
                                            </label>
                                           
                                            
                                     </div>
                                    } 
                                        
                                        
                                    </div>
                                </div>

                                {profileStatusData.Passport === "No" &&
                                    <div className="align-buttons">
                                        <button type="submit"
                                            disabled={addDocumentsRequest.is_processing}
                                            className="twoBut no-border"
                                        >{addDocumentsRequest.is_processing ? "Please wait..." : "Submit"}</button>
                                    </div>
                                }

                                {(addDocumentsRequest.is_processing === false || addDocumentsRequest.is_processing === undefined) &&
                                    <div className="back-cta text-center">
                                        <Link className="" to="/profile/profile-documents">Back</Link>
                                    </div>
                                }
                            </div>
                        }

                        {
                            addDocumentsRequest.message === profile.DOCUMENTS_SUCCESS &&
                            <div className="info-label success upload-alert">Successfully Uploaded signature</div>
                        }

                        {
                            addDocumentsRequest.message === profile.DOCUMENTS_FAILURE &&
                            <div className="info-label error upload-alert">{addDocumentsRequest.data}</div>
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
      const {residentialAddress, isImageUploaded, isBvNLinked,navToNextOfKin, isProfileInformation, isContactDetails, isDocument, isToNextOfKin, idTypeValidity, idFrontFace, idPhotographValid, idCardNumberValidity} = this.state;
      
      if(this.props.GetResidentialAddress.message === profile.GET_RESIDENTIAL_ADDRESS_SUCCESS)
             this.ChangeResidentialStatus();

      if(this.props.profileMenu.message === profile.GET_PROFILE_MENU_SUCCESS){
          let addDocumentsRequest = this.props.addDocuments;
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
                                        
                                           {this.renderPhotoForm()}
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

      if(this.props.profileMenu.message === profile.GET_PROFILE_MENU_PENDING){
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
    return{
        profileMenu: state.profileMenu,
        alert:state.alert,
        GetResidentialAddress: state.GetResidentialAddress,
        checkProfileUploads: state.checkProfileUploads,
        addDocuments: state.addDocuments,
    }
}

export default connect(mapStateToProps)(PhotographUpload);
























































