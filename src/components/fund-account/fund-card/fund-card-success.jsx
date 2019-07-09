import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { Switch } from '../../../shared/elements/_toggle';
import { cc_format, formatCardExpiryDate, checkValue } from '../../../shared/utils';

import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import { alertActions } from '../../../redux/actions/alert.actions';
import successImg from '../../../assets/img/success.svg';

class FundCardSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saveCard: false,
            Alias: "",
            aliasInvalid: false,
            isSubmitted: false
        };
    }

    componentDidMount(){
        this.init();
    }

    init = () => {
        if (this.testFundAccount()) {

        } else {
            this.props.history.push("/fund");
        }
    }

    testFundAccount = () => {
        if (this.props.fund_account.fund_account_status === fundAccountConstants.FUND_ACCOUNT_SUCCESS) {
            return true;
        }
    }



    handleToggle = () => {
        this.setState({ saveCard: !this.state.saveCard });
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if (this.state.isSubmitted == true)
            if (e.target.value != "")
                this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitSaveForm = (e) => {
        var payload = {

        }
        this.props.dispatch(actions.saveCardAfterTransaction(this.state.user.token, payload))
    }

    validateAlias = () => {
        if (this.state.Alias == "")
            this.setState({ aliasInvalid: true }, () => {
                return true;
            })
    }

    returnAccountName = (accountNumber) => {
        if (this.props.accounts.debitable_accounts_data)
            var _account = this.props.accounts.debitable_accounts_data.data.find(account => account.AccountNumber == accountNumber);
        return _account.AccountDescription;
    }

    isCardSavedBefore = () => {
        if (this.props.card_details.card_details_data)
            if (this.props.card_details.card_details_data.data.isBene)
                return true;
    }

    saveSuccesAction=()=>{
        if(this.props.save_card.saveafter_trans_status == fundAccountConstants.SAVEAFTER_TRANSACTION_SUCCESS){
            this.props.dispatch(actions.clearAirtimeStore(fundAccountConstants.FUND_ACCOUNT_REDUCER_CLEAR));
        return( <Redirect to={"/fund/card"}/>  );
        }
    }

    render() {
        return (
            <Fragment>
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="max-600">
                                <div class="al-card">
                                    <center>
                                        <img src={successImg} class="m-b-30 m-t-20" />
                                    </center>
                                    <h4 class="center-text red-text">Transfer was successful</h4>
                                    <div class="m-t-20 width-400">
                                        <div class="al-card no-pad">
                                            <div class="trans-summary-card">
                                                <div class="name-amount clearfix">
                                                    <p class="pl-name-email">{this.testFundAccount() && this.returnAccountName(this.props.fund_account.fund_acount_data.data.request.RecipientAccountNumber)}
                                                        <span>{this.testFundAccount() && this.props.fund_account.fund_acount_data.data.request.RecipientAccountNumber}</span></p>
                                                    {/* <p class="pl-amount">N5,000<br /><span>Account Balance</span></p> */}
                                                </div>
                                            </div>
                                        </div>

                                        {this.isCardSavedBefore() && <div className="clearfix save-purchase">
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
                                                        <Switch isChecked={this.state.saveCard} handleToggle={this.handleToggle} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {
                                            this.state.saveCard ? (
                                                <div className="save-purchase-frm">
                                                    <form>
                                                        <div className={this.state.aliasInvalid ? "input-ctn form-error" : "input-ctn"}>
                                                            <label>Enter Alias</label>
                                                            <input
                                                                name="Alias"
                                                                type="text"
                                                                value={this.state.Alias}
                                                                maxLength="25"
                                                                onChange={this.handleInputChange} />
                                                        </div>

                                                        <center>
                                                            <button onClick={this.onSubmitSaveForm} className="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.save_card.saveafter_trans_status == fundAccountConstants.SAVEAFTER_TRANSACTION_PENDING ? "Saving..." : "Save Card"}
                                                                </button>
                                                        </center>
                                                    </form>
                                                </div>
                                            ) : (
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                                <button onClick={() => { this.props.dispatch(clearAirtimeStore(fundAccountConstants.FUND_ACCOUNT_REDUCER_CLEAR)); 
                                                                    this.props.history.push('/dashboard') }} className="btn-alat m-t-10 m-b-20 text-center">Go to Dashboard</button>
                                                                {/* <Link to={'/dashboard'} className="btn-alat m-t-10 m-b-20 text-center">Go to Dashboard</Link> */}
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
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        //fundwith_tokencard: state.fundAccountReducerPile.fundFromCardToken,
        //fundwith_pin: state.fundAccountReducerPile.fundfromWithPin,
        card_details: state.fundAccountReducerPile.cardDetails,
        fund_account: state.fundAccountReducerPile.fundAccount,
        save_card: state.fundAccountReducerPile.saveTransCard
    };
}

export default connect(mapStateToProps)(FundCardSuccess);