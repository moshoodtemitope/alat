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

const selectedTime = [
           
    { value: 'monthly' ,label:"Monthly" },
    {  value: 'weekly' , label:"Weekly" },
    {  value: 'daily', label:"Daily"},
   
];





class FixedGoal extends React.Component {

    constructor(props){
        super(props)
        this.state={
            goalName:"",
            startDate:null,
            endDate:null,
            AmountSavedText:"",
            SelectedtimeSaved:"",
            timeSaved:"",
            isSubmitted : false,
            endDateInvalid:false,
            startDateInvalid:false,
            AmountSavedInvalid:false,
            GoalNameInvalid:false,
            TimeSavedInvalid:false,
         };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDatePicker = this.handleStartDatePicker.bind(this);
        this.handleEndDatePicker = this.handleEndDatePicker.bind(this)

        
      

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
        if (this.state.AmountSavedText == "") {
            this.setState({ AmountSavedInvalid: true });
            return true;
        }
    }
    checkTimeSaved = () => {
        if (this.state.timeSaved == "") {
            this.setState({ TimeSavedInvalid: true });
            return true;
        }
    }
    handleAmount = (e) => {
        // console.log(this.intValue);
        console.log('test', e.target.value);
        this.setState({ "AmountSavedText": e.target.value });
        if (this.state.formsubmitted) {
            if (e != "")
                this.setState( {  AmountSavedInvalid: false });
        }
    }
    handleSelectChange = (SelectedtimeSaved) => {
        this.setState({ "timeSaved": SelectedtimeSaved.value,
                        "timeSaved" : SelectedtimeSaved.label
              });
        if (this.state.formsubmitted && SelectedtimeSaved.value != "")
            this.setState({ TimeSavedInvalid: false })
    }
    
    
  
    onSubmit(event){
        event.preventDefault();

        if (this.checkGoalName()||this.valStartDate()||this.valEndDate()||this.checkAmount()||this.checkTimeSaved()) {

        } else {
            this.setState({isSubmitted : true });
            this.props.dispatch(actions.fetchFixedGoalStep1({
                "goalName":this.state.goalName,
                "startDate":this.state.startDate,
                "endDate":this.state.endDate,
                "AmountSavedText":this.state.AmountSavedText,
                "timeSaved":this.state.timeSaved
            }));
        }
        
       
    }
    
    gotoStep2 = () => {
        if (this.props.fixed_goal_step1)
            if (this.props.fixed_goal_step1.fixed_step1_status == fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS) {
                return <Redirect to="/savings/fixed-goal-complete" />
            }
    }
    

    


    render() {
        
        let {GoalNameInvalid,endDateInvalid,startDateInvalid,AmountSavedInvalid,TimeSavedInvalid,AmountSavedText,timeSaved}=this.state
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
                                            <li><a href="statement.html">Group Savings</a></li>
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
                                                    <label>Give your goal a name</label>
                                                    <input 
                                                        type="text" 
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
                                                            placeholder="October 31, 2017"
                                                            dateFormat=" MMMM d, yyyy"
                                                            name="startDate"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            maxDate={new Date()}
                                                            onChange={this.handleStartDatePicker}
                                                            value={this.state.startDate}/>
                                                            {startDateInvalid &&
                                                                <div className="text-danger">select a valid date</div>
                                                            }
                                        
                                                    </div>
                                                    <div className={!endDateInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
                                                        <label className="label-text">When do you want to achieve this</label>
                                                        <DatePicker  
                                                            selected={this.state.endDate}
                                                            className="form-control"
                                                            placeholder="October 31, 2017"
                                                            dateFormat=" MMMM d, yyyy"
                                                            peekNextMonth
                                                            name="endDate"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            onChange={this.handleEndDatePicker}
                                                            maxDate={new Date()}
                                                            value={this.state.endDate}

                                                        />
                                                        {endDateInvalid &&
                                                            <div className="text-danger">select a valid date</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className={AmountSavedInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                        <label className="label-text">How much would you like to save</label>
                                                        <input 
                                                             
                                                            className="form-control" 
                                                            name="AmountSavedText"
                                                            onChange={this.handleAmount}
                                                            placeholder="E.g. ₦100,000"
                                                            value={AmountSavedText}

                                                          
                                                         />
                                                         {AmountSavedInvalid && 
                                                            <div className="text-danger">Enter the amount you want to save</div>}
                                                    </div>
                                                    <div className={TimeSavedInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                        <label className="label-text">How often do you want to save</label>
                                                        <Select type="text" 
                                                            options={selectedTime}
                                                            name="timeSaved"
                                                            onChange={this.handleSelectChange}
                                                            value={timeSaved.label}
                                                          />
                                                          {TimeSavedInvalid && <div className='text-danger'>Enter saving duration</div>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>

                                                            <button 
                                                            disabled={this.props.fixed_goal_step1.fixed_step1_status == fixedGoalConstants.FETCH_FIXED_GOAL_PENDING}

                                                            type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.fixed_goal_step1.fixed_step1_status == fixedGoalConstants.FETCH_FIXED_GOAL_PENDING ? "Processing..." :"Next"}

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
    fixed_goal_step1: state.fixed_reducer
})
export default connect(mapStateToProps)(FixedGoal);
