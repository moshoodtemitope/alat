import * as React from "react";
import {Router, NavLink} from "react-router";
// import * as utils from "../../shared/utils";


import {getCurrentVirtualCard,
        sendNewVirtualCardInfo,
} from "../../../redux/actions/cards/cards.actions";

import { FETCH_CURRENTCARD_SUCCESS,
         FETCH_CURRENTCARD_PENDING,
         FETCH_CURRENTCARD_FAILURE,
         SEND_NEWVC_DATA_SUCCESS,
         SEND_NEWVC_DATA_PENDING,
         SEND_NEWVC_DATA_FAILURE} from "../../../redux/constants/cards/cards.constants";

import {Fragment} from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import whitelogo from "../../../assets/img/white-logo.svg"; 
import emptyVC from "../../../assets/img/credit-card-2.svg"; 
import "./../cards.scss";
import * as utils from '../../../shared/utils';
import AlatPinInput from '../../../shared/components/alatPinInput';
import AmountInput from '../../../shared/components/amountInput';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
const options = [
];

class VirtualCards extends React.Component {
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
        // this.validatePinAndAccount              = this.validatePinAndAccount.bind(this);
        this.handleSelectDebitableAccounts      = this.handleSelectDebitableAccounts.bind(this);
        
    }

    componentDidMount() {
        this.getCurrentVirtualCards();
    }

    getCurrentVirtualCards(){
        const { dispatch } = this.props;
        dispatch(getCurrentVirtualCard(this.state.user.token, 'new'));
    }

    validatePinAndAccount(payload){
        if(payload.Pin.length==4){
            this.setState({stage2Error: false, cardPayload: payload});
            
            this.postNewVirtualCardDInfo(payload);
        }else{
            this.setState({stage2Error: true, stage2ErrorMsg:'Enter a Valid ALAT Pin'});
        }
    }

    postNewVirtualCardDInfo(newVirtualCardData){
        const {dispatch} = this.props;
        dispatch(sendNewVirtualCardInfo(newVirtualCardData, this.state.user.token,false))
    }

    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }

    submitStep1(e){
        e.preventDefault();
    }

    renderCreateNewCard(virtualCardsList){
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
                    <label>Name on Card</label>
                    <Textbox
                        tabIndex="2"
                        id={'nameOnCard'}
                        name="nameOnCard"
                        value={nameOnCard}
                        onChange= {(nameOnCard, e)=>{ 
                            this.setState({nameOnCard});
                        }}
                        
                    />
                </div>
                <div className="input-ctn inputWrap">
                    <label>Amount in Naira (Maximum  &#8358;2,000,000)</label>
                    
                    <Textbox
                        tabIndex="2"
                        id={'amountInNaira'}
                        name="amountInNaira"
                        value={amountInNaira}
                        onChange= {(amountInNaira, e)=>{ 
                            
                            let dollarConversion = utils.formatAmount( amountInNaira / virtualCardsList.ngnAmountOfOneUsd);

                            
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
                        
                            let nairaConversion =  utils.formatAmount(amountInUsd * virtualCardsList.ngnAmountOfOneUsd);
                            

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
                                                            if((nameOnCard !=='' && nameOnCard !==undefined) && (amountInNaira !=='' && amountInNaira !==undefined ) && (amountInUsd !=='' && amountInUsd !==undefined)){
                                                                
                                                                if(Math.abs(amountInUsd)>=10){
                                                                    this.setState({isStep1Done: true, showStep1Error: false, stage2Error:false, isSelectChanged:false});
                                                                }else{
                                                                    this.setState({showStep1Error: true, step1ErrorMessage:'Minimum amount in USD is $10'});
                                                                }
                                                                
                                                            }else{
                                                                this.setState({showStep1Error: true, step1ErrorMessage:'All fields are required'});
                                                            }
                                                    }}   
                            className="btn-alat m-t-10 m-b-20 text-center">Create Card</button>
                            {showStep1Error===true && <div className="error-msg">{step1ErrorMessage}</div> }
                    </center>
                </div>
            </div>
        )
    }

    renderAccountAndPin(virtualCardsList){
        let {transferLimit, isSelectChanged} = this.state;
        let props = this.props,
            otpRequestStatus = props.sendVCNewCardinfo;

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
                        {(otpRequestStatus.is_fetching===false && otpRequestStatus.fetch_status===SEND_NEWVC_DATA_FAILURE)&&
                            <div className="error-msg">{otpRequestStatus.new_vc_info.error}</div>
                        }

                        <button type="button" onClick={()=>{
                                                            
                                                            if(this.state.selectedAccount!=='' && this.state.Pin!==''){
                                                                if(this.state.selectedDebitableAccount[0].AvailableBalance >= this.state.amountInNaira){
                                                                    if(this.state.selectedDebitableAccount[0].MaxIntraBankTransferLimit >= this.state.amountInNaira){
                                                                        this.setState({stage2Error: false});
                                                                        let payload ={
                                                                            AccountNo: this.state.selectedAccount,
                                                                            Amount: this.state.amountInUsd,
                                                                            Name: this.state.nameOnCard,
                                                                            Type: 'create',
                                                                            Pin: this.state.Pin,
                                                                            rateId: virtualCardsList.rateId
                                                                        };
                                                                        this.validatePinAndAccount(payload);
                                                                    }else{
                                                                        this.setState({stage2Error: true, stage2ErrorMsg:'Amount exceeds daily transaction limit for selected account'});
                                                                    }
                                                                }else{
                                                                    this.setState({stage2Error: true, stage2ErrorMsg:'Selected account has insufficient funds'});
                                                                }
                                                                
                                                            }else{
                                                                this.setState({stage2Error: true, stage2ErrorMsg:'Please provide all details'});
                                                            }
                                                }} 
                                            className="btn-alat m-t-10 m-b-20 text-center"
                                            disabled={otpRequestStatus.is_fetching}> { otpRequestStatus.is_fetching ? "Processing..." : "Proceed" }</button>
                        <div>{(otpRequestStatus.is_fetching ===false || otpRequestStatus.is_fetching==undefined ) && <a className="back-cta" onClick={()=>this.setState({isStep1Done:false})}>Back</a> } </div>
                        
                    </center>
                </div>
            </div>
        )
    }

    renderVirtualCard(){
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
                                                Please wait...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                case FETCH_CURRENTCARD_SUCCESS:
                    let virtualCardsList =  props.virtualCards.virtualcard_data.response;
                        
                        if((virtualCardsList.virtualCardData===undefined)){
                            return(
                                <div className="col-sm-12">
                                    <div className="row">
                                            <div className="col-sm-12">
                                                <div className="max-600">
                                                    <div className="al-card no-pad">
                                                        {/* If no card exists*/}
                                                        {this.state.showNewCard ===false &&
                                                            <div className="transfer-ctn text-center">
                                                                <center>
                                                                <img className="nocards-icon" src={emptyVC} />
                                                                    <p> You do not have an active card</p>
                                                                    <button type="submit" onClick={()=>this.setState({showNewCard: true, nameOnCard: virtualCardsList.AccountName})}   
                                                                        className="btn-alat m-t-10 m-b-20 text-center">Create Card</button>
                                                                </center>
                                                            </div>
                                                        }

                                                        {/* Show new card form*/}
                                                        {this.state.showNewCard ===true &&
                                                            <div>
                                                                <h4 className="m-b-10 center-text hd-underline">Create  ALAT Dollar Card</h4>
                                                                <div className="transfer-ctn">
                                                                    <h3 className="alatcard-msg">This card cannot be used on 3D secured sites and for money transfer</h3>
                                                                    <form onSubmit={this.submitStep1}>
                                                                        <div className="atmcard-wrap">
                                                                            <div className="top-info">
                                                                                <div className="balanceinfo">
                                                                                    Balance: $ ***,**.**
                                                                                </div>
                                                                                <div className="logo-icon">
                                                                                    <img src={whitelogo} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="cardnum-digits">
                                                                                **** **** **** ****
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
                                                                                {nameOnCard}
                                                                            </div>
                                                                        </div>
                                                                        <div className="conversion-msg">
                                                                            $1 =  &#8358;{virtualCardsList.ngnAmountOfOneUsd}
                                                                        </div>

                                                                        {/* Provide step 1 details */}
                                                                        {isStep1Done===false &&
                                                                            this.renderCreateNewCard(virtualCardsList)
                                                                        }

                                                                        {/* Provide step 2 details */}

                                                                        {isStep1Done===true &&
                                                                            this.renderAccountAndPin(virtualCardsList)
                                                                        }
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        }
                                                        {/* If no card exists*/}
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            );
                        }
                        
                        
                case FETCH_CURRENTCARD_FAILURE:
                        let virtualCardError =  props.virtualCards.virtualcard_data;
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

    handleSelectDebitableAccounts(account) {
        let allDebitableAccounts = this.props.debitable_accounts.debitable_accounts_data.data,
            selectedDebitableAccount = allDebitableAccounts.filter(accountDetails=>accountDetails.AccountNumber ===account),
            transferLimit =selectedDebitableAccount[0].MaxIntraBankTransferLimit;

            
        this.setState({ selectedAccount: account, selectedDebitableAccount, isSelectChanged:true, transferLimit});

    }


    
    render() {
        let props = this.props,
            otpRequestStatus = props.sendVCNewCardinfo;
        return (
            <Fragment>
               { (otpRequestStatus.fetch_status!==SEND_NEWVC_DATA_SUCCESS) &&
                    this.renderVirtualCard()
                }
              
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
        virtualCards        : state.alatCardReducersPile.getVirtualCards,
        sendVCNewCardinfo   : state.alatCardReducersPile.sendVCNewCardinfo,
        debitable_accounts  : state.accounts,
    };
}

export default connect(mapStateToProps)(VirtualCards);
