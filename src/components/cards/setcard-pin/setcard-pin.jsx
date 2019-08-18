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
    getRandomSecurityQuestion,
    answerRandomSecurityQuestion,
    activateALATCard,
    clearCardsStore
} from "../../../redux/actions/cards/cards.actions";

import { 
    GETCURRENT_ATMCARD_SUCCESS,
    GETCURRENT_ATMCARD_PENDING,
    GETCURRENT_ATMCARD_FAILURE,
    GETRANDOM_SECURITYQUESTION_SUCCESS,
    GETRANDOM_SECURITYQUESTION_PENDING,
    GETRANDOM_SECURITYQUESTION_FAILURE,
    VALIDATE_SECURITYQUESTION_WITHOUTOTP_SUCCESS,
    VALIDATE_SECURITYQUESTION_WITHOUTOTP_PENDING,
    VALIDATE_SECURITYQUESTION_WITHOUTOTP_FAILURE,
    ACTIVATE_ALATCARD_SUCCESS,
    ACTIVATE_ALATCARD_PENDING,
    ACTIVATE_ALATCARD_FAILURE} from "../../../redux/constants/cards/cards.constants";



// const options = [
// ];

const BASEURL = routes.BASEURL;

class SetCardPin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            showError: false,
            showAcceptTerms: true,
            securityAnswer:'',
            isConfirmPanCta: false,
            showPan:false,
            confirmPin:'',
            initialPin: '',
            showSecurityQuestion: false,
            showPartialAlatCard: false,
            lastFourDigitsNum:'',
            Pin:''
        };
        
        this.makeInitialRequest             = this.makeInitialRequest.bind(this); 
        this.handleAlatPinChange            = this.handleAlatPinChange.bind(this); 
        this.handleInitialCardPinChange     = this.handleInitialCardPinChange.bind(this); 
        this.handleConfirmCardPinChange     = this.handleConfirmCardPinChange.bind(this); 
        this.submitAnswerToQuestion         = this.submitAnswerToQuestion.bind(this); 
    }

    componentDidMount() {
        this.makeInitialRequest();
        // this.getRandomQuestion();
        // this.getHotlistReasonsForCustomer();
    }


    makeInitialRequest(){
        const { dispatch } = this.props;
        dispatch(getCurrentATMCard(this.state.user.token));
        dispatch(getRandomSecurityQuestion(this.state.user.token));
    }

    // getRandomQuestion(){
    //     const { dispatch } = this.props;
        
    // }

   

    

    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }

    handleInitialCardPinChange(pin) {
        this.setState({ initialPin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isInitialPinInvalid : false})
        }
    }

    handleConfirmCardPinChange(pin) {
        this.setState({ confirmPin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isconfirmPinInvalid : false})
        }
    }

    submitAnswerToQuestion(){
        const { dispatch } = this.props;
        let payload = {
            Question: this.props.randomQuestionRequest.random_question.response.data.message,
            Answer: this.state.securityAnswer
        }
        dispatch(answerRandomSecurityQuestion(payload, this.state.user.token));
    }

    setATMPin(){
        const { dispatch } = this.props;
        let payload = {
            alatPin: this.state.Pin,
            cardPin: this.state.confirmPin,
            status:'OPEN',
            pan: this.props.existingAtmCard.atmcards_info.response.data[0].maskedPan
        }
        dispatch(activateALATCard(payload, this.state.user.token));
    }

   
    

    renderSuccesfullPinUpdate(){
        return(
                <div>
                    <center>
                        <img src={successIcon} />
                    </center>
                    <div className="m-t-30 width-300">
                        <h4 className="success-heading">ATM Card Pin Update was successful</h4>
                        <div className="success-mg">
                        Your ALAT card is active. Launch it by requesting your account balance at any ATM. Would you like to turn your card on for online payments?
                        
                        </div>
                    </div>
                    <div class="return-text"><a className="btn-alat m-t-30 text-center" onClick={(e)=>{
                                                                    e.preventDefault();
                                                                    this.props.dispatch(clearCardsStore()); 
                                                                    this.props.history.push("/dashboard");
                                                            }}> Activate Online payments</a>
                    </div>
                </div>
            
        )
    }

    renderCardInfo(){
        let {showAcceptTerms,
            lastFourDigitsNum,
            showPan,
            Pin,
            confirmPin,
            initialPin,
            isConfirmPanCta,
            showError}              =  this.state;

        let props                   = this.props,
            currentCardRequest      = props.existingAtmCard, 
            activateCardRequest     = props.activateALATCardRequest,
            cardDetails             = currentCardRequest.atmcards_info.response.data[0],
            lastFourDigits          = cardDetails.maskedPan;
            lastFourDigits          = lastFourDigits.substr(lastFourDigits.length - 4);


        let cardDesignUrl = `${BASEURL}/${cardDetails.design.url}`,
        cardStyle= {
            backgroundImage: `url('${cardDesignUrl}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        };
            return(
                <div>
                    <div className="atmcard-wrap nonvirtual" style={cardStyle}>
                        <div className="cardnum-digits">
                            {showPan && <span>{cardDetails.maskedPan}</span> }
                        
                        </div>
                        <div className="cardname">
                            {cardDetails.embossingName}
                        </div>
                        
                    </div>
                    {!isConfirmPanCta &&
                        <div>
                            <div className="input-ctn m-t-30 inputWrap">
                                <label>Enter the last four(4) digits of your ALAT Card</label>
                                <Textbox
                                    tabIndex="2"
                                    maxLength='4'
                                    id={'lastFourDigitsNum'}
                                    name="lastFourDigitsNum"
                                    value={lastFourDigitsNum}
                                    onChange= {(lastFourDigitsNum, e)=>{ 
                                        this.setState({lastFourDigitsNum, showErrorCardDigitError:false});
                                    }}
                                    
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
                        </div>
                    }

                    
                    {!isConfirmPanCta &&
                        <center>
                            {this.state.showErrorCardDigitError===true &&
                                <div className="error-msg">Please enter provide valid details</div>
                            }
                            <button type="button"  className="btn-alat m-t-10 m-b-20 text-center"
                                                                onClick={()=>{
                                                                    if(lastFourDigitsNum!=='' && lastFourDigitsNum.length===4 && lastFourDigitsNum===lastFourDigits && Pin!=='' && Pin.length===4  ){
                                                                        this.setState({showErrorCardDigitError: false, showPan:true, isConfirmPanCta:true});
                                                                        // this.submitAnswerToQuestion()
                                                                    }else{
                                                                        this.setState({showErrorCardDigitError: true, showPan:false})
                                                                    }
                                                                }}>Proceed</button>
                                    {/* <div>{(activateCardRequest.is_fetching ===false || activateCardRequest.is_fetching==undefined ) && <a className="back-cta" onClick={()=>this.setState({showAcceptTerms:true})}>Back</a> } </div> */}
                        </center>
                    }

                    {isConfirmPanCta &&
                        <div className="m-t-30">
                            <div className="input-ctn inputWrap atmpin">
                                <AlatPinInput
                                    value={this.state.initialPin}
                                    PinLabel="Set a four(4) digit PIN for your card"
                                    onChange={this.handleInitialCardPinChange}
                                    PinInvalid={this.state.isInitialPinInvalid}
                                    maxLength={4} 
                                />
                            </div>
                            <div className="input-ctn inputWrap m-t-30 atmpin">
                                <AlatPinInput
                                    value={this.state.confirmPin}
                                    PinLabel="Confirm four(4) digit PIN for your card"
                                    onChange={this.handleConfirmCardPinChange}
                                    PinInvalid={this.state.isconfirmPinInvalid}
                                    maxLength={4} 
                                />
                            </div>
                            <center>
                                {this.state.showMisMatchError===true &&
                                    <div className="error-msg">Please ensure your 4 digits ALAT Card Pin match </div>
                                }

                                {(activateCardRequest.is_processing===false && activateCardRequest.fetch_status===ACTIVATE_ALATCARD_FAILURE)&&
                                        <div className="error-msg">{activateCardRequest.activatedcard_info.error}</div>
                                }
                                <button type="button"  className="btn-alat m-t-10 m-b-20 text-center"
                                                                    onClick={()=>{
                                                                        if( (confirmPin!=='' && confirmPin.length===4 && initialPin!=='' && initialPin.length===4) 
                                                                            && confirmPin===initialPin  ){
                                                                            this.setState({showMisMatchError: false});
                                                                            this.setATMPin();
                                                                        }else{
                                                                            this.setState({showMisMatchError: true})
                                                                        }
                                                                    }}
                                                                    disabled={activateCardRequest.is_processing}>{activateCardRequest.is_processing?'Setting your ATM card pin...':'Set Pin'} </button>
                                        <div>{(activateCardRequest.is_processing ===false || activateCardRequest.is_processing==undefined ) && <a className="back-cta" onClick={()=>this.setState({isConfirmPanCta:false})}>Back</a> } </div>
                            </center>
                        </div>
                    }
                </div>
            )
        
    }


    renderSecurityQuestion(){
        let {showAcceptTerms,
            securityAnswer,
            showError}              =  this.state;

        let props                   = this.props,
            randomQuestion          = props.randomQuestionRequest, 
            randomQuestionAnswer    = props.answerRandomQuestionRequest, 
            currentCardRequest      = props.existingAtmCard; 

           return(
                <div>
                    <div className="input-ctn inputWrap">
                        <label>{randomQuestion.random_question.response.data.message}</label>
                        <Textbox
                            tabIndex="2"
                            id={'securityAnswer'}
                            name="securityAnswer"
                            value={securityAnswer}
                            onChange= {(securityAnswer, e)=>{ 
                                this.setState({securityAnswer});
                            }}
                            
                        />
                    </div>
                    <div className="input-ctn inputWrap">
                        <center>
                            {showError===true && <div className="error-msg"> Please provide answer</div>}

                            {(randomQuestionAnswer.is_processing===false && randomQuestionAnswer.fetch_status===VALIDATE_SECURITYQUESTION_WITHOUTOTP_FAILURE)&&
                                    <div className="error-msg">{randomQuestionAnswer.answer_question.error}</div>
                            }
                            <button type="button"  className="btn-alat m-t-10 m-b-20 text-center"
                                                        onClick={()=>{
                                                            if(this.state.securityAnswer!==''){
                                                                this.setState({showError: false});
                                                                this.submitAnswerToQuestion();
                                                            }else{
                                                                this.setState({showError: true})
                                                            }
                                                        }}
                                                        disabled={randomQuestionAnswer.is_processing}>{randomQuestionAnswer.is_processing?'Submitting answer...':'Submit answer'} </button>
                             <div>{(randomQuestionAnswer.is_processing ===false || randomQuestionAnswer.is_processing==undefined ) && <a className="back-cta" onClick={()=>this.setState({showAcceptTerms:true})}>Back</a> } </div>
                        </center>
                    </div>
                </div>
        )
    }

    renderSetPinWrapper(){
        let {showAcceptTerms,
            securityAnswer,
            showError}         =  this.state;
        let props                   = this.props,
            randomQuestion          = props.randomQuestionRequest, 
            randomQuestionAnswer    = props.answerRandomQuestionRequest, 
            activateCardRequest     = props.activateALATCardRequest,
            currentCardRequest      = props.existingAtmCard; 

        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                            <h4 class="m-b-10 center-text hd-underline">Set your ALAT Card Pin</h4>
                                <div className="transfer-ctn ">

                                    {/* Loading Current ATM Card and Random question */}
                                    {(currentCardRequest.is_processing === GETCURRENT_ATMCARD_PENDING ||
                                            randomQuestion.fetch_status === GETRANDOM_SECURITYQUESTION_PENDING) &&
                                                <center>
                                                    Loading ATM card details...
                                                </center>
                                    }

                                    {/* If Loading Current ATM Card and/or Fails */}
                                    {(currentCardRequest.is_processing === GETCURRENT_ATMCARD_FAILURE ||
                                            randomQuestion.fetch_status === GETRANDOM_SECURITYQUESTION_FAILURE) &&
                                                <center>
                                                    An error occured
                                                    <a className="cta-link tobottom text-center" onClick={this.makeInitialRequest}>Try again</a>
                                                </center>
                                    }

                                    {/* Show acceptance message */}
                                    {showAcceptTerms && 
                                        (randomQuestion.fetch_status===GETRANDOM_SECURITYQUESTION_SUCCESS &&
                                         currentCardRequest.fetch_status===GETCURRENT_ATMCARD_SUCCESS) &&
                                        <div className="accept-msg text-center">
                                            <span> By clicking the button below, you hereby agree that you have read our terms and coditions of service</span>
                                            <center>
                                                <button type="button"  className="btn-alat m-t-10 m-b-20 text-center"
                                                                        onClick={()=>this.setState({showAcceptTerms:false})}> Accept Terms and Proceed</button>
                                            </center>
                                        </div>
                                    }

                                    {/* Show Random Question */}

                                    {!showAcceptTerms && (randomQuestionAnswer.fetch_status!==VALIDATE_SECURITYQUESTION_WITHOUTOTP_SUCCESS) &&
                                       this.renderSecurityQuestion()
                                    }

                                    {/* Show Card Details and Accept Card Pin */}

                                    {(!showAcceptTerms && (randomQuestionAnswer.fetch_status===VALIDATE_SECURITYQUESTION_WITHOUTOTP_SUCCESS)
                                        && activateCardRequest.fetch_status!==ACTIVATE_ALATCARD_SUCCESS) &&
                                       this.renderCardInfo()
                                    }

                                    {/* Show message for Successfully Updated Card Pin */}
                                    {activateCardRequest.fetch_status===ACTIVATE_ALATCARD_FAILURE &&
                                        this.renderSuccesfullPinUpdate()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
           
    }

    
    render() {
        
        return (
            <Fragment>
                
                {this.renderSetPinWrapper()}
                
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    console.error(state);
    return {
        existingAtmCard                 : state.alatCardReducersPile.getAtmCard,
        randomQuestionRequest           : state.alatCardReducersPile.randomQuestionRequest,
        answerRandomQuestionRequest     : state.alatCardReducersPile.answerRandomQuestionRequest,
        activateALATCardRequest         : state.alatCardReducersPile.activateALATCardRequest
    };
}

export default connect(mapStateToProps)(SetCardPin);
