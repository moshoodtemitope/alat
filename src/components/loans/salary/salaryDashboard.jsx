import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";

import loanIcon from '../../../assets/img/loan_icon.svg';
import loanCalendar from '../../../assets/img/loan_calendar.svg';
import calendarFull from '../../../assets/img/calendar_full.svg';

import * as util from '../../../shared/utils';

class LoansDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            currentLoan: null,
            LoanHistory: [
            ],
            currentLoanSet: false,
        }
    }

    init = () => {
        this.getCurrentLoan();
        this.getLoanHistory();
    }

    getLoanHistory = () => {
        this.props.dispatch(LoanActions.loanHistory(this.state.user.token));
    }

    getCurrentLoan = () => {
        this.props.dispatch(LoanActions.loanCurrent(this.state.user.token));
    }

    componentDidMount = () => {
        this.init();
    }

    initCurrentLoan = () => {
        if (this.props.loan_current && !this.state.currentLoanSet)
            if (this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_SUCCESS) {
                var data = {
                    ...this.props.loan_current.loan_current_data.response.Response
                };
                this.setState({ currentLoan: data, currentLoanSet: true });
            }
    }

    movetoCalculator =()=>{
        if (this.props.loan_current && this.props.loan_history)
            if (this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_SUCCESS && 
                this.props.loan_history.loan_history_status == loanConstants.LOAN_HISTORY_SUCCESS) {
                    if(this.props.loan_history.loan_history_data.response.Response.length == 0 
                        && this.props.loan_current.loan_current_data.response.Response ==null)
                        {
                            this.props.history.push('/loans/salary/calc');
                        }
            }
    }

    returnPastLoans = () => {
        if (this.props.loan_history)
            if (this.props.loan_history.loan_history_status == loanConstants.LOAN_HISTORY_SUCCESS) {
                var data = [
                    ...this.props.loan_history.loan_history_data.response.Response
                    //..this.state.LoanHistory
                ];
                if (data.length >= 1){
                    return (<Fragment>
                        {this.renderLoanList(data)}
                    </Fragment>);
                } else return(<Fragment><span class="grey-text big">You dont have Past Loans</span>   </Fragment>)
            }
    }

    returnCurrentLoanPendingStatus = () => {
        if (this.props.loan_current)
            if (this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_PENDING) {
                return loanConstants.LOAN_CURRENT_PENDING;
            } else if(this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_FAILURE){
                return loanConstants.LOAN_CURRENT_FAILURE;
            }
    }

    returnLoanHistoryPendingStatus = () => {
        if (this.props.loan_history)
            if (this.props.loan_history.loan_history_status == loanConstants.LOAN_HISTORY_PENDING) {
                return true;
            } else return false;
    }

    renderLoanList = (data) => {
        return (
            data.map((loan, key) => {
                //if (key <= 4) {
                return (
                    <div className="shd-box m-b-10" key={key}>
                        <div className="shd-amt">
                            <div>
                                <img src={loanIcon} />
                                <p>{util.formatAmount(loan.AmountRequested)}
                                    <span>Loan Amount</span>
                                </p>
                            </div>
                            <div>
                                <img src={loanCalendar} />
                                <p>{loan.TenureMonths} Months
                                    <span>Loan Term</span>
                                </p>
                            </div>
                            <div>
                                <img src={loanIcon} />
                                <p>N2,000,000
                                                   <span>Loan Amount</span>
                                </p>
                            </div>
                            <div>
                                <img src={calendarFull} />
                                <p>{util.FormartDate(loan.EndDate)}
                                    <span>Full Repayment Date</span>
                                </p>
                            </div>
                        </div>
                    </div>
                );
                //}
            })
        );
    }

    render() {
        this.initCurrentLoan();
        this.movetoCalculator();
        const { currentLoan } = this.state;
        return (<Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <div className="loan-dsh-ctn">
                        <div className="sub-ctn dsh-left">
                            <h4 className="red-text m-b-20">Current Loan</h4>
                            {currentLoan != null && <div className="shd-box seg">
                                <div className="header">
                                    <h3 className="red-text">N{currentLoan.AmountRemaining}
                                        <span className="text-grey-span">Balance</span>
                                    </h3>
                                </div>
                                <div style={{ border: "0.8px solid #F1F1F1", marginBottom: "10px" }}></div>
                                <div className="shd-amt">
                                    <div>
                                        <img src={loanIcon} />
                                        <p>N{currentLoan.AmountPaid}
                                            <span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src={loanCalendar} />
                                        <p>12 Months
													<span>Loan Term</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="shd-amt">
                                    <div>
                                        <img src={loanIcon} />
                                        <p>N2,500,000
													<span>Total Repayment</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src={loanCalendar} />
                                        <p>{currentLoan.NextDueDate}
                                            <span>Full Repayment Due</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="shd-amt">
                                    <div>
                                        <img src={loanIcon} />
                                        <p>N45,000
													<span>Next Repayment Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src={loanCalendar} />
                                        <p>12/09/2015
													<span>Next Repayment Date</span>
                                        </p>
                                    </div>
                                </div>
                            </div>}
                            {currentLoan == null && <div className="shd-box seg empty">
                                {this.returnCurrentLoanPendingStatus() == loanConstants.LOAN_CURRENT_SUCCESS && <span class="grey-text big">You dont have a current loan!</span>}
                                {this.returnCurrentLoanPendingStatus() == loanConstants.LOAN_CURRENT_PENDING && <span class="grey-text big">Loading...</span>}
                                {this.returnCurrentLoanPendingStatus() == loanConstants.LOAN_CURRENT_FAILURE && <span class="grey-text big"><a onClick={this.getCurrentLoan} style={{cursor : "pointer"}}>Click to try again</a></span>}
                            </div>}
                            <input type="button" disabled={currentLoan == null} value="Liquidate Current Loan" className="btn-alat btn-block" />
                            <input type="button" value="Apply For Loan" onClick={() => this.props.history.push("/loans/salary/calc")}
                                className="btn-alat btn-block btn-alat-outline" />

                        </div>
                        <div className="sub-ctn dsh-right">
                            <h4 className="red-text m-b-20">Past Loan</h4>
                            <div className="pst-ctn">
                                {this.returnPastLoans()}
                            </div>
                            {/* <div className="shd-box m-b-10">
                                <div className="shd-amt">
                                    <div>
                                         <img src={loanIcon} />
                                        <p>N2,000,000
													<span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                    <img src={loanCalendar} />
                                        <p>12 Months
													<span>Loan Term</span>
                                        </p>
                                    </div>
                                    <div>
                                    <img src={loanIcon} />
                                        <p>N2,000,000
													<span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src={calendarFull} />
                                        <p>N2,000,000
													<span>Loan Amount</span>
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div>
                        </div>
                    </div>
                    <div>
                        <div>
                            {/* <a><span className="red-text">Load more...</span></a> */}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>);
    }

}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        user: state.authentication.user.response,
        loan_current: state.loanReducerPile.loanCurrent,
        loan_history: state.loanReducerPile.loanHistory,
    }
}

export default connect(mapStateToProps)(LoansDashboard);