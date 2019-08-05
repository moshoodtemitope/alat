import * as React from "react";
import {Router, NavLink} from "react-router";
// import * as utils from "../../shared/utils";


import {getCurrentVirtualCard,
} from "../../../redux/actions/cards/cards.actions";

import { FETCH_CURRENTCARD_SUCCESS,
         FETCH_CURRENTCARD_PENDING,
         FETCH_CURRENTCARD_FAILURE} from "../../../redux/constants/cards/cards.constants";

import {Fragment} from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import whitelogo from "../../../assets/img/white-logo.svg";
import "./../cards.scss";
import * as utils from '../../../shared/utils';
import AlatPinInput from '../../../shared/components/alatPinInput';
import AmountInput from '../../../shared/components/amountInput';
const options = [
];

class VirtualCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            showNewCard: false
        };

        this.getCurrentVirtualCards = this.getCurrentVirtualCards.bind(this);
        
    }

    componentDidMount() {
        this.getCurrentVirtualCards();
    }

    getCurrentVirtualCards(){
        const { dispatch } = this.props;
        dispatch(getCurrentVirtualCard(this.state.user.token));
    }

    renderTopUpCard(){
        let {cardHolderAddress,
             nameOnCard,
             amountInNaira,
             amountInUsd,
             amountFormatted,
             dollarAmountFormatted,
             cardHolderCity,
             cardHolderState,
             cardHolderZipcode,
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
                        }else{
                            return(
                                <div className="col-sm-12">
                                    <div className="row">
                                            <div className="col-sm-12">
                                                <div className="max-600">
                                                    <div className="al-card no-pad">
                                                        {this.state.showNewCard ===false &&
                                                            <div className="transfer-ctn text-center">
                                                            <center>
                                                                <svg width="70" height="69" viewBox="0 0 105 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="0.269531">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.17665 26.1617H102.299C103.605 26.1617 104.476 27.0186 104.476 28.3037V58.2905C104.476 64.2877 99.6872 69 93.5927 69H10.8828C4.78854 69 0 64.2879 0 58.2905V28.3037C0 27.0186 0.870699 26.1617 2.17665 26.1617ZM32.649 43.2971H15.2366C13.9307 43.2971 13.06 44.1538 13.06 45.4389C13.06 46.7241 13.9307 47.5809 15.2366 47.5811H32.649C33.9549 47.5811 34.8256 46.7243 34.8256 45.4391C34.8256 44.154 33.9549 43.2971 32.649 43.2971ZM45.7085 56.1489H15.2367C13.9307 56.1489 13.06 55.292 13.06 54.0069C13.06 52.7217 13.9307 51.8649 15.2367 51.8649H45.7085C47.0144 51.8649 47.8851 52.7217 47.8851 54.0069C47.8851 55.292 47.0144 56.1489 45.7085 56.1489ZM78.3567 54.8637C79.6626 55.7205 80.9686 56.1488 82.7097 56.1488C87.4982 56.1488 91.416 52.2933 91.416 47.5811C91.416 42.8688 87.4982 39.0133 82.7097 39.0133C80.9686 39.0133 79.6626 39.4416 78.3567 40.2985C77.0508 39.4416 75.7448 39.0133 74.0036 39.0133C69.2152 39.0133 65.2974 42.8688 65.2974 47.5811C65.2974 52.2933 69.2152 56.1488 74.0036 56.1488C75.7448 56.1488 77.0508 55.7205 78.3567 54.8637Z" fill="black"/>
                                                                    <path d="M93.5928 0H10.8828C4.78853 0 0 4.71229 0 10.7097V14.9935C0 16.2787 0.870698 17.1355 2.17664 17.1355H102.299C103.605 17.1355 104.476 16.2787 104.476 14.9935V10.7097C104.476 4.71229 99.6871 0 93.5928 0Z" fill="black"/>
                                                                    </g>
                                                                </svg>
                                                                <p> You do not have an active card</p>
                                                                <button type="submit" onClick={()=>this.setState({showNewCard: true, nameOnCard: virtualCardsList.AccountName})}   
                                                                    className="btn-alat m-t-10 m-b-20 text-center">Create Card</button>
                                                            </center>
                                                            </div>
                                                        }
                                                        {this.state.showNewCard ===true &&
                                                            <div>
                                                                <h4 className="m-b-10 center-text hd-underline">Create  ALAT Dollar Card</h4>
                                                                <div className="transfer-ctn">
                                                                    <h3 className="alatcard-msg">This card cannot be used on 3D secured sites and for money transfer</h3>
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
                                                                                {nameOnCard}
                                                                            </div>
                                                                        </div>
                                                                        <div className="conversion-msg">
                                                                            $1 =  &#8358;{virtualCardsList.ngnAmountOfOneUsd}
                                                                        </div>
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
                                                                            {/* <label>Amount in Naira (Maximum  &#8358;2,000,000)</label> */}
                                                                            <AmountInput value={amountInNaira} 
                                                                                        intValue={amountFormatted}  name="Amount" 
                                                                                        label="Amount in Naira (Maximum  &#8358;2,000,000)"
                                                                                        onKeyUp={(e)=>{
                                                                                            
                                                                                            let dollarConversion = utils.formatAmount( amountFormatted / virtualCardsList.ngnAmountOfOneUsd);
                                                                                            this.setState({amountInNaira: amountFormatted, amountInUsd: dollarConversion, amountFormatted:e});
                                                                                        }}
                                                                                        onChange={(e)=>{
                                                                                            let dollarConversion = utils.formatAmount( amountFormatted / virtualCardsList.ngnAmountOfOneUsd);
                                                                                            
                                                                                            this.setState({amountInNaira: amountFormatted, amountInUsd: dollarConversion,  amountFormatted:e});
                                                                                        }} />
                                                                            {/* <Textbox
                                                                                tabIndex="2"
                                                                                id={'amountInNaira'}
                                                                                name="amountInNaira"
                                                                                value={amountInNaira}
                                                                                onChange= {(amountInNaira, e)=>{ 
                                                                                    
                                                                                    let dollarConversion = utils.formatAmount( amountInNaira / virtualCardsList.ngnAmountOfOneUsd);
                                                                                    this.setState({amountInNaira, amountInUsd: dollarConversion});
                                                                                }}
                                                                                
                                                                            /> */}
                                                                        </div>
                                                                        <div className="input-ctn inputWrap">
                                                                            {/* <label>Amount in USD (Minimum $10)</label>
                                                                            <Textbox
                                                                                tabIndex="2"
                                                                                id={'amountInUsd'}
                                                                                name="amountInUsd"
                                                                                value={amountInUsd}
                                                                                onChange= {(amountInUsd, e)=>{ 
                                                                                   
                                                                                    let nairaConversion = amountInUsd * virtualCardsList.ngnAmountOfOneUsd;
                                                                                    this.setState({amountInUsd, amountInNaira: nairaConversion});
                                                                                }}
                                                                                
                                                                            /> */}
                                                                            <AmountInput value={amountInUsd} 
                                                                                        intValue={dollarAmountFormatted}  name="Amount" 
                                                                                        label="Amount in USD (Minimum $10)"
                                                                                        onKeyUp={(e)=>{

                                                                                            let nairaConversion = amountInUsd * virtualCardsList.ngnAmountOfOneUsd;
                                                                                            this.setState({amountInUsd, amountInNaira: nairaConversion});

                                                                                            // let dollarConversion = utils.formatAmount( dollarAmountFormatted / virtualCardsList.ngnAmountOfOneUsd);
                                                                                            // this.setState({amountInUsd: dollarAmountFormatted, amountInUsd: dollarConversion, dollarAmountFormatted:e});
                                                                                        }}
                                                                                        onChange={(e)=>{

                                                                                            let nairaConversion = amountInUsd * virtualCardsList.ngnAmountOfOneUsd;
                                                                                            this.setState({amountInUsd, amountInNaira: nairaConversion});
                                                                                            
                                                                                            // let dollarConversion = utils.formatAmount( dollarAmountFormatted / virtualCardsList.ngnAmountOfOneUsd);
                                                                                            // this.setState({amountInUsd: dollarAmountFormatted, amountInUsd: dollarConversion, dollarAmountFormatted:e});
                                                                                        }} />
                                                                        </div>
                                                                        <div className="input-ctn inputWrap">
                                                                            <AlatPinInput
                                                                                value={this.state.Pin}
                                                                                onChange={this.handleAlatPinChange}
                                                                                PinInvalid={this.state.isPinInvalid}
                                                                                maxLength={4} />
                                                                        </div>
                                                                        <div className="input-ctn inputWrap">
                                                                            <center>
                                                                                <button type="submit" onClick={()=>this.setState({showNewCard: true})}   className="btn-alat m-t-10 m-b-20 text-center">Create Card</button>
                                                                            </center>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
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

        // if(dsdsd){
            
        // }
    }

    
    render() {
        return (
            <Fragment>
               { this.renderTopUpCard()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
        virtualCards: state.alatCardReducersPile.getVirtualCards,
    };
}

export default connect(mapStateToProps)(VirtualCards);
