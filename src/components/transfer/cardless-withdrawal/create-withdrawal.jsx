import React, { Component } from 'React';
import { Link } from 'react-router-dom';

import { Input } from '../../airtime-bills/data/input';
import Select from 'react-select';
import {alertActions} from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal } from '../../../shared/utils';
import { checkInputValidation } from '../../../shared/utils';
import { connect } from 'react-redux';


import * as actions from '../../../redux/actions/cardless-withdrawal/export';
import { isFetchingFalse } from '../../../redux/actions/dataActions/data.actions';

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
                mThousand: true

            },
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
    }


    // networkChangedHandlerALT = (selectedNetwork) => {
    //     this.setState({ selectedNetwork }, () => {this.setDataPlans(selectedNetwork.value)});
    //     console.log(`Option selected:`, selectedNetwork);
    // }

    // setDataPlans = (value) => {
    //     var arrayToDisplay = [];
    //     this.props.dataPlans.filter(data => data.Network == value)
    //         .map((data => arrayToDisplay.push({ value: data.PaymentItem,label: data.PaymentItem, amount: data.Amount, billerCode: data.BillerPaymentCode, networkCode: data.NetworkCode })));
    //     this.setState({dataPlansOptions : arrayToDisplay, selectedDataPlan : arrayToDisplay[0]}, () => {this.updateAmount(this.state.dataPlansOptions[0].amount)})
    // }

    // updateAmount = (value) => {
    //     const updatedSelectOption = {
    //         ...this.state.buyDataForm
    //     }
    //     updatedSelectOption.amount.value = value;
    //     this.setState({ buyDataForm: updatedSelectOption });
    // }

    onSubmitCwData = (event) => {
        event.preventDefault();
        this.props.clearError();
        if(this.state.selectedNetwork && this.state.buyDataForm.phone.value != "" && this.phoneValidation(this.state.buyDataForm.phone.value)){
            //commented by moshood
            // this.props.setDataToBuyDetails(dataToBuy, this.state.selectedNetwork ? this.state.selectedNetwork.value : "MTN");
            // console.log(dataToBuy);
            this.props.history.push('/bills/data/buy/confirm');
        }else{
            let validation = {...this.state.validation} 
            if (!this.state.selectedNetwork){
                validation.networkSelector.hasError = true;
            }
            if (this.state.buyDataForm.phone.value == ""){
                validation.phoneInput.hasError.requiredError = true;
            }else if(!this.phoneValidation(this.state.buyDataForm.phone.value)){
                validation.phoneInput.hasError.validError = true;
            }
            this.setState({ validation});
        }
    }

    phoneValidation = (value) => {
        
        return (value.length >= 11 && value.length <= 16 && pattern.test(value));
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedCwDataForm = {
            ...this.state.cwDataForm
        }
        const updatedFormElement = {
            ...updatedCwDataForm[inputIdentifier]
        };
        let validation = {...this.state.validation};
        updatedFormElement.value = event.target.value;
        if(inputIdentifier == "amount"){
            if(updatedFormElement.value.length >= 1){
                if(!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 5){
                    return;
                }
            }
            if(updatedFormElement.value % 1000 != 0){
                validation.mThousand = false;
            }else{
                validation.mThousand = true;
            }
        }
        
        // updatedFormElement.valid = checkInputValidation(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.valid = true;
        // updatedFormElement.touched = true;
        updatedCwDataForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        //commented by moshood
        // for (let inputIdentifier in updatedBuyDataForm) {
        //     formIsValid = updatedCwDataForm[inputIdentifier].valid && formIsValid;
        // }
        // console.log(formIsValid);
        
        this.setState({ cwDataForm: updatedCwDataForm, formIsValid, validation });
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
                        <div className="info-label error">{this.props.alert.message} | <span onClick={() => {this.props.fetchDataPlans(this.state.user.token)}} style={{textDecoration:"underline", cursor:"pointer"}}>Click here to try again</span></div> : null
                        }
                                        
                                        {formElementArray.map((formElement) => {
                                            return (
                                                <div className="input-ctn" key={formElement.id}>
                                                    <label>{formElement.config.label}</label>
                                                    <Input
                                                        elementType={formElement.config.elementType}
                                                        elementConfig={formElement.config.elementConfig}
                                                        value={formElement.config.value}
                                                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                        wrongInput={!formElement.config.valid}
                                                        isTouched={formElement.config.touched} />
                                                        {formElement.id == "phone" && this.state.validation.phoneInput.hasError.validError ? <small className="text-danger">{this.state.validation.phoneInput.error.valid}</small> : null}
                                                        {formElement.id == "phone" && this.state.validation.phoneInput.hasError.requiredError ? <small className="text-danger">{this.state.validation.phoneInput.error.required}</small> : null}
                                                </div>
                                            )

                                        })}

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>

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
        fetching: state.data_reducer.isFetchingData,
        pinVerified: state.data_reducer.pinVerified,
        alert: state.alert,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCardlessInfo: (cwInfo) => dispatch(actions.setCardlessWithdrawalInfo(cwInfo)),
        clearError: () => dispatch(alertActions.clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWithdrawal);
