import React from 'react';
import {Fragment} from "react";
import calender from '../../../assets/img/calender.svg' ;
import graph from '../../../assets/img/graph.svg';
import stash from '../../../assets/img/stash.svg';
import {NavLink, Link, Redirect} from "react-router-dom";
import '../savings.css';
import { connect } from "react-redux";
import {getCustomerGoalTransHistory, GoalType, GoalFormula,SubmitDashBoardGoalData} from '../../../redux/actions/savings/goal/get-customer-transaction-history.actions'
import moment from 'moment';
import ProgressBar from '../../savings/group/progress-bar';
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import * as actions1 from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import * as actions3 from '../../../redux/actions/savings/goal/flex-goal.actions'
import * as actions4 from '../../../redux/actions/savings/goal/fixed-goal.actions';
import {history} from '../../../_helpers/history';
import {customerGoalConstants} from '../../../redux/constants/goal/get-customer-trans-history.constant'
import { fixedGoalConstants } from '../../../redux/constants/goal/fixed-goal.constant'
import {flexGoalConstants} from '../../../redux/constants/goal/flex-goal.constant'

class GoalPlan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            visible: true

        };
       
    }

    componentDidMount = () => {
        this.props.dispatch(actions4.ClearAction(fixedGoalConstants.FIXED_GOAL_REDUCER_CLEAR));
        this.props.dispatch(actions3.ClearAction(flexGoalConstants.FLEX_GOAL_REDUCER_CLEAR));
        this.CheckGroupSavingsAvailability();
        this.CheckRotatingSavingsAvailability();
        this.fetchCustomerTransHistoryGoals();
        this.fetchGoalType();
        this.fetchGoalFormular();
    }

    CheckRotatingSavingsAvailability = () => {
        this.props.dispatch(actions1.GetGroupsEsusu(this.state.user.token));
    }

    CheckGroupSavingsAvailability = () => {
        this.props.dispatch(actions.customerGroup(this.state.user.token));
    }
    
    NavigateToGroupSavings = () => {
           history.push('/savings/activityDashBoard');
    }


    fetchCustomerTransHistoryGoals=()=>{
        const { dispatch } = this.props;
        dispatch(getCustomerGoalTransHistory(this.state.user.token));
    };

    fetchGoalType=()=>{
        const {dispatch}= this.props;
        dispatch(GoalType(this.state.user.token))
    }

    fetchGoalFormular=()=>{
        const {dispatch}=this.props;
        dispatch(GoalFormula(this.state.user.token))
    }

    toCurrency(number) {
        // console.log(number);
        const formatter = new Intl.NumberFormat('en-US', {
            style: "decimal",
            currency: "USD",
            maximumFractionDigits: 2
        });

        return formatter.format(number);
    }

    togglePage =()=>{
        this.setState({visible: false})
    };
    handleSubmit=(event)=>{
        // console.log(JSON.parse(event.target.id));
        this.props.dispatch(SubmitDashBoardGoalData(event.target.id))

    }
    gotopage2=()=>{
        if(this.props.submitDashboardData){
            if(this.props.submitDashboardData.message === customerGoalConstants.SUBMIT_DASHBOARD_DATA_SUCCESS){
                return <Redirect to="/savings/cash-out"/>
            }
        }
    }
    


    renderGoalsElement(customerGoalTransHistory){
        if(!customerGoalTransHistory){
            return(
                <div className="row choosegoalwrap">
                    <NavLink to="/savings/fixed-goal">
                           <div className="fixed-goal">
                                <img className="goal-icon" src={calender} alt=''/>
                                <p className="flex-text">Fixed Goal</p>
                                <p className="info-text3">Save daily, weekly or monthly towards
                                    a target amount, earn up to 10% interest per annum. No withdrawals allowed and you will lose your interest if you don't meet your target.
                                </p>
                            </div>
                    </NavLink>
                    <NavLink to="/savings/flex-goal">
                        <div className="flex-goal">
                            <img className="goal-icon" src={graph} alt=''/>
                            <p className="plan-text">Flexi Goal</p>
                            <p className="info-text2">Save daily, weekly or monthly towards a target amount, earn up to 10% interest per annum. Withdrawal up to <span style={{color:'#AB2656'}}> 50% </span> of your  savings once every 30 days
                                but you will lose your interest if you don't meet your target</p>
                        </div>
                    </NavLink>
                    <NavLink to="/savings/create-stash_step1">
                        <div className="stash-goal">
                            <img className="goal-icon" src={stash} alt=''/>
                            <p className="plan-text">Stash</p>
                            <p className="info-text2">Save whatever you want whenever you want and earn up to 10% interest per annum with cashout interest every month but you will lose your interest if you don't save for a minimum of 30 days</p>
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
            else if(customerGoalTransHistory.customer_goal === 'FETCH_CUSTOMER_GOAL_TRANS_HISTORY_SUCCESS' && this.state.visible){
                let goals = customerGoalTransHistory.customer_goal_data.response.data;


                if(goals.length === 0 ){
                    this.setState({visible: false})
                    return(
                        <div className="row choosegoalwrap">

                                <NavLink to={"/savings/fixed-goal"}>

                                    <div className="fixed-goal">
                                        <img className="goal-icon" src={calender} alt=''/>
                                        <p className="flex-text">Fixed Goal</p>
                                        <p className="info-text3">Save daily, weekly or monthly towards
                                            a target amount, earn up to 10% interest per annum. No withdrawals allowed and you will lose your interest if you don't meet your target.
                                        </p>
                                    </div>

                                </NavLink>

                            <NavLink to={"/savings/flex-goal"}>

                                <div className="flex-goal">
                                    <img className="goal-icon" src={graph} alt=''/>
                                    <p className="plan-text">Flexi Goal</p>
                                    <p className="info-text2">Save daily, weekly or monthly towards a target amount, earn up to 10% interest per annum. Withdrawal up to <span style={{color:'#AB2656'}}> 50% </span> of your  savings once every 30 days
                                        but you will lose your interest if you don't meet your target</p>
                                </div>
                            </NavLink>
                            <NavLink to={"/savings/create-stash_step1"}>

                                <div className="stash-goal">
                                    <img className="goal-icon" src={stash} alt=''/>
                                    <p className="plan-text">Stash</p>
                                    <p className="info-text2">Save whatever you want whenever you want and earn up to 10% interest per annum with cashout interest every month but you will lose your interest if you don't save for a minimum of 30 days</p>
                                </div>
                            </NavLink>
                        </div>
                    );
                }

                return(
                    // user has goals
                        <div className="">
                        <div className="row">
                        <div className="compContainer2">
                            {goals.map((hist, key)=> (
                                    <div className="eachComp2" key={key}>
                                        <div className='topCard' >
                                            <div className="left" >
                                                <p className='top' >{hist.goalTypeName}</p>
                                                <p className='bottom'>{hist.goalName}</p>
                                            </div>
                                            <div className="right">
                                                <i></i>
                                            </div>
                                        </div>
                                        <div id="progressBarDashBoard">
                                        {
                                             hist.goalTypeName === "Stash" ?
                                             <ProgressBar
                                                percentage={hist.percentageCompleted}
                                                discBottom={"₦" + this.toCurrency(hist.amountSaved)}
                                                // discSpan={" " + "₦" + this.toCurrency(hist.targetAmount)}
                                                discBottomSib='Amount Saved'
                                                discBottomRight={hist.percentageCompleted.toFixed(1) + "%"}
                                            />:
                                            <ProgressBar
                                            percentage={hist.percentageCompleted}
                                            discBottom={"₦" + this.toCurrency(hist.amountSaved) + " " + "of"}
                                            discSpan={" " + "₦" + this.toCurrency(hist.targetAmount)}
                                            discBottomSib='Amount Saved'
                                            discBottomRight={hist.percentageCompleted.toFixed(1) + "%"}
                                        />

                                        }
                                            
                                        </div>
                                        <div className='row forDetailsComp'>
                                            <div className="col-xs-4">
                                                <p className="upper">₦{this.toCurrency(hist.targetAmount)}</p>
                                                <p className="lower">{hist.frequency} Savings</p>
                                            </div>
                                            <div className="col-xs-4">
                                                <p className="upper">₦{this.toCurrency(hist.interestEarned)}</p>
                                                <p className="lower">Interest Gained</p>
                                            </div>
                                            <div className="col-xs-4">
                                                <p className="upper">₦{this.toCurrency(hist.interestAccrued)}</p>
                                                <p className="lower">Interest Accrued</p>
                                            </div>
                                        </div>
                                        <div className='bottomDiscriptionDashBoard'>
                                            {
                                                hist.goalTypeName === "Stash" ? <div className="left">
                                                            <div className="innerRight">
                                                            <Link to={{
                                                                pathname:'/savings/top-up-goal-step1',
                                                               
                                                            } }>
                                                                <span style={{fontSize:"12px"
                                                                }} id={JSON.stringify(hist)} onClick={this.handleSubmit}>Top Up Stash</span>
                                                            </Link>


                                                            <Link to={{
                                                                pathname:'/savings/stash-cashout',
                                                                
                                                            } }>
                                                                <span style={{fontSize:"12px"
                                                                }} id={JSON.stringify(hist)} onClick={this.handleSubmit}>Cashout Stash</span>
                                                            </Link>
                                                            </div>

                                                    </div>:
                                                    <div className="left">
                                                        <div className="innerLeft">
                                                            <p><span id="dot">.</span> <span id='message'>Next Payment</span> <span id="date">{moment(hist.nextstandingDate).format('L')}</span></p>
                                                        </div>
                                                    </div>
                                            }

                                            <div className="right">
                                                <Link to={{
                                                    pathname:'/savings/view-goal-summary',
                                                    
                                                } }>
                                                <span style={{
                                                }} id={JSON.stringify(hist)} onClick={this.handleSubmit}>View Details</span>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                            </div>
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
                    <div className="row choosegoalwrap">
                        <NavLink to="/savings/fixed-goal">
                            <div className="fixed-goal">
                                <img className="goal-icon" src={calender} alt=''/>
                                <p className="flex-text">Fixed Goal</p>
                                <p className="info-text3">Save money daily, weekly or monthly towards a target for a fixed period and earn up to 10% interest per annum per annum. No withdrawals allowed and you will lose your interest if you do not meet your target amount.
                                </p>
                            </div>
                        </NavLink>
                        <NavLink to="/savings/flex-goal">
                            <div className="flex-goal">
                                <img className="goal-icon" src={graph} alt=''/>
                                <p className="plan-text">Flexi Goal</p>
                                <p className="info-text2">Save daily, weekly or monthly towards a target and earn up to 10% interest per annum per annum. You can withdraw up to 50% of your savings once every 30 days. You will lose your interest if you do not meet your target amount.</p>
                            </div>
                        </NavLink>
                        <NavLink to="/savings/create-stash_step1">
                            <div className="stash-goal">
                                <img className="goal-icon" src={stash} alt=''/>
                                <p className="plan-text">Stash</p>
                                <p className="info-text2"> Put extra cash away whenever you want and earn up to 10% per annum with an option to cashout interest monthly. Your Stash will need to exist for a minimum of 30 days to qualify for interest.</p>
                            </div>
                        </NavLink>
                    </div>

                );
            }

        }
    }

    render() {
        const GoalTransHistory = this.props.customerGoalTransHistory;

        // console.log("goal-history ",GoalTransHistory.customer_goal_data);


        return (
            <Fragment>
               
                    <div className="row checkSome">
                        <div className="col-sm-12">
                            <p className="page-title">Savings & Goals</p>
                        </div>
                        <div className="col-sm-12">
                            <div className="tab-overflow">
                                <div className="sub-tab-nav">
                                    <ul style={{cursor:"pointer"}}>
                                        <li><a onClick={() => this.setState({visible: true})} href="#" className="active">Goals</a></li>
                                            <li onClick={this.NavigateToGroupSavings}><a className="forGroupLink">Group Savings</a></li>
                                        {/* <NavLink to="/savings/fixed-goal">
                                            <li><a href="#">Investments</a></li>
                                        </NavLink> */}
                                        {
                                            this.state.visible ?
                                            <li style={{float:'right',color:'white',fontSize:'16px'}}> <a onClick={this.togglePage} className="btn-alat">Create a Savings Goal</a> </li> : null
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {this.renderGoalsElement(GoalTransHistory)}
                        </div>
                    </div>
                   
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    customerGoalTransHistory:state.CustomerGoalReducerPile.customerGoalTransHistory,
    groupSavingsEsusu: state.getGroupSavingsEsusu.data,
    groups: state.customerGroup.data,
    submitDashboardData:state.CustomerGoalReducerPile.submitDashboardData
});

export default connect (mapStateToProps)(GoalPlan);












