import React, {Component} from 'react';
import {Fragment} from 'react';
import InnerContainer from "../../../shared/templates/inner-container";
import SavingsContainer from "..";
import {NavLink, Redirect} from "react-router-dom";
import SelectDebitableAccounts from "../../../shared/components/selectDebitableAccounts";
import {customerGoalConstants} from "../../../redux/constants/goal/get-customer-trans-history.constant";
import * as actions from "../../../redux/actions/savings/goal/get-customer-transaction-history.actions";
import {connect} from 'react-redux'
import {Description} from "../group/component";


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
    componentDidMount(){
        let savedState =  JSON.stringify(this.props.location.state.name)
        localStorage.setItem('myState', savedState);

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
        if (this.validateAccountNumber(this.state.accountToDebit, "accountToDebitInValid")) {
            //not valid
        }else {
            this.props.dispatch(actions.Cashout( {
                    'goalName':this.props.location.state.name.goalName,
                    'goalId':parseInt(this.props.location.state.name.id),
                    "amountSaved":parseFloat(this.props.location.state.name.debitAmount),
                    'accountNumber':this.state.accountToDebit,
                    'partialWithdrawal': true

                }
            ));

        }
    };
    gotoStep2 = () => {
        if (this.props.Cashout)
            if (this.props.Cashout.message === customerGoalConstants.CASH_OUT_SUCCESS) {
                return <Redirect to="/savings/cash-out-summary"/>
            }
    };


    render() {
        const {AmountInvalid} =this.state;

        const hist = this.props.location.state.name
        // console.log("========",hist);
        let retrievedState = JSON.parse(localStorage.getItem('myState'));

        
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
                                                <div className="form-group">
                                                    <Description
                                                        leftHeader={this.state.user.fullName}
                                                        leftDescription={this.state.user.email}
                                                        rightHeader={'₦'+hist.amountSaved}
                                                        rightDiscription="Amount Saved"/>
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
                                                                {this.props.Cashout.message === customerGoalConstants.CASH_OUT_PENDING ? "Processing..." : "Proceed and Cashout"}
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

            </Fragment>

        );
    }
}
const mapStateToProps = state => ({
    alert:state.alert,
    Cashout:state.Cashout
});

export default connect (mapStateToProps)(StashCashout);