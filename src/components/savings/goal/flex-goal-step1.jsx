import React from 'react'
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import {NavLink, Redirect} from "react-router-dom";
import Select from 'react-select';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import {flexGoalConstants} from '../../../redux/constants/goal/flex-goal.constant'
import * as actions from '../../../redux/actions/savings/goal/flex-goal.actions'
import "react-datepicker/dist/react-datepicker.css";
import { numberWithCommas } from "../../../shared/utils";









class FlexGoal extends React.Component {

    constructor(props){
        super(props);
        this.state={
            goalName:"",
            user: JSON.parse(localStorage.getItem("user")),
            startDate:null,
            endDate:null,
            targetAmount:"",
            frequency:"",
            frequency2:"",
            goalFrequency:"",
            isSubmitted : false,
            startDateInvalid:false,
            endDateInvalid:false,
            targetAmountInvalid:false,
            GoalNameInvalid:false,
            showMessage:false,
            showInterests:"",
            goalFrequencyValue:"12 Month",
            goalFrequencyName:"Monthly",
            showTotalAmount: "",
            selectItems: "",
            goalFrequencyInvalid:false,
            displayState: "block",
            showLimitLevel: false


        };
        // console.log('',this.state);
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
        var intVal = e.target.value;
        if (intVal) {
            // if (parseInt(intVal, 10) <= 2000000) {
            this.setState({ targetAmount: intVal, targetAmount: intVal },
                () => {
                this.calculationForTotalAmount();
                    this.calculateInterestRate();
                    if (parseInt(intVal) > parseInt(999999999)) {
                        this.setState({displayState: "none", showLimitLevel: true})
                     }
                     else {
                        this.setState({displayState: "block", showLimitLevel: false}) 
                     }

                });
            // }
        } else if (e.target.value == "") {
            this.setState({ targetAmount: "", targetAmount: "" },
                () => {
                    this.calculationForTotalAmount();
                    this.calculateInterestRate();
                    
                });
        }

        if(this.state.isSubmitted == true)
            if (this.state.formsubmitted) {
                if (e != "")
                    this.setState( { targetAmountInvalid: false });
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
    }
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    }
     GetDailyFutureValue = (debitAmount, annualInterestRate, days) =>{
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
    };
     GetWeeklyFutureValue =(debitAmount, annualInterestRate, days)=>{
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

    };
     GetMonthlyGoalFutureValue =(debitAmount, annualInterestRate, months, goalType)=>{
        let futureValue = 0;
        var result;
        let rate = (annualInterestRate - 0.01) / 12;
        for (let n = 1; n <= months; n++)
        {
            var multiplier = (1 + rate);
            futureValue += debitAmount * (Math.pow(multiplier, n));
        }
        return (futureValue - (debitAmount * months)).toFixed(2);
    };



     calculationForTotalAmount = () => {
         let amount= parseFloat(this.removeComma(this.state.targetAmount));
         let days = this.state.goalFrequencyValue.split(" ", 1);
        //  console.log("l;llll", days)
         // days = days.split(" ", 1);
         let totalAmount = amount * days;

         this.setState({showTotalAmount: totalAmount});
     };





    calculateInterestRate = () => {
        
        var days = null;
        var res;
        let amount= parseFloat(this.removeComma(this.state.targetAmount));
        let selectedFrequency = this.state.goalFrequencyValue.split(" ",1);

        // console.log("monthly", this.state.goalFrequencyName);
        if (this.state.targetAmount ==="") {
            this.setState({interest: 0});
        }
        if(this.state.goalFrequencyValue && this.state.goalFrequencyName && this.state.targetAmount){
            // if(this.defaultFreq && this.defaultFreqResult && formValue.debitAmount && formValue.dateGroup.startDate){
            if(this.state.goalFrequencyName === "Monthly"){

                res = this.state.goalFrequencyValue.split(" ",1);
                res = +res[0];
                this.interest = this.GetMonthlyGoalFutureValue(amount, 0.10, res, "");
                this.setState({interest: this.interest});
            }else if(this.state.goalFrequencyName === "Weekly"){
                res = this.state.goalFrequencyValue.split(" ",1) * 7;
                this.interest = this.GetWeeklyFutureValue(amount, 0.10, res) - (amount * selectedFrequency);
                this.interest = this.toCurrency(this.interest.toFixed(2));
                this.setState({interest: this.interest});


            }else{
                res = this.state.goalFrequencyValue.split(" ",1) * 1;
                // console.log('iduma',res);

                this.interest = this.GetDailyFutureValue(amount, 0.10, res) - (amount * res);
                this.interest = this.toCurrency(this.interest.toFixed(2));
                // console.log('abraham',this.interest);
                this.setState({interest: this.interest});

            }
            return this.showInterests = true;
        }else{
            return this.showInterests = false;
        }
    };









