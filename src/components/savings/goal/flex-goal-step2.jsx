import React from 'react'
 import {Fragment} from "react";
 import InnerContainer from '../../../shared/templates/inner-container';
 import SavingsContainer from '..';
 import Select from 'react-select';
 import { connect } from 'react-redux';
 import {flexGoalConstants} from '../../../redux/constants/goal/flex-goal.constant'
 import * as actions from '../../../redux/actions/savings/goal/flex-goal.actions'
 import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
 import moment from 'moment';
 import {NavLink, Redirect} from "react-router-dom";
 import "react-datepicker/dist/react-datepicker.css";
 const selectedTime = [

     { value: 'monthly',label:"Monthly" },
     {  value: 'weekly', label:"Weekly" },
     {  value: 'daily',  label:"Daily"},

 ];
 class FlexGoal extends React.Component {

     constructor(props){
         super(props)
         this.state={
             targetAmount:"",
             user: JSON.parse(localStorage.getItem("user")),

             startDate:"",
             endDate:"",
             goalName:"",
             goalFrequency:"",
             //accountNumber:"",
             debitAccount:"",
             isSubmitted: false,
             isAccountInvalid: false,
             frequency:"",
             goalFrequencyValue:"",
             goalFrequencyInvalid:false


          };
         this.onSubmit = this.onSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this)
         this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);
}



     handleSelectDebitableAccounts(account) {
         console.log('dss', account);
         this.setState({ debitAccount: account })
         if (this.state.isSubmitted) {
             if(account.length == 10)
             this.setState({ isAccountInvalid: false })
          }
     }
     checkAccountNumber() {
         if (this.state.debitAccount.length != 10) {
             this.setState({ isAccountInvalid: true })
             return true;
         }
     }

     componentDidMount = () => {
         this.init();
     }

     init = () => {
         if (this.props.flex_goal_step1.flex_step1_status != flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS)
             this.props.history.push("/savings/flex-goal");
         else {
             var data = {
                 ...this.props.flex_goal_step1.flex_step1_data.data
             };
             console.log('tag', data)

             this.setState({
                 targetAmount:data.targetAmount,
                 startDate: data.startDate,
                 goalName:data.goalName,
                 debitAmount:data.debitAmount,
                 goalFrequencyValue:data.goalFrequencyValue,
                 goalFrequency:data.goalFrequency,

             });
         }
     }

     handleChange = (e) => {
         let name = e.target.name;
         this.setState({ [name]: e.target.value })
     }

     onSubmit(event){
         event.preventDefault();

         this.setState({ isSubmitted: true });
         if (this.checkAccountNumber()) {

         } else {
             this.setState({isSubmitted : true });
             //console.log('condition returned true');
             let data = {
                "goalName":this.state.goalName,
                "startDate":this.state.startDate,
                "targetAmount":this.state.targetAmount,
                "debitAmount":this.state.debitAmount,
                "goalFrequency":this.state.goalFrequency,
                "debitAccount":this.state.debitAccount,
                "goalFrequencyValue":this.state.goalFrequencyValue,

            }
            //console.log(data);
            //return;
            this.props.dispatch(actions.fetchFlexGoalStep2(data));
         }

     }
     gotoStep3 = () => {
         if (this.props.flex_goal_step2)
             if (this.props.flex_goal_step2.flex_step2_status == flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS_STEP2) {
                 return <Redirect to="/savings/flex-goal-summary" />
             }
     }





     render() {

         let { goalFrequency,goalFrequencyInvalid} =this.state

         return (
             <Fragment>
                        {this.gotoStep3()}

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
                                             <li><a href="statement.html">Group Savings</a></li>
                                             </NavLink>
                                             {/* <li><a href="#">Investments</a></li> */}

                                         </ul>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-sm-12">
                                 <div className="row">
                                     <div className="col-sm-12">
                                       <div className="max-600">
                                        <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Create a Flexi Goal</h4>
                                        <p className="header-info">To achieve your target of <span style={{color:'#AB2656'}}>N{this.state.targetAmount} <span style={{color:'#444444'}}>by </span>{this.state.goalFrequencyValue}</span></p>

                                             <form onSubmit={this.onSubmit}>


                                             <div className="form-group">
                                                 <SelectDebitableAccounts
                                                 labelText={"Select an account to debit"}
                                                 value={this.state.accountNumber}
                                                 accountInvalid={this.state.isAccountInvalid}
                                                 onChange={this.handleSelectDebitableAccounts} />
                                             </div>

                                             <div className="row">
                                             <div className="col-sm-12">
                                             <center>
                                                 <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Next

                                                 </button>
                                             </center>


                                             </div>

                                             </div>

                                             </form>



                                         </div>


                                        </div>
                                        <a style={{ cursor: "pointer" }} onClick={() => { this.props.dispatch(actions.ClearAction(flexGoalConstants.FLEX_GOAL_REDUCER_CLEAR));
                                                this.props.history.push('/savings/flex-goal') }} className="add-bene m-t-50">
                                                Go back
                                        </a>

                                       </div>

                                 </div>

                             </div>

                         </div>


                     


             </Fragment>
         );
     }
 }
 const mapStateToProps = state => ({
     flex_goal_step1:state.FlexGoalReducerPile.flex_goal_step1,
     flex_goal_step2:state.FlexGoalReducerPile.flex_goal_step2
 })
 export default connect(mapStateToProps)(FlexGoal);
