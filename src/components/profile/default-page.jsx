import React, { Component } from 'react';
import "./profile.css";
// import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import {history} from '../../_helpers/history';

class PersonalDefault extends Component {
   constructor(props){
       super(props);
       this.state = {
        user: JSON.parse(localStorage.getItem("user")),
       }
   }

   componentDidMount = () => {
       
   }

   NavigateToBVN = () => {
       history.push('/linkBVN');
   }

   NavigateToPersonalInfo = () => {
       history.push('/profile-personalInfo');
   }

   NavigateToContact = () => {
       history.push('/profile-contact-detail');
   }

   NavigateToDocuments = () => {
       history.push('/profile-documents');
   }

   NavigateToNextOfKin = () => {
       history.push('/profile-next-of-kin');
   }

   render(){
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

export default PersonalDefault;