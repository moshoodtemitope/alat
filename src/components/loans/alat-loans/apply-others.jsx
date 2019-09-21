import React, { Component, Fragment } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Input } from '../../airtime-bills/data/input';
import Select from 'react-select';
import { alertActions } from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';

import * as dataActions from '../../../redux/actions/dataActions/export';
import * as loanAction from '../../../redux/actions/alat-loan/export';
import * as actions from '../../../redux/actions/alat-loan/export';
import AlatLoansContainer from '../alat-loan-container';
import Success from '../../account-settings/shared/success';
import AlatLoanContainer from '../alat-loan-container';

const pattern = /^\d+$/;
class Apply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOffer: null,
            validation: {
                accountError: {
                    hasError: false,
                    error: "No offers available",
                },
                pinError: {
                    hasError: false,
                    error: 'Pin must be 4 digits',
                },
                amountEmpty: false,
                higherPay: false
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
                        type: 'password',
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
    }


    sortOffersForSelect = () => {
        var arrayToDisplay = [];
        console.log(this.props.loanOffers);
        console.log("this.props.offer");

        // if (this.props.loanOffers.length >= 1) {
        //     this.props.loanOffers.map((data => arrayToDisplay.push({ value: data.AccountNumber, label: data.AccountDescription + " - ₦" + formatAmount(data.AvailableBalance) })));
        // } else {
        //     arrayToDisplay = [{ value: '', displayValue: 'No offers Available' }];
        // }
        // console.log(arrayToDisplay)

        // const updatedSelectOption = {
        //     ...this.state.applyForm
        // }
        // updatedSelectOption.activeOffer.elementConfig.options = arrayToDisplay;
        // updatedSelectOption.activeOffer.loaded = true;
        // this.setState({ applyForm: updatedSelectOption });
    }

    accountChangedHandler = (selectedOffer) => {
        var validation = { ...this.state.validation };
        validation.accountError.hasError = false;
        this.setState({ selectedOffer, validation });
        console.log(`Option selected:`, selectedOffer);
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
                console.log(updatedFormElement)
            }
        }
        if (inputIdentifier == "pin") {
            updatedFormElement.value = event.target.value;
            if (updatedFormElement.value.length >= 1) {
                if (!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 4) return;
            }
            validation.pinError.hasError = false;
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
            (this.state.applyForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedOffer) ||
            !this.pinInputValidation(this.state.applyForm.pin.value) ||
            this.state.applyForm.amount.value == '' ||
            this.state.applyForm.amount.value > this.props.loanInfo + 1
        ) {
            if (this.state.applyForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedOffer) validation.accountError.hasError = true;
            if (!this.pinInputValidation(this.state.applyForm.pin.value)) validation.pinError.hasError = true;
            if (this.state.applyForm.amount.value == '') validation.amountEmpty = true;
            if (this.state.applyForm.amount.value > this.props.loanInfo.outstanding + 1) validation.higherPay = true
            this.setState({ validation });
        } else {

            const payload = {
                AlatPin: this.state.applyForm.pin.value,
                DebitAccount: (this.state.selectedOffer ? this.state.selectedOffer.value : this.state.applyForm.activeAccount.elementConfig.options[0].value),
                LoanId: this.props.loanInfo.loanId,
                Amount: parseFloat(this.state.applyForm.amount.value),
                ProviderCode: this.props.loanInfo.providerCode
            }
            console.log("all good", payload);

            this.props.onRepayLoan(this.state.user.token, payload);
        }
    }




    render() {
        let liquidateLoan = <Redirect to='/loans/alat-loans' />
        if (this.props.loanInfo && !this.props.isSuccess) {
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
            const { selectedOffer } = this.state;

            liquidateLoan = (
                <Fragment>
                    <AlatLoanContainer>
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
                                                    {/* <div class="al-card no-pad">
                                                        <div class="trans-summary-card">
                                                            <div class="name-amount clearfix">
                                                                <p className="pl-name-email">{this.props.loanInfo.name} <span>Loan Name</span></p>
                                                                <p className="pl-amount" style={{ textAlign: "right" }}>{"₦" + formatAmount(this.props.loanInfo.outstanding)} <span style={{ display: "block", marginTop: 5 }}>Outstanding Balance</span></p>
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
                                                                            this.state.validation.higherPay ? <p className="text-danger">Amount should not exceed your outstanding</p> : null
                                                                        : null}
                                                                </div>
                                                            )
                                                        } else if (formElement.config.elementType !== "input") {
                                                            return (
                                                                <div className="input-ctn" key={formElement.id}>
                                                                    <label>Select an account to debit</label>
                                                                    <Select key={formElement.id}
                                                                        value={selectedOffer == null ? formElement.config.elementConfig.options : selectedOffer}
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
                                                            </div>
                                                      )

                                                    })} */}

                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            {this.props.loanInfo.charge > 0 ? <p className="info-text m-b-20" style={{ color: "#5C3158" }}>You will be charged a fee of ₦{this.props.loanInfo.charge} for this transaction</p> : null}
                                                            <center>
                                                                <button disabled={this.props.fetching} onClick={this.onSubmitForm} className="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Confirm"}</button>
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
        if (this.props.pageState == 0 && this.props.isSuccess) {
            this.props.resetPageState(2);
            liquidateLoan = <Success
                message={"You just liquidated your loan with a sum of ₦" + this.state.applyForm.amount.valueToDisplay}
                homeUrl="/loans/alat-loans"
                isActionButton={true}
                clicked={this.goHome}
            />
        }

        return liquidateLoan;
    }
}

const mapStateToProps = state => {
    return {
        loanOffers: state.alat_loan_reducer.loanOffers,
        loanInfo: state.alat_loan_reducer.loanInfo,
        pageState: state.alat_loan_reducer.pageState,
        alert: state.alert,
        isSuccess: state.alat_loan_reducer.isSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLoanOffers: (token) => dispatch(actions.getLoanOffers(token)),
        // clearError: () => dispatch(alertActions.clear()),
        // onRepayLoan: (token, data) => dispatch(actions.liquidateLoan(token, data)),
        // resetPageState: (code) => dispatch(actions.resetBillPage(code)),
        // clearLoanInfo: () => dispatch(actions.clearLoanInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apply);
