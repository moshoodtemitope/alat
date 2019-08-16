import * as React from "react";
import {Router, NavLink} from "react-router";
// import * as utils from "../../shared/utils";
import {Fragment} from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import * as utils from '../../../shared/utils';
import AlatPinInput from '../../../shared/components/alatPinInput';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import "./../cards.scss";
import whitelogo from "../../../assets/img/white-logo.svg"; 
import {getCurrentVirtualCard,
        topUpVirtualCard
} from "../../../redux/actions/cards/cards.actions";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';

import { FETCH_CURRENTCARD_SUCCESS,
    FETCH_CURRENTCARD_PENDING,
    FETCH_CURRENTCARD_FAILURE,
   SEND_TOPUP_DATA_SUCCESS,
   SEND_TOPUP_DATA_PENDING,
   SEND_TOPUP_DATA_FAILURE
} from "../../../redux/constants/cards/cards.constants";

class TopUpVirtualCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            Pin: "",
            selectedAccount:'',
            showNewCard: false,
            isPinInvalid: false,
            isStep1Done: false,
            isAccountInvalid: false,
        };

        this.getCurrentVirtualCards             = this.getCurrentVirtualCards.bind(this);
        this.handleAlatPinChange                = this.handleAlatPinChange.bind(this);
        this.handleSelectDebitableAccounts      = this.handleSelectDebitableAccounts.bind(this);

        
    }


    componentDidMount() {
        this.getCurrentVirtualCards();
    }

    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }

    validatePinAndAccount(payload){
        if(payload.Pin.length==4){
            this.setState({stage2Error: false, cardPayload: payload});
            
            this.postVirtualCardTopUpInfo(payload);
        }else{
            this.setState({stage2Error: true, stage2ErrorMsg:'Enter a Valid ALAT Pin'});
        }
    }

    postVirtualCardTopUpInfo(topUpVirtualCardData){
        const {dispatch} = this.props;
        // console.log('erorrr', payload, this.state.user.token)
        dispatch(topUpVirtualCard(topUpVirtualCardData, this.state.user.token, false))
    }

    
    getCurrentVirtualCards(){
        const { dispatch } = this.props;
        
        if(Object.keys(this.props.virtualCards).length <1){
            dispatch(getCurrentVirtualCard(this.state.user.token, 'topup'));
        }
        
    }

    handleSelectDebitableAccounts(account) {
        let allDebitableAccounts = this.props.debitable_accounts.debitable_accounts_data.data,
            selectedDebitableAccount = allDebitableAccounts.filter(accountDetails=>accountDetails.AccountNumber ===account),
            transferLimit =selectedDebitableAccount[0].MaxIntraBankTransferLimit;

            
        this.setState({ selectedAccount: account, selectedDebitableAccount, isSelectChanged:true, transferLimit});

    }

    renderStep1Form(virtualCardsList){
        let {nameOnCard,
            amountInNaira,
            amountInUsd,
            computedDollarAmount,
            amountFormatted,
            dollarAmountFormatted,
            cardHolderCity,
            showStep1Error,
            step1ErrorMessage,
            cardHolderState,
            cardHolderZipcode,
            amountError,
            dollarAmountError} = this.state;
        return(
            <div>
                
                <div className="input-ctn inputWrap">
                    <label>Amount in Naira (Maximum  &#8358;2,000,000)</label>
                    
                    <Textbox
                        tabIndex="2"
                        id={'amountInNaira'}
                        name="amountInNaira"
                        value={amountInNaira}
                        onChange= {(amountInNaira, e)=>{ 
                            
                            let dollarConversion = utils.formatAmount( amountInNaira / virtualCardsList.exchangeRates.ngnAmountOfOneUsd);

                            
                                dollarConversion = parseFloat(dollarConversion.replace(/,/g, '')).toFixed(2).toString();

                                
                            if(dollarConversion !=='NaN'){
                                this.setState({amountInNaira, amountInUsd: dollarConversion, amountError:false});
                            }else{
                                this.setState({amountError:true})
                            }
                            
                        }}
                        
                    />
                    {amountError===true &&
                        <small className="error-msg">Only a valid amount allowed</small>
                    }
                </div>
                <div className="input-ctn inputWrap">
                    <label>Amount in USD (Minimum $10)</label>
                    <Textbox
                        tabIndex="3"
                        id={'amountInUsd'}
                        name="amountInUsd"
                        value={amountInUsd}
                        onChange= {(amountInUsd, e)=>{ 
                        
                            let nairaConversion =  utils.formatAmount(amountInUsd * virtualCardsList.exchangeRates.ngnAmountOfOneUsd);
                            

                                nairaConversion = parseFloat(nairaConversion.replace(/,/g, '')).toFixed(2).toString();

                            if(nairaConversion !=='NaN'){
                                this.setState({amountInUsd, amountInNaira: nairaConversion, dollarAmountError:false});
                            }else{
                                this.setState({dollarAmountError:true})
                            }
                        }}
                        
                    />
                    {dollarAmountError===true &&
                        <small className="error-msg">Only a valid amount allowed</small>
                    }
                    
                </div>
                <div className="input-ctn inputWrap">
                    <center>
                        <button type="button" onClick={()=>{
                                                            if((amountInNaira !=='' && amountInNaira !==undefined ) && (amountInUsd !=='' && amountInUsd !==undefined)){
                                                                
                                                                if(Math.abs(amountInUsd)>=10){
                                                                    console.log('valid', amountInUsd );
                                                                    this.setState({isStep1Done: true, showStep1Error: false, isSelectChanged:false});
                                                                }else{
                                                                    this.setState({showStep1Error: true, step1ErrorMessage:'Minimum amount in USD is $10'});
                                                                }
                                                                
                                                            }else{
                                                                this.setState({showStep1Error: true, step1ErrorMessage:'All fields are required'});
                                                            }
                                                    }}   
                            className="btn-alat m-t-10 m-b-20 text-center">Proceed</button>
                            {showStep1Error===true && <div className="error-msg">{step1ErrorMessage}</div> }
                    </center>
                </div>
            </div>
        )
    }

    renderAccountAndPin(virtualCardsList){
        let {transferLimit, isSelectChanged} = this.state;
        let props = this.props,
        topupOtpRequestStatus = props.sendTopVCCardinfo;

        return(
            <div>
                <div className="inputctn-wrap">
                    <SelectDebitableAccounts
                        value={this.state.accountNumber}
                        // currency={currencySelected}
                        // requestType = "forBankTransfer"
                        accountInvalid={this.state.isAccountInvalid}
                        onChange={this.handleSelectDebitableAccounts} />
                        {isSelectChanged===true &&
                            <span className="limit-text">Your daily transaction limit for the selected account is ₦{transferLimit} </span>
                        }
                </div>
                <div className="input-ctn inputWrap">
                    <AlatPinInput
                        value={this.state.Pin}
                        onChange={this.handleAlatPinChange}
                        PinInvalid={this.state.isPinInvalid}
                        maxLength={4} 
                    />
                </div>
                <div className="input-ctn inputWrap">
                    <center>
                        {this.state.stage2Error===true &&
                            <div className="error-msg">{this.state.stage2ErrorMsg}</div>
                        }
                        {(topupOtpRequestStatus.is_processing===false && topupOtpRequestStatus.fetch_status===SEND_TOPUP_DATA_FAILURE)&&
                            <div className="error-msg">{otpRequestStatus.new_vc_info.error}</div>
                        }

                        <button type="button" onClick={()=>{
                                                            
                                                            if(this.state.selectedAccount!=='' && this.state.Pin!==''){
                                                                // if(selectedDebitableAccount.)
                                                                if(this.state.selectedDebitableAccount[0].AvailableBalance >= this.state.amountInNaira){
                                                                    
                                                                   if(this.state.selectedDebitableAccount[0].MaxIntraBankTransferLimit < this.state.amountInNaira){
                                                                        this.setState({stage2Error: false});
                                                                        let payload ={
                                                                            AccountNo: this.state.selectedAccount,
                                                                            Amount: this.state.amountInNaira,
                                                                            Dollar: this.state.amountInUsd,
                                                                            Name: this.state.nameOnCard,
                                                                            Type: 'topup',
                                                                            Pin: this.state.Pin,
                                                                            VirtualCardId: virtualCardsList.virtualCardData.id, 
                                                                            rateId: virtualCardsList.exchangeRates.rateId
                                                                        };
                                                                        this.validatePinAndAccount(payload);
                                                                    }
                                                                    else{
                                                                        this.setState({stage2Error: true, stage2ErrorMsg:'Amount exceeds daily transaction limit for selected account'});
                                                                    }
                                                                }
                                                                else{
                                                                    this.setState({stage2Error: true, stage2ErrorMsg:'Selected account has insufficient funds'});
                                                                }
                                                                
                                                            }else{
                                                                this.setState({stage2Error: true, stage2ErrorMsg:'Please provide all details'});
                                                            }
                                                }} 
                                            className="btn-alat m-t-10 m-b-20 text-center"
                                            disabled={topupOtpRequestStatus.is_processing}> { topupOtpRequestStatus.is_processing ? "Processing..." : "Top up" }</button>
                        <div>{(topupOtpRequestStatus.is_processing ===false || topupOtpRequestStatus.is_processing==undefined ) && <a className="back-cta" onClick={()=>this.setState({isStep1Done:false})}>Back</a> } </div>
                        
                    </center>
                </div>
            </div>
        )
    }

    renderCardToTopUp(){
        let {cardHolderAddress,
            nameOnCard,
            amountInNaira,
            amountInUsd,
            computedDollarAmount,
            amountFormatted,
            dollarAmountFormatted,
            cardHolderCity,
            cardHolderState,
            cardHolderZipcode,
            amountError,
            dollarAmountError,
            isStep1Done,
       } = this.state;

       let props = this.props,
            fetchVirtualCardsStatus = props.virtualCards.fetch_status;
            
            switch(fetchVirtualCardsStatus){
                case FETCH_CURRENTCARD_PENDING:
                    return(
                        <div className="col-sm-12">
                            <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">
                                            <div className="al-card no-pad">
                                                <div className="transfer-ctn text-center">
                                                    Loading card details...
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    );
                case FETCH_CURRENTCARD_SUCCESS:
                        let virtualCardsList =  props.virtualCards.virtualcard_data.response;
                        
                       
                        // return ;
                        if(Object.keys(this.props.virtualCards).length >1){
                            return(
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="max-600">
                                                <div className="al-card no-pad">
                                                    <div className="sub-tab-nav inpage-nav">
                                                        <ul>
                                                            <li> <Link to={'/virtual-cards/topup'}>Top Up</Link></li>
                                                            <li> <Link to={'/virtual-cards'}>View Details</Link></li>
                                                            <li> <Link to={'/virtual-cards/history'}> Transaction History</Link></li>
                                                            <li> <Link to={'/virtual-cards/liquidate'}>Liquidate Card</Link></li>
                                                            <li> <Link to={'/virtual-cards/delete'}>Delete Card</Link></li>
                                                        </ul>
                                                    </div>
                                                    <div className="transfer-ctn">
                                                    <h3 className="alatcard-msg">This card cannot be used on 3D secured sites and for money transfer</h3>
                                                        <form>
                                                            <div className="atmcard-wrap">
                                                                <div className="top-info">
                                                                    <div className="balanceinfo">
                                                                        Balance: ${virtualCardsList.virtualCardData.balance}
                                                                    </div>
                                                                    <div className="logo-icon">
                                                                        <img src={whitelogo} />
                                                                    </div>
                                                                </div>
                                                                <div className="cardnum-digits">
                                                                    7433 **** **** 7872
                                                                </div>
                                                                <div className="carddata">
                                                                    <div className="each-carddata">
                                                                        <span className="card-infotext">Valid Thru</span>
                                                                        <span className="card-infodetail">**/**</span>
                                                                    </div>
                                                                    <div className="each-carddata">
                                                                        <span className="card-infotext">CVV</span>
                                                                        <span className="card-infodetail">***</span>
                                                                    </div>
                                                                </div>
                                                                <div className="cardname">
                                                                    {virtualCardsList.virtualCardData.alias}
                                                                </div>
                                                            </div>
                                                            <div className="conversion-msg">
                                                                $1 =  &#8358;{virtualCardsList.exchangeRates.ngnAmountOfOneUsd}
                                                            </div>
                                                            {isStep1Done===false &&
                                                                this.renderStep1Form(virtualCardsList)
                                                            }

                                                            {isStep1Done===true &&
                                                                this.renderAccountAndPin(virtualCardsList)
                                                            }
                                                            
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* here down */}
                                </div>
                            );
                        }
                case FETCH_CURRENTCARD_FAILURE:
                    let virtualCardError =  props.virtualCards.virtualcard_data;
                    console.log('error is', virtualCardError);
                    return(
                        <div className="col-sm-12">
                            <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">
                                            <div className="al-card no-pad">
                                                <div className="transfer-ctn text-center">
                                                    {virtualCardError.error}
                                                    <div>
                                                        <a className="cta-link" onClick={this.getCurrentVirtualCards}> Retry</a>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    );
            }
    }

   


    render(){
        return(
            <Fragment>
                {this.renderCardToTopUp()}
            </Fragment>
        )
    }

}
function mapStateToProps(state){
    return {
        virtualCards        : state.alatCardReducersPile.getVirtualCards,
        sendTopVCCardinfo   : state.alatCardReducersPile.sendTopVCCardinfo,
        debitable_accounts  : state.accounts,
    };
}

export default connect(mapStateToProps)(TopUpVirtualCards);