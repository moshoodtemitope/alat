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
        // console.log('erorrr', payload, this.state.user.token)
        dispatch(sendNewVirtualCardInfo(newVirtualCardData, this.state.user.token))
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
                            console.log('value is', nameOnCard);
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
                                                                    console.log('valid', amountInUsd );
                                                                    this.setState({isStep1Done: true, showStep1Error: false});
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
                                                                this.setState({stage2Error: true, stage2ErrorMsg:'Please provide all details'});
                                                            }
                                                }} 
                                            className="btn-alat m-t-10 m-b-20 text-center"
                                            disabled={otpRequestStatus.is_fetching}> { otpRequestStatus.is_fetching ? "Processing..." : "Create Card" }</button>
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

    handleSelectDebitableAccounts(account) {
        let allDebitableAccounts = this.props.debitable_accounts.debitable_accounts_data.data,
            selectedDebitableAccount = allDebitableAccounts.filter(accountDetails=>accountDetails.AccountNumber ===account),
            transferLimit;

            
        this.setState({ selectedAccount: account, selectedDebitableAccount}, ()=>{
            console.log("selected account is", this.state.selectedAccount);
        });

    }

    renderOTpForm(otpMsg){
        let {OtpValue} = this.state;
        // console.log('messfs', otpMsg);
        return(
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
                                <div className="m-t-30 width-300">

                                    <p className="m-b-20" >{otpMsg.description}</p>
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
                                                            
                                                            <button type="submit" 
                                                                className="btn-alat m-t-10 m-b-20 text-center">
                                                                    Confirm
                                                            </button>
                                                        </center>

                                                    </div>
                                                </div>
                                               
                                        </div>
                                    </form>  
                                    
                                    <div className="failed-otp-ctas">
                                        {/* <span className="text-right pull-left cta-link">
                                            <a className="cta-link">Call my phone</a>
                                        </span> */}
                                        <span className="text-left pull-right cta-link">
                                            <a className="cta-link" onClick={()=>{
                                                                        // this.setState({isResendOtp: })
                                                                        this.postNewVirtualCardDInfo(this.state.cardPayload)
                                                                        }}>Resend code</a>
                                            {/* <a className="cta-link">Resend code</a> */}
                                        </span>
                                    </div>
                                </div>           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
    render() {
        let props = this.props,
            otpRequestStatus = props.sendVCNewCardinfo;
        return (
            <Fragment>
               { (otpRequestStatus.fetch_status!==SEND_NEWVC_DATA_SUCCESS) &&
                    this.renderVirtualCard()
                }
               { (otpRequestStatus.fetch_status===SEND_NEWVC_DATA_SUCCESS) && this.renderOTpForm(otpRequestStatus.new_vc_info.response)}
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
