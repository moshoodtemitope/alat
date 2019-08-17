import * as React from "react";
import {Router, NavLink} from "react-router";
import {Fragment} from "react";
import * as utils from '../../../shared/utils';
import AlatPinInput from '../../../shared/components/alatPinInput';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import whitelogo from "../../../assets/img/white-logo.svg";
import {getCurrentVirtualCard,
    getVirtualDetails
} from "../../../redux/actions/cards/cards.actions";

import {
    FETCH_CURRENTCARD_SUCCESS,
    FETCH_CURRENTCARD_PENDING,
    FETCH_CURRENTCARD_FAILURE,
    FETCH_CARD_DATA_SUCCESS,
    FETCH_CARD_DATA_PENDING,
    FETCH_CARD_DATA_FAILURE,
    ALATCARD_REDUCER_CLEAR
} from "../../../redux/constants/cards/cards.constants";

class VirtualCardDetails extends React.Component {
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

        this.handleAlatPinChange      = this.handleAlatPinChange.bind(this);
        this.sendCardData             = this.sendCardData.bind(this);
        
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

    getVCDetails(payload){
        const { dispatch } = this.props;

        dispatch(getVirtualDetails(payload, this.state.user.token));
        
    }

    
    getCurrentVirtualCards(){
        const { dispatch } = this.props;
        
        if(Object.keys(this.props.virtualCards).length <1){
            dispatch(getCurrentVirtualCard(this.state.user.token, "fordetails"));
        }
        
    }

