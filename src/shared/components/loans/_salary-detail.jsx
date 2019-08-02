import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as onboardingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';

import * as loanActions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
//import LoanOnboardingContainer from './loanOnboarding-container';
//import OtpValidation from '../../../shared/components/otpvalidation';
import Select from 'react-select';
import {
    FETCH_BANK_PENDING,
    FETCH_BANK_SUCCESS,
    FETCH_BANK_FAILURE,
} from "../../../redux/constants/transfer.constants";
const industriesOptions = [
];
const _employerList = [];
const options = [];

class SalaryDetails extends React.Component {
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
            selectedIndustry: { label: "", value:""},
            EmployerList: [],
            selectedEmployer: {label: "", value:""},
            employerActionFired: false,

            employerNameInvalid: false,
            accountNumberInvalid: false,
            selectedBankInvalid: false,
            IndustryNameInvalid: false,
            employNameOthersInvalid: false
        }
    }
    componentDidMount = () => {
        this.init();
    }

    init = () => {
        this.getIndustries();
        this.fetchBanks();
        // if (this.props.loan_step3)
        //     if (this.props.loan_step3.loan_step3_status == loanOnboardingConstants.LOAN_STEP3_SUCCESS) {
        //         this.fetchBanks();
        //         // this.setState({ FirstName :this.props.user_detail.loan_userdetails_data.data.FirstName });   
        //     } else this.props.history.push("/loan/bvn-info");
        // else { this.props.history.push("/loan/bvn-info") }
    }

    getIndustries = () => {
        this.props.dispatch(loanActions.getIndustries(this.state.user.token));
    }

    getEmployers = (industryId) => {
        this.props.dispatch(loanActions.getEmployers(this.state.user.token, industryId));
    }

    handleIndustryChange = (Industry) => {
        this.setState({ selectedIndustry: Industry, employerActionFired: true },
            () => { this.getEmployers(Industry.value); })
        this.setState({ selectedEmployer: { value : "", label:""}, EmployerList: [] });
        if(Industry.label != "")
         this.setState({ IndustryNameInvalid : false })
    }

    handleEmployerChange = (Employer) => {
        this.setState({ selectedEmployer: Employer });
        if(Employer.value != ""){
            this.setState({ employerNameInvalid : false });
        }
    }

    validateFields = () => {
        var acctNumberInvalid = false;
        var employerNameInvalid = false;
        var selectedBankInvalid = false;
        var industryInvalid = false;
        var otherEmployerInvalid = false;
        if (this.state.accountNumber.length != 10) {
            this.setState({ accountNumberInvalid: true })
            acctNumberInvalid = true;
        }

        if (this.state.accountNumber.length == 10) {
            this.setState({ accountNumberInvalid: false })
            acctNumberInvalid = false;
        }

        //selected Industry validation
        if(this.state.selectedIndustry.label.length == 0 || this.state.selectedIndustry.label==""){
            this.setState({ IndustryNameInvalid : true});
            industryInvalid = true
        }

        if(this.state.selectedIndustry.label.length != 0){
            this.setState({ IndustryNameInvalid : false});
            industryInvalid = false
        }

        //selected Employer Validation
        if(this.state.selectedEmployer.label.length == 0 || this.state.selectedEmployer.label==""){
            this.setState({ employerNameInvalid: true })
            employerNameInvalid = true;
        }

        if(this.state.selectedEmployer.label.length != 0){
            this.setState({ employerNameInvalid: false })
            employerNameInvalid = false;
        }

        if (this.state.selectedEmployer.label == "Others" && this.state.employerName.length == 0 || this.state.employerName == "") {
            this.setState({ employNameOthersInvalid: true })
            otherEmployerInvalid = true;
        }
       
        if(this.state.selectedEmployer.label == "Others" && this.state.employerName.length > 0){
            this.setState({ employNameOthersInvalid: false })
            otherEmployerInvalid = false;
        }

        if (this.state.bankCode == "") {
            this.setState({ selectedBankInvalid: true });
            selectedBankInvalid = true;
        }
        if (this.state.bankCode != "") {
            this.setState({ selectedBankInvalid: false });
            selectedBankInvalid = false;
        }

        if (acctNumberInvalid || industryInvalid || otherEmployerInvalid || employerNameInvalid || selectedBankInvalid)
            return true;
        else return false;
    }

    fetchBanks = () => {
        this.props.dispatch(onboardingActions.getBanks(this.state.user.token));
    }

    renderBankDropdown = (props) => {
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

    renderIndustries = (props) => {
        let industStatus = this.props.industries.loan_industries_status
        switch (industStatus) {
            case loanConstants.LOAN_GETINDUSTRIES_SUCCESS:
                let industriesList = this.props.industries.loan_industries_data.response.Response;
                // var  = [];
                for (var industry in industriesList) {
                    // console.log(industry);
                    industriesOptions.push({ value: industriesList[industry].Id, label: industriesList[industry].Name });
                }
                return (<Select
                    options={industriesOptions}
                    onChange={this.handleIndustryChange}
                />);
            case loanConstants.LOAN_GETINDUSTRIES_PENDING:
                return (<select disabled>
                    <option>Fetching Industries...</option>
                </select>
                );
            case loanConstants.LOAN_GETINDUSTRIES_FAILURE:
                return (<Fragment>
                    <select className="error-field" disabled>
                        <option>Unable to load Industries</option>
                    </select>
                    <a className="cta-link to-right" onClick={this.getIndustries()}>Try again</a>
                </Fragment>)
        }
    }

    renderEmployer = (props) => {
        let employerStatus = this.props.employer.loan_employer_status;
        switch (employerStatus) {
            case loanConstants.LOAN_EMPLOYER_SUCCESS:
                let employerList = this.props.employer.loan_employer_data.response.Response;
                var _employerList = [];
                for (var employer in employerList) {
                    _employerList.push({ value: employerList[employer].Id, label: employerList[employer].Name });
                }
                _employerList.push({ value: employerList.length + 1, label: "Others" })
                if (this.state.employerActionFired) {
                    this.setState({ EmployerList: _employerList, employerActionFired: false })
                }
                return (
                    <Fragment>
                        <Select
                            options={_employerList}
                            onChange={this.handleEmployerChange}
                        />
                    </Fragment>)
            case loanConstants.LOAN_EMPLOYER_PENDING:
                return (<select disabled>
                    <option>Fetching employers...</option>
                </select>
                );
            case loanConstants.LOAN_EMPLOYER_FAILURE:
                return (<Fragment>
                    <select className="error-field" disabled>
                        <option>Unable to load Industries</option>
                    </select>
                    <a className="cta-link to-right" onClick={this.getEmployers(this.state.selectedIndustry.value)}>Try again</a>
                </Fragment>);
            default: return (<select className="" disabled>
                <option>select industry first</option>
            </select>)
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSubmitted: true });
        if (this.validateFields()) {
                console.log("Validate fields return true");
        } else {
          
          var data =  {
                AccountNumber: this.state.accountNumber,
                BankId: this.state.bankCode,
                EmployerName: this.state.selectedEmployer.label,
                EmployerIndustryId: this.state.selectedIndustry.value,
                EmployerId: this.state.selectedEmployer.value
              };
              if(data.EmployerName == "Others"){
                  data.EmployerName = this.state.employerName;
                  data.EmployerId = "999";
              }
            //let url = `accountNumber=${this.state.accountNumber}&bankId=${this.state.bankCode}&employersName=${this.state.employerName}`;
           // this.props.dispatch(onboardingActions.requestStatement(this.props.loan_step3.loan_step3_data.data.response.token, url));
           this.props.dispatch(onboardingActions.requestStatement(this.props.token, data));
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

    testSelectedEmployer = () => {
        if (this.state.selectedEmployer == null) {
            return false
        } else {  return true; }
    }

    render() {
        const { employerName, accountNumber, employerNameInvalid,IndustryNameInvalid, employNameOthersInvalid, accountNumberInvalid, selectedEmployer,
            selectedBankInvalid } = this.state;
        let props = this.props;
        return (
            <Fragment>
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
                                    <div className={IndustryNameInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>Industry</label>
                                        {this.renderIndustries()}
                                        {IndustryNameInvalid &&
                                            <div className="text-danger">You have to select an Industry</div>
                                        }
                                    </div>
                                    <div className={employerNameInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>Employer</label>
                                        {this.renderEmployer()}
                                        {employerNameInvalid &&
                                            <div className="text-danger">You have to select an Employer or select Others so you can type in your employers name</div>
                                        }
                                    </div>
                                    {this.testSelectedEmployer() &&
                                        selectedEmployer.label == "Others" &&
                                        <div className={employNameOthersInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Employer Name if Others</label>
                                            <input type="text" name="employerName"
                                                value={employerName} onChange={this.handleInputChange} />
                                            {employNameOthersInvalid &&
                                                <div className="text-danger">A valid employer name is required</div>
                                            }
                                        </div>
                                    }

                                    <div className={accountNumberInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>Account Number</label>
                                        <input type="text" name="accountNumber" maxLength={10} value={accountNumber}
                                            onChange={this.handleInputChange} />
                                        {accountNumberInvalid &&
                                            <div className="text-danger">A valid account number is needed</div>
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
                                                <button type="submit" disabled={!this.state.isAccepted || this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_PENDING} className="btn-alat m-t-10 m-b-20 text-center">
                                                    {this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_PENDING ?
                                                        "Proceesing..." : "Proceed"}
                                                </button>
                                            </center>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <center>
                            <Link to={'/loan/bvn-info'} className="add-bene m-t-50">Go Back</Link>
                        </center> */}
                    </div>
                </div>
            </Fragment>
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
        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
        //user_detail: state.loanOnboardingReducerPile.loanUserDetails,

        industries: state.loanReducerPile.loanIndustries,
        employer: state.loanReducerPile.loanEmployer
    };
}
export default connect(mapStateToProps)(SalaryDetails);






