import React, { Component, Fragment } from 'react';
import Select from "react-select";
import { Redirect, Link } from 'react-router-dom';
import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';
import { Input } from '../../airtime-bills/data/input';
import { alertActions } from "../../../redux/actions/alert.actions";
import { getAccounts } from "../../../redux/actions/dashboard/dashboard.actions";
import * as actions from '../../../redux/actions/accounts/export';
import Checkbox from '../../../shared/elements/_checkbox';

const pattern = /^\d+$/;
class SetLimit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: null,
            accounts: [],
            accountsLoaded: false,
            isChecked: false,
            limitDataForm: {
                activeAccount: {
                    elementType: 'select',
                    elementConfig: {
                        options: [],
                    },
                    label: 'Select an account',
                    value: '',
                    validation: {},
                    valid: true
                },
                limit: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    valueToDisplay: '',
                    label: 'New Transaction Limit',
                    touched: false
                },
                pin: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: ''
                    },
                    value: '',
                    label: 'ALAT PIN',
                    touched: false
                },
            },
            validation: {
                aboveLimit: false,
                pinDigit: false,
                unchecked: false,
                required: {
                    limitEmpty: false,
                    pinEmpty: false,
                }
            },
            user: JSON.parse(localStorage.getItem("user")),
        };
    }
    componentDidMount() {
        if (!this.props.accounts.length) {
            this.props.fetchDebitableAccounts(this.state.user.token, false)
        }
    }

    sortAccountsForSelect = () => {
        var arrayToDisplay = [];

        if (this.props.accounts.length >= 1) {
            this.props.accounts.map((data => arrayToDisplay.push({
                value: data.AccountNumber,
                label: data.AccountType + " - ₦" + formatAmount(data.AvailableBalance),
            })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
        }
        console.log(arrayToDisplay);

        const updatedSelectOption = {
            ...this.state.limitDataForm
        }

        updatedSelectOption.activeAccount.elementConfig.options = arrayToDisplay;
        this.setState({ limitDataForm: updatedSelectOption, accountsLoaded: true }, () => this.props.getAccountLimits(this.state.user.token, { AccountNumber: arrayToDisplay[0].value }));
    }

    accountChangedHandler = (selectedAccount) => {
        this.setState({ selectedAccount });

        console.log(`Option selected:`, selectedAccount);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedLimitDataForm = {
            ...this.state.limitDataForm
        }
        const updatedFormElement = {
            ...updatedLimitDataForm[inputIdentifier]
        };
        let validation = { ...this.state.validation };
        if (validation.required.pinEmpty || validation.required.limitEmpty) {
            validation.required.pinEmpty = false;
            validation.required.limitEmpty = false;
            this.setState({validation});
        }
        if (inputIdentifier == "limit") {
            updatedFormElement.valueToDisplay = event.target.value;
            updatedFormElement.value = updatedFormElement.valueToDisplay.replace(/\,/g, '');
            if (updatedFormElement.valueToDisplay.length >= 1) {
                if (!pattern.test(updatedFormElement.value)) {
                    return;
                }
                updatedFormElement.valueToDisplay = formatAmountNoDecimal(parseInt(updatedFormElement.value));
            }
            if (updatedFormElement.value > this.props.limits.LimitToCompare) {
                validation.aboveLimit = true;
            } else {
                validation.aboveLimit = false;
            }
        } else if (inputIdentifier == "pin") {
            updatedFormElement.value = event.target.value;
            if (updatedFormElement.value.length >= 1) {
                if (!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 4) {
                    return;
                }
            }
            if (inputIdentifier == "pin" && updatedFormElement.value.length != 4) {
                validation.pinDigit = true;
            } else {
                validation.pinDigit = false;
            }
        }

        // console.log(updatedFormElement.value)
        updatedLimitDataForm[inputIdentifier] = updatedFormElement;
        this.setState({ limitDataForm: updatedLimitDataForm, validation });
    }

    onSubmitData = (event) => {
        event.preventDefault();
        this.props.clearError();
        let validation = { ...this.state.validation };
        if (validation.aboveLimit || validation.pinDigit) return;
        let formData = { ...this.state.limitDataForm };
        if (formData.limit.value == "" || formData.pin == "" || this.state.isChecked == false) {
            if (formData.limit.value == "") validation.required.limitEmpty = true;
            if (formData.pin.value == "") validation.required.pinEmpty = true;
            if(this.state.isChecked == false) validation.unchecked = true
            this.setState({ validation });
            return;
        }
        let payload = {
            PhoneNo: this.props.phoneNumber
        }
        let setLimitInfo = {
            AccountNumber: (this.state.selectedAccount ? this.state.selectedAccount.value : this.state.limitDataForm.activeAccount.elementConfig.options[0].value),
            OtherBankLimit: formData.limit.value,
            WemaBankLimit: formData.limit.value,
            Pin: formData.pin.value
        }

        this.props.fetchOtp(this.state.user.token, payload);
        this.props.setLimitData(setLimitInfo);
    }

    handleClick = () => {
        this.setState({ isChecked: !this.state.isChecked });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.limitDataForm) {
            formElementArray.push({
                id: key,
                config: this.state.limitDataForm[key]
            });
        }
        if (this.props.accounts.length >= 1 && !this.state.accountsLoaded) {
            this.sortAccountsForSelect();
        }
        const { selectedAccount, isChecked, validation } = this.state;

        let transLimit = (
            <Fragment>

                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                {(this.props.alert.message) ?
                                    <div className={`info-label mb-3 ${this.props.alert.type}`}>{this.props.alert.message} {this.props.alert.message.indexOf("rror") != -1 ? <span onClick={() => { this.props.fetchDebitableAccounts(this.state.user.token) }} style={{ textDecoration: "underline", cursor: "pointer" }}>Click here to try again</span> : null}</div> : null
                                }
                                <div className="al-card no-pad">

                                    <div className="transfer-ctn" style={{ padding: "30px 30px" }}>
                                        <h4 className="mb-3">Transaction Limit</h4>
                                        <p className="s-info mb-4">Set your daily transaction limit. Your maximum transaction limit is <span style={{ color: "#AB2656", fontWeight: "600" }}>{this.props.limits.LimitToCompare > 1 ? `₦${formatAmountNoDecimal(this.props.limits.LimitToCompare)}` : this.props.limits.LimitToCompare}</span></p>
                                        <form>

                                            <div className="row">
                                                {formElementArray.map((formElement) => {
                                                    if (formElement.config.elementType == "select") {
                                                        return (
                                                            <div className="input-ctn col-md-12" key={formElement.id}>
                                                                <label>Select an account</label>
                                                                <Select key={formElement.id}
                                                                    value={selectedAccount == null ? formElement.config.elementConfig.options > 0 ? formElement.config.elementConfig.options[0] : formElement.config.elementConfig.options : selectedAccount}
                                                                    onChange={this.accountChangedHandler}
                                                                    options={formElement.config.elementConfig.options}
                                                                    placeholder={this.props.alert.message ? "Failed. Please try again" : (this.props.accounts.length > 0 ? "Select..." : "Loading Account...")}
                                                                />
                                                            </div>
                                                        )
                                                    };
                                                    return (
                                                        <div className="input-ctn col-md-6" key={formElement.id}>
                                                            <label>{formElement.config.label}</label>
                                                            <Input
                                                                elementType={formElement.config.elementType}
                                                                elementConfig={formElement.config.elementConfig}
                                                                value={formElement.id == "limit" ? formElement.config.valueToDisplay : formElement.config.value}
                                                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                            />
                                                            {formElement.id == "limit" && validation.aboveLimit ? <span className="text-danger">Limit cannot exceed max limit</span> : null}
                                                            {formElement.id == "pin" && validation.pinDigit ? <span className="text-danger">Password must be four digits</span> : null}
                                                            {formElement.id == "pin" && validation.required.pinEmpty ? <span className="text-danger">Password is required</span> : null}
                                                            {formElement.id == "limit" && validation.required.limitEmpty ? <span className="text-danger">Limit is required</span> : null}
                                                        </div>
                                                    )

                                                })}
                                                <div className="col-md-12">
                                                    <Checkbox
                                                        id="checkbox3"
                                                        value="random3"
                                                        name="example"
                                                        label={
                                                            <span><a rel="noopener noreferrer" href="https://api.alat.ng/registrationApi/indemnity.html" target="_blank">By clicking submit, you agree to indemnify the bank</a></span>
                                                        }
                                                        isChecked={isChecked}
                                                        changed={this.handleClick} />
                                                        {!isChecked && validation.unchecked ? <span className="text-center text-danger">Kindly accept to indemnify the bank to continue</span> : null}
                                                </div>
                                                <div className="col-sm-12">
                                                    <center>
                                                        <button onClick={this.onSubmitData} disabled={this.props.sending} className="btn-alat m-t-10 m-b-20 text-center">{this.props.sending ? "Processing..." : "Set New Limit"}</button>
                                                    </center>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
        if(this.props.pageState == 0) {
            console.log("limit is redirecting")
            this.props.resetPageState();
            transLimit = <Redirect to="/account/account-limit/verify" />
        }

        return transLimit;
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.dashboard_accounts.user_account_data && state.dashboard_accounts.user_account_data.response ? state.dashboard_accounts.user_account_data.response.Accounts : state.dashboard_accounts,
        alert: state.alert,
        limits: state.accountsM_reducer.limits,
        phoneNumber: state.authentication.user.phoneNo || state.authentication.user.response.phoneNo,
        pageState: state.accountsM_reducer.pageState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token, withHistory) => dispatch(getAccounts(token, withHistory)),
        getAccountLimits: (token, payload) => dispatch(actions.getTransactionLimit(token, payload)),
        clearError: () => dispatch(alertActions.clear()),
        setLimitData: (data) => dispatch(actions.setLimitData(data)),
        resetPageState: () => dispatch(actions.resetPageState()),
        fetchOtp : (token, data) => dispatch(actions.getOtpForCustomer(token, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetLimit);