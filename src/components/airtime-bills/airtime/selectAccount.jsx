import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Select } from 'react-select';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AlatPinInput from '../../../shared/components/alatPinInput';
import * as utils from '../../../shared/utils';
import AmountInput from '../../../shared/components/amountInput';


// Component to select account number to bill and accepts PIN
//Component also displays bill and returns submit action to the calling component.
class SelectAcount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Pin: "",
            isPinInvalid: false,
            selectedAccount: "",
            isAccountInvalid: false,
            isSubmitted: false,
            AmountInvalid: false,
            Amount:"",
            formattedValue:""

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAlatPinChange = this.handleAlatPinChange.bind(this);
        this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);
        this.handleAmount = this.handleAmount.bind(this);

    }

    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }

    handleSelectDebitableAccounts(account) {
        this.setState({ selectedAccount: account })
        if (this.state.isSubmitted) { 
            if(account.length == 10)
            this.setState({ isAccountInvalid: false })
         }
    }

    checkPin() {
        if (this.state.Pin.length != 4) {
            this.setState({ isPinInvalid: true })
            return true;}
    }
    handleAmount = (e) => {
        // console.log(this.intValue);
        this.setState({ "Amount": e });
        if (this.state.formsubmitted) {
            if (e != "")
                this.setState({ AmountInvalid: false });
        }
    }

    checkAccountNumber() {
        if (this.state.selectedAccount.length != 10) {
            this.setState({ isAccountInvalid: true })
            return true;
        }
    }
    checkAmount = () => {
        if (this.state.Amount == "") {
            this.setState({ AmountInvalid: true });
            return true;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isSubmitted: true });
        if (this.checkAccountNumber() || this.checkPin()) {

        }
        else {
            // alert("sucess");
            this.props.submitAction({ TransactionPin: this.state.Pin, AccountNumber: this.state.selectedAccount, Amount: this.state.Amount, });
        }
    }

    render() {
        const { formattedValue, Amount, AmountInvalid} =this.state

        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">{this.props.bill.ActionText}</h4>

                                <div className="transfer-ctn">
                                    {/* {this.props.alert && this.props.alert.message &&
                                        <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                    } */}
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="al-card no-pad">
                                            <div className="trans-summary-card">
                                                <div className="name-amount clearfix">
                                                    <p className="pl-name-email">{this.props.bill.billCategory}<span>{this.props.bill.BillerName} - {this.props.bill.valueRecipent} </span></p>
                                                    <p className="pl-amount">N{this.props.bill.Amount && utils.formatAmount(this.props.bill.Amount)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <SelectDebitableAccounts
                                            value={this.state.accountNumber}
                                            currency="NGN"
                                            accountInvalid={this.state.isAccountInvalid}
                                            onChange={this.handleSelectDebitableAccounts} 
                                            labelText={"Select an account to debit"}/>

                                        <AmountInput
                                            value={formattedValue}
                                            onChange={this.handleAmount}
                                            name="Amount"
                                            intValue={Amount}
                                            AmountInvalid={AmountInvalid} />

                                        <AlatPinInput
                                            value={this.state.Pin}
                                            onChange={this.handleAlatPinChange}
                                            PinInvalid={this.state.isPinInvalid}
                                            maxLength={4} />

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <button type="submit" disabled={this.props.submitBusy} className="btn-alat m-t-10 m-b-20 text-center">{this.props.submitBusy ? "Processing..." : this.props.bill.ActionText}</button>
                                                </center>
                                                {this.props.alert && this.props.alert.message &&
                                                    <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <center>
                                {/* '/bills/airtime/buy' */}
                                <Link to={this.props.backLink} className="add-bene m-t-50">Go Back</Link>
                            </center>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        alert: state.alert
    };
}

export default connect(mapStateToProps)(SelectAcount);