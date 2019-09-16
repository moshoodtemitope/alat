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
       console.log(name);
       console.log(event.target.files[0]);

       this.setState({[name]: event.target.files[0]});
   }

   SubmitDocuments = () => {
       let payload = {
           DocumentType: 'signature',
           File: this.state.file3
       }
       
       console.log(payload)
    //    return;
       this.props.dispatch(actions.addDocuments(payload(this.state.user.token, payload)));
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

   render(){
      const {isBvNLinked,navToNextOfKin, isProfileInformation, isContactDetails, isDocument, idTypeValidity, idFrontFace, idCardValidity, idCardNumberValidity} = this.state;
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
                                                            <input name="file3" type="file" id="file-upload3"  onChange={this.HandleFileUpLoad}/>
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
}

function mapStateToProps(state) {
    return {
        profileMenu: state.profileMenu
    }
}

export default connect(mapStateToProps)(SignatureUpload);