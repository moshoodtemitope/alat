import React, { Component } from 'React';
import { Link } from 'react-router-dom';

import { Input } from '../../airtime-bills/data/input';
import Select from 'react-select';
import {alertActions} from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal } from '../../../shared/utils';
import { checkInputValidation } from '../../../shared/utils';
import { connect } from 'react-redux';


import * as actions from '../../../redux/actions/cardless-withdrawal/export';

const pattern = /^\d+$/;

class CreateWithdrawal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cwDataForm: {
                amount: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: '0000',
                    },
                    label: 'Amount',
                    value: "",
                    valueToDisplay: "",
                    validation: {
                    },
                    valid: true,
                    touched: false
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
                        maxLength: 16,
                        isNumeric: true,
                    },
                    label: 'Create Cashout PIN (Different from your ALAT PIN)',
                    valid: false,
                    error: 'Enter a valid phone number',
                    touched: false
                },
                confirmPin: {
                    elementType: 'password',
                    elementConfig: {
                        type: 'password',
                        placeholder: ''
                    },
                    value: '',
                    validation: {
                        required: true,
                        maxLength: 16,
                        isNumeric: true,
                    },
                    label: 'Confirm Cashout PIN',
                    valid: false,
                    error: 'Enter a valid phone number',
                    touched: false
                },
            },
            validation: {
                pinNotSame: false,
                aboveLimit: false,
                mThousand: true,
                pinDigit: true,
                required : {
                    amountEmpty: false,
                    pinEmpty: false,
                }
            },
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        this.props.clearError();
        this.props.resetPageState();
    }

    onSubmitCwData = (event) => {
        event.preventDefault();
        this.props.clearError();
        let validation = {...this.state.validation};
        if(!validation.pinDigit || validation.pinNotSame || !validation.mThousand) return;
        let dataForm = {...this.state.cwDataForm};
        if(dataForm.amount.value == "" || dataForm.pin.value == "" || dataForm.confirmPin.value == "" || dataForm.amount.value > 20000) {
            if(dataForm.amount.value == ""){
                validation.required.amountEmpty = true;
            }
            if(dataForm.pin.value == "" || dataForm.confirmPin.value == ""){
                validation.required.pinEmpty = true;
            }
            if(dataForm.amount.value > 20000){
                validation.aboveLimit = true;
            }
            this.setState({validation});
            return;
        }
        let cardlessWithdrawal = {
            CashOutPin: dataForm.pin.value,
            ConfirmedCashOutPin: dataForm.confirmPin.value, 
            Amount: parseFloat(dataForm.amount.value),
            SelectedCardlessPayOutChannel: 1
        }
        this.props.setCardlessInfo(cardlessWithdrawal);
        console.log(cardlessWithdrawal);
        console.log(this.props.phoneNumber);
        this.props.history.push('/cardless-withdrawal/confirm');
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedCwDataForm = {
            ...this.state.cwDataForm
        }
        const updatedFormElement = {
            ...updatedCwDataForm[inputIdentifier]
        };
        let validation = {...this.state.validation};
        validation.aboveLimit =false;
        validation.required.pinEmpty = false;
        validation.required.amountEmpty = false;
        if(inputIdentifier == "amount"){
            updatedFormElement.valueToDisplay = event.target.value;
            updatedFormElement.value = updatedFormElement.valueToDisplay.replace(/\,/g, '');
            if(updatedFormElement.valueToDisplay.length >= 1){
                if(!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 5){
                    return;
                }
                updatedFormElement.valueToDisplay = formatAmountNoDecimal(parseInt(updatedFormElement.value));
            }
            if(updatedFormElement.value % 1000 != 0){
                validation.mThousand = false;
            }else{
                validation.mThousand = true;
            }
        }else if(inputIdentifier == "pin" || inputIdentifier == "confirmPin"){
            updatedFormElement.value = event.target.value;
            if(updatedFormElement.value.length >= 1){
                if(!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 4){
                    return;
                }
            }
            if(inputIdentifier == "pin" && updatedFormElement.value.length != 4){
                validation.pinDigit = false;
            }else{
                validation.pinDigit = true;
            }
            if(inputIdentifier == "confirmPin" && updatedCwDataForm.pin.value != updatedFormElement.value){
                validation.pinNotSame = true;
            }else if((inputIdentifier == "pin" && updatedCwDataForm.confirmPin.value.length > 0) && updatedCwDataForm.confirmPin.value != updatedFormElement.value){
                validation.pinNotSame = true;
            }else{
                validation.pinNotSame = false;
            }
        }

        console.log(updatedFormElement.value)
        updatedCwDataForm[inputIdentifier] = updatedFormElement;
        this.setState({ cwDataForm: updatedCwDataForm, validation });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.cwDataForm) {
            formElementArray.push({
                id: key,
                config: this.state.cwDataForm[key]
            });
        }
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">ATM Withdrawal</h4>
                                
                                <div className="transfer-ctn">
                                    <form>
                            
                                    {(this.props.alert.message) ?
                        <div className="info-label error">{this.props.alert.message}</div> : null
                        }
                                        
                                        {formElementArray.map((formElement) => {
                                            return (
                                                <div className="input-ctn" key={formElement.id}>
                                                    <label>{formElement.config.label}</label>
                                                    <Input
                                                        elementType={formElement.config.elementType}
                                                        elementConfig={formElement.config.elementConfig}
                                                        value={formElement.id == "amount" ? formElement.config.valueToDisplay : formElement.config.value}
                                                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                        wrongInput={!formElement.config.valid}
                                                        isTouched={formElement.config.touched} />
                                                        {formElement.id == "amount" && !this.state.validation.mThousand ? <small className="text-danger">Must be multiple of N1,000</small> : null}
                                                        {formElement.id == "confirmPin" && this.state.validation.pinNotSame ? <small className="text-danger">Pin is not the same</small> : null}
                                                        {formElement.id == "pin" && !this.state.validation.pinDigit ? <small className="text-danger">PIN must be four digit</small> : null}
                                                        {formElement.id == "amount" && this.state.validation.required.amountEmpty ? <small className="text-danger">Field is required</small> : null}
                                                        {formElement.id == "pin" && this.state.validation.required.pinEmpty ? <small className="text-danger">Both PIN fields are required</small> : null}
                                                </div>
                                            )

                                        })}

                                        <div className="row">
                                            <div className="col-sm-12">
                                                
                                                <center>
                                                {this.state.validation.aboveLimit ? <b className="text-danger">Amount can not exceed ₦20,000</b> : null}
                                                    <button onClick={this.onSubmitCwData} className="btn-alat m-t-10 m-b-20 text-center">Next</button>
                                                </center>
                                            </div>
                                        </div>

                                    </form>
                                </div>



                            </div>

                            <center>
                                <Link to={'/cardless-withdrawal'} className="add-bene m-t-50">Go Back</Link>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCardlessInfo: (cwInfo) => dispatch(actions.setCardlessWithdrawalInfo(cwInfo)),
        clearError: () => dispatch(alertActions.clear()),
        resetPageState: () => dispatch(actions.resetPageState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWithdrawal);
