import React, { Component, Fragment } from 'React';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import "./css/alat-loans.css";
import taxLogo from '../../../assets/img/tax.svg';
import * as actions from '../../../redux/actions/alat-loan/export';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/scss/datepicker.scss"
import Modal from 'react-responsive-modal';
import { alertActions } from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal, } from '../../../shared/utils';
import AlatLoanContainer from '../alat-loan-container'

var today = new Date().toISOString();
let payload = {
    pageNumber: 1,
    startDate: "2018-01-01T01:00:00.000Z",
    endDate: today
}
class IndexPast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            showModal: false,
            clicked: false,
            startDate: null,
            endDate: null,
            invalidInterval: false
        };
    }

    componentDidMount() {

        this.props.getPastLoans(this.state.user.token, payload);
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

    goToApplyPage = (event) => {
        if (event) event.preventDefault();
        this.setState({ clicked: true }); //
        this.props.clearError();
        this.props.getloanState(this.state.user.token);
    }

    handleStartDatePicker = (startDate) => {
        this.checkInfoState();
        startDate.setHours(startDate.getHours() + 1);
        // console.log(startDate)
        this.setState({ startDate });
    }

    handleEndDatePicker = (endDate) => {
        this.checkInfoState();
        endDate.setHours(endDate.getHours() + 1);
        // console.log(endDate)
        this.setState({ endDate });
    }

    searchFromBackend = (event) => {
        event.preventDefault();
        this.checkInfoState();
        if (this.state.startDate && this.state.endDate) {
            if (Date.parse(this.state.startDate) > Date.parse(this.state.endDate)) {
                this.setState({ invalidInterval: true });
                return;
            }
        }
        this.setState({ invalidInterval: false })
    }

    render() {
        let search = (
            <div className="al-card">
                <h4 className="m-b-20">Select Date Interval</h4>
                <div className="col-sm-12">
                    <form>
                        <div className="row">
                            <div className="col-md-6 input-ctn">
                                <label>Start Date</label>
                                <DatePicker placeholderText="" selected={this.state.startDate}
                                    onChange={this.handleStartDatePicker}
                                    //onChangeRaw={(e) => this.handleChange(e)}
                                    dateFormat="d MMMM, yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                />
                            </div>
                            <div className="col-md-6 input-ctn">
                                <label>End Date</label>
                                <DatePicker placeholderText="" selected={this.state.endDate}
                                    onChange={this.handleEndDatePicker}
                                    //onChangeRaw={(e) => this.handleChange(e)}
                                    dateFormat="d MMMM, yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                />
                            </div>
                            {this.state.invalidInterval ? <p className="text-center text-danger" style={{ margin: "0px auto" }}>Start date cannot exceed end date</p> : null}
                        </div>
                    </form>

                </div>
                <button className="btn-alat m-t-10" onClick={this.searchFromBackend} style={{ width: "100%" }}>{this.props.fetching ? "Please wait..." : "Submit"}</button>
            </div>
        )
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
                            <p className="grey-text no-paylink">{this.props.fetching ? "Loading past loans..." : (this.props.alert.message ? <p><span style={{ color: "red" }}>{this.props.alert.message}</span><span onClick={() => { this.props.getPastLoans(this.state.user.token, payload) }} style={{ textDecoration: "underline", cursor: "pointer" }}> Click here to try again</span></p> : "You currently have no past loans")}</p>
                            <button onClick={this.onShowModal} className="btn-alat">Apply for Loan</button>
                        
                        </center>
                      
                    </div>
                </div>
            </AlatLoanContainer>);

        if (this.props.pastLoans.length > 0) {
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
                                this.props.pastLoans.map((loan, counter) => {
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
                                                            <h5 style={{ color: "#4D4D4D", fontWeight: "bold" }}>₦{formatAmountNoDecimal(((loan.AmountOffered * (loan.Interest / 100)) / 365).toFixed(2))}</h5>
                                                            <small style={{ fontSize: 10, color: "#717171", paddingTop: -30 }}>Daily Interest</small>
                                                        </div>
                                                        <div style={{ padding: "0", float: "right" }}>
                                                            <h5 style={{ color: "#4D4D4D", fontWeight: "bold" }}>₦{formatAmountNoDecimal(loan.AmountPayable - loan.RemainingAmount)}</h5>
                                                            <small style={{ fontSize: 10, color: "#717171", paddingTop: -30 }}>Amount Repaid</small>
                                                        </div>
                                                    </div>
                                                    <div className="clearfix"></div>



                                                </div>
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

        // if (this.props.loanState) {
        //     index = this.props.loanState.CanRequest ? <Redirect to="/loans/alat-loans/apply-goals" /> : <Redirect to="/loans/alat-loans/apply-others" />;
        // }
        if (this.props.loanState && this.props.loanState.CanRequest) {
            index = <Redirect to="/loans/alat-loans/apply-goals" />;
        }
        if (this.props.loanState && !this.props.loanState.CanRequest && this.state.clicked) {
            alert(this.props.loanState.EligiblityMessage ? this.props.loanState.EligiblityMessage : "Please save upto ₦100,000 to qualify for ALAT goal loan. ")
            this.setState({ clicked: false });
        }

        return index;
    }
}



const mapStateToProps = state => {
    return {
        fetching: state.alat_loan_reducer.isFetching,
        pastLoans: state.alat_loan_reducer.pastLoans,
        alert: state.alert,
        pageState: state.alat_loan_reducer.pageState,
        loanState: state.alat_loan_reducer.loanStatusData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPastLoans: (token, data) => dispatch(actions.fetchPastLoans(token, data)),
        setLoanInfo: (info) => dispatch(actions.setLoanToLiquidate(info)),
        clearError: () => dispatch(alertActions.clear()),
        getloanState: (token) => dispatch(actions.getLoanState(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPast);