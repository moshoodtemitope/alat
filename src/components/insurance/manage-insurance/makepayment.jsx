import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import {Checkbox} from "react-inputs-validation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { Link } from 'react-router-dom';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AlatPinInput from '../../../shared/components/alatPinInput';
import * as utils from '../../../shared/utils';
import {Textbox} from "react-inputs-validation";
import {history} from "../../../_helpers/history";
import whitelogo from "../../../assets/img/white-logo.svg"; 
import  {routes} from '../../../services/urls';
import successIcon from "../../../assets/img/success-tick.svg";
import noPolicy from "../../../assets/img/empty-policy.svg";

import {
    POST_AUTOINSURANCE_PAYMENTDATA_SUCCESS,
   POST_AUTOINSURANCE_PAYMENTDATA_PENDING,
   POST_AUTOINSURANCE_PAYMENTDATA_FAILURE,
 }from "../../../redux/constants/insurance/insurance.constants";

 import {
    GET_TRANSACTION_LIMIT_PENDING, 
    GET_TRANSACTION_LIMIT_SUCCESS, 
    GET_TRANSACTION_LIMIT_FAILURE,} from "../../../redux/constants/transfer.constants";


 import {
    postAutoInsurancePayment
    // clearCardsStore
} from "../../../redux/actions/insurance/insurance.actions";

import {
    getTransactionLimit} from "../../../redux/actions/transfer/cash-transfer.actions";
import { compose } from "redux";

// const options = [
// ];

const BASEURL = routes.BASEURL;
let  autoColorsList   = [];

class MakePaymentForInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            isAccountInvalid: false,
            Pin: "",
            isPinInvalid: false,
            selectedAccount: "",
        };

        this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);
        this.handleAlatPinChange = this.handleAlatPinChange.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        
    }

    componentDidMount() {
        this.verifyStage();
    }

    verifyStage(){
        if(Object.keys(this.props.postMotorScheduleRequest).length===0){
            this.props.history.push("/insurance");
            return false;
        }
    }

    

    postAutoInsurancePayment(payload){
        const { dispatch } = this.props;
        dispatch(postAutoInsurancePayment(payload, this.state.user.token));
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.selectedAccount==='' || this.state.Pin===''){
            this.setState({isErrorExisting:true})
        }else{
            this.setState({isErrorExisting:false});
            let payload = {
                SourceAccountNumber: this.state.selectedAccount,
                Charges: this.props.postMotorScheduleRequest.motorschedule_data.response.data.Charges,
                TransactionPin: this.state.Pin,
                Premium: this.props.postMotorScheduleRequest.motorschedule_data.response.data.Premium,
                TransactionRef: this.props.postMotorScheduleRequest.motorschedule_data.response.data.TransactionReference
            };
            // console.log('payload to send', payload);
            this.postAutoInsurancePayment(payload);
        }
    }

    handleAlatPinChange(pin) {
        this.setState({ Pin: pin, isErrorExisting:false, })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }

    renderTransactionLimit(){
        let props = this.props,
            transactLimitData = props.transfer_limits;

            switch(transactLimitData.transferlimit){
                case GET_TRANSACTION_LIMIT_PENDING:
                    return(
                        <div className="limit-text">Loading daily transaction limit for {this.state.selectedAccount}...</div>
                    );
                case GET_TRANSACTION_LIMIT_SUCCESS:
                    return(
                        <div className="limit-text">Your daily transaction limit for {this.state.selectedAccount}  is ₦{this.transactLimitData.transferlimit_data.response.data.WemaBankLimit}</div>
                    )
                case GET_TRANSACTION_LIMIT_FAILURE:
                    return(
                        <div className="limit-text">Failed to load daily transaction limit for {this.state.selectedAccount}</div>
                    )
            }

    }

    
    handleSelectDebitableAccounts(account) {
        let allDebitableAccounts = this.props.debitable_accounts.debitable_accounts_data.data,
            selectedDebitableAccount = allDebitableAccounts.filter(accountDetails=>accountDetails.AccountNumber ===account);

            
        this.setState({isErrorExisting:false,  selectedAccount: account, isSelectChanged:true});

        const {dispatch} = this.props;
        dispatch(getTransactionLimit(this.state.user.token, account))
        
        if (this.state.isSubmitted) { 
            if(account.length == 10)
            this.setState({ isAccountInvalid: false })
         }
    }
    


    renderDetailsContainer(){
        let {isErrorExisting,
            isSelectChanged,
            isMorthanLimit} = this.state;

        let providerName = this.props.getProductCovers.policycover_data.provider,
            productCoverInfo = this.props.saveProductCoverId.policycover_data.data,
            motorScheduleData = this.props.postMotorScheduleRequest.motorschedule_data.response.data;

           
        // console.log('customer data', this.props.savedCustomerInfo);
        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Review Payment</h4>
                                <div className="transfer-ctn">
                                    <div className="card-wrap">
                                        <div className="al-card no-pad">
                                            <div className="trans-summary-card">
                                                <div className="name-amount clearfix">
                                                    <div className="recipient-and-amount">
                                                        <p className="recipient-name">
                                                            <span className="recipientname">{productCoverInfo.productCoverName} Insurance</span>
                                                            <span className="amount-to-send">₦{motorScheduleData.Premium} </span>
                                                        </p>
                                                        <div className="bank-info">
                                                            <p className="bankaccount">{providerName} Insurance</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={this.handleSubmit} >
                                        <div className="inputctn-wrap">
                                            <SelectDebitableAccounts
                                                value={this.state.accountNumber}
                                                accountInvalid={this.state.isAccountInvalid}
                                                onChange={this.handleSelectDebitableAccounts} />
                                            {isSelectChanged===true &&
                                                <span className="limit-text">{this.renderTransactionLimit()} </span>
                                            }
                                            {isMorthanLimit===true &&
                                                <span className="limit-text">Amount to be paid is more than your daily transaction limit</span>
                                            }

                                            {isErrorExisting===true &&
                                                <span className="limit-text">Please provide all details</span>
                                            }
                                        </div>
                                        <div className="inputctn-wrap centered-input">
                                            <AlatPinInput
                                                value={this.state.Pin}
                                                onChange={this.handleAlatPinChange}
                                                PinInvalid={this.state.isPinInvalid}
                                                maxLength={4} />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <span className="amount-charged"> You will be charged ₦{motorScheduleData.Charges} </span>
                                                    <button type="submit" 
                                                        disabled={this.props.sendPayment.is_processing}
                                                        className="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.sendPayment.is_processing?'Processing...': ' Make payment' }
                                                        {/* {transferStatus.sendmoney_status===SENDBANK_TRANSFER_PENDING ?"Processing...": "Proceed"} */}
                                                    </button>

                                                    {(this.props.sendPayment.is_processing===false && this.props.sendPayment.fetch_status===POST_AUTOINSURANCE_PAYMENTDATA_FAILURE)&&
                                                        <div className="error-msg">{this.props.sendPayment.motorinsurancepayment_data.error}</div>
                                                    }
                                                    <div><Link to={'/insurance/buy-insurance/policydetails'}>Back</Link></div>
                                                    
                                                    {/* <a className="back-cta" onClick={()=>history.push("/insurance/buy-insurance/choose-cover")}>Back</a> */}
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
        )
    }
    

    

   
   

    
    render() {
        return (
            <Fragment>
                {this.renderDetailsContainer()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
        getProductCovers   : state.insurancePile.getCoversInPoductRequest,
        saveProductCoverId   : state.insurancePile.saveProductCoverId,
        postMotorScheduleRequest   : state.insurancePile.postMotorScheduleRequest,
        sendPayment   : state.insurancePile.postAutoInsurancePaymentRequest,
        debitable_accounts: state.accounts,
        transfer_limits: state.transferReducerPile.tranferlimit_info,
    };
}

export default connect(mapStateToProps)(MakePaymentForInsurance);
