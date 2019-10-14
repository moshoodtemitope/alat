import React, { Component, Fragment } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Input } from '../../airtime-bills/data/input';
import Select from 'react-select';
import { alertActions } from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';

import {encryptTransactionData, formatCardExpiryDate, checkValue} from '../../../shared/utils';
import * as dataActions from '../../../redux/actions/dataActions/export';
import * as actions from '../../../redux/actions/alat-loan/export';
import * as encryptActions from '../../../redux/actions/fund-account/fund-acount.action';
import Modal from 'react-responsive-modal';
import Success from '../../account-settings/shared/success';
import AlatLoanContainer from '../alat-loan-container';
import Checkbox from '../../../shared/elements/_checkbox';

const pattern = /^\d+$/;
class Apply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOffer: null,
            selectedAccount: null,
            isChecked: false,
            prevLength: 0,
            terms: "",
            showModal: false,
            validation: {
                accountError: {
                    hasError: false,
                    error: "No offers available",
                },
                pinError: {
                    hasError: false,
                    error: 'Pin must be 4 digits',
                },
                panError: false,
                cvvError: false,
                offerError: false,
                expiryDateError: false,
                termsError: false
            },
            applyForm: {
                activeOffer: {
                    elementType: 'select',
                    elementConfig: {
                        options: [],
                    },
                    label: 'Select Loan',
                    value: '',
                    validation: {},
                    loaded: false,
                    valid: true
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
                pan: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    label: 'Card Number(Nigerian banks only)',
                },
                expiryDate: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    valueToDisplay: '',
                    label: 'Expiry Date',
                },
                cvv: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    label: 'CVV',
                    touched: false
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
                },
            },
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        this.props.getLoanOffers(this.state.user.token);
        this.props.getEncryptionRule(this.state.user.token);
        this.props.fetchDebitableAccounts(this.state.user.token)
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


    sortOffersForSelect = () => {
        let arrayToDisplay = [];
        // console.log(this.props.loanOffers);
        // console.log("this.props.offer");

        if (this.props.loanOffers.length >= 1) {
            this.props.loanOffers.map((data => arrayToDisplay.push({
                value: data.AmountOffered,
                label: "₦" + formatAmount(data.AmountOffered) + " at " + formatAmount(data.Interest) + "% in " + data.Tenure + "days",
                providerCode: data.ProviderCode,
                offerId: data.OfferId,
                interest: data.Interest,
                amountOffered: data.AmountOffered,
                amountPayable: data.AmountPayable,
                term: data.Terms
            })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No offers Available' }];
        }
        // console.log(arrayToDisplay)

        const updatedSelectOption = {
            ...this.state.applyForm
        }
        updatedSelectOption.activeOffer.elementConfig.options = arrayToDisplay;
        updatedSelectOption.activeOffer.loaded = true;
        this.setState({ applyForm: updatedSelectOption });
    }

    offerChangedHandler = (selectedOffer) => {
        var validation = { ...this.state.validation };
        if (validation.offerError == true) validation.offerError = false;
        this.setState({ selectedOffer, validation, terms: selectedOffer.term });
        // console.log(`Option selected:`, selectedOffer);
    }

    handleClick = () => {
        let validation = { ...this.state.validation };
        if (validation.unchecked == true) validation.unchecked = false;
        this.setState({ isChecked: !this.state.isChecked });
    }

    onShowModal = () => {
        this.props.clearError();
        this.setState({ showModal: true });
    }

    onCloseModal = () => {
        this.setState({ showModal: false })
        this.props.clearError();
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

        if (inputIdentifier == "expiryDate") {
            updatedFormElement.value = event.target.value;
            // console.log(event.target.value)
            // console.log(updatedFormElement.value)
            if (updatedFormElement.value.length >= 1) {
                if (updatedFormElement.value.length > 5) return;

                if (!pattern.test(updatedFormElement.value.replace(/\//g, ''))) {
                    return;
                }
                if (updatedFormElement.value.length == 2 & this.state.prevLength == 1) {
                    updatedFormElement.value = updatedFormElement.value + "/";
                }
                if (event.target.value.length == 3) {
                    let date = updatedFormElement.value.replace(/\//g, '');
                    updatedFormElement.value = date;
                }
                if (validation.expiryDateError == true) validation.expiryDateError = updatedFormElement.value.length == 5 ? false : true;
            }
        }
        if (inputIdentifier == "pan") {
            updatedFormElement.value = event.target.value;
            if (updatedFormElement.value.length >= 1) {
                if (updatedFormElement.value.length > 20) return;

                // if (updatedFormElement.value.length >= 1) {
                if (!pattern.test(updatedFormElement.value)) {
                    return;
                }
                // }
            }
            if (validation.panError == true) validation.panError = updatedFormElement.value.length >= 16 ? false : true;
        }
        if (inputIdentifier == "pin" || inputIdentifier == "cvv") {
            updatedFormElement.value = event.target.value;
            if (updatedFormElement.value.length >= 1) {
                if (inputIdentifier == "pin" && (!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 4)) return;
                if (inputIdentifier == "cvv" && (!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 3)) return;
            }
            if (inputIdentifier == "pin" && validation.pinError.hasError == true) validation.pinError.hasError = updatedFormElement.value.length == 4 ? false : true;
            if (inputIdentifier == "cvv" && validation.cvvError == true) validation.cvvError = updatedFormElement.value.length == 3 ? false : true;
        }

        updatedApplyForm[inputIdentifier] = updatedFormElement;
        this.setState({ applyForm: updatedApplyForm, validation, prevLength: updatedFormElement.value.length });
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
        // if (this.props.alert.message) this.props.clearError();
        // if (
        //     (this.state.applyForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedOffer) ||
        //     !this.state.selectedOffer ||
        //     !this.pinInputValidation(this.state.applyForm.pin.value) ||
        //     this.state.applyForm.expiryDate.value.length < 5 ||
        //     this.state.applyForm.cvv.value.length < 3 ||
        //     this.state.applyForm.pan.value.length < 16 ||
        //     !this.state.isChecked
        // ) {
        //     if (this.state.applyForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedAccount) validation.accountError.hasError = true;
        //     if (!this.state.selectedOffer) validation.offerError = true;
        //     if (!this.state.isChecked) validation.termsError = true;
        //     if (!this.pinInputValidation(this.state.applyForm.pin.value)) validation.pinError.hasError = true;
        //     if (this.state.applyForm.expiryDate.value.length < 5 || this.state.applyForm.expiryDate.value.replace(/[^/]/g, '').length > 1) validation.expiryDateError = true;
        //     if (this.state.applyForm.cvv.value < 3) validation.cvvError = true;
        //     if (this.state.applyForm.pan.value.length < 16) validation.panError = true;

        //     this.setState({ validation });
        // } else {
            var eRule = this.props.encryption_rule.encryption_rule_data.response;
            var formatCardNumber = encryptTransactionData(this.state.applyForm.pan.value, eRule);
            var formatCvv = encryptTransactionData(this.state.applyForm.cvv.value, eRule);
            var formatPin = encryptTransactionData(this.state.applyForm.pin.value, eRule);
            var formatDate = encryptTransactionData(this.state.applyForm.expiryDate.value.replace(/\//g, ''), eRule)

            console.log("formartCardNumber", formatCardNumber)
            const payload = {
                ProviderCode: this.state.selectedOffer.providerCode,
                AccountNumber: (this.state.selectedAccount ? this.state.selectedAccount.value : this.state.applyForm.activeAccount.elementConfig.options[0].value),
                OfferId: this.state.selectedOffer.offerId,
                CardCvv: formatCvv,
                CardPin: formatPin,
                CardExpiryDate: formatDate,
                CardPan: formatCardNumber
            }
            console.log(this.state.applyForm.expiryDate.value.replace(/\//g, ''));
            console.log("all good", payload);
            this.props.acceptLoanOffer(this.state.user.token, payload);
        // }
    }




    render() {
        let form = <Redirect to='/loans/alat-loans' />
        if (this.props.loanStatusData) {
            const formElementArray = [];
            for (let key in this.state.applyForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.applyForm[key]
                });
            }
            if (this.props.loanOffers.length >= 1 && !this.state.applyForm.activeOffer.loaded) {
                this.sortOffersForSelect();
            }

            if (this.props.accounts.length >= 1 && !this.state.applyForm.activeAccount.loaded) {
                this.sortAccountsForSelect();
            }
            const { selectedOffer, selectedAccount } = this.state;
            let hasError1 = this.state.validation.panError;
            let hasError2 = this.state.validation.pinError.hasError || this.state.validation.expiryDateError || this.state.validation.cvvError;
            let hasError3 = this.state.validation.accountError.hasError || this.state.validation.offerError
            form = (
                <Fragment>
                    <AlatLoanContainer>
                        <Modal open={this.state.showModal} onClose={this.onCloseModal} center>
                            <div className="disclaimer text-center">
                                <h4 className="hd-underline" style={{ width: "100%", color: "#AB2656" }}>Terms and Conditions</h4>
                                {(this.props.alert.message) ?
                                    <div className="info-label error">{this.props.alert.message} </div> : null
                                }
                                <ul className="disclaimer-list">
                                    <p>{this.state.terms}</p>
                                </ul>
                                <div className="btn-">
                                    <button onClick={this.onCloseModal} style={{ width: "80%" }} className="btn-alat"><b>Okay, I Accept</b></button><br /><br />
                                </div>
                            </div>
                        </Modal>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="max-600">
                                        <div className="al-card no-pad">
                                            <h4 className="m-b-10 center-text hd-underline">Apply for Loan</h4>
                                            <div className="transfer-ctn">
                                                <form>
                                                    {(this.props.alert.message) ?
                                                        <div className="info-label error">{this.props.alert.message} {this.props.alert.message.indexOf("rror") != -1 ? <span onClick={() => { this.props.getLoanOffers(this.state.user.token) }} style={{ textDecoration: "underline", cursor: "pointer" }}>Click here to try again</span> : null}</div> : null
                                                    }
                                                    <div class="al-card no-pad">
                                                        <div class="trans-summary-card">
                                                            <div class="name-amount clearfix">
                                                                <p className="pl-name-email">{selectedOffer ? "₦" + formatAmount(selectedOffer.amountPayable) : "₦" + 0} <span>Loan Repayment</span></p>
                                                                <p className="pl-amount" style={{ textAlign: "right" }}>{selectedOffer ? selectedOffer.interest + "%" : 0 + "%"} <span style={{ display: "block", marginTop: 5 }}>Loan Interest</span></p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        {formElementArray.map((formElement) => {
                                                            if (formElement.id == "pan") {
                                                                return (
                                                                    <div className="input-ctn col-md-12" style={hasError1 ? { marginBottom: 0 } : null} key={formElement.id}>
                                                                        <label>{formElement.config.label}</label>
                                                                        <Input
                                                                            elementType={formElement.config.elementType}
                                                                            elementConfig={formElement.config.elementConfig}
                                                                            value={formElement.config.valueToDisplay}
                                                                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                                            wrongInput={!formElement.config.valid} />
                                                                        {formElement.id == "pan" &&
                                                                            this.state.validation.panError ? <p className="text-danger">Enter a valid card number</p> : null}
                                                                    </div>
                                                                )
                                                            } else if (formElement.config.elementType !== "input") {
                                                                return (
                                                                    <div className="input-ctn col-md-12" style={hasError3 && formElement.id != "activeAccount" ? { marginBottom: 0 } : null} key={formElement.id}>
                                                                        <label>{formElement.config.label}</label>
                                                                        <Select key={formElement.id}
                                                                            value={formElement.id == "activeOffer" ?
                                                                                (selectedOffer) :
                                                                                (selectedAccount == null ? formElement.config.elementConfig.options[0] : selectedAccount)}
                                                                            onChange={formElement.id == "activeOffer" ? this.offerChangedHandler : this.accountChangedHandler}
                                                                            options={formElement.config.elementConfig.options}
                                                                            placeholder={this.props.alert.message ? "Failed. Please try again" :
                                                                                formElement.id == "activeOffer" ?
                                                                                    (this.props.loanOffers.length > 0 ? "Select Loan Offer..." : "Loading Loan Offers...") :
                                                                                    (this.props.accounts.length > 0 ? "Select Account..." : "Loading Account...")}
                                                                        />
                                                                        {formElement.id == "activeAccount" && this.state.validation.accountError.hasError ? <p className="text-danger">{this.state.validation.accountError.error}</p> : null}
                                                                        {formElement.id == "activeOffer" && this.state.validation.offerError ? <p className="text-danger">You need to select an offer</p> : null}
                                                                    </div>

                                                                )
                                                            };
                                                            return (
                                                                <div className={formElement.id == "expiryDate" || formElement.id == "cvv" ? "col-md-6 input-ctn" : "input-ctn col-md-12"} style={hasError2 ? { marginBottom: 0 } : null} key={formElement.id}>
                                                                    <label>{formElement.config.label}</label>
                                                                    <Input
                                                                        elementType={formElement.config.elementType}
                                                                        elementConfig={formElement.config.elementConfig}
                                                                        value={formElement.config.value}
                                                                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                                        wrongInput={!formElement.config.valid} />
                                                                    {formElement.id == "pin" && (this.state.validation.pinError.hasError) ? <p className="text-danger">{this.state.validation.pinError.error}</p> : null}
                                                                    {formElement.id == "expiryDate" && (this.state.validation.expiryDateError) ? <p className="text-danger">Invalid expiry date</p> : null}
                                                                    {formElement.id == "cvv" && (this.state.validation.cvvError) ? <p className="text-danger">Invalid cvv</p> : null}
                                                                </div>
                                                            )

                                                        })}
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <Checkbox
                                                                id="checkbox3"
                                                                value="random3"
                                                                name="example"
                                                                label={
                                                                    <span>I accept terms and conditions.
                                                                        {selectedOffer ? selectedOffer.term.includes("http://") || selectedOffer.term.includes("https://") ?
                                                                            <a rel="noopener noreferrer" href={selectedOffer.term} target="_blank"> Click here to read</a> :
                                                                            <a rel="noopener noreferrer" className="goback" style={{ color: "#AB2656" }} onClick={this.onShowModal} > Click here to read</a>
                                                                            : <small><i> Select a loan offer to read T&C</i></small>}
                                                                    </span>
                                                                }
                                                                isChecked={this.state.isChecked}
                                                                changed={this.handleClick} />
                                                            {!this.state.isChecked && this.state.validation.termsError ? <span className="text-center text-danger">Kindly accept terms and conditions to continue</span> : null}
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <center>
                                                                <button onClick={this.onSubmitForm} className="btn-alat m-t-10 m-b-20 text-center">Submit</button>
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
                    </AlatLoanContainer>
                </Fragment>

            )
        }
        if (this.props.pageState == 0) {
            // console.log("sucess already...in apply others")
            // this.props.resetPageState(2);
            let updatedApplyForm = {
                ...this.state.applyForm
            }
            updatedApplyForm.expiryDate.value = '';
            updatedApplyForm.pan.value = '';
            updatedApplyForm.pin.value = '';
            updatedApplyForm.cvv.value = '';
            this.setState({ applyForm: updatedApplyForm, selectedOffer: null });
            form = <Success
                message={"Your ₦" + formatAmount(parseInt(this.state.selectedOffer.amountOffered)) + " Loan is Aprroved"}
                homeUrl="/loans/alat-loans"
                isActionButton={false}
            />
        }

        return form;
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.data_reducer.debitableAccounts,
        loanOffers: state.alat_loan_reducer.loanOffers,
        loanStatusData: state.alat_loan_reducer.loanStatusData,
        pageState: state.alat_loan_reducer.pageState,
        alert: state.alert,
        isSuccess: state.alat_loan_reducer.isSuccess,
        encryption_rule: state.encrypt_rule,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLoanOffers: (token) => dispatch(actions.getLoanOffers(token)),
        fetchDebitableAccounts: (token) => dispatch(dataActions.fetchDebitableAccounts(token)),
        clearError: () => dispatch(alertActions.clear()),
        acceptLoanOffer: (token, data) => dispatch(actions.acceptInterswitchLoan(token, data)),
        resetPageState: (code) => dispatch(actions.resetPageState(code)),
        getEncryptionRule: (token) => dispatch(encryptActions.getEncryptionRule(token))
        // clearLoanInfo: () => dispatch(actions.clearLoanInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apply);
