import React, { Component } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import {Fragment} from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import {fixedGoalConstants} from '../../redux/constants/goal/fixed-goal.constant';
import * as actions from '../../redux/actions/savings/goal/fixed-goal.actions'
 



 

 class submitFixedGoal extends Component {
     constructor(props){
         super(props)

        this.state={
            targetAmount:"",
            startDate:"",
            endDate:"",
            goalName:"",
            goalFrequency:"",
            showInterests:"",
            debitAccount:""

        }
     }


    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.fixed_goal_step2.fixed_step2_status != fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS_STEP2)
            this.props.history.push("/savings/fixed-goal-complete");
        else {
            var data = {
                ...this.props.fixed_goal_step2.fixed_step2_data.data
            };
            console.log('tag', data)

            this.setState({
                targetAmount:data.targetAmount,
                startDate: data.startDate,
                endDate: data.endDate,  
                goalName:data.goalName,
                showInterests:data.showInterests,
                debitAccount:data.debitAccount,
                goalFrequency:data.goalFrequency
            });
        }
    };
    handleSubmit=()=>{
        event.preventDefault();
        this.props.dispatch(actions.addFixedGoal({
            "goalName":this.state.goalName,
            "startDate":this.state.startDate,
            "endDate":this.state.endDate,
            "targetAmount":this.state.targetAmount,
            "goalFrequency":this.state.goalFrequency,
            "debitAccount":this.state.debitAccount,
            "showInterests":this.state.showInterests,
        }));

    }

    
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
                                    <li><a href="accounts.html" className="active">Goals</a></li>
                                    <li><a href="statement.html">Group Savings</a></li>
                                    <li><a href="#">Investments</a></li>
                                
                                </ul>
                            </div>
                        </div>
                    </div>


                        {this.props.alert && this.props.alert.message &&
                            <div style={{width: "100%"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                        }
                    <h1 style={{margin:"auto", color:"#AB2656", fontSize:'18px',fontFamily:"proxima_novasemibold"}}>Fixed Goal Summary</h1>
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
                                                <div className="right">
                                                    <p className='GoalText'>End Date</p>
                                                    <p className='boldedText'>{moment(this.state.endDate).format('MMMM,D,YYYY')} </p>
                                                </div>  
                                        </div>

                                        <div className="coverForSummary">
                                            <div className="left">
                                                <p className='GoalText'>Contributions</p>
                                                <p className='boldedText'>₦{this.state.showInterests}/{this.state.goalFrequency}</p>
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
                                                <button disabled={this.props.add_fixed_goal.add_goal_status == fixedGoalConstants.ADD_FIXED_GOAL_PENDING}
 
                                                 type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                 {this.props.add_fixed_goal.add_goal_status == fixedGoalConstants.ADD_FIXED_GOAL_PENDING ? "Processing..." :"Create Goal"}

                                                 </button>
                                            </center>
                                        </div>
                                    
                                    </div>
                                    </form>

                                
                                </div>

                            
                            </div>

                        
                        
                        </div>
                        </div>
                    </div>
                    
                    
                
                
                
                </SavingsContainer>
            </InnerContainer>
           
           </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    fixed_goal_step1: state.fixed_goal_step1,
    fixed_goal_step2:state.fixed_goal_step2,
    add_fixed_goal:state.add_goal_reducer,
    alert: state.alert,

})
export default connect(mapStateToProps)(submitFixedGoal);

