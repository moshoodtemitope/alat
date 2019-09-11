import React, { Component, Fragment } from 'React';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import taxLogo from '../../../assets/img/tax.svg';
import * as actions from '../../../redux/actions/alat-loan/export';
import Modal from 'react-responsive-modal';

import { alertActions } from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal, } from '../../../shared/utils';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            showModal: false,
        };
    }

    componentDidMount() {
        this.props.getActiveLoans(this.state.user.token);
    }

    onShowModal = (event) => {
        event.preventDefault();
        this.setState({ showModal: true });
    }

    onCloseModal = () => {
        this.setState({ showModal: false })
    }

    onLiquidateLoan = (info) => {
        this.props.setLoanInfo(info);
        this.props.history.push('/loans/alat-loans/liquidate')
    }

    render() {
        let index = (
            <div className="col-sm-12">
                <div className="max-600 m-t-40">
                    <center>
                        <img src={taxLogo} className="m-b-30" style={{ marginTop: 60 }} alt="loans Logo" />
                        <p className="grey-text no-paylink">{this.props.fetchingLoans ? "Loading active loans..." : (this.props.alert.message ? <p><span style={{ color: "red" }}>{this.props.alert.message}</span><span onClick={() => { this.props.getActiveLoans(this.state.user.token) }} style={{ textDecoration: "underline", cursor: "pointer" }}> Click here to try again</span></p> : "You currently have no active loans")}</p>
                        <button onClick={this.onShowModal} className="btn-alat">Apply for Loan</button>
                    </center>
                </div>
            </div>);

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
                                            name : loan.Name,
                                            outstanding : loan.RemainingAmount,
                                            charge: loan.ConvenienceFee,
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
                                                                <h5 style={{ color: "#4D4D4D", fontWeight: "bold" }}>₦{formatAmountNoDecimal(((loan.AmountOffered*0.2)/365).toFixed(2))}</h5>
                                                                <small style={{ fontSize: 10, color: "#717171", paddingTop: -30 }}>Daily Interest</small>
                                                            </div>
                                                            <div style={{ padding: "0", float: "right" }}>
                                                                <h5 style={{ color: "#4D4D4D", fontWeight: "bold" }}>₦{formatAmountNoDecimal(loan.AmountPayable-loan.RemainingAmount)}</h5>
                                                                <small style={{ fontSize: 10, color: "#717171", paddingTop: -30 }}>Amount Repaid</small>
                                                            </div>
                                                        </div>
                                                        <div className="clearfix"></div>



                                                    </div>
                                                    <button onClick={() => this.onLiquidateLoan(loanInfo)} style={{ width: "94%", marginLeft: 10, marginRight: 10 }} className="btn-alat text-center">Liquidate Loan</button>
                                                    
                                                </div>
                                            </div>)
                                    })
                                }
                            </div>
                        </div>
                    </Fragment>
                );
            }


        return (
            <Fragment>

                <Modal open={this.state.showModal} onClose={this.onCloseModal} center>
                    <div className="div-modal">
                        <h6><b>Disclaimer</b></h6>
                        <p>dddddddddd</p>
                        <div className="btn-opt">
                            <button onClick={this.onCloseModal} className="border-btn">Back</button>
                            <button onClick={() => this.onDeleteBeneficiary(this.state.selectedBeneficiary)} className="btn-alat">Proceed</button>
                        </div>
                    </div>
                </Modal>
                {index}

            </Fragment>
        )
    }
}



const mapStateToProps = state => {
    return {
        fetching: state.alat_loan_reducer.isFetching,
        fetchingLoans: state.alat_loan_reducer.isFetchingLoan,
        alert: state.alert,
        activeLoans: state.alat_loan_reducer.activeLoans,
        pageState: state.alat_loan_reducer.pageState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getActiveLoans: (token, data) => dispatch(actions.GetActiveLoans(token, data)),
        setLoanInfo : (info) => dispatch(actions.setLoanToLiquidate(info)),
        clearError: () => dispatch(alertActions.clear()),
        // setDataToBuyDetails: (dataToBuy, network, fromBeneficiary) => dispatch(actions.setDataTransactionDetails(dataToBuy, network, fromBeneficiary)),
        // clearDataInfo: () => dispatch(actions.clearDataInfoNoPost()),
        // resetPinState: () => dispatch(actions.pinVerificationTryAgain()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);