    sendCardData(e){
        e.preventDefault();
        let props                   = this.props,
            existingVirtualCard     = props.virtualCards.virtualcard_data.response,
            payload                 ={
                pin: this.state.Pin,
                virtualCardId: existingVirtualCard.virtualCardData.id
            };
        
            this.getVCDetails(payload);
    }

    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    }


    decodedPan(pos){
        let pan= this.props.getAVirtualCardinfo.vc_info.response.data.pan;
            pan = this.replaceAll(pan, '|', '');
        let str = pan.charAt(pos -1);
        return this.props.virtualCards.virtualcard_data.response.encryptedCharacters.findIndex(x => x == str);
    }

    decodedCcv(pos){
        let cvv= this.props.getAVirtualCardinfo.vc_info.response.data.cvv;
            cvv = this.replaceAll(cvv, '|', '');

        let str = cvv.charAt(pos -1);
        
        return this.props.virtualCards.virtualcard_data.response.encryptedCharacters.findIndex(x => x == str);
    
    }

    decodedexMonth(pos){

        let expiryMonth= this.props.getAVirtualCardinfo.vc_info.response.data.expiryMonth;
            expiryMonth = this.replaceAll(expiryMonth, '|', '');

        let str = expiryMonth.charAt(pos -1);
        
        return this.props.virtualCards.virtualcard_data.response.encryptedCharacters.findIndex(x => x == str);

        
    }

    decodedexYear(pos){

        let expiryYear= this.props.getAVirtualCardinfo.vc_info.response.data.expiryYear;
            expiryYear = this.replaceAll(expiryYear, '|', '');

        let str = expiryYear.charAt(pos -1);
        
        return this.props.virtualCards.virtualcard_data.response.encryptedCharacters.findIndex(x => x == str);
      }

    decodeCardNumber(){
        let counter,
            cardDigitsCount =16,
            cardNumbers='';

        for(counter=1; counter<=cardDigitsCount; counter++){
            if((counter%4===0) && counter<cardDigitsCount){
                cardNumbers += this.decodedPan(counter)+ ' ';
            }else{
                cardNumbers += this.decodedPan(counter);
            }
            
        }
        

        return cardNumbers;
    }


    renderCardDetails(){
        let {cardHolderAddress,
            nameOnCard,
            cardHolderCity,
            cardHolderState,
            cardHolderZipcode,
       } = this.state;

       let props = this.props,
            fetchVirtualCardsStatus = props.virtualCards.fetch_status,
            existingVirtualCard     = props.virtualCards,
            getVirtualCardData      = props.getAVirtualCardinfo;
            
            
        return(    
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <div className="sub-tab-nav inpage-nav">
                                    <ul>
                                        <li> <Link to={'/virtual-cards/topup'}>Top Up</Link></li>
                                        <li> <Link className="active-subnav" to={'/virtual-cards/card-details'}>View Details</Link></li>
                                        <li> <Link to={'/virtual-cards/history'}> Transaction History</Link></li>
                                        <li> <Link to={'/virtual-cards/liquidate'}>Liquidate Card</Link></li>
                                        <li> <Link to={'/virtual-cards/delete'}>Delete Card</Link></li>
                                    </ul>
                                </div>
                                

                                <div className="transfer-ctn">
                                {fetchVirtualCardsStatus===FETCH_CURRENTCARD_PENDING &&
                                    <div className="text-center">Please wait</div>
                                }

                                {fetchVirtualCardsStatus=== FETCH_CURRENTCARD_FAILURE &&
                                    <div className="text-center">
                                        {this.props.virtualCards.virtualcard_data.error}
                                        <div>
                                            <a className="cta-link" onClick={this.getCurrentVirtualCards}> Retry</a>
                                        </div>
                                    </div>
                                }

                                {(getVirtualCardData.fetch_status!==FETCH_CARD_DATA_SUCCESS
                                  && fetchVirtualCardsStatus === FETCH_CURRENTCARD_SUCCESS) &&
                                    <form onSubmit={this.sendCardData}>
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
                                                <button type="submit"
                                                        disabled={getVirtualCardData.is_processing}
                                                        className="btn-alat m-t-10 m-b-20 text-center"> 
                                                       {getVirtualCardData.is_processing? 'Getting details...':'Get Card details'} 
                                                    </button>
                                            </center>
                                        </div>
                                    </form>
                                }

                                    {(getVirtualCardData.fetch_status === FETCH_CARD_DATA_SUCCESS
                                        && fetchVirtualCardsStatus === FETCH_CURRENTCARD_SUCCESS) &&
                                        
                                            <div>
                                                <div className="atmcard-wrap">
                                                    <div className="top-info">
                                                        <div className="balanceinfo">
                                                        Balance: ${getVirtualCardData.vc_info.response.data.balance}
                                                            {/* Balance: ${virtualCardsList.virtualCardData.balance} ***,**.** */}
                                                        </div>
                                                        <div className="logo-icon">
                                                            <img src={whitelogo} />
                                                        </div>
                                                    </div>
                                                    <div className="cardnum-digits numdetails">
                                                    {this.decodeCardNumber()}
                                                    </div>
                                                    <div className="carddata">
                                                        <div className="each-carddata">
                                                            <span className="card-infotext">Valid Thru</span>
                                                            <span className="card-infodetail">{this.decodedexMonth(1)}{this.decodedexMonth(2)}/{this.decodedexYear(1)}{this.decodedexYear(2)}{this.decodedexYear(3)}{this.decodedexYear(4)}</span>
                                                        </div>
                                                        <div className="each-carddata">
                                                            <span className="card-infotext">CVV</span>
                                                            <span className="card-infodetail">{this.decodedCcv(1)}{this.decodedCcv(2)}{this.decodedCcv(3)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="cardname">
                                                        {getVirtualCardData.vc_info.response.data.alias}
                                                    </div>
                                                </div>
                                                <div className="input-ctn inputWrap">
                                                    <label>Address</label>
                                                    <Textbox
                                                        tabIndex="2"
                                                        id={'cardHolderAddress'}
                                                        name="cardHolderAddress"
                                                        disabled="true"
                                                        value={getVirtualCardData.vc_info.response.data.billingAddress}
                                                        onChange= {(cardHolderAddress, e)=>{ 
                                                           
                                                        }}
                                                        
                                                    />
                                                </div>
                                                <div className="other-addressinfo">
                                                <div className="input-ctn inputWrap">
                                                    <label>City</label>
                                                    <Textbox
                                                        tabIndex="3"
                                                        id={'cardHolderCity'}
                                                        name="cardHolderCity"
                                                        disabled="true"
                                                        value={getVirtualCardData.vc_info.response.data.billingCity}
                                                        onChange= {(cardHolderCity, e)=>{ 
                                                            
                                                        }}
                                                        
                                                    />
                                                </div>
                                                <div className="input-ctn inputWrap">
                                                    <label>State</label>
                                                    <Textbox
                                                        tabIndex="4"
                                                        id={'cardHolderState'}
                                                        name="cardHolderState"
                                                        disabled="true"
                                                        value={getVirtualCardData.vc_info.response.data.billingState}
                                                        onChange= {(cardHolderState, e)=>{ 
                                                            
                                                        }}
                                                        
                                                    />
                                                </div>
                                                <div className="input-ctn inputWrap">
                                                    <label>Zip code</label>
                                                    <Textbox
                                                        tabIndex="5"
                                                        id={'cardHolderZipcode'}
                                                        name="cardHolderZipcode"
                                                        disabled="true"
                                                        value={getVirtualCardData.vc_info.response.data.billingZipCode}
                                                        onChange= {(cardHolderZipcode, e)=>{ 
                                                            
                                                        }}
                                                        
                                                    />
                                                </div>
                                            </div>
                                            </div>
                                        
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

   


    render(){
        return(
            <Fragment>
                {this.renderCardDetails()}
            </Fragment>
        )
    }

}
function mapStateToProps(state){
    return {
        virtualCards        : state.alatCardReducersPile.getVirtualCards,
        getAVirtualCardinfo        : state.alatCardReducersPile.getAVirtualCardinfo,
        debitable_accounts  : state.accounts,
    };
}

export default connect(mapStateToProps)(VirtualCardDetails);