import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import { alertActions } from '../../../redux/actions/alert.actions';
import imgWallet from '../../../assets/img/wallet-3.svg';
import Modal from 'react-responsive-modal';
class FundCardIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            openModal : false,
            selectedCard: {}


        };

        //this.deleteCard = this.deleteCard.bind(this);
    }

    init() {
        this.props.dispatch(actions.getTokenizedCards(this.state.user.token));
    }

    componentDidMount() {
        this.init();
    }

    selectCard=(card)=>{
        var _card ={
            ...card,
            isBene: true
        }

        this.props.dispatch(actions.fundCardDetails(_card));
        //console.log(e.currentTarget.dataset);
    }

    deleteCard=()=>{
        let payload ={
            TokenizedAlias: this.state.selectedCard.TokenizedAlias,
            CardPan: this.state.selectedCard.MaskedPan,
            //Cvv: "sample string 3",
            ExpiryMonth: this.state.selectedCard.ExpiryMonth,
            ExpiryYear: this.state.selectedCard.ExpiryYear,
            AlatCardUid: this.state.selectedCard.UID
          }
       this.props.dispatch(actions.deleteCard(this.state.user.token, payload));
    }

    getDeleteStatus=()=>{
        if(this.props.delete_card.delete_card_status == 
            fundAccountConstants.DELETE_SAVED_CARD_PENDING)
            { return true}
            else return false;
    }

    toggleModal = (e, card) => {
        if(e){
        e.stopPropagation();
        this.setState({ selectedCard: card})
        }

        if (this.state.openModal)
            this.setState({ openModal: false })
        else this.setState({ openModal: true });

    }

    renderCardList(cardList) {
        return (
            cardList.map((card, key) => {
                return (
                    <div className="fund-card"
                      onClick={()=>this.selectCard(card)}
                      key={key}>
                        <div>
                            <span className="card-alias">{card.TokenizedAlias}</span>
                            <span className="price"><a onClick={(e)=>this.toggleModal(e,card)}><i
                                className="fa fa-trash-o"></i></a></span>
                            <p className="card-digit">
                                <span className="card-star">****</span>
                                <span className="card-star">****</span>
                                <span className="card-star">****</span>
                                <span className="card-no">{card.MaskedPan.substr(-4)}</span></p>
                            <p className="card-expires no-pad">EXPIRES: {card.ExpiryMonth}/{card.ExpiryYear}</p>
                        </div>
                    </div>
                )
            })
        )

    }

    emptyCardList() {
        if (this.props.cards.get_card_status === fundAccountConstants.GET_TOKENIZED_CARDS_SUCCESS) {
            if (this.props.cards.get_card_data.response.length >= 1) {
                return (<Fragment>
                    <div className="al-card no-pad">
                        <div className="hd-underline line-header">
                            <h4 className=" center-text ">Fund from card
										</h4><Link to={'/fund/card/details'} className="btn-alat btn-alat-small">new card</Link>
                        </div>
                        <div className="max-600">
                            <div className="transfer-ctn">
                                <div className="fund-card-ctn">
                                    {this.renderCardList(this.props.cards.get_card_data.response)}
                                </div>
                            </div>
                        </div>

                    </div>
                    <Modal open={this.state.openModal} onClose={this.toggleModal} center>
                            <div className="div-modal">
                                {this.props.alert && this.props.alert.message &&
                                    <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                }

                                <h3>You want to delete<br /><strong>

                                    {this.state.selectedCard && <span>{this.state.selectedCard.TokenizedAlias}</span>}<br />
                                    {this.state.selectedCard && <span> {this.state.selectedCard.MaskedPan}</span>}
                                </strong>.<br /> Do you want to proceed?</h3>

                                <div className="btn-opt">
                                    <button onClick={this.toggleModal} className="border-btn">Back</button>
                                    <button onClick={this.deleteCard} disabled={this.getDeleteStatus()}
                                        className="btn-alat">{this.getDeleteStatus() ? "Processing..." : "Proceed"}</button>
                                </div>
                            </div>
                        </Modal>
                </Fragment>)
            }
            else
                return (
                    <Fragment>
                        <div className="al-card no-pad">
                            <h4 className="m-b-10 center-text hd-underline">Fund from card</h4>
                            <div className="max-600 m-t-40">
                                <center>
                                    <img src={imgWallet} className="m-b-30" />
                                    <p className="grey-text no-paylink">You do not have any cards saved yet</p>
                                </center>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <center>
                                        <Link to={"/fund/card/details"}><button className="btn-alat m-t-10 m-b-20 text-center" type="submit">New Card</button></Link>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
        } else {
            return (
                <Fragment>
                    <div className="al-card no-pad">
                        <h4 className="m-b-10 center-text hd-underline">Fund from card</h4>
                        <div className="max-600 m-t-40">
                            <center>
                                <img src={imgWallet} className="m-b-30" />
                                {this.props.cards.get_card_status === fundAccountConstants.GET_TOKENIZED_CARDS_PENDING &&
                                    <p className="grey-text no-paylink">loading your saved cards...</p>}
                                {this.props.cards.get_card_status === fundAccountConstants.GET_TOKENIZED_CARDS_FAILURE &&
                                    <p style={{ textDecoration: "underline", cursor: "pointer", color: "red" }}
                                        onClick={() => this.init()}>
                                        Unable to load saved cards, Click to retry.</p>}
                            </center>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <center>
                                    <Link to={"/fund/card/details"}><button className="btn-alat m-t-10 m-b-20 text-center" type="submit">New Card</button></Link>
                                </center>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }

    }


    render() {
        if(this.props.delete_card){ 
            if(this.props.delete_card.delete_card_status === fundAccountConstants.DELETE_SAVED_CARD_SUCCESS) {
            this.props.dispatch(actions.ClearAction(fundAccountConstants.DELETE_SAVED_CARD_CLEAR));
             this.toggleModal();
              this.init();}
          }

          if(this.props.card_details){
            if(this.props.card_details.card_details_status === fundAccountConstants.FUNDCARD_DETAILS_SUCCESS)
               this.props.history.push("/fund/card/select-account")}

        return (
            <Fragment>
                {this.emptyCardList()}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        cards: state.fundAccountReducerPile.getTokencards,
        delete_card: state.fundAccountReducerPile.deleteCard,
        card_details : state.fundAccountReducerPile.cardDetails
    };
}
export default connect(mapStateToProps)(FundCardIndex);