import React, { Component, Fragment } from 'react';
import InnerContainer from "../../../shared/templates/inner-container";
import TransferContainer from "../container";
import {connect} from "react-redux";
import "./../transfer.scss";
import { Switch } from '../../../shared/elements/_toggle';
import {
    cashTransferData,
    clearTransferStore} from "../../../redux/actions/transfer/cash-transfer.actions";
import {
    PROCESS_TRANSFER_SUCCESS} from "../../../redux/constants/transfer.constants";

class TransferSuccess extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            saveBeneficiary: false,
            transferData:{}
        };
        
        this.goToSaveBeneficiary = this.goToSaveBeneficiary.bind(this);
    }

    componentDidMount() {
        this.getTransferDetails();
    }

    handleToggle = () => {
        this.setState({ saveBeneficiary: !this.state.saveBeneficiary },()=>{
           if(this.state.saveBeneficiary===true){
                this.goToSaveBeneficiary();
           }
        });
    }
    formatAmount(amount) {
        return amount.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    goToSaveBeneficiary(){
        // e.preventDefault();
        const {dispatch, account_details, beneficiaries, transfer_info} = this.props;
        let    beneficiaryList = beneficiaries.beneficiaries_data.response.data, existingBeneficiary;
            existingBeneficiary = beneficiaryList.find((beneficiary)=>{
                return beneficiary.AccountNumber === transfer_info.transfer_info_data.data.AccountNumber;
            })

            // console.log('existing is', beneficiaryList);
            // console.log('stateaccountnum', transfer_info.transfer_info_data.data.AccountNumber);
            if(typeof existingBeneficiary ==="undefined"){
                this.setState({existingBeneficiaryError: false});
                // dispatch(cashTransferData({
                //     AccountNumber: transfer_info.transfer_info_data.data.accountNumber,
                //     AccountName: transfer_info.transfer_info_data.data.AccountName,
                //     BankName: transfer_info.transfer_info_data.data.BankName,
                //     BankCode: transfer_info.transfer_info_data.data.BankCode
                // }));
                this.props.history.push("/transfer/save-beneficiary");
            }else{
                
                this.setState({existingBeneficiaryError: true});
                setTimeout(()=>{
                    this.props.dispatch(clearTransferStore());
                    this.props.history.push("/dashboard");
                }, 3000);
            }
        // this.props.history.push("/transfer/save-beneficiary");
    }

    getTransferDetails(){
        let props = this.props,transferData;
        if(props.transfer_money.sendmoney_status && props.transfer_money.sendmoney_status !== PROCESS_TRANSFER_SUCCESS){
            transferData = {
                AccountName : props.transfer_info.transfer_info_data.data.AccountName,
                AmountSent:  props.transfersender.transfer_info_data.data.AmountToSend
            }
            this.setState({transferData: {...transferData}});
        }else{
            this.props.history.push("/transfer");
        }
        

        

    }

    render(){
        const {
            existingBeneficiaryError} = this.state;
        return(
            <Fragment>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">
                                            <div className="al-card no-pad">
                                                
                                                <div className="transfer-ctn">
                                                    <div className="al-card">
                                                        <center>
                                                            <div className="m-b-30 m-t-20">
                                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M26.418 38.3379L20 32L16 36L26.4268 46L48 22L43.9629 18L26.418 38.3379Z" fill="#169A62"/>
                                                                <path d="M32 0C14.3261 0 0 14.3261 0 32C0 49.6739 14.3261 64 32 64C49.6739 64 64 49.6739 64 32C64 14.3261 49.6739 0 32 0ZM32 59C17.0879 59 5 46.9121 5 32C5 17.0879 17.0879 5 32 5C46.9121 5 59 17.0879 59 32C59 46.9121 46.9121 59 32 59Z" fill="#169A62"/>
                                                                </svg>
                                                            </div>
                                                        </center>
                                                        <h4 className="center-text red-text">Transaction Successful</h4>

                                                        <div className="m-t-20 width-400">
                                                            {/* <p className="m-b-40 f-s-16">You just transfered <span className="bold-text">₦232</span> to <span className="bold-text">dssdsds</span></p> */}
                                                <p className="m-b-40 f-s-16">You just transfered <span className="bold-text">₦{this.state.transferData.AmountSent}</span> to <span className="bold-text">{this.state.transferData.AccountName}</span></p>
                                                            <div className="clearfix save-purchase">
                                                                <p>Save this beneficiary</p>
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
                                                            
                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <center>
                                                                        <button className="btn-alat m-t-10 m-b-20 text-center" onClick={(e)=>{e.preventDefault();
                                                                            this.props.dispatch(clearTransferStore()); 
                                                                            this.props.history.push("/dashboard");}} >Return to Dashboard</button>
                                                                        {existingBeneficiaryError ===true &&
                                                                            <div className="info-label error">This beneficiary already exists</div>
                                                                        }
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
        account_details: state.transferReducerPile.transfer_fetch_user_account,
        beneficiaries: state.transferReducerPile.transfer_beneficiaries,
        transfer_info: state.transferReducerPile.transfer_details_data,
        transfersender: state.transferReducerPile.transfersender_details_data,
        transfer_money: state.transferReducerPile.transfer_send_money
    };
}
export default connect(mapStateToProps)(TransferSuccess);