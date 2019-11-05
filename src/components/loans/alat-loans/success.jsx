import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';
import { Input } from '../../airtime-bills/data/input';
import * as dataActions from '../../../redux/actions/dataActions/export';

import { Switch } from '../../../shared/elements/_toggle';
import successLogo from '../../../assets/img/success.svg';
import { alertActions } from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import * as actions from '../../../redux/actions/alat-loan/export';

// import * as actions from '../../../redux/actions/dataActions/export';
const pattern = /^\d+$/;
class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: null,
            selectedFrequency: { value: "0", label: "Select Frequency" },
            startDate: null,
            endDate: null,
            validation: {
                accountError: false,
                pinError: false,
                AmountError: false,
                startDateError: false,
                endDateError: false,
                invalidInterval: false
            },
            setAutomationForm: {
                activeAccount: {
                    elementType: 'select',
                    elementConfig: {
                        options: [],
                    },
                    label: 'Select account to dedit',
                    value: '',
                    validation: {},
                    loaded: false,
                    valid: true
                },
                amount: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: '',
                    },
                    value: '',
                    valueToDisplay: '',
                    label: 'Amount'
                },
                frequency: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: "0", label: "Daily" },
                            { value: "1", label: "Weekly" },
                            { value: "2", label: "Monthly" }
                        ],
                    },
                    label: 'Frequency',
                    value: '',
                    validation: {},
                    valid: true
                },
                startDate: {
                    elementType: 'date',
                    elementConfig: {
                        label: "Start Date"
                    },
                },
                endDate: {
                    elementType: 'date',
                    elementConfig: {
                        label: "End Date"
                    },
                },
                pin: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: ''
                    },
                    value: '',
                    label: 'Card PIN',
                    touched: false
                }
            },
            setAutomation: false,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        this.props.fetchDebitableAccounts(this.state.user.token)
    }

    inputChangedHandler = (event, inputIdentifier) => {
        if (this.props.alert.message) this.props.clearError();
        let validation = { ...this.state.validation };

        const updatedSetAutomationForm = {
            ...this.state.setAutomationForm
        }
        const updatedFormElement = {
            ...updatedSetAutomationForm[inputIdentifier]
        };

        if (inputIdentifier == "amount") {
            updatedFormElement.valueToDisplay = event.target.value;
            updatedFormElement.value = updatedFormElement.valueToDisplay.replace(/\,/g, '');
            if (updatedFormElement.value.length >= 1) {
                if (updatedFormElement.value.length > 20) return;
                if (validation.AmountError == true) validation.AmountError = false;
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
            validation.pinError = false;
        }

        updatedSetAutomationForm[inputIdentifier] = updatedFormElement;
        this.setState({ setAutomationForm: updatedSetAutomationForm, validation });
    }

    sortAccountsForSelect = () => {
        let arrayToDisplay = [];
        // console.log(this.props.accounts);
        // console.log("this.props.accounts");

        if (this.props.accounts.length >= 1) {
            this.props.accounts.map((data => arrayToDisplay.push({ value: data.AccountNumber, label: data.AccountDescription + " - ₦" + formatAmount(data.AvailableBalance) })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
        }
        // console.log(arrayToDisplay)

        const updatedSelectOption = {
            ...this.state.setAutomationForm
        }
        updatedSelectOption.activeAccount.elementConfig.options = arrayToDisplay;
        updatedSelectOption.activeAccount.loaded = true;
        this.setState({ setAutomationForm: updatedSelectOption });
    }

    accountChangedHandler = (selectedAccount) => {
        var validation = { ...this.state.validation };
        if (validation.accountError) validation.accountError = false;
        this.setState({ selectedAccount, validation });
        // console.log(`Option selected:`, selectedAccount);
    }

    frequencyChangedHandler = (selectedFrequency) => {
        var validation = { ...this.state.validation };
        this.setState({ selectedFrequency, validation });
        // console.log(`Option selected:`, selectedAccount);
    }


    handleToggle = () => {
        this.setState({ setAutomation: !this.state.setAutomation });
    }

    pinInputValidation = (value) => {
        return (value.length == 4 && pattern.test(value));
    }

    handleStartDatePicker = (startDate) => {
        var validation = { ...this.state.validation };
        startDate.setHours(startDate.getHours() + 1);
        if (validation.startDateError) validation.startDateError = false;
        if (validation.invalidInterval) validation.invalidInterval = false;
        this.setState({ startDate, validation });
    }

    handleEndDatePicker = (endDate) => {
        var validation = { ...this.state.validation };
        endDate.setHours(endDate.getHours() + 1);
        if (validation.endDateError) validation.endDateError = false;
        if (validation.invalidInterval) validation.invalidInterval = false;
        this.setState({ endDate, validation });
    }

    onSubmitSaveForm = (event) => {
        var validation = { ...this.state.validation };
        event.preventDefault();
        if (this.props.alert.message) this.props.clearError();
        if (
            (this.state.setAutomationForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedAccount) ||
            !this.pinInputValidation(this.state.setAutomationForm.pin.value) ||
            !this.state.startDate || !this.state.endDate ||
            this.state.setAutomationForm.amount.value == '' ||
            this.state.setAutomationForm.amount.value.length < 3
        ) {
            if (this.state.setAutomationForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedAccount) validation.accountError = true;
            if (!this.pinInputValidation(this.state.setAutomationForm.pin.value)) validation.pinError = true;
            if (!this.state.startDate) validation.startDateError = true;
            if (!this.state.endDate) validation.endDateError = true;
            if (this.state.setAutomationForm.amount.value == '' || this.state.setAutomationForm.amount.value.length < 3) validation.AmountError = true;
            if (Date.parse(this.state.startDate) > Date.parse(this.state.endDate)) validation.invalidInterval = true;
            this.setState({ validation });
        } else {
            var payload = {
                AlatPin: this.state.setAutomationForm.pin.value,
                Amount: this.props.loanDetail.Amount,
                CreditAccount: this.props.loanDetail.Account,
                DebitAccount: (this.state.selectedAccount ? this.state.selectedAccount.value : this.state.setAutomationForm.activeAccount.elementConfig.options[0].value),
                StartDate: this.state.startDate,
                EndDate: this.state.endDate,
                Frequency: this.state.selectedFrequency.value,
                LoanId: this.props.loanDetail.loanId,
                Name: "",
            };
            this.props.automateRepayment(this.state.user.token, payload);
        }

    }

    goToDashboard = (event) => {
        event.preventDefault();
        // this.props.toDashboard();

    }

    render() {
        var success = <Redirect to='/loans/alat-loans' />
        const { selectedAccount, selectedFrequency, startDate, endDate, validation } = this.state;
        if (this.props.loanStatusData != null) {
            const formElementArray = [];
            for (let key in this.state.setAutomationForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.setAutomationForm[key]
                });
            }
            if (this.props.accounts.length >= 1 && !this.state.setAutomationForm.activeAccount.loaded) {
                this.sortAccountsForSelect();
            }
            success = (
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card">
                                    <center>
                                        <img src={successLogo} className="m-b-30 m-t-20" alt="Success" />
                                    </center>
                                    <h5 className="center-text red-text"> Your ₦{formatAmount(parseInt(this.props.loanDetail.Amount))} Loan is Aprroved</h5>
                                    {/* <h5 className="center-text red-text"> Your ₦3000 Loan is Aprroved</h5> */}
                                    <div className="m-t-20 width-400">

                                        {<div className="clearfix save-purchase">
                                            <p>Setup a repayment schedule for this loan</p>
                                            <div className="">
                                                <div className="clearfix">
                                                    <div className="pretty p-switch p-fill" >
                                                        <Switch isChecked={this.state.setAutomation} handleToggle={this.handleToggle} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {
                                            this.state.setAutomation ? (
                                                <div className="save-purchase-frm">
                                                    {(this.props.alert.message) ?
                                                        <div className="info-label error  m-t-10">{this.props.alert.message}</div> : null
                                                    }
                                                    <form>

                                                        {formElementArray.map((formElement) => {
                                                            if (formElement.config.elementType != "date" && formElement.config.elementType !== "input") {
                                                                return (
                                                                    <div className="input-ctn" /*style={hasError3 && formElement.id != "activeAccount" ? { marginBottom: 0 } : null}*/ key={formElement.id}>
                                                                        <label>{formElement.config.label}</label>
                                                                        <Select key={formElement.id}
                                                                            value={formElement.id == "frequency" ?
                                                                                (selectedFrequency) :
                                                                                (selectedAccount == null ? formElement.config.elementConfig.options[0] : selectedAccount)}
                                                                            onChange={formElement.id == "frequency" ? this.frequencyChangedHandler : this.accountChangedHandler}
                                                                            options={formElement.config.elementConfig.options}
                                                                            placeholder={formElement.id == "frequency" ? ("Frequency for Payment") :
                                                                                this.props.alert.message ? "Failed. Please try again" :
                                                                                    (this.props.accounts.length > 0 ? "Select Account..." : "Loading Account...")}
                                                                        />
                                                                        {formElement.id == "activeAccount" && validation.accountError ? <p className="text-danger">Debit account is required</p> : null}
                                                                    </div>
                                                                )
                                                            } else if (formElement.config.elementType == "date") {
                                                                return (
                                                                    <div className="input-ctn" key={formElement.id}>
                                                                        <label>{formElement.config.elementConfig.label}</label>
                                                                        <DatePicker placeholderText="" selected={formElement.id == "startDate" ? startDate : endDate}
                                                                            onChange={formElement.id == "startDate" ? this.handleStartDatePicker : this.handleEndDatePicker}
                                                                            //onChangeRaw={(e) => this.handleChange(e)}
                                                                            dateFormat="d MMMM, yyyy"
                                                                            peekNextMonth
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            dropdownMode="select"
                                                                            minDate={new Date()}
                                                                        />
                                                                        {formElement.id == "startDate" && validation.startDateError ? <p className="text-danger">Start Date is required</p> : null}
                                                                        {formElement.id == "endDate" && validation.endDateError ? <p className="text-danger">End Date is required</p> : null}
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div className="input-ctn" key={formElement.id}>
                                                                        <label>{formElement.config.label}</label>
                                                                        <Input
                                                                            elementType={formElement.config.elementType}
                                                                            elementConfig={formElement.config.elementConfig}
                                                                            value={formElement.id == "amount" ? formElement.config.valueToDisplay : formElement.config.value}
                                                                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                                                        {formElement.id == "amount" && validation.AmountError ? <p className="text-danger">Enter a valid amount. ₦100 minimum</p> : null}
                                                                        {formElement.id == "pin" && validation.pinError ? <p className="text-danger">Pin must be 4 digits</p> : null}
                                                                    </div>
                                                                )
                                                            }


                                                        })}
                                                        <center>
                                                            {validation.invalidInterval ? <p className="text-danger">Start date cannot be greater than end date</p> : null}
                                                            <button disabled={this.props.fetching} onClick={this.onSubmitSaveForm} class="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Submit"}</button>
                                                        </center>
                                                    </form>
                                                </div>
                                            ) : (
                                                    <div className="row">
                                                        <div className="col-sm-12">-
                                                            <center>
                                                                {/* <button onClick={this.goToDashboard} class="btn-alat m-t-10 m-b-20 text-center">Go to Loan Page</button> */}
                                                                <Link to={'/loans/alat-loans'} className="btn-alat m-t-10 m-b-20 text-center">Go to Loan Page</Link>
                                                            </center>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.props.pageState == 0) {
            this.props.resetPageState(2);
            success = <Redirect to="/loans/alat-loans" />
        }

        return success;
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.data_reducer.debitableAccounts,
        loanDetail: state.alat_loan_reducer.loanDetail,
        loanStatusData: state.alat_loan_reducer.loanStatusData,
        phoneNumber: state.authentication.user.phoneNo,
        pageState: state.alat_loan_reducer.pageState,
        alert: state.alert,
        fetching: state.alat_loan_reducer.isFetching,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        automateRepayment: (token, payload) => dispatch(actions.automateRepayment(token, payload)),
        fetchDebitableAccounts: (token) => dispatch(dataActions.fetchDebitableAccounts(token)),
        clearError: () => dispatch(alertActions.clear()),
        resetPageState: (code) => dispatch(actions.resetPageState(code)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
