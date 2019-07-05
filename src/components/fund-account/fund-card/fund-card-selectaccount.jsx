import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import AlatPinInput from '../../../shared/components/alatPinInput';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import { alertActions } from '../../../redux/actions/alert.actions';
import * as util from '../../../shared/utils';


class FundCardSelectAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            console.log(this.state);
             //             Amount: "100"
             // CustomerId: 0
             // Pin: ""
             // RecipientAccountNumber: "0232880005"
             // RecipientBank: "035"
             // TokenizedAlias: "My Access card"
            const payload = {
                // 'CardNo': formDataObj.value.cardNumber,
                // 'CVV': formDataObj.value.cvv,
                // 'ExpiryMonth': formDataObj.value.expiry.split(' / ')[0],
                // 'ExpiryYear': formDataObj.value.expiry.split(' / ')[1],
                'Amount': this.state.Amount,
                'RecipientBank': '035',
                'RecipientAccountNumber': this.state.selectedAccount
            };
            this.props.card_details.card_details_data.data.IsLocalCard ?
                this.props.dispatch(actions.fundFromLocalCard(this.state.user.token, payload)) :
                this.props.dispatch(actions.fundFromForeignCard(this.state.user.token, payload));
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

    render() {
        return (
            <Fragment>
                {this.renderBack()}
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">Transaction Details</h4>
                                    <div className="transfer-ctn">
                                        <form onSubmit={(e) => this.handleSubmit(e)}>
                                            <input type="hidden" value="something" />
                                            <span>Transfer from</span>
                                            <div className="al-card no-pad">
                                                <div className="trans-summary-card">
                                                    <div className="name-amount clearfix">
                                                        <p className="pl-name-email">{this.cardDetailStatus() && util.formartCardNumber(this.props.card_details.card_details_data.data.MaskedPan)}
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
    }
}

export default connect(mapStateToProps)(FundCardSelectAccount);
