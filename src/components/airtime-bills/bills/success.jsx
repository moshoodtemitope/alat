import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Switch } from '../../../shared/elements/_toggle';
import { Input } from '../data/input';
import successLogo from '../../../assets/img/success.svg';
import { formatAmountNoDecimal } from '../../../shared/utils';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/bills/export';

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveBeneficiaryForm: {
                alias: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: '',
                    },
                    value: '',
                    label: 'Give it a name'
                },
            },
            hasError: false,
            saveBeneficiary: false,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        console.log("isfromBene" + this.props.isFromBeneficiary);
        // this.props.fetchDebitableAccounts(this.state.user.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        if (this.state.hasError == true) this.setState({ hasError: false });
        const updatedSaveBeneficiaryForm = {
            ...this.state.saveBeneficiaryForm
        }
        const updatedFormElement = {
            ...updatedSaveBeneficiaryForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedSaveBeneficiaryForm[inputIdentifier] = updatedFormElement;
        this.setState({ saveBeneficiaryForm: updatedSaveBeneficiaryForm });
    }

    handleToggle = () => {
        this.setState({ saveBeneficiary: !this.state.saveBeneficiary });
    }

    onSubmitSaveForm = (event) => {
        event.preventDefault();
        if (this.state.saveBeneficiaryForm.alias.value == '') {
            this.setState({ hasError: true });
            return;
        }
        var payload = {
            Amount: this.props.billsInfo.item.amount,
            BillerAlias: this.state.saveBeneficiaryForm.alias.value,
            BillerPaymentCode: this.props.billsInfo.item.paymentCode,
            SubscriberID: this.props.billsInfo.subscriberId,
            TransactionPin: this.props.billsInfo.TransactionPin,
        };
        console.log("saving benficiary");
        this.props.onSaveBeneficiary(this.state.user.token, payload);
    }

    goToDashboard = (event) => {
        event.preventDefault();
        this.props.toDashboard();
    }

    render() {
        var success;
        if (this.props.billsInfo != null && this.props.pageState == 2) {
            const formElementArray = [];
            for (let key in this.state.saveBeneficiaryForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.saveBeneficiaryForm[key]
                });
            }
            success = (
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card">
                                    <center>
                                        <img src={successLogo} className="m-b-30 m-t-20" alt="Success" />
                                    </center>
                                    <h4 className="center-text red-text">Recharge Successful</h4>

                                    <div className="m-t-20 width-400">
                                        <div className="al-card no-pad">
                                            <div className="trans-summary-card">
                                                <div className="name-amount clearfix">
                                                    <p className="pl-name-email">{this.props.billsInfo ? this.props.billsInfo.biller : "*****"}<span>{this.props.billsInfo ? this.props.billsInfo.item.value : "*******"}</span></p>
                                                    <p className="pl-amount">{this.props.billsInfo ? "₦" + formatAmountNoDecimal(this.props.billsInfo.item.amount) : "####"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {this.props.isFromBeneficiary ? null : <div className="clearfix save-purchase">
                                            <p>Save this purchase</p>
                                            <div className="">
                                                <div className="clearfix">
                                                    <div className="pretty p-switch p-fill" >
                                                        <Switch isChecked={this.state.saveBeneficiary} handleToggle={this.handleToggle} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {
                                            this.state.saveBeneficiary ? (
                                                <div className="save-purchase-frm">
                                                    {(this.props.alert.message) ?
                                                        <div className="info-label error  m-t-10">{this.props.alert.message}</div> : null
                                                    }
                                                    <form>

                                                        {formElementArray.map((formElement) => {
                                                            return (
                                                                <div className="input-ctn" key={formElement.id}>
                                                                    <label>{formElement.config.label}</label>
                                                                    <Input
                                                                        elementType={formElement.config.elementType}
                                                                        elementConfig={formElement.config.elementConfig}
                                                                        value={formElement.config.value}
                                                                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                                                    {this.state.hasError ? <small className="text-danger">Field is required</small> : null}
                                                                </div>
                                                            )

                                                        })}
                                                        <center>
                                                            <button disabled={this.props.fetching} onClick={this.onSubmitSaveForm} class="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Save"}</button>
                                                        </center>
                                                    </form>
                                                </div>
                                            ) : (
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                                <button onClick={this.goToDashboard} class="btn-alat m-t-10 m-b-20 text-center">Go to Dashboard</button>
                                                            </center>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.pageState == 3) {
            console.log("going to dashboard no post");
            this.props.resetPageState(2);
            this.props.clearBillsInfo();
            success = <Redirect to="/dashboard" />
        } else if (this.props.pageState == 0) {
            this.props.resetPageState(2);
            this.props.clearBillsInfo();
            console.log("going to dashboard post");
            success = <Redirect to="/dashboard" />
        } else {
            console.log("success to not allowed ");
            success = <Redirect to="/bills/paybills/biller" />
        }

        return success;
    }
}

const mapStateToProps = state => {
    return {
        billsInfo: state.bills_reducer.billToPay,
        pageState: state.bills_reducer.pageState,
        alert: state.alert,
        fetching: state.bills_reducer.isFetching,
        phoneNumber: state.authentication.user.phoneNo || state.authentication.user.response.phoneNo,
        otpPayload: state.bills_reducer.otpData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPageState: (code) => dispatch(actions.resetBillPage(code)),
        onSaveBeneficiary: (token, data) => dispatch(actions.saveBillsBeneficiary(token, data)),
        toDashboard: () => dispatch(actions.goToDashboard()),
        clearBillsInfo : () => dispatch(actions.clearBillsInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
