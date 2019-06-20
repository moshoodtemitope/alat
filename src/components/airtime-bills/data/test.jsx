import React, { Component } from 'React';
import { Link } from 'react-router-dom';

import { Input } from './input';
import Select from 'react-select';
import { formatAmountNoDecimal } from '../../../shared/utils';
import { checkInputValidation } from '../../../shared/utils';
import { connect } from 'react-redux';


import * as actions from '../../../redux/actions/dataActions/export';


var networkOperators = [
    { value: "MTN", label: "MTN"},
    { value: "Airtel", label: "Airtel"},
    { value: "Glo", label: "Glo"},
    { value: "Etisalat", label: "Etisalat"}
]
class BuyData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNetwork: null,
            selectedDataPlan: null,
            dataPlansOptions: [],
            validation: {
                networkSelector: {
                    hasError: false,
                    error: "Please select a network"
                },
                phoneInput: {
                    hasError: {
                        requiredError: false,
                        validError: false
                    },
                    error: {
                        required: "Field is required",
                        valid: "Enter a valid phone number"
                    }
                }
            },
            buyDataForm: {
                amount: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: '0000',
                    },
                    label: 'Amount',
                    value: "",
                    isDisabled: true,
                    validation: {},
                    valid: true,
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
                        maxLength: 16,
                        isNumeric: true,
                    },
                    isDisabled: false,
                    label: 'Phone Number',
                    valid: false,
                    error: 'Enter a valid phone number',
                    touched: false
                },
            },
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        if (this.props.dataPlans.length < 1) {
            
            this.props.fetchDataPlans(this.state.user.token);
        }
    }

    dataPlanChangedHandler = (selectedDataPlan) => {
        this.setState({ selectedDataPlan }, () => {this.updateAmount(selectedDataPlan.amount)});
        console.log(`Option selected:`, selectedDataPlan);
    }
    
    networkChangedHandler = (selectedNetwork) => {
        if(this.state.selectedDataPlan == null){
            this.setState({ selectedNetwork }, () => {this.setDataPlans(selectedNetwork.value)});
            console.log(`Option selected:`, selectedNetwork);
        }else{
            this.setState({ selectedDataPlan : null }, () => {this.networkChangedHandlerALT(selectedNetwork)} )
        }
        
    }

    networkChangedHandlerALT = (selectedNetwork) => {
        this.setState({ selectedNetwork }, () => {this.setDataPlans(selectedNetwork.value)});
        console.log(`Option selected:`, selectedNetwork);
    }

    setDataPlans = (value) => {
        var arrayToDisplay = [];
        this.props.dataPlans.filter(data => data.Network == value)
            .map((data => arrayToDisplay.push({ value: data.PaymentItem,label: data.PaymentItem, amount: data.Amount })));
        this.setState({dataPlansOptions : arrayToDisplay}, () => {this.updateAmount(this.state.dataPlansOptions[0].amount)})
    }

    updateAmount = (value) => {
        const updatedSelectOption = {
            ...this.state.buyDataForm
        }
        updatedSelectOption.amount.value = value;
        this.setState({ buyDataForm: updatedSelectOption });
        // var selected = this.getSelectValue("dataPlan");
        // var dataPlanAmount = this.state.buyDataForm.dataPlan.elementConfig.options.filter(data => selected == data.value);
        // const updatedSelectOption = {
        //     ...this.state.buyDataForm
        // }
        // updatedSelectOption.amount.value = dataPlanAmount[0].amount;
        // this.setState({buyDataForm: updatedSelectOption})
    }

    getSelectValue = (idName) => {
        var e = document.getElementById(idName);
        console.log(e);
        var selectValue = e.options[e.selectedIndex].value;
        return selectValue;
    }

    onDataPlanChanged = (event) => {
        var dataPlanAmount = this.state.buyDataForm.dataPlan.elementConfig.options.filter(data => event.target.value == data.value);
        const updatedSelectOption = {
            ...this.state.buyDataForm
        }
        updatedSelectOption.amount.value = dataPlanAmount[0].amount;
        this.setState({ buyDataForm: updatedSelectOption });
    }

    onSubmitBuyData = (event) => {
        event.preventDefault()
        // const updatedSelectOption = {
        //         ...this.state.buyDataForm
        //     }
        if(this.state.selectedNetwork && this.state.buyDataForm.phone.value != "" ){
            var dataToBuy = {
                network: this.state.selectedNetwork.value,
                dataPlan: this.state.selectedNetwork.value,
                amount: this.state.buyDataForm.amount.value,
                phoneNumber: this.state.buyDataForm.phone.value
            }
            this.props.setDataToBuyDetails(dataToBuy);
            console.log(dataToBuy);
            this.props.history.push('/bills/data/buy/confirm');
        }else{
            let validation = {...this.state.validation} 
            if (!this.state.selectedNetwork){
                validation.networkSelector.hasError = true;
            }
            if (this.state.buyDataForm.phone.value == ""){
                validation.phoneInput.hasError.requiredError = true;
            }else if(!this.phoneValidation(this.state.buyDataForm.amount.value)){
                validation.phoneInput.hasError.validError = true;
            }
            this.setState({ validation});
        }
        // var selected = this.getSelectValue("dataPlan");
        // var dataPlanAmount = this.state.buyDataForm.dataPlan.elementConfig.options.filter(data => selected == data.value);
        // const updatedSelectOption = {
        //     ...this.state.buyDataForm
        // }
        // updatedSelectOption.amount.value = dataPlanAmount[0].amount;
        // this.setState({buyDataForm: updatedSelectOption})
        
    }

    phoneValidation = (value) => {
        const pattern = /^\d+$/;
        return (value.length >= 11 && isValid && value.length <= 16 && pattern.test(value));
    }

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
        const { selectedNetwork } = this.state;
        const { selectedDataPlan } = this.state;
        const {dataPlansOptions} = this.state;
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Buy Data</h4>
                                
                                <div className="transfer-ctn">
                                    <form>
                                        <div class="input-ctn">
                                            <label>Select a Network</label>
                                            <Select
                                                value={selectedNetwork}
                                                onChange={this.networkChangedHandler}
                                                options={networkOperators}
                                                placeholder="Select..."
                                            />
                                            {this.state.validation.networkSelector.hasError ? <small className="text-danger">{this.state.validation.networkSelector.error}</small> : null}
                                        </div>
                                        <div class="input-ctn">
                                        <label>Choose a data plan</label>
                                        <Select
                                                value={selectedDataPlan != null ? selectedDataPlan : dataPlansOptions[0]}
                                                onChange={this.dataPlanChangedHandler}
                                                options={dataPlansOptions}
                                                placeholder="---"
                                            />
                                        </div>
                                        {formElementArray.map((formElement) => {
                                            return (
                                                <div className="input-ctn" key={formElement.id}>
                                                    <label>{formElement.config.label}</label>
                                                    <Input
                                                        elementType={formElement.config.elementType}
                                                        elementConfig={formElement.config.elementConfig}
                                                        value={formElement.config.isDisabled ? 'N'+formatAmountNoDecimal(formElement.config.value) : formElement.config.value}
                                                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                        wrongInput={!formElement.config.valid}
                                                        isTouched={formElement.config.touched}
                                                        errormsg={formElement.config.error}
                                                        isDisabled={formElement.config.isDisabled} />
                                                        {formElement.id == "phone" && this.state.validation.phoneInput.hasError.validError ? <small className="text-danger">{this.state.validation.phoneInput.error.valid}</small> : null}
                                                        {formElement.id == "phone" && this.state.validation.phoneInput.hasError.requiredError ? <small className="text-danger">{this.state.validation.phoneInput.error.required}</small> : null}
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
                                <Link to={'/bills/data'} className="add-bene m-t-50">Go Back</Link>
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
        dataPlans: state.data_reducer.dataPlans,
        dataInfo : state.data_reducer.dataToBuy,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDataPlans: (token) => dispatch(actions.fetchDataPlans(token)),
        setDataToBuyDetails: (dataToBuy) => dispatch(actions.setDataTransactionDetails(dataToBuy))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyData);
