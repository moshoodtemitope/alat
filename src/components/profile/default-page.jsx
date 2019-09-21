import React, { Component } from 'react';
import "./profile.css";
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import {history} from '../../_helpers/history';
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
          isToNextOfKin: false,
          residentialAddress: false,
       }

       this.GetUserProfileMenu();
       this.GetResidentialAddress();
   }
   
   componentDidMount = () => {
       this.GetProfileMenu();
       this.GetRelationShips();
       this.GetResidentialAddress();    
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
       console.log('WAS FIRED FROM DEFAULT PAGE')
       console.log('WAS FIRED FROM DEFAULT PAGE')
       console.log('WAS FIRED FROM DEFAULT PAGE')
       console.log('WAS FIRED FROM DEFAULT PAGE')
       this.props.dispatch(actions.GetResidentialAddress(this.state.user.token));
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

   NavigateResidentialAddress = () => {
        history.push('/profile/profile-residential-address');
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
           this.setState({isToNextOfKin: this.props.profileMenu.data.response.nextOfKinComplete});
           this.setState({isBvNLinked: this.props.profileMenu.data.response.bvnLinked});
       }
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

   render(){
       const {profileMenu, residentialAddress, isBvNLinked, isProfileInformation, isContactDetails, isDocument, isToNextOfKin} = this.state;

    //    if(this.props.alart.message === ""){
             
    //    }

       if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_PENDING){
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
            );
       }

       if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_SUCCESS){
            this.StoreInforMation();  
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
                                                        {isBvNLinked ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
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
                                                        {/* {typeof isToNextOfKin} */}
                                                        {isToNextOfKin ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>} 
                                                        <p className="pSubs">Next of Kin</p>
                                                    </div>
                                                    <div className="tickItems" onClick={this.NavigateResidentialAddress}>
                                                        {residentialAddress ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>} 
                                                        <p className="pSubs">Residential Address</p>
                                                    </div>
                                                </form>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
            );
       }
    
       if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_FAILURE ){
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

    //    if(this.props.profileMenu.data != undefined){
    //     this.GetUserProfileMenu();
    //     console.log('WHATS HAPPENING GUYS IT SEEMS NOT TO BE WORKING');
    //     return(
    //             <div className="coverPropertiesofComponent">
    //                 <div className="col-sm-12">
    //                     <p className="page-title">Account Setting</p>
    //                 </div>

    //                 <div className="col-sm-12">
    //                     <div>
    //                         <div className="sub-tab-nav" style={{marginBottom: 10}}>
    //                             <ul>
    //                                 <li><NavLink to={'/profile'} >Profile</NavLink></li>
    //                             </ul>
    //                         </div>
    //                     </div>
    //                 </div>
                
    //                     <div className="col-sm-12">
    //                             <div className="row">
    //                                 <div className="col-sm-12">
    //                                 <div className="max-500">
    //                                     <div className="al-card no-pad">
    //                                     <h4 className="m-b-10 center-text hd-underline" id="profMenuHead">Profile</h4>

    //                                         <form onSubmit={this.handleSubmit}>
    //                                             <div className="tickItems" onClick={this.NavigateToBVN}>
    //                                                 {isBvNLinked === true ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
    //                                                 <p className="pSubs">Link BVN</p>
    //                                             </div>
    //                                             <div className="tickItems" onClick={this.NavigateToPersonalInfo}>
    //                                                 {isProfileInformation ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
    //                                                 <p className="pSubs">Personal Information</p>
    //                                             </div>
    //                                             <div className="tickItems" onClick={this.NavigateToContact}>
    //                                                 {isContactDetails ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
    //                                                 <p className="pSubs">Contact Details</p>
    //                                             </div>
    //                                             <div className="tickItems" onClick={this.NavigateToDocuments}>
    //                                                 {isDocument ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt=""  className="largeVectorI" />}
    //                                                 <p className="pSubs">Document Upload</p>
    //                                             </div>
    //                                             <div className="tickItems" onClick={this.NavigateToNextOfKin}>
    //                                                 {navToNextOfKin ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>} 
    //                                                 <p className="pSubs">Next of Kin</p>
    //                                             </div>
    //                                         </form>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //             </div>
    //     );  
    //    }
   }
}

function mapStateToProps(state){
   return {
       profileMenu:state.profileMenu,
       profileSuccessMessage: state.profileSuccessMessage.data,
       alert:state.alert
   }
}

export default connect(mapStateToProps)(PersonalDefault);
