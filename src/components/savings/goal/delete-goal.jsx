import React, {Component, } from 'react';
import {Fragment} from 'react';
import InnerContainer from "../../../shared/templates/inner-container";
import SavingsContainer from "../container";
import {NavLink, Redirect} from "react-router-dom";
import SelectDebitableAccounts from "../../../shared/components/selectDebitableAccounts";
import {customerGoalConstants} from "../../../redux/constants/goal/get-customer-trans-history.constant";
import {connect} from "react-redux"
import Members from '../../savings/group/list-item'

import * as actions from "../../../redux/actions/savings/goal/get-customer-transaction-history.actions";


class DeleteGoal extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            accountToDebitInValid: false,
            accountToDebit:null,
            reason:3,
            isSubmit: false,
            formattedValue: "",
            goal:JSON.parse(localStorage.getItem('goal')) || [],


        };
        this.handleDebit = this.handleDebit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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



    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isSubmit: true});
        if (this.validateAccountNumber(this.state.accountToDebit, "accountToDebitInValid")) {
            //not valid
        }else {
            let data={
                'goalId': parseInt(this.state.goal.id),
                'accountNumber':this.state.accountToDebit,
                'reason':this.state.reason
            };
            this.props.dispatch(actions.deleteCustomerGoal(this.state.user.token, data));

        }
    };


    render() {
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
                        {this.props.alert && this.props.alert.message &&
                        <div style={{width: "100%", marginRight:"120px",marginLeft:"120px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                        }
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="max-600">

                                        <div className="al-card no-pad">
                                            <h4 className="m-b-10 center-text hd-underline">Delete  Goal</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className=" with-draw-goal-header">
                                                    <Members
                                                        userType="admin"
                                                        name={this.state.goal.goalName}
                                                        position={'You have ₦'+this.state.goal.amountSaved+' in your goal account and you need to transfer it to another account before you can delete it.'}
                                                        amount={'₦'+this.state.goal.amountSaved}
                                                        intent="Amount Saved"
                                                        id="autoSummary"/>
                                                </div>

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
                                                                {this.props.delete_goal.delete_customer_goal_status === customerGoalConstants.DELETE_CUSTOMER_GOAL_PENDING ? "Processing..." : "Delete Goal"}
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
    delete_goal:state.delete_goal,
    alert:state.alert
});


export default connect(mapStateToProps)(DeleteGoal);