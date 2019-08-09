import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import {NavLink, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import {flexGoalConstants} from '../../redux/constants/goal/flex-goal.constant'
import * as actions from '../../redux/actions/savings/goal/flex-goal.actions'
import "react-datepicker/dist/react-datepicker.css";
import * as util from '../../shared/utils';
import moment from 'moment'


const selectedTime = [
           
    { "id":3, "value": "Monthly","label":"Monthly" },
    { "id":2, "value": 'Weekly', "label":"Weekly" },
    {  "id":1,"value": "Daily", "label":"Daily"},
   
];
 




class FlexGoal extends React.Component {

    constructor(props){
        super(props)
        this.state={
            goalName:"",
            startDate:null,
            endDate:null,
            targetAmount:"",
            frequency:"",
            goalFrequency:"",
            isSubmitted : false,
            startDateInvalid:false,
            endDateInvalid:false,
            targetAmountInvalid:false,
            GoalNameInvalid:false,
            showMessage:false,
            showInterests:"",
         
        
           
             
            
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDatePicker = this.handleStartDatePicker.bind(this);
        this.handleEndDatePicker = this.handleEndDatePicker.bind(this);

}
    valStartDate = () => {
        if (this.state.startDate == null) {
            this.setState({ startDateInvalid: true });
            return true;
        } else {
            this.setState({ startDateInvalid: false });
            return false;
        }
    }

    valEndDate = () => {
        if (this.state.endDate == null) {
            this.setState({ endDateInvalid: true });
            return true;
        } else {
            this.setState({ endDateInvalid: false });
            return false;
        }
    }

    handleChange = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value })
    }

    checkGoalName = () => {
        if (this.state.goalName == "") {
            this.setState({ GoalNameInvalid: true });
            return true;
        }
    }

    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        this.setState({ startDate: startDate });
    }
    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
        this.setState({ endDate: endDate });
    }
    
    checkAmount = () => {
        if (this.state.targetAmount == "") {
            this.setState({ targetAmountInvalid: true });
            return true;
        }
    }
    checkgoalFrequency = () => {
        if (this.state.goalFrequency == "") {
            this.setState({ goalFrequencyInvalid: true });
            return true;
        }
    }

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
                        this.setState( { targetAmountInvalid: false });
                }
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
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    }
    
    

    handleSelectChange = (frequency) => {
        this.setState({ "goalFrequency": frequency.value,
                        "goalFrequency" : frequency.label,
                    });
        if (this.state.formsubmitted && frequency.value != "")
            this.setState({ goalFrequencyInvalid: false })
        
        if (frequency.value == "monthly") {

        }

    }
    setFregValue = () => {
        this.setState({ showInterests: this.calculateInterest(this.state.targetAmount, this.state.startDate, this.state.endDate) })
        
       

    } 
     GetGoalFutureValue(debitAmount, annualInterestRate, month){
        let months = Math.round(month);
        let futureValue = 0;
        let rate = ((annualInterestRate - 0.01) / 12);
        for (let n = 1; n <= months; n++)
        {
            var multiplier = (1 + rate);
            futureValue += debitAmount * (Math.pow(multiplier, n));     
        }
        let amount = futureValue - (debitAmount * months);
        return this.toCurrency( parseFloat(amount).toFixed(2));
  }
    
   
   
    calculateInterest(){
        
        var days = null;
        var res;
        if(this.state.targetAmount && this.state.endDate && this.state.startDate){
          let startDate = moment(this.state.startDate).format('DD MMMM, YYYY');
          let enddate = moment(this.state.endDate, 'DD MMMM, YYYY');
          res = enddate.diff(startDate, 'days');
          let amount = this.removeComma(this.state.targetAmount);
          var ia= ((amount / 365) * 0.10 );
          let diff_in_months = Math.floor(moment(enddate).diff(moment(startDate), 'months', true));
          let dailycontribution;
          if(diff_in_months > 1){
           this.interest = this.GetGoalFutureValue((amount / diff_in_months),0.10, diff_in_months);
          }else{
            var ia = ((amount / 365) * 0.10 );
            dailycontribution = res * ( ia - (0.10) *ia);
            this.interest = parseFloat(dailycontribution).toFixed(2);
          }
          this.showInterests = true;
          return this.interest
        }else{
          this.showInterests= false;
          return this.interest
        }
      }
    
    showInterest = () =>  {
        this.setState({showMessage: true})
    }
    
    onSubmit(event){
        event.preventDefault();

        if (this.checkGoalName()||this.valStartDate()||this.valEndDate()||this.checkAmount()||this.checkgoalFrequency()) {

        } else {
            this.setState({isSubmitted : true });
            this.props.dispatch(actions.fetchFlexGoalStep1({
                "goalName":this.state.goalName,
                "startDate":this.state.startDate,
                "endDate":this.state.endDate,
                "targetAmount":this.state.targetAmount,
                "goalFrequency":this.state.goalFrequency,
                "showInterests":this.state.showInterests,
            }));
        }
        
       
    }
    
    gotoStep2 = () => {
        if (this.props.flex_goal_step1)
            if (this.props.flex_goal_step1.flex_step1_status == flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS) {
                return <Redirect to="/savings/flex-goal-step2" />
            }
    }
    
    render() {
        
        let {GoalNameInvalid,startDateInvalid,endDateInvalid,targetAmountInvalid,goalFrequencyInvalid,goalFrequency}=this.state

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
                                            <li><a>Group Savings</a></li>
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
                                       <p className="header-info">Save daily, weekly or monthly towards a target amount, earn <span style={{color:"#AB2656"}}> 10% interest p.a </span> No withdrawal allowed and you will lose your interest if you dont meet your target</p>

                                            <form onSubmit={this.onSubmit}>
                                                <div className={GoalNameInvalid ? "form-group form-error" : "form-group"}>
                                                    <label className="label-text">Give your goal a name</label>
                                                    <input 
                                                        type="text" 
                                                        autoComplete="off" 

                                                        className="form-control" 
                                                         placeholder="December Goal"
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
                                                            maxDate={new Date()}
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            maxDate={new Date()}
                                                            onChange={this.handleStartDatePicker}
                                                            value={this.state.startDate}
                                                            
                                                            />
                                                            <i className="mdi mdi-calendar-range"></i>

                                                            {startDateInvalid &&
                                                                <div className="text-danger">select a valid date</div>
                                                            }
                                        
                                                    </div>
                                                    <div className={!endDateInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
                                                        <label className="label-text">How long do you want to save for </label>
                                                        <DatePicker  
                                                            selected={this.state.endDate}
                                                            className="form-control"
                                                            autoComplete="off" 
                                                            placeholderText="Goal end Date"
                                                            dateFormat=" MMMM d, yyyy"
                                                            peekNextMonth
                                                            name="endDate"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"                                  
                                                            // maxDate={new Date()}
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
                                                            <div className="text-purple m-b-55"><h3 className="text-purple m-b-55"> You will earn approximately ₦ {this.state.showInterests} in interest.</h3></div> 
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
                                                            disabled={this.props.flex_goal_step1.flex_step1_status === flexGoalConstants.FETCH_FLEX_GOAL_PENDING}

                                                            type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.flex_goal_step1.flex_step1_status === flexGoalConstants.FETCH_FLEX_GOAL_PENDING ? "Processing..." :"Next"}

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
    flex_goal_step1: state.flex_goal_step1
})
export default connect(mapStateToProps)(FlexGoal);
