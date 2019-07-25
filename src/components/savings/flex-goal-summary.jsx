import React, { Component } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import {Fragment} from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import {fixedGoalConstants} from '../../redux/constants/goal/fixed-goal.constant';



 

 class FlexGoalSummary extends Component {
     constructor(props){
         super(props)

        this.state={
            AmountSavedText:"",
            startDate:"",
            endDate:"",
            goalName:"",
            timeSaved:"",
            selectedAccount:""

        }
     }


    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.fixed_goal_step2.fixed_step2_status != fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS_STEP2)
            this.props.history.push("/savings/flex-goal-step2");
        else {
            var data = {
                ...this.props.fixed_goal_step2.fixed_step2_data.data
            };
            console.log('tag', data)

            this.setState({
                AmountSavedText:data.AmountSavedText,
                startDate: data.startDate,
                endDate: data.endDate,  
                goalName:data.goalName,
                timeSaved:data.timeSaved,
                selectedAccount:data.selectedAccount,
            });
        }
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
                    <h1 style={{margin:"auto", color:"#AB2656", fontSize:'18px',fontFamily:"proxima_novasemibold"}}> Flexi Goal Summary</h1>
                        <div style={{margin:"30px"}}></div>

                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <div className="coverForSummary">
                                            <div className="left">
                                                <p className='GoalText'>Goal Name</p>
                                                <p className='boldedText'>{this.state.goalName}</p>
                                            </div>
                                            <div className="right">
                                                <p className='GoalText'>Target Amount</p>
                                                <p className='boldedText'>₦{this.state.AmountSavedText}</p>
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
                                                <p className='boldedText'>₦{this.state.AmountSavedText}/{this.state.timeSaved}</p>
                                            </div>
                                            <div className="right">
                                                <p className='GoalText'>Account to Debit</p>
                                                <p className='boldedText'>{this.state.selectedAccount}</p>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <center>
                                                <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Create Goal</button>
                                            </center>
                                        </div>
                                    
                                    </div>

                                
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
    fixed_goal_step1: state.fixed_reducer,
    fixed_goal_step2:state.fixed_reducer2
})
export default connect(mapStateToProps)(FlexGoalSummary);

