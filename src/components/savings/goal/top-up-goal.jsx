import React, {Component} from 'react';
import {Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';



class TopUPGoal extends Component {
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
                                               <li><a className="active">Goals</a></li>
                                           </NavLink>
                                           <NavLink to="/savings/goal/group-savings-selection">
                                               <li><a >Group Savings</a></li>
                                           </NavLink>
                                           <li><a href="#">Investments</a></li>
                                       </ul>
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

export default TopUPGoal;