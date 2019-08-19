import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import {NavLink, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import {fixedGoalConstants} from '../../redux/constants/goal/fixed-goal.constant'
import * as actions from '../../redux/actions/savings/goal/fixed-goal.actions'
import "react-datepicker/dist/react-datepicker.css";
import * as util from '../../shared/utils'
import moment from 'moment';


const selectedTime = [
           
    { "id":3, value: 'monthly',label:"Monthly" },
    { "id":2, value: 'weekly', label:"Weekly" },
    { "id":1, value: 'daily', label:"Daily"},
   
];





class FixedGoal extends React.Component {

    constructor(props){
        super(props);
        this.state={
            goalName:"",
            startDate:null,
            endDate:null,
            AmountSavedText:"",
            targetAmount:"",
            frequency:"",
            goalFrequency:"",
            isSubmitted : false,
            endDateInvalid:false,
            startDateInvalid:false,
            targetAmountInvalid:false,
            GoalNameInvalid:false,
            goalFrequencyInvalid:false,
            showInterests:"",
            showMessage: false,
            frequencyAmount:""


        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDatePicker = this.handleStartDatePicker.bind(this);
        this.handleEndDatePicker = this.handleEndDatePicker.bind(this)
    }
    componentDidMount(){
        console.log('interest loan rate',this.state.targetAmount)
    };
    valStartDate = () => {
        if (this.state.startDate == null) {
            this.setState({ startDateInvalid: true });
            return true;
        } else {
            this.setState({ startDateInvalid: false });
            return false;
        }
    };
    valEndDate = () => {
        if (this.state.endDate == null) {
            this.setState({ endDateInvalid: true });
            return true;
        } else {
            this.setState({ endDateInvalid: false });
            return false;
        }
    };
    handleChange = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value })
    };
    checkGoalName = () => {
        if (this.state.goalName == "") {
            this.setState({ GoalNameInvalid: true });
            return true;
        }
    };
    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        this.setState({ startDate: startDate });
    };
    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
        this.setState({ endDate: endDate });
    };
    
    checkAmount = () => {
        if (this.state.targetAmount == "") {
            this.setState({ targetAmountInvalid: true });
            return true;
        }
    };
    checkgoalFrequency = () => {
        if (this.state.goalFrequency == "") {
            this.setState({ goalFrequencyInvalid: true });
            return true;
        }
    };
    
    handleAmount = (e) => {
        // console.log
         var intVal = e.target.value.replace(/,/g, '');
         if (/^\d+(\.\d+)?$/g.test(intVal)) {
             // if (parseInt(intVal, 10) <= 2000000) {
             this.setState({ targetAmount: intVal, targetAmount: this.toCurrency(intVal) },
                 () => this.setFregValue());
             // }
         } else if (e.target.value == "") {
             this.setState({ targetAmount: "", targetAmount: "" },
                 () => this.setFregValue());
         }
 
         if(this.state.isSubmitted == true)
         if (this.state.formsubmitted) {
                    if (e != "")
                        this.setState( {  targetAmountInvalid: false });
                }
    };
 
    toCurrency(number) {
         // console.log(number);
         const formatter = new Intl.NumberFormat('en-US', {
             style: "decimal",
             currency: "USD",
             maximumFractionDigits: 2
         });
 
         return formatter.format(number);
    };
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    };
    
 
    handleSelectChange = (frequency) => {
        this.setState({ "goalFrequency": frequency.value,
                        "goalFrequency" : frequency.label
              });
        if (this.state.formsubmitted && frequency.value != "")
            this.setState({ goalFrequencyInvalid: false })
    };
    setFregValue = () => {
        this.setState({ showInterests: this.calculateMonthly(this.state.targetAmount, this.state.startDate, this.state.endDate) })
    };
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
   
    GetFixedGoalFutureValue(debitAmount, annualInterestRate, months){
        let futureValue= 0;
        var result;
        let rate = ((annualInterestRate - 0.01) / 12);
        for (let n = 1; n <= months; n++)
        {
            var multiplier = (1 + rate);
            futureValue += debitAmount * (Math.pow(multiplier, n));
        }
        result = futureValue - (debitAmount * months); //I dont even know why, with the /6.02, it matched with mobile calc
        return this.toCurrency2(parseFloat(result).toFixed(2));
    }
    toCurrency2 =(currency) =>{
        if (currency) {
          currency = typeof currency !== 'string' ? currency.toString() : currency;
          let numberValueArray = currency.split('.');
          let numberValue = this.removeComma(numberValueArray[0]);
          currency = numberValueArray.length > 1 ? numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
            + '.' + numberValueArray[1] : numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        return currency;
    };
    getAbsoulteMonths(momentDate) {
        var months = Number(momentDate.format("MM"));
        var years = Number(momentDate.format("YYYY"));
        return months + (years * 12);
    }
     
    calculateMonthly(){
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
        finalInterest = this.GetFixedGoalFutureValue(debitValue, 0.10, months);
        this.interest = finalInterest;
        this.showInterests = true;
        this.frequencyAmount = (amount/months).toFixed(2);
        return this.interest;
      }
   
  
    onSubmit(event){
        event.preventDefault();

        if (this.checkGoalName()||this.valStartDate()||this.valEndDate()||this.checkAmount()||this.checkgoalFrequency()) {

        } else {
            this.setState({isSubmitted : true });
            this.props.dispatch(actions.fetchFixedGoalStep1({
                "goalName":this.state.goalName,
                "startDate":this.state.startDate,
                "endDate":this.state.endDate,
                "targetAmount":this.state.targetAmount,
                "goalFrequency":this.state.goalFrequency,
                "showInterests":this.state.showInterests
            }));
            console.log('tag', '')
        }
        
       
    }
    
    gotoStep2 = () => {
        if (this.props.fixed_goal_step1)
            if (this.props.fixed_goal_step1.fixed_step1_status == fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS) {
                return <Redirect to="/savings/fixed-goal-complete" />
            }
    };

    showInterest = () =>  {
        this.setState({showMessage: true})
    };
    

    


    render() {
        
        let {GoalNameInvalid,endDateInvalid,startDateInvalid,targetAmountInvalid,goalFrequencyInvalid,goalFrequency}=this.state
        let props = this.props;

        return (
            <Fragment>
                <InnerContainer>
                    <SavingsContainer>
                    {this.gotoStep2()}
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
                                       <h4 className="m-b-10 center-text hd-underline">Create a Fixed Goal</h4>
                                       <p className="header-info">Save daily, weekly or monthly towards a target amount, earn <span style={{color:"#AB2656"}}> 10% interest p.a </span> No withdrawal allowed and you will lose your interest if you dont meet your target</p>

                                            <form onSubmit={this.onSubmit}>
                                                <div className={GoalNameInvalid ? "form-group form-error" : "form-group"}>
                                                    <label className="label-text">Give your goal a name</label>
                                                    <input 
                                                        type="text" 
                                                        autoComplete="off" 
                                                        className="form-control" 
                                                         placeholder="Dubai Goal"
                                                         name="goalName"
                                                         value={this.state.goalName}
                                                         onChange={this.handleChange}
                                                    />
                                                    {GoalNameInvalid &&
                                                        <div className="text-danger">select a goal name please</div>}
                                                    
                                                    </div>
                                                <div className="form-row">
                                                    <div className= {!startDateInvalid ? "form-group col-md-6 " : "form-group col-md-6 form-error"}>
                                                        <label className="label-text">When would you like to start</label>
                                                        <DatePicker 
                                                            className="form-control"
                                                            selected={this.state.startDate}
                                                            autoComplete="off" 
                                                            placeholderText="Goal start Date"
                                                            dateFormat=" MMMM d, yyyy"
                                                            name="startDate"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            useShortMonthInDropdown
                                                            dropdownMode="select"
                                                            minDate={new Date()}
                                                            showWeekNumbers
                                                            onChange={this.handleStartDatePicker}
                                                            value={this.state.startDate}
                                                            
                                                            />
                                                            <i className="mdi mdi-calendar-range"></i>

                                                            {startDateInvalid &&
                                                                <div className="text-danger">select a valid date</div>
                                                            }
                                        
                                                    </div>
                                                    <div className={!endDateInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
                                                        <label className="label-text">When do you want to achieve this</label>
                                                        <DatePicker  
                                                            selected={this.state.endDate}
                                                            className="form-control"
                                                            autoComplete="off" 
                                                            placeholderText="Goal end Date"
                                                            dateFormat=" MMMM d, yyyy"
                                                            name="endDate"
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            useShortMonthInDropdown
                                                            dropdownMode="select"
                                                            minDate={new Date()}
                                                            showWeekNumbers
                                                            onChange={this.handleEndDatePicker}
                                                            value={this.state.endDate}

                                                        />
                                                        <i class="mdi mdi-calendar-range"></i>

                                                        {endDateInvalid &&
                                                            <div className="text-danger">select a valid date</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className={targetAmountInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                        <label className="label-text">How much would you like to save</label>
                                                        <input 
                                                            onKeyUp= {this.showInterest}
                                                            className="form-control" 
                                                            autoComplete="off" 
                                                            name="targetAmount"
                                                            onChange={this.handleAmount}
                                                            placeholder="E.g. ₦100,000"
                                                            value={this.state.targetAmount}

                                                          
                                                         />
                                                         {targetAmountInvalid && 
                                                            <div className="text-danger">Enter the amount you want to save</div>}
                                                            {
                                                            this.state.showMessage ? 
                                                              <div className="text-purple m-b-55"><h3 className="text-purple m-b-55"> You will earn approximately ₦ {util.formatAmount(this.state.showInterests)} in interest.</h3></div> 
                                                              : null

                                                            }
     
                                                    </div>
                                                    

                                                    <div className={goalFrequencyInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                        <label className="label-text">How often do you want to save</label>
                                                        <Select type="text" 
                                                            options={selectedTime}
                                                            name="goalFrequency"
                                                            autoComplete="off"
                                                                onChange={this.handleSelectChange}
                                                            value={goalFrequency.label}
                                                          />
                                                          {goalFrequencyInvalid && <div className='text-danger'>Enter saving duration</div>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>


                                                            <button 
                                                            disabled={this.props.fixed_goal_step1.fixed_step1_status === fixedGoalConstants.FETCH_FIXED_GOAL_PENDING}

                                                            type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.fixed_goal_step1.fixed_step1_status === fixedGoalConstants.FETCH_FIXED_GOAL_PENDING ? "Processing..." :"Next"}

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
    fixed_goal_step1: state.fixed_goal_step1
})
export default connect(mapStateToProps)(FixedGoal);
