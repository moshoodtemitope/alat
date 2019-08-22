import React, {Component} from 'react';
import {Fragment} from 'react';
import InnerContainer from "../../../shared/templates/inner-container";
import SavingsContainer from "../container";
import {NavLink, Redirect} from "react-router-dom";
import Members from '../../savings/group/list-item'
import SelectDebitableAccounts from "../../../shared/components/selectDebitableAccounts";
import {customerGoalConstants} from "../../../redux/constants/goal/get-customer-trans-history.constant";
import * as actions from "../../../redux/actions/savings/goal/get-customer-transaction-history.actions";
import {connect} from 'react-redux'


class StashCashout extends Component {

    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            accountToDebitInValid: false,
            accountToDebit:null,
            AmountInvalid: false,
            isSubmit: false,
            formattedValue: "",
            Amount:null,
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

        if(this.state.isSubmit === true)
            if (this.state.formsubmitted) {
                if (event !== "")
                    this.setState( { AmountInvalid: false });
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
        this.setState({isSubmit: true});
        if (this.validateAmount(this.state.Amount) || this.validateAccountNumber(this.state.accountToDebit, "accountToDebitInValid")) {
            //not valid
        }else {
            this.props.dispatch(actions.WithDrawFromGoalStep1( {
                    'goalName':this.state.goal.goalName,
                    'goalId':this.state.goal.id,
                    "amountSaved":this.toCurrency(this.state.goal.amountSaved),
                    'accountNumber':this.state.accountToDebit
                }
            ));

        }
    };
    gotoStep2 = () => {
        if (this.props.withdraw_from_goal_step1)
            if (this.props.withdraw_from_goal_step1.withdraw_from_goal_status_step1 === customerGoalConstants.WITHDRAW_FROM_GOAL_SUCCESS_STEP1) {
                return <Redirect to="/savings/withdraw-from-goal_summary"/>
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
                                            <NavLink to='/savings/goal/group-savings-selection'>
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
                                            <h4 className="m-b-10 center-text hd-underline">Stash Cashout</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className=" with-draw-goal-header">
                                                    <Members
                                                        userType="admin"
                                                        name={this.state.user.fullName}
                                                        position={this.state.user.email}
                                                        amount={'₦'+this.state.goal.amountSaved}
                                                        intent="Amount Saved"
                                                        id="autoSummary"/>
                                                </div>
                                                {this.props.alert && this.props.alert.message &&
                                                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                                }

                                                <div className="form-group">

                                                    <SelectDebitableAccounts
                                                        accountInvalid={this.state.accountToDebitInValid}
                                                        onChange={this.handleDebit}
                                                        labelText={"Where would you like to withdraw to ?"}
                                                    />
                                                </div>


                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button type="submit" value="Fund Account" className="btn-alat m-t-10 m-b-20 text-center">
                                                                {this.props.withdraw_from_goal_step1.withdraw_from_goal_status_step1 === customerGoalConstants.WITHDRAW_FROM_GOAL_PENDING_STEP1 ? "Processing..." : "Proceed and Checkout"}
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
    alert:state.alert,
    withdraw_from_goal_step1:state.withdraw_from_goal_step1
});

export default connect (mapStateToProps)(StashCashout);