import React, { Component } from 'react';
import "./profile.css";
import {connect} from 'react-redux';
// import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import {history} from '../../_helpers/history';
// import * as actions from '../redux/actions/profile/profile-action';


class PersonalDefault extends Component {
   constructor(props){
       super(props);
       this.state = {
          user: JSON.parse(localStorage.getItem("user")),
       }
   }
   
   componentDidMount = () => {
       this.GetProfileMenu();
   }

   GetProfileMenu = () => {
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
        if(this.props.profileMenu.response.bvnLinked == true){
            this.DispatchSuccessMessage('Personal Information has been Created');
            return;
        }

        history.push('/profile-personalInfo');
   }

   NavigateToContact = () => {
        if(this.props.profileMenu.response.bvnLinked == true){
                this.DispatchSuccessMessage('Contact has been Created');
                return;
        }

        history.push('/profile-contact-detail');
   }

   NavigateToDocuments = () => {
        if(this.props.profileMenu.response.bvnLinked == true){
            this.DispatchSuccessMessage('Document has been uploaded');
            return;
        }
        
        history.push('/profile-documents');
   }

   NavigateToNextOfKin = () => {
        if(this.props.profileMenu.response.bvnLinked == true){
            this.DispatchSuccessMessage('Next of kin has been Created');
            return
        }

       history.push('/profile-next-of-kin');
   }

   DispatchSuccessMessage = (data) => {
       this.props.dispatch(actions.profileSuccessMessage(data));
   }

   render(){
       if(this.props.profileMenu.response == undefined)
             return(
                      <Fragment>
                            <div>
                                <p>Loading Profile ...</p>
                            </div>
                      </Fragment>
             )
       if(this.props.profileMenu.response != undefined)
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
         </Fragment>
    )
   }
}

function mapStateToProps(state){
   return {
       profileMenu: state.profileMenu,
       profileSuccessMessage: state.profileSuccessMessage
   }
}

export default connect(mapStateToProps)(PersonalDefault);