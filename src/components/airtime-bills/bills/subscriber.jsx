import React, { Component, Fragment } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Input } from '../data/input';

import { checkInputValidation } from '../../../shared/utils';
import Modal from 'react-responsive-modal';
import {alertActions} from "../../../redux/actions/alert.actions";
import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/bills/export';

const pattern = /^\d+$/;
class Subscriber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation:{
                subValid : true,
                amountEmpty : false
            },
            inputSubscriberForm: {
                ref: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                },
                amount: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    valueToDisplay: ''
                },
            },
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
    }


    inputChangedHandler = (event, inputIdentifier) => {
        let validation = {...this.state.validation};
        if(this.props.alert.message) this.props.clearError();
        const updatedinputSubscriberForm = {
            ...this.state.inputSubscriberForm
        }
        const updatedFormElement = {
            ...updatedinputSubscriberForm[inputIdentifier]
        };
        if(inputIdentifier == "ref"){
            updatedFormElement.value = event.target.value;
            if(validation.subValid == false) validation.subValid = true;
            if(updatedFormElement.value.length >= 1){
                if(updatedFormElement.value.length > 30){
                    return;
                }
            }
        }
        if(inputIdentifier == "amount"){
            updatedFormElement.valueToDisplay = event.target.value;
            updatedFormElement.value = updatedFormElement.valueToDisplay.replace(/\,/g, '');
            if(validation.amountEmpty == true) validation.amountEmpty = false;
            if(updatedFormElement.value.length >= 1){
                if(!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 7){
                    return;
                }
                updatedFormElement.valueToDisplay = formatAmountNoDecimal(parseInt(updatedFormElement.value));
            }
        }
        // console.log(updatedFormElement.value)
        updatedinputSubscriberForm[inputIdentifier] = updatedFormElement;
        this.setState({ inputSubscriberForm: updatedinputSubscriberForm, validation });
    }

    goBack =(event) => {
        event.preventDefault();
        this.props.history.goBack();
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.clearError();
        let validation = {...this.state.validation};

        if(this.state.inputSubscriberForm.ref.value == '' || (this.state.inputSubscriberForm.amount.value == '' && !this.props.billsInfo.hasAmount)){
            if(this.state.inputSubscriberForm.ref.value == ''){
                validation.subValid = false;
            }
            if(this.state.inputSubscriberForm.amount.value == '' && !this.props.billsInfo.hasAmount){
                validation.amountEmpty = true;
            }
            this.setState({validation});
            return;
        }

        let payload = {
            PaymentCode: this.props.billsInfo.item.paymentCode,
            SubscriberId: this.state.inputSubscriberForm.ref.value,
        }
        if(this.state.inputSubscriberForm.amount.value != '' && !this.props.billsInfo.hasAmount) {
            let billsData = {
                ...this.props.billsInfo,
                altAmount: parseFloat(this.state.inputSubscriberForm.amount.value)
            }
            this.props.setBillInfo(billsData);
        }
        this.props.getSubscriberName(this.state.user.token, payload)
    }

    


    render() {
        let subscriber = <Redirect to="/bills/paybills/biller" />
        if (this.props.billsInfo != null) {
            const formElementArray = [];
            for (let key in this.state.inputSubscriberForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.inputSubscriberForm[key]
                });
            }
            subscriber = (
                <Fragment>
                    
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Pay Bill</h4>
                                        <div className="transfer-ctn">
                                            <form>
                                                <div className="al-card no-pad">
                                                    <div className="trans-summary-card">
                                                        <div className="name-amount clearfix">
                                                            <p className="pl-name-email">{this.props.billsInfo.biller} <span>{this.props.billsInfo.item.value}</span></p>
                                                            {this.props.billsInfo.hasAmount ? <p className="pl-amount">₦{formatAmountNoDecimal(this.props.billsInfo.item.amount)}</p> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                {(this.props.alert.message) ?
                        <div className="info-label error">{this.props.alert.message}</div> : null
                        }
                                                {formElementArray.map((formElement) => {
                                                    
                                                    return formElement.id == "amount" ? ( !this.props.billsInfo.hasAmount ? (
                                                        <div className="input-ctn" key={formElement.id}>
                                                            <label>Amount</label>
                                                            <Input
                                                                elementType={formElement.config.elementType}
                                                                elementConfig={formElement.config.elementConfig}
                                                                value={formElement.config.valueToDisplay}
                                                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                                            {this.state.validation.amountEmpty ? <small className="text-danger">Field is required</small> : null}
                                                        </div>
                                                    ):null) : (
                                                        <div className="input-ctn" key={formElement.id}>
                                                            <label>{this.props.billsInfo.item.ref}</label>
                                                            <Input
                                                                elementType={formElement.config.elementType}
                                                                elementConfig={formElement.config.elementConfig}
                                                                value={formElement.config.value}
                                                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                                            {!this.state.validation.subValid ? <small className="text-danger">Field is required</small> : null}
                                                        </div>
                                                    )
                                                })}
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button disabled={this.props.fetching} onClick={this.onSubmitForm} className="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Next"}</button>
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
            if (this.props.pageState == 0) {
                let updatedBillsInfo = {
                    ...this.props.billsInfo,
                    subscriberId : this.state.inputSubscriberForm.ref.value
                } 
                this.props.setBillInfo(updatedBillsInfo);
                this.props.resetPageState(2);
                subscriber = <Redirect to="/bills/paybills/confirm" />
            }
        }

        return subscriber;
    }
}

const mapStateToProps = state => {
    return {
        billsInfo : state.bills_reducer.billToPay,
        pageState: state.bills_reducer.pageState,
        alert: state.alert,
        fetching: state.bills_reducer.isFetching,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setBillInfo: (data) => dispatch(actions.setBillInfo(data)),
        getSubscriberName: (token, data) => dispatch(actions.getSubscriberNameEnquiry(token, data)),
        clearError: () => dispatch(alertActions.clear()),
        resetPageState: (code) => dispatch(actions.resetBillPage(code)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriber);
