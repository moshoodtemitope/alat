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
import  {routes} from '../../../services/urls';
import emptyVC from "../../../assets/img/credit-card-2.svg"; 
import successIcon from "../../../assets/img/success-tick.svg";
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
        
        
    }

    componentDidMount() {
        this.getCustomerAtmCardSettings();
        
    }


    getCustomerAtmCardSettings(){
        const { dispatch } = this.props;
        dispatch(getALATCardSettings(this.state.user.token));

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
            payload.pan = this.props.loadALATCardSetting.alatcardsettings_info.response.panDetails.maskedPan.replace(/\*/g, '');

           
            
        

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

    renderALATCardSettings(){
        let props = this.props,
            loadSettings = props.loadALATCardSetting,
            updateCard  = props.updateCustomerCardSettings;
        let {startDate,
            endDate, invalidInterval} = this.state;

           

            switch(loadSettings.fetch_status){
                case GETALAT_CARDSETTINGS_PENDING:
                    return(
                        <div className="text-center">
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
                        if(cardDetails.panDetails!==null){
                            cardDataInfo        = cardDetails.panDetails; 
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
                           
                            let cardDesignUrl = `${BASEURL}/${cardDataInfo.design.url}`,
                                cardStyle= {
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
                                <div>
                                    
                                    <div className="atmcard-wrap nonvirtual" style={cardStyle}>
                                        <div className="cardnum-digits">
                                        {cardDataInfo.maskedPan}
                                        </div>
                                        <div className="cardname">
                                            {cardDataInfo.embossingName}
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
                                                                                console.log('state is ', this.state);
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
                            );
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
                        <div className="text-center">
                            <div>{loadCardSettingError}</div>
                           <a className="cta-link" onClick={this.getCustomerAtmCardSettings}> Retry</a>
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
                                        <div className="transfer-ctn">
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
