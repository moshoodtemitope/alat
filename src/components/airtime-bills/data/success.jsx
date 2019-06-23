import React, { Component } from 'React';
import { Link, Redirect } from 'react-router-dom';

import { Switch } from '../../../shared/elements/_toggle';
import successLogo from '../../../assets/img/success.svg';

import { checkInputValidation } from '../../../shared/utils';

import { formatAmountNoDecimal, formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/dataActions/export';

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveBeneficiaryForm: {
                phone: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                },
            },
            hasError: false,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        // this.props.fetchDebitableAccounts(this.state.user.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        if(this.state.hasError == true){
            this.setState({hasError : false});
        }
        const updatedSaveBeneficiaryForm = {
            ...this.state.saveBeneficiaryForm
        }
        const updatedFormElement = {
            ...updatedSaveBeneficiaryForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = checkInputValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = true;
        updatedFormElement.touched = true;
        updatedSaveBeneficiaryForm[inputIdentifier] = updatedFormElement;

        this.setState({ confirmDataForm: updatedConfirmDataForm });
    }

    handleToggle = () => {
        this.setState({ saveBeneficiary: !this.state.saveBeneficiary });
    }

    render() {
        let success = <Redirect to="/bills/data/buy" />
        if (this.props.dataInfo == null) {
            const formElementArray = [];
            for (let key in this.state.confirmDataForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.confirmDataForm[key]
                });
            }
            if (this.props.accounts.length >= 1 && !this.state.confirmDataForm.activeAccount.loaded) {
                this.sortAccountsForSelect();
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
                                                        <div className="input-ctn">
                                                            <label>Give it a name</label>
                                                            <input type="text" />
                                                        </div>
                                                        <center>
                                                            <button onClick={this.onSubmitBuyData} class="btn-alat m-t-10 m-b-20 text-center">Save</button>
                                                        </center>
                                                        
                                                    </form>
                                                </div>
                                            ) : (
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                                <Link to={'/dashboard'} className="btn-alat m-t-10 m-b-20 text-center">Go to Dashboard</Link>
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

        return success;
    }
}

const mapStateToProps = state => {
    return {
        dataInfo: state.data_reducer.dataToBuy,
        dataPlans: state.data_reducer.dataPlans,
        accounts: state.data_reducer.debitableAccounts,
        network: state.data_reducer.network,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token) => dispatch(actions.fetchDebitableAccounts(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
