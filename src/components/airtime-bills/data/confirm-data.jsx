import React, { Component, Fragment } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Input } from './input';
import Select from 'react-select';

import { checkInputValidation } from '../../../shared/utils';
import Modal from 'react-responsive-modal';
import {alertActions} from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/dataActions/export';

const pattern = /^\d+$/;
class ConfirmData extends Component {
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
                        options: [{ value: '', label: 'Loading Accounts...' }],
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
            formIsValid: false,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        this.props.fetchDebitableAccounts(this.state.user.token);
        console.log(this.props.dataInfo)
    }

    sortAccountsForSelect = () => {
        var arrayToDisplay = [];
        console.log(this.props.accounts);
        console.log("this.props.accounts");

        if (this.props.accounts.length >= 1) {
            this.props.accounts.map((data => arrayToDisplay.push({ value: data.AccountNumber, label: data.AccountDescription + " - N" + formatAmount(data.AvailableBalance) })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
        }
        console.log(arrayToDisplay)

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
        console.log(`Option selected:`, selectedAccount);
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
        // updatedFormElement.valid = checkInputValidation(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.valid = true;
        // updatedFormElement.touched = true;
        updatedConfirmDataForm[inputIdentifier] = updatedFormElement;

        // let formIsValid = true;
        // for (let inputIdentifier in updatedConfirmDataForm) {
        //     formIsValid = updatedConfirmDataForm[inputIdentifier].valid && formIsValid;
        // }
        // console.log(formIsValid);
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
                ...this.props.dataInfo,
                AccountNumber: (this.state.selectedAccounts ? this.state.selectedAccounts.value : this.state.confirmDataForm.activeAccount.elementConfig.options[0].value),
                TransactionPin: this.state.confirmDataForm.pin.value
            }
            this.props.setDataToBuyDetails(payload,this.props.network, this.props.isFromBeneficiary);

            this.props.verifyInputedPIN(this.state.user.token, payload);
        }
    }

    


    render() {
        let confirmData = <Redirect to="/bills/data/buy" />
        if (this.props.dataInfo != null) {
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

            confirmData = (
                <Fragment>
                    
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Buy Data</h4>
                                        <div className="transfer-ctn">
                                            <form>
                                                <div class="al-card no-pad">
                                                    <div class="trans-summary-card">
                                                        <div class="name-amount clearfix">
                                                            <p class="pl-name-email">{this.props.network} Data Plan<span>{this.props.dataInfo.PaymentItem}</span></p>
                                                            <p class="pl-amount">N{formatAmountNoDecimal(this.props.dataInfo.Amount)}</p>
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
                                                                    value={selectedAccount == null ? formElement.config.elementConfig.options[0] : selectedAccount}
                                                                    onChange={this.accountChangedHandler}
                                                                    options={formElement.config.elementConfig.options}
                                                                    placeholder="Loading Accounts..."
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

                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <center>
                                                            <button disabled={this.props.fetching} onClick={this.onSubmitForm} class="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Buy Data"}</button>
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
            if (this.props.pinVerified == 0) {
                this.props.resetPinState();
                confirmData = <Redirect to="/bills/data/buy/verify" />
            }
        }

        return confirmData;
    }
}

const mapStateToProps = state => {
    return {
        dataInfo: state.data_reducer.dataToBuy,
        dataPlans: state.data_reducer.dataPlans,
        accounts: state.data_reducer.debitableAccounts,
        fetching: state.data_reducer.isFetching,
        pinVerified: state.data_reducer.pinVerified,
        errorMessage: state.data_reducer.errorMessage,
        network: state.data_reducer.network,
        isFromBeneficiary : state.data_reducer.isFromBeneficiary,
        alert: state.alert,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token) => dispatch(actions.fetchDebitableAccounts(token)),
        verifyInputedPIN : (token, data) => dispatch(actions.pinVerificationStart(token, data)),
        setDataToBuyDetails: (dataToBuy, network, fromBeneficiary) => dispatch(actions.setDataTransactionDetails(dataToBuy, network, fromBeneficiary)),
        resetPinState: () => dispatch(actions.pinVerificationTryAgain()),
        clearError: () => dispatch(alertActions.clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmData);
