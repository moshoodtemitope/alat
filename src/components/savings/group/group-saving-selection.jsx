import React from 'react';
import { Fragment } from "react";
import calender from '../../../assets/img/calender.svg';
import graph from '../../../assets/img/graph.svg';
import stash from '../../../assets/img/stash.svg';
import { NavLink, Route } from "react-router-dom";
import './group.css';
// import '../savings.css';

import { history } from '../../../_helpers/history';


class GroupSavingsSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    NavigateToGroupSavings = () => {
        history.push('/savings/activityDashBoard');
    }

    render() {
        return (
            <Fragment>

                <div className="row checkSome">
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
                                        <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                    </NavLink>
                                    {/* <li><a href="#">Investments</a></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 groupHeading">
                        <center>
                            <h4>SELECT A GROUP SAVING PLAN</h4>
                        </center>
                    </div>
                    
                    <div className="row">
                        <div className="row choosegoalwrap">
                                <NavLink to="/savings/group/save-towards-a-target">
                                <div className="fixed-goal">
                                    <img className="goal-icon" src={calender} alt=''/>
                                    <p className="flex-text">Save Towards a target</p>
                                    <p className="info-text3">Invite an unlimited number of people to save with you towards a goal and earn up to 10% interest per annum provided the savings target is met</p>
                                </div> 
                                </NavLink> 
                                <NavLink to="/savings/group/create-rotating">                      
                                <div className="flex-goal">
                                    <img className="goal-icon" src={graph} alt=''/>
                                    <p className="plan-text">Rotating Saving Groups</p>
                                    <p className="info-text2">Save with up to 12 friends, recieve the collective savings automatically when its your turn.</p>
                                </div>
                                </NavLink>
                                <NavLink to="/savings/group/join-a-group">
                                    <div className="stash-goal">
                                        <img className="goal-icon" src={stash} alt=''/>
                                        <p className="plan-text">Join a group</p>
                                        <p className="info-text2">Join an existing savings group with a group code.</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                </div>

            </Fragment>
        );
    }
}
export default GroupSavingsSelection;

