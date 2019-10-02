import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";
import {saveBankTransferBeneficiary,
        clearTransferStore} from "../../../redux/actions/transfer/cash-transfer.actions";

import {Fragment} from "react";
import "./../transfer.scss";
import InnerContainer from "../../../shared/templates/inner-container";
import TransferContainer from "../container";
import {connect} from "react-redux";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import AlatPinInput from '../../../shared/components/alatPinInput';
import {Textbox} from "react-inputs-validation";
import {
    TRANSFER__BANK_DETAILS,
    SAVE_TRANSFER_BENEFICIARY_PENDING,
    SAVE_TRANSFER_BENEFICIARY_SUCCESS,
    SAVE_TRANSFER_BENEFICIARY_FAILURE} from "../../../redux/constants/transfer.constants";
const options = [
];

class FxSaveBeneficiary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            accountName :"",
            accountAlias: "",
            bankName:"",
            Pin:"",
            hasBeneficiaries: false,
            
        };
        this.handleSubmit =  this.handleSubmit.bind(this);

        this.handleAlatPinChange = this.handleAlatPinChange.bind(this);
    }

    componentDidMount() {
        this.checkIfDataExists();
    }

    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const {dispatch} = this.props;
        let payload = {
            AccountName: this.props.account_details.transfer_info_data.data.AccountName,
            AccountNumber:this.props.account_details.transfer_info_data.data.AccountNumber.trim(),
            BankName:this.props.account_details.transfer_info_data.data.BankName,
            BankCode: this.props.account_details.transfer_info_data.data.BankCode,
            NickName: this.state.accountAlias.trim(),
            TransactionPin: this.state.Pin.trim(),
            Currency: this.props.account_details.transfer_info_data.data.Currency,
        }
        // console.log('payload is', payload);
        dispatch(saveBankTransferBeneficiary(this.state.user.token, payload));
    }

   checkIfDataExists(){
       let dataObj = this.props.account_details;
       const {dispatch} =  this.props;
       dispatch(saveBankTransferBeneficiary(this.state.user.token, {}))
    //    console.log('in here');
       if(!this.props.account_details.transfer_info_data || !this.props.account_details.transfer_info || (this.props.account_details.transfer_info !==TRANSFER__BANK_DETAILS) ){
            // this.props.history.push("/fx-transfer");
       }else{
        //    console.log('at all');
       }
   }
    
    render() {
        const {accountPin, 
                accountName,
                accountAlias, 
                accountNumber,
                bankName} = this.state;
        let props = this.props;
        if (this.props.save_beneficiary_status.sendmoney_status == SAVE_TRANSFER_BENEFICIARY_SUCCESS){   
            // this.props.dispatch(accountEnquiry(this.state.user.token, {}))
            this.props.dispatch(clearTransferStore());
            this.props.history.push("/fx-transfer"); 
        }
        return (
            
            <Fragment>
                        
                            

                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">


                                            <div className="al-card no-pad">
                                                <h4 className="m-b-10 center-text hd-underline">Save Beneficiary</h4>

                                                <div className="transfer-ctn">
                                                    <form onSubmit={this.handleSubmit}>

                                                        <div className="input-ctn">
                                                            <label>Bank Holder Name</label>

                                                            {this.props.account_details.transfer_info_data &&
                                                                <Textbox
                                                                    tabIndex="2"
                                                                    id={'accountName'}
                                                                    name="accountName"
                                                                    type="text"
                                                                    disabled={true}
                                                                    value={this.props.account_details.transfer_info_data.data.AccountName}/>
                                                            }
                                                            
                                                        </div>
                                                        <div className="input-ctn">
                                                            <label>Bank Name</label>
                                                            {this.props.account_details.transfer_info_data &&
                                                                <Textbox
                                                                    tabIndex="2"
                                                                    id={'bankName'}
                                                                    name="bankName"
                                                                    type="text"
                                                                    value={this.props.account_details.transfer_info_data.data.BankName}
                                                                    disabled={true}/>
                                                            }
                                                        </div>
                                                        <div className="input-ctn">
                                                            <label>Account Number</label>
                                                            {this.props.account_details.transfer_info_data &&
                                                                <Textbox
                                                                    id={'accountNumber'}
                                                                    name="accountNumber"
                                                                    type="text"
                                                                    value={this.props.account_details.transfer_info_data.data.AccountNumber}
                                                                    disabled={true}/>
                                                            }
                                                        </div>
                                                        <div className="input-ctn">
                                                            <label>Alias</label>
                                                            <Textbox
                                                                tabIndex="2"
                                                                id={'accountAlias'}
                                                                name="accountAlias"
                                                                type="text"
                                                                autoComplete ="off"
                                                                value={accountAlias}
                                                                maxLength="40"
                                                                onChange= {(accountAlias, e)=>{
                                                                    this.setState({accountAlias})
                                                                }}/>
                                                        </div>
                                                        <div className="inputctn-wrap centered-input">
                                                            <AlatPinInput
                                                                value={this.state.Pin}
                                                                onChange={this.handleAlatPinChange}
                                                                PinInvalid={this.state.isPinInvalid}
                                                                maxLength={4} />
                                                                {this.props.save_beneficiary_status.sendmoney_status===SAVE_TRANSFER_BENEFICIARY_FAILURE &&
                                                                    <div className="error-msg text-center">{this.props.save_beneficiary_status.sendmoney_status_data.error} </div>
                                                                }
                                                            
                                                        </div>
                                                        
                                                        
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <center>
                                                                    {/* <button type="submit" disabled={accountInfo.fetchStatus} className="btn-alat m-t-10 m-b-20 text-center">{ accountInfo.fetchStatus ? "Save beneficiary..." : "Save" }</button> */}
                                                                    <button type="submit" 
                                                                            className="btn-alat m-t-10 m-b-20 text-center"
                                                                            disabled={this.props.save_beneficiary_status.fetchStatus && this.props.save_beneficiary_status.fetchStatus ===true?true:false }
                                                                            >
                                                                        {this.props.save_beneficiary_status.sendmoney_status===SAVE_TRANSFER_BENEFICIARY_PENDING?"Saving...": "Save"}
                                                                    </button>
                                                                   
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
        );
    }
}


function mapStateToProps(state){
    // console.error(state);
    return {
        beneficiaries: state.transferReducerPile.transfer_beneficiaries,
        account_details: state.transferReducerPile.transfer_details_data,
        beneficiary_delete_state: state.transferReducerPile.delete_transfer_beneficiaryState,
        save_beneficiary_status: state.transferReducerPile.save_beneficiary
    };
}

export default connect(mapStateToProps)(FxSaveBeneficiary);
