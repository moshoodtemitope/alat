import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Input, Select } from './input';

import { checkInputValidation } from '../../../shared/utils';

import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/dataActions/export';

class ConfirmData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDataForm: {
                activeAccount: {
                    elementType: 'select',
                    elementConfig: {
                        options: [{ value: '', displayValue: 'Loading Accounts...' }],
                    },
                    label: 'Select an account to debit',
                    value: '',
                    validation: {},
                    loaded: false,
                    valid: true
                },
                phone: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
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
                    valid: false,
                    error: 'Enter a valid pin',
                    touched: false
                },
            },
            formIsValid: false,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        this.props.fetchDebitableAccounts(this.state.user.token);
    }

    sortAccountsForSelect = () => {
        var arrayToDisplay = [];
        if(this.props.accounts.length >= 1){
            this.props.accounts.map((data => arrayToDisplay.push({ value: data.AccountNumber, displayValue: data.AccountDescription + " - N" + formatAmount(data.AvailableBalance) })));
        }else{
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available'}];
        }
        console.log(arrayToDisplay)
        
        const updatedSelectOption = {
            ...this.state.confirmDataForm
        }
        updatedSelectOption.activeAccount.elementConfig.options = arrayToDisplay;
        updatedSelectOption.activeAccount.loaded = true;
        this.setState({ confirmDataForm: updatedSelectOption });

    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedConfirmDataForm = {
            ...this.state.confirmDataForm
        }
        const updatedFormElement = {
            ...updatedConfirmDataForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = checkInputValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = true;
        updatedFormElement.touched = true;
        updatedConfirmDataForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedConfirmDataForm) {
            formIsValid = updatedConfirmDataForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({ confirmDataForm: updatedConfirmDataForm, formIsValid });
    }

    render() {
        let confirmData = <Redirect to="/bills/data/buy" />
        if(this.props.dataInfo != null){
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
        confirmData =(
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
                                                    <p class="pl-name-email">{this.props.dataInfo.network} Data Plan<span>{this.props.dataInfo.dataPlan}</span></p>
                                                    <p class="pl-amount">N{formatAmountNoDecimal(this.props.dataInfo.amount)}</p>
                                                </div>
                                            </div>
                                        </div>


                                        {formElementArray.map((formElement) => {
                                            if (formElement.config.elementType !== "input") {
                                                return (
                                                    <Select key={formElement.id}
                                                        optionsList={formElement.config.elementConfig.options}
                                                        label={formElement.config.label}
                                                        id={formElement.id}
                                                        changed={(event) => this.onDataPlanChanged(event)} />
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
                                                </div>
                                            )

                                        })}

                                        <div class="row">
                                            <div class="col-sm-12">
                                                <center>

                                                    <button onClick={this.onSubmitBuyData} class="btn-alat m-t-10 m-b-20 text-center">Next</button>
                                                </center>
                                            </div>
                                        </div>

                                    </form>



                                </div>



                            </div>

                            <center>
                                <Link to={'/bills/data/buy'} className="add-bene m-t-50">Go Back</Link>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
        }
        
        return confirmData;
    }
}

const mapStateToProps = state => {
    return {
        dataInfo: state.data_reducer.dataToBuy,
        dataPlans: state.data_reducer.dataPlans,
        accounts: state.data_reducer.debitableAccounts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token) => dispatch(actions.fetchDebitableAccounts(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmData);
