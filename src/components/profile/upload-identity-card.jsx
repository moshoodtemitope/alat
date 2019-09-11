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
          idCardValidity: false
       }
   }

   SetBirthDay = (birthDate) => {
        this.setState({
            birthDate: birthDate
        });
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
               case 'idCardType':
                    if(this.state[x] == null || this.state[x] == ""){
                        console.log(this.state[x]);
                        result = null;
                        break;
                    }
               case 'idCardNumber':
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

   HandleSelectedCardType = (event) => {
       this.setState({idCardType: event.target.value});
   }

   HandleFileUpLoad = (event) => {
       let name = event.target.name;
       console.log(name);
       console.log(event.target.files[0]);
    //    return;
       this.setState({[name]: event.target.files[0]});
   }

   SubmitDocuments = () => {
       let payload = {
          DocumentType: 'identity',
          IdentityType: this.state.idCardType,
          IdentificationNumber: this.state.idCardNumber,
          File: this.state.file2,
          BackFile: this.state.file3
       }

       console.log(payload);
       return;
       this.props.dispatch(addDocuments(payload(this.state.user.token, payload)));
   }


   HandleSubmit = (event) => {
        event.preventDefault();

        this.checkIdCardValidity();
        this.checkidFrontFace(); 
        this.checkidTypeValidity();
        // this.checkBirthDateValidity();
        this.checkIdCardNumberValidity();
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
      const { isBvNLinked,navToNextOfKin, isProfileInformation, isContactDetails, isDocument, birthDate, birthDateValidity, idTypeValidity, idFrontFace, idCardValidity, idCardNumberValidity} = this.state;
       return(
        <Fragment>
             <InnerContainer>
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
                                    <div className="col-sm-6">
                                    <form onSubmit={this.HandleSubmit} className="parentForm docUpLoadFormProfile">
                                           <p className="formHeading">Identity Card Details</p>
                                           <div className="form-row">
                                                <div className={idTypeValidity ? "form-group form-error col-md-11" : "form-group col-md-11"}>
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

                                                {/* <div className={birthDateValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <p id="dateOfIssuance">Date of Issuance</p>
                                                        <DatePicker className="form-control" selected={birthDate} 
                                                        placeholder="June 31, 2019"
                                                        dateFormat=" MMMM d, yyyy"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        onChange={this.SetBirthDay}
                                                        dropdownMode="select"
                                                        />
                                                </div> */}
                                           </div>
                                           <div className="form-row">
                                                <div className={idCardNumberValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                        <label className="profileOtherLabel">Identity Card number</label>
                                                        <input type="text" name="idCardNumber" id="file-upload1" onChange={this.GetIdCardInputs}/>
                                                </div>
                                           </div>

                                           <div className="form-row upload-identity">
                                                <div className={idFrontFace ? "form-group form-error col-sm-5" : "form-group col-sm-5"}>
                                                        <p className="hdStyle">Identity Card Front</p>
                                                        <div className="inlineCardsProfile">
                                                            
                                                            <label htmlFor="file-upload2" className="forIdentityCards">Upload</label>
                                                            <input name="file2" type="file" id="file-upload2"  onChange={this.HandleFileUpLoad}/>
                                                        </div>
                                                </div>

                                                <div className={idCardValidity ? "form-group form-error col-md-5" : "form-group col-md-5"}>
                                                        <p className="hdStyle">Identity Card Back</p>
                                                        <div className="inlineCardsProfile">
                                                             
                                                            <label htmlFor="file-upload3" className="forIdentityCards">Upload</label>
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
                 </InnerContainer>
        </Fragment>
       )
   }
}

const mapStateToProps = (state) => {
    return {
        profileMenu: state.profileMenu
    }
}

export default connect(mapStateToProps)(IdentityCardUpload);