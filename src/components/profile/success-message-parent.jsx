import React, { Component } from 'react';
import * as actions from '../../redux/actions/onboarding/loan.actions';
import { SuccessMessage } from './success-message-parent';
// import "./profile.css";
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
class SuccessParentComp extends Component {
   constructor(props){
       super(props);
       this.state = {
       }
   }

   componentDidMount = () => {
       setTimeout(function(){
           
       }, 2000000);
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
                        <div className="form-row">
                                <div className="form-group">
                                        <SuccessMessage 
                                        message={"Success"}
                                        />
                                </div>
                        </div>
                        
                    </div>
       
                </div>
            </Fragment>
       )
   }
}

export default SuccessParentComp;