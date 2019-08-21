import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import Slider from 'react-animated-slider';
import "./../cards.scss";
import  {routes} from '../../../services/urls';
import whitelogo from "../../../assets/img/white-logo.svg"; 
import emptyVC from "../../../assets/img/credit-card-2.svg"; 
import successIcon from "../../../assets/img/success-tick.svg";

import {
    LOADING_INFOFOR_CARDREQUEST_SUCCESS,
    LOADING_INFOFOR_CARDREQUEST_PENDING,
    LOADING_INFOFOR_CARDREQUEST_FAILURE,
    REQUESTINGOTP_FOR_CARDREQUEST_SUCCESS,
    REQUESTINGOTP_FOR_CARDREQUEST_PENDING,
    REQUESTINGOTP_FOR_CARDREQUEST_FAILURE,
    POSTINGDATA_FOR_CARDREQUEST_SUCCESS,
    POSTINGDATA_FOR_CARDREQUEST_PENDING,
    POSTINGDATA_FOR_CARDREQUEST_FAILURE,
} from "../../../redux/constants/cards/cards.constants";

import {
    loadInfoForCardRequest,
    requestOtpForNewATMCard,
    postDataForNewATMCard,
    clearCardsStore
} from "../../../redux/actions/cards/cards.actions";

// const options = [
// ];

const BASEURL = routes.BASEURL;

class RequestCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
        
        this.getCustomerATMCardsData    = this.getCustomerATMCardsData.bind(this);
    }

    componentDidMount() {
        this.getCustomerATMCardsData()
    }

    getCustomerATMCardsData(){
        const { dispatch } = this.props;
        dispatch(loadInfoForCardRequest(this.state.user.token));

    }


    renderExistingCard(){
        let props = this.props,
        loadCardsInfo = props.infoForCardRequest;

        let cardInfoFromRequest = loadCardsInfo.atmcard_info.response,
        cardDesignUrl, cardStyle, cardDesignId, cardDesignObj,allDesigns;

        allDesigns  = cardInfoFromRequest.allCardDesigns;
        cardDesignId = cardInfoFromRequest.cardDeisgnId[0];
        cardDesignObj = allDesigns.filter(eachDesign=>eachDesign.id===cardDesignId)[0];
    

        

        console.log('design ids', cardDesignObj);
        cardDesignUrl = `${BASEURL}/${cardDesignObj.url}`,
        cardStyle= {
            backgroundImage: `url('${cardDesignUrl}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        };
        return(
            <div className="transfer-ctn">
                <div className="atmcard-wrap nonvirtual" style={cardStyle}>
                </div>
                {cardDesignObj.isActive===true&&
                    <div className="card-msg text-center m-t-20">You have an active ALAT CARD</div>
                }
                
                {cardDesignObj.isActive!==true&&
                    <div className="card-msg text-center m-t-20">You ALAT CARD is not yet active</div>
                }
            </div>
        )
    }

    renderChooseCardDesign(){
        let props = this.props,
        loadCardsInfo = props.infoForCardRequest;
        let cardInfoFromRequest = loadCardsInfo.atmcard_info.response,
        allDesigns  = cardInfoFromRequest.allCardDesigns,cardDesignUrl,
        cardStyle= {
            // backgroundImage: `url('${cardDesignUrl}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        };
        
        return(
            <Slider duration="500" infinite="true" emulateTouch="true">
                {allDesigns.map((eachDesign, key)=>{
                    
                    cardDesignUrl = `${BASEURL}/${eachDesign.url}`,
                    // cardStyle.backgroundImage = `url(${BASEURL}/${eachDesign.url})`;
                    console.log('dsdsdsdsd',cardStyle );
                    return(
                        cardStyle.backgroundImage = `url(${BASEURL}/${eachDesign.url})`,
                        <div className="atmcard-wrap nonvirtual choosecard" style={{backgroundImage : `url(${BASEURL}/${eachDesign.url})`}} key={key}>
                        </div>
                    )
                })}
            </Slider>
        )
    }

    renderRequestNewCardScreen1(){
        let props = this.props,
            loadCardsInfo = props.infoForCardRequest;


            switch(loadCardsInfo.fetch_status){
                case LOADING_INFOFOR_CARDREQUEST_PENDING:
                    return(
                        <div className="transfer-ctn">
                            <div className="text-center">
                                Loading your card details...
                            </div>
                        </div>
                    );

                case LOADING_INFOFOR_CARDREQUEST_SUCCESS:
                    let cardInfoFromRequest = loadCardsInfo.atmcard_info.response;
                    console.log('atm data',loadCardsInfo.atmcard_info.response);
                        // if(cardInfoFromRequest.cardDeisgnId.length===0){
                        //     return(
                        //         <div>
                        //             {this.renderNoAlatCard()}
                        //         </div>
                        //     );
                        // }else{
                        //     return(
                        //         <div className="">
                        //             {this.renderExistingCard()}
                        //         </div>
                        //     );
                        // }
                        return(
                            <div>
                                {this.renderNoAlatCard()}
                            </div>
                        )
                        
                case LOADING_INFOFOR_CARDREQUEST_FAILURE:
                        let loadCardError = loadCardsInfo.atmcard_info.error;
                        return(
                            <div className="transfer-ctn">
                                <div className="text-center">
                                    <div>{loadCardError}</div>
                                    <a className="cta-link" onClick={this.getCustomerATMCardsData}> Retry</a>
                                </div>
                            </div>
                        );

                        
            }
        
    }

    renderNoAlatCard(){
        return(
            <div>
                <div className="transfer-ctn">
                    <center>
                        <img className="nocards-icon" src={emptyVC} />
                        <p> You currently do not have an  ALAT card</p>
                        <button type="submit"  
                            className="btn-alat m-t-10 m-b-20 text-center">Request Card</button>
                    </center>
                </div>
                {this.renderChooseCardDesign()}
            </div>
        )
    }

   


    renderCardRequestWrapper(){
        let {user} = this.state;
        if(user.isAlatPinSet===true){
            return(
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">Request an ALAT ATM Card</h4>
                                    {/* <div className="transfer-ctn"> */}
                                            {this.renderRequestNewCardScreen1()}
                                    {/* </div> */}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">Set your ALAT Card Pin</h4>
                                    <div className="transfer-ctn text-center">
                                        <div className="nopin-msg">You need to set a PIN to continue</div> 
                                        <div>
                                            <button type="button" onClick={()=> this.props.history.push("/setcard-pin")}   
                                                className="btn-alat m-t-10 m-b-20 text-center">Set ALAT Pin</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    
    render() {
        return (
            <Fragment>
                {this.renderCardRequestWrapper()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    console.error(state);
    return {
        infoForCardRequest   : state.alatCardReducersPile.infoForATMCardRequest,
        otpForCardRequest   : state.alatCardReducersPile.otpForATMCardRequest,
        postCardRequest   : state.alatCardReducersPile.postATMCardRequest,
    };
}

export default connect(mapStateToProps)(RequestCard);
