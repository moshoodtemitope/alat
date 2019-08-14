import * as React from "react";
import {Router, NavLink} from "react-router";
// import * as utils from "../../shared/utils";
import {Fragment} from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import whitelogo from "../../../assets/img/white-logo.svg"; 
import {getCurrentVirtualCard,
} from "../../../redux/actions/cards/cards.actions";

import { FETCH_CURRENTCARD_SUCCESS,
    FETCH_CURRENTCARD_PENDING,
    FETCH_CURRENTCARD_FAILURE} from "../../../redux/constants/cards/cards.constants";

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

    
    getCurrentVirtualCards(){
        const { dispatch } = this.props;
        dispatch(getCurrentVirtualCard(this.state.user.token, 'topup'));
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
                        
                        if(Array.isArray(virtualCardsList) && virtualCardsList.length>=1){
                            return(
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="max-600">
                                                <div className="al-card no-pad">
                                                    <div className="sub-tab-nav inpage-nav">
                                                        <ul>
                                                            <li> <Link to={'virtual-cards'}>Top Up</Link></li>
                                                            <li> <Link to={'/virtual-cards/history'}> Transaction History</Link></li>
                                                            <li> <Link to={'/virtual-cards/liquidate'}>Liquidate Card</Link></li>
                                                            <li> <Link to={'/virtual-cards/delete'}>Delete Card</Link></li>
                                                        </ul>
                                                    </div>
                                                    <div className="transfer-ctn">
                                                        <form>
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
                                                                    sikiru
                                                                </div>
                                                            </div>
                                                            <div className="input-ctn inputWrap">
                                                                <label>Address</label>
                                                                <Textbox
                                                                    tabIndex="2"
                                                                    id={'cardHolderAddress'}
                                                                    name="cardHolderAddress"
                                                                    value={cardHolderAddress}
                                                                    onChange= {(cardHolderAddress, e)=>{ 
                                                                        console.log('value is', cardHolderAddress);
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
                                                                        value={cardHolderCity}
                                                                        onChange= {(cardHolderCity, e)=>{ 
                                                                            console.log('value is', cardHolderCity);
                                                                        }}
                                                                        
                                                                    />
                                                                </div>
                                                                <div className="input-ctn inputWrap">
                                                                    <label>State</label>
                                                                    <Textbox
                                                                        tabIndex="4"
                                                                        id={'cardHolderState'}
                                                                        name="cardHolderState"
                                                                        value={cardHolderState}
                                                                        onChange= {(cardHolderState, e)=>{ 
                                                                            console.log('value is', cardHolderState);
                                                                        }}
                                                                        
                                                                    />
                                                                </div>
                                                                <div className="input-ctn inputWrap">
                                                                    <label>Zip code</label>
                                                                    <Textbox
                                                                        tabIndex="5"
                                                                        id={'cardHolderZipcode'}
                                                                        name="cardHolderZipcode"
                                                                        value={cardHolderZipcode}
                                                                        onChange= {(cardHolderZipcode, e)=>{ 
                                                                            console.log('value is', cardHolderZipcode);
                                                                        }}
                                                                        
                                                                    />
                                                                </div>
                                                            </div>
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

    renderAccountAndPin(){

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
        debitable_accounts  : state.accounts,
    };
}

export default connect(mapStateToProps)(TopUpVirtualCards);