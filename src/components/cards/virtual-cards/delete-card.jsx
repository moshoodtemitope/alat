import * as React from "react";
import {Router, NavLink} from "react-router";
import * as utils from '../../../shared/utils';
import AlatPinInput from '../../../shared/components/alatPinInput';
import {Fragment} from "react";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import "./../cards.scss";
import whitelogo from "../../../assets/img/white-logo.svg"; 
import successIcon from "../../../assets/img/success-tick.svg";
import {
    getCurrentVirtualCard,
    deleteAlatVirtualCard,
    clearCardsStore
} from "../../../redux/actions/cards/cards.actions";
import { 
    FETCH_CURRENTCARD_SUCCESS,
    FETCH_CURRENTCARD_PENDING,
    FETCH_CURRENTCARD_FAILURE,
    DELETE_VIRTUALCARD_SUCCESS,
    DELETE_VIRTUALCARD_PENDING,
    DELETE_VIRTUALCARD_FAILURE
} from "../../../redux/constants/cards/cards.constants";
const options = [
];

class DeleteCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            Pin: "",
            isShowInfo: true,
            showSummary: false,
            selectedAccountToFund:''
        };

        this.handleAlatPinChange          = this.handleAlatPinChange.bind(this);
        this.handleChange                 = this.handleChange.bind(this);
        this.processDeleteVirtualCard     = this.processDeleteVirtualCard.bind(this);
        
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

    reduceDeccimal(val){
        return val.toFixed(2);
    }


    getCurrentVirtualCards(){
        const { dispatch } = this.props;
        
        if(Object.keys(this.props.virtualCards).length <1){
            dispatch(getCurrentVirtualCard(this.state.user.token, "fordetails"));
        }
        
    }

    processDeleteVirtualCard(){
        const { dispatch } = this.props;
        let paylod ={
            AccountNo           : this.state.selectedAccountToFund.value,
            VirtualCardId       : this.props.virtualCards.virtualcard_data.response.virtualCardData.id,
            Pin                 : this.state.Pin,
        }
        
        dispatch(deleteAlatVirtualCard(paylod, this.state.user.token));
        
        
    }

    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    }

    handleChange(selectedAccountToFund){
        this.setState({ selectedAccountToFund });
    }

    renderCustomerAccounts(){
        let accountsList = this.props.virtualCards.virtualcard_data.response.customerAccounts;
        let options = [];
        
        accountsList.map(account=>{
            if(account.Currency ==="NGN"){
                options.push({value:account.AccountNumber,
                             accountType: account.AccountType,
                             accountBal:  utils.formatAmount(account.AvailableBalance),
                            label: account.AccountType  +"\t"+ " (" +account.AccountNumber + " )   -" +account.Currency+ utils.formatAmount(account.AvailableBalance)
                })
            }
        });
        
        return(
            <Select
                options={options}
                // isDisabled={this.state.submitButtonState}
                
                // onInputChange={this.handleChange}
                onChange={this.handleChange}
            />
        )
    }

    renderSuccesfullVirtualCardDeletion(){
        return(
            <div>
                 <center>
                    <img src={successIcon} />
                </center>
                <div className="m-t-30 width-300">
                    <h4 className="success-heading">Transaction Successful</h4>
                    <div className="success-mg">
                        You just Deleted your ALAT dollar card 
                    </div>
                </div>
                <div className="return-text"><a onClick={(e)=>{e.preventDefault();
                                                                this.props.dispatch(clearCardsStore()); 
                                                                this.props.history.push("/dashboard");
                                                        }}> Return to dashboard</a>
                </div>
            </div>
        )
    }

    renderSummary(){
        let deleteVirtualCardStatus = this.props.deleteVirtualCard;
        return (
            <div>
                <div className="card-wrap">
                    <p className="card-heading">Transfer from</p>
                    <div className="al-card beneficiary-card">
                        <div className="clearfix">
                            <div className="all-info">
                                <p className="summary-info"> 
                                    <span className="nickname-text">{this.props.virtualCards.virtualcard_data.response.virtualCardData.alias}</span>
                                    <span className="bank-name">  &#8358;{utils.toCurrency(this.reduceDeccimal((this.props.virtualCards.virtualcard_data.response.virtualCardData.balance-5) 
                                                    *this.props.virtualCards.virtualcard_data.response.exchangeRates.liquidateRateOfOneUsdInNgn))}
                                    </span>
                                </p>
                                <p className="account-info">${utils.toCurrency(this.reduceDeccimal(this.props.virtualCards.virtualcard_data.response.virtualCardData.balance-5))}</p>
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
                                        <span className="recipientname">{this.state.selectedAccountToFund.accountType}</span>
                                        <span className="amount-to-send">₦{this.state.selectedAccountToFund.accountBal}</span>
                                    </p>
                                    <p className="">{this.state.selectedAccountToFund.value}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="input-ctn inputWrap">
                    <center>
                        <div className="charges-text m-b-10"> Card delete charges: &#8358;{this.props.virtualCards.virtualcard_data.response.exchangeRates.cardDeletionCharge} </div>
                       
                        {(deleteVirtualCardStatus.is_processing===false && deleteVirtualCardStatus.fetch_status===DELETE_VIRTUALCARD_FAILURE)&&
                            <div className="error-msg">{deleteVirtualCardStatus.delete_virtualcard_info.error}</div>
                        }
                       
                        <button type="button" 
                                onClick={this.processDeleteVirtualCard}
                                disabled={deleteVirtualCardStatus.is_processing}
                                className="btn-alat m-t-10 m-b-20 text-center"
                                                >{deleteVirtualCardStatus.is_processing?'Processing...': 'Proceed'}</button>
                        
                        <div>
                            {deleteVirtualCardStatus.is_processing!==true &&
                                <a className="back-cta" onClick={()=>this.setState({isShowInfo:false, showSummary:false, selectedAccountToFund:''})}>Back</a>
                            }
                        </div>
                    </center>
                </div>
            </div>
        )
    }


    decodedPan(pos){
        let pan= this.props.virtualCards.virtualcard_data.response.virtualCardData.pan;
            pan = this.replaceAll(pan, '|', '');
        let str = pan.charAt(pos -1);
        return this.props.virtualCards.virtualcard_data.response.encryptedCharacters.findIndex(x => x == str);
    }
    



    renderLiquateInfo(){
        let {isShowInfo,
            showSummary} = this.state;
        let fetchVirtualCardsStatus = this.props.virtualCards.fetch_status;
        // let virtualCardsList =  this.props.virtualCards.virtualcard_data.response;
        return(
                <div>
                    {(fetchVirtualCardsStatus===FETCH_CURRENTCARD_PENDING) &&
                        <div className="text-center">Please wait..</div>
                    }

                    {(fetchVirtualCardsStatus=== FETCH_CURRENTCARD_FAILURE) &&
                        <div className="text-center">
                            {this.props.virtualCards.virtualcard_data.error}
                            <div>
                                <a className="cta-link" onClick={this.getCurrentVirtualCards}> Retry</a>
                            </div>
                        </div>
                    }
                    {(fetchVirtualCardsStatus === FETCH_CURRENTCARD_SUCCESS && !showSummary) &&
                        <div>
                            <div className="atmcard-wrap">
                                <div className="top-info">
                                    <div className="balanceinfo">
                                        Balance: ${this.props.virtualCards.virtualcard_data.response.virtualCardData.balance}
                                    </div>
                                    <div className="logo-icon">
                                        <img src={whitelogo} />
                                    </div>
                                </div>
                                <div className="cardnum-digits">
                                    **** **** **** {this.decodedPan(13)}{this.decodedPan(14)}{this.decodedPan(15)}{this.decodedPan(16)}
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
                                    {this.props.virtualCards.virtualcard_data.response.virtualCardData.alias}
                                </div>
                            </div>
                            <div className="conversion-msg"> $1 =  &#8358;{this.props.virtualCards.virtualcard_data.response.exchangeRates.liquidateRateOfOneUsdInNgn}</div>

                            
                            {isShowInfo &&
                                <div>
                                    <div className="amountsummary-text">
                                        <span>Amount in Naira:</span>
                                        &#8358;{utils.toCurrency(this.reduceDeccimal((this.props.virtualCards.virtualcard_data.response.virtualCardData.balance-5) 
                                                    *this.props.virtualCards.virtualcard_data.response.exchangeRates.liquidateRateOfOneUsdInNgn))}
                                    </div>

                                    <div className="amountsummary-text">
                                        <span>Amount in Dollars:</span>
                                        ${utils.toCurrency(this.reduceDeccimal(this.props.virtualCards.virtualcard_data.response.virtualCardData.balance-5))}
                                    </div>

                                    <div className="input-ctn inputWrap">
                                        <center>
                                            <div className="charges-text m-b-10"> Card deletion charges: &#8358;{this.props.virtualCards.virtualcard_data.response.exchangeRates.cardDeletionCharge} </div>
                                            <button type="button"  className="btn-alat m-t-10 m-b-20 text-center"
                                                                    onClick={()=>this.setState({isShowInfo:false, showError:false})}>Delete card</button>
                                            
                                        </center>
                                    </div>
                                </div>
                            }
                            
                            {(!isShowInfo && !showSummary) && 
                                <div>
                                     <div className="input-ctn inputWrap">
                                        {this.renderCustomerAccounts()}
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
                                            <div className="charges-text m-b-10"> Card delete charges: &#8358;{this.props.virtualCards.virtualcard_data.response.exchangeRates.cardDeletionCharge} </div>
                                           
                                            {this.state.showError===true &&
                                                <div className="error-msg">Please provide all details</div>
                                            }

                                            <button type="button"  className="btn-alat m-t-10 m-b-20 text-center"
                                                                    onClick={()=>{
                                                                        if((this.state.selectedAccountToFund!=='' && this.state.selectedAccountToFund.value!=='') && this.state.Pin!==''){
                                                                            this.setState({showSummary:true, showError: false})
                                                                        }else{
                                                                            this.setState({showError: true})
                                                                        }
                                                                    }}> Proceed</button>

                                            
                                            
                                            <div><a className="back-cta" onClick={()=>this.setState({isShowInfo:true, showSummary:false})}>Back</a>
                                            </div>
                                        </center>
                                    </div>
                                </div>
                            }
                            
                        </div>
                    }
                    
                </div>
        )
    }

    // renderLiquateInfo(){

    // }

    
    render() {
        let {isShowInfo, showSummary} = this.state;
        let deleteVirtualCardStatus = this.props.deleteVirtualCard;

        return (
            <Fragment>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <div className="sub-tab-nav inpage-nav">
                                        <ul>
                                        <li> <Link to={'/virtual-cards/topup'}>Top Up</Link></li>
                                        <li> <Link to={'/virtual-cards/card-details'}>View Details</Link></li>
                                        <li> <Link to={'/virtual-cards/history'}> Transaction History</Link></li>
                                        <li> <Link to={'/virtual-cards/liquidate'}>Liquidate Card</Link></li>
                                        <li> <Link className="active-subnav" to={'/virtual-cards/delete'}>Delete Card</Link></li>
                                        </ul>
                                    </div>
                                    <div className="transfer-ctn">
                                        {this.renderLiquateInfo()}

                                        {(!isShowInfo && showSummary && deleteVirtualCardStatus.fetch_status!==DELETE_VIRTUALCARD_SUCCESS) &&
                                            <div>
                                                {this.renderSummary()}
                                            </div>
                                        }
                                        {deleteVirtualCardStatus.fetch_status===DELETE_VIRTUALCARD_SUCCESS &&
                                            <div>{this.renderSuccesfullVirtualCardDeletion()}</div>
                                        }
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
    
    return {
        virtualCards             : state.alatCardReducersPile.getVirtualCards,
        deleteVirtualCard        : state.alatCardReducersPile.deleteVirtualCard,
    };
}

export default connect(mapStateToProps)(DeleteCard);
