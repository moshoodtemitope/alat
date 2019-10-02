import React, { Component, Fragment } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Input } from '../../airtime-bills/data/input';
import Select from 'react-select';
import {alertActions} from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';

import * as dataActions from '../../../redux/actions/dataActions/export';
import * as actions from '../../../redux/actions/cardless-withdrawal/export';

const pattern = /^\d+$/;
class ConfirmWithdrawal extends Component {
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
                    error: 'Enter a valid PIN',
                }
            },
            confirmDataForm: {
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
                    validation: {
                        required: true,
                        minLength: 4,
                        maxLength: 4,
                        isNumeric: true,
                    },
                    label: 'Enter ALAT PIN',
                    touched: false
                },
            },
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        this.props.fetchDebitableAccounts(this.state.user.token);
    }


    sortAccountsForSelect = () => {
        var arrayToDisplay = [];
        // console.log(this.props.accounts);
        // console.log("this.props.accounts");

        if (this.props.accounts.length >= 1) {
            this.props.accounts.map((data => arrayToDisplay.push({ value: data.AccountNumber, label: data.AccountDescription + " - N" + formatAmount(data.AvailableBalance) })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
        }
        // console.log(arrayToDisplay)

        const updatedSelectOption = {
            ...this.state.confirmDataForm
        }
        updatedSelectOption.activeAccount.elementConfig.options = arrayToDisplay;
        updatedSelectOption.activeAccount.loaded = true;
        this.setState({ confirmDataForm: updatedSelectOption });
    }

    accountChangedHandler = (selectedAccount) => {
        var validation = { ...this.state.validation };
        validation.accountError.hasError = false;
        this.setState({ selectedAccount, validation });
        // console.log(`Option selected:`, selectedAccount);
    }


    inputChangedHandler = (event, inputIdentifier) => {
        let validation = { ...this.state.validation };
        validation.pinError.hasError = false;
        const updatedConfirmDataForm = {
            ...this.state.confirmDataForm
        }
        const updatedFormElement = {
            ...updatedConfirmDataForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        if(updatedFormElement.value.length >= 1){
            if(!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 4){
                return;
            }
        }
        updatedConfirmDataForm[inputIdentifier] = updatedFormElement;
        this.setState({ confirmDataForm: updatedConfirmDataForm, validation });
    }

    pinInputValidation = (value) => {
        
        return (value.length >= 4 && value.length <= 4 && pattern.test(value));
    }

    goBack =(event) => {
        event.preventDefault();
        this.props.history.goBack();
    }

    onSubmitForm = (event) => {
        var validation = { ...this.state.validation };
        event.preventDefault();
        this.props.clearError();
        if ((this.state.confirmDataForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedAccounts) || !this.pinInputValidation(this.state.confirmDataForm.pin.value)) {
            if (this.state.confirmDataForm.activeAccount.elementConfig.options[0].value == '' && !this.state.selectedAccounts) {
                validation.accountError.hasError = true;
                this.setState({ validation });
            }
            if (!this.pinInputValidation(this.state.confirmDataForm.pin.value)) {
                validation.pinError.hasError = true;
                this.setState({ validation });
            }
        } else {
            const payload = {
                PhoneNo: this.props.phoneNumber,
            }
            const updatedCwInfo = {
                ...this.props.cwInfo,
                TransactionPin: this.state.confirmDataForm.pin.value,
                AccountNumber: (this.state.selectedAccounts ? this.state.selectedAccounts.value : this.state.confirmDataForm.activeAccount.elementConfig.options[0].value),
            }
            this.props.setCardlessInfo(updatedCwInfo);
            // console.log(payload);
            this.props.fetchOtp(this.state.user.token, payload);
        }
    }

    


    render() {
        // console.log("render method")
        let confirmWithdrawal;
        if (this.props.cwInfo != null && this.props.pageState == 2) {
            const formElementArray = [];
            for (let key in this.state.confirmDataForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.confirmDataForm[key]
                });
            }
            if (this.props.accounts.length >= 1 && !this.state.confirmDataForm.activeAccount.loaded) {
                this.sortAccountsForSelect();
            }
            const { selectedAccount } = this.state;

            confirmWithdrawal = (
                <Fragment>
                    
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Confirm Withdrawal</h4>
                                        <div className="transfer-ctn">
                                            <form>
                                                <div class="al-card no-pad">
                                                    <div class="trans-summary-card">
                                                        <div class="name-amount clearfix">
                                                            <p class="pl-name-email">ATM<span>Cashout Channel</span></p>
                                                            <p class="pl-amount">₦{formatAmountNoDecimal(this.props.cwInfo.Amount)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {(this.props.alert.message) ?
                        <div className="info-label error">{this.props.alert.message} {this.props.alert.message.indexOf("rror") != -1 ? <span onClick={() => {this.props.fetchDebitableAccounts(this.state.user.token)}} style={{textDecoration:"underline", cursor:"pointer"}}>Click here to try again</span> : null}</div> : null
                        }
                                                {formElementArray.map((formElement) => {
                                                    if (formElement.config.elementType !== "input") {
                                                        return (
                                                            <div className="input-ctn" key={formElement.id}>
                                                                <label>Select an account to debit</label>
                                                                <Select key={formElement.id}
                                                                    value={selectedAccount == null ? formElement.config.elementConfig.options : selectedAccount}
                                                                    onChange={this.accountChangedHandler}
                                                                    options={formElement.config.elementConfig.options}
                                                                    placeholder={this.props.alert.message  ? "Failed. Please try again" : (this.props.accounts.length > 0 ? "Select..." : "Loading Account...")}
                                                                />
                                                                {this.state.validation.accountError.hasError ? <small className="text-danger">{this.state.validation.accountError.error}</small> : null}
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
                                                                wrongInput={!formElement.config.valid}
                                                                isTouched={formElement.config.touched}
                                                                errormsg={formElement.config.error}
                                                                isDisabled={formElement.config.isDisabled} />
                                                            {this.state.validation.pinError.hasError ? <small className="text-danger">{this.state.validation.pinError.error}</small> : null}
                                                        </div>
                                                    )

                                                })}

                                                <div className="row">
                                                    <div className="col-sm-12">
                                                    <p className="info-text m-b-20">You will be charged N105 on cash withdrawal</p>
                                                        <center>
                                                            <button disabled={this.props.fetching} onClick={this.onSubmitForm} class="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Confirm Withdrawal"}</button>
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

            );
            if(this.props.pageState == 0) {
                // console.log("otp sent redirecting")
                this.props.resetPageState();
                confirmWithdrawal = <Redirect to="/cardless-withdrawal/verify" />
            }
        }else if(this.props.pageState == 0) {
            // console.log("otp sent redirecting")
            this.props.resetPageState();
            confirmWithdrawal = <Redirect to="/cardless-withdrawal/verify" />
        }else{
            confirmWithdrawal = <Redirect to="/cardless-withdrawal/create" />
        }

        return confirmWithdrawal;
    }
}

const mapStateToProps = state => {
    return {
        cwInfo: state.cardless_reducer.cwInfo,
        accounts: state.data_reducer.debitableAccounts,
        fetching: state.cardless_reducer.isFetching,
        pageState: state.cardless_reducer.pageState,
        alert: state.alert,
        phoneNumber: state.authentication.user.phoneNo || state.authentication.user.response.phoneNo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token) => dispatch(dataActions.fetchDebitableAccounts(token)),
        fetchOtp : (token, data) => dispatch(actions.getOtpForCustomer(token, data)),
        resetPageState: () => dispatch(actions.resetPageState()),
        clearError: () => dispatch(alertActions.clear()),
        setCardlessInfo: (cwInfo) => dispatch(actions.setCardlessWithdrawalInfo(cwInfo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmWithdrawal);
