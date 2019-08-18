import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import AlatPinInput from '../../../shared/components/alatPinInput';
import "./../cards.scss";
import * as utils from '../../../shared/utils';
import whitelogo from "../../../assets/img/white-logo.svg"; 
import  {routes} from '../../../services/urls';
import emptyVC from "../../../assets/img/credit-card-2.svg"; 
import successIcon from "../../../assets/img/success-tick";
import {getCurrentATMCard,
    getATMCardHotlistReasons,
    hotlistATMCard
} from "../../../redux/actions/cards/cards.actions";

import { GETCURRENT_ATMCARD_SUCCESS,
    GETCURRENT_ATMCARD_PENDING,
    GETCURRENT_ATMCARD_FAILURE,
    GET_ATMCARD_HOTLISTREASONS_SUCCESS,
    GET_ATMCARD_HOTLISTREASONS_PENDING,
    GET_ATMCARD_HOTLISTREASONS_FAILURE,
    HOTLIST_ATMCARD_SUCCESS,
    HOTLIST_ATMCARD_PENDING,
    HOTLIST_ATMCARD_FAILURE} from "../../../redux/constants/cards/cards.constants";

const options = [
];

const BASEURL = routes.BASEURL;

class HotlistCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            showError: false,
            selectedHotlistReason:'',
            Pin:''
        };
        this.getHotlistReasonsForCustomer   = this.getHotlistReasonsForCustomer.bind(this);
        this.getCustomerCurrentAtmCard      = this.getCustomerCurrentAtmCard.bind(this);
        this.handleChange                   = this.handleChange.bind(this);
        this.handleAlatPinChange            = this.handleAlatPinChange.bind(this);
        
    }

    componentDidMount() {
        this.getCustomerCurrentAtmCard();
        this.getHotlistReasonsForCustomer();
    }


    getCustomerCurrentAtmCard(){
        const { dispatch } = this.props;
        dispatch(getCurrentATMCard(this.state.user.token, 'new'));
    }

    getHotlistReasonsForCustomer(){
        const { dispatch } = this.props;
        dispatch(getATMCardHotlistReasons(this.state.user.token, 'new'));
    }

    processCardHotlist(){
        const { dispatch } = this.props;
        let payload = {
            AlatPin: this.state.Pin,
            Pan : this.props.existingAtmCard.atmcards_info.response.data[0].maskedPan,
            Reason :this.state.selectedHotlistReason.label
        }
        
        dispatch(hotlistATMCard(payload, this.state.user.token));
    }

    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }

    handleChange(selectedHotlistReason){
        this.setState({ selectedHotlistReason });
    }

    renderSuccesfullHotlist(){
        return(
            <div className="col-sm-12">
                <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <div className="transfer-ctn text-center">
                                        <div>
                                            <center>
                                                <img src={successIcon} />
                                            </center>
                                            <div className="m-t-30 width-300">
                                                <h4 className="success-heading">ATM Card Block was successful</h4>
                                                <div className="success-mg">
                                                    You just blocked your ALAT ATM card 
                                                </div>
                                            </div>
                                            <div class="return-text"><a onClick={(e)=>{e.preventDefault();
                                                                                            this.props.dispatch(clearCardsStore()); 
                                                                                            this.props.history.push("/dashboard");
                                                                                    }}> Return to dashboard</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            
        )
    }


    renderHotlistCard(){
        
        let props = this.props,
            getHotlistReasons = props.atmCardHotlistReasons;

            switch (getHotlistReasons.fetch_status){
                case GET_ATMCARD_HOTLISTREASONS_PENDING:
                        return(
                            <select disabled>
                                <option>Fetching hotlist reasons...</option>
                            </select>
                        );
                case GET_ATMCARD_HOTLISTREASONS_SUCCESS:
                    let hotlistReasons = getHotlistReasons.hotlistreason_info.response.data,
                        hotlistRequest = this.props.atmHotlistRequest;
                        let options = [];
                    let {showError}= this.state;
                        hotlistReasons.map(reason=>{
                                options.push({value:reason.hotlistReasonModelId,
                                            label: reason.hotlistReason
                                })
                        }); 
                        return(
                            <div className="reasonwrap">
                                <div className="input-ctn inputWrap">
                                    <label> Why do you want to block your card?</label>
                                    <Select
                                        options={options}
                                        // isDisabled={this.state.submitButtonState}
                                        placeholder="Select reason to block card"
                                        // onInputChange={this.handleChange}
                                        onChange={this.handleChange}
                                    />
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
                                        {showError===true && <div className="error-msg"> Please provide all details</div>}

                                        {(hotlistRequest.is_processing===false && hotlistRequest.fetch_status===HOTLIST_ATMCARD_FAILURE)&&
                                                <div className="error-msg">{hotlistRequest.hotlistcard_info.error}</div>
                                        }
                                        <button type="button"  className="btn-alat m-t-10 m-b-20 text-center"
                                                                    onClick={()=>{
                                                                        
                                                                        if(this.state.selectedHotlistReason!=='' && this.state.Pin!==''){
                                                                            this.setState({showError: false});
                                                                            this.processCardHotlist();
                                                                        }else{
                                                                            this.setState({showError: true})
                                                                        }
                                                                    }}
                                                                    disabled={hotlistRequest.is_processing}>{hotlistRequest.is_processing?'Blocking your card...':'Hotlist Card'} </button>
                                    </center>
                                </div>
                            </div>
                        )
                case GET_ATMCARD_HOTLISTREASONS_FAILURE:
                        return(
                            <div className="text-center">
                                <select className="error-field" disabled>
                                    <option>Unable to load hotlist reasons</option>
                                </select>
                                <a className="cta-link tobottom" onClick={this.getHotlistReasonsForCustomer}>Try again</a>
                            </div>
                        );
            }

    }

    renderCustomerAtmCard(){
        let props = this.props,
            getCustomerAtmDetails      = props.existingAtmCard;

            switch (getCustomerAtmDetails.fetch_status){
                case GETCURRENT_ATMCARD_PENDING:
                        return(
                            <div className="col-sm-12">
                                <div className="row">
                                        <div className="col-sm-12">
                                            <div className="max-600">
                                                <div className="al-card no-pad">
                                                    <div className="transfer-ctn text-center">
                                                        Loading ATM card details...
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        );
                case GETCURRENT_ATMCARD_SUCCESS:
                    let cardDetails = getCustomerAtmDetails.atmcards_info.response.data;

                        if(cardDetails.length>=1){
                            cardDetails = getCustomerAtmDetails.atmcards_info.response.data[0];
                            

                            let cardDesignUrl = `${BASEURL}/${cardDetails.design.url}`,
                            cardStyle= {
                                backgroundImage: `url('${cardDesignUrl}')`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center'
                            };
                                return(
                                    <div className="col-sm-12">
                                        <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="max-600">
                                                        <div className="al-card no-pad">
                                                            <div className="transfer-ctn">
                                                                <div className="atmcard-wrap nonvirtual" style={cardStyle}>
                                                                    <div className="cardnum-digits">
                                                                    {cardDetails.maskedPan}
                                                                    </div>
                                                                    <div className="cardname">
                                                                        {cardDetails.embossingName}
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="error-msg"> You would have to request a new card once you do this</div>
                                                                {this.renderHotlistCard()}
                                                            </div>
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
                                                        <div className="transfer-ctn">
                                                            <center>
                                                                <img className="nocards-icon" src={emptyVC} />
                                                                    <p> You currently do not have an  ALAT card</p>
                                                                    <button type="submit" onClick={()=>this.props.history.push("/cards")}   
                                                                        className="btn-alat m-t-10 m-b-20 text-center">Request Card</button>
                                                                </center>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            )
                        }
                case GETCURRENT_ATMCARD_FAILURE:
                        return(
                            <div className="col-sm-12">
                                <div className="row">
                                        <div className="col-sm-12">
                                            <div className="max-600">
                                                <div className="al-card no-pad">
                                                    <div className="transfer-ctn">
                                                        <div className="text-center">
                                                            Unable to load your ATM Card details
                                                            <a className="cta-link tobottom text-center" onClick={this.getCustomerCurrentAtmCard}>Try again</a>
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

    
    render() {
        let hotlistRequest = this.props.atmHotlistRequest;
        return (
            <Fragment>
                {(hotlistRequest.fetch_status !== HOTLIST_ATMCARD_SUCCESS)&&
                    
                        this.renderCustomerAtmCard()
                }   
                
                {(hotlistRequest.fetch_status===HOTLIST_ATMCARD_SUCCESS)&&
                    <div>
                        {this.renderSuccesfullHotlist()}
                    </div>
                }
                
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    console.error(state);
    return {
        atmCardHotlistReasons        : state.alatCardReducersPile.getAtmCardHotlistReasons,
        existingAtmCard              : state.alatCardReducersPile.getAtmCard,
        atmHotlistRequest            : state.alatCardReducersPile.atmCardHotlistRequest
    };
}

export default connect(mapStateToProps)(HotlistCard);
