import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import {Checkbox} from "react-inputs-validation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { Switch } from '../../../shared/elements/_toggle';
import "./../cards.scss";
import * as utils from '../../../shared/utils';
import whitelogo from "../../../assets/img/white-logo.svg"; 
import alatcardBg from "../../../assets/img/alat_card_bg.svg"; 
import wemacardBg from "../../../assets/img/wema_card_bg.svg"; 
import mastercardBg from "../../../assets/img/master_card.svg"; 
import  {routes} from '../../../services/urls';
import emptyVC from "../../../assets/img/credit-card-2.svg"; 
import successIcon from "../../../assets/img/success-tick.svg";
import Slider from "react-animated-slider";
import {
    getALATCardSettings,
    updateALATCardSettings,
    clearCardsStore
} from "../../../redux/actions/cards/cards.actions";

import { 
    GETALAT_CARDSETTINGS_SUCCESS,
    GETALAT_CARDSETTINGS_PENDING,
    GETALAT_CARDSETTINGS_FAILURE,
    UPDATEALAT_CARDSETTINGS_SUCCESS,
    UPDATEALAT_CARDSETTINGS_PENDING,
    UPDATEALAT_CARDSETTINGS_FAILURE,} from "../../../redux/constants/cards/cards.constants";

// const options = [
// ];

const BASEURL = routes.BASEURL;

class CardsControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            ForeignTravelCountriesField:'',
            // StartDateField:'',
            // EndDateField:'',
            invalidInterval: false,
            hasCountryChanged: false
        };
        
        this.getCustomerAtmCardSettings    = this.getCustomerAtmCardSettings.bind(this);
        this.handleATMAllowedToggle        = this.handleATMAllowedToggle.bind(this);
        this.handleWebAllowedToggle        = this.handleWebAllowedToggle.bind(this);
        this.handlePOSAllowedToggle        = this.handlePOSAllowedToggle.bind(this);
        this.handleAllowedAbroad           = this.handleAllowedAbroad.bind(this);
        this.handleIsCardLocked            = this.handleIsCardLocked.bind(this);
        this.handleChange                  = this.handleChange.bind(this);
        
        // console.log('logged user info', this.state.user);
    }

    componentDidMount() {
        this.getCustomerAtmCardSettings();
        
        
    }


    getCustomerAtmCardSettings(){
        const { dispatch } = this.props;
        dispatch(getALATCardSettings(this.state.user.token, null,this.state.user.isWemaMobileUser));

    }
    updateCardSettings(){
        const { dispatch } = this.props;
        let payload,

            {
                CashStatusField,
                WebStatusField,
                PosStatusField,
                ForeignTravelStatusField,
                MasterStatusField,
                ForeignTravelCountriesField,
                StartDateField,
                EndDateField,
            } = this.state;

            if(ForeignTravelStatusField===true){

                if (Date.parse(this.state.startDate) > Date.parse(this.state.endDate)) {
                    this.setState({ invalidInterval: true});
                    return;
                }else{
                    this.setState({ invalidInterval: false});
                    payload={
                        cardSetting:{
                            CashStatusField,
                            WebStatusField,
                            PosStatusField,
                            ForeignTravelStatusField,
                            foreignTravelStatusField: ForeignTravelStatusField,
                            MasterStatusField,
                            StartDateField,
                            EndDateField,
                            ForeignTravelCountriesField
                        }
                    }
                }

            }else{
                payload={
                    cardSetting:{
                        CashStatusField,
                        WebStatusField,
                        PosStatusField,
                        ForeignTravelStatusField,
                        foreignTravelStatusField:ForeignTravelStatusField,
                        MasterStatusField,
                        ForeignTravelCountriesField:''
                    }
                }
            }
            // payload.pan = this.props.loadALATCardSetting.alatcardsettings_info.response.panDetails.maskedPan.replace(/\*/g, '');
            payload.pan = this.props.loadALATCardSetting.alatcardsettings_info.pan;

           
            
        

        dispatch(updateALATCardSettings(payload,this.state.user.token));
    }

    handleATMAllowedToggle(){
        let {CashStatusField} = this.state;
        this.setState({CashStatusField:  !CashStatusField});
    }

    handleWebAllowedToggle(){
        let {WebStatusField} = this.state;
        this.setState({WebStatusField:  !WebStatusField});
    }

    handlePOSAllowedToggle(){
        let {PosStatusField} = this.state;
        this.setState({PosStatusField:  !PosStatusField});
    }
    
    handleAllowedAbroad(){
        let {ForeignTravelStatusField} = this.state;
        // this.setState({ForeignTravelStatusField:  !ForeignTravelStatusField, 
        //                 hasCountryChanged: true,
        //                 foreignTravelStatusField: !ForeignTravelStatusField},()=>{
        //                     if(this.state.ForeignTravelStatusField===false){
        //                         this.setState({ForeignTravelCountriesField:''})
        //                     }
        //     });

        this.setState({ForeignTravelStatusField:  !ForeignTravelStatusField, 
            hasCountryChanged: true,
            foreignTravelStatusField: !ForeignTravelStatusField});
    }

    handleIsCardLocked(){
        let {MasterStatusField} = this.state;
        this.setState({MasterStatusField:  !MasterStatusField});
    }

    

    handleStartDatePicker = (startDate) => {
        if(typeof startDate ==='object'){
            startDate.setHours(startDate.getHours() + 1);
            
            let StartDateField = new Date(startDate).getUTCFullYear()+'-'+(new Date(startDate).getUTCMonth()+1)+'-'+(new Date(startDate).getUTCDate())+'T00:00:00';
            
            
            this.setState({ startDate,StartDateField, defaultStartDate:'' });
        }else{
            
            this.setState({ startDate:'',StartDateField:'' });
        }
    }

    handleEndDatePicker = (endDate) => {
        if(typeof endDate ==='object'){
            endDate.setHours(endDate.getHours() + 1);

            let EndDateField = new Date(endDate).getUTCFullYear()+'-'+(new Date(endDate).getUTCMonth()+1)+'-'+(new Date(endDate).getUTCDate())+'T00:00:00';
            
           
            
            
            this.setState({ endDate,EndDateField, defaultEndDate:''});
        }else{
            
            this.setState({ endDate:'',EndDateField:'' });
        }
    }

    setDefaultDate(){
        document.querySelector('#startdate').value = this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField;
    }

    handleChange(ForeignTravelCountriesField){
        this.setState({ ForeignTravelCountriesField: ForeignTravelCountriesField.value });
    }

    

    handleSlideChange(event){
        let cardDetails = this.props.loadALATCardSetting.alatcardsettings_info.response.allCards,
            selectedCard  = cardDetails.filter((eachCard, index)=>index===event.slideIndex)[0];

        // let existingState = Object.assign({}, this.state);
        // existingState.CashStatusField = null;
        // existingState.WebStatusField = null;
        // existingState.PosStatusField = null;
        // existingState.ForeignTravelStatusField = null;
        // existingState.MasterStatusField = null;
        // existingState.isAllowedCountries = null;
        // existingState.StartDateField = null;
        // existingState.EndDateField = null;
        // existingState.defaultStartDate = null;
        // existingState.defaultEndDate = null;
        // console.log('new state is', existingState);
        


        delete this.state.CashStatusField;
        delete this.state.WebStatusField;
        delete this.state.PosStatusField;
        delete this.state.ForeignTravelStatusField;
        delete this.state.MasterStatusField;
        delete this.state.isAllowedCountries;
        delete this.state.StartDateField;
        delete this.state.EndDateField;
        delete this.state.defaultStartDate;
        delete this.state.defaultEndDate;
        
        // console.log('after trim state is', this.state);

        // this.state= Object.assign({}, existingState)
        const { dispatch } = this.props;
        this.setState({panIndex: event.slideIndex},()=>{
            // console.log('states after deletion', this.state)
            dispatch(getALATCardSettings(this.state.user.token, selectedCard.pan, this.state.user.isWemaMobileUser));
            // this.setState({panIndex: event.slideIndex});
        })
        
        
       
        // let{selectedDesignId} = this.state;

        // if(selectedDesignId!==''){
        //     document.querySelectorAll('.choosecarddesign').forEach((eachDesign)=>{
        //         if(eachDesign.getAttribute('data-designid')===selectedDesignId){
        //             eachDesign.classList.add('selected-design');
        //         }
        //     })
        // }

    }

    renderALATCardSettings(){
        let props = this.props,
            loadSettings = props.loadALATCardSetting,
            updateCard  = props.updateCustomerCardSettings;
        let {startDate,
            endDate, invalidInterval} = this.state;

           

            switch(loadSettings.fetch_status){
                case GETALAT_CARDSETTINGS_PENDING:
                    return(
                        <div className="transfer-ctn text-center">
                            Loading your card settings...
                        </div>
                    );
                case GETALAT_CARDSETTINGS_SUCCESS:
                        let cardDetails = loadSettings.alatcardsettings_info.response,
                            cardDataInfo, settingInfo, otherSettingsInfo,
                            defaultStartDate='',
                            defaultEndDate='',
                            StartDateField,
                            EndDateField;
                        if(cardDetails.allCards.length===1){
                            cardDataInfo        = cardDetails.allCards[0]; 
                            settingInfo         = cardDetails.cardControlSettings;
                            otherSettingsInfo   = cardDetails.otherCardControlDetails;
                        let    options             =[];

                            settingInfo.countries.map(country=>{
                                options.push({
                                    value:country.iso,
                                    label: country.countryName
                                })
                            })
                            if(this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField!==undefined
                                && this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField!==''){
                                    // document.querySelector('#startdate').value = this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField;
                                    defaultStartDate =  this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField;
                                    defaultStartDate = new Date(defaultStartDate);

                                    defaultEndDate = this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.endDateField
                                    defaultEndDate = new Date(defaultEndDate);
                                    

                                    if(typeof defaultStartDate ==='object'){
                                        defaultStartDate.setHours(defaultStartDate.getHours() + 1);
                                        
                                         StartDateField = new Date(defaultStartDate).getUTCFullYear()+'-'+(new Date(defaultStartDate).getUTCMonth()+1)+'-'+(new Date(defaultStartDate).getUTCDate())+'T00:00:00';
                                        
                                        
                                        // this.setState({StartDateField});
                                    }

                                    if(typeof defaultEndDate ==='object'){
                                        defaultEndDate.setHours(defaultEndDate.getHours() + 1);
                            
                                        EndDateField = new Date(defaultEndDate).getUTCFullYear()+'-'+(new Date(defaultEndDate).getUTCMonth()+1)+'-'+(new Date(defaultEndDate).getUTCDate())+'T00:00:00';
                                        
                                      
                                        
                                        
                                        // this.setState({ endDate,EndDateField, defaultEndDate:''});
                                    }
                                

                                    this.state= Object.assign({},{
                                        defaultEndDate,
                                        defaultStartDate,
                                        StartDateField,
                                        EndDateField
                                    }, this.state);

                                    // this.setState({defaultEndDate,defaultStartDate});
                            }else{
                                this.state= Object.assign({},{
                                    StartDateField:'',
                                    EndDateField:''
                                }, this.state);

                            }
                            let cardDesignUrl;
                            if(cardDataInfo.isAlatCard===true){
                                cardDesignUrl = `${alatcardBg}`;
                            }else{
                                cardDesignUrl = `${wemacardBg}`;
                            }
                           
                            //  cardDesignUrl = `${BASEURL}/${cardDataInfo.design.url}`;
                            let  cardStyle= {
                                    backgroundImage: `url('${cardDesignUrl}')`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center center'
                                },
                                presSelectedCountry='';

                                
                                    this.state= Object.assign({}, {
                                        CashStatusField:this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.cashStatusField,
                                        WebStatusField:this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.webStatusField,
                                        PosStatusField:this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.posStatusField,
                                        ForeignTravelStatusField: this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField!==''?true:
                                                                  this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelStatusField,
                                        MasterStatusField:this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.masterStatusField,
                                        isAllowedCountries: this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField||''
                                    }, this.state);

                                    if(this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField!==''){
                                        
                                        presSelectedCountry = settingInfo.countries.filter(country=>country.iso===this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField)[0].countryName;
                                        
                                    }
                                    
                            return(
                                <div className="transfer-ctn no-padding-t">
                                    
                                    <div className="atmcard-wrap nonvirtual" style={cardStyle}>
                                        <div className="logos-wrap">
                                            <img src={mastercardBg} alt=""/>
                                           {cardDataInfo.isAlatCard===true &&  <img src={whitelogo} alt=""/>}
                                        </div>
                                        <div className="cardnum-digits">
                                        {cardDataInfo.maskedPan}
                                        </div>
                                        <div className="cardtype">
                                            {cardDataInfo.cardType}
                                        </div>
                                        
                                    </div>
                                    <div className="setting-wrap lockwrap">
                                        <div className="setting-title">Lock</div>
                                        <div className="">
                                            <div className="settings-control inlinelevel">
                                                <span>Lock my card</span> <Switch isChecked={this.state.MasterStatusField} handleToggle={this.handleIsCardLocked} />
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="setting-wrap">
                                        <div className="setting-title">Active Channels</div>
                                        <div className="blocklevel">
                                            <div className="settings-control">
                                                <Switch isChecked={this.state.CashStatusField}  handleToggle={this.handleATMAllowedToggle} />
                                                <span>ATM</span>
                                            </div>
                                            <div className="settings-control">
                                                <Switch isChecked={this.state.PosStatusField}  handleToggle={this.handlePOSAllowedToggle} />
                                                <span>POS</span>
                                            </div>
                                            <div className="settings-control">
                                                <Switch isChecked={ this.state.WebStatusField}  handleToggle={this.handleWebAllowedToggle} />
                                                <span>Web</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="setting-wrap">
                                        <div className="setting-title">Travel</div>
                                        <div className="">
                                            <div className="settings-control inlinelevel m-b-20">
                                                <span>Activate card for use abroad</span> <Switch isChecked={this.state.ForeignTravelStatusField} handleToggle={this.handleAllowedAbroad} />
                                            </div>
                                            {(this.state.ForeignTravelStatusField===true) &&
                                                <div className="country-and-dates">
                                                    <Select
                                                        options={options}
                                                        // isDisabled={this.state.submitButtonState}
                                                        defaultValue={{label: presSelectedCountry, value:
                                                            this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField!==''?
                                                            this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField!=='':''}}
                                                        placeholder="Select country to use"
                                                        onChange={this.handleChange}
                                                    />

                                                    <div className="daterange-options input-ctn inputWrap m-t-20">
                                                        <div className="eachdate-wrap">
                                                            
                                                            <label>Start Date</label>
                                                                <DatePicker placeholderText="" selected={startDate}
                                                                    onChange={this.handleStartDatePicker}
                                                                    selected={this.state.defaultStartDate!==''?this.state.defaultStartDate:this.state.startDate}
                                                                    dateFormat="d MMMM, yyyy"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    minDate={new Date()}
                                                                    id="startdate"
                                                                />
                                                                {/* {(this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField!==undefined
                                                                && this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField!=='') &&
                                                                    // document.querySelector('#startdate').value = this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField;
                                                                    this.setDefaultDate()
                                                                } */}
                                                                {/* {this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.startDateField||''} */}
                                                        </div>
                                                        <div className="eachdate-wrap">
                                                            <label>End Date</label>
                                                            <DatePicker placeholderText=""
                                                                onChange={this.handleEndDatePicker}
                                                                selected={this.state.defaultEndDate!==''?this.state.defaultEndDate:this.state.endDate}
                                                                dateFormat="d MMMM, yyyy"
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                minDate={new Date()}
                                                                id="enddate"
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            }
                                        </div>
                                    </div>
                                    
                                    <div className="input-ctn inputWrap">
                                        <center>
                                            <button type="button" onClick={()=>{
                                                                                // console.log('state is ', this.state);
                                                                                if((this.state.ForeignTravelStatusField===true 
                                                                                    && this.state.StartDateField!==''
                                                                                    && this.state.EndDateField!==''
                                                                                    && this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField!==''
                                                                                )){
                                                                                    if(this.state.hasCountryChanged===false){
                                                                                        
                                                                                        this.setState({
                                                                                            showForeignError: false,
                                                                                            ForeignTravelCountriesField:this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField}
                                                                                            ,this.updateCardSettings());
                                                                                        
                                                                                    }else{
                                                                                        
                                                                                        this.setState({showForeignError: false})
                                                                                        this.updateCardSettings();
                                                                                    }
                                                                                    
                                                                                }else if(this.state.ForeignTravelStatusField===true 
                                                                                    && this.state.ForeignTravelCountriesField!==''
                                                                                    && this.state.StartDateField!==''
                                                                                    && this.state.EndDateField!==''
                                                                                    && this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField===''){
                                                                                        this.setState({showForeignError: false})
                                                                                        this.updateCardSettings();
                                                                                }else{
                                                                                    if(this.state.ForeignTravelStatusField===false){
                                                                                        this.setState({showForeignError: false});
                                                                                        this.updateCardSettings();
                                                                                    }else{
                                                                                        this.setState({showForeignError: true});
                                                                                    }
                                                                                    
                                                                                }
                                                                        }}   
                                                className="btn-alat m-t-10 m-b-20 text-center"
                                                disabled={updateCard.is_processing}> {updateCard.is_processing? 'Updating...': 'Update'}</button>
                                                
                                                {invalidInterval && <div className="error-msg">Start date cannot exceed End date</div>}
                                                {(updateCard.is_processing===false && updateCard.fetch_status===UPDATEALAT_CARDSETTINGS_FAILURE)&&
                                                    <div className="error-msg">{updateCard.updatealatcard_info.error}</div>
                                                }

                                                {(updateCard.is_processing===false && updateCard.fetch_status===UPDATEALAT_CARDSETTINGS_SUCCESS)&&
                                                    <div className="info-label success">You have successfully updated your card settings</div>
                                                }
                                                
                                                {this.state.showForeignError===true && <div className="error-msg">Select the country where you want to use your card and dates your card should be active</div> }
                                        </center>
                                    </div>
                                </div>
                            );
                        }else if(cardDetails.allCards.length>1){
                            let cardDesignUrl, cardStyle, presSelectedCountry;
                            // console.log('loaded settings', loadSettings);
                            settingInfo         = cardDetails.cardControlSettings;
                            otherSettingsInfo   = cardDetails.otherCardControlDetails;
                            let    options             =[];

                            settingInfo.countries.map(country=>{
                                options.push({
                                    value:country.iso,
                                    label: country.countryName
                                })
                            })
                            if(this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField!==undefined
                                && this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField!==''){
                                    // document.querySelector('#startdate').value = this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField;
                                    defaultStartDate =  this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField;
                                    defaultStartDate = new Date(defaultStartDate);

                                    defaultEndDate = this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.endDateField
                                    defaultEndDate = new Date(defaultEndDate);
                                    

                                    if(typeof defaultStartDate ==='object'){
                                        defaultStartDate.setHours(defaultStartDate.getHours() + 1);
                                        
                                         StartDateField = new Date(defaultStartDate).getUTCFullYear()+'-'+(new Date(defaultStartDate).getUTCMonth()+1)+'-'+(new Date(defaultStartDate).getUTCDate())+'T00:00:00';
                                        
                                        
                                        // this.setState({StartDateField});
                                    }

                                    if(typeof defaultEndDate ==='object'){
                                        defaultEndDate.setHours(defaultEndDate.getHours() + 1);
                            
                                        EndDateField = new Date(defaultEndDate).getUTCFullYear()+'-'+(new Date(defaultEndDate).getUTCMonth()+1)+'-'+(new Date(defaultEndDate).getUTCDate())+'T00:00:00';
                                        
                                      
                                        
                                        
                                        // this.setState({ endDate,EndDateField, defaultEndDate:''});
                                    }
                                

                                    this.state= Object.assign({},{
                                        defaultEndDate,
                                        defaultStartDate,
                                        StartDateField,
                                        EndDateField
                                    }, this.state);

                                    // this.setState({defaultEndDate,defaultStartDate});
                            }else{
                                this.state= Object.assign({},{
                                    StartDateField:'',
                                    EndDateField:''
                                }, this.state);

                            }

                           presSelectedCountry='';

                        //    console.log('initial state list items', this.state);
                            this.state= Object.assign({}, {
                                CashStatusField:this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.cashStatusField,
                                WebStatusField:this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.webStatusField,
                                PosStatusField:this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.posStatusField,
                                ForeignTravelStatusField: this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField!==''?true:
                                                            this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelStatusField,
                                MasterStatusField:this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.masterStatusField,
                                isAllowedCountries: this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField||''
                            }, this.state);

                            if(this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField!==''){
                                
                                presSelectedCountry = settingInfo.countries.filter(country=>country.iso===this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField)[0].countryName;
                                
                            }

                            // console.log('new state items', this.state);
                            return(
                                <div className="design-options-wrap width-unset">
                                    <Slider duration="500" slideIndex={loadSettings.alatcardsettings_info.pan===null?0:this.state.panIndex}  infinite="true" emulateTouch="true" onSlideChange={event => this.handleSlideChange(event)}>
                                        {cardDetails.allCards.map((eachCard, key)=>{
                                            cardDataInfo        = eachCard; 

                                           
                                            if(cardDataInfo.isAlatCard===true){
                                                cardDesignUrl = `${alatcardBg}`;
                                            }else{
                                                cardDesignUrl = `${wemacardBg}`;
                                            }
                                           
                                            cardStyle= {
                                                backgroundImage: `url('${cardDesignUrl}')`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center center'
                                            };
                                            // presSelectedCountry='';
                                            
                                            

                                            return(
                                                // cardStyle.backgroundImage = `url(${BASEURL}/${eachDesign.url})`,
                                                <div className="atmcard-wrap nonvirtual atmdesign" style={cardStyle}  key={key}>
                                                    <div className="logos-wrap">
                                                    <img src="../../../src/assets/img/mastercard.png" alt=""/>
                                                    {cardDataInfo.isAlatCard===true &&  <img src={whitelogo} alt=""/>}
                                                    {cardDataInfo.isAlatCard===false && <img className="larger" src="../../../src/assets/img/wema-white.png" />}
                                                    </div>
                                                    <div className="cardnum-digits">
                                                    {cardDataInfo.maskedPan}
                                                    </div>
                                                    
                                                    {cardDataInfo.isAlatCard===true && 
                                                        <div className="cardtype">
                                                            {cardDataInfo.cardType}
                                                        </div>
                                                    }

                                                    {cardDataInfo.isAlatCard===false && 
                                                        <div className="cardtype nonalat-card">
                                                            {cardDataInfo.cardType}
                                                        </div>
                                                    }
                                                    
                                                </div>
                                                // <div className="atmcard-wrap nonvirtual " onClick={this.selectADesign} data-designid={eachDesign.id} style={{backgroundImage : `url(${BASEURL}/${eachDesign.url})`}} key={key}>
                                                // </div>
                                            )
                                        })}
                                    </Slider>
                                    <div className="transfer-ctn no-padding-t">
                                        <div className="setting-wrap lockwrap">
                                            <div className="setting-title">Lock</div>
                                            <div className="">
                                                <div className="settings-control inlinelevel">
                                                    <span>Lock my card</span> <Switch isChecked={this.state.MasterStatusField} handleToggle={this.handleIsCardLocked} />
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="setting-wrap">
                                            <div className="setting-title">Active Channels</div>
                                            <div className="blocklevel">
                                                <div className="settings-control">
                                                    <Switch isChecked={this.state.CashStatusField}  handleToggle={this.handleATMAllowedToggle} />
                                                    <span>ATM</span>
                                                </div>
                                                <div className="settings-control">
                                                    <Switch isChecked={this.state.PosStatusField}  handleToggle={this.handlePOSAllowedToggle} />
                                                    <span>POS</span>
                                                </div>
                                                <div className="settings-control">
                                                    <Switch isChecked={ this.state.WebStatusField}  handleToggle={this.handleWebAllowedToggle} />
                                                    <span>Web</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="setting-wrap">
                                            <div className="setting-title">Travel</div>
                                            <div className="">
                                                <div className="settings-control inlinelevel m-b-20">
                                                    <span>Activate card for use abroad</span> <Switch isChecked={this.state.ForeignTravelStatusField} handleToggle={this.handleAllowedAbroad} />
                                                </div>
                                                {(this.state.ForeignTravelStatusField===true) &&
                                                    <div className="country-and-dates">
                                                        <Select
                                                            options={options}
                                                            // isDisabled={this.state.submitButtonState}
                                                            defaultValue={{label: presSelectedCountry, value:
                                                                this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField!==''?
                                                                this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField!=='':''}}
                                                            placeholder="Select country to use"
                                                            onChange={this.handleChange}
                                                        />

                                                        <div className="daterange-options input-ctn inputWrap m-t-20">
                                                            <div className="eachdate-wrap">
                                                                
                                                                <label>Start Date</label>
                                                                    <DatePicker placeholderText="" selected={startDate}
                                                                        onChange={this.handleStartDatePicker}
                                                                        selected={this.state.defaultStartDate!==''?this.state.defaultStartDate:this.state.startDate}
                                                                        dateFormat="d MMMM, yyyy"
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        minDate={new Date()}
                                                                        id="startdate"
                                                                    />
                                                                    {/* {(this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField!==undefined
                                                                    && this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField!=='') &&
                                                                        // document.querySelector('#startdate').value = this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.startDateField;
                                                                        this.setDefaultDate()
                                                                    } */}
                                                                    {/* {this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.startDateField||''} */}
                                                            </div>
                                                            <div className="eachdate-wrap">
                                                                <label>End Date</label>
                                                                <DatePicker placeholderText=""
                                                                    onChange={this.handleEndDatePicker}
                                                                    selected={this.state.defaultEndDate!==''?this.state.defaultEndDate:this.state.endDate}
                                                                    dateFormat="d MMMM, yyyy"
                                                                    peekNextMonth
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    minDate={new Date()}
                                                                    id="enddate"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        
                                        <div className="input-ctn inputWrap">
                                            <center>
                                                <button type="button" onClick={()=>{
                                                                                    // console.log('state is ', this.state);
                                                                                    if((this.state.ForeignTravelStatusField===true 
                                                                                        && this.state.StartDateField!==''
                                                                                        && this.state.EndDateField!==''
                                                                                        && this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField!==''
                                                                                    )){
                                                                                        if(this.state.hasCountryChanged===false){
                                                                                            
                                                                                            this.setState({
                                                                                                showForeignError: false,
                                                                                                ForeignTravelCountriesField:this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField}
                                                                                                ,this.updateCardSettings());
                                                                                            
                                                                                        }else{
                                                                                            
                                                                                            this.setState({showForeignError: false})
                                                                                            this.updateCardSettings();
                                                                                        }
                                                                                        
                                                                                    }else if(this.state.ForeignTravelStatusField===true 
                                                                                        && this.state.ForeignTravelCountriesField!==''
                                                                                        && this.state.StartDateField!==''
                                                                                        && this.state.EndDateField!==''
                                                                                        && this.props.loadALATCardSetting.alatcardsettings_info.response.otherCardControlDetails.cardSetting.foreignTravelCountriesField===''){
                                                                                            this.setState({showForeignError: false})
                                                                                            this.updateCardSettings();
                                                                                    }else{
                                                                                        if(this.state.ForeignTravelStatusField===false){
                                                                                            this.setState({showForeignError: false});
                                                                                            this.updateCardSettings();
                                                                                        }else{
                                                                                            this.setState({showForeignError: true});
                                                                                        }
                                                                                        
                                                                                    }
                                                                            }}   
                                                    className="btn-alat m-t-10 m-b-20 text-center"
                                                    disabled={updateCard.is_processing}> {updateCard.is_processing? 'Updating...': 'Update'}</button>
                                                    
                                                    {invalidInterval && <div className="error-msg">Start date cannot exceed End date</div>}
                                                    {(updateCard.is_processing===false && updateCard.fetch_status===UPDATEALAT_CARDSETTINGS_FAILURE)&&
                                                        <div className="error-msg">{updateCard.updatealatcard_info.error}</div>
                                                    }
                                                    
                                                    {this.state.showForeignError===true && <div className="error-msg">Select the country where you want to use your card and dates your card should be active</div> }
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            )
                        }else{
                            return(
                                <div>
                                    <center>
                                        <img className="nocards-icon" src={emptyVC} />
                                        <p> You currently do not have an  ALAT card</p>
                                        <button type="submit" onClick={()=>this.props.history.push("/cards")}   
                                            className="btn-alat m-t-10 m-b-20 text-center">Request Card</button>
                                    </center>
                                </div>
                            )
                        }
                case GETALAT_CARDSETTINGS_FAILURE:
                    let loadCardSettingError = loadSettings.alatcardsettings_info.error;
                    return(
                        <div className="text-center m-padding-10">
                            <div>{loadCardSettingError}</div>
                            {loadCardSettingError!=='You are currently have no ATM card' && 
                                <a className="cta-link" onClick={this.getCustomerAtmCardSettings}> Retry</a> 
                            }
                           
                        </div>
                    );
            }
    }

    renderCardSettings(){
        let {user} = this.state;
        if(user.isAlatPinSet===true){
            return(
                <div className="col-sm-12">
                    <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Manage how and where your card works</h4>
                                        <div className="">
                                                {this.renderALATCardSettings()}
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
                {this.renderCardSettings()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
        loadALATCardSetting   : state.alatCardReducersPile.loadALATCardSettingsRequest,
        updateCustomerCardSettings   : state.alatCardReducersPile.updateALATCardSettingsRequest,
    };
}

export default connect(mapStateToProps)(CardsControl);