    showInterest = () =>  {
        this.setState({showMessage: true})
    };

    onSubmit(event){
        event.preventDefault();

        if (this.checkGoalName()||this.checkAmount() || this.valStartDate()) {

        } else {
            this.setState({isSubmitted : true });
            this.props.dispatch(actions.fetchFlexGoalStep1({
                "goalName":this.state.goalName,
                "startDate":this.state.startDate,
                "endDate":this.state.endDate,
                "debitAmount":this.state.targetAmount,
                "targetAmount":this.state.showTotalAmount,
                "goalFrequency":this.state.goalFrequencyName,
                "goalFrequencyValue":this.state.goalFrequencyValue,
                "showInterests":this.state.showInterests,
            }));
        }


    }

    gotoStep2 = () => {
        if (this.props.flex_goal_step1)
            if (this.props.flex_goal_step1.flex_step1_status === flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS) {
                return <Redirect to="/savings/flex-goal-step2" />
            }
    };

    renderSelect = () => {
        if (this.state.goalFrequencyName === "Monthly") {
            // this.setState({goalFrequencyValue: "12 Month"});
            return (
                <div>
                <select onChange={(e) => {

                    this.setState({ goalFrequencyValue: e.target.value }, () => {
                        this.calculateInterestRate();
                        this.calculationForTotalAmount();
                    });
                    
                    }}>

                    <option >1 Month</option>
                    <option>2 Month</option>
                    <option>3 Month</option>
                    <option>4 Month</option>
                    <option>5 Month</option>
                    <option>6 Month</option>
                    <option>7 Month</option>
                    <option>8 Month</option>
                    <option>9 Month</option>
                    <option>10 Month</option>
                    <option>11 Month</option>
                    <option selected={true}>12 Month</option>
                    <i class="fas fa-cloud"></i>

                </select>
                </div>
               
            )
        }
        if (this.state.goalFrequencyName === "Weekly") {
            // this.setState({goalFrequencyValue: "52 Weeks"});
            return (
                <select onChange={(e) => this.setState({ goalFrequencyValue: e.target.value }, () => {

                    this.calculateInterestRate();
                    this.calculationForTotalAmount();
                })}>

                    <option>2 Weeks</option>
                    <option>4 Weeks</option>
                    <option>6 Weeks</option>
                    <option>8 Weeks</option>
                    <option>12 Weeks</option>
                    <option>24 Weeks</option>
                    <option>48 Weeks</option>
                    <option selected={true}>52 Weeks</option>
                </select>
            )
        }
        if (this.state.goalFrequencyName === "Daily") {

            return (
                <select onChange={(e) => this.setState({ goalFrequencyValue: e.target.value }, () => {
                    this.calculateInterestRate();
                    this.calculationForTotalAmount();
                })}>
                    <option>7 Days</option>
                    <option>14 Days</option>
                    <option>30 Days</option>
                    <option>60 Days</option>
                    <option>90 Days</option>
                    <option>120 Days</option>
                    <option>240 Days</option>
                    <option selected={true}>360 Days</option>
                </select>
            )
        }

    }

