import React from 'react';
import {Fragment} from "react";
import SavingsContainer from '../container';
import InnerContainer from '../../../shared/templates/inner-container';
import calender from '../../../assets/img/calender.svg' ;
import graph from '../../../assets/img/graph.svg';
import stash from '../../../assets/img/stash.svg';
import '../savings.css';
import {NavLink, Route} from "react-router-dom";
import './group.css';

class GroupSavingsSelection extends React.Component {
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
                                            <li><a className="active">Group Savings</a></li>
                                        </NavLink>
                                        <li><a href="#">Investments</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 groupHeading">
                            <center>
                                <h4>SELECT A GROUP SAVING PLAN</h4>
                            </center>
                        </div>
                        <div className="Home-container">
                            <div className="row selectionTray">
                                <NavLink to="/savings/group/save-towards-a-target">
                                <div className="fixed-goal">
                                    <img className="goal-icon" src={calender} alt=''/>
                                    <p className="flex-text">Save Towards a target</p>
                                    <p className="info-text3">Invite an unlimited number of people to save with you towards a goal.</p>
                                </div> 
                                </NavLink> 
                                <NavLink to="/savings/group/create-rotating">                      
                                <div className="flex-goal">
                                    <img className="goal-icon" src={graph} alt=''/>
                                    <p className="plan-text">Rotating Saving Groups</p>
                                    <p className="info-text2">Save with up to 10 friends, recieve the collective savings automatically when its your turn.<span style={{color:'#AB2656'}}> 50% </span> of your  savings once every 30 days.</p>
                                </div>
                                </NavLink>
                                <NavLink to="/savings/group/goin-a-group">
                                    <div className="stash-goal">
                                        <img className="goal-icon" src={stash} alt=''/>
                                        <p className="plan-text">Goin a group</p>
                                        <p className="info-text2">Join an existing savings group with a group code.</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    </SavingsContainer>
                </InnerContainer>
            </Fragment>
        );
    }
}
export default GroupSavingsSelection;

