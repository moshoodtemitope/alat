import React, { Component, Fragment } from 'react';
import InnerContainer from "../../../shared/templates/inner-container";
import TransferContainer from "../container";
import {connect} from "react-redux";
import "./../transfer.scss";
import {Textbox} from "react-inputs-validation";
import {
    SENDER__BANK_DETAILS,
    SENDBANK_TRANSFER_PENDING, 
    SENDBANK_TRANSFER_SUCCESS, 
    SENDBANK_TRANSFER_FAILURE,
    PROCESS_TRANSFER_PENDING, 
    PROCESS_TRANSFER_SUCCESS,
    PROCESS_TRANSFER_FAILURE,} from "../../../redux/constants/transfer.constants";

import {sendMoneyTransfer,processMoneyTransfer} from "../../../redux/actions/transfer/cash-transfer.actions";

class TransferOtp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            Pin: "",
            isPinInvalid: false,
            isSubmitted: false,
            transferCharges: '',
            accountData:{}
        };
       
        
        this.makeTransfer = this.makeTransfer.bind(this);
        this.resendOtp =  this.resendOtp.bind(this);
        
    }

    componentDidMount() {
        this.verifyTransferStage();
    }



    verifyTransferStage(){
        let props = this.props
        console.log('stauts is', this.props.transfer_processsend_money.fetchStatus);
        // props.transfer_money.sendmoney_status !==SENDBANK_TRANSFER_SUCCESS
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
                BankCharge : props.transfer_charges.bank_charges_data.response.data[0].Charge,
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

    resendOtp(e){
        e.preventDefault();

        const {dispatch} = this.props;
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
                        TransactionPin:this.props.transfer_money.sendmoney_status_data.payloadPin
                    }
            dispatch(sendMoneyTransfer(this.state.user.token,payload, true));
            

            
            
        console.log('Payload for payment is', payload);
    }
    
    makeTransfer(e){
        e.preventDefault();
        const {dispatch} = this.props;
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
                        OTP: this.state.OtpValue,
                        Narration:this.props.transfersender.transfer_info_data.data.TransferPurpose || "",
                        TransactionPin:this.props.transfer_money.sendmoney_status_data.payloadPin
                    }
            dispatch(processMoneyTransfer(this.state.user.token,payload));
            let transferStatus = this.props.transfer_money;

            
            
        console.log('Payload for payment is', payload);
    }
    

    

    render(){
        let props = this.props,
            transferStatus = props.transfer_money,
            processtransferStatus = props.transfer_processsend_money;

            let {OtpValue} = this.state;
        return(
            <Fragment>
                    
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">
                                            <div className="al-card no-pad  otpform">
                                                <h4 className="m-b-10 center-text hd-underline">OTP verification</h4>
                                                <center>
                                                    <svg width="58" height="69" viewBox="0 0 58 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.0019C0 3.14976 3.15134 0 7.00541 0H35.027C38.8811 0 42.0324 3.14976 42.0324 7.0019V16.3378H52.9297C55.4901 16.3378 57.6 18.4466 57.6 21.0057V35.0095C57.6 37.5686 55.4901 39.6775 52.9297 39.6775H42.0324V61.4611C42.0324 65.3133 38.8811 68.4631 35.027 68.4631C34.4656 68.471 33.9434 68.1762 33.6604 67.6915C33.3773 67.2068 33.3773 66.6073 33.6604 66.1227C33.9434 65.638 34.4656 65.3432 35.027 65.3511C37.2101 65.3511 38.9189 63.6431 38.9189 61.4611V56.0152H3.11351V61.4611C3.11351 63.6431 4.82237 65.3511 7.00541 65.3511H28.8C29.3614 65.3432 29.8836 65.638 30.1667 66.1227C30.4497 66.6073 30.4497 67.2068 30.1667 67.6915C29.8836 68.1762 29.3614 68.471 28.8 68.4631H7.00541C3.15134 68.4631 0 65.3133 0 61.4611V7.0019ZM35.027 3.11194H7.00542C4.82238 3.11194 3.11353 4.81994 3.11353 7.00188V7.77987H38.9189V7.00188C38.9189 4.81994 37.2101 3.11194 35.027 3.11194ZM3.11353 10.8918H38.9189V16.3377H23.3514C20.791 16.3377 18.6811 18.4466 18.6811 21.0057V35.0095C18.6811 37.5686 20.791 39.6774 23.3514 39.6774H24.1297V45.9013C24.1319 46.4821 24.4574 47.0134 24.974 47.2792C25.4906 47.5451 26.1123 47.5012 26.5865 47.1656L37.0703 39.6774H38.9189V52.9032H3.11353V10.8918ZM52.9297 19.4497H23.3513C22.4619 19.4497 21.7946 20.1168 21.7946 21.0057V35.0095C21.7946 35.8984 22.4619 36.5655 23.3513 36.5655H25.6864C26.5462 36.5656 27.2431 37.2621 27.2432 38.1215V42.8866L35.6837 36.8572C35.9462 36.669 36.2607 36.5671 36.5837 36.5655H52.9297C53.8191 36.5655 54.4865 35.8984 54.4865 35.0095V21.0057C54.4865 20.1168 53.8191 19.4497 52.9297 19.4497ZM28.8 25.6736C27.5103 25.6736 26.4648 26.7185 26.4648 28.0076C26.4648 29.2965 27.5103 30.3415 28.8 30.3415C30.0896 30.3415 31.1351 29.2965 31.1351 28.0076C31.1351 26.7185 30.0896 25.6736 28.8 25.6736ZM35.8054 28.0076C35.8054 26.7186 36.8509 25.6736 38.1406 25.6736C39.4302 25.6736 40.4757 26.7186 40.4757 28.0076C40.4757 29.2966 39.4302 30.3416 38.1406 30.3416C36.8509 30.3416 35.8054 29.2966 35.8054 28.0076ZM47.4811 25.6736C46.1914 25.6736 45.1459 26.7186 45.1459 28.0076C45.1459 29.2966 46.1914 30.3416 47.4811 30.3416C48.7707 30.3416 49.8162 29.2966 49.8162 28.0076C49.8162 26.7186 48.7707 25.6736 47.4811 25.6736ZM18.6811 60.6832C18.6811 59.3941 19.7266 58.3492 21.0162 58.3492C22.3059 58.3492 23.3514 59.3941 23.3514 60.6832C23.3514 61.9722 22.3059 63.0171 21.0162 63.0171C19.7266 63.0171 18.6811 61.9722 18.6811 60.6832Z" fill="#AB2656"/>
                                                    </svg>
                                                </center>
                                                <div class="m-t-30 width-300">
                                                    <p class="m-b-20" >Please enter the OTP sent to your phone number</p>
                                                    <form action="">
                                                        <div className="centered-input otpInput">

                                                            <Textbox
                                                                tabIndex="2"
                                                                id={'OtpValue'}
                                                                name="OtpValue"
                                                                type="password"
                                                                autoComplete ="off"
                                                                value={OtpValue}
                                                                maxLength="6"
                                                                
                                                                onBlur={(e) => {}}
                                                                onChange= {(OtpValue, e)=>{
                                                                    this.setState({OtpValue});
                                                                }}
                                                            />

                                                            
                                                                
                                                                <div className="row">
                                                                    <div className="col-sm-12">
                                                                        <center>
                                                                            {processtransferStatus.sendmoney_status ===PROCESS_TRANSFER_FAILURE && 
                                                                                <span className="error-msg">{processtransferStatus.sendmoney_status_data.error}</span>
                                                                            }
                                                                            <button type="submit" disabled={(this.props.transfer_processsend_money.fetchStatus && this.props.transfer_processsend_money.fetchStatus===true)?true:false} onClick={this.makeTransfer} 
                                                                                className="btn-alat m-t-10 m-b-20 text-center">
                                                                                    {processtransferStatus.sendmoney_status===PROCESS_TRANSFER_PENDING ?"Completing transfer...": "Complete Transfer"}
                                                                            </button>
                                                                        </center>

                                                                    </div>
                                                                </div>
                                                                {(transferStatus.sendmoney_status_data && transferStatus.sendmoney_status_data.resend && transferStatus.sendmoney_status) ===SENDBANK_TRANSFER_SUCCESS && 
                                                                    <div className="info-label success">OTP successfully resent</div>
                                                                }

                                                                {(transferStatus.sendmoney_status_data && transferStatus.sendmoney_status_data.resend && transferStatus.sendmoney_status) ===SENDBANK_TRANSFER_FAILURE && 
                                                                    <div className="info-label error">Unable to resend OTP</div>
                                                                }
                                                        </div>
                                                    </form>  
                                                   
                                                    <div className="failed-otp-ctas">
                                                        {/* <span className="text-right pull-left cta-link">
                                                            <a className="cta-link">Call my phone</a>
                                                        </span> */}
                                                        <span className="text-left pull-right cta-link">
                                                            <a className="cta-link" onClick={this.resendOtp}>Resend code</a>
                                                        </span>
                                                    </div>
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
        transfer_info: state.transferReducerPile.transfer_details_data,
        account_details: state.transferReducerPile.transfer_fetch_user_account,
        transfersender: state.transferReducerPile.transfersender_details_data,
        transfer_money: state.transferReducerPile.transfer_send_money, 
        transfer_charges: state.transferReducerPile.transfer_bank_charges,
        transfer_processsend_money: state.transferReducerPile.transfer_processsend_money 
    };
}
export default connect(mapStateToProps)(TransferOtp);