    render() {

        let {GoalNameInvalid,startDateInvalid,endDateInvalid,targetAmountInvalid,goalFrequencyInvalid}=this.state;



        return (
            <Fragment>
                
                    {this.gotoStep2()}
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                        <li><a className="active">Goals</a></li>
                                        </NavLink>
                                        <NavLink to="/savings/activityDashBoard">
                                            <li><a>Group Savings</a></li>
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
                                                <p className="header-info">Save daily, weekly or monthly towards a target amount, earn <span style={{color:'#AB2656'}}> 10% interest.</span> Withdrawal up to <span style={{color:'#AB2656'}}> 50% </span> of your  savings once every 30 days
                                                        but you will lose your interest if you don't meet your target</p>

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
                                                        <div className={targetAmountInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                            <label className="label-text">How much would you like to save ?</label>
                                                            <input
                                                                onKeyUp= {this.showInterest}
                                                                className="form-control"
                                                                autoComplete="off"
                                                                name="targetAmount"
                                                                onChange={this.handleAmount}
                                                                placeholder="E.g. ₦100,000"
                                                                value={numberWithCommas(this.state.targetAmount)}


                                                            />
                                                            {targetAmountInvalid &&
                                                            <div className="text-danger">Enter the amount you want to save ?</div>}
                                                            {
                                                                this.state.showMessage ?
                                                                    <div className="text-purple" style={{display: this.state.displayState}}><h3 className="text-purple"> You will have  saved ₦ {this.state.showTotalAmount} at the end of this goal.</h3></div>
                                                                    : null

                                                            }
                                                            {
                                                            this.state.showLimitLevel ? 
                                                              <div className="text-purple"><h3 className="text-purple"> Woah! 999,999,999 is enough for us</h3></div> 
                                                              : null

                                                            }

                                                        </div>


                                                        <div className={goalFrequencyInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                            <label className="label-text">Saving Cycle</label>
                                                            <select onChange={(e) => this.setState({ goalFrequencyName: e.target.value },()=>{
                                                                this.calculateInterestRate();
                                                                this.calculationForTotalAmount();
                                                            })}>
                                                                <option selected={true}>Monthly</option>
                                                                <option>Weekly</option>
                                                                <option>Daily</option>
                                                            </select>
                                                            
                                                            {goalFrequencyInvalid && <div className='text-danger'>Enter saving duration</div>}
                                                        </div>
                                                    </div>


                                                    <div className="form-row">
                                                        <div className= {!startDateInvalid ? "form-group col-md-6 " : "form-group col-md-6 form-error"}>
                                                            <label className="label-text">When would you like to start ?</label>
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
                                                                minDate={new Date()}
                                                                onChange={this.handleStartDatePicker}
                                                                value={this.state.startDate}

                                                            />
                                                            <i className="mdi mdi-calendar-range"></i>

                                                            {startDateInvalid &&
                                                            <div className="text-danger">select a valid date</div>
                                                            }

                                                        </div>
                                                        <div className={!endDateInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
                                                            <label className="label-text">How long do you want to save for ? </label>
                                                            {this.renderSelect()}

                                                                                                                      {endDateInvalid &&
                                                            <div className="text-danger">select a valid date</div>
                                                            }
                                                        </div>

                                                        {
                                                            this.state.showMessage ?
                                                                <div className="text-purple" style={{marginLeft: 0, paddingTop: 0, marginTop: 0, }}><h3 style={{width: "93%"}} className="text-purple"> You will earn approximately ₦ {this.state.interest} in interest.</h3></div>
                                                                : null

                                                        }

                                                    </div>



                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                                { this.state.displayState === "block" ?
                                                                    <button
                                                                    disabled={this.props.flex_goal_step1.flex_step1_status === flexGoalConstants.FETCH_FLEX_GOAL_PENDING}

                                                                    type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                                    {this.props.flex_goal_step1.flex_step1_status === flexGoalConstants.FETCH_FLEX_GOAL_PENDING ? "Processing..." :"Next"}

                                                                </button>: <button 
                                                                
                                                                disabled={true}
                                                                type="submit" className="btn-alat m-t-10 m-b-20 text-center"> Next
                                                            </button>
                                                                }
                                                                
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


                 


            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    flex_goal_step1: state.FlexGoalReducerPile.flex_goal_step1
});
export default connect(mapStateToProps)(FlexGoal);








