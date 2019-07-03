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
            isValid: true,
            inputSubscriberForm: {
                ref: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                },
            },
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
    }


    inputChangedHandler = (event, inputIdentifier) => {
        // let validation = { ...this.state.validation };
        // validation.pinError.hasError = false;
        if(this.state.isValid == false) this.setState({isValid : true})
        const updatedinputSubscriberForm = {
            ...this.state.inputSubscriberForm
        }
        console.log()
        const updatedFormElement = {
            ...updatedinputSubscriberForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        // if(updatedFormElement.value.length >= 1){
        //     if(!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 4){
        //         return;
        //     }
        // }
        // updatedFormElement.valid = checkInputValidation(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.valid = true;
        // updatedFormElement.touched = true;
        updatedinputSubscriberForm[inputIdentifier] = updatedFormElement;

        // let formIsValid = true;
        // for (let inputIdentifier in updatedinputSubscriberForm) {
        //     formIsValid = updatedinputSubscriberForm[inputIdentifier].valid && formIsValid;
        // }
        // console.log(formIsValid);
        this.setState({ inputSubscriberForm: updatedinputSubscriberForm });
    }


    goBack =(event) => {
        event.preventDefault();
        this.props.history.goBack();
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.clearError();
        if(this.state.inputSubscriberForm.ref.value == ''){
            this.setState({isValid : false});
            return;
        }
        alert("ok");
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
                                                <div class="al-card no-pad">
                                                    <div class="trans-summary-card">
                                                        <div class="name-amount clearfix">
                                                            <p class="pl-name-email">{this.props.billsInfo.biller} <span>{this.props.billsInfo.item.value}</span></p>
                                                            <p class="pl-amount">N{formatAmountNoDecimal(this.props.billsInfo.item.amount)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {(this.props.alert.message) ?
                        <div className="info-label error">{this.props.alert.message}</div> : null
                        }
                                                {formElementArray.map((formElement) => {
                                                    return (
                                                        <div className="input-ctn" key={formElement.id}>
                                                            <label>{this.props.billsInfo.item.ref}</label>
                                                            <Input
                                                                elementType={formElement.config.elementType}
                                                                elementConfig={formElement.config.elementConfig}
                                                                value={formElement.config.value}
                                                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                                            {!this.state.isValid ? <small className="text-danger">Field is required</small> : null}
                                                        </div>
                                                    )
                                                })}
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button disabled={this.props.fetching} onClick={this.onSubmitForm} className="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Buy Data"}</button>
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
            // if (this.props.pageState == 0) {
            //     this.props.resetPageState();
            //     subscriber = <Redirect to="/bills/data/buy/verify" />
            // }
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
        // set: () => dispatch(actions.pinVerificationTryAgain()),
        clearError: () => dispatch(alertActions.clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriber);
