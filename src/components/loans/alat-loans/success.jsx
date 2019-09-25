import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Switch } from '../../../shared/elements/_toggle';
import successLogo from '../../../assets/img/success.svg';
import { formatAmount } from '../../../shared/utils';
import { alertActions } from "../../../redux/actions/alert.actions";
import { connect } from 'react-redux';

// import * as actions from '../../../redux/actions/dataActions/export';

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setAutomationForm: {
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
            setAutomation: false,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {

    }

    inputChangedHandler = (event, inputIdentifier) => {
        if(this.state.hasError == true) this.setState({hasError : false});
        const updatedSetAutomationForm = {
            ...this.state.setAutomationForm
        }
        const updatedFormElement = {
            ...updatedSetAutomationForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedSetAutomationForm[inputIdentifier] = updatedFormElement;
        this.setState({ setAutomationForm: updatedSetAutomationForm });
    }

    handleToggle = () => {
        this.setState({ saveBeneficiary: !this.state.saveBeneficiary });
    }

    onSubmitSaveForm = (event) => {
        event.preventDefault();
        if(this.state.setAutomationForm.alias.value == ''){
            this.setState({hasError : true});
            return;
        }
        var payload = { 
            Amount: this.props.dataInfo.Amount,
            BillerAlias: this.state.setAutomationForm.alias.value,
            BillerPaymentCode: this.props.dataInfo.BillerPaymentCode,
            PhoneNumber: this.props.dataInfo.PhoneNumber,
            TransactionPin: this.props.dataInfo.TransactionPin,
            NetworkCode : this.props.dataInfo.NetworkCode
        };
        console.log("saving benficiary");
        this.props.onSaveBeneficiary(this.state.user.token, payload);
    }

    goToDashboard = (event) => {
        event.preventDefault();
        // this.props.toDashboard();

    }

    render() {
        var success = <Redirect to='/loans/alat-loans' />
        if (this.props.loanStatusData != null) {
            const formElementArray = [];
            for (let key in this.state.setAutomationForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.setAutomationForm[key]
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
                                    <h5 className="center-text red-text"> You ₦{formatAmount(parseInt(this.props.loanDetail.Amount))} Loan is Aprroved</h5>

                                    <div className="m-t-20 width-400">
                                        {/* <div className="al-card no-pad">
                                            <div className="trans-summary-card">
                                                <div className="name-amount clearfix">
                                                    <p className="pl-name-email">{this.props.network} Data Plan<span>{this.props.dataInfo  ? this.props.dataInfo.PaymentItem : "*******"}</span></p>
                                                    <p className="pl-amount">{this.props.dataInfo ? "₦"+formatAmountNoDecimal(this.props.dataInfo.Amount) : "####"}</p>
                                                </div>
                                            </div>
                                        </div> */}

                                        {<div className="clearfix save-purchase">
                                            <p>Setup a repayment schedule for this loan</p>
                                            <div className="">
                                                <div className="clearfix">
                                                    <div className="pretty p-switch p-fill" >
                                                        <Switch isChecked={this.state.setAutomation} handleToggle={this.handleToggle} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {
                                            this.state.setAutomation ? (
                        //                         <div className="save-purchase-frm">
                        //                             {(this.props.alert.message) ?
                        // <div className="info-label error  m-t-10">{this.props.alert.message}</div> : null
                        // }
                        //                             <form>
                                                            
                        //                                     {formElementArray.map((formElement) => {
                        //                             return (
                        //                                 <div className="input-ctn" key={formElement.id}>
                        //                                     <label>{formElement.config.label}</label>
                        //                                     <Input
                        //                                         elementType={formElement.config.elementType}
                        //                                         elementConfig={formElement.config.elementConfig}
                        //                                         value={formElement.config.value}
                        //                                         changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                        //                                         {this.state.hasError ? <small className="text-danger">Field is required</small> : null}
                        //                                 </div>
                        //                             )

                        //                         })}
                        //                                 <center>
                        //                                     <button disabled={this.props.fetching} onClick={this.onSubmitSaveForm} class="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Save"}</button>
                        //                                 </center>
                        //                             </form>
                        //                         </div>
                        <h1>hollop for Next build</h1>
                                            ) : (
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                            {/* <button onClick={this.goToDashboard} class="btn-alat m-t-10 m-b-20 text-center">Go to Loan Page</button> */}
                                                                <Link to={'/loan/alat-loans'} className="btn-alat m-t-10 m-b-20 text-center">Go to Loan Page</Link>
                                                            </center>
                                                        </div>
                                                    </div>
                                                )
                                        }

                                        {/* <div className="save-purchase-form">
						  					<form>
								                <div className="input-ctn">
								                    <label>Give it a name</label>
								                    <input type="text" />
								                </div>
								            </form>
								        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
        if(this.props.pageState == 0) {
            this.props.resetPageState(2);
            success = <Redirect to="/loans/alat-loans" />
        }

        return success;
    }
}

const mapStateToProps = state => {
    return {
        // accounts: state.data_reducer.debitableAccounts,
        loanDetail: state.alat_loan_reducer.loanDetail,
        loanStatusData: state.alat_loan_reducer.loanStatusData,
        phoneNumber: state.authentication.user.phoneNo,
        pageState: state.alat_loan_reducer.pageState,
        alert: state.alert,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // sendLoanDetail: (token, data, resending) => dispatch(actions.sendLoan(token, data, resending)),
        // resetPageState: (code) => dispatch(actions.resetPageState(code)),
        clearError: () => dispatch(alertActions.clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
