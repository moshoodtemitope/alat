import React, { Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import Loans from './loans';
import LoansDashboard from './salary/salaryDashboard';
import LoanCalculator from './salary/calc';
import LoanSalaryDetail from './salary/a-salary-detail';
import LoanSalaryEntry from './salary/a-salary-entry';
import LoanSalaryTicket from './salary/a-ticket';
import LoanScoreCard from './salary/a-score-card';
import LoanCardResult from './salary/a-card-result';
import LoanEmployerDetail from './salary/a-work-details';
import LoanTerms from './salary/a-terms';
import WemaCollectionSetup from './salary/a-wema-setup';
import LoanRemitaOtpSetUp from './salary/a-remita-otp';
import LoanRemitaMandateSetUp from './salary/a-remita-mandate';
import LoansKYC from './salary/a-loans-kyc';
import LoanStatementUpload from './salary/a-statement-upload';
import LoanStatementUploadDone from './salary/a-statement-done';


import InnerContainer from '../../shared/templates/inner-container';

class LoansIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    {this.props.children}

                                    {/* <Modal open={openModal} onClose={this.onCloseModal} center>
                                        <div className="div-modal">
                                            <img src={phoneimage} />

                                            <h3>Your phone number is <br /><strong><span>{this.state.phoneInputted}</span></strong>.<br /> Do you want to proceed?</h3>

                                            <div className="btn-opt">
                                                <button onClick={this.onCloseModal} className="border-btn">Back</button>
                                                <button onClick={this.submitData} disabled={submitted}
                                                    className="btn-alat">{submitted ? "Processing..." : "Proceed"}</button>
                                            </div>
                                        </div>
                                    </Modal> */}
                                    <Route exact path={'/loans'} component={Loans} />
                                    <Route path={'/loans/salary/dashboard'} component={LoansDashboard} />
                                    <Route path={'/loans/salary/calc'} component={LoanCalculator} />
                                    <Route path={'/loans/salary/employer'} component={LoanEmployerDetail} />
                                    <Route path={'/loans/salary/detail'} component={LoanSalaryDetail} />
                                    <Route path={'/loans/salary/entry'} component={LoanSalaryEntry} />
                                    <Route path={'/loans/salary/ticket'} component={LoanSalaryTicket} />
                                    <Route path={'/loans/salary/score-card'} component={LoanScoreCard} />
                                    <Route path={'/loans/salary/card-result'} component={LoanCardResult} />
                                    <Route path={'/loans/salary/terms'} component={LoanTerms} />
                                    <Route path={'/loans/salary/wema-setup'} component={WemaCollectionSetup} />
                                    <Route path={'/loans/salary/remita-otp'} component={LoanRemitaOtpSetUp} />
                                    <Route path={'/loans/salary/remita-mandate'} component={LoanRemitaMandateSetUp} />
                                    <Route path={'/loans/salary/kyc'} component={LoansKYC} />
                                    <Route path={'/loans/salary/statement-upload'} component={LoanStatementUpload} />
                                    <Route path={'/loans/salary/upload-done'} component={LoanStatementUploadDone} />
                                </div>

                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default LoansIndex;