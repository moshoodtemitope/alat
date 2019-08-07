import React from 'react';
import {Fragment} from "react";
import SavingsContainer from '../container';
import InnerContainer from '../../../shared/templates/inner-container';
import calender from '../../../assets/img/calender.svg' ;
import graph from '../../../assets/img/graph.svg';
import stash from '../../../assets/img/stash.svg';
import '../savings.css';
import {NavLink, Route} from "react-router-dom";


class GoalPlan extends React.Component {
    render() {
        return (
            
            <Fragment>
                <InnerContainer>
                    <SavingsContainer>
                    <div className="row checkSome">
                        <div className="col-sm-12">
                            <p className="page-title">Savings & Goals</p>
                        </div>
                        <div className="col-sm-12">
                            <div className="tab-overflow">
                                <div className="sub-tab-nav">
                                    <ul>
                                        <li><a href="accounts.html" className="active">Goals</a></li>
                                        <li><a href="statement.html">Group Savings</a></li>
                                        <li><a href="#">Investments</a></li>
                                    
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="Home-container">
                            <div className="choose-goal-plan-row">
                                <NavLink to="/savings/fixed-goal">
                                <div className="fixed-goal">
                                    <img className="goal-icon" src={calender} alt=''/>
                                    <p className="flex-text">Fixed Goal</p>
                                    <p className="info-text3">Save daily, weekly or monthly towards
                                    a target amount, earn 10% interest annually. No withdrawals allowed</p>
                                </div> 
                                </NavLink> 
                                <NavLink to="/savings/flex-goal">                      
                                <div className="flex-goal">
                                    <img className="goal-icon" src={graph} alt=''/>
                                    <p className="plan-text">Flex Goal</p>
                                    <p className="info-text2">Save daily, weekly or monthly towards a target amount, earn 10% interest. Withdrawal up to <span style={{color:'#AB2656'}}> 50% </span> of your  savings once every 30 days.</p>
                                </div>
                                </NavLink>
                                <NavLink to="/savings/create-stash_step1">
                                <div className="stash-goal">
                                    <img className="goal-icon" src={stash} alt=''/>
                                    <p className="plan-text">Stash</p>
                                    <p className="info-text2">Save whatever you want whenever you want and earn 10% interest with the option to withdraw your interest on monthly basis</p>
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
export default GoalPlan; 
