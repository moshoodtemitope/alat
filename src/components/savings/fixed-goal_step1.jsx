import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import {fixedGoalConstants} from '../../redux/constants/goal/fixed-goal.constant'
import {NavLink, Route} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import {connect} from 'react-redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as util from '../../shared/utils'

const selectedTime = [
           
    { value: 'monthly' ,label:"Monthly" },
    {  value: 'weekly' , label:"Weekly" },
    {  value: 'daily', label:"Daily"},
   
];

class FixedGoal extends React.Component {

    constructor(props){
        super(props)
        this.state={
            startDate:null,
            endDate:null,
            AmountSavedText:"",
            AmountSaved:1000,
            SelectedtimeSaved:"",
            frequencyGoal:"",
            isSubmitted : false,
            endDateInvalid:false,
            startDateInvalid:false,
            AmountSavedInvalid:false,
            GoalNameInvalid:false,
            TimeSavedInvalid:false,
            Term:"",
            InterestRate:"",
            repaymentAmount: "",
            showMessage: false



         };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDatePicker = this.handleStartDatePicker.bind(this);
        this.handleEndDatePicker = this.handleEndDatePicker.bind(this)

        
      

    }
    componentDidMount(){
        console.log('interest loan rate',this.state.InterestRate)
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

    
    checkTimeSaved = () => {
        if (this.state.frequencyGoal == "") {
            this.setState({ TimeSavedInvalid: true });
            return true;
        }
    }
    
    handleAmount = (e) => {
        // console.log
         var intVal = e.target.value.replace(/,/g, '');
         if (/^\d+(\.\d+)?$/g.test(intVal)) {
             // if (parseInt(intVal, 10) <= 2000000) {
             this.setState({ AmountSaved: intVal, AmountSavedText: this.toCurrency(intVal) },
                 () => this.updateRepayment());
             // }
         } else if (e.target.value == "") {
             this.setState({ AmountSaved: "", AmountSavedText: "" },
                 () => this.updateRepayment());
         }
 
         if(this.state.isSubmitted == true)
         if (this.state.formsubmitted) {
                    if (e != "")
                        this.setState( {  AmountSavedInvalid: false });
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
    
 
    handleSelectChange = (SelectedtimeSaved) => {
        this.setState({ "frequencyGoal": SelectedtimeSaved.value,
                        "frequencyGoal" : SelectedtimeSaved.label
              });
        if (this.state.formsubmitted && SelectedtimeSaved.value != "")
            this.setState({ TimeSavedInvalid: false })
    }
    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        this.setState({ startDate: startDate });
    }
    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
        this.setState({ endDate: endDate });
    }
    updateRepayment = () => {
        this.setState({ repaymentAmount: this.calcRepayment(this.state.AmountSaved, this.state.InterestRate, this.state.Term) })
        console.log('test',this.calcRepayment(this.state.AmountSaved, this.state.InterestRate, this.state.Term))
        console.log('amount saved',this.state.AmountSaved)
        console.log('interest rate',this.state.InterestRate)
        console.log('term',this.state.Term)
       

    }

    calcRepayment = (savedAmount,interestRate,tenure) => {
        //[P x R x (1+R)^N]/[(1+R)^N-1]
        let _intRate = interestRate / 365;
       let _interestRate = 1 + _intRate;
       //console.log(_interestRate);
      
       let _tenure = tenure - 1;
     
        let numerator = savedAmount * _interestRate *_intRate;
        let finalNumerator =  Math.pow(numerator, tenure);
        let denominator = Math.pow(_interestRate, _tenure);

        let monthlyRepayment = finalNumerator / denominator;
        //console.log(monthlyRepayment);
        return monthlyRepayment;
    }
    handleChange = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value })
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
                "frequencyGoal":this.state.frequencyGoal
            }));
            console.log('tag', '')
        }
        
       
    }
    
    gotoStep2 = () => {
        if (this.props.fixed_goal_step1)
            if (this.props.fixed_goal_step1.fixed_step1_status == fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS) {
                return <Redirect to="/savings/fixed-goal-complete" />
            }
    }

    showInterest = () =>  {
        this.setState({showMessage: true})
    }
    

    


    render() {
        
        let {GoalNameInvalid,stdInvalid,edtInvalid,endDateInvalid,startDateInvalid,AmountSavedInvalid,TimeSavedInvalid,AmountSavedText,frequencyGoal}=this.state
        let props = this.props;

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
                                            <li><a href="#" className="active">Goals</a></li>
                                            <NavLink to="/savings/goal/group-savings-selection">
                                            <li><a href="#">Group Savings</a></li>
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

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label>Give your goal a name</label>
                                                    <input type="text" className="form-control"  placeholder="Dubai Goal"/>
                                                    </div>
                                                <div className="form-row">
                                                    <div className={ !startDateInvalid ? "form-group col-md-6" : "input-ctn form-error"}>
                                                        <label className="label-text">When would you like to start</label>
                                                        <DatePicker 
                                                            className="form-control"
                                                            selected={this.state.startDate}
                                                            placeholderText="Goal start Date"
                                                            dateFormat=" MMMM d, yyyy"
                                                            name="startDate"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            maxDate={new Date()}
                                                            onChange={this.handleStartDatePicker}
                                                            value={this.state.startDate}
                                                            
                                                            />
                                                            {startDateInvalid &&
                                                                <div className="text-danger">select a valid date</div>
                                                            }
                                        
                                                    </div>
                                                    <div className={ !endDateInvalid ? "form-group col-md-6" : "input-ctn form-error"}>
                                                        <label className="label-text">When do you want to achieve this</label>
                                                        <DatePicker  
                                                            selected={this.state.endDate}
                                                            className="form-control"
                                                            placeholderText="Goal end Date"
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
                                                        {edtInvalid &&
                                                            <div className="text-danger">select a valid date</div>}
                                                        </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label className="label-text">How much would you like to save</label>
                                                        <input 
                                                            onKeyUp= {this.showInterest}
                                                             
                                                            className="form-control" 
                                                            name="AmountSavedText"
                                                            onChange={this.handleAmount}
                                                            placeholder="E.g. ₦100,000"
                                                            value={this.state.AmountSavedText}

                                                          
                                                         />
                                                         {AmountSavedInvalid && 
                                                            <div className="text-danger">Enter the amount you want to save</div>}
                                                            {
                                                                this.state.showMessage ? 
                                                              <div className="text-purple m-b-55"><h3 className="text-purple m-b-55"> You will earn approximately ₦ {util.formatAmount(this.state.repaymentAmount)} in interest.</h3></div> 
                                                              : null

                                                            }
     
                                                    </div>
                                                    

                                                    <div className={TimeSavedInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                        <label className="label-text">How often do you want to save</label>
                                                        <Select type="text" 
                                                            options={selectedTime}
                                                            name="timeSaved"
                                                            onChange={this.handleSelectChange}
                                                            value={frequencyGoal.label}
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
    fixed_goal_step1: state.fixed_goal_step1
})
export default connect(mapStateToProps)(FixedGoal);
