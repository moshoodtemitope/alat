import React, { Component } from 'react';
import {Fragment} from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import {NavLink} from 'react-router-dom'
import {flexGoalConstants} from '../../../redux/constants/goal/flex-goal.constant'
import * as actions from '../../../redux/actions/savings/goal/flex-goal.actions'


 

 class FlexGoalSummary extends Component {
     constructor(props){
         super(props);

        this.state={
            targetAmount:null,
            startDate:"",
            goalName:"flex",
            goalFrequency:"",
            debitAccount:"",
            debitAmount:null,
            showInterests:"",
            GoalTypeId:6,
            frequencyId:3,
            FrequencyDurationId:12,
            goalFrequencyValue:""


        }
     }


    componentDidMount = () => {
        this.init();
    };

    init = () => {
        if (this.props.flex_goal_step2.flex_step2_status !== flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS_STEP2)
            this.props.history.push("/savings/flex-goal");
        else {
            var data = {
                ...this.props.flex_goal_step2.flex_step2_data.data
            };
            console.log('tag', data);

            this.setState({
                targetAmount:data.targetAmount,
                startDate:data.startDate,
                goalName:data.goalName,
                goalFrequency:data.goalFrequency,
                debitAccount:data.debitAccount,
                debitAmount:data.debitAmount,
                goalFrequencyValue:data.goalFrequencyValue

            });
        }
    };
    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.dispatch(actions.addFlexGoal({
            "GoalName":this.state.goalName,
            "StartDate":this.state.startDate,
            "goalFrequency":this.state.goalFrequency,
            "DebitAccount":this.state.debitAccount,
            "DebitAmount":this.state.debitAmount,
            "GoalTypeId":this.state.GoalTypeId,
            "FrequencyId":this.state.frequencyId,
            'FrequencyDurationId':this.state.FrequencyDurationId
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
                                    <NavLink to="/savings/goal/group-savings-selection">
                                    <li><a href="/savings/goal/group-savings-selection">Group Savings</a></li>
                                    </NavLink>                                    
                                    <li><a href="#">Investments</a></li>
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                    {this.props.alert && this.props.alert.message &&
                        <div style={{width: "100%", marginLeft:"150px",marginRight:"150px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                    }
                    <h1 style={{margin:"auto", color:"#AB2656", fontSize:'18px',fontFamily:"proxima_novasemibold"}}>Flexi Goal Summary</h1>
                        <div style={{margin:"30px"}}></div>

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
                                                {/* <div className="right">
                                                    <p className='GoalText'>End Date</p>
                                                    <p className='boldedText'>{moment(this.state.endDate).format('MMMM,D,YYYY')} </p>
                                                </div>   */}
                                        </div>

                                        <div className="coverForSummary">
                                            <div className="left">
                                                <p className='GoalText'>Contributions</p>
                                                <p className='boldedText'>₦{this.state.debitAmount}/{this.state.goalFrequency}-{this.state.goalFrequencyValue}</p>
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
                                                <button  disabled={this.props.add_flex_goal.add_flex_goal_status === flexGoalConstants.ADD_FLEX_GOAL_PENDING}

                                                         type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                    {this.props.add_flex_goal.add_flex_goal_status === flexGoalConstants.ADD_FLEX_GOAL_PENDING ? "Processing..." :"Create Goal"}
                                                </button>
                                            </center>
                                        </div>
                                    
                                    </div>
                                    </form>

                                
                                </div>
                                <center>
                                    <a onClick={() => { this.props.dispatch(actions.ClearAction(flexGoalConstants.FLEX_GOAL_REDUCER_CLEAR));
                                        this.props.history.push('/savings/flex-goal') }} className="add-bene m-t-50">Go to Back</a>
                                </center>

                            
                            </div>
                            <a style={{ cursor: "pointer" }} onClick={() => { this.props.dispatch(actions.ClearAction(flexGoalConstants.FLEX_GOAL_REDUCER_CLEAR));
                                                this.props.history.push('/savings/flex-goal-step2') }} className="add-bene m-t-50">
                                                Go back
                            </a>

                        
                        
                        </div>

                    
                    
                    </div>
                
                
                </div>
                
                
           </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    flex_goal_step1: state.FlexGoalReducerPile.flex_goal_step1,
    flex_goal_step2:state.FlexGoalReducerPile.flex_goal_step2,
    alert: state.alert,
    add_flex_goal:state.FlexGoalReducerPile.add_flex_goal

});
export default connect(mapStateToProps)(FlexGoalSummary);

