import React, { Component, Fragment } from 'react';
import InnerContainer from "../../../shared/templates/inner-container";
import TransferContainer from "../container";
import {connect} from "react-redux";
import "./../transfer.scss";
import {
    SENDER__BANK_DETAILS,
    SENDBANK_TRANSFER_PENDING, 
    SENDBANK_TRANSFER_SUCCESS, 
    SENDBANK_TRANSFER_FAILURE,} from "../../../redux/constants/transfer.constants";
import AlatPinInput from '../../../shared/components/alatPinInput';

class ConFirmTransfer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Pin: "",
            isPinInvalid: false,
            isSubmitted: false,
            transferCharges: '',
            accountData:{}
        };
       
        this.handleAlatPinChange = this.handleAlatPinChange.bind(this);
        this.makeTransfer = this.makeTransfer.bind(this);
        
    }

    componentDidMount() {
        this.verifyTransferStage();
    }

    verifyTransferStage(){
        let props = this.props
        if (!props.transfersender.transfer_info && props.transfersender.transfer_info !== SENDER__BANK_DETAILS) {
            this.props.history.push("/transfer");
            return;
        }else{
            
            let transferDetails = {
                AccountName: props.transfer_info.transfer_info_data.data.AccountName,
                AccountNumber: props.transfer_info.transfer_info_data.data.AccountNumber,
                BankCode: props.transfer_info.transfer_info_data.data.BankCode,
                BankName: props.transfer_info.transfer_info_data.data.BankName,
                SenderBankName: props.transfersender.transfer_info_data.data.SenderBankName,
                SenderAccountName: props.transfersender.transfer_info_data.data.SenderAccountName,
                SenderAccountBalance: props.transfersender.transfer_info_data.data.AccountBalance,
                AmountToSend: props.transfersender.transfer_info_data.data.AmountToSend,
                BankCharge : props.account_details.account_detail_data.response.Charge,
                SenderAccountNumber: props.transfersender.transfer_info_data.data.SenderAccountNumber
            };
            if(transferDetails.BankCode === '035' || transferDetails.BankCode === '000017'){
                transferDetails.BankCharge = '0';
            }
            

            this.state.accountData={
                ...transferDetails
            }
            this.setState({accountData:transferDetails}, ()=>{
                console.log('state is', this.state.accountData);
            })
            // 
        }
    }

    makeTransfer(e){
        e.preventDefault();
        let payload = {
                        BeneficiaryEmail:this.props.transfersender.transfer_info_data.data.RecipientEmail,
                        SourceAccountName:this.state.accountData.SenderAccountName,
                        SourceAccountNumber:this.state.accountData.SenderAccountNumber,
                        DestinationAccountName:this.state.accountData.AccountName,
                        DestinationBankName:this.state.accountData.BankName,
                        DestinationAccountNumber:this.state.accountData.AccountNumber,
                        DestinationBankCode:this.state.accountData.BankCode,
                        Amount:this.state.accountData.AmountToSend,
                        Charges:this.state.accountData.BankCharge,
                        Narration:this.props.transfersender.transfer_info_data.data.TransferPurpose,
                        TransactionPin:this.state.Pin
                    }
        console.log('Payload for payment is', payload);
    }
    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }

    

    render(){
        let props = this.props;
        return(
            <Fragment>
                <InnerContainer>
                    <TransferContainer>
                    <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Send Money</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                            <li><a href="accounts.html" className="active">Bank Transfer</a></li>
                                            <li><a href="statement.html">Send To Contacts</a></li>
                                            <li><a href="#">Cardless Withdrawal</a></li>
                                            <li><a href="#">FX Transfer</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">
                                            <div className="al-card no-pad">
                                                <h4 className="m-b-10 center-text hd-underline">Transfer Summary</h4>
                                                <div className="transfer-ctn">
                                                    <div className="card-wrap">
                                                        <p className="card-heading">Transfer from</p>
                                                        <div className="al-card beneficiary-card">
                                                            <div className="clearfix">
                                                                <div className="all-info">
                                                                    <p className="summary-info"> 
                                                                        <span className="nickname-text">{this.state.accountData.SenderBankName}</span>
                                                                        <span className="bank-name">₦{this.state.accountData.SenderAccountBalance}</span>
                                                                    </p>
                                                                    <p className="account-info">{this.state.accountData.SenderAccountNumber}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-wrap">
                                                        <p className="card-heading">Transfer to</p>
                                                        <div className="al-card no-pad">
                                                            <div className="trans-summary-card">
                                                                <div className="name-amount clearfix">
                                                                    <div className="recipient-and-amount">
                                                                        <p className="recipient-name">
                                                                            <span className="recipientname">{this.state.accountData.AccountName}</span>
                                                                            <span className="amount-to-send">₦{this.state.accountData.AmountToSend}</span>
                                                                        </p>
                                                                        <div className="bank-info">
                                                                            <p className="bankname">{this.state.accountData.BankName}</p>
                                                                            <p className="bankaccount">{this.state.accountData.AccountNumber}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    

                                                        <AlatPinInput
                                                            value={this.state.Pin}
                                                            onChange={this.handleAlatPinChange}
                                                            PinInvalid={this.state.isPinInvalid}
                                                            maxLength={4} />

                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <center>
                                                                    <span className="amount-charged"> You will be charged ₦{this.state.accountData.BankCharge} </span>
                                                                    <button type="submit" onClick={this.makeTransfer} className="btn-alat m-t-10 m-b-20 text-center">Send Money</button>
                                                                </center>

                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    </TransferContainer>
                </InnerContainer>
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
        transfer_info: state.transfer_details_data,
        account_details: state.transfer_fetch_user_account,
        transfersender: state.transfersender_details_data
    };
}
export default connect(mapStateToProps)(ConFirmTransfer);
