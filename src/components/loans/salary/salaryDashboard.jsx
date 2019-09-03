import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";

import loanIcon from '../../../assets/img/loan_icon.svg';
import loanCalendar from '../../../assets/img/loan_calendar.svg';
import calendarFull from '../../../assets/img/calendar_full.svg';

import { LoanApplicationProgress } from '../../../shared/constants';

import * as util from '../../../shared/utils';

class LoansDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            currentLoan: null,
            pendingLoanApplication: null,
            setPendingLoanApplication: false,
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
    
    discardLoan =()=>{
        this.props.dispatch(LoanActions.loanReject(this.state.user.token));
    }

    declineAction =()=>{
		if(this.props.loan_reject){
			if(this.props.loan_reject.loan_reject_status == loanConstants.LOAN_REJECT_SUCCESS){
                this.props.dispatch(LoanActions.clearLoanOnboardingStore());
                this.props.history.push('/loans/salary/calc');
               //window.location.reload();
              // this.setState();
			}
		}
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

    movetoCalculator = () => {
        if (this.props.loan_current && this.props.loan_history)
            if (this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_SUCCESS &&
                this.props.loan_history.loan_history_status == loanConstants.LOAN_HISTORY_SUCCESS) {
                if (this.props.loan_history.loan_history_data.response.Response == null
                    && this.props.loan_current.loan_current_data.response.Response == null) {
                    this.props.history.push('/loans/salary/calc');
                }
            }
    }

    returnPastLoans = () => {
        if (this.props.loan_history)
            if (this.props.loan_history.loan_history_status == loanConstants.LOAN_HISTORY_SUCCESS) {
                if (this.props.loan_history.loan_history_data.response.Response != null) {
                    var data = [
                        ...this.props.loan_history.loan_history_data.response.Response
                        //..this.state.LoanHistory
                    ];
                    if (this.state.setPendingLoanApplication == false) {
                        var loanApplication = this.props.loan_history.loan_history_data.response.Response.find(x => x.PendingApplication === true);
                        this.setState({ pendingLoanApplication: loanApplication, setPendingLoanApplication: true }, () =>
                            console.log(this.state.pendingLoanApplication));
                    }

                    if (data.length >= 1) {
                        return (<Fragment>
                            {this.renderLoanList(data)}
                        </Fragment>);
                    }
                } else return (<Fragment><span className="grey-text big">You dont have Past Loans</span>   </Fragment>)
            }
    }

    returnNextPageUrl = (LoanStatus) => {
        switch (LoanStatus) {
            case LoanApplicationProgress.InProgress_AccountDetails:
                return "/loans/salary/employer";
                break;
            case LoanApplicationProgress.Inprogress_SalaryEntries: return "/loans/salary/entry"
                break;
            case LoanApplicationProgress.Inprogress_ScoreCard: return "/loans/salary/score-card"
            break;
            case LoanApplicationProgress.Inprogress_Collection: return "/loans/salary/terms"
            break;
            case LoanApplicationProgress.Inprogress_CollectionWemaAccountSetup: return "/loans/salary/wema-setup"
            break;
            case LoanApplicationProgress.Inprogress_CollectionRemitaOtpSetup: return "/loans/salary/remita-otp"
            break;
            case LoanApplicationProgress.Inprogress_CollectionRemitaBankSetup: return "/loans/salary/remita-mandate"
            break;
        }
    }

    continueApplication=()=>{
        this.props.dispatch(LoanActions.continueApplication(this.state.pendingLoanApplication.LoanStatus));
        this.props.history.push(this.returnNextPageUrl(this.state.pendingLoanApplication.LoanStatus));
    }

    returnPendingLoanAppLication = () => {
        if (this.props.loan_history.loan_history_data.response.Response) {
            var loanApplication = this.props.loan_history.loan_history_data.response.Response.find(x => x.PendingApplication === true);
            //console.log(loanApplication);
            //this.setState({ pendingLoanApplication: loanApplication},()=>{ return true });
        }
    }

    returnCurrentLoanPendingStatus = () => {
        if (this.props.loan_current)
            if (this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_PENDING) {
                return loanConstants.LOAN_CURRENT_PENDING;
            } else if (this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_FAILURE) {
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
                if (loan.PendingApplication == false) {
                    return (
                        <div className="shd-box m-b-10" key={key}>
                            <div className="shd-amt">
                                <div>
                                    <img src={loanIcon} />
                                    <p>{util.formatAmount(loan.AmountOffered)}
                                        <span>Loan Amount</span>
                                    </p>
                                </div>
                                <div>
                                    <img src={loanIcon} />
                                    <p>--
                                                   <span>Total Repayment</span>
                                    </p>
                                </div>
                                <div>
                                    <img src={loanCalendar} />
                                    <p>{loan.TenureMonths} Months
                                    <span>Loan Term</span>
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
                }
            })
        );
    }

    render() {
        this.initCurrentLoan();
        this.movetoCalculator();
        this.declineAction();
        //this.returnPendingLoanAppLication();
        const { currentLoan } = this.state;
        return (<Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <div className="loan-dsh-ctn">
                        <div className="sub-ctn dsh-left">
                            <h4 className="red-text m-b-20">Current Loan</h4>
                            {currentLoan != null && currentLoan.Response != null && <div className="shd-box seg">
                                <div className="header">
                                    <h3 className="red-text">{util.mapCurrency("NGN")}{util.formatAmount(currentLoan.AmountRemaining)}
                                        <span className="text-grey-span">Balance</span>
                                    </h3>
                                </div>
                                <div style={{ border: "0.8px solid #F1F1F1", marginBottom: "10px" }}></div>
                                <div className="shd-amt">
                                    <div>
                                        <img src={loanIcon} />
                                        <p>{util.mapCurrency("NGN")}{util.formatAmount(currentLoan.LoanAmount)}
                                            <span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src={loanCalendar} />
                                        <p>{currentLoan.LoanTenure} Months
													<span>Loan Term</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="shd-amt">
                                    <div>
                                        <img src={loanIcon} />
                                        <p>--
													<span>Total Repayment</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src={loanCalendar} />
                                        <p>{util.FormartDate(currentLoan.FullPaymentDue)}
                                            <span>Full Repayment Due</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="shd-amt">
                                    <div>
                                        <img src={loanIcon} />
                                        <p>{util.mapCurrency("NGN")}{util.formatAmount(currentLoan.NextRepaymentAmount)}
                                            <span>Next Repayment Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src={loanCalendar} />
                                        <p>{util.FormartDate(currentLoan.NextDueDate)}
                                            <span>Next Repayment Date</span>
                                        </p>
                                    </div>
                                </div>
                            </div>}
                            {currentLoan == null && <div className="shd-box seg empty">
                                {this.returnCurrentLoanPendingStatus() == loanConstants.LOAN_CURRENT_SUCCESS && <span className="grey-text big">You dont have a current loan!</span>}
                                {this.returnCurrentLoanPendingStatus() == loanConstants.LOAN_CURRENT_PENDING && <span className="grey-text big">Loading...</span>}
                                {this.returnCurrentLoanPendingStatus() == loanConstants.LOAN_CURRENT_FAILURE && <span className="grey-text big"><a onClick={this.getCurrentLoan} style={{ cursor: "pointer" }}>Click to try again</a></span>}
                            </div>}
                            {this.state.pendingLoanApplication != null && <div className="shd-box seg">
                                <div class="header">
                                    <div className="outer-bar">
                                        <div className="inner-bar"></div>
                                    </div>
                                </div>
                                <div style={{ border: "0.8px solid #F1F1F1", marginBottom: "10px" }}></div>
                                <div className="shd-amt center-space">
                                    <p className="text-grey-center">{this.state.pendingLoanApplication.StatusMessage}</p>

                                </div>
                            </div>
                            }
                            {this.state.pendingLoanApplication != null && <Fragment>
                                <input type="button" value="Proceed" disabled={!this.state.pendingLoanApplication.ProceedActive} onClick={this.continueApplication} className="btn-alat btn-block" />
                                <input type="button" value={this.props.loan_reject.loan_reject_status == loanConstants.LOAN_REJECT_PENDING ? "Processing..." : "Discard Loan Application"} onClick={this.discardLoan}
                                    className="btn-alat btn-block btn-alat-outline" />
                            </Fragment>
                            }
                            {currentLoan != null && currentLoan.Response != null && <Fragment>
                                <input type="button" disabled={currentLoan == null} value="Liquidate Current Loan" className="btn-alat btn-block" />
                                <input type="button" value="Apply For Loan" onClick={() => this.props.history.push("/loans/salary/calc")}
                                    className="btn-alat btn-block btn-alat-outline" />
                            </Fragment>
                            }

                        </div>
                        <div className="sub-ctn dsh-right">
                            <h4 className="red-text m-b-20">Past Loan</h4>
                            <div className="pst-ctn">
                                {this.returnPastLoans()}
                            </div>
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
        loan_reject: state.loanReducerPile.loanReject,
    }
}

export default connect(mapStateToProps)(LoansDashboard);