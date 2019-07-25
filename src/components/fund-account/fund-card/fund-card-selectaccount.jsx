import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import AlatPinInput from '../../../shared/components/alatPinInput';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import { alertActions } from '../../../redux/actions/alert.actions';
import * as utils from '../../../shared/utils';


class FundCardSelectAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            // accountNumber : "",
            selectedAccount: "",
            accountToDebit: "",
            isAccountInvalid: false,
            Pin: "",
            isPinInvalid: false,
            Amount: "",
            AmountInvalid: false,
            formattedValue: "",
            formSubmitted: false
        }
    }


    componentDidMount() {
        if (this.props.card_details)
            if (this.props.card_details.card_details_status === fundAccountConstants.FUNDCARD_DETAILS_SUCCESS) {
                console.log(this.props.card_details.card_details_data.data);
            } else {
                this.props.history.push("/fund/card")
            }
        else this.props.history.push("/fund/card");
    }

    cardDetailStatus() {
        return this.props.card_details.card_details_status === fundAccountConstants.FUNDCARD_DETAILS_SUCCESS ? true : false
    }

    handleAlatPinChange = (pin) => {
        this.setState({ Pin: pin })
        if (this.state.formSubmitted) {
            if (pin.length != 4)
                this.setState({ isPinInvalid: false })
        }
    }

    handleAmount = (e) => {
        // console.log(this.intValue);
        this.setState({ Amount: e });
        if (this.state.formSubmitted) {
            if (e != "")
                this.setState({ AmountInvalid: false });
        }
    }

    checkAmount = () => {
        if (this.state.Amount == "") {
            this.setState({ AmountInvalid: true });
            return true;
        }
    }

    handleSelectDebitableAccounts = (account) => {
        this.setState({ selectedAccount: account })
        if (this.state.formSubmitted) {
            if (account.length == 10)
                this.setState({ isAccountInvalid: false })
        }
    }

    checkPin() {
        if (this.state.Pin.length != 4) {
            this.setState({ isPinInvalid: true })
            return true;
        }
    }

    checkAccountNumber() {
        if (this.state.selectedAccount.length != 10) {
            this.setState({ isAccountInvalid: true })
            return true;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitted: true });
        //console.log(e);
        //console.log(this.state)
        if (this.checkAccountNumber() || this.checkAmount() || this.checkPin()) {

        } else {
            if (this.props.card_details.card_details_data.data.isBene) {
                var payload = { //payload for existing saved card.
                    Amount: this.state.Amount,
                    CustomerId: 0,
                    Pin: this.state.Pin,
                    RecipientAccountNumber: this.state.selectedAccount,
                    RecipientBank: "035",
                    TokenizedAlias: this.props.card_details.card_details_data.data.TokenizedAlias
                };

                this.props.dispatch(actions.fundFromTokenizedCard(this.state.user.token, payload));
            } else {
                this.props.dispatch(actions.getEncryptionRule(this.state.user.token));
            }
        }
    }

    OnBackClick = () => {
        this.props.dispatch(actions.ClearAction(fundAccountConstants.FUNDCARD_DETAILS_CLEAR));
    }



    renderBack = () => {
        if (this.props.card_details.card_details_status === fundAccountConstants.FUNDCARD_DETAILS_CLEAR)
            // if(this.props.card_details.card_details_data.data.isBene)
            // return ( <Redirect to={"/fund/card"}/>)
            // else 
            return (<Redirect to={"/fund/card/details"} />)
    }

    fundfromNewCard = () => {
        if (this.props.encryption_rule.encryption_rule_status == fundAccountConstants.ENCRYPTION_RULE_SUCCESS) {
            var eRule = this.props.encryption_rule.encryption_rule_data.response;
            console.log(this.props.card_details.card_details_data);
            this.props.dispatch(actions.ClearAction(fundAccountConstants.ENCRYPTION_RULE_CLEAR));
            this.props.dispatch(actions.verifyPAN(this.state.user.token, { PAN: utils.encryptTransactionData(this.props.card_details.card_details_data.data.CardPan, eRule) }))

            var payload = {
                //Payload for "CardToAccountTransferWithPIN"    
                Amount: this.state.Amount,
                CVV: utils.encryptTransactionData(this.props.card_details.card_details_data.data.Cvv, eRule),
                CardPIn: utils.encryptTransactionData(this.state.Pin, eRule),
                ExpiryMonth: utils.encryptTransactionData(this.props.card_details.card_details_data.data.ExpiryMonth, eRule),
                ExpiryYear: utils.encryptTransactionData(this.props.card_details.card_details_data.data.ExpiryYear, eRule),
                RecipientAccountNumber: this.state.selectedAccount,
                RecipientBank: "035"
            };

            if (this.props.verify_pan.verify_pan_status == fundAccountConstants.VERIFY_PAN_SUCCESS) {
                this.props.dispatch(actions.ClearAction(fundAccountConstants.VERIFY_PAN_CLEAR));
                this.props.dispatch(actions.fundFromCardWithPin(this.state.user.token, payload));
                if (this.props.fund_account.fund_account_status == fundAccountConstants.FUND_ACCOUNT_SUCCESS) {
                   // this.props.dispatch(actions.ClearAction(fundAccountConstants.FUNDFROM_CARDWITH_PIN_FAILURE)) //
                    return (<Redirect to={"/fund/card/success"} />);
                }
            }
        }
    }

    render() {
        return (
            <Fragment>
                {this.renderBack()}
                {this.fundfromNewCard()}
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">Transaction Details</h4>
                                    <div className="transfer-ctn">
                                        <form onSubmit={(e) => this.handleSubmit(e)}>
                                            <input type="hidden" value="something" />
                                            {this.props.alert && this.props.alert.message &&
                                                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                            }
                                            <span>Transfer from</span>
                                            <div className="al-card no-pad">
                                                <div className="trans-summary-card">
                                                    <div className="name-amount clearfix">
                                                        <p className="pl-name-email">{this.cardDetailStatus() && utils.formartCardNumber(this.props.card_details.card_details_data.data.MaskedPan)}
                                                            <span>Expires : {this.cardDetailStatus() && this.props.card_details.card_details_data.data.ExpiryMonth}/
                                                {this.cardDetailStatus() && this.props.card_details.card_details_data.data.ExpiryYear}</span></p>
                                                        <p className="pl-amount"></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <SelectDebitableAccounts
                                                value={this.state.accountNumber}
                                                accountInvalid={this.state.isAccountInvalid}
                                                onChange={this.handleSelectDebitableAccounts}
                                                labelText={"Transfer to"}
                                            />

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <AmountInput value={this.state.formattedValue}
                                                        onChange={this.handleAmount} name="Amount"
                                                        intValue={this.state.Amount}
                                                        AmountInvalid={this.state.AmountInvalid} />
                                                </div>
                                                <div className="col-sm-6">
                                                    <AlatPinInput
                                                        value={this.state.Pin}
                                                        onChange={this.handleAlatPinChange}
                                                        PinInvalid={this.state.isPinInvalid}
                                                        maxLength={4} />
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <input type="submit" value="Fund Account" className="btn-alat m-t-10 m-b-20 text-center" />
                                                    </center>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <center>
                                    <a style={{ cursor: "pointer" }} onClick={this.OnBackClick} className="add-bene m-t-50">Go Back</a>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>);
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        card_details: state.fundAccountReducerPile.cardDetails,
        encryption_rule: state.encrypt_rule,
        verify_pan: state.verify_pan,
       // fundwith_tokencard: state.fundAccountReducerPile.fundFromCardToken,
       // fundwith_pin: state.fundAccountReducerPile.fundfromWithPin,
        fund_account: state.fundAccountReducerPile.fundAccount
    }
}

export default connect(mapStateToProps)(FundCardSelectAccount);
