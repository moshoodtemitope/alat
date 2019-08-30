import React, { Component } from 'react';
import "./profile.css"; 
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';

class ProfileDocuments extends Component {
   constructor(props){
       super(props);
       this.state = {
          user: JSON.parse(localStorage.getItem("user")),
       }
   }


   render(){
      
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
                                                <p className="personsName">Laketu Adeleke</p>
                                                <p className="details">subrigana@gmail.com</p>
                                                <p className="details">Last Login: 8th January 2019, 11:00am</p>
                                                <hr />

                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Link BVN</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Personal Information</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Contact Details</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Document Upload</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Next of Kin</p>
                                                </div>
                                        </div>
                                        
                                    </div>
                                    <div className="col-sm-6">
                                    <form onSubmit={this.HandleSubmit} className="parentForm docUpLoadFormProfile">
                                           <p className="formHeading">Documents</p>

                                           <label htmlFor="file-upload1">Photograph</label>
                                           <input type="file" id="file-upload1" required/>

                                           <label htmlFor="file-upload2">Signature</label>
                                           <input type="file" id="file-upload2" required/>

                                           <label htmlFor="file-upload3">Identity Card</label>
                                           <input type="file" id="file-upload3" required/>

                                           <button type="submit" className="twoBut">Submit</button>
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

export default ProfileDocuments;