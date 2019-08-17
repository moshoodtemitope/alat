import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Router, NavLink} from "react-router";
import * as utils from '../../../shared/utils';
import AlatPinInput from '../../../shared/components/alatPinInput';
import {Fragment} from "react";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import Select from 'react-select';
import hstransfer from "../../../assets/img/hs-transfer.svg";
import hsatm from "../../../assets/img/hs-atm.svg";
import hspos from "../../../assets/img/hs-pos.svg";
import fundvc from "../../../assets/img/fund-vc.svg";
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import "./../cards.scss";
import whitelogo from "../../../assets/img/white-logo.svg"; 
import successIcon from "../../../assets/img/success-tick";
import {
    getCurrentVirtualCard,
    getCurrentVirtualCardHistory,
    clearCardsStore
} from "../../../redux/actions/cards/cards.actions";
import { 
    FETCH_CURRENTCARD_SUCCESS,
    FETCH_CURRENTCARD_PENDING,
    FETCH_CURRENTCARD_FAILURE,
    GET_VIRTUALCARD_HISTORY_SUCCESS,
    GET_VIRTUALCARD_HISTORY_PENDING,
    GET_VIRTUALCARD_HISTORY_FAILURE,
} from "../../../redux/constants/cards/cards.constants";

class TransactionHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            startDate: null,
            endDate: null,
            invalidInterval: false,
            emptyDate: false,
            startDateInNumbers:'',
            endDateInNumbers:'',
            showError:false,
            errorToshow:'',
            searchterm:''
        };
        this.handleSubmmit = this.handleSubmmit.bind(this);
        
    }

    componentDidMount() {
        this.getCurrentVirtualCards();
    }

    getCurrentVirtualCards(){
        const { dispatch } = this.props;
        
        if(Object.keys(this.props.virtualCards).length <1){
            dispatch(getCurrentVirtualCard(this.state.user.token, "fordetails"));
        }
        
    }
    

    reduceDeccimal(val){
        return val.toFixed(2);
    }

    decodedPan(pos){
        let pan= this.props.virtualCards.virtualcard_data.response.virtualCardData.pan;
            pan = this.replaceAll(pan, '|', '');
        let str = pan.charAt(pos -1);
        return this.props.virtualCards.virtualcard_data.response.encryptedCharacters.findIndex(x => x == str);
    }

    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    }

    handleStartDatePicker = (startDate) => {
        console.log('dsdsds', typeof startDate);
        if(typeof startDate ==='object'){
            startDate.setHours(startDate.getHours() + 1);
            
            let startDateInNumbers = new Date(startDate).getUTCFullYear()+'-'+(new Date(startDate).getUTCMonth()+1)+'-'+(new Date(startDate).getUTCDate());
            
            
            this.setState({ startDate,startDateInNumbers });
        }else{
            
            this.setState({ startDate:'',startDateInNumbers:'' });
        }
    }

    handleEndDatePicker = (endDate) => {
        if(typeof endDate ==='object'){
            endDate.setHours(endDate.getHours() + 1);

            let endDateInNumbers = new Date(endDate).getUTCFullYear()+'-'+(new Date(endDate).getUTCMonth()+1)+'-'+(new Date(endDate).getUTCDate());
            
           
            
            
            this.setState({ endDate,endDateInNumbers });
        }else{
            
            this.setState({ endDate:'',endDateInNumbers:'' });
        }
    }

    handleSubmmit(e){
        e.preventDefault();
        let {  startDateInNumbers,
               endDateInNumbers,
               searchterm
            } = this.state,
            queryString = '';
        let  VirtualCardId  = this.props.virtualCards.virtualcard_data.response.virtualCardData.id;

        const {dispatch} =  this.props;

        if(startDateInNumbers!=='' && endDateInNumbers!==''){
            this.setState({showError: false})
            queryString +='?VirtualCardId='+VirtualCardId+'&dateFrom='+startDateInNumbers+'&dateTo='+endDateInNumbers;
            if(searchterm!==''){
                queryString +='&keyword='+searchterm;
            }
            dispatch(getCurrentVirtualCardHistory(queryString, this.state.user.token))
        }else{
            this.setState({showError: true, errorToshow:'Start and end dates required'});
        }
        
        
    }

    renderHistoryImage(Transaction){
        switch(Transaction.virtualCardTranType){
         case "Credit" :
                return (<img src={fundvc}/>);
        //  if (Transaction.Narration.indexOf('ATM WD') >= 0) { 
        //     return (<img src={hsatm}/>);
        // } else return (<img src={hstransfer}/>);

        break;
        default :
            return  (<img src={hspos}/>)
        }
    }
    
    renderCardHistory(){
        let getCardHistoryStatus = this.props.getCardHistory;
        
        // return(
        //     <div>
                if(this.props.getCardHistory.is_processing===false 
                        && this.props.getCardHistory.fetch_status===GET_VIRTUALCARD_HISTORY_SUCCESS
                        && this.props.getCardHistory.vchistory_info.response.data.length>=1){ 
                            let transactionsList = this.props.getCardHistory.vchistory_info.response.data;
                    
                   return(
                        <Fragment>
                            {
                                transactionsList.map((eachTransaction, key)=>(
                                    <div className="eachhistory" key={key}>
                                        <div className="two-items">{this.renderHistoryImage(eachTransaction)}
                                            <div className="desc">{eachTransaction.narration.indexOf('|')>-1?eachTransaction.narration.split('|')[1]:eachTransaction.narration}</div>
                                        </div>
                                        <div className="date">{utils.FormartDate(eachTransaction.transactionDate)}</div>
                                        <div className={eachTransaction.virtualCardTranType ==='Credit' ? "balance credit" : "balance debit"}>${utils.formatAmount(eachTransaction.amount)}</div> 
                                    </div>
                                ))
                            }
                        </Fragment>
                    )
                }
            // </div>
        // )
    }

    renderVirtualCardInfo(){
        let {isShowInfo,
            showSummary,
            startDate,
            endDate,
            invalidInterval,
            emptyDate,
            showError,
            errorToshow,
            searchterm} = this.state;
        let fetchVirtualCardsStatus = this.props.virtualCards.fetch_status;
        
        let getCardHistoryStatus = this.props.getCardHistory;
        // let cardHistoryData = this.props.getCardHistory.vchistory_info.response.data
        // let virtualCardsList =  this.props.virtualCards.virtualcard_data.response;
        return(
                <div>
                    <div className="transfer-ctn">
                        {(fetchVirtualCardsStatus===FETCH_CURRENTCARD_PENDING) &&
                            <div className="text-center">Please wait..</div>
                        }

                        {(fetchVirtualCardsStatus=== FETCH_CURRENTCARD_FAILURE) &&
                            <div className="text-center">
                                {this.props.virtualCards.virtualcard_data.error}
                                <div>
                                    <a className="cta-link" onClick={this.getCurrentVirtualCards}> Retry</a>
                                </div>
                            </div>
                        }
                        {(fetchVirtualCardsStatus === FETCH_CURRENTCARD_SUCCESS && !showSummary) &&
                            <div>
                                <div className="atmcard-wrap shortened">
                                    <div className="top-info">
                                        <div className="balanceinfo">
                                            Balance: ${this.props.virtualCards.virtualcard_data.response.virtualCardData.balance}
                                        </div>
                                        <div className="logo-icon">
                                            <img src={whitelogo} />
                                        </div>
                                    </div>
                                    {/* <div className="cardnum-digits">
                                        **** **** **** {this.decodedPan(13)}{this.decodedPan(14)}{this.decodedPan(15)}{this.decodedPan(16)}
                                    </div> */}
                                    {/* <div className="carddata">
                                        <div className="each-carddata">
                                            <span className="card-infotext">Valid Thru</span>
                                            <span className="card-infodetail">****</span>
                                        </div>
                                        <div className="each-carddata">
                                            <span className="card-infotext">CVV</span>
                                            <span className="card-infodetail">***</span>
                                        </div>
                                    </div> */}
                                    <div className="cardname">
                                        {this.props.virtualCards.virtualcard_data.response.virtualCardData.alias}
                                    </div> 
                                </div>
                            </div>
                        }
                        
                    </div>
                    <div className="transfer-ctn nopaddingtop">
                        {(fetchVirtualCardsStatus === FETCH_CURRENTCARD_SUCCESS && !showSummary) &&
                            <div>
                                <form onSubmit={this.handleSubmmit}>
                                    <div className="daterange-options input-ctn inputWrap">
                                        <div className="eachdate-wrap">
                                            <label>Start Date</label>
                                                <DatePicker placeholderText="" selected={startDate}
                                                    onChange={this.handleStartDatePicker}
                                                    //onChangeRaw={(e) => this.handleChange(e)}
                                                    dateFormat="d MMMM, yyyy"
                                                    
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    maxDate={new Date()}
                                                />
                                        </div>
                                        <div className="eachdate-wrap">
                                            <label>End Date</label>
                                            <DatePicker placeholderText="" selected={endDate}
                                                onChange={this.handleEndDatePicker}
                                                //onChangeRaw={(e) => this.handleChange(e)}
                                                dateFormat="d MMMM, yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                maxDate={new Date()}
                                            />
                                        </div>
                                    </div>
                                    <div className="searchfield input-ctn inputWrap">
                                        <label>Search keyword</label>
                                        <Textbox
                                            tabIndex="2"
                                            id={'searchterm'}
                                            name="searchterm"
                                            value={searchterm}
                                            onChange= {(searchterm, e)=>{ 
                                                this.setState({searchterm});
                                                
                                            }}
                                            
                                        />
                                    </div>
                                    <div className="input-ctn inputWrap">
                                        <center>
                                            <button type="submit"  
                                                className="btn-alat m-t-10 m-b-20 text-center"
                                                disabled={getCardHistoryStatus.is_processing}>{getCardHistoryStatus.is_processing?'Loading history..':'Search'}</button>
                                                
                                           {showError  && <div className="error-msg">{errorToshow}</div>}
                                           
                                           {(getCardHistoryStatus.is_processing===false && getCardHistoryStatus.fetch_status===GET_VIRTUALCARD_HISTORY_FAILURE)&&
                                                <div className="error-msg">{getCardHistoryStatus.vchistory_info.error}</div>
                                            }

                                            {(getCardHistoryStatus.is_processing===false 
                                                && getCardHistoryStatus.fetch_status===GET_VIRTUALCARD_HISTORY_SUCCESS
                                                && getCardHistoryStatus.vchistory_info.response.data.length===0)&&
                                                <div className="error-msg"> No transactions were performed within the selected period</div>
                                            }
                                        </center>
                                    </div>
                                </form>
                                    {invalidInterval ? <p className="text-center alatcard-msg" style={{ margin: "0px auto" }}>Start date cannot exceed end date</p> : null}
                                    {emptyDate ? <p className="text-center alatcard-msg" style={{ margin: "0px auto" }}>Please select both start and end date</p> : null}
                            </div>
                        }
                    </div>
                </div>
        )
    }

   

    
    render() {
        

        return (
            <Fragment>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <div className="sub-tab-nav inpage-nav">
                                        <ul>
                                            <li> <Link to={'/virtual-cards/topup'}>Top Up</Link></li>
                                            <li> <Link to={'/virtual-cards/card-details'}>View Details</Link></li>
                                            <li> <Link className="active-subnav"  to={'/virtual-cards/history'}> Transaction History</Link></li>
                                            <li> <Link to={'/virtual-cards/liquidate'}>Liquidate Card</Link></li>
                                            <li> <Link to={'/virtual-cards/delete'}>Delete Card</Link></li>
                                        </ul>
                                    </div>
                                    <div className="">
                                        {this.renderVirtualCardInfo()}
                                        <div className="history-wrap">{this.renderCardHistory()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
        virtualCards        : state.alatCardReducersPile.getVirtualCards,
        getCardHistory        : state.alatCardReducersPile.getCardHistory,
    };
}

export default connect(mapStateToProps)(TransactionHistory);
