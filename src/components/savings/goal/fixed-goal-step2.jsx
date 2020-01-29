import * as React from "react";
import {Fragment} from "react";
import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect,Link,NavLink } from 'react-router-dom';
import * as actions from '../../../redux/actions/savings/goal/fixed-goal.actions'
import {fixedGoalConstants} from '../../../redux/constants/goal/fixed-goal.constant';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import moment from 'moment';
import * as util from '../../../shared/utils'
import "react-datepicker/dist/react-datepicker.css";
const selectedTime = [

    { "id":3, value: 'monthly',label:"Monthly" },
    { "id":2, value: 'weekly', label:"Weekly" },
    { "id":1, value: 'daily', label:"Daily"},

];


class FixedGoal extends React.Component {

    constructor(props){
        super(props)
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
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
            goalFrequencyInvalid:false,
            showInterests:0.00,
            goalFrequencyType: "",
            goalFrequencyLabel: "",

            // frequencyAmount:"",


        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);

    }
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    }

    handleSelectDebitableAccounts(account) {
        // console.log('dss', account);
        this.setState({ debitAccount: account });
        if (this.state.isSubmitted) {
            if(account.length == 10)
                this.setState({ isAccountInvalid: false })
        }
    }
    checkAccountNumber() {
        if (this.state.debitAccount.length != 10) {
            this.setState({ isAccountInvalid: true });
            return true;
        }
    }
    checkgoalFrequency = () => {
        if (this.state.goalFrequency == "") {
            this.setState({ goalFrequencyInvalid: true });
            return true;
        }
    };
    componentDidMount = () => {
        this.init();
    };



    init = () => {
        if (this.props.fixed_goal_step1.fixed_step1_status !== fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS)
            this.props.history.push("/savings/fixed-goal");
        else {
            var data = {
                ...this.props.fixed_goal_step1.fixed_step1_data.data
            };
            // console.log('tag', data);

            this.setState({
                targetAmount:util.formatAmount(data.targetAmount),
                startDate:data.startDate,
                endDate:data.endDate,
                goalName:data.goalName,
                showInterests:data.showInterests

            });
        }
    };

    //this method is to calculate the monthly interest value for every amount entered
    ComputeDebitAmount(frequency){
        let timeBetween;
        let amount= parseFloat(this.removeComma(this.state.targetAmount));
        let startDate = moment(this.state.startDate, 'DD MMMM, YYYY');
        let enddate = moment(this.state.endDate, 'DD MMMM, YYYY');


        if (frequency == "daily")
        {
            timeBetween = enddate.diff(startDate,'days') + 1;
            // console.log(timeBetween)

        }

        else if (frequency == "weekly")
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
            // console.log('timeBetween', timeBetween)
        }
        // console.log("monthly" +amount/timeBetween)
        return this.setState({showInterests:  parseFloat(amount/timeBetween).toFixed(2)});
    }

    handleSelectChange = (frequency) => {
        // console.log(frequency);
        // let label = frequency.id.split("/")[0]
        this.setState({ "goalFrequencyType": frequency.value,
            "goalFrequencyLabel" : frequency.label,
            "goalFrequency": `${frequency.id}`
        });
        this.ComputeDebitAmount(frequency.value);


        if (this.state.formsubmitted && frequency.value != "") {
            this.setState({ goalFrequencyInvalid: false })
        }


        // this.setState({
        //         // showInterests:this.ComputeDebitAmount(this.state.goalFrequencyType,this.state.targetAmount,this.state.startDate,this.state.endDate)
        //         showInterests: this.ComputeDebitAmount(this.state.goalFrequencyType)
        // })

    };


    handleChange = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value })
    };

    onSubmit(event){
        event.preventDefault();

        this.setState({ isSubmitted: true });
        if (this.checkAccountNumber()|| this.checkgoalFrequency()) {

        } else {
            this.setState({isSubmitted : true });
            this.props.dispatch(actions.fetchFixedGoalStep2({
                "goalName":this.state.goalName,
                "startDate":this.state.startDate,
                "endDate":this.state.endDate,
                "targetAmount":this.state.targetAmount,
                "showInterests":this.state.showInterests,
                "debitAccount":this.state.debitAccount,
                "goalFrequency":this.state.goalFrequency,
                "goalFrequencyType":this.state.goalFrequencyType
            }));
        }

    }
    gotoStep3 = () => {
        if (this.props.fixed_goal_step2)
            if (this.props.fixed_goal_step2.fixed_step2_status === fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS_STEP2) {
                return <Redirect to="/savings/fixed-goal-summary" />
            }
    };
    OnBackClick = () => {
        this.props.dispatch(actions.ClearAction(fixedGoalConstants.FIXED_GOAL_REDUCER_CLEAR));
    };






    render() {

        let { frequency, goalFrequencyLabel,goalFrequencyType, goalFrequency, goalFrequencyInvalid} =this.state;

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
                                                <li><a href="/savings/activityDashBoard">Group Savings</a></li>
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
                                                <h4 className="m-b-10 center-text hd-underline">Create a Fixed Goal</h4>
                                                <p className="header-info">To achieve your target of <span style={{color:'#AB2656'}}>N{this.state.targetAmount} <span style={{color:'#444444'}}>by</span> {moment(this.state.endDate).format("DD, MMMM, YYYY")}</span></p>

                                                <form onSubmit={this.onSubmit}>

                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label className="label-text">You will have to save</label>
                                                            <input type="text"
                                                                   value={this.state.showInterests}
                                                                   onChange={this.handleChange}
                                                                   placeholder="E.g. ₦100,000"/>
                                                        </div>
                                                        <p>{ goalFrequencyLabel.label }</p>
                                                        <div className={goalFrequencyInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                            <label className="label-text">How often would you save</label>
                                                            <Select type="text"
                                                                    options={selectedTime}
                                                                    value={goalFrequencyType.value}
                                                                    name="goalFrequency"
                                                                    onChange={this.handleSelectChange}/>
                                                            {goalFrequencyInvalid && <div className='text-danger'>Enter duration</div>}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <SelectDebitableAccounts
                                                            value={this.state.accountNumber}
                                                            accountInvalid={this.state.isAccountInvalid}
                                                            onChange={this.handleSelectDebitableAccounts}
                                                            labelText={"Select an account to debit"}/>

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
                                        <center>
                                        <a style={{ cursor: "pointer" }} onClick={() => { this.props.dispatch(actions.ClearAction(fixedGoalConstants.FIXED_GOAL_REDUCER_CLEAR));
                                                this.props.history.push('/savings/fixed-goal') }} className="add-bene m-t-50">
                                                Go back
                                        </a>                                        </center>

                                    </div>

                                </div>

                            </div>

                        </div>

            


            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    fixed_goal_step1: state.GoalReducerPile.fixed_goal_step1,
    fixed_goal_step2:state.GoalReducerPile.fixed_goal_step2
});
export default connect(mapStateToProps)(FixedGoal);





