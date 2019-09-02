import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox, Textarea} from "react-inputs-validation";
import Slider from 'react-animated-slider';
import "./../cards.scss";
import  {routes} from '../../../services/urls';
import whitelogo from "../../../assets/img/white-logo.svg"; 
import emptyVC from "../../../assets/img/credit-card-2.svg"; 
import successIcon from "../../../assets/img/success-tick.svg";
import AlatPinInput from '../../../shared/components/alatPinInput';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';

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
            selectedDesignId: '',
            showChooseDesign: false,
            showDeliveryLocation: false,
            showNoCards: true,
            addressLandmark:'',
            deliveryAddress:'',
            deactivateCities: true,
            isRenderSummary: false,
            citiesList :[],
            selectedState:'',
            selectedCity: '',
            isCardSelected:'',
            selectedAccount:''
            // isCardSelected: false,
        };

        console.log('user is', this.state.user);
        
        this.getCustomerATMCardsData            = this.getCustomerATMCardsData.bind(this);
        this.selectADesign                      = this.selectADesign.bind(this);
        this.handleStateChange                  = this.handleStateChange.bind(this);
        this.handleCitiesChange                 = this.handleCitiesChange.bind(this);
        this.handleAlatPinChange                = this.handleAlatPinChange.bind(this);
        this.handleSelectDebitableAccounts      = this.handleSelectDebitableAccounts.bind(this);
    }

    componentDidMount() {
        this.getCustomerATMCardsData()
    }

    getCustomerATMCardsData(){
        const { dispatch } = this.props;
        dispatch(loadInfoForCardRequest(this.state.user.token));

    }

    getCustomerOTP(){
        const { dispatch } = this.props;
        let payload={
            phoneNo:this.state.user.phoneNo,
            otpType:null,
            imei:"123456789012345"
        },
        newCardRequestData={
            DeliveryOption      :  "LocationDelivery",
            NameOnCard          :   this.state.nameOnCard,
            Pin                 :   this.state.Pin,
            AccountNumber       :   this.state.selectedAccount,
            State               :   this.state.selectedState.value,
            City                :   this.state.selectedCity.value,
            StreetAddress       :   this.state.deliveryAddress,
            NearestBustop       :   this.state.addressLandmark,
            CardId              :   this.state.selectedDesignId,
            PhoneNo             :   this.state.user.phoneNo,
            ChannelId           :   2
        }
        dispatch(requestOtpForNewATMCard(payload, this.state.user.token, newCardRequestData));

    }

    handleSelectDebitableAccounts(account) {
        let allDebitableAccounts = this.props.debitable_accounts.debitable_accounts_data.data,
            selectedDebitableAccount = allDebitableAccounts.filter(accountDetails=>accountDetails.AccountNumber ===account),
            transferLimit =selectedDebitableAccount[0].MaxIntraBankTransferLimit;

            
        this.setState({ selectedAccount: account, selectedDebitableAccount, isSelectChanged:true, transferLimit});

    }

    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
    }


    renderExistingCard(){
        let props = this.props,
        loadCardsInfo = props.infoForCardRequest;

        let cardInfoFromRequest = loadCardsInfo.atmcard_info.response,
            panDetails = loadCardsInfo.atmcard_info.response.pans,
            cardDesignUrl, cardStyle, cardDesignId, cardDesignObj,allDesigns;

        allDesigns  = cardInfoFromRequest.allCardDesigns;
        cardDesignId = cardInfoFromRequest.cardDesignId[0];
        cardDesignObj = allDesigns.filter(eachDesign=>eachDesign.id===cardDesignId)[0];
    

        

        
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
                    {panDetails!==null && 
                        <div>
                            <div className="carddata">
                                <div className="cardname">{panDetails[0].embossingName}</div>
                            </div>
                        </div>
                    }
                    
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

    selectADesign(e){
        
        document.querySelectorAll('.choosecarddesign').forEach((eachDesign)=>{
            if(eachDesign.classList.contains('selected-design')){
                eachDesign.classList.remove('selected-design');
            }
        })
        e.target.classList.add('selected-design')
        this.setState({selectedDesignId: e.target.getAttribute('data-designid'), isCardSelected:true});

    }

    handleSlideChange(event){
        let{selectedDesignId} = this.state;

        if(selectedDesignId!==''){
            document.querySelectorAll('.choosecarddesign').forEach((eachDesign)=>{
                if(eachDesign.getAttribute('data-designid')===selectedDesignId){
                    eachDesign.classList.add('selected-design');
                }
            })
        }

    }

    renderNoAlatCard(){
        let {showNoCards, 
            showChooseDesign,
            showDeliveryLocation,
            isRenderSummary } = this.state;
        return(
            <div>
                {showNoCards &&
                <div className="transfer-ctn">
                    <center>
                        <img className="nocards-icon" src={emptyVC} />
                        <p> You currently do not have an  ALAT card</p>
                        <button type="submit"  
                            className="btn-alat m-t-10 m-b-20 text-center"
                            onClick={()=>this.setState({showChooseDesign: true,showNoCards: false, nameOnCard: this.state.user.fullName})}>Request Card</button>
                    </center>
                </div>
                }

                {showChooseDesign &&
                    this.renderChooseCardDesign()
                }

                {showDeliveryLocation &&
                    this.renderDeliveryLocationForm()
                }
                {isRenderSummary &&
                    this.renderSummary()
                }
            </div>
        )
    }

    renderChooseCardDesign(){
        let {isCardSelected, 
            selectedDesignId,
            isNameEmpty,
            nameOnCard} = this.state;
        let props = this.props,
        loadCardsInfo = props.infoForCardRequest;
        let cardInfoFromRequest = loadCardsInfo.atmcard_info.response,
        allDesigns  = cardInfoFromRequest.allCardDesigns,
        cardDesignUrl,
        cardStyle= {
            // backgroundImage: `url('${cardDesignUrl}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        };
        
        return(

            <div className="design-options-wrap">
                <h4 className="text-center m-b-20 m-t-30">Select card Design <small className="helptext">Click to Choose a design below.</small></h4>
                <Slider duration="500" infinite="true" emulateTouch="true" onSlideChange={event => this.handleSlideChange(event)}>
                    {allDesigns.map((eachDesign, key)=>{
                        
                        cardDesignUrl = `${BASEURL}/${eachDesign.url}`;
                        // cardStyle.backgroundImage = `url(${BASEURL}/${eachDesign.url})`;
                       
                        return(
                            cardStyle.backgroundImage = `url(${BASEURL}/${eachDesign.url})`,
                            <div className="atmcard-wrap nonvirtual choosecarddesign" onClick={this.selectADesign} data-designid={eachDesign.id} style={{backgroundImage : `url(${BASEURL}/${eachDesign.url})`}} key={key}>
                            </div>
                        )
                    })}
                </Slider>
                <div className="input-ctn m-t-30 inputWrap">
                    <label>Name on Card <small>(Edit the name that appears on your card)</small></label>
                    <Textbox
                        tabIndex="2"
                        id={'nameOnCard'}
                        name="nameOnCard"
                        placeholder="Enter your full address"
                        value={nameOnCard}
                        onChange= {(nameOnCard, e)=>{ 
                            this.setState({nameOnCard});
                        }}
                        
                    />
                </div>
                <center>
                    {isCardSelected===false && <div className="error-msg"> Please click to choose a design above</div>}
                    {isNameEmpty===false && <div className="error-msg"> Please provide a name on your ALAT ATM card</div>}
                    <button type="submit"  
                        className="btn-alat m-t-10 m-b-20 text-center"
                        onClick={()=>{
                                if(selectedDesignId!=='' && nameOnCard!==''){
                                    this.setState({isCardSelected: true, showChooseDesign: false, showDeliveryLocation: true, isNameEmpty: false});
                                }else{
                                    this.setState({isCardSelected: false});
                                    if(nameOnCard!==''){
                                        this.setState({isNameEmpty: true});
                                    }
                                }
                                
                            }}>Proceed</button>
                </center>

            </div>
        )
    }

    renderDeliveryLocationForm(){
        let {
            deliveryAddress,
            deactivateCities,
            addressLandmark,
            citiesList,
            selectedState,
            isLocationProvided,
            isRenderSummary,
            selectedCity
        } = this.state;

        let props = this.props,
            loadCardsInfo = props.infoForCardRequest.atmcard_info.response;
                let statesList =[];
           

            loadCardsInfo.statesData.map(state=>{
                statesList.push({value:state.Id,
                            label: state.State
                })
            }); 
        return(
            <div className="transfer-ctn">
                <h4 className="text-center m-b-20 m-t-30">Where should your ALAT ATM card be delivered?</h4>

                <div className="input-ctn m-t-30 inputWrap">
                    <label>Delivery Address</label>
                    <Textarea
                        tabIndex="2"
                        id={'deliveryAddress'}
                        name="deliveryAddress"
                        placeholder="Enter your full address"
                        value={deliveryAddress}
                        onChange= {(deliveryAddress, e)=>{ 
                            this.setState({deliveryAddress});
                        }}
                        
                    />
                </div>
                <div className="input-ctn m-t-30 inputWrap">
                    <label>What’s the nearest bus stop/landmark to you?</label>
                    <Textbox
                        tabIndex="2"
                        id={'addressLandmark'}
                        name="addressLandmark"
                        placeholder="Enter your full address"
                        value={addressLandmark}
                        onChange= {(addressLandmark, e)=>{ 
                            this.setState({addressLandmark});
                        }}
                        
                    />
                </div>
                <div className="state-city input-ctn m-t-30 m-b-20 inputWrap">
                    <div className="input-ctn m-t-30">
                        <label>State</label>
                        <Select
                            options={statesList}
                            placeholder="Select state"
                            onChange={this.handleStateChange}
                        />
                    </div>
                    <div className="input-ctn m-t-30">
                        <label>City</label>
                        <Select
                            options={citiesList}
                            placeholder="Select city"
                            isDisabled ={deactivateCities}
                            onChange={this.handleCitiesChange}
                        />
                    </div>
                </div>
                <center>
                    {isLocationProvided===false && <div className="error-msg"> Please provide all details</div>}
                    <button type="submit"  
                        className="btn-alat m-t-10 m-b-20 text-center"
                        onClick={()=>{
                                if(deliveryAddress!=='' && addressLandmark!=='' 
                                    &&  selectedState!=='' && selectedCity!==''){
                                    this.setState({isLocationProvided: true,  showDeliveryLocation: false, isRenderSummary: true});
                                }else{
                                    this.setState({isLocationProvided: false});
                                }
                                
                            }}>Proceed</button>
                </center>
            </div>
        )
    }

    handleStateChange(selectedState){
        this.setState({selectedState},()=>{
            
            let props = this.props,
            loadCardsInfo = props.infoForCardRequest.atmcard_info.response,
            citiesList = [],
            allCitiesList = [];

            

            
            citiesList = loadCardsInfo.citiesData.filter(eachCity=>eachCity.StateId===this.state.selectedState.value);
            citiesList.map(city=>{
                allCitiesList.push({value:city.CityId,
                                    label: city.City
                            });
                            
                this.setState({citiesList: allCitiesList, deactivateCities: false});
            }); 

            // console.log('cities', loadCardsInfo.citiesData);
            // console.log('selected state', this.state.selectedState);
        });

        
    }

    handleCitiesChange(selectedCity){
        this.setState({selectedCity});
    }

    renderSummary(){
        let {transferLimit,
            isSelectChanged,
            selectedDesignId,
            nameOnCard
        } = this.state;
        let props = this.props,
            loadCardsInfo           = props.infoForCardRequest.atmcard_info.response,
            customerOtpRequest      = props.otpForCardRequest,
            cardPrice               =loadCardsInfo.customerAccounts.requestCardMenu.cardPrice,
            allDesigns              = loadCardsInfo.allCardDesigns,
            cardDesignUrl           = allDesigns.filter(eachDesign=>eachDesign.id===selectedDesignId)[0].url;
            
            cardDesignUrl = `${BASEURL}/${cardDesignUrl}`;
            let cardStyle= {
                backgroundImage: `url('${cardDesignUrl}')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            };

            
        return(
            <div className="transfer-ctn">
                <h4 className="text-center m-b-20">You will be charged &#8358;{cardPrice}</h4>

                <div className="atmcard-wrap nonvirtual" style={cardStyle}>
                    <div className="carddata">
                        <div className="cardname">{nameOnCard}</div>
                    </div>
                </div>

                <div className="inputctn-wrap">
                    <SelectDebitableAccounts
                        value={this.state.accountNumber}
                        // currency={currencySelected}
                        // requestType = "forBankTransfer"
                        accountInvalid={this.state.isAccountInvalid}
                        onChange={this.handleSelectDebitableAccounts} />

                        {isSelectChanged===true &&
                            <span className="limit-text">Your daily transaction limit for the selected account is ₦{transferLimit} </span>
                        }
                </div>

                <div className="input-ctn inputWrap">
                    <AlatPinInput
                        value={this.state.Pin}
                        onChange={this.handleAlatPinChange}
                        PinInvalid={this.state.isPinInvalid}
                        maxLength={4} 
                    />
                </div>
               
                {/* this.getCustomerOTP() */}
               
                <center>
                    {this.state.summaryError===true &&
                        <div className="error-msg">{this.state.summaryErrorMsg}</div>
                    }

                    {(customerOtpRequest.is_processing===false && customerOtpRequest.fetch_status===REQUESTINGOTP_FOR_CARDREQUEST_FAILURE)&&
                        <div className="error-msg">{customerOtpRequest.requestingotp_foratm_info.error}</div>
                    }
                    <button type="button"  
                        className="btn-alat m-t-10 m-b-20 text-center"
                        disabled={customerOtpRequest.is_processing}
                        onClick={()=>{      
                            // this.getCustomerOTP();      
                                    if(this.state.selectedAccount!=='' && this.state.Pin!==''){
                                        if(this.state.selectedDebitableAccount[0].AvailableBalance >= cardPrice){
                                            if(this.state.selectedDebitableAccount[0].MaxIntraBankTransferLimit >= cardPrice){
                                                this.setState({summaryError: false});
                                                this.getCustomerOTP();
                                            }else{
                                                this.setState({summaryError: true, summaryErrorMsg:'Amount exceeds daily transaction limit for selected account'});
                                            }
                                        }else{
                                            this.setState({summaryError: true, summaryErrorMsg:'Selected account has insufficient funds'});
                                        }
                                        
                                    }else{
                                        this.setState({summaryError: true, summaryErrorMsg:'Please provide all details'});
                                    }
                        }} 
                        >{customerOtpRequest.is_processing? 'Processing...': 'Continue'}</button>
                </center>
            </div>
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
                    
                        if(cardInfoFromRequest.cardDesignId.length===0){
                            return(
                                <div>
                                    {this.renderNoAlatCard()}
                                </div>
                            );
                        }else{
                            return(
                                <div className="">
                                    {this.renderExistingCard()}
                                </div>
                            );
                        }
                        // return(
                        //     <div>
                        //         {this.renderNoAlatCard()}
                        //     </div>
                        // )
                        
                case LOADING_INFOFOR_CARDREQUEST_FAILURE:
                        let loadCardError = loadCardsInfo.atmcard_info.error;
                        return(
                            <div className="transfer-ctn">
                                <div className="text-center">
                                    <div>{loadCardError}</div>
                                    {(loadCardError!=='You currently have a pending card request' &&
                                    loadCardError!=='You already have an active card') &&
                                        <a className="cta-link" onClick={this.getCustomerATMCardsData}> Retry</a>
                                    }
                                    
                                </div>
                            </div>
                        );

                        
            }
        
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
        debitable_accounts  : state.accounts,
        infoForCardRequest   : state.alatCardReducersPile.infoForATMCardRequest,
        otpForCardRequest   : state.alatCardReducersPile.otpForATMCardRequest,
        postCardRequest   : state.alatCardReducersPile.postATMCardRequest,
    };
}

export default connect(mapStateToProps)(RequestCard);
