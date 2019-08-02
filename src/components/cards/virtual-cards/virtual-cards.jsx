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
const options = [
];

class VirtualCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
        
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
                        console.log('number of cards', virtualCardsList.length);
                        if(virtualCardsList.length>=1){
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
                                                        <div className="transfer-ctn text-center">
                                                           You do not an active card
                                                           <center>
                                                                <button type="submit"  className="btn-alat m-t-10 m-b-20 text-center">Create Card</button>
                                                                
                                                            </center>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            );
                        }
                case FETCH_CURRENTCARD_FAILURE:
                        return(
                            <div>An error occured. Plea</div>
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
