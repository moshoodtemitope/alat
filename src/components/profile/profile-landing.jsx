import React, { Component } from 'react';
import './profile.css';
// import * as actions from '../../../../redux/actions/profile/profile-action';
import * as actions from '../../redux/actions/onboarding/loan.actions';

class ProfileLanding extends Component {
   constructor(props){
       super(props);
       this.state = {
       }
   }

   render(){
       return(
           <Fragment>


                <div>
                    <div className="col-sm-12">
                        <p className="page-title">Account Setting</p>
                    </div>

                    <div className="col-sm-12">
                        <div>
                            <div className="sub-tab-nav" style={{marginBottom: 10}}>
                                <ul>
                                    <li><NavLink to={'/lifestyle/movie'}>Profile</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* {this.renderEvent(userEvent)} */}

                    <div>
                        
                        <div className="row">
                                <div className="col-sm-6">
                                      
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <img src="" alt=""/><label>Link BVN</label><hr />
                                        <img src="" alt=""/><label>Personal Informations</label><hr />
                                        <img src="" alt=""/><label>Contact Details</label><hr />
                                        <img src="" alt=""/><label>Documents</label><hr />
                                        <img src="" alt=""/><label>Next of Kin</label><hr />
                                    </div>
                                </div>
                        </div>
                        
                    </div>
       
                </div>
            </Fragment>
       )
   }
}

export default ProfileLanding;