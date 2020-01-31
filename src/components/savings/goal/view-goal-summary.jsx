import * as React from "react";
import { Fragment } from "react";
import { NavLink, Link, Route, Redirect } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import SubHead from '../../savings/group/sub-head';
import ProgressBar from '../../savings/group/progress-bar';
import moment from 'moment'
import { NavButtons } from '../../savings/group/component';
import MoreDetails from '../../savings/group/details';
import * as util from "../../../shared/utils";
import { customerGoalConstants } from '../../../redux/constants/goal/get-customer-trans-history.constant'
import * as actions from "../../../redux/actions/savings/goal/get-customer-transaction-history.actions";

class ViewGroupSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            type: 3,
            userType: 'members',
            navType: 3,
            buttonType: "smallButton",
            discTopSpan: 'something',
            customerGoalTransHistory: null,
            goalName: null,
            goalId: null,
            debitAccount: null,
            Amount: null,
            targetDate: null,
            startDate: null,
            goalTypeId: null,
            percentageCompleted: null,
            targetAmount: null,
            interestAccrued: null,
            interestEarned: null,
            frequencyId: null,
            debitAccount: null,
            nextstandingDate: null,
            goalTypeName: null,



        };



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
                debitAccount: data.debitAccount,
                Amount: data.amountSaved,
                targetDate: data.targetDate,
                startDate: data.startDate,
                goalTypeId: data.goalTypeId,
                percentageCompleted: data.percentageCompleted,
                targetAmount: data.targetAmount,
                interestAccrued: data.interestAccrued,
                interestEarned: data.interestEarned,
                frequencyId: data.frequencyId,
                debitAccount: data.debitAccount,
                nextstandingDate: data.nextstandingDate,
                goalTypeName: data.goalTypeName
            });
        }
    };

    toCurrency = (currency) => {
        if (currency) {
            currency = typeof currency !== 'string' ? currency.toString() : currency;
            let numberValueArray = currency.split('.');
            let numberValue = this.removeComma(numberValueArray[0]);
            currency = numberValueArray.length > 1 ? numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                + '.' + numberValueArray[1] : numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        return currency;
    };
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    }
    PauseCustomerGoal = () => {
        let data = {
            goalName: this.state.goalName,
            targetDate: this.state.targetDate,
            startDate: this.state.startDate,
            targetAmount: parseFloat(this.state.targetAmount),
            goalTypeId: parseInt(this.state.goalTypeId),
            id: parseInt(this.state.goalId),
            debitAmount: parseFloat(this.state.debitAmount),
            frequencyId: parseInt(this.state.frequencyId),
            debitAccount: this.state.debitAccount
        };
        this.props.dispatch(actions.PauseCustomerGoal(this.state.user.token, data));

        if (this.props.pause_goal.pause_customer_goal_status === customerGoalConstants.PAUSE_CUSTOMER_GOAL_SUCCESS) {

            return this.unpauseCustomerGoal()
        }


    };


    DeleteCustomerGoal = () => {
        return this.props.history.push('/savings/delete-goal')
    };
    UnpauseCustomerGoal = (event) => {
        let data = {
            goalId: parseInt(event.target.id),
        };
        this.props.dispatch(actions.unpauseCustomerGoal(this.state.user.token, data));
    };
    EditCustomerGoal = () => {
        return this.props.history.push("/savings/edit-goal");
    };








    GetMonth = (param) => {
        switch (param) {
            case '01':
                return 'January';
            case '02':
                return 'February';
            case '03':
                return 'March';
            case '04':
                return 'April';
            case '05':
                return 'May';
            case '06':
                return 'June';
            case '07':
                return 'July';
            case '08':
                return 'August';
            case '09':
                return 'September';
            case '10':
                return 'October';
            case '11':
                return 'November';
            case '12':
                return 'December';
        }
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
                                        <NavLink className="active" to='/savings/choose-goal-plan'>Goals
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/savings/activityDashBoard">
                                            Group Savings
                                        </NavLink>
                                    </li>
                                    {/* <li><a href="#">Investments</a></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {this.props.alert && this.props.alert.message &&
                        <div style={{ width: "100%", marginRight: "120px", marginLeft: "120px" }} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                    }
                    {this.state.goalTypeName === "Stash" ? (
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="max-600">
                                        <div className="al-card no-pad">

                                            <div className='firstSubHead'>
                                                <p>{this.state.goalTypeName}</p>
                                                <p>{this.state.goalName}</p>
                                            </div>
                                            <SubHead
                                                type={this.state.type}
                                                middlename="Stash Summary"
                                                memberClicked={this.HandleNavigation}
                                                automatedwasclicked={this.Automated}
                                            />

                                            <div className='statContainer'>
                                                <p className="information">You have saved <span style={{ color: "#AB2656" }}> N{this.toCurrency(this.state.Amount)}</span> and have earned <span style={{ color: "#AB2656" }}>N{this.toCurrency(this.state.interestEarned)}</span> in Interest</p>


                                                <ProgressBar
                                                    discTopSpan="Goal Progress"
                                                    discTopRight={this.state.percentageCompleted + "%" + " Completed"}
                                                    percentage={this.state.percentageCompleted}
                                                    discBottom={"₦" + this.toCurrency(this.state.Amount) + " "}
                                                    // discSpan={"  " + "of" + "  " + "₦" + this.toCurrency(this.state.targetAmount)}
                                                    discBottomSib="Amount Saved"
                                                /><br /><br />
                                                <div className="btn-position" style={{ paddingBottom: "50px" }} >

                                                    {
                                                        this.state.percentageCompleted === 100 ?
                                                            <NavLink to="/savings/stash-cashout">
                                                                <span href="#"
                                                                    className="btn-withdraw-goal btn-sm border-btn">Cash Out</span>
                                                            </NavLink> : null

                                                    }

                                                    <NavLink to={{
                                                        pathname: "/savings/top-up-goal-step1",

                                                    }}>
                                                        <span href="#"
                                                            className="btn-top-up-goal btn-sm border-btn">Top Up Stash</span>
                                                    </NavLink>

                                                </div>

                                            </div>


                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>) : (
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">
                                            <div className="al-card no-pad">

                                                <div className='firstSubHead'>
                                                    <p>{this.state.goalTypeName}</p>
                                                    <p>{this.state.goalName}</p>
                                                </div>
                                                <SubHead
                                                    type={this.state.type}
                                                    middlename="Goal Summary"
                                                    memberClicked={this.HandleNavigation}
                                                    automatedwasclicked={this.Automated}
                                                />

                                                <div className='statContainer'>
                                                    <p className="information">You have saved <span style={{ color: "#AB2656" }}> N{this.toCurrency(this.state.Amount)}</span> of your <span style={{ color: "#AB2656" }}>N{this.toCurrency(this.state.targetAmount)}</span> goal by saving <span style={{ color: "#AB2656" }}>N{this.toCurrency(this.state.Amount)}</span> monthly </p>

                                                    <ProgressBar
                                                        discTopSpan="Goal Progress"
                                                        discTopRight={this.state.percentageCompleted + "%" + " Completed"}
                                                        percentage={this.state.percentageCompleted}
                                                        discBottom={"₦" + this.toCurrency(this.state.Amount)}
                                                        discSpan={"  " + "of" + "  " + "₦" + this.toCurrency(this.state.targetAmount)}
                                                        discBottomSib="Amount Saved"
                                                    />
                                                    <MoreDetails
                                                        lefthead={"₦" + this.state.interestAccrued}
                                                        leftBottom="Interest Accrued"
                                                        middleTop={"₦" + this.state.interestEarned}
                                                        middleBottom="Interest Earned"
                                                        rightContent={moment(this.state.nextstandingDate).format("L")}
                                                        rightContentBottom="Next Payment" />
                                                    <div className="btn-position">

                                                        {/* {
                                                            this.state.percentageCompleted < 100 ? <NavLink to="/savings/withdraw-from-goal_step1">
                                                                <span href="#" className="btn-withdraw-goal btn-sm border-btn">Withdraw</span>
                                                            </NavLink> : null
                                                        } */}

                                                        {
                                                            this.state.percentageCompleted < 100 ?
                                                                <Link to={{
                                                                    pathname: "/savings/top-up-goal-step1",

                                                                }}>
                                                                    <span href="#" className="btn-top-up-goal btn-sm border-btn">Top Up Goal</span>
                                                                </Link> : null
                                                        }


                                                    </div>
                                                    {
                                                        <div className="btn-position">
                                                            {
                                                                this.state.percentageCompleted >= 100 ?
                                                                    <NavLink to="/savings/stash-cashout">
                                                                        <span href="#" className="btn-withdraw-goal btn-sm border-btn">Cashout</span>
                                                                    </NavLink> :
                                                                    <NavButtons
                                                                        navType={this.state.navType}
                                                                        leftName={this.props.pause_goal.pause_customer_goal_status === customerGoalConstants.PAUSE_CUSTOMER_GOAL_SUCCESS ? 'Continue' : 'Pause'}
                                                                        // middleName='Pause'
                                                                        rightName='Delete'
                                                                        edit={this.state.goalId}
                                                                        delete={this.state.goalId}
                                                                        unpause={this.state.goalId}
                                                                        DeleteGroup={this.DeleteCustomerGoal}
                                                                        PauseGroup={this.UnpauseCustomerGoal}
                                                                        EditGroup={this.PauseCustomerGoal} />

                                                            }


                                                        </div>

                                                    }



                                                </div>


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
                        )}

                </div>

            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        customerGoalTransHistory: state.CustomerGoalReducerPile.customerGoalTransHistory,
        alert: state.alert,
        pause_goal: state.CustomerGoalReducerPile.pause_goal,
        submitDashboardData: state.CustomerGoalReducerPile.submitDashboardData

    }
}

export default connect(mapStateToProps)(ViewGroupSummary);










