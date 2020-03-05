import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";

import loanIcon from '../../../assets/img/loan_icon.svg';
import loanCalendar from '../../../assets/img/loan_calendar.svg';
import calendarFull from '../../../assets/img/calendar_full.svg';
//import ExtendModal from '../../../shared/components/_modal';
import Modal from 'react-responsive-modal';

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
            ///////////////////Modal prperties
            openModal: false,
            IsSuccess: false,
            openLiquidateModal: false,
            modalMessage: "",
        }
    }

    init = () => {
        this.props.dispatch(LoanActions.clearLoanOnboardingStore());
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
        // this.refreshAfterLiquidation();
    }

    discardLoan = () => {
        this.props.dispatch(LoanActions.loanReject(this.state.user.token));
    }

    declineAction = () => {
        if (this.props.loan_reject) {
            if (this.props.loan_reject.loan_reject_status == loanConstants.LOAN_REJECT_SUCCESS) {
                this.props.dispatch(LoanActions.clearLoanOnboardingStore());
                this.props.history.push('/loans/salary/calc');
                //window.location.reload();
                // this.setState();
            }
        }
    }


    initCurrentLoan = () => {
        if (this.props.loan_current && !this.state.currentLoanSet){
            if (this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_SUCCESS) {
                var data = {
                    ...this.props.loan_current.loan_current_data.response.Response
                };
                
                
                if(this.props.loan_current.loan_current_data.response.Response != null){
                    this.setState({ currentLoan: data, currentLoanSet: true });
                }
                else{ 
                    this.setState({currentLoanSet: true });
                }
            }

            // console.log("---------", data);
        }
    }

    controlModal = () => {
        this.setState({ openModal: !this.state.openModal, modalMessage: "Are sure you want to discard your current Loan Application?" });
    }

    SubmitModal = () => {
        this.controlModal();
        this.discardLoan();
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
                        this.setState({ pendingLoanApplication: loanApplication, setPendingLoanApplication: true }
                            );
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
            case LoanApplicationProgress.Inprogress_UploadStatement: return "/loans/salary/statement-upload"
                break;
        }
    }

    continueApplication = () => {
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
        if (this.props.loan_current){
            if (this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_PENDING) {
                return loanConstants.LOAN_CURRENT_PENDING;
            } 
            if (this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_FAILURE) {
                return loanConstants.LOAN_CURRENT_FAILURE;
            }
            if (this.props.loan_current.loan_current_status == loanConstants.LOAN_CURRENT_SUCCESS) {
                return loanConstants.LOAN_CURRENT_SUCCESS;
            }
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
                                    <p>{util.mapCurrency("NGN")}{util.formatAmount(loan.AmountOffered)}
                                        <span>Loan Amount</span>
                                    </p>
                                </div>
                                <div>
                                    <img src={loanIcon} />
                                    <p>{util.mapCurrency("NGN")}{util.formatAmount(loan.AmountOffered)}  
                                    {/* to be changed */}
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


    closeLiquidateModal = () => {
        this.setState({ openLiquidateModal: false });
    };

    showLiquidateModal = () => {
        this.setState({ openLiquidateModal: true });
    };

    confirmLiquidation =()=>{
        let liquidateLoan = this.props.liquidate_loan;
        this.sendLiquidationRequest()
            .then(()=>{
                
                if(this.props.liquidate_loan.liquidateloan_status ===loanConstants.LIQUIDATE_LOAN_SUCCESS){
                    
                   
                    // this.props.dispatch(LoanActions.loanCurrent(this.state.user.token));
                    setTimeout(() => {
                        // this.closeLiquidateModal();
                        // this.getCurrentLoan();
                        window.location.reload();
                    }, 3000);
                    
                    // 
                }
                
            })
    }

    sendLiquidationRequest = async()=>{

        const user = JSON.parse(localStorage.getItem("user"));

        const { dispatch } = this.props;
       await dispatch(LoanActions.liquidateLoan(user.token));
    }
    refreshAfterLiquidation =()=>{
        let liquidateLoan = this.props.liquidate_loan
        if(liquidateLoan.liquidateloan_status ===loanConstants.LIQUIDATE_LOAN_SUCCESS){
            setTimeout(() => {
                this.closeLiquidateModal();
                // this.getCurrentLoan();
            }, 3000);
            this.props.dispatch(LoanActions.loanCurrent(this.state.user.token));
        }
        
    }


    showLiquidate =()=>{
        const {openLiquidateModal} = this.state;
        let liquidateLoan = this.props.liquidate_loan;
        // if(liquidateLoan.liquidateloan_status ===loanConstants.LIQUIDATE_LOAN_FAILURE && liquidateLoan.liquidateloan_data!==undefined){
        //     console.log("fgsdsdcs",liquidateLoan.liquidateloan_data);
        // }
        return(
            <Modal open={openLiquidateModal} onClose={this.closeLiquidateModal}>
                <div className="div-modal">
                    {liquidateLoan.liquidateloan_status !==loanConstants.LIQUIDATE_LOAN_SUCCESS &&
                        <div>
                            {liquidateLoan.liquidateloan_status ===loanConstants.LIQUIDATE_LOAN_FAILURE && liquidateLoan.liquidateloan_data!==undefined &&
                                <div className="info-label error">{liquidateLoan.liquidateloan_data.error}</div>
                            }
                            <div className="">Are you sure you want liquidate your loan</div>

                            <div className="m-t-20 text-center">
                                {/* <button onClick={this.onCloseModal} className="border-btn">Back</button> */}
                                <button onClick={(e)=>{
                                    e.preventDefault();
                                    this.confirmLiquidation();
                                }}
                                disabled={liquidateLoan.is_processing}
                                className="btn-alat">
                                {liquidateLoan.is_processing?'Luiquidating...':'Yes, I confirm'}  
                                </button>
                            </div>
                        </div>
                    }
                    {liquidateLoan.liquidateloan_status ===loanConstants.LIQUIDATE_LOAN_SUCCESS &&
                        <div className="success-wrap">
                            <center>
                                <div className="m-b-30 m-t-20">
                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.418 38.3379L20 32L16 36L26.4268 46L48 22L43.9629 18L26.418 38.3379Z" fill="#169A62"/>
                                    <path d="M32 0C14.3261 0 0 14.3261 0 32C0 49.6739 14.3261 64 32 64C49.6739 64 64 49.6739 64 32C64 14.3261 49.6739 0 32 0ZM32 59C17.0879 59 5 46.9121 5 32C5 17.0879 17.0879 5 32 5C46.9121 5 59 17.0879 59 32C59 46.9121 46.9121 59 32 59Z" fill="#169A62"/>
                                    </svg>
                                </div>
                            </center>
                            <h4 className="center-text red-text">Your loan was successfully liquidated</h4>
                            {/* {this.refreshAfterLiquidation()} */}
                        </div>
                    }
                </div>
            </Modal>
        )
    }

    render() {
        this.initCurrentLoan();
        setTimeout(this.movetoCalculator(), 2000);
        this.declineAction();
        
        //this.returnPendingLoanAppLication();
        const { currentLoan } = this.state;
        // console.log("current loans are", currentLoan);
        return (<Fragment>
            {this.showLiquidate()}
            <div className="row">
                <div className="col-sm-12">
                    <div className="loan-dsh-ctn">
                        <div className="sub-ctn dsh-left">
                            <h4 className="red-text m-b-20">Current Loan</h4>
                            {/* && currentLoan.Response != null */}
                            {currentLoan != null  && <div className="shd-box seg">
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
                                        <p>{util.mapCurrency("NGN")}{util.formatAmount(currentLoan.AmountPaid)}
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
                            {currentLoan == null && this.state.pendingLoanApplication == null && <div className="shd-box seg empty">
                                {this.returnCurrentLoanPendingStatus() == loanConstants.LOAN_CURRENT_SUCCESS && <span className="grey-text big">Hi {this.state.user.fullName}, You do not have a current loan!</span>}
                                {this.returnCurrentLoanPendingStatus() == loanConstants.LOAN_CURRENT_PENDING && <span className="grey-text big">Loading...</span>}
                                {this.returnCurrentLoanPendingStatus() == loanConstants.LOAN_CURRENT_FAILURE && <span className="grey-text big"><a onClick={this.getCurrentLoan} style={{ cursor: "pointer" }}>Click to try again</a></span>}
                            </div>}
                            {this.state.pendingLoanApplication != null && <div className="shd-box seg">
                                <div className="header">
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
                                {this.state.pendingLoanApplication.ProceedActive===true &&
                                     <input type="button" value="Proceed"  onClick={this.continueApplication} className="btn-alat btn-block" />
                                }

                                {/* <input type="button" value="Proceed" disabled={!this.state.pendingLoanApplication.ProceedActive} onClick={this.continueApplication} className="btn-alat btn-block" /> */}
                                
                                {this.state.pendingLoanApplication.RejectLoanActive===true &&
                                    <input type="button" value={this.props.loan_reject.loan_reject_status == loanConstants.LOAN_REJECT_PENDING ? "Processing..." : "Discard Loan Application"} onClick={this.controlModal}
                                    className={this.state.pendingLoanApplication.RejectLoanActive == false ? "btn-alat btn-disabled" : "btn-alat btn-alat-outline"} />
                                }

                                {/* <input type="button" disabled={!this.state.pendingLoanApplication.RejectLoanActive} value={this.props.loan_reject.loan_reject_status == loanConstants.LOAN_REJECT_PENDING ? "Processing..." : "Discard Loan Application"} onClick={this.controlModal}
                                    className={this.state.pendingLoanApplication.RejectLoanActive == false ? "btn-alat btn-disabled" : "btn-alat btn-alat-outline"} /> */}
                            </Fragment>
                            }
                            {/* && currentLoan.Response != null */}
                            {currentLoan != null  && 
                                <Fragment>
                                    {/* <input type="button" disabled={currentLoan == null} value="Liquidate Current Loan" className="btn-alat btn-block" /> */}
                                    {/* disabled liquidate loan */}
                                    {currentLoan.Status == 'Active' && 
                                        <input type="button" value="Liquidate loan"
                                            onClick={this.showLiquidateModal}
                                        className="btn-alat "  />
                                    }

                                    
                                    {/* <input type="button" disabled={currentLoan.Status == 'Active'} value="Apply For Loan dfd" onClick={() => this.props.history.push("/loans/salary/calc")} */}
                                    {/* <input type="button" value="Apply For Loan dfd" onClick={() => this.props.history.push("/loans/salary/calc")}
                                        className={currentLoan.Status == 'Active' ? "btn-alat " : "btn-alat btn-alat-outline"} /> */}
                                    
                                </Fragment>
                            }
                            {(currentLoan ==null && this.state.pendingLoanApplication == null && this.returnCurrentLoanPendingStatus() !== loanConstants.LOAN_CURRENT_PENDING) && 
                            <Fragment>
                                <input type="button" value="Apply For Loan" onClick={() => this.props.history.push("/loans/salary/calc")}
                                        className="btn-alat "  />
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
            <Modal open={this.state.openModal} onClose={this.controlModal} showCloseIcon={false} center>
                <div className="div-modal">
                   
                    <h3><br /><strong><span>{this.state.modalMessage}</span></strong><br /> </h3>

                    <div className="btn-opt">
                        <button onClick={this.controlModal} className="border-btn">Back</button>
                        <button onClick={this.discardLoan}
                            className="btn-alat"> {this.props.loan_reject.loan_reject_status == loanConstants.LOAN_REJECT_PENDING ? "Processing..." : "Continue"}</button>
                    </div>
                </div>
            </Modal>
            {/* <ExtendModal openModal={this.state.openModal} onCloseModal={this.controlModal} showCloseIcon={false}
                    IsSuccess={this.state.IsSuccess} message={this.state.modalMessage} SubmitAction={this.SubmitModal}
                /> */}
        </Fragment>);
    }

}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        //user: state.authentication.user.response,
        loan_current: state.loanReducerPile.loanCurrent,
        loan_history: state.loanReducerPile.loanHistory,
        loan_reject: state.loanReducerPile.loanReject,
        liquidate_loan: state.loanReducerPile.liquidateLoan,
    }
}

export default connect(mapStateToProps)(LoansDashboard);