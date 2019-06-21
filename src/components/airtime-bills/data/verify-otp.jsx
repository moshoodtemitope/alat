import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Input, Switch } from './input';
import Select from 'react-select';
import verifyOtp from '../../../assets/img/verify-phone.svg';

import { checkInputValidation } from '../../../shared/utils';

import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/dataActions/export';

class VerifyOtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // selectedAccounts: null,
            otpFormData: {
                //     activeAccount: {
                //         elementType: 'select',
                //         elementConfig: {
                //             options: [{ value: '', label: 'Loading Accounts...' }],
                //         },
                //         label: 'Select an account to debit',
                //         value: '',
                //         validation: {},
                //         loaded: false,
                //         valid: true
                //     },
                otp: {
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
            // saveBeneficiary: true,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        // this.props.fetchDebitableAccounts(this.state.user.token);
        this.props.resetPinState();
    }

    // sortAccountsForSelect = () => {
    //     var arrayToDisplay = [];
    //     if (this.props.accounts.length >= 1) {
    //         this.props.accounts.map((data => arrayToDisplay.push({ value: data.AccountNumber, label: data.AccountDescription + " - N" + formatAmount(data.AvailableBalance) })));
    //     } else {
    //         arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
    //     }
    //     console.log(arrayToDisplay)

    //     const updatedSelectOption = {
    //         ...this.state.confirmDataForm
    //     }
    //     updatedSelectOption.activeAccount.elementConfig.options = arrayToDisplay;
    //     updatedSelectOption.activeAccount.loaded = true;
    //     this.setState({ confirmDataForm: updatedSelectOption });

    // }

    // accountChangedHandler = (selectedAccount) => {
    //     this.setState({ selectedAccount });
    //     console.log(`Option selected:`, selectedAccount);
    // }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedotpFormData = {
            ...this.state.otpFormData
        }
        const updatedFormElement = {
            ...updatedotpFormData[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = checkInputValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = true;
        updatedFormElement.touched = true;
        updatedotpFormData[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedotpFormData) {
            formIsValid = updatedotpFormData[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({ otpFormData: updatedotpFormData, formIsValid });
    }

    handleToggle = () => {
        this.setState({ saveBeneficiary: !this.state.saveBeneficiary });
    }

    render() {
        let verify = <Redirect to="/bills/data/buy" />
        //check
        if (this.props.dataInfo != null) {
            const formElementArray = [];
            for (let key in this.state.otpFormData) {
                formElementArray.push({
                    id: key,
                    config: this.state.otpFormData[key]
                });
            }
            // const { selectedAccount } = this.state;

            verify = (
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">OTP Verification</h4>

                                    <center>
                                        <img src={verifyOtp} className="m-t-20" alt="Verify OTP" />
                                    </center>

                                    <div className="m-t-30 width-300">
                                        <p className="m-b-20" >We just sent a verification code to your mobile number (+2348020****01)</p>

                                        <form>


                                            <div className="input-ctn">

                                                {formElementArray.map((formElement) => {
                                                    return (
                                                        <div className="input-ctn" key={formElement.id}>
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


                                            </div>

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <button type="submit" className="btn-alat m-t-10 m-b-40 text-center">Confirm</button>

                                                        <a className="resend-otp" href="#">Didn't get OTP? Resend Code.</a>
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
            );
        }

        return verify;
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
        resetPinState: () => dispatch(actions.pinVerificationTryAgain())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
