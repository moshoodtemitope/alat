import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '..';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import ProgressBar from './progress-bar';
// import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import * as actions1 from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import {history} from '../../../_helpers/history';
import {GROUPSAVINGSCONSTANT} from '../../../redux/constants/savings/group/index'

class ParentDashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            clicked: false
        }
    }

    GetGroups = () => {
        let groups = this.props.groups.response.map((element, index) => {
             return  <div className="eachComp">
                            <div className='topCard'>
                                    <div className="left">
                                        <p className='top'>Your Group Target</p>
                                        <p className='bottom'>{element.name}</p>
                                    </div>
                                    <div className="right">
                                        <i></i>
                                    </div>
                            </div>
                            <div id="progressBarDashBoard">
                            <ProgressBar 
                                percentage={element.groupStatus}
                                discBottom={"₦" + element.yourSavedAmount + ' ' + 'of'}
                                discSpan={"  " + "₦" +element.targetAmount}
                                discBottomSib='Amount Saved'
                                discBottomRight={element.groupStatus + '%' + ' ' + 'Completed'}
                            />
                            </div>
                            <div className='bottomDisCriptionTray'>
                                <div className='left'>
                                    <p>{element.memberCount}</p>
                                    <p>Members</p>
                                </div>
                                <div className='right'>
                                    <p style={{cursor:"pointer"}} id={element.id} onClick={this.GoToGroup}>View Details</p>
                                </div>
                            </div>
                   </div>
        });

        return groups;
    }

    GetRotatingGroup = () => {
        let rotatingGroups = this.props.groupSavingsEsusu.response.map((element, index) => {
            return <div className="eachComp">
                        <div className='topCard'>
                                <div className="left">
                                    <p className='top'>Your Rotating Savings Group</p>
                                    <p className='bottom'>{element.name}</p>
                                </div>
                                <div className="right">
                                    <i></i>
                                </div>
                        </div>
                        <div id="progressBarDashBoard">
                            <ProgressBar 
                            percentage={element.status}
                            // discBottom={"₦" + ' ' + '20,000'}
                            discSpan={"₦" + element.potTotal}
                            discBottomSib='PotTotal'
                            discBottomRight={element.status + "%" + " " + 'Completed'}
                            />
                        </div>
                        
                        <div className='bottomDisCriptionTray'>
                            <div className='left'>
                                <p>{element.memberUpNext}</p>
                                <p>Up Next</p>
                            </div>
                            <div className='right'>
                                <p style={{cursor:"pointer"}} id={element.id} onClick={this.GoToRotatingGroup}>View Details</p>
                            </div>
                        </div>
                   </div>
        });

        return rotatingGroups;
    }

    GoToGroup = (event) => {
       let groupId = parseInt(event.target.id);
       let data = {
           groupId: groupId,
           parent: 'parent'
       }

       this.props.dispatch(actions.groupDetails(this.state.user.token, data));
       // this.props.dispatch(actions.customerGroup(this.state.user.token, data));
    }

    GoToRotatingGroup = (event) => {
        let groupId = parseInt(event.target.id);
        let data = {
            groupId: groupId,
            parent: 'parent'
        }

        this.props.dispatch(actions1.rotatingGroupDetails(this.state.user.token, data));
    }

    NavigateToSelectionTray = () => {
        history.push('/savings/goal/group-savings-selection');
    }

    render() {
        if(this.props.groupSavingsEsusu.response == undefined && this.props.groups.response == undefined){
            return(
                <Fragment>
                
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            <li><a id='parentGoal'>Goals</a></li>
                                        </NavLink>
                                        {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                            <li><a className="active">Group Savings</a></li>
                                        {/* </NavLink> */}
                                        <li><a>Investments</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                           
                                <div className="row">
                                    <div className="bodyDetails">
                                          
                                          <h4 className="m-b-10 text-center hd-underline">Automate Group Savings</h4>
                                            <div className="loadingData">
                                                <p style={{textAlign:"center",}}>Loading group savings ...</p>
                                            </div>
                                    </div>
                               </div>
                        </div>

                   
            </Fragment>
            );
        }

        if(this.props.groupSavingsEsusu.response != undefined && this.props.groups.response == undefined){
           if(this.props.groupSavingsEsusu.response.length == 0){
               this.NavigateToSelectionTray();
           }
            return(
                <Fragment>
                
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            <li><a id='parentGoal'>Goals</a></li>
                                        </NavLink>
                                        {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                            <li><a className="active">Group Savings</a></li>
                                        {/* </NavLink> */}
                                        <li><a>Investments</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                           
                                <div className="row">
                                    <div className="bodyDetails">
                                          <div className="row smallnavtop">
                                                    <ul>
                                                        <NavLink to='/savings/goal/group-savings-selection'>
                                                             <li id='first'>Create Group</li>
                                                        </NavLink>
                                                        <NavLink to='/savings/group/join-a-group'>
                                                             <li id='second'>Join A Group</li>
                                                        </NavLink>
                                                    </ul>  
                                          </div>
                                          <h4 className="m-b-10 center-text hd-underline">Automate Group Savings</h4>
                                            <div className="compContainer">
                                               {this.GetRotatingGroup()}
                                            </div>
                                    </div>
                               </div>
                        </div>
            </Fragment>
            )
        }

        if(this.props.groupSavingsEsusu.response == undefined && this.props.groups.response != undefined){
            if(this.props.groups.response.length == 0){
                this.NavigateToSelectionTray();
            }
            return(
                <Fragment>
               
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            <li><a id='parentGoal'>Goals</a></li>
                                        </NavLink>
                                        {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                            <li><a className="active">Group Savings</a></li>
                                        {/* </NavLink> */}
                                        <li><a>Investments</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                           
                                <div className="row">
                                    <div className="bodyDetails">
                                          <div className="row smallnavtop">
                                                    <ul>
                                                        <NavLink to='/savings/goal/group-savings-selection'>
                                                             <li id='first'>Create Group</li>
                                                        </NavLink>
                                                        <NavLink to='/savings/group/join-a-group'>
                                                             <li id='second'>Join A Group</li>
                                                        </NavLink>
                                                    </ul>  
                                          </div>
                                          <h4 className="m-b-10 center-text hd-underline">Automate Group Savings</h4>
                                            <div className="compContainer">
                                               {this.GetGroups()}
                                            </div>
                                    </div>
                               </div>
                        </div>

                   
            </Fragment>
            )
        }

        if(this.props.groupSavingsEsusu.response != undefined && this.props.groups.response != undefined){
            if(this.props.groupSavingsEsusu.response.length == 0 && this.props.groups.response.length == 0){
                this.NavigateToSelectionTray();
            }

            return(
                <Fragment>
                
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            <li><a id='parentGoal'>Goals</a></li>
                                        </NavLink>
                                        {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                            <li><a className="active">Group Savings</a></li>
                                        {/* </NavLink> */}
                                        <li><a>Investments</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                           
                                <div className="row">
                                    <div className="bodyDetails">
                                          <div className="row smallnavtop">
                                                    <ul>
                                                        <NavLink to='/savings/goal/group-savings-selection'>
                                                             <li id='first'>Create Group</li>
                                                        </NavLink>
                                                        <NavLink to='/savings/group/join-a-group'>
                                                             <li id='second'>Join A Group</li>
                                                        </NavLink>
                                                    </ul>  
                                          </div>
                                          <h4 className="m-b-10 center-text hd-underline">Automate Group Savings</h4>
                                            <div className="compContainer">
                                               {this.GetRotatingGroup()}
                                               {this.GetGroups()}
                                            </div>
                                    </div>
                               </div>
                        </div>

                    
            </Fragment>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data
    }
 }

export default connect(mapStateToProps)(ParentDashBoard);
















