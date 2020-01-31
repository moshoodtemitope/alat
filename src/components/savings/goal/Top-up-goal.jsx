import React, { Component, } from 'react';
import { Fragment } from 'react';
import { NavLink, Redirect } from "react-router-dom";
import SelectDebitableAccounts from "../../../shared/components/selectDebitableAccounts";
import { customerGoalConstants } from "../../../redux/constants/goal/get-customer-trans-history.constant";
import { connect } from "react-redux"
import * as actions from "../../../redux/actions/savings/goal/get-customer-transaction-history.actions";
import * as util from "../../../shared/utils";
import { DebitableAccount } from '../../../redux/actions/lifestyle/movies-actions';
import { listStyleConstants } from '../../../redux/constants/lifestyle/lifestyle-constants';




class TopUPGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            accountToDebitInValid: false,
            accountToDebit: "",
            AmountInvalid: false,
            isSubmit: false,
            formattedValue: "",
            Amount: "",
            goalName: "",
            showMessage: false,
            payOutInterest: "",
            amountSaved: null,
            goalId: null,
            goalTypeName: null,
            displayState: "block",
            showLimitLevel: false,
            AccountNo: "",
            AvailableBalance: null,
            AccountType: null,
            accountToDebitInValid: false,



        };
        this.handleDebitableAccount = this.handleDebitableAccount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchDebitableAccount()


    }
    fetchDebitableAccount() {
        const { dispatch } = this.props;
        dispatch(DebitableAccount(this.state.user.token));

    };
    handleDebitableAccount = (event) => {
        let AccountNo = event.target.value.split("8888")[2];
        console.log(AccountNo)
        let AccountName = event.target.value.split("8888")[1];
        console.log(AccountName)
        let AccountType = event.target.value.split("8888")[0];
        console.log(AccountType)
        let AvailableBalance = event.target.value.split("8888")[3];
        console.log(AvailableBalance)
        this.setState({ AccountNo: AccountNo });
        this.setState({ AccountName: AccountName });
        this.setState({ AccountType: AccountType });
        this.setState({ AvailableBalance: AvailableBalance });
        if (this.state.formsubmitted && event.target.value != "")
            this.setState({ accountToDebitInValid: false })


    };
    validateAccountNumber() {
        if (this.state.AccountNo === "" || this.state.AccountNo === null) {
            this.setState({ accountToDebitInValid: true });
            return true;
        } else {
            this.setState({ accountToDebitInValid: false })
            return false;
        }
    }

    renderSelectableDebitabe = () => {
        if (this.props.debitable_account.message === listStyleConstants.DEBITABLE_ACCOUNT_PENDING) {
            return <select><option>loading debitable Account...</option></select>
        } else if (this.props.debitable_account.message === listStyleConstants.DEBITABLE_ACCOUNT_FAILURE) {
            return <select><option>No debitable Account</option></select>


        } else if (this.props.debitable_account.message === listStyleConstants.DEBITABLE_ACCOUNT_SUCCESS) {
            let account = this.props.debitable_account.data.response
            return (
                <select onChange={this.handleDebitableAccount}>
                    <option>Select Account to debit</option>
                    {
                        account.map(select_debitable => {
                            return (<option key={select_debitable.BranchCode} value={select_debitable.AccountType + "8888" + " " + select_debitable.AccountName + " " + "8888" + " " + select_debitable.AccountNumber + "8888" + " " + select_debitable.AvailableBalance}>
                                {select_debitable.AccountType + '' + "(" + select_debitable.AccountNumber + ")" + '-' + select_debitable.Currency + '' + select_debitable.AvailableBalance}</option>)
                        })
                    }

                </select>
            )

        }

    }

    componentDidMount = () => {
        this.init();
    };

    init = () => {
        if (this.props.submitDashboardData.message !== customerGoalConstants.SUBMIT_DASHBOARD_DATA_SUCCESS)
            this.props.history.push("/savings/choose-goal-plan");
        else {

            let data = JSON.parse(this.props.submitDashboardData.data.data);
            console.log(data)


            this.setState({
                goalName: data.goalName,
                goalId: data.id,
                debitAccount: data.DebitAccount,
                amountSaved: data.amountSaved,
                goalTypeName: data.goalTypeName,
                partialWithdrawal: true
            });
        }
    };



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
    
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    }

    handleAmount = (event) => {
        // console.log
        let intVal = event.target.value.replace(/,/g, '');
        if (/^\d+(\.\d+)?$/g.test(intVal)) {
            // if (parseInt(intVal, 10) <= 2000000) {
            this.setState({ Amount: intVal, Amount: this.toCurrency(intVal) },
                () => {
                    this.setFregValue();
                    if (parseInt(intVal) > parseInt(999999999)) {
                        this.setState({ displayState: "none", showLimitLevel: true })
                    }
                    else {
                        this.setState({ displayState: "block", showLimitLevel: false })
                    }
                });
            // }
        } else if (event.target.value === "") {
            this.setState({ Amount: "", Amount: "" },
                () => this.setFregValue());
        }

        if (this.state.isSubmit === true)
            if (this.state.formsubmitted) {
                if (event !== "")
                    this.setState({ AmountInvalid: false });
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

    calculateStashInterest() {
        let days = null;
        let res;
        if (this.state.Amount) {
            let amount = parseFloat(this.removeComma(this.state.Amount)) + this.state.amountSaved;
            // console.log(amount)
            // console.log(this.state.amountSaved)
            let ia = ((amount / 365) * 0.10);
            let interest = (ia - (parseFloat(0.10) * ia)).toFixed(2);
            this.interest = interest;
            this.showInterests = true;
            return this.interest
        } else {
            this.showInterests = false;
            return util.formatAmount(this.interest);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSubmit: true });
        if (this.validateAmount() || this.validateAccountNumber()) {
            //not valid
        } else {
            this.props.dispatch(actions.TopUPGoalStep1({
                'goalName': this.state.goalName,
                'goalId': this.state.goalId,
                'amount': this.state.Amount,
                'accountNumber': this.state.AccountNo,
                "AvailableBalance": this.state.AvailableBalance,
                "AccountType": this.state.AccountType
            }
            ));

        }
    };
    showInterest = () => {
        this.setState({ showMessage: true })
    };
    gotoStep2 = () => {
        if (this.props.top_up_goal_step1)
            if (this.props.top_up_goal_step1.top_up_goal_status_step1 === customerGoalConstants.TOP_UP_GOAL_SUCCESS_STEP1) {
                return <Redirect to="/savings/top-up-goal-summary" />
            }
    };

    render() {
        const { AmountInvalid, accountToDebitInValid } = this.state;
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
                                            <li><a href="accounts.html" className="active">Goals</a></li>
                                        </NavLink>
                                        <NavLink to='/savings/activityDashBoard'>
                                            <li><a href="/savings/activityDashBoard">Group Savings</a></li>
                                        </NavLink>

                                    

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
                                                onKeyUp={this.showInterest}
                                                className="form-control"
                                                autoComplete="off"
                                                name="Amount"
                                                onChange={this.handleAmount}
                                                placeholder="E.g. ₦100,000"
                                                value={this.state.Amount}
                                            />
                                            {AmountInvalid &&
                                                <div className="text-danger">Enter the amount you want to save</div>}
                                            {this.state.goalTypeName === "Stash" ?
                                                <div>

                                                    {
                                                        this.state.showMessage ?
                                                            <div className="text-purple" style={{ display: this.state.displayState }}><h3 className="text-purple"> Base on your previous savings you will earn
                                                                    ₦ {util.formatAmount(this.state.payOutInterest)} in interest daily. Your stash will need to exist for a minimum of 30 days to qualify for interest </h3></div>
                                                            : null
                                                    }
                                                </div> : null
                                            }

                                            {
                                                this.state.showLimitLevel ?
                                                    <div className="text-purple"><h3 className="text-purple">Woah! 999,999,999 is enough for us</h3></div>
                                                    : null

                                            }

                                        </div>                                                {

                                        }
                                        

                                            <div className={accountToDebitInValid ? "form-group form-error" : "form-group"}>
                                                {this.renderSelectableDebitabe()}
                                                {
                                                    accountToDebitInValid && <div className="text-danger">Select account number</div>
                                                }

                                            </div>
                                       


                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    {this.state.displayState === "block" ?
                                                        <button type="submit" value="Fund Account" className="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.top_up_goal_step1.top_up_goal_status_step1 === customerGoalConstants.TOP_UP_GOAL_PENDING_STEP1 ? "Processing..." : "Top Up Goal"}
                                                        </button> : <button

                                                            disabled={true}
                                                            type="submit" className="btn-alat m-t-10 m-b-20 text-center"> Next
                                                            </button>}
                                                </center>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <a style={{ cursor: "pointer" }} onClick={() => {
                                this.props.dispatch(actions.ClearAction(customerGoalConstants.CUSTOMER_GOAL_REDUCER_CLEAR));
                                this.props.history.push('/savings/choose-goal-plan')
                            }} className="add-bene m-t-50">
                                Go back
                                        </a>


                        </div>
                    </div>

                </div>

            </Fragment>




        );
    }
}
const mapStateToProps = state => ({
    top_up_goal_step1: state.CustomerGoalReducerPile.top_up_goal_step1,
    alert: state.alert,
    submitDashboardData: state.CustomerGoalReducerPile.submitDashboardData,
    debitable_account: state.LifestyleReducerPile.DebitableAccount

});


export default connect(mapStateToProps)(TopUPGoal);