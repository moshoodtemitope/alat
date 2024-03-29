import React, { Component, Fragment } from 'react';
import InnerContainer from "../../../shared/templates/inner-container";
import TransferContainer from "../container";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import AlatPinInput from '../../../shared/components/alatPinInput';
import * as utils from '../../../shared/utils';
import {connect} from "react-redux";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import { numberWithCommas } from '../../../shared/utils';
import "./../transfer.scss";
import {senderTransferData, 
        getTransactionLimit,
        getBankTransferCharges} from "../../../redux/actions/transfer/cash-transfer.actions";
import {
    TRANSFER__BANK_DETAILS,
    GET_TRANSACTION_LIMIT_PENDING, 
    GET_TRANSACTION_LIMIT_SUCCESS, 
    GET_BANKCHARGES_PENDING,
    GET_BANKCHARGES_SUCCESS, 
    GET_BANKCHARGES_FAILURE,
    GET_TRANSACTION_LIMIT_FAILURE,} from "../../../redux/constants/transfer.constants";

class ProvideDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            Pin: "",
            isPinInvalid: false,
            selectedAccount: "",
            AmountToSend :"",
            Amount:"",
            isAccountInvalid: false,
            isSubmitted: false,
            accountData:{},
            recipientEmail: ''
        };
        // this.verifyTransferStage();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAlatPinChange = this.handleAlatPinChange.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);
        this.proceedWithTransfer = this.proceedWithTransfer.bind(this);
        this.retryBankCharges = this.retryBankCharges.bind(this);
    }

    componentDidMount() {
        this.verifyTransferStage();
        this.getBankCharges();
        
    }

    handleSubmit(e){
        e.preventDefault();

        let transferData = {
            RecipientAccountName: this.state.accountData.AccountName,
            RecipientAccountNumber: this.state.accountData.AccountNumber,
            RecipientBankName : this.state.accountData.BankName
        }
    }

    getBankCharges(){
        const {dispatch, account_details} = this.props;
        dispatch(getBankTransferCharges(this.state.user.token));
    }
    retryBankCharges(e){
        e.preventDefault();
        this.getBankCharges();
    }

    proceedWithTransfer(e){
        e.preventDefault();
        let amountVal = parseFloat((this.state.Amount).replace(/,/g, ""));
        if(this.state.selectedDebitableAccount){
            this.setState({isErrorExisting:false, errorToshow: "" });
            if(this.state.Amount!=="" && amountVal < parseFloat(this.state.selectedDebitableAccount[0].AvailableBalance) ){
                if(this.state.selectedAccount !==this.state.accountData.AccountNumber){
                    const {dispatch, account_details} = this.props;
                    this.setState({isErrorExisting:false, errorToshow: "" });
                    dispatch(senderTransferData({
                        SenderBankName: this.state.selectedDebitableAccount[0].AccountDescription,
                        SenderAccountName: this.state.selectedDebitableAccount[0].AccountName,
                        SenderAccountNumber: this.state.selectedAccount,
                        AmountToSend: this.state.Amount,
                        AccountBalance: this.state.selectedDebitableAccount[0].AvailableBalance,
                        RecipientEmail: this.state.recipientEmail,
                        TransferPurpose: this.state.transferPurpose
                    }))
                    this.props.history.push("/fx-transfer/confirm");
                }else{
                   
                    this.setState({ isErrorExisting: true, errorToshow: "Sender and recipient account number cannot be the same" });
                }
            }else{
                if(this.state.Amount===""){
                    this.setState({ isErrorExisting: true, errorToshow: "Please enter amount to send" });
                }else{
                    if ((amountVal > this.state.selectedDebitableAccount[0].AvailableBalance)) {
                        this.setState({ isErrorExisting: true, errorToshow: "Amount exceeds account balance" });
                    }
                }
                
            }
        }else{
            this.setState({isErrorExisting:true, errorToshow: "Please select account to debit" });
        }
    }

    handleAmount = (e) => {
        // console.log('amount is', this.intValue);
        // console.log('enter value', typeof e);
        this.setState({ "AmountToSend": e,isErrorExisting:false });
        // let val = e.replace(",", "");
        //     val = parseFloat(val);
        // console.log('value',   e, typeof e);
        // console.log('limitis',   this.state.transferLimit, typeof this.state.transferLimit);

        if(this.state.selectedDebitableAccount){
            if(parseFloat(e.replace(/,/g, ""))<= this.state.transferLimit){
               
                this.setState({ Amount: e, isMorthanLimit:false });
                if(parseFloat(e.replace(",", "")) <= this.state.selectedDebitableAccount[0].AvailableBalance){
                    
                    this.setState({ Amount: e, isMorthanLimit:false });
                }
                else{
                    this.setState({ Amount: e, isMorthanLimit:true, amountError: "Amount exceeds account balance" });
                }

                if (this.state.formsubmitted) {
                    if (e != "")
                        this.setState({ AmountInvalid: false });
                }
            }else{
                
                this.setState({isMorthanLimit:true,  amountError: "Amount exceeds daily transfer limit"})
            }
            
        }else{
            if(e.length>0){
                this.setState({isMorthanLimit:true,  amountError: "Please select account to debit"})
            }
            else{
                this.setState({amountError: ""});
            }
            
        }

        
    }

    verifyTransferStage(){
        let props = this.props
        if (!props.transfer_info.transfer_info && props.transfer_info.transfer_info !== TRANSFER__BANK_DETAILS) {
            this.props.history.push("/fx-transfer");
            return;
        }else{
            let transferDetails = {
                AccountName: props.transfer_info.transfer_info_data.data.AccountName,
                AccountNumber: props.transfer_info.transfer_info_data.data.AccountNumber,
                BankName: props.transfer_info.transfer_info_data.data.BankName,
                Currency: props.transfer_info.transfer_info_data.data.Currency ==="NGN"?"naira":props.transfer_info.transfer_info_data.data.Currency,
                BankCode: props.transfer_info.transfer_info_data.data.BankCode
            };

            this.state.accountData={
                ...transferDetails
            }
            this.setState({accountData:transferDetails})
            // console.log('state is', this.state.accountData);
        }
    }

    renderTransactionLimit(){
        let props = this.props,
            transacLimitData = props.transfer_limits;

            switch(transacLimitData.transferlimit){
                case GET_TRANSACTION_LIMIT_PENDING:
                    return(
                        <div className="limit-text">Loading transfer limit...</div>
                    );
                case GET_TRANSACTION_LIMIT_SUCCESS:
                    return(
                        <div className="limit-text">Your daily transfer limit is ₦{this.transacLimitData.transferlimit_data.response.data.WemaBankLimit}</div>
                    )
            }

    }
    renderBankFee(){
        let chargesStatus = this.props.transfer_charges.bank_charges_state;
        switch(chargesStatus){
            case GET_BANKCHARGES_PENDING:
                return(
                    <div className="charges-text">Getting transfer fee...</div>
                );
            case GET_BANKCHARGES_SUCCESS:
                return(
                    <div className="charges-text">Transaction fee is
                        {(this.state.accountData.BankCode === '035' || this.state.accountData.BankCode === '000017') && <span> {this.state.accountData.Currency}0</span> } 
                        {(this.state.accountData.BankCode !== '035' && this.state.accountData.BankCode !== '000017') && <span> {this.state.accountData.Currency}{this.props.transfer_charges.bank_charges_data.response.data[0].Charge}</span>} 
                    </div>
                )
            case GET_BANKCHARGES_FAILURE:
                return(
                    <div className="charges-text"> Failed to get transfer fee <a onClick={this.retryBankCharges}> Try again</a></div>
                )
        }
        // {this.props.transfer_charges.bank_charges_state === GET_BANKCHARGES_SUCCESS && 
        //     <div className="charges-text">Transaction fee is ₦{this.props.transfer_charges.bank_charges_data.response.data[0].Charge}</div>
        // }
    }
    

    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }
    

    handleSelectDebitableAccounts(account) {
        let allDebitableAccounts = this.props.debitable_accounts.debitable_accounts_data.data,
            selectedDebitableAccount = allDebitableAccounts.filter(accountDetails=>accountDetails.AccountNumber ===account),
            transferLimit;

            this.setState({isErrorExisting:false, isMorthanLimit: false });
            // console.log('selected bank is', typeof this.props.transfer_info.transfer_info_data.data.BankCode);
            if(this.props.transfer_info.transfer_info_data.data.BankCode ==="035" || this.props.transfer_info.transfer_info_data.data.BankCode=== "000017"){
                
                transferLimit =selectedDebitableAccount[0].MaxIntraBankTransferLimit;
            }else{
                transferLimit =selectedDebitableAccount[0].MaxInterBankTransferLimit;
            }
        
        if(account === this.state.accountData.AccountNumber){
            this.setState({ isSameAccountSelected: true});
        }
        else{
            this.setState({ isSameAccountSelected: false});
        }
        
            
        this.setState({ selectedAccount: account, selectedDebitableAccount, isSelectChanged:true, transferLimit}, ()=>{
            // console.log("selected account is", selectedDebitableAccount);
        });
        
        const {dispatch} = this.props;
        dispatch(getTransactionLimit(this.state.user.token, account))
        // this.handleAmount();
        if (this.state.isSubmitted) { 
            if(account.length == 10)
            this.setState({ isAccountInvalid: false })
         }
    }


    render(){
        let {formattedValue,
            AmountToSend,
            transferPurpose,
            recipientEmail,
            transferLimit,
            isSelectChanged,
            isMorthanLimit,
            isErrorExisting,
            isSameAccountSelected
        } = this.state;
        let currencySelected = this.props.transfer_info.transfer_info_data ? this.props.transfer_info.transfer_info_data.data.Currency : null;
        // console.log("currency text",this.props.transfer_info.transfer_info_data.data.Currency);
        return(
            <Fragment>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">
                                            <div className="al-card no-pad">
                                                <h4 className="m-b-10 center-text hd-underline">Review Transfer</h4>
                                                <div className="transfer-ctn">
                                                    <form onSubmit={this.proceedWithTransfer}>
                                                        <div className="al-card no-pad  ontransfer">
                                                            <div className="trans-summary-card">
                                                                <div className="name-amount clearfix">
                                                                   <div className="recipient-and-amount">
                                                                       <p className="recipient-name">{this.state.accountData.AccountName}</p>
                                                                       <p className="bank-info">
                                                                           <span className="bankname">{this.state.accountData.BankName}</span>
                                                                           <span className="bankaccount">{this.state.accountData.AccountNumber}</span>
                                                                        </p>
                                                                   </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                            {/* {this.renderBankFee()} */}

                                                       
                                                        <div className="inputctn-wrap">
                                                            {isSameAccountSelected===true &&
                                                                <span className="error-msg">Sender and recipient account number cannot be the same</span>
                                                            }
                                                            <SelectDebitableAccounts
                                                                value={this.state.accountNumber}
                                                                currency={currencySelected}
                                                                requestType = "forBankTransfer"
                                                                accountInvalid={this.state.isAccountInvalid}
                                                                onChange={this.handleSelectDebitableAccounts} />
                                                            {isSelectChanged===true &&
                                                                <span className="limit-text">Your daily transfer limit is {this.state.accountData.Currency}{transferLimit} </span>
                                                            }
                                                        </div>

                                                        <div className="inputctn-wrap">
                                                            <AmountInput value={formattedValue} intValue={AmountToSend}  name="Amount" onKeyUp={this.handleAmount}  onChange={this.handleAmount} />
                                                            <span className="limit-text">in {this.state.accountData.Currency} </span>
                                                            {isMorthanLimit===true &&
                                                                <span className="limit-text pull-right">{this.state.amountError}</span>
                                                            }
                                                            
                                                            
                                                        </div>
                                                        
                                                        
                                                        <div className="input-ctn inputWrap">
                                                            <label>Reciever's Email (Optional)</label>
                                                            <Textbox
                                                                tabIndex="2"
                                                                id={'recipientEmail'}
                                                                name="recipientEmail"
                                                                value={recipientEmail}
                                                                type="text"
                                                                autoComplete ="off"
                                                                placeholder= "Email of recipient"
                                                                onChange= {(recipientEmail, e)=>{ 
                                                                    this.setState({recipientEmail})
                                                                }}
                                                                
                                                            />
                                                        </div>
                                                        <div className="input-ctn inputWrap">
                                                            <label>Reason for Transfer (Optional)</label>
                                                            <Textbox
                                                                tabIndex="2"
                                                                id={'transferPurpose'}
                                                                name="transferPurpose"
                                                                value={transferPurpose}
                                                                type="text"
                                                                autoComplete ="off"
                                                                placeholder= "Reason for this transfer"
                                                                onChange= {(transferPurpose, e)=>{ this.setState({transferPurpose})}}
                                                                
                                                            />
                                                        </div>
                                                        {this.state.isErrorExisting===true && 
                                                            <div className="error-msg text-center">{this.state.errorToshow} </div>
                                                        }
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <center>
                                                                    <button type="submit" className="btn-alat m-t-10 m-b-20 text-center"
                                                                        disabled={this.props.transfer_charges.fetchStatus}
                                                                        >Continue</button>
                                                                </center>

                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        alert: state.alert,
        debitable_accounts: state.accounts,
        transfer_info: state.transferReducerPile.transfer_details_data,
        transfer_limits: state.transferReducerPile.tranferlimit_info,
        transfer_charges: state.transferReducerPile.transfer_bank_charges,
        account_details: state.transferReducerPile.transfer_fetch_user_account
    };
}

export default connect(mapStateToProps)(ProvideDetails);