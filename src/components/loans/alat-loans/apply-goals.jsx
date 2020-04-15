import React, { Component, Fragment } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Input } from '../../airtime-bills/data/input';
import Select from 'react-select';
import { alertActions } from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';

import * as dataActions from '../../../redux/actions/dataActions/export';
import * as actions from '../../../redux/actions/alat-loan/export';
import AlatLoansContainer from '../alat-loan-container';
import Checkbox from '../../../shared/elements/_checkbox';

const pattern = /^\d+$/;
const noSpecialChar = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

class ApplyGoals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            selectedAccounts: null,
            validation: {
                accountError: {
                    hasError: false,
                    error: "No debitable account found",
                },
                pinError: {
                    hasError: false,
                    error: 'Pin must be 4 digits',
                },
                amountEmpty: false,
                higherPay: false,
                unchecked: false
            },
            applyForm: {
                loanName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    label: 'Give this Loan a name. (Optional)',
                },
                amount: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    valueToDisplay: '',
                    label: 'Enter Loan Amount',
                },
                activeAccount: {
                    elementType: 'select',
                    elementConfig: {
                        options: [],
                    },
                    label: 'Select account to credit',
                    value: '',
                    validation: {},
                    loaded: false,
                    valid: true
                },
                pin: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: ''
                    },
                    value: '',
                    label: 'Enter ALAT PIN',
                    touched: false
                },
            },
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        // console.log("liquidate loan reached")
        this.props.fetchDebitableAccounts(this.state.user.token);
    }

    handleClick = () => {
        this.setState({ isChecked: !this.state.isChecked });
    }

    sortAccountsForSelect = () => {
        var arrayToDisplay = [];
        // console.log(this.props.accounts);
        // console.log("this.props.accounts");

        if (this.props.accounts.length >= 1) {
            this.props.accounts.map((data => arrayToDisplay.push({ value: data.AccountNumber, label: data.AccountDescription + " - ₦" + formatAmount(data.AvailableBalance) })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
        }
        // console.log(arrayToDisplay)

        const updatedSelectOption = {
            ...this.state.applyForm
        }
        updatedSelectOption.activeAccount.elementConfig.options = arrayToDisplay;
        updatedSelectOption.activeAccount.loaded = true;
        this.setState({ applyForm: updatedSelectOption });
    }

    accountChangedHandler = (selectedAccount) => {
        var validation = { ...this.state.validation };
        validation.accountError.hasError = false;
        this.setState({ selectedAccount, validation });
        // console.log(`Option selected:`, selectedAccount);
    }


    inputChangedHandler = (event, inputIdentifier) => {
        if (this.props.alert.message) this.props.clearError();
        let validation = { ...this.state.validation };

        const updatedApplyForm = {
            ...this.state.applyForm
        }
        const updatedFormElement = {
            ...updatedApplyForm[inputIdentifier]
        };

        if (inputIdentifier == "amount") {
            updatedFormElement.valueToDisplay = event.target.value;
            updatedFormElement.value = updatedFormElement.valueToDisplay.replace(/\,/g, '');
            if (updatedFormElement.value.length >= 1) {
                if (updatedFormElement.value.length > 20) return;
                if (validation.amountEmpty == true) validation.amountEmpty = false;
                if (validation.higherPay == true) validation.higherPay = false;
                // if (updatedFormElement.value.length >= 1) {
                if (!pattern.test(updatedFormElement.value)) {
                    return;
                }
                updatedFormElement.valueToDisplay = formatAmountNoDecimal(parseInt(updatedFormElement.value));
                // }
                // console.log(updatedFormElement)
            }
        }
        if (inputIdentifier == "pin") {
            updatedFormElement.value = event.target.value;
            if (updatedFormElement.value.length >= 1) {
                if (!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 4) return;
            }
            validation.pinError.hasError = false;
        }
        if (inputIdentifier == "loanName") {
            updatedFormElement.value = event.target.value;
            if (updatedFormElement.value.length >= 1) {
                if (!noSpecialChar.test(updatedFormElement.value) || updatedFormElement.value.length > 30) return;
            }
        }

        updatedApplyForm[inputIdentifier] = updatedFormElement;
        this.setState({ applyForm: updatedApplyForm, validation });
    }

    pinInputValidation = (value) => {

        return (value.length == 4 && pattern.test(value));
    }

    goBack = (event) => {
        event.preventDefault();
        this.props.history.goBack();
    }

    goHome = (event) => {
        if (event) event.preventDefault();
        this.props.clearLoanInfo();
    }

    onSubmitForm = (event) => {
        var validation = { ...this.state.validation };
        event.preventDefault();
        if (this.props.alert.message) this.props.clearError();
        if (
            (this.state.applyForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedAccounts) ||
            !this.pinInputValidation(this.state.applyForm.pin.value) ||
            this.state.applyForm.amount.value == '' ||
            this.state.applyForm.amount.value > this.props.loanStatusData.MaximumAmount ||
            !this.state.isChecked
        ) {
            if (this.state.applyForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedAccounts) validation.accountError.hasError = true;
            if (!this.pinInputValidation(this.state.applyForm.pin.value)) validation.pinError.hasError = true;
            if (this.state.applyForm.amount.value == '') validation.amountEmpty = true;
            if (this.state.applyForm.amount.value > this.props.loanStatusData.MaximumAmount) validation.higherPay = true
            if (!this.state.isChecked) validation.unchecked = true;
            this.setState({ validation });
        } else {

            const payload = {
                Name: this.state.applyForm.loanName.value,
                AlatPin: this.state.applyForm.pin.value,
                CreditAccount: (this.state.selectedAccounts ? this.state.selectedAccounts.value : this.state.applyForm.activeAccount.elementConfig.options[0].value),
                Amount: this.state.applyForm.amount.value,
            }
            // console.log("all good", payload);
            this.props.sendLoanDetail(this.state.user.token, payload);
        }
    }


    render() {
        let liquidateLoan = <Redirect to='/loans/alat-loans' />
        if (this.props.loanStatusData) {
            const formElementArray = [];
            for (let key in this.state.applyForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.applyForm[key]
                });
            }
            if (this.props.accounts.length >= 1 && !this.state.applyForm.activeAccount.loaded) {
                this.sortAccountsForSelect();
            }
            const { selectedAccount } = this.state;

            liquidateLoan = (
                <Fragment>

                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Apply for Loan</h4>
                                        <div className="transfer-ctn">

                                            <form>
                                                {(this.props.alert.message) ?
                                                    <div className="info-label error">{this.props.alert.message} {this.props.alert.message.indexOf("rror") != -1 ? <span onClick={() => { this.props.fetchDebitableAccounts(this.state.user.token) }} style={{ textDecoration: "underline", cursor: "pointer" }}>Click here to try again</span> : null}</div> : null
                                                }
                                                <div class="al-card no-pad">
                                                    <div class="trans-summary-card">
                                                        <div class="name-amount clearfix">
                                                            <p className="pl-name-email">{this.props.loanStatusData.InterestRate}% p.a. <span>Interest Rate</span></p>
                                                            <p className="pl-amount" style={{ textAlign: "right" }}>{"₦" + (formatAmount(this.state.applyForm.amount.value == "" ? 0 : ((this.state.applyForm.amount.value * (this.props.loanStatusData.InterestRate / 100)) / 365).toFixed(2)))} <span style={{ display: "block", marginTop: 5 }}>Daily Interest</span></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {formElementArray.map((formElement) => {
                                                    if (formElement.id == "amount") {
                                                        return (
                                                            <div className="input-ctn" key={formElement.id}>
                                                                <label>{formElement.config.label}</label>
                                                                <Input
                                                                    elementType={formElement.config.elementType}
                                                                    elementConfig={formElement.config.elementConfig}
                                                                    value={formElement.config.valueToDisplay}
                                                                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                                    wrongInput={!formElement.config.valid} />
                                                                {formElement.id == "amount" ?
                                                                    this.state.validation.amountEmpty ? <p className="text-danger">Amount is Required</p> :
                                                                        this.state.validation.higherPay ? <p className="text-danger">You can't take above ₦{formatAmountNoDecimal(this.props.loanStatusData.MaximumAmount)}</p> : null
                                                                    : null}
                                                            </div>
                                                        )
                                                    } else if (formElement.config.elementType !== "input") {
                                                        return (
                                                            <div className="input-ctn" key={formElement.id}>
                                                                <label>Select an account to credit</label>
                                                                <Select key={formElement.id}
                                                                    value={selectedAccount == null ? formElement.config.elementConfig.options : selectedAccount}
                                                                    onChange={this.accountChangedHandler}
                                                                    options={formElement.config.elementConfig.options}
                                                                    placeholder={this.props.alert.message ? "Failed. Please try again" : (this.props.accounts.length > 0 ? "Select..." : "Loading Account...")}
                                                                />
                                                                {this.state.validation.accountError.hasError ? <p className="text-danger">{this.state.validation.accountError.error}</p> : null}
                                                            </div>
                                                        )
                                                    };
                                                    return (
                                                        <div className="input-ctn" key={formElement.id}>
                                                            <label>{formElement.config.label}</label>
                                                            <Input
                                                                elementType={formElement.config.elementType}
                                                                elementConfig={formElement.config.elementConfig}
                                                                value={formElement.config.value}
                                                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                                wrongInput={!formElement.config.valid} />
                                                            {formElement.id == "pin" && (this.state.validation.pinError.hasError) ? <p className="text-danger">{this.state.validation.pinError.error}</p> : null}
                                                            {formElement.id == "loanName" ? <p className="info-text m-b-20">You are qualified for a loan to the tune of <strong>₦{formatAmountNoDecimal(this.props.loanStatusData.MaximumAmount)}</strong> for this transaction</p> : null}
                                                        </div>
                                                    )

                                                })}

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <Checkbox
                                                            id="checkbox3"
                                                            value="random3"
                                                            name="example"
                                                            label={
                                                                <span>I accept terms and conditions. <a rel="noopener noreferrer" href="https://www.alat.ng/loan-terms" target="_blank"> Click here to read</a></span>
                                                            }
                                                            isChecked={this.state.isChecked}
                                                            changed={this.handleClick} />
                                                        {!this.state.isChecked && this.state.validation.unchecked ? <span className="text-center text-danger">Kindly accept terms and conditions to continue</span> : null}
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button disabled={this.props.fetching} onClick={this.onSubmitForm} className="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Submit"}</button>
                                                        </center>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <center>
                                        <button onClick={this.goBack} className="add-bene m-t-50 goback">Go Back</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>

            )
        }
        if (this.props.pageState == 0) {
            this.props.resetPageState(2);
            liquidateLoan = <Redirect to='/loans/alat-loans/goals-otp'/>
        }

        return (
            <AlatLoansContainer>
                {liquidateLoan}
            </AlatLoansContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.data_reducer.debitableAccounts,
        loanStatusData: state.alat_loan_reducer.loanStatusData,
        fetching: state.alat_loan_reducer.isFetching,
        pageState: state.alat_loan_reducer.pageState,
        alert: state.alert,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token) => dispatch(dataActions.fetchDebitableAccounts(token)),
        clearError: () => dispatch(alertActions.clear()),
        sendLoanDetail: (token, data) => dispatch(actions.sendLoan(token, data)),
        resetPageState: (code) => dispatch(actions.resetPageState(code)),
        clearLoanInfo: () => dispatch(actions.clearLoanInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyGoals);
