import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';

class LinkBvN extends Component {
   constructor(props){
       super(props);
       this.state = {
        
       }
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
                                    <li><NavLink to={'/lifestyle/movie'}>Profile</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                  
                   <div className="row packageContent">
                       <div className="col-sm-4">
                          
                       </div>
                       <div className="col-sm-6">
                       <form onSubmit={this.HandleSubmit} className="parentForm">
                           
                         
                           
                        </form>
                    
                       </div>
                   </div>

                   
                       
       
                </div>
            </Fragment>
       )
   }
}

export default LinkBvN;