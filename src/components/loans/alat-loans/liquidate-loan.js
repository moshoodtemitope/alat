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

const pattern = /^\d+$/;
class LiquidateLoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                higherPay: false
            },
            liquidateLoanForm: {
                amount: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    valueToDisplay: '',
                    label: 'Enter amount you want to pay',
                },
                activeAccount: {
                    elementType: 'select',
                    elementConfig: {
                        options: [],
                    },
                    label: 'Select an account to debit',
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
                    // validation: {
                    //     required: true,
                    //     minLength: 4,
                    //     maxLength: 4,
                    //     isNumeric: true,
                    // },
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
            ...this.state.liquidateLoanForm
        }
        updatedSelectOption.activeAccount.elementConfig.options = arrayToDisplay;
        updatedSelectOption.activeAccount.loaded = true;
        this.setState({ liquidateLoanForm: updatedSelectOption });
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
        
        const updatedLiquidateLoanForm = {
            ...this.state.liquidateLoanForm
        }
        const updatedFormElement = {
            ...updatedLiquidateLoanForm[inputIdentifier]
        };

        if (inputIdentifier == "amount") {
            updatedFormElement.valueToDisplay = event.target.value;
            updatedFormElement.value = updatedFormElement.valueToDisplay.replace(/\,/g, '');
            if (updatedFormElement.value.length >= 1) {
                if (updatedFormElement.value.length > 20) return;
                if (validation.amountEmpty == true) validation.amountEmpty = false;
                if (validation.higherPay == true)validation.higherPay = false;
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

        updatedLiquidateLoanForm[inputIdentifier] = updatedFormElement;
        this.setState({ liquidateLoanForm: updatedLiquidateLoanForm, validation });
    }

    pinInputValidation = (value) => {

        return (value.length == 4 && pattern.test(value));
    }

    goBack = (event) => {
        event.preventDefault();
        this.props.history.goBack();
    }

    goHome = (event) => {
        if(event) event.preventDefault();
        this.props.clearLoanInfo();
        this.props.history.push('/loans/alat-loans');
    }

    onSubmitForm = (event) => {
        var validation = { ...this.state.validation };
        event.preventDefault();
        if (this.props.alert.message) this.props.clearError();
        if (
                (this.state.liquidateLoanForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedAccounts) ||
                !this.pinInputValidation(this.state.liquidateLoanForm.pin.value) ||
                this.state.liquidateLoanForm.amount.value == '' ||
                this.state.liquidateLoanForm.amount.value > this.props.loanInfo + 1
            ) {
                if (this.state.liquidateLoanForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedAccounts) validation.accountError.hasError = true;
                if (!this.pinInputValidation(this.state.liquidateLoanForm.pin.value)) validation.pinError.hasError = true;
                if(this.state.liquidateLoanForm.amount.value == '') validation.amountEmpty = true;
                if(this.state.liquidateLoanForm.amount.value > this.props.loanInfo.outstanding + 1) validation.higherPay = true
                this.setState({ validation });
        } else {
            
            const payload = {
                AlatPin : this.state.liquidateLoanForm.pin.value,
                DebitAccount: (this.state.selectedAccounts ? this.state.selectedAccounts.value : this.state.liquidateLoanForm.activeAccount.elementConfig.options[0].value),
                LoanId: this.props.loanInfo.loanId,
                Amount: parseFloat(this.state.liquidateLoanForm.amount.value),
                ProviderCode: this.props.loanInfo.providerCode
            }
            // console.log("all good", payload);
            if(this.props.loanInfo.isGoalLoan){
                delete payload.ProviderCode;
                this.props.onRepayAlatLoan(this.state.user.token, payload)
            }else{
                this.props.onRepayLoan(this.state.user.token, payload);
            }
            
        }
    }




    render() {
        let liquidateLoan = <Redirect to='/loans/alat-loans' />
        if (this.props.loanInfo && !this.props.isSuccess) {
            const formElementArray = [];
            for (let key in this.state.liquidateLoanForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.liquidateLoanForm[key]
                });
            }
            if (this.props.accounts.length >= 1 && !this.state.liquidateLoanForm.activeAccount.loaded) {
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
                                        <h4 className="m-b-10 center-text hd-underline">Liquidate Loan</h4>
                                        <div className="transfer-ctn">
                                            <form>
                                            {(this.props.alert.message) ?
                                                    <div className="info-label error">{this.props.alert.message} {this.props.alert.message.indexOf("rror") != -1 ? <span onClick={() => { this.props.fetchDebitableAccounts(this.state.user.token) }} style={{ textDecoration: "underline", cursor: "pointer" }}>Click here to try again</span> : null}</div> : null
                                                }
                                                <div class="al-card no-pad">
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
                                                                    this.state.validation.higherPay ? <p className="text-danger">Amount should not exceed your outstanding</p>: null 
                                                                    : null}
                                                            </div>
                                                        )
                                                    } else if (formElement.config.elementType !== "input") {
                                                        return (
                                                            <div className="input-ctn" key={formElement.id}>
                                                                <label>Select an account to debit</label>
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
                                                        </div>
                                                    )

                                                })}

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
                </Fragment>

            )
        }
        if (this.props.pageState == 0) {
            // this.props.resetPageState(2);
            liquidateLoan = <Success
                message={"You just liquidated your loan with a sum of ₦" + this.state.liquidateLoanForm.amount.valueToDisplay}
                homeUrl="/loans/alat-loans"
                isActionButton={true}
                clicked={this.goHome}
            />
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
        loanInfo: state.alat_loan_reducer.loanInfo,
        pageState: state.alat_loan_reducer.pageState,
        alert: state.alert,
        isSuccess: state.alat_loan_reducer.isSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token) => dispatch(dataActions.fetchDebitableAccounts(token)),
        clearError: () => dispatch(alertActions.clear()),
        onRepayLoan: (token, data) => dispatch(actions.liquidateLoan(token, data)),
        onRepayAlatLoan: (token, data) => dispatch(actions.liquidateAlatLoan(token, data)),
        resetPageState: (code) => dispatch(actions.resetPageState(code)),
        clearLoanInfo: () => dispatch(actions.clearLoanInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiquidateLoan);
