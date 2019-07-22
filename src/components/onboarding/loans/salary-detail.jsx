import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import OtpValidation from '../../../shared/components/otpvalidation';
import {
    FETCH_BANK_PENDING,
    FETCH_BANK_SUCCESS,
    FETCH_BANK_FAILURE,
} from "../../../redux/constants/transfer.constants";
import { getBanks } from "../../../redux/actions/transfer/cash-transfer.actions";
//import OTPInput from '../../../shared/components/otpInput' //'./otpInput';

class LoanOnbaordingSalaryDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            employerName: "",
            accountNumber: "",
            isTermChecked: "",
            bankCode: "",
            isAccepted: false,
            selectedBank: null
        }
    }
    componentDidMount = () => {
        // this.init();
    }

    init = () => {
        if (this.props.loan_step3)
            if (this.props.loan_step3.loan_step3_status == loanOnboardingConstants.LOAN_STEP3_SUCCESS) {
                this.props.dispatch(getBanks(this.state.user.token));
            } else this.props.history.push("/loan/bvn-info");
        else { this.props.history.push("/loan/bvn-info") }
    }

    renderBankDropdown(props) {
        let banksStatus = props.bankList.banks; //FETCH_BANK_PENDING;

        switch (banksStatus) {
            case FETCH_BANK_PENDING:
                return (
                    <select disabled>
                        <option>Fetching Banks...</option>
                    </select>
                );
            case FETCH_BANK_SUCCESS:
                let banksList = props.bankList.banks_data.response;
                for (var bank in banksList) {
                    options.push({ value: banksList[bank].BankCode, label: banksList[bank].BankName });
                }
                const { selectedBank } = this.state;
                return (
                    <Select
                        options={options}
                        // isDisabled={this.state.submitButtonState}
                        isDisabled={props.account_details.fetchStatus}
                        // onInputChange={this.handleChange}
                        onChange={this.handleChange}
                    />

                );
            case FETCH_BANK_FAILURE:
                return (
                    <div>
                        <select className="error-field" disabled>
                            <option>Unable to load banks</option>
                        </select>
                        <a className="cta-link to-right" onClick={this.fetchBanks}>Try again</a>
                    </div>
                );
        }
    }

    onSubmit = () => {
        let url = `accountNumber=${this.state.accountNumber}&bankId=${this.state.bankCode}&employersName=${this.state.employerName}`;
        this.props.dispatch(actions.requestStatement(this.state.user.token, url));
    }

    handleChange(selectedBank) {
        this.setState({ selectedBank });
    }

    handleCheckBox = (e) => {
        this.setState({ isAccepted: e.target.checked });
    }

    gotoNextPage = () => {
        if (this.props.loan_reqStat)
            if (this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS) {
                var data = {
                    ...this.props.loan_reqStat.loan_reqStat_data.data
                };
                if (data.response.Response.NextScreen == 0)
                    this.props.history.push("/loan/ticket");
                if (data.response.Response.NextScreen == 2)
                    this.props.history.push("/loan/salary-entry");
            }
    }


    render() {
        const { employerName, accountNumber } = this.state;
        let props = this.props;
        return (
            <LoanOnboardingContainer>
                {this.gotoNextPage()}
                <div className="col-sm-12">
                    <div className="max-500">
                        <div className="loan-header-text text-center">
                            <h4 className="text-black">Input your salary account details</h4>
                            <p>Your loan will be disbursed into this account</p>
                        </div>
                        <div className="al-card no-pad">
                            <div className="transfer-ctn">
                                {this.props.alert && this.props.alert.message &&
                                    <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                }
                                <form>
                                    <div className="input-ctn">
                                        <label>Employer Name</label>
                                        <input type="text" value={employerName} onChange={this.handleChange} />
                                    </div>

                                    <div className="input-ctn">
                                        <label>Account Number</label>
                                        <input type="text" maxLength={10} value={accountNumber} onChange={this.handleChange} />
                                    </div>

                                    <div className="input-ctn">
                                        <label>Select Bank</label>
                                        {this.renderBankDropdown(props)}
                                        <div className="pw-hint pw-terms">
                                            <input type="checkbox" checked={this.state.isAccepted}
                                                onChange={this.handleCheckBox}
                                                style={{ opacity: "unset", position: "unset" }} />
                                            <div>
                                                I agree that the account information provided above should be used to request for my
                                                account statement
																	<p className="m-t-10"><b>Please note that a fee will be charged for this service</b></p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <center>
                                                <button type="submit" disabled={!this.state.isAccepted} className="btn-alat m-t-10 m-b-20 text-center">
                                                    {this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_PENDING ?
                                                        "Proceesing..." : "Proceed"}
                                                </button>
                                            </center>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <center>
                            <Link to={'/loan/bvn-info'} className="add-bene m-t-50">Go Back</Link>
                        </center>
                    </div>
                </div>
            </LoanOnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        //loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        loan_val_otp: state.loanOnboardingReducerPile.loanOnboardingValidateOTP,
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        loan_step3: state.loanOnboardingReducerPile.loanOnboardingStep3,
        bankList: state.transferReducerPile.transfer_bankList,
        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement
    };
}
export default connect(mapStateToProps)(LoanOnbaordingSalaryDetails);






