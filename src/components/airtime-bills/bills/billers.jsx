import React, { Component } from 'React';
import { Link } from 'react-router-dom';

import Select from 'react-select';
import {alertActions} from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal } from '../../../shared/utils';
import { checkInputValidation } from '../../../shared/utils';
import { connect } from 'react-redux';


import * as actions from '../../../redux/actions/bills/export';
import { isFetchingFalse } from '../../../redux/actions/dataActions/data.actions';

const pattern = /^\d+$/;

class Billers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billersCategory: null,
            billerItems:null,
            selectedCategory: null,
            selectedBiller: null,
            billersOptions: [],
            validation: {
                categorySelector: {
                    hasError: false,
                    error: "Please select a biller category"
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
            formIsValid: false,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        if (this.props.billers.length < 1) {
            
            this.props.fetchBillersCategory(this.state.user.token);
        }
    }

    sortBillerCategory = (billersData) => {
        var categoryArray = [];
        billersData.map((biller) => categoryArray.push({value: biller.Category, label: biller.Category}));
        this.setState({billersCategory: categoryArray}, () => console.log(this.state.billersCategory));
    }



    dataPlanChangedHandler = (selectedDataPlan) => {
        this.setState({ selectedDataPlan }, () => {this.updateAmount(selectedDataPlan.amount)});
        console.log(`Option selected:`, selectedDataPlan);
    }
    
    categoryChangedHandler = (selectedCategory) => {
        let validation = {...this.state.validation};
        validation.categorySelector.hasError = false;
        if(this.state.selectedBiller == null){
            this.setState({ selectedCategory, validation }, () => {this.setBillers(selectedCategory.value)});
            console.log(`Option selected:`, selectedCategory);
        }else{
            this.setState({ selectedBiller : null }, () => {this.categoryChangedHandlerALT(selectedCategory)} )
        }
        
    }

    categoryChangedHandlerALT = (selectedCategory) => {
        this.setState({ selectedCategory }, () => {this.setBillers(selectedCategory.value)});
        console.log(`Option selected:`, selectedCategory);
    }

    setBillers = (value) => {
        var billersToDisplay = [];
        var selected = this.props.billers.filter(biller => biller.Category == value);
        selected[0].Billers.map(data => billersToDisplay.push({value: data, label: data}));
        this.setState({billersOptions: billersToDisplay, selectedBiller: billersToDisplay[0]}, () => {this.props.fetchBillerItems(this.state.user.token, { Category : this.state.billersOptions[0].value})})
    }

    updateAmount = (value) => {
        const updatedSelectOption = {
            ...this.state.buyDataForm
        }
        updatedSelectOption.amount.value = value;
        this.setState({ buyDataForm: updatedSelectOption });
    }

    onSubmitBuyData = (event) => {
        event.preventDefault();
        this.props.clearError();
        if(this.state.selectedNetwork && this.state.buyDataForm.phone.value != "" && this.phoneValidation(this.state.buyDataForm.phone.value)){
            
            var dataToBuy = {
                Amount: parseFloat(this.state.buyDataForm.amount.value),
                BillerPaymentCode: (this.state.selectedDataPlan ? this.state.selectedDataPlan.billerCode : this.state.dataPlansOptions[0].billerCode),
                NetworkCode: (this.state.selectedDataPlan ? this.state.selectedDataPlan.networkCode : this.state.dataPlansOptions[0].networkCode),
                PaymentItem: (this.state.selectedDataPlan ? this.state.selectedDataPlan.value : this.state.dataPlansOptions[0].value),
                PhoneNumber: this.state.buyDataForm.phone.value,
                SubscriberId: this.state.buyDataForm.phone.value,
            }
            this.props.setDataToBuyDetails(dataToBuy, this.state.selectedNetwork ? this.state.selectedNetwork.value : "MTN");
            console.log(dataToBuy);
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

    // phoneValidation = (value) => {
        
    //     return (value.length >= 11 && value.length <= 16 && pattern.test(value));
    // }

    // inputChangedHandler = (event, inputIdentifier) => {
    //     const updatedBuyDataForm = {
    //         ...this.state.buyDataForm
    //     }
    //     const updatedFormElement = {
    //         ...updatedBuyDataForm[inputIdentifier]
    //     };
    //     let validation = {...this.state.validation};
    //     validation.phoneInput.hasError.validError = false;
    //     validation.phoneInput.hasError.requiredError = false;
    //     updatedFormElement.value = event.target.value;
    //     if(updatedFormElement.value.length >= 1){
    //         if(!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 16){
    //             return;
    //         }
    //     }
    //     // updatedFormElement.valid = checkInputValidation(updatedFormElement.value, updatedFormElement.validation);
    //     updatedFormElement.valid = true;
    //     updatedFormElement.touched = true;
    //     updatedBuyDataForm[inputIdentifier] = updatedFormElement;

    //     let formIsValid = true;
    //     for (let inputIdentifier in updatedBuyDataForm) {
    //         formIsValid = updatedBuyDataForm[inputIdentifier].valid && formIsValid;
    //     }
    //     console.log(formIsValid);
        
    //     this.setState({ buyDataForm: updatedBuyDataForm, formIsValid, validation });
    // }

    render() {
        // var networkOperators = (!this.props.dataPlans.length ? [] :  [
        //     { value: "MTN", label: "MTN"},
        //     { value: "Airtel", label: "Airtel"},
        //     { value: "Glo", label: "Glo"},
        //     { value: "Etisalat", label: "Etisalat"}
        // ]);
        const { selectedCategory, selectedBiller, billersCategory, billersOptions, billerItems } = this.state;
        if(this.props.billers.length > 0 && this.state.billersCategory == null){
            this.sortBillerCategory(this.props.billers)
        }
        if(this.props.billerItems > 0 && this.state.billerItems == null){
            
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
                            
                                    {(this.props.alert.message) ?
                        <div className="info-label error">{this.props.alert.message} | <span onClick={() => {billersCategory ? alert("fire second api call again") : this.props.fetchBillersCategory(this.state.user.token)}} style={{textDecoration:"underline", cursor:"pointer"}}>Click here to try again</span></div> : null
                        }
                                        <div className="input-ctn">
                                            <label>Select Bill Provider</label>
                                            <Select
                                                value={selectedCategory}
                                                onChange={this.categoryChangedHandler}
                                                options={billersCategory ? billersCategory : [] }
                                                placeholder={this.props.alert.message  ? "Failed. Please try again" : (billersCategory ? "Search..." : "Loading...")}
                                            />
                                           {/* {this.state.validation.networkSelector.hasError ? <small className="text-danger">{this.state.validation.networkSelector.error}</small> : null} */}
                                        </div>

                                        <div className="input-ctn">
                                        <label>Select Bill</label>
                                        <Select
                                                value={selectedBiller != null ? selectedBiller : (billersOptions[0] ? billersOptions[0] : []) }
                                                onChange={this.billerChangedHandler}
                                                options={billersOptions}
                                                placeholder="---"
                                            />
                                        </div>

                                        <div className="input-ctn">
                                        <label>Select Package</label>
                                        <Select
                                                value={selectedBiller != null ? selectedBiller : (billersOptions[0] ? billersOptions[0] : []) }
                                                onChange={this.billerChangedHandler}
                                                options={billersOptions}
                                                placeholder={this.props.alert.message  ? "Failed. Please try again" : (billerItems ? "Select..." : (fetchingItems ? "Loading Packages..." : "---"))}
                                            />
                                        </div>

                                        {/* <div className="input-ctn">
                                        <label>Choose a data plan</label>
                                        <Select
                                                value={selectedDataPlan != null ? selectedDataPlan : dataPlansOptions[0]}
                                                onChange={this.dataPlanChangedHandler}
                                                options={dataPlansOptions}
                                                placeholder="---"
                                            />
                                        </div> */}
                                        

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <button onClick={this.onSubmitBuyData} className="btn-alat m-t-10 m-b-20 text-center">Next</button>
                                                </center>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <center>
                                <Link to={'/bills/paybills'} className="add-bene m-t-50">Go Back</Link>
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
        billers: state.bills_reducer.billers,
        billsInfo : state.bills_reducer.billToPay,
        fetching: state.bills_reducer.isFetchingData,
        pageState: state.bills_reducer.pageState,
        alert: state.alert,
        fetchingItems: state.bills_reducer.isFetchingItems,
        billerItems: state.bills_reducer.billerItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // fetchDataPlans: (token) => dispatch(actions.fetchDataPlans(token)),
        fetchBillersCategory: (token) => dispatch(actions.fetchBillersCategory(token)),
        // setState: () => dispatch(actions.pinVerificationTryAgain()),
        fetchBillerItems: (token, data) => dispatch(actions.fetchBillerItems(token, data)),
        clearError: () => dispatch(alertActions.clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Billers);
