import React from 'react';
import {Fragment} from "react";
import SavingsContainer from '../container';
import InnerContainer from '../../../shared/templates/inner-container';
import calender from '../../../assets/img/calender.svg' ;
import graph from '../../../assets/img/graph.svg';
import stash from '../../../assets/img/stash.svg';
import {NavLink, Link} from "react-router-dom";
import '../savings.css';
import { connect } from "react-redux";
import {getCustomerGoalTransHistory} from '../../../redux/actions/savings/goal/get-customer-transaction-history.actions'
import moment from 'moment';
import ProgressBar from '../../savings/group/progress-bar';
import {history} from "../../../_helpers/history";
import ViewGoalSummary from '../../savings/goal/view-goal-summary'
import savemoney from "../../../assets/img/save-money.svg";
import util from '../../../shared/utils'



class GoalPlan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),

        };
        this.fetchCustomerTransHistoryGoals();
    }

    fetchCustomerTransHistoryGoals(){
        const { dispatch } = this.props;
        dispatch(getCustomerGoalTransHistory());
    };

    toCurrency(number) {
        // console.log(number);
        const formatter = new Intl.NumberFormat('en-US', {
            style: "decimal",
            currency: "USD",
            maximumFractionDigits: 2
        });

        return formatter.format(number);
    }
    NavigateToCreateNewGoal=()=>{
        let chooseGoalPlan= Object.keys(this.props.customerGoalTransHistory.customer_goal_data.response.data);
        console.log(chooseGoalPlan.length);
        if(chooseGoalPlan.length !=0){
            history.push('/savings/choose-goal-plan')
        }
    };

    renderGoalsElement(customerGoalTransHistory){
        if(!customerGoalTransHistory){
            return(
                <div className="row">
                    <NavLink to="/savings/fixed-goal">
                        <div className="fixed-goal">
                            <img className="goal-icon" src={calender} alt=''/>
                            <p className="flex-text">Fixed Goal</p>
                            <p className="info-text3">Save daily, weekly or monthly towards
                                a target amount, earn 10% interest. No withdrawals allowed and you will lose your interest if you don't meet your target.
                            </p>
                        </div>
                    </NavLink>
                    <NavLink to="/savings/flex-goal">
                        <div className="flex-goal">
                            <img className="goal-icon" src={graph} alt=''/>
                            <p className="plan-text">Flex Goal</p>
                            <p className="info-text2">Save daily, weekly or monthly towards a target amount, earn 10% interest. Withdrawal up to <span style={{color:'#AB2656'}}> 50% </span> of your  savings once every 30 days
                                but you will lose your interest if you don't meet your</p>
                        </div>
                    </NavLink>
                    <NavLink to="/savings/create-stash_step1">
                        <div className="stash-goal">
                            <img className="goal-icon" src={stash} alt=''/>
                            <p className="plan-text">Stash</p>
                            <p className="info-text2">Save whatever you want whenever you want and earn 10% interest with cashout interest every month but you will lose your interest if you don't save for a minimum of 30 days</p>
                        </div>
                    </NavLink>
                </div>
            );
        }
        else{
            if(customerGoalTransHistory.customer_goal === 'FETCH_CUSTOMER_GOAL_TRANS_HISTORY_PENDING'){
                return(
                    <h4 className="text-center" style={{ marginTop: '65px'}}>Loading customer goals ...</h4>
                );
            }
            else if(customerGoalTransHistory.customer_goal === 'FETCH_CUSTOMER_GOAL_TRANS_HISTORY_SUCCESS'){
                let goals = customerGoalTransHistory.customer_goal_data.response.data;
                if(goals.length === 0){
                    return(
                        <div className="row">
                            <NavLink to="/savings/fixed-goal">
                                <div className="fixed-goal">
                                    <img className="goal-icon" src={calender} alt=''/>
                                    <p className="flex-text">Fixed Goal</p>
                                    <p className="info-text3">Save daily, weekly or monthly towards
                                        a target amount, earn 10% interest. No withdrawals allowed and you will lose your interest if you don't meet your target.
                                    </p>
                                </div>
                            </NavLink>
                            <NavLink to="/savings/flex-goal">
                                <div className="flex-goal">
                                    <img className="goal-icon" src={graph} alt=''/>
                                    <p className="plan-text">Flex Goal</p>
                                    <p className="info-text2">Save daily, weekly or monthly towards a target amount, earn 10% interest. Withdrawal up to <span style={{color:'#AB2656'}}> 50% </span> of your  savings once every 30 days
                                        but you will lose your interest if you don't meet your</p>
                                </div>
                            </NavLink>
                            <NavLink to="/savings/create-stash_step1">
                                <div className="stash-goal">
                                    <img className="goal-icon" src={stash} alt=''/>
                                    <p className="plan-text">Stash</p>
                                    <p className="info-text2">Save whatever you want whenever you want and earn 10% interest with cashout interest every month but you will lose your interest if you don't save for a minimum of 30 days</p>
                                </div>
                            </NavLink>
                        </div>
                    );
                }


                let achieved = 0;
                let totalPercentage = 0;
                let rounded = 0;
                let classname = "progress-circle p";
                for(let result of goals){
                    totalPercentage += result.percentageCompleted;
                    if(totalPercentage == 0){
                        achieved = 0;
                    }
                }
                achieved = totalPercentage/goals.length;
                rounded = Math.round( achieved * 10 ) / 10 + "% completed";
                classname = classname + achieved.toFixed();
                return(
                    // user has goals
                        <div className="">
                        <div className="row">
                            {goals.map((hist, key)=> (

                                <div className="compContainer">
                                    <div className="eachComp ">
                                        <div className='topCard'>
                                            <div className="left" key={key}>
                                                <p className='top' >{hist.goalTypeName}</p>
                                                <p className='bottom'>{hist.goalName}</p>
                                            </div>
                                            <div className="right">
                                                <i></i>
                                            </div>
                                        </div>
                                        <div id="progressBarDashBoard">
                                            <ProgressBar
                                                percentage={hist.percentageCompleted}
                                                discBottom={"₦"+ this.toCurrency(hist.amountSaved)}
                                                discSpan={ "of"+"₦"+hist.amountSaved}
                                                discBottomSib='Amount Saved'
                                                discBottomRight={rounded}
                                            />
                                        </div>
                                        <div className='row forDetailsComp'>
                                            <div className="col-xs-4">
                                                <p className="upper">₦{hist.targetAmount}</p>
                                                <p className="lower">Weekly Savings</p>
                                            </div>
                                            <div className="col-xs-4">
                                                <p className="upper">₦{hist.interestEarned}</p>
                                                <p className="lower">Interest Gained</p>
                                            </div>
                                            <div className="col-xs-4">
                                                <p className="upper">₦{hist.interestAccrued}</p>
                                                <p className="lower">Interest Accrued</p>
                                            </div>
                                        </div>
                                        <div className='bottomDiscriptionDashBoard'>
                                            <div className="left">
                                                <div className="innerLeft">
                                                    <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">{moment(hist.nextstandingDate).format('L')}</span></p>
                                                </div>

                                            </div>
                                            <div className="right">
                                                <Link to={{
                                                    pathname:'/savings/view-goal-summary',
                                                    state:{
                                                        name:hist
                                                    }
                                                } }>
                                                    <span>View Details</span>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            )}
                        </div>

                    </div>
                );
            }
            else if(customerGoalTransHistory.customer_goal === 'FETCH_CUSTOMER_GOAL_TRANS_HISTORY_FAILURE'){
                return (
                    <div>
                        <h4>{customerGoalTransHistory.customer_goal_data.error}</h4>
                    </div>
                )
            }
            else{
                return(
                    <div className="row">
                        <NavLink to="/savings/fixed-goal">
                            <div className="fixed-goal">
                                <img className="goal-icon" src={calender} alt=''/>
                                <p className="flex-text">Fixed Goal</p>
                                <p className="info-text3">Save daily, weekly or monthly towards
                                    a target amount, earn 10% interest. No withdrawals allowed and you will lose your interest if you don't meet your target.
                                </p>
                            </div>
                        </NavLink>
                        <NavLink to="/savings/flex-goal">
                            <div className="flex-goal">
                                <img className="goal-icon" src={graph} alt=''/>
                                <p className="plan-text">Flex Goal</p>
                                <p className="info-text2">Save daily, weekly or monthly towards a target amount, earn 10% interest. Withdrawal up to <span style={{color:'#AB2656'}}> 50% </span> of your  savings once every 30 days
                                    but you will lose your interest if you don't meet your</p>
                            </div>
                        </NavLink>
                        <NavLink to="/savings/create-stash_step1">
                            <div className="stash-goal">
                                <img className="goal-icon" src={stash} alt=''/>
                                <p className="plan-text">Stash</p>
                                <p className="info-text2">Save whatever you want whenever you want and earn 10% interest with cashout interest every month but you will lose your interest if you don't save for a minimum of 30 days</p>
                            </div>
                        </NavLink>
                    </div>

                );
            }

        }
    }
    render() {
        const GoalTransHistory = this.props.customerGoalTransHistory;


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
                                        <li><a href="" className="active">Goals</a></li>
                                        <NavLink to='/savings/goal/group-savings-selection'>
                                            <li><a className="forGroupLink">Group Savings</a></li>
                                        </NavLink>
                                        <li><a href="#">Investments</a></li>


                                        {
                                            GoalTransHistory.length > 0 ?
                                            <li> <a className="btn-alat">Create a Savings Goal</a> </li>
                                            :null
                                        }






                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {this.renderGoalsElement(GoalTransHistory)}
                        </div>
                    </div>
                    </SavingsContainer>
                </InnerContainer>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    customerGoalTransHistory:state.customerGoalTransHistory,
});

export default connect (mapStateToProps)(GoalPlan);
