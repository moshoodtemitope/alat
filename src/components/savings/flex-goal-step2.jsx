import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import Select from 'react-select';
import { connect } from 'react-redux';
import {flexGoalConstants} from '../../redux/constants/goal/flex-goal.constant'
import * as actions from '../../redux/actions/savings/goal/flex-goal.actions'
import SelectDebitableAccounts from '../../shared/components/selectDebitableAccounts';
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
            startDate:"",
            endDate:"",
            goalName:"",
            goalFrequency:"",
            //accountNumber:"",
            debitAccount:"",
            isSubmitted: false,
            isAccountInvalid: false,
            frequency:"",
            goalFrequencyInvalid:false

           
         };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);


        
      

    }
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    }
    getAbsoulteMonths(momentDate) {
        var months = Number(momentDate.format("MM"));
        var years = Number(momentDate.format("YYYY"));
        return months + (years * 12);
    }
    getMonthsBetween(from,to){
        if (from > to) return this.getMonthsBetween(to, from);
        let fromYear = moment(from).year();
        let toYear = moment(to).year();
        let toMonth = moment(to).month();
        let fromMonth = moment(from).month();
        let fromDay = moment(from).date();
        let toDay = moment(to).date();
        fromMonth += 1; //Moment returns January as 0 for instance
        toMonth += 1;
        var startMonths = this.getAbsoulteMonths(from);
        var endMonths = this.getAbsoulteMonths(to);
        var monthDiff = endMonths - startMonths;
        let futureDate = moment(from).add(monthDiff, 'months').format('DD MMMM, YYYY');
        if (futureDate > to || toDay < fromDay)
        {
            return monthDiff - 1;
        }
        else
        {
            return monthDiff + 1;
        }
    }
    GetDailyFutureValue(debitAmount, annualInterestRate, days){
        let futureValue = debitAmount;
        let dailyRate = (annualInterestRate * 100) / 36500;
        let interestAccrued = 0;
        for (let i = 1; i <= days; i++)
        {
            if (i < days)
            {
                futureValue += debitAmount;
            }
            interestAccrued += dailyRate * futureValue;
            //Monthly compounding
            if (i % 30 == 0)
            {
                futureValue += interestAccrued;
                interestAccrued = 0;
            }
        }
        return futureValue += interestAccrued;
    }
    GetWeeklyFutureValue(debitAmount, annualInterestRate, days){
        let futureValue = debitAmount;  
        let dailyRate = (annualInterestRate * 100) / 36500;
        let interestAccrued = 0;
        for (let i = 1; i <= days; i++)
        {
            //weekly addition
            if (i < days && i % 7 == 0)
            {
                futureValue += debitAmount;
            }
            interestAccrued = interestAccrued + (dailyRate * futureValue);
            //Monthly compounding
            if (i % 30 == 0)
            {
                futureValue += interestAccrued;
                interestAccrued = 0;
            }
        }
        let result = futureValue += interestAccrued;
        return result;
        
    }
    // this will get the interest valueof every amount entered
    calculateWeekly(){
        let days = null;
        let res;
        let finalInterest;
        let amount= parseFloat(this.removeComma(this.state.targetAmount));
        let startDate = moment(this.state.startDate, 'DD MMMM, YYYY');
        let enddate = moment(this.state.endDate, 'DD MMMM, YYYY');
        // let date = moment(enddate, 'DD-MM-YYYY').add(res, 'days');
        res = enddate.diff(startDate, 'week');
        let months = Math.round((res/365) * 12);
        let debitAmount = (amount/months).toFixed(2);
        let debitValue = amount/this.getMonthsBetween(startDate, enddate);
        finalInterest = this.GetWeeklyFutureValue(debitValue, 0.10, months);
        this.interest = finalInterest;
        this.showInterests = true;
        this.frequencyAmount = (amount/months).toFixed(2);
        return parseFloat(this.interest).toFixed(2);
    }
    // this will get the interest value of every amount entered
    calculateDaily(){
        let days = null;
        let res;
        let finalInterest;
        let amount= parseFloat(this.removeComma(this.state.targetAmount));
        let startDate = moment(this.state.startDate, 'DD MMMM, YYYY');
        let enddate = moment(this.state.endDate, 'DD MMMM, YYYY');
        // let date = moment(enddate, 'DD-MM-YYYY').add(res, 'days');
        res = enddate.diff(startDate, 'days');
        let months = Math.round((res/365) * 12);
        let debitAmount = (amount/months).toFixed(2);
        let debitValue = amount/this.getMonthsBetween(startDate, enddate);
        finalInterest = this.GetDailyFutureValue(debitValue, 0.10, months);
        this.interest = finalInterest;
        this.showInterests = true;
        this.frequencyAmount = (amount/months).toFixed(2);
        return parseFloat(this.interest).toFixed(2);
        

    }
    //this method is to calculate the monthly interest value for every amount entered
    ComputeDebitAmount(frequency){
        let timeBetween;
        let amount= parseFloat(this.removeComma(this.state.targetAmount));
        let startDate = moment(this.state.startDate, 'DD MMMM, YYYY');
        let enddate = moment(this.state.endDate, 'DD MMMM, YYYY');
      
        if (frequency.value == "daily")
        {
           timeBetween = enddate.diff(startDate,'days') + 1
            console.log(timeBetween)
  
        }
  
        else if (frequency.value == "weekly")
        {
            timeBetween = enddate.diff(startDate, 'week') + 1;
        }
        else
        {
          let years = (Number(enddate.format("YYYY") - Number(startDate.format("YYYY"))));
          let targetMonth = Number(enddate.format("MM"));
          let startMonth = Number(startDate.format("MM"));
          let startDay = moment(startDate).date();
          let endDay = moment(enddate).date();
          timeBetween = (years * 12) + (targetMonth - startMonth);
          if (endDay >= startDay){
            timeBetween += 1;
          }           
        }
  
        if (timeBetween < 1){
          timeBetween = 1;
          console.log('timeBetween', timeBetween)
        }
      //   console.log("monthly" +amount/timeBetween)
        return parseFloat(amount/timeBetween).toFixed(2)
        
    }
    handleSelectChange = (frequency) => {
        this.setState({ "goalFrequency": frequency.value,
                        "goalFrequency" : frequency.label
              });
        if (this.state.formsubmitted && frequency.value != "")
            this.setState({ goalFrequencyInvalid: false })

            if (frequency.value.toLowerCase() == "daily") {
          
                // let {frequency, targetAmount, endDate} = this.state;
                 this.setState({
                    showInterests:this.calculateDaily(this.state.frequency,this.state.targetAmount,this.state.startDate,this.state.endDate),
    
                })
            }
            if (frequency.value.toLowerCase() == "weekly") {
          
                // let {frequency, targetAmount, endDate} = this.state;
                 this.setState({
                    showInterests:this.calculateWeekly(this.state.frequency,this.state.targetAmount,this.state.startDate,this.state.endDate),
    
                })
            }
            if (frequency.value.toLowerCase() == "monthly") {
          
                // let {frequency, targetAmount, endDate} = this.state;
                 this.setState({
                    showInterests:this.ComputeDebitAmount(this.state.frequency,this.state.targetAmount,this.state.startDate,this.state.endDate),
    
                })
            }
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
    checkgoalFrequency = () => {
        if (this.state.goalFrequency == "") {
            this.setState({ goalFrequencyInvalid: true });
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
                endDate: data.endDate,
                goalName:data.goalName,
                showInterests:data.showInterests,
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
        if (this.checkAccountNumber()|| this.checkgoalFrequency()) {

        } else {
            this.setState({isSubmitted : true });
            this.props.dispatch(actions.fetchFlexGoalStep2({
                "goalName":this.state.goalName,
                "startDate":this.state.startDate,
                "endDate":this.state.endDate,
                "targetAmount":this.state.targetAmount,
                "goalFrequency":this.state.goalFrequency,
                "debitAccount":this.state.debitAccount,
                "showInterests":this.state.showInterests,
            }));
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
                <InnerContainer>
                    <SavingsContainer>
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
                                            <NavLink to="/savings/goal/group-savings-selection">
                                            <li><a href="statement.html">Group Savings</a></li>
                                            </NavLink>                                            
                                            <li><a href="#">Investments</a></li>
                                        
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
                                       <p className="header-info">To achieve your target of <span style={{color:'#AB2656'}}>N{this.state.targetAmount} <span style={{color:'#444444'}}>by</span>  Dec 12,2018</span></p>

                                            <form onSubmit={this.onSubmit}>
                                            
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label className="label-text">You will have to save</label>
                                                    <input type="text"
                                                     value={this.state.showInterests} 
                                                     onChange={this.handleChange}
                                                      placeholder="E.g. ₦100,000"/>
                                                </div>
                                                <div className={goalFrequencyInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                    <label className="label-text">How often would  you save</label>
                                                    <Select type="text" 
                                                    options={selectedTime} 
                                                    value={goalFrequency.label}
                                                    name="goalFrequency"
                                                    onChange={this.handleSelectChange}/>
                                                    {goalFrequencyInvalid && <div className='text-danger'>Enter duration</div>}
                                                </div>
                                            </div>
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
const mapStateToProps = state => ({
    flex_goal_step1:state.flex_goal_step1,
    flex_goal_step2:state.flex_goal_step2
})
export default connect(mapStateToProps)(FlexGoal);
