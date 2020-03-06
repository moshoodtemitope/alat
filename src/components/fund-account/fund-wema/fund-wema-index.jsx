import React from 'react';
import { connect } from 'react-redux';

import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import { alertActions } from '../../../redux/actions/alert.actions';
import { numberWithCommas } from '../../../shared/utils';


class FundWemaIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            accountToDebit: "",
            accountToCredit: "",
            Amount: "",
            accountToDebitInValid: false,
            accountToCreditInValid: false,
            AmountInvalid: false,
            isSubmit: false,
            formattedValue: "",
            // accountObj1: {
            //     label: "seljjjl;h"
            // }
        }
        this.handleDebit = this.handleDebit.bind(this);
        this.handleCredit = this.handleCredit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDebit = (account, accountObj) => {
        // console.log(accountObj);
        // this.setState({accountObj1 : accountObj}, ()=>{ 
        //     console.log(this.state.accountObj1.label);
        // });
        this.setState({ accountToDebit: account });
        if (this.state.isSubmit) {
            if (account.length == 10)
                this.setState({ accountToDebitInValid: false });
        }
    }

    handleCredit = (account) => {
        //console.log(account);
        this.setState({ accountToCredit: account });
        if (this.state.isSubmit) {
            if (account != "")
                this.setState({ accountToCreditInValid: false });
        }
    }

    validateAmount = (amount) => {
        if (amount == "") {
            this.setState({ AmountInvalid: true });
            return true;
        }
    };

    handleAmount = (e) => {
        this.setState({ "Amount": e.target.value });
        if (this.state.isSubmit) {
            if (e.target.value != "")
                this.setState({ AmountInvalid: false });
        }
    };

    validateAccountNumber(account, state) {
        if (account.length != 10) {
            this.setState({ [state]: true });
            return true;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSubmit: true });
        if (this.validateAccountNumber(this.state.accountToDebit, "accountToDebitInValid") ||
            this.validateAccountNumber(this.state.accountToCredit, "accountToCreditInValid") ||
            this.validateAmount(this.state.Amount)) {
            //not valid
        }
        else {
            if (this.state.accountToDebit === this.state.accountToCredit) {
                this.props.dispatch(alertActions.error("You cannot select the same account"));
                return;
            } else {
                this.props.dispatch(actions.fundAlatWemaAccount(this.state.user.token, {
                    'Amount': this.state.Amount,
                    'DebitAccountNumber': this.state.accountToDebit,
                    'reason': "",
                    'CreditAccountNumber': this.state.accountToCredit
                    //'debit': this.state.
                }
                ));
            }
        }
    }

    render() {

        const {AmountInvalid, Amount} =this.state
        if (this.props.fundwema.fund_account_status === fundAccountConstants.FUND_ALAT_WEMA_SUCCESS)
            this.props.history.push("/fund/wema/success")
        return (
            <div className="al-card no-pad">
                <h4 className="m-b-10 center-text hd-underline">Fund Account</h4>

                <div className="transfer-ctn">
                    <form onSubmit={this.handleSubmit}>
                        {this.props.alert && this.props.alert.message &&
                            <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                        }
                        <SelectDebitableAccounts
                            labelText={"Transfer from"}
                            value={this.state.accountObj1}
                            accountInvalid={this.state.accountToDebitInValid}
                            onChange={this.handleDebit}
                        />

                        <SelectDebitableAccounts
                            value={this.state.accountObj2}
                            accountInvalid={this.state.accountToCreditInValid}
                            onChange={this.handleCredit}
                            labelText={"Transfer to"} />

                        {/* <div className="input-ctn">
                        <label>Amount</label>
                        <input type="tel" />
                    </div> */}
                        {/* <AmountInput
                        value={this.state.formattedValue}
                        name="amount"
                        intValue={this.state.Amount}
                        onChange={this.handleAmount}
                        AmountInvalid={this.state.AmountInvalid}
                    /> */}

                        <div className="inputctn-wrap">
                            <label htmlFor="Amount">Amount</label>

                            <input type="text"
                                onChange={this.handleAmount}
                                onKeyUp={this.handleAmount}
                                autoComplete="off" name="amount" value={numberWithCommas(Amount)} />
                            {AmountInvalid &&
                                <span className="limit-text">Enter a Valid Amount</span>
                            }

                            {/* <AmountInput 
                                                    value={formattedValue} 
                                                    intValue={AmountToSend}  name="Amount" onKeyUp={this.handleAmount}  onChange={this.handleAmount}/>
                                                            {isMorthanLimit===true &&
                                                                <span className="limit-text">{this.state.amountError}</span>
                                                            } */}


                        </div>


                        <div className="row">
                            <div className="col-sm-12">
                                <center>
                                    <button type="submit" value="Fund Account" className="btn-alat m-t-10 m-b-20 text-center">
                                        {this.props.fundwema.fund_account_status === fundAccountConstants.FUND_ALAT_WEMA_PENDING ? "Processing..." : "Fund Account"}
                                    </button>
                                </center>
                            </div>
                        </div>
                    </form>
                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        fundwema: state.fundAccountReducerPile.fundwema_alat
    };
}
export default connect(mapStateToProps)(FundWemaIndex);