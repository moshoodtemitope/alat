import React, { Component } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import {Fragment} from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import {NavLink} from 'react-router-dom'
import {flexGoalConstants} from '../../redux/constants/goal/flex-goal.constant'
import * as actions from '../../redux/actions/savings/goal/flex-goal.actions'


 

 class FlexGoalSummary extends Component {
     constructor(props){
         super(props);

        this.state={
            targetAmount:null,
            startDate:"",
            endDate:"",
            goalName:"flex",
            goalFrequency:"",
            debitAccount:"",
            debitAmount:null,
            showInterests:"",
            GoalTypeId:3,
            frequencyId:6,
            FrequencyDurationId:4


        }
     }


    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.flex_goal_step2.flex_step2_status !== flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS_STEP2)
            this.props.history.push("/savings/flex-goal-step2");
        else {
            var data = {
                ...this.props.flex_goal_step2.flex_step2_data.data
            };
            console.log('tag', data);

            this.setState({
                targetAmount:parseFloat(data.targetAmount),
                startDate:data.startDate,
                endDate:data.endDate,  
                goalName:data.goalName,
                goalFrequency:data.goalFrequency,
                debitAccount:data.debitAccount,
                debitAmount	:parseFloat(data.showInterests),

            });
        }
    };
    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.dispatch(actions.addFlexGoal({
            "goalName":this.state.goalName,
            "startDate":this.state.startDate,
            "targetAmount": parseFloat(this.state.targetAmount),
            "goalFrequency":this.state.goalFrequency,
            "debitAccount":this.state.debitAccount,
            "debitAmount":parseFloat(this.state.debitAmount),
            "GoalTypeId":this.state.GoalTypeId,
            "frequencyId":this.state.frequencyId
        }));

    };
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
                                    <NavLink to="/savings/goal/group-savings-selection">
                                    <li><a href="statement.html">Group Savings</a></li>
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
                                                <p className='boldedText'>₦{this.state.debitAmount}/{this.state.goalFrequency}</p>
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
    flex_goal_step1: state.flex_goal_step1,
    flex_goal_step2:state.flex_goal_step2,
    alert: state.alert,
    add_flex_goal:state.add_flex_goal

})
export default connect(mapStateToProps)(FlexGoalSummary);

