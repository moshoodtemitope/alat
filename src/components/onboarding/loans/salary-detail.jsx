import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import OtpValidation from '../../../shared/components/otpvalidation';
import Select from 'react-select';
import {
    FETCH_BANK_PENDING,
    FETCH_BANK_SUCCESS,
    FETCH_BANK_FAILURE,
} from "../../../redux/constants/transfer.constants";
//import { getBanks } from "../../../redux/actions/transfer/cash-transfer.actions";
const options = [
];
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
            selectedBank: null,
            isSubmitted: false,

            employerNameInvalid: false,
            accountNumberInvalid: false,
            selectedBankInvalid: false
        }
    }
    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.loan_step3)
            if (this.props.loan_step3.loan_step3_status == loanOnboardingConstants.LOAN_STEP3_SUCCESS) {
                this.fetchBanks();
            } else this.props.history.push("/loan/bvn-info");
        else { this.props.history.push("/loan/bvn-info") }
    }

    validateFields = () => {
        var acctNumberInvalid = false;
        var employerNameInvalid = false;
        var selectedBankInvalid = false;
        if (this.state.accountNumber.length != 10) {
            this.setState({ accountNumberInvalid: true })
            acctNumberInvalid = true;
        }

        if (this.state.accountNumber.length == 10) {
            this.setState({ accountNumberInvalid: false })
            acctNumberInvalid = false;
        }

        if (this.state.employerName.length == 0 || this.state.employerName == "") {
            this.setState({ employerNameInvalid: true })
            employerNameInvalid = true;
        }

        if (this.state.employerName.length > 0) {
            this.setState({ employerNameInvalid: false })
            employerNameInvalid = false;
        }

        if (this.state.bankCode == "") {
            this.setState({ selectedBankInvalid: true });
            selectedBankInvalid = true;
        }
        if (this.state.bankCode != "") {
            this.setState({ selectedBankInvalid: false });
            selectedBankInvalid = false;
        }

        if (acctNumberInvalid || employerNameInvalid || selectedBankInvalid)
            return true;
        else return false;
    }

    fetchBanks = () => {
        this.props.dispatch(actions.getBanks(this.props.loan_step3.loan_step3_data.data.response.token));
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
                let banksList = props.bankList.banks_data.response.Response;
                //var options = [];
                for (var bank in banksList) {
                    options.push({ value: banksList[bank].Id, label: banksList[bank].Name });
                }
                const { selectedBank, selectedBankInvalid } = this.state;
                return (
                    <Fragment>
                        <Select
                            options={options}
                            // isDisabled={this.state.submitButtonState}
                            isDisabled={false}
                            //onInputChange={this.handleChange}
                            onChange={this.handleChange}
                        />
                        {selectedBankInvalid &&
                            <div className="text-danger">Select a Bank</div>
                        }
                    </Fragment>
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

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSubmitted: true });
        if (this.validateFields()) {

        } else {
            let url = `accountNumber=${this.state.accountNumber}&bankId=${this.state.bankCode}&employersName=${this.state.employerName}`;
            this.props.dispatch(actions.requestStatement(this.props.loan_step3.loan_step3_data.data.response.token, url));
        }
    }

    handleChange = (selectedBank) => {
        this.setState({ selectedBank, bankCode: selectedBank.value });
    }


    handleInputChange = (e) => {
        if (e.target.name == "employerName") {
            this.setState({ employerName: e.target.value }, () => {
                if (this.state.isSubmitted)
                    this.validateFields();
            });
        }
        else if (e.target.name == "accountNumber") {
            if (/^\d+$/.test(e.target.value)) {
                this.setState({ accountNumber: e.target.value }, () => {
                    if (this.state.isSubmitted)
                        this.validateFields();
                });
            }
            else if (e.target.value == "") {
                this.setState({ accountNumber: "" }, () => {
                    if (this.state.isSubmitted)
                        this.validateFields();
                })
            }
        }
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
        const { employerName, accountNumber, employerNameInvalid, accountNumberInvalid,
            selectedBankInvalid } = this.state;
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
                                <form onSubmit={this.onSubmit}>
                                    <div className={employerNameInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>Employer Name</label>
                                        <input type="text" name="employerName"
                                            value={employerName} onChange={this.handleInputChange} />
                                        {employerNameInvalid &&
                                            <div className="text-danger">A valid employer name is required</div>
                                        }
                                    </div>

                                    <div className={accountNumberInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>Account Number</label>
                                        <input type="text" name="accountNumber" maxLength={10} value={accountNumber}
                                            onChange={this.handleInputChange} />
                                        {accountNumberInvalid &&
                                            <div className="text-danger">A valid employer name is required</div>
                                        }
                                    </div>

                                    <div className={selectedBankInvalid ? "input-ctn form-error" : "input-ctn"}>
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






