import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import ProgressBar from './progress-bar';

class ParentDashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),

        }
    }
    
    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <SavingsContainer>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            <li><a href="#">Goals</a></li>
                                        </NavLink>
                                        <NavLink to="/savings/goal/group-savings-selection">
                                            <li><a href="#">Group Savings</a></li>
                                        </NavLink>
                                            
                                        <li><a href="#">Investments</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                           
                                <div className="row">
                                    <div className="">
                                    
                                          <h4 className="m-b-10 center-text hd-underline">Automate Group Savings</h4>

                                          <div className="compContainer">
                                               <div className="eachComp">
                                                    <div className='topCard'>
                                                            <div className="left">
                                                                <p className='top'>FIXED GOAL</p>
                                                                <p className='bottom'>New MacBook Pro</p>
                                                            </div>
                                                            <div className="right">
                                                                <i></i>
                                                            </div>
                                                    </div>
                                                   <div id="progressBarDashBoard">
                                                      <ProgressBar 
                                                      percentage="50" 
                                                      discBottom='N20,000'
                                                      discSpan='N200,000'
                                                      discBottomSib='Amount Saved'
                                                      discBottomRight='45% completed'
                                                      
                                                      />
                                                   </div>
                                                   <div className='row forDetailsComp'>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N2000</p>
                                                          <p className="lower">Weekly Savings</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N1,234</p>
                                                          <p className="lower">Interest Gained</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N234</p>
                                                          <p className="lower">Interest Accrued</p>
                                                      </div>
                                                      
                                                   </div>

                                                   <div className='bottomDiscriptionDashBoard'>
                                                       <div className="left">
                                                            <div className="innerLeft">
                                                                <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">12/08/2017</span></p>
                                                            </div>
                                                            
                                                       </div>
                                                       <div className="right">
                                                                <p>View Details</p>
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="eachComp">
                                                    <div className='topCard'>
                                                            <div className="left">
                                                                <p className='top'>FIXED GOAL</p>
                                                                <p className='bottom'>New MacBook Pro</p>
                                                            </div>
                                                            <div className="right">
                                                                <i></i>
                                                            </div>
                                                    </div>
                                                   <div id="progressBarDashBoard">
                                                      <ProgressBar 
                                                      percentage="50" 
                                                      discBottom='N20,000'
                                                      discSpan='N200,000'
                                                      discBottomSib='Amount Saved'
                                                      discBottomRight='45% completed'
                                                      
                                                      />
                                                   </div>
                                                   <div className='row forDetailsComp'>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N2000</p>
                                                          <p className="lower">Weekly Savings</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N1,234</p>
                                                          <p className="lower">Interest Gained</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N234</p>
                                                          <p className="lower">Interest Accrued</p>
                                                      </div>
                                                      
                                                   </div>

                                                   <div className='bottomDiscriptionDashBoard'>
                                                       <div className="left">
                                                            <div className="innerLeft">
                                                                <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">12/08/2017</span></p>
                                                            </div>
                                                            
                                                       </div>
                                                       <div className="right">
                                                                <p>View Details</p>
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="eachComp">
                                                    <div className='topCard'>
                                                            <div className="left">
                                                                <p className='top'>FIXED GOAL</p>
                                                                <p className='bottom'>New MacBook Pro</p>
                                                            </div>
                                                            <div className="right">
                                                                <i></i>
                                                            </div>
                                                    </div>
                                                   <div id="progressBarDashBoard">
                                                      <ProgressBar 
                                                      percentage="50" 
                                                      discBottom='N20,000'
                                                      discSpan='N200,000'
                                                      discBottomSib='Amount Saved'
                                                      discBottomRight='45% completed'
                                                      
                                                      />
                                                   </div>
                                                   <div className='row forDetailsComp'>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N2000</p>
                                                          <p className="lower">Weekly Savings</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N1,234</p>
                                                          <p className="lower">Interest Gained</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N234</p>
                                                          <p className="lower">Interest Accrued</p>
                                                      </div>
                                                      
                                                   </div>

                                                   <div className='bottomDiscriptionDashBoard'>
                                                       <div className="left">
                                                            <div className="innerLeft">
                                                                <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">12/08/2017</span></p>
                                                            </div>
                                                            
                                                       </div>
                                                       <div className="right">
                                                                <p>View Details</p>
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="eachComp">
                                                    <div className='topCard'>
                                                            <div className="left">
                                                                <p className='top'>FIXED GOAL</p>
                                                                <p className='bottom'>New MacBook Pro</p>
                                                            </div>
                                                            <div className="right">
                                                                <i></i>
                                                            </div>
                                                    </div>
                                                   <div id="progressBarDashBoard">
                                                      <ProgressBar 
                                                      percentage="50" 
                                                      discBottom='N20,000'
                                                      discSpan='N200,000'
                                                      discBottomSib='Amount Saved'
                                                      discBottomRight='45% completed'
                                                      
                                                      />
                                                   </div>
                                                   <div className='row forDetailsComp'>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N2000</p>
                                                          <p className="lower">Weekly Savings</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N1,234</p>
                                                          <p className="lower">Interest Gained</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N234</p>
                                                          <p className="lower">Interest Accrued</p>
                                                      </div>
                                                      
                                                   </div>

                                                   <div className='bottomDiscriptionDashBoard'>
                                                       <div className="left">
                                                            <div className="innerLeft">
                                                                <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">12/08/2017</span></p>
                                                            </div>
                                                            
                                                       </div>
                                                       <div className="right">
                                                                <p>View Details</p>
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="eachComp">
                                                    <div className='topCard'>
                                                            <div className="left">
                                                                <p className='top'>FIXED GOAL</p>
                                                                <p className='bottom'>New MacBook Pro</p>
                                                            </div>
                                                            <div className="right">
                                                                <i></i>
                                                            </div>
                                                    </div>
                                                   <div id="progressBarDashBoard">
                                                      <ProgressBar 
                                                      percentage="50" 
                                                      discBottom='N20,000'
                                                      discSpan='N200,000'
                                                      discBottomSib='Amount Saved'
                                                      discBottomRight='45% completed'
                                                      
                                                      />
                                                   </div>
                                                   <div className='row forDetailsComp'>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N2000</p>
                                                          <p className="lower">Weekly Savings</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N1,234</p>
                                                          <p className="lower">Interest Gained</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N234</p>
                                                          <p className="lower">Interest Accrued</p>
                                                      </div>
                                                      
                                                   </div>

                                                   <div className='bottomDiscriptionDashBoard'>
                                                       <div className="left">
                                                            <div className="innerLeft">
                                                                <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">12/08/2017</span></p>
                                                            </div>
                                                            
                                                       </div>
                                                       <div className="right">
                                                                <p>View Details</p>
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="eachComp">
                                                    <div className='topCard'>
                                                            <div className="left">
                                                                <p className='top'>FIXED GOAL</p>
                                                                <p className='bottom'>New MacBook Pro</p>
                                                            </div>
                                                            <div className="right">
                                                                <i></i>
                                                            </div>
                                                    </div>
                                                   <div id="progressBarDashBoard">
                                                      <ProgressBar 
                                                      percentage="50" 
                                                      discBottom='N20,000'
                                                      discSpan='N200,000'
                                                      discBottomSib='Amount Saved'
                                                      discBottomRight='45% completed'
                                                      
                                                      />
                                                   </div>
                                                   <div className='row forDetailsComp'>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N2000</p>
                                                          <p className="lower">Weekly Savings</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N1,234</p>
                                                          <p className="lower">Interest Gained</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N234</p>
                                                          <p className="lower">Interest Accrued</p>
                                                      </div>
                                                      
                                                   </div>

                                                   <div className='bottomDiscriptionDashBoard'>
                                                       <div className="left">
                                                            <div className="innerLeft">
                                                                <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">12/08/2017</span></p>
                                                            </div>
                                                            
                                                       </div>
                                                       <div className="right">
                                                                <p>View Details</p>
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="eachComp">
                                                    <div className='topCard'>
                                                            <div className="left">
                                                                <p className='top'>FIXED GOAL</p>
                                                                <p className='bottom'>New MacBook Pro</p>
                                                            </div>
                                                            <div className="right">
                                                                <i></i>
                                                            </div>
                                                    </div>
                                                   <div id="progressBarDashBoard">
                                                      <ProgressBar 
                                                      percentage="50" 
                                                      discBottom='N20,000'
                                                      discSpan='N200,000'
                                                      discBottomSib='Amount Saved'
                                                      discBottomRight='45% completed'
                                                      
                                                      />
                                                   </div>
                                                   <div className='row forDetailsComp'>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N2000</p>
                                                          <p className="lower">Weekly Savings</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N1,234</p>
                                                          <p className="lower">Interest Gained</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N234</p>
                                                          <p className="lower">Interest Accrued</p>
                                                      </div>
                                                      
                                                   </div>

                                                   <div className='bottomDiscriptionDashBoard'>
                                                       <div className="left">
                                                            <div className="innerLeft">
                                                                <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">12/08/2017</span></p>
                                                            </div>
                                                            
                                                       </div>
                                                       <div className="right">
                                                                <p>View Details</p>
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="eachComp">
                                                    <div className='topCard'>
                                                            <div className="left">
                                                                <p className='top'>FIXED GOAL</p>
                                                                <p className='bottom'>New MacBook Pro</p>
                                                            </div>
                                                            <div className="right">
                                                                <i></i>
                                                            </div>
                                                    </div>
                                                   <div id="progressBarDashBoard">
                                                      <ProgressBar 
                                                      percentage="50" 
                                                      discBottom='N20,000'
                                                      discSpan='N200,000'
                                                      discBottomSib='Amount Saved'
                                                      discBottomRight='45% completed'
                                                      
                                                      />
                                                   </div>
                                                   <div className='row forDetailsComp'>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N2000</p>
                                                          <p className="lower">Weekly Savings</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N1,234</p>
                                                          <p className="lower">Interest Gained</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N234</p>
                                                          <p className="lower">Interest Accrued</p>
                                                      </div>
                                                      
                                                   </div>

                                                   <div className='bottomDiscriptionDashBoard'>
                                                       <div className="left">
                                                            <div className="innerLeft">
                                                                <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">12/08/2017</span></p>
                                                            </div>
                                                            
                                                       </div>
                                                       <div className="right">
                                                                <p>View Details</p>
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="eachComp">
                                                    <div className='topCard'>
                                                            <div className="left">
                                                                <p className='top'>FIXED GOAL</p>
                                                                <p className='bottom'>New MacBook Pro</p>
                                                            </div>
                                                            <div className="right">
                                                                <i></i>
                                                            </div>
                                                    </div>
                                                   <div id="progressBarDashBoard">
                                                      <ProgressBar 
                                                      percentage="50" 
                                                      discBottom='N20,000'
                                                      discSpan='N200,000'
                                                      discBottomSib='Amount Saved'
                                                      discBottomRight='45% completed'
                                                      
                                                      />
                                                   </div>
                                                   <div className='row forDetailsComp'>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N2000</p>
                                                          <p className="lower">Weekly Savings</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N1,234</p>
                                                          <p className="lower">Interest Gained</p>
                                                      </div>
                                                      <div className="col-xs-4">
                                                          <p className="upper">N234</p>
                                                          <p className="lower">Interest Accrued</p>
                                                      </div>
                                                      
                                                   </div>

                                                   <div className='bottomDiscriptionDashBoard'>
                                                       <div className="left">
                                                            <div className="innerLeft">
                                                                <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">12/08/2017</span></p>
                                                            </div>
                                                            
                                                       </div>
                                                       <div className="right">
                                                                <p>View Details</p>
                                                       </div>
                                                   </div>
                                               </div>
                                            
                                            </div>
                                          </div>
                                    </div>
                        </div>

                    </SavingsContainer>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default ParentDashBoard;


