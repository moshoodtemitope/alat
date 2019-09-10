import React, { Component } from 'react';
import "./profile.css"; 
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import {history} from '../../_helpers/history';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
// import {connect} from 'react-redux';
import {profile} from '../../redux/constants/profile/profile-constants';
import moment from 'moment';


class ProfileSuccessMessage extends Component {
   constructor(props){
       super(props);
       this.state = {
          user: JSON.parse(localStorage.getItem("user")),
       }
   }
//    componentDidMount = () => {
    
//    }

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
   componentDidMount = () => {
      this.CheckIfStoreInformationIsSet();
       setTimeout(function(){
          history.push('/profile');
       }, 5000);

       console.log(this.props.profileSuccessMessage.data);
   }


   render(){
      const {isBvNLinked,navToNextOfKin, isProfileInformation, isContactDetails, isDocument} = this.state;
       return(
        <Fragment>
             <InnerContainer>
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
                                                    <li><NavLink to={'/default-page'} className="active">Profile</NavLink></li>
                                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
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
                                    <form onSubmit={this.HandleSubmit} className="parentForm sucMsg">
                                           <img src="/src/assets/img/check.svg" alt="" className="imgShape" />
                                           <p className="sucMssgOfProfile">{this.props.profileSuccessMessage.data}</p>
                                           
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

function mapStateToProps(state){
   return {
       profileMenu: state.profileMenu,
       profileSuccessMessage: state.profileSuccessMessage.data
   }
}

export default connect(mapStateToProps)(ProfileSuccessMessage);