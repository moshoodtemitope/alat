import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";

class EventDashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    render() {
        return (
            <Fragment>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                    <ul>
                                            <li>
                                            <NavLink to='/savings/choose-goal-plan'>
                                                Goals
                                                </NavLink>
                                            </li>
                                            <li>
                                            <NavLink to='/savings/activityDashBoard'>
                                                Group Savings
                                            </NavLink>
                                            </li>
                                                {/* <li><a href="#">Investments</a></li> */}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                          
                            <div className="eventTrays">
                                  <div className="eventCards">
                                      <div className="picCard">
                                          
                                      </div>
                                      <p className="boldHeader">GidiFest 2018</p>
                                      <div className="details">
                                           <div className="left">
                                                <i></i>
                                           </div>
                                           <div className="right">
                                                <p>Sunday, Oct 4 | 03:00 AM</p>
                                           </div>
                                      </div>
                                      <div className="details">
                                           <div className="left">
                                                <i></i>
                                           </div>
                                           <div className="right">
                                                <p>Landmark Breach Front, Oniru Lagos</p>
                                           </div>
                                      </div>
                                  </div>
                            </div>

                        </div>

            </Fragment>
        );
    }
}

export default EventDashBoard
