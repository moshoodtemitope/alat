import React, { Component } from 'react';
import { Fragment } from 'react';
import InnerContainer from "../../../shared/templates/inner-container";
import SavingsContainer from "..";
import { NavLink, Redirect } from "react-router-dom";
import SelectDebitableAccounts from "../../../shared/components/selectDebitableAccounts";
import { customerGoalConstants } from "../../../redux/constants/goal/get-customer-trans-history.constant";
import * as actions from "../../../redux/actions/savings/goal/get-customer-transaction-history.actions";
import { connect } from 'react-redux'
import { Description } from "../group/component";
import { DebitableAccount } from '../../../redux/actions/lifestyle/movies-actions';
import { listStyleConstants } from '../../../redux/constants/lifestyle/lifestyle-constants';


class StashCashout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            accountToDebitInValid: false,
            accountToDebit: null,
            AmountInvalid: false,
            isSubmit: false,
            formattedValue: "",
            Amount: null,
            showMessage: false,
            payOutInterest: "",
            debitAmount: "",
            accountToDebitInValid: false,
            AccountNo: "",
            AvailableBalance: null,
            AccountType: null,


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
    renderSelectableDebitabe = () => {
        if (this.props.debitable_account.message === listStyleConstants.DEBITABLE_ACCOUNT_PENDING) {
            return <select><option>loading debitable Account...</option></select>
        } else if (this.props.debitable_account.message === listStyleConstants.DEBITABLE_ACCOUNT_FAILURE) {
            return <select><option>No debitable Account</option></select>


        } else if (this.props.debitable_account.message === listStyleConstants.DEBITABLE_ACCOUNT_SUCCESS) {
            let account = this.props.debitable_account.data.response
            return (
                <select onChange={this.handleDebitableAccount}>
                    <option>Select Account to credit</option>
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


            this.setState({
                goalName: data.goalName,
                goalId: data.id,
                debitAccount: data.DebitAccount,
                Amount: data.amountSaved,
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
    validateAccountNumber() {
        if (this.state.AccountNo === "" || this.state.AccountNo === null) {
            this.setState({ accountToDebitInValid: true });
            return true;
        } else {
            this.setState({ accountToDebitInValid: false })
            return false;
        }
    }




    handleAmount = (event) => {
        // console.log
        let intVal = event.target.value.replace(/,/g, '');
        if (/^\d+(\.\d+)?$/g.test(intVal)) {
            // if (parseInt(intVal, 10) <= 2000000) {
            this.setState({ Amount: intVal, Amount: this.toCurrency(intVal) });
            // }
        } else if (event.target.value === "") {
            this.setState({ Amount: "", Amount: "" });
        }

        if (this.state.isSubmit === true)
            if (this.state.formsubmitted) {
                if (event !== "")
                    this.setState({ AmountInvalid: false });
            }
    };

    toCurrency(currency) {
        if (currency) {
            currency = typeof currency !== 'string' ? currency.toString() : currency;
            let numberValueArray = currency.split('.');
            let numberValue = this.removeComma(numberValueArray[0]);
            currency = numberValueArray.length > 1 ? numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                + '.' + numberValueArray[1] : numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        return currency;
    }
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSubmit: true });
        if (this.validateAccountNumber()) {
            //not valid
        } else {
            this.props.dispatch(actions.StashCashoutStep1({
                'goalName': this.state.goalName,
                'goalId': parseInt(this.state.goalId),
                "DebitAccount": this.state.AccountNo,
                'Amount': this.state.Amount,
                "AvailableBalance": this.state.AvailableBalance,
                "AccountType": this.state.AccountType,
                'partialWithdrawal': true

            }
            ));

        }
    };
    gotoStep2 = () => {
        if (this.props.stashGoal_step1)
            if (this.props.stashGoal_step1.stashout_goal_status_step1 === customerGoalConstants.STASH_CASHOUT_STEP1_SUCCESS) {
                return <Redirect to="/savings/cashout-goal-summary" />
            }
    };
    formatAmount(amount) {
        return amount.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };


    render() {
        const { AmountInvalid, accountToDebitInValid } = this.state;

        return (
            <Fragment>

                <div className="row">
                    <div className="col-sm-12">
                        <p className="page-title">Savings & Goals</p>
                    </div>
                    {this.gotoStep2()}

                    <div className="col-sm-12">
                        <div className="tab-overflow">
                            <div className="sub-tab-nav">
                                <ul>
                                    <li>
                                        <NavLink className="active" to='/savings/choose-goal-plan'>Goals
                                        </NavLink>

                                    </li>
                                    <li>
                                    <NavLink to='/savings/activityDashBoard'>
                                        Group Savings
                                    </NavLink>
                                    </li>
                                    {/* <li><a href="#">Investments</a></li> */}

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
                                    <h4 className="m-b-10 center-text hd-underline">Stash Cashout</h4>

                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <Description
                                                leftHeader={this.state.user.fullName}
                                                leftDescription={this.state.user.email}
                                                rightHeader={'₦' + this.state.Amount}
                                                rightDiscription="Amount Saved" />
                                        </div>

                                        {this.props.alert && this.props.alert.message &&
                                            <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
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
                                                    <button type="submit" value="Fund Account" className="btn-alat m-t-10 m-b-20 text-center">
                                                        {this.props.stashGoal_step1.stashout_goal_status_step1 === customerGoalConstants.STASH_CASHOUT_STEP1_PENDING ? "Processing..." : "Proceed and Cashout"}
                                                    </button>
                                                </center>
                                            </div>
                                        </div>


                                    </form>

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

                </div>

            </Fragment>

        );
    }
}
const mapStateToProps = state => ({
    alert: state.alert,
    stashGoal_step1: state.CustomerGoalReducerPile.stashGoal_step1,
    submitDashboardData: state.CustomerGoalReducerPile.submitDashboardData,
    debitable_account: state.LifestyleReducerPile.DebitableAccount

});

export default connect(mapStateToProps)(StashCashout);