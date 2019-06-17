import React, { Component } from 'React';

import Input from './elements/input';
import { checkInputValidation } from '../../../shared/utils';

class BuyData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyDataForm: {
                selectNetwork: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: '', displayValue: 'Select a Network' },
                            { value: 'AIRTEL', displayValue: 'AIRTEL' },
                            { value: 'MTN', displayValue: 'MTN' },
                            { value: 'GLO', displayValue: 'GLO' },
                            { value: '9MOBILE', displayValue: '9MOBILE' },
                        ]
                    },
                    label: 'Select  a Network',
                    value: '',
                    validation: {},
                    valid: true
                },
                dataPlan: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            //to load from api
                        ]
                    },
                    label: 'Choose a data plan',
                    value: '',
                    validation: {},
                    valid: true
                },
                amount: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: '0000'
                    },
                    label: 'Amount',
                    value: '',
                    validation: {
                        required: true,
                        isNumeric: true
                    },
                    valid: false,
                    touched: false
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
                        minLength: 11,
                        maxLength: 11,
                        isNumeric: true,
                    },
                    label: 'Phone Number',
                    valid: false,
                    error: 'Enter a valid phone number',
                    touched: false
                },
            },
            formIsValid: false,
        };
    }



    // checkValidation(value, rules) {
    //     let isValid = true;

    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid;
    //     }
    //     if (rules.minLength){
    //         isValid = value.length >= rules.minLength && isValid
    //     }
    //     if(rules.isEmail){
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     return isValid;
    // }

    // regSubmitHandler = (event) => {
    //     // formData = {};
    //     // for (let formElementIdentifier in this.state.regInfo) {
    //     //     formData[formElementIdentifier] = this.state.regInfo[formElementIdentifier].value;

    //     // }
    //     // console.log(formData);
    // }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedBuyDataForm = {
            ...this.state.buyDataForm
        }
        const updatedFormElement = {
            ...updatedBuyDataForm[inputIdentifier]
        }; 
        updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = checkInputValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = true;
        updatedFormElement.touched = true;
        updatedBuyDataForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedBuyDataForm) {
            formIsValid = updatedBuyDataForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({ buyDataForm: updatedBuyDataForm, formIsValid });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.buyDataForm) {
            formElementArray.push({
                id: key,
                config: this.state.buyDataForm[key]
            });
        }
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Buy Data</h4>

                                <div className="transfer-ctn">
                                <form>
                                    {formElementArray.map(formElement => (
                                        <div className="input-ctn" key={formElement.id}>
                                            <label>{formElement.config.label}</label>
                                            <Input
                                            elementType={formElement.config.elementType}
                                            elementConfig={formElement.config.elementConfig}
                                            value={formElement.config.value}
                                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                            wrongInput={!formElement.config.valid}
                                            isTouched={formElement.config.touched}
                                            errormsg={formElement.config.error} />
                                        </div>
                                        

                                    ))}
                                   
                                </form>



                                </div>
                                


                            </div>

                            <center>
                                <a href="add-beneficiary.html" className="add-bene m-t-50">Go Back</a>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BuyData;
