import React, { Component } from 'react';
import "./profile.css";
import {connect} from 'react-redux';
// import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import InnerContainer from '../../shared/templates/inner-container';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import {history} from '../../_helpers/history';
import { profile } from '../../redux/constants/profile/profile-constants'
 // import * as actions from '../redux/actions/profile/profile-action';

class PersonalDefault extends Component {
   constructor(props){
       super(props);
       this.state = {
          user: JSON.parse(localStorage.getItem("user")),
          userProfile: null
       }
   }
   
   componentDidMount = () => {
       this.GetProfileMenu();
   }

   GetProfileMenu = () => {
       console.log('pspspspspspsps');
       this.props.dispatch(actions.profileMenu(this.state.user.token));
   }

   NavigateToBVN = () => {
       if(this.props.profileMenu.response.bvnLinked == true){
             this.DispatchSuccessMessage('BVN has Been Linked');
             return;
       }

       history.push('/linkBVN');
   }

   NavigateToPersonalInfo = () => {
        if(this.props.profileMenu.response.personalInfoComplete == true){
            this.DispatchSuccessMessage('Personal Information has been Created');
            return;
        }

        history.push('/profile-personalInfo');
   }

   NavigateToContact = () => {
        if(this.props.profileMenu.response.contactDetailsComplete == true){
                this.DispatchSuccessMessage('Contact has been Created');
                return;
        }

        history.push('/profile-contact-detail');
   }


   NavigateToDocuments = () => {
    //    console.log(this.props.profileMenu.response.documentUploaded);
    //    return;
        if(this.props.profileMenu.response.documentUploaded == true){
            this.DispatchSuccessMessage('Document has been uploaded');
            return;
        }
        
        history.push('/profile-documents');
   }

   NavigateToNextOfKin = () => {
        if(this.props.profileMenu.response.nextOfKinComplete == true){
            this.DispatchSuccessMessage('Next of kin has been Created');
            return
        }

       history.push('/profile-next-of-kin');
   }

   DispatchSuccessMessage = (data) => {
       this.props.dispatch(actions.profileSuccessMessage(data));
   }

   SetUserProfile = () => {
       let profileMenu = this.props.profileMenu.response;
       this.setState({userProfile: profileMenu});
   }
   

   render(){
       const {profileMenu} = this.state;
       
       if(this.props.profileMenu == undefined ){
            // this.GetProfileMenu();
            return(
                <Fragment>
                    <InnerContainer>
                        <div className="coverPropertiesofComponent">
                    <div className="col-sm-12">
                        <p className="page-title">Account Setting</p>
                    </div>

                    <div className="col-sm-12">
                        <div>
                            <div className="sub-tab-nav" style={{marginBottom: 10}}>
                                <ul>
                                    <li><NavLink to={'/default-page'} >Profile</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                    </InnerContainer>
                </Fragment>      
            )
       }

       if(this.props.profileMenu != undefined){
        return(
                <div className="coverPropertiesofComponent">
                    <div className="col-sm-12">
                        <p className="page-title">Account Setting</p>
                    </div>

                    <div className="col-sm-12">
                        <div>
                            <div className="sub-tab-nav" style={{marginBottom: 10}}>
                                <ul>
                                    <li><NavLink to={'/default-page'} >Profile</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                
                        <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                    <div className="max-500">
                                        <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Profile</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="tickItems" onClick={this.NavigateToBVN}>
                                                    <img src="" alt="" />
                                                    <p>Link BVN</p>
                                                </div>
                                                <div className="tickItems" onClick={this.NavigateToPersonalInfo}>
                                                    <img src="" alt="" />
                                                    <p>Personal Information</p>
                                                </div>
                                                <div className="tickItems" onClick={this.NavigateToContact}>
                                                    <img src="" alt="" />
                                                    <p>Contact Details</p>
                                                </div>
                                                <div className="tickItems" onClick={this.NavigateToDocuments}>
                                                    <img src="" alt="" />
                                                    <p>Document Upload</p>
                                                </div>
                                                <div className="tickItems" onClick={this.NavigateToNextOfKin}>
                                                    <img src="" alt="" />
                                                    <p>Next of Kin</p>
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
   }
}

function mapStateToProps(state){
   return {
       profileMenu:state.profileMenu.data,
       profileSuccessMessage: state.profileSuccessMessage.data
   }
}

export default connect(mapStateToProps)(PersonalDefault);