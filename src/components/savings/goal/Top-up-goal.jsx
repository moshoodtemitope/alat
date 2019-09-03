import React, {Component, } from 'react';
import {Fragment} from 'react';
import InnerContainer from "../../../shared/templates/inner-container";
import SavingsContainer from "../container";
import {NavLink, Redirect} from "react-router-dom";
import SelectDebitableAccounts from "../../../shared/components/selectDebitableAccounts";
import {customerGoalConstants} from "../../../redux/constants/goal/get-customer-trans-history.constant";
import {connect} from "react-redux"
import * as actions from "../../../redux/actions/savings/goal/get-customer-transaction-history.actions";
import * as util from "../../../shared/utils";


class TopUPGoal extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            accountToDebitInValid: false,
            accountToDebit: "",
            AmountInvalid: false,
            isSubmit: false,
            formattedValue: "",
            Amount:"",
            showMessage:false,
            goal:JSON.parse(localStorage.getItem('goal')) || [],
            payOutInterest:""


        };
        this.handleDebit = this.handleDebit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }



    validateAmount = (amount) => {
        if (amount == "") {
            this.setState({ AmountInvalid: true });
            return true;
        }
    };
    handleDebit = (account) => {
        //console.log(account);
        this.setState({ accountToDebit: account });
        if (this.state.isSubmit) {
            if (account != "")
                this.setState({ accountToDebitInValid: false });
        }
    };
    validateAccountNumber(account, state) {
        if (account.length != 10) {
            this.setState({ [state]: true });
            return true;
        }
    }
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    }

    handleAmount = (event) => {
            // console.log
            let intVal = event.target.value.replace(/,/g, '');
            if (/^\d+(\.\d+)?$/g.test(intVal)) {
                // if (parseInt(intVal, 10) <= 2000000) {
                this.setState({ Amount: intVal, Amount: this.toCurrency(intVal) },
                    () => this.setFregValue());
                // }
            } else if (event.target.value === "") {
                this.setState({ Amount: "", Amount: "" },
                    () => this.setFregValue());
            }

            if(this.state.isSubmit === true)
                if (this.state.formsubmitted) {
                    if (event !== "")
                        this.setState( { AmountInvalid: false });
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
    setFregValue = () => {
        this.setState({ payOutInterest: this.calculateStashInterest() });


    };
    
    calculateStashInterest(){
            let days = null;
            let res;
            if(this.state.Amount){
                let amount = parseFloat(this.removeComma(this.state.Amount)) + this.state.goal.amountSaved;
                console.log(amount)
                console.log(this.state.goal.amountSaved)
                let ia = ((amount / 365) * 0.10 );
                let interest = (ia - (parseFloat(0.10) * ia)).toFixed(2);
                this.interest =  interest;
                this.showInterests = true;
                return this.interest
            }else{
                this.showInterests = false;
                return this.interest
            }
        }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isSubmit: true});
        if (this.validateAmount(this.state.Amount) || this.validateAccountNumber(this.state.accountToDebit, "accountToDebitInValid")) {
            //not valid
        }else {
            this.props.dispatch(actions.TopUPGoalStep1( {
                    'goalName':this.state.goal.goalName,
                    'goalId':this.state.goal.id,
                    'amount': this.state.Amount,
                    'accountNumber':this.state.accountToDebit
                }
            ));

        }
    };
    showInterest = () =>  {
        this.setState({showMessage: true})
    };
    gotoStep2 = () => {
        if (this.props.top_up_goal_step1)
            if (this.props.top_up_goal_step1.top_up_goal_status_step1 === customerGoalConstants.TOP_UP_GOAL_SUCCESS_STEP1) {
                return <Redirect to="/savings/top-up-goal-summary" />
            }
    };

    render() {
        const {AmountInvalid} =this.state;
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
                                            <NavLink to='/savings/choose-goal-plan'>
                                                <li><a href="accounts.html" className="active">Goals</a></li>
                                            </NavLink>
                                            <NavLink to='/savings/activityDashBoard'>
                                                <li><a href="statement.html">Group Savings</a></li>
                                            </NavLink>
                                            <li><a href="#">Investments</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="max-600">

                                    <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Top Up Goal</h4>
                                        <center>
                                            <p className="header-info">How much would you like to top up?</p>
                                        </center>

                                            <form onSubmit={this.handleSubmit}>
                                                {this.props.alert && this.props.alert.message &&
                                                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                                }
                                                <div className={AmountInvalid ? "form-group  form-error" : "form-group"}>
                                                    <label className="label-text">How much would you like to top up?</label>
                                                    <input
                                                        onKeyUp= {this.showInterest}
                                                        className="form-control"
                                                        autoComplete="off"
                                                        name="Amount"
                                                        onChange={this.handleAmount}
                                                        placeholder="E.g. ₦100,000"
                                                        value={this.state.Amount}
                                                    />
                                                    {AmountInvalid &&
                                                    <div className="text-danger">Enter the amount you want to save</div>}
                                                    {
                                                        this.state.showMessage ?
                                                            <div className="text-purple"><h3 className="text-purple"> Base on your previous savings you will earn
                                                                ₦ {util.formatAmount(this.state.payOutInterest)} in interest daily. Your stash will need to exist for a minimum of 30 days to qualify for interest </h3></div>
                                                            : null
                                                    }
                                                </div>                                                {

                                            }
                                                <div className="form-group">

                                                    <SelectDebitableAccounts
                                                        accountInvalid={this.state.accountToDebitInValid}
                                                        onChange={this.handleDebit}
                                                        labelText={"Select Account to debit"}
                                                    />
                                                </div>


                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button type="submit" value="Fund Account" className="btn-alat m-t-10 m-b-20 text-center">
                                                                {this.props.top_up_goal_step1.top_up_goal_status_step1 === customerGoalConstants.TOP_UP_GOAL_PENDING_STEP1 ? "Processing..." : "Top Up Goal"}
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




        );
    }
}
const mapStateToProps = state => ({
    top_up_goal_step1:state.top_up_goal_step1,
    alert:state.alert
});


export default connect(mapStateToProps)(TopUPGoal);