import React, { Component, Fragment } from 'React';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import "./css/alat-loans.css";
import taxLogo from '../../../assets/img/tax.svg';
import * as actions from '../../../redux/actions/alat-loan/export';
import Modal from 'react-responsive-modal';

import { alertActions } from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal, } from '../../../shared/utils';
import AlatLoanContainer from '../alat-loan-container'

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            showModal: false,
            clicked: false
        };
    }

    componentDidMount() {
        this.props.resetJourney();
        this.props.getActiveLoans(this.state.user.token);
    }

    onShowModal = (event) => {
        // console.log("dot here")
        event.preventDefault();
        this.props.clearError();
        this.setState({ showModal: true });
    }

    onCloseModal = () => {
        this.setState({ showModal: false })
        this.props.clearError();
    }

    onLiquidateLoan = (event, info) => {
        event.preventDefault();
        this.props.setLoanInfo(info);
        this.props.history.push('/loans/alat-loans/liquidate')
    }

    goToApplyPage = (event) => {
        if(event)event.preventDefault();
        this.setState({clicked : true}); //
        this.props.clearError();
        this.props.getloanState(this.state.user.token);
    }

    render() {
        // console.log("in loan index");
        let index = (
            <AlatLoanContainer>
                <Modal open={this.state.showModal} onClose={this.onCloseModal} center>
                    <div className="disclaimer text-center">
                        <h4 className="hd-underline" style={{ width: "100%", color: "#AB2656" }}>Disclaimer</h4>
                        {(this.props.alert.message) ?
                            <div className="info-label error">{this.props.alert.message} </div> : null
                        }
                        <ul className="disclaimer-list">
                            <li>This loan is offered through us by our partners. Said partners may get in touch with you from time to time.</li>
                            <li>Our partners' loan recovery methods are entirely theirs and we have no control over them.</li>
                            <li>Please, read the terms and conditions carefully before applying for a loan.</li>
                            <li>Clicking ‘Okay, I understand” below absolves ALAT of any liability relating to your loan.</li>
                        </ul>
                        <div className="btn-">
                            <button onClick={this.goToApplyPage} style={{ width: "80%" }} className="btn-alat"><b>{this.props.fetching ? "Checking loan options..." : "Okay, I understand"}</b></button><br /><br />
                            <button disabled={this.props.fetching} onClick={this.onCloseModal} className="disclaimer-btn"><b>{this.props.fetching ? "" : "Cancel"}</b></button>
                        </div>
                    </div>
                </Modal>
                <div className="col-sm-12">
                    <div className="max-600 m-t-40">
                        <center>
                            <img src={taxLogo} className="m-b-30" style={{ marginTop: 60 }} alt="loans Logo" />
                            <p className="grey-text no-paylink">{this.props.fetchingLoans ? "Loading active loans..." : (this.props.alert.message ? <p><span style={{ color: "red" }}>{this.props.alert.message}</span><span onClick={() => { this.props.getActiveLoans(this.state.user.token) }} style={{ textDecoration: "underline", cursor: "pointer" }}> Click here to try again</span></p> : "You currently have no active loans")}</p>
                            <button onClick={this.onShowModal} className="btn-alat">Apply for Loan</button>
                        </center>
                    </div>
                </div>
            </AlatLoanContainer>);

        if (this.props.activeLoans.length > 0) {
            index = (
                <Fragment>
                    <div className="col-sm-12 mb-3">
                        <div className="row">
                            <div className="col-sm-12">
                                <button onClick={this.onShowModal} className="btn-alat">Apply for Loan</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="row">
                            {
                                this.props.activeLoans.map((loan, counter) => {
                                    var loanInfo = {
                                        loanId: loan.Id,
                                        name: loan.Name || "Alat Loan",
                                        outstanding: loan.RemainingAmount,
                                        charge: loan.ConvenienceFee,
                                        providerCode: loan.ProviderCode,
                                        isGoalLoan: loan.IsGoalLoan
                                    }
                                    return (
                                        <div className="col-sm-12 col-md-4" key={loan.Id}>
                                            <div className="al-card airtime-car" style={{ padding: 10 }}>
                                                <h4 className="hd-underline" style={{ color: "#AB2656", width: "100%" }}>{loan.IsGoalLoan ? loan.Name : "Alat Loan"}</h4>
                                                <div className="al-card airtime-cad" style={{ padding: "10px 20px", margin: "20px 10px", boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)" }}>
                                                    <div className="hd-underline" style={{ padding: 0 }}>
                                                        <h3 style={{ color: "#AB2656" }}>₦{formatAmountNoDecimal(loan.AmountOffered)}</h3>
                                                        <small style={{ fontSize: 10, color: "#717171" }}>Loan Amount</small>
                                                    </div>
                                                    <div>
                                                        <div style={{ padding: "20px 0 0 0", float: "left" }}>
                                                            <h5 style={{ color: "#4D4D4D", fontWeight: "bold" }}>₦{formatAmountNoDecimal(loan.RemainingAmount)}</h5>
                                                            <small style={{ fontSize: 10, color: "#717171", paddingTop: -30 }}>Outstanding</small>
                                                        </div>
                                                        <div style={{ padding: "20px 0 0 0", float: "right" }}>
                                                            <h5 style={{ color: "#4D4D4D", fontWeight: "bold" }}>₦{formatAmountNoDecimal(loan.InterestAccrued)}</h5>
                                                            <small style={{ fontSize: 10, color: "#717171", paddingTop: -30 }}>Interest Accrued</small>
                                                            <p style={{ fontSize: 10, color: "#717171", paddingTop: -30 }}>({loan.Interest}% p.a)</p>
                                                        </div>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                    <div>
                                                        <div style={{ padding: "0", float: "left" }}>
                                                            <h5 style={{ color: "#4D4D4D", fontWeight: "bold" }}>₦{formatAmountNoDecimal(((loan.AmountOffered * (loan.Interest/100)) / 365).toFixed(2))}</h5>
                                                            <small style={{ fontSize: 10, color: "#717171", paddingTop: -30 }}>Daily Interest</small>
                                                        </div>
                                                        {loan.IsGoalLoan ? null : (
                                                            <div style={{ padding: "0", float: "right" }}>
                                                            <h5 style={{ color: "#4D4D4D", fontWeight: "bold" }}>₦{formatAmountNoDecimal(loan.AmountPayable - loan.RemainingAmount)}</h5>
                                                            <small style={{ fontSize: 10, color: "#717171", paddingTop: -30 }}>Amount Repaid</small>
                                                        </div>
                                                        )}
                                                        
                                                    </div>
                                                    <div className="clearfix"></div>



                                                </div>
                                                <button onClick={(event) => this.onLiquidateLoan(event, loanInfo)} style={{ width: "94%", marginLeft: 10, marginRight: 10 }} className="btn-alat text-center">Liquidate Loan</button>

                                            </div>
                                        </div>)
                                })
                            }
                        </div>
                    </div>
                </Fragment>
            );
            index = (
                <AlatLoanContainer>
                    <Modal open={this.state.showModal} onClose={this.onCloseModal} center>
                        <div className="disclaimer text-center">
                            <h4 className="hd-underline" style={{ width: "100%", color: "#AB2656" }}>Disclaimer</h4>
                            {(this.props.alert.message) ?
                                <div className="info-label error">{this.props.alert.message} </div> : null
                            }
                            <ul className="disclaimer-list">
                                <li>This loan is offered through us by our partners. Said partners may get in touch with you from time to time.</li>
                                <li>Our partners' loan recovery methods are entirely theirs and we have no control over them.</li>
                                <li>Please, read the terms and conditions carefully before applying for a loan.</li>
                                <li>Clicking ‘Okay, I understand” below absolves ALAT of any liability relating to your loan.</li>
                            </ul>
                            <div className="btn-">
                                <button onClick={this.goToApplyPage} style={{ width: "80%" }} className="btn-alat"><b>{this.props.fetching ? "Checking loan options..." : "Okay, I understand"}</b></button><br /><br />
                                <button disabled={this.props.fetching} onClick={this.onCloseModal} className="disclaimer-btn"><b>{this.props.fetching ? "" : "Cancel"}</b></button>
                            </div>
                        </div>
                    </Modal>
                    {index}
                </AlatLoanContainer>
            )
        }
        if (this.props.loanState) {
            index = this.props.loanState.CanRequest ? <Redirect to="/loans/alat-loans/apply-goals" /> : <Redirect to="/loans/alat-loans/apply-others" />;
        }
        // if (this.props.loanState && this.props.loanState.CanRequest) {
        //     index = <Redirect to="/loans/alat-loans/apply-goals" />;
        // }
        // if (this.props.loanState && !this.props.loanState.CanRequest && this.state.clicked) {
        //     alert(this.props.loanState.EligiblityMessage ? this.props.loanState.EligiblityMessage : "Please save upto ₦100,000 to qualify for ALAT goal loan. ")
        //     this.setState({clicked: false});
        // }


        return index;
    }
}



const mapStateToProps = state => {
    return {
        fetching: state.alat_loan_reducer.isFetching,
        fetchingLoans: state.alat_loan_reducer.isFetchingLoan,
        alert: state.alert,
        activeLoans: state.alat_loan_reducer.activeLoans,
        pageState: state.alat_loan_reducer.pageState,
        loanState: state.alat_loan_reducer.loanStatusData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getActiveLoans: (token, data) => dispatch(actions.GetActiveLoans(token, data)),
        setLoanInfo: (info) => dispatch(actions.setLoanToLiquidate(info)),
        clearError: () => dispatch(alertActions.clear()),
        resetJourney: () => dispatch(actions.resetJourney()),
        getloanState: (token) => dispatch(actions.getLoanState(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);


