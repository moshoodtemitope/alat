import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Switch } from '../../../shared/elements/_toggle';
import { Input } from './input';
import successLogo from '../../../assets/img/success.svg';

import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/dataActions/export';

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
        // this.props.fetchDebitableAccounts(this.state.user.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // if(this.state.hasError == true){
        //     this.setState({hasError : false});
        // }
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

    onSubmitSaveForm = () => {
        var payload = { 
            Amount: this.props.dataInfo.Amount,
            BillerAlias: this.state.saveBeneficiaryForm.alias.value,
            BillerPaymentCode: this.props.dataInfo.BillerPaymentCode,
            PhoneNumber: this.props.dataInfo.PhoneNumber,
            TransactionPin: this.props.TransactionPin,
            NetworkCode : this.props.dataInfo.NetworkCode
        };

        this.props.onSaveBeneficiary(this.state.user.token, payload);
    }

    goToDashboard = () => {
        this.props.toDashboard();
    }

    render() {
        let success = <Redirect to="/bills/data/buy" />
        if (this.props.dataInfo != null) {
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
                                                    <p className="pl-name-email">{this.props.network} Data Plan<span>{this.props.dataInfo  ? this.props.dataInfo.PaymentItem : "*******"}</span></p>
                                                    <p className="pl-amount">{this.props.dataInfo ? this.props.dataInfo.Amount : "####"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="clearfix save-purchase">
                                            <p>Save this purchase</p>
                                            <div className="">
                                                <div className="clearfix">
                                                    {/* <div className="pretty p-switch p-fill">
												        <input type="checkbox" />
												        <div className="state p-danger">
												            <label></label>
												        </div>
                                                    </div> */}
                                                    <div className="pretty p-switch p-fill" >
                                                        <Switch isChecked={this.state.saveBeneficiary} handleToggle={this.handleToggle} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.saveBeneficiary ? (
                                                <div className="save-purchase-frm">
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
                                                        </div>
                                                    )

                                                })}
                                                        <center>
                                                            <button onClick={this.onSubmitSaveForm} class="btn-alat m-t-10 m-b-20 text-center">Save</button>
                                                        </center>
                                                    </form>
                                                </div>
                                            ) : (
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                            <button onClick={this.goToDashboard} class="btn-alat m-t-10 m-b-20 text-center">Go to Dashboard</button>
                                                                {/* <Link to={'/dashboard'} className="btn-alat m-t-10 m-b-20 text-center">Go to Dashboard</Link> */}
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
            if (this.props.pageState == 3) {
                this.props.resetPinState();
                success = <Redirect to="/dashboard" />
            }
            if (this.props.pageState == 0) {
                this.props.resetPinState();
                success = <Redirect to="/bills/data" />
            }
        }

        return success;
    }
}

const mapStateToProps = state => {
    return {
        dataInfo: state.data_reducer.dataToBuy,
        dataPlans: state.data_reducer.dataPlans,
        accounts: state.data_reducer.debitableAccounts,
        network: state.data_reducer.network,
        pageState: state.data_reducer.pinVerified
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPinState: () => dispatch(actions.pinVerificationTryAgain()),
        fetchDebitableAccounts: (token) => dispatch(actions.fetchDebitableAccounts(token)),
        onSaveBeneficiary:(token, data) => dispatch(actions.saveBeneficiary(token, data)),
        toDashboard: () => dispatch(actions.clearDataInfoNoPost())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
