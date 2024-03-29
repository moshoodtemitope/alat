import React, { Component } from 'react';
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '..';
import {Fragment} from "react";
import { connect } from 'react-redux';
import * as actions from "../../../redux/actions/savings/goal/get-customer-transaction-history.actions";
import {customerGoalConstants} from "../../../redux/constants/goal/get-customer-trans-history.constant";
import {NavLink} from "react-router-dom";
import { numberWithCommas } from "../../../shared/utils";



class CashoutStashGoal extends Component {
    constructor(props){
        super(props);

        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            goalName:"",
            debitAccount:"",
            debitAmount:"",
            Amount:"",
            goalId:"",
            goal:JSON.parse(localStorage.getItem('goal')) || [],


        }
    }


    componentDidMount = () => {
        this.init();
    };

    init = () => {
        if (this.props.stashGoal_step1.stashout_goal_status_step1 !== customerGoalConstants.STASH_CASHOUT_STEP1_SUCCESS)
            this.props.history.push("/savings/stash-cashout");
        else {
            let data = {
                ...this.props.stashGoal_step1.stashout_goal_data_step1.data
            };
            //  console.log('tag', data);

            this.setState({
                goalName:data.goalName,
                goalId:data.goalId,
                debitAccount:data.DebitAccount,
                Amount:data.Amount,
                AvailableBalance: data.AvailableBalance,
                AccountType: data.AccountType,
                partialWithdrawal:true
            });
        }
    };
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
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
    formatAmount(amount) {
        return amount.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };


    handleSubmit=(event)=>{

        event.preventDefault();
        this.props.dispatch(actions.StashCashout({
            "goalId": this.state.goalId,
            "accountNumber": this.state.debitAccount.trim(),
            "amount":numberWithCommas(this.state.Amount),
            // "PartWithdrawal":true

        }));

    };


    render() {

        return (
            <Fragment>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                            

                                                
                                            <li>
                                            <NavLink to='/savings/choose-goal-plan'>
                                                Goals
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


                            {this.props.alert && this.props.alert.message &&
                            <div style={{width: "100%", marginRight:"120px",marginLeft:"279px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }

                            <h1 style={{margin:'auto', width:"100%", textAlign:"center",
                                color:"#AB2656", fontSize:'18px'}}>WithDrawal Summary</h1>
                            <div style={{margin:"30px", marginLeft:"120px",marginRight:"120px"}}></div>

                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="al-card no-pad">
                                                    <div className="coverForSummary">
                                                        <div className="left">
                                                            <p className='GoalText'>Goal Name</p>
                                                            <p className='boldedText'>{this.state.goalName}</p>
                                                        </div>
                                                        <div className="right">
                                                            <p className='GoalText'>Amount</p>
                                                    <p className='boldedText'>₦{numberWithCommas(this.state.Amount)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="coverForSummary">
                                                        <div className="left">
                                                            <p className='GoalText'>Account Type</p>
                                                            <p className='boldedText'>{this.state.AccountType}</p>
                                                        </div>

                                                    </div>

                                                    <div className="coverForSummary">
                                                        <div className="left">
                                                            <p className='GoalText'>Account Balance</p>
                                                    <p className='boldedText'>₦{numberWithCommas(this.state.AvailableBalance)}</p>
                                                        </div>

                                                        <div className="right">
                                                            <p className='GoalText'>Account to Credit</p>
                                                            <p className='boldedText'>{this.state.debitAccount}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button disabled={this.props.stashGoal.stashout_goal_status === customerGoalConstants.STASH_CASHOUT__PENDING}
                                                                    type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                                {this.props.stashGoal.stashout_goal_status === customerGoalConstants.STASH_CASHOUT__PENDING ? "Processing..." :"WithDraw"}
                                                            </button>
                                                        </center>
                                                    </div>

                                                </div>
                                            </form>


                                        </div>

                                        <a style={{ cursor: "pointer" }} onClick={() => {
                                            this.props.history.push('/savings/stash-cashout')
                                        }} className="add-bene m-t-50">
                                            Go back
                                        </a>


                                    </div>
                                   



                                </div>
                            </div>
                        </div>






            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    alert: state.alert,
    stashGoal:state.CustomerGoalReducerPile.stashGoal,
    stashGoal_step1:state.CustomerGoalReducerPile.stashGoal_step1,
    accounts: state.dashboard_accounts


});
export default connect(mapStateToProps)(CashoutStashGoal);

