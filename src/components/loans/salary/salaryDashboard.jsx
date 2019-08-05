import React, { Fragment } from 'react';

class LoansDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <div className="loan-dsh-ctn">
                        <div className="sub-ctn dsh-left">
                            <h4 className="red-text m-b-20">Current Loan</h4>
                            <div className="shd-box seg">
                                <div className="header">
                                    <h3 className="red-text">N4,000,000.00
												<span className="text-grey-span">Balance</span>
                                    </h3>
                                </div>
                                <div style="border: 0.8px solid #F1F1F1; margin-bottom: 10px;"></div>
                                <div className="shd-amt">
                                    <div>
                                        <img src="./img/loan_icon.svg" />
                                        <p>N2,000,000
													<span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/loan_calendar.svg" />
                                        <p>12 Months
													<span>Loan Term</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="shd-amt">
                                    <div>
                                        <img src="./img/loan_icon.svg" />
                                        <p>N2,500,000
													<span>Total Repayment</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/loan_calendar.svg" />
                                        <p>12/09/2009
													<span>Full Repayment Due</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="shd-amt">
                                    <div>
                                        <img src="./img/loan_icon.svg" />
                                        <p>N45,000
													<span>Next Repayment Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/loan_calendar.svg" />
                                        <p>12/09/2015
													<span>Next Repayment Date</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <input type="button" value="Liquidate Current Loan" className="btn-alat btn-block" />
                            <input type="button" value="Apply For Loan"
                                className="btn-alat btn-block btn-alat-outline" />
                        </div>
                        <div className="sub-ctn dsh-right">
                            <h4 className="red-text m-b-20">Past Loan</h4>
                            <div className="shd-box m-b-10">
                                <div className="shd-amt">
                                    <div>
                                        <img src="./img/loan_icon.svg" />
                                        <p>N2,000,000
													<span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/loan_calendar.svg" />
                                        <p>12 Months
													<span>Loan Term</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/loan_icon.svg" />
                                        <p>N2,000,000
													<span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/calendar_full.svg" />
                                        <p>N2,000,000
													<span>Loan Amount</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="shd-box m-b-10">
                                <div className="shd-amt">
                                    <div>
                                        <img src="./img/loan_icon.svg" />
                                        <p>N2,000,000
														<span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/loan_calendar.svg" />
                                        <p>12 Months
														<span>Loan Term</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/loan_icon.svg" />
                                        <p>N2,000,000
														<span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/calendar_full.svg" />
                                        <p>N2,000,000
														<span>Loan Amount</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="shd-box m-b-10">
                                <div className="shd-amt">
                                    <div>
                                        <img src="./img/loan_icon.svg" />
                                        <p>N2,000,000
															<span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/loan_calendar.svg" />
                                        <p>12 Months
															<span>Loan Term</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/loan_icon.svg" />
                                        <p>N2,000,000
															<span>Loan Amount</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/calendar_full.svg" />
                                        <p>N2,000,000
															<span>Loan Amount</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <center>
                            <button type="submit" onClick={() => { this.props.history.push("/loans/salary/calc") }} className="btn-alat m-t-10 m-b-20 text-center">
                                New Loan
                                </button>
                        </center> */}
                </div>
            </div>
        </Fragment>);
    }

}

export default LoansDashboard;