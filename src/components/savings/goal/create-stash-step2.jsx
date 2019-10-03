import React, { Component } from 'react';
import {Fragment} from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import * as util from '../../../shared/utils'
import {createGoalConstants} from '../../../redux/constants/goal/create-stash.constant';
import * as actions from '../../../redux/actions/savings/goal/create-stash-goal.actions'
 

class StashSummmary extends Component {
     constructor(props){
         super(props);

        this.state={
            targetAmount:"",
            startDate:"",
            endDate:"",
            goalName:"",
            goalFrequency:"",
            payOutInterest:"",
            debitAccount:"",
            debitAmount:"",
            GoalTypeId:4
        }
     }


    componentDidMount = () => {
        this.init();
    };

    init = () => {
        if (this.props.create_stash_goal_step1.stash_goal_step1_status !== createGoalConstants.CREATE_STASH_GOAL_SUCCESS_STEP1)
            this.props.history.push("/savings/create-stash_step1");
        else {
            let data = {
                ...this.props.create_stash_goal_step1.stash_goal_step1_data.data
            };
            // console.log('tag', data);

            this.setState({
                targetAmount:data.targetAmount,
                startDate: data.startDate,
                goalName:data.goalName,
                payOutInterest:data.payOutInterest,
                debitAccount:data.debitAccount,
            });
        }
    };
    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.dispatch(actions.CreateStashGoal({
            "goalName":this.state.goalName,
            // "startDate":this.state.startDate,
            "targetAmount":this.state.targetAmount,
            "debitAccount":this.state.debitAccount,
            "debitAmount":this.state.payOutInterest,  
            "FrequencyId":this.state.FrequencyId,
            "FrequencyDurationId":this.state.FrequencyDurationId,
            "startDate":moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
            "isAutomaticDebit": true,
            "GoalTypeId":this.state.GoalTypeId,
            // 'StartDate': moment.format(this.state.startDate('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
        }));

    };

    
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
                                    <li><a href="accounts.html" className="active">Goals</a></li>
                                    <NavLink to="/savings/activityDashBoard">
                                    <li><a href="/savings/activityDashBoard">Group Savings</a></li>
                                    </NavLink>
                                    {/* <li><a href="#">Investments</a></li> */}
                                
                                </ul>
                            </div>
                        </div>
                    </div>

                        {this.props.alert && this.props.alert.message &&
                            <div style={{width: "100%",}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                        }

                    <h1 style={{width:"100%", textAlign:"center", color:"#AB2656", paddingLeft:"15px", fontSize:'18px'}}>Stash Goal Summary</h1>
                        <div style={{margin:"30px", marginLeft:"120px",marginRight:"120px"}}></div>

                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="al-card no-pad">
                                        <div className="coverForSummary">
                                            <div className="left">
                                                <p className='GoalText'>Goal Name</p>
                                                <p className='boldedText'>{this.state.goalName}</p>
                                            </div>
                                            <div className="right">
                                                <p className='GoalText'>Target Amount</p>
                                                <p className='boldedText'>₦{this.state.targetAmount}</p>
                                            </div>
                                        </div>
                                        <div className="coverForSummary">
                                                <div className="left">
                                                    <p className='GoalText'>Start Date</p>
                                                    <p className='boldedText'>{moment(this.state.startDate).format('MMMM,D,YYYY')}</p>
                                                </div>
                                                {/*<div className="right">*/}
                                                {/*<p className='GoalText'>Start Date</p>*/}
                                                {/*<p className='boldedText'>{moment(this.state.startDate).format('MMMM,D,YYYY')}</p>*/}
                                                {/*</div>*/}
                            
                                        </div>

                                        <div className="coverForSummary">
                                            <div className="left">
                                                <p className='GoalText'>Contributions</p>
                                                <p className='boldedText'>₦{this.state.payOutInterest}</p>
                                            </div>
                                            <div className="right">
                                                <p className='GoalText'>Account to Debit</p>
                                                <p className='boldedText'>{this.state.debitAccount}</p>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <center>
                                                <button disabled={this.props.create_stash_goal.create_stash_goal_status === createGoalConstants.CREATE_STASH_GOAL_PENDING}
                                                 type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                 {this.props.create_stash_goal.create_stash_goal_status === createGoalConstants.CREATE_STASH_GOAL_PENDING ? "Processing..." :"Create Goal"}
                                                 </button>
                                            </center>
                                        </div>
                                    
                                    </div>
                                    </form>

                                
                                </div>
                                <a style={{ cursor: "pointer" }} onClick={() => { this.props.dispatch(actions.ClearAction(createGoalConstants.STASH_GOAL_REDUCER_CLEAR));
                                                this.props.history.push('/savings/create-stash_step1') }} className="add-bene m-t-50">
                                                Go back
                                        </a>

                            
                            </div>

                        
                        
                        </div>
                        </div>
                    </div>
           
           </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    create_stash_goal_step1:state.CreateGoalReducerPile.create_stash_step1,
    create_stash_goal:state.CreateGoalReducerPile.create_stash_goal,
    alert: state.alert,

});
export default connect(mapStateToProps)(StashSummmary);

