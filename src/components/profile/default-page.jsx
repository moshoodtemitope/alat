import React, { Component } from 'react';
import "./profile.css";
import {connect} from 'react-redux';
// import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import InnerContainer from '../../shared/templates/inner-container';
import {Fragment} from "react";
import profileMenuIcon from '../../assets/img/profileMenuIcon'
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import {history} from '../../_helpers/history';
// import { profile } from '../../redux/constants/profile/profile-constants'
// import { nextOfKinsRelationship } from '../../redux/reducers/profile-reducer';
// import * as actions from '../redux/actions/profile/profile-action';
import { profile } from '../../redux/constants/profile/profile-constants';

var profileMenuStore = {}
class PersonalDefault extends Component {
   constructor(props){
       super(props);
       this.state = {
          user: JSON.parse(localStorage.getItem("user")),
          userProfile: null,
          isBvNLinked: false,
          isProfileInformation: false,
          isContactDetails: false,
          isDocument: false,
          navToNextOfKin: false
       }

       this.GetUserProfileMenu();
       
   }
   
   componentDidMount = () => {
       
       this.GetProfileMenu();
       this.GetRelationShips();
       this.CheckIfStoreInformationIsSet();
   }

   GetUserProfileMenu = () => {
      this.props.dispatch(actions.profileMenu(this.state.user.token));
   }

   GetRelationShips = () => {
       this.props.dispatch(actions.nextOfKinsRelationship(this.state.user.token));
   }

   GetProfileMenu = () => {
       console.log('pspspspspspsps');
       this.props.dispatch(actions.profileMenu(this.state.user.token));
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

   SetUserProfile = () => {
       let profileMenu = this.props.profileMenu.response;
       this.setState({userProfile: profileMenu});
   }

   CheckIfStoreInformationIsSet = () => {
       if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_SUCCESS){
           this.setState({isProfileInformation: this.props.profileMenu.data.response.personalInfoComplete});
           this.setState({isContactDetails: this.props.profileMenu.data.response.contactDetailsComplete});
           this.setState({isDocument: this.props.profileMenu.data.response.documentUploaded});
           this.setState({navToNextOfKin: this.props.profileMenu.data.response.nextOfKinComplete});
           this.setState({isBvNLinked: this.props.profileMenu.data.response.bvnLinked});
       }
   }

   StoreInforMation = () => {
       profileMenuStore = this.props.profileMenu.data.response;
   }

   render(){
       const {profileMenu, isBvNLinked, isProfileInformation, isContactDetails, isDocument, navToNextOfKin} = this.state;

       if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_SUCCESS){
           this.StoreInforMation();
       }

   
       if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_PENDING ){
    
        return(
            <Fragment>
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
                </div>
            </Fragment>      
        )
   }

       if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_SUCCESS){
        return(
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
                
                        <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                    <div className="max-500">
                                        <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline" id="profMenuHead">Profile</h4>

                                            <form onSubmit={this.handleSubmit}>
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
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
    )
        }
    
        if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_FAILURE ){
            // this.GetProfileMenu();
            return(
                <Fragment>
                        <div className="coverPropertiesofComponent">
                    <div className="col-sm-12">
                        <p className="page-title">Account Setting</p>
                    </div>

                    <div className="col-sm-12">
                        <div>
                            <div className="sub-tab-nav" style={{marginBottom: 10}}>
                                <ul>
                                    <li><NavLink to={'/default-page'} >Profile</NavLink></li>
                                </ul>
                            </div>
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
                    <p className="loading-info">Loading profile ...</p>
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
       profileSuccessMessage: state.profileSuccessMessage.data
   }
}

export default connect(mapStateToProps)(PersonalDefault);