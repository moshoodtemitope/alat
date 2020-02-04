import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Switch } from '../../../shared/elements/_toggle';
import {cc_format, formatCardExpiryDate,validateCardExpiry, checkValue} from '../../../shared/utils';

import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import { alertActions } from '../../../redux/actions/alert.actions';

class FundCardDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            saveCard: false,
            formartCardNumber : "",
            formartedDate: "",
            Cvv: "",
            Alias:"",

            cardNumberInvalid: false,
            cvvInvalid: false,
            dateInvalid: false,
            aliasInvalid: false,
            formSubmitted: false
        }
        this.handleCardChange = this.handleCardChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleCVV = this.handleCVV.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleToggle = () => {
        this.setState({ saveCard: !this.state.saveCard });
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.setState({formSubmitted : true});
         if(this.validateCard() || this.validateCvv() || this.validateDateLength()){

         } else{
            const payload = {
                'CardPan': this.state.formartCardNumber.replace(/\s/g, ''),
                'MaskedPan' : this.state.formartCardNumber.replace(/\s/g, ''),
                'Cvv': this.state.Cvv,
                'ExpiryMonth': this.state.formartedDate.split(' / ')[0],
                'ExpiryYear': '20' + this.state.formartedDate.split(' / ')[1],
                'TokenizedAlias': this.state.Alias
              };
              this.props.dispatch(actions.fundCardDetails(payload));
         }
    }

    onSubmitSaveForm=()=>{
        this.setState({formSubmitted : true});
        if(this.validateCard() || this.validateCvv() || this.validateAlias()){

        }else {
            const payload = {
                'CardPan': this.state.formartCardNumber.replace(/\s/g, ''),
                'Cvv': this.state.Cvv,
                'ExpiryMonth': this.state.formartedDate.split(' / ')[0],
                'ExpiryYear': '20' + this.state.formartedDate.split(' / ')[1],
                'TokenizedAlias': this.state.Alias
              };

              this.props.dispatch(actions.saveCard(this.state.user.token, payload));
        }
    }

    validateCvv=()=>{
        if(this.state.Cvv.length != 3){this.setState({cvvInvalid : true});
          return true;
        }
    }

    validateDateLength=()=>{
        if(this.state.formartedDate.length <5){
            this.setState({dateInvalid : true});
            return true;
        }
    }


    handleCVV=(e)=>{
        if(/^[0-9]\d*$/.test(e.target.value)){
            this.setState({Cvv : e.target.value});
        }
        if(e.target.value.length == 0){
            this.setState({Cvv : ""});
        }
        if(this.state.formSubmitted && (e.target.value.length == 3)){
            this.setState({ cvvInvalid : false })
        }     
    }
     
    validateCard=()=>{
        if (this.state.formartCardNumber.length != 19) {
            this.setState({ cardNumberInvalid: true });
            return true;
        }
    }

    handleCardChange =(e)=>{
        if (/^[\d\s]+$/.test(e.target.value))
        this.setState({ formartCardNumber: cc_format(e.target.value) });
        else if(e.target.value.length == 0){
            this.setState({ formartCardNumber: ""});
        }
        if(this.state.formSubmitted && this.state.formartCardNumber.length === 18)
        this.setState({ cardNumberInvalid: false});
    }

    validateAlias =()=>{
        if(this.state.Alias == "")
        this.setState({aliasInvalid : true}, ()=>{return true});
    }
    
    handleAlias =(e)=>{
        this.setState({ Alias: e.target.value });
      
          if(this.state.formSubmitted && e.target.value != "")
          this.setState({aliasInvalid : false})
    }

    handleDate =(e)=> {
        var date = e.target.value.trim();
        let {eventTriggered} = this.state;
        // let inputString = date.replace(/\D/g,'');
       
        
        //this.setState({formartedDate: formatCardExpiryDate(inputString) });
        if(eventTriggered===8 || eventTriggered===46){
            this.setState({formartedDate: validateCardExpiry(date,eventTriggered)});
        }else{
            this.setState({formartedDate: validateCardExpiry(date)});
        }
       

    }

    handleDateKeyPress=(e)=>{
        var eventTriggered = e.keyCode;
        this.setState({eventTriggered})
        // return eventTriggered;
    }
    
    
    render() {
            if(this.props.save_card) {
                if(this.props.save_card.save_card_status === fundAccountConstants.SAVE_CARD_SUCCESS) {
                  this.props.dispatch(actions.ClearAction(fundAccountConstants.SAVE_CARD_CLEAR));
                 this.props.history.push("/fund/card")
                }
              }

             if(this.props.card_details){
             if(this.props.card_details.card_details_status === fundAccountConstants.FUNDCARD_DETAILS_SUCCESS)
                this.props.history.push("/fund/card/select-account")}
        return (
            <Fragment>
                <div className="al-card no-pad">
                    <h4 className="m-b-10 center-text hd-underline">Card Details</h4>

                    <div className="transfer-ctn">
                       <div> {/* <form> */}
                        {this.props.alert && this.props.alert.message &&
                                            <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                        }
                            <div className={this.state.cardNumberInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Card Number</label>
                                <input type="text" 
                                maxLength={19}
                                onChange={this.handleCardChange}
                                value={this.state.formartCardNumber}
                                placeholder="1234 5678 9101 2345" />
                            </div>

                            <div className="row">
                                <div className="col-sm-6 col-md-6">
                                    <div className={this.state.dateInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>Expires</label>
                                        <input type="text"
                                         onChange={this.handleDate}
                                         maxLength={7}
                                         value={this.state.formartedDate}
                                        //  onKeyPress={checkValue}
                                        onKeyDown={this.handleDateKeyPress}
                                         placeholder="MM / YYYY" />
                                    </div>
                                </div>

                                <div className="col-sm-6 col-md-6">
                                    <div className={this.state.cvvInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>CVV</label>
                                        <input 
                                            placeholder="123"
                                            value={(this.state.Cvv)}
                                            maxLength={3}
                                            onChange={this.handleCVV}
                                            type="text" />
                                    </div>
                                </div>
                            </div>

                            <div className="clearfix save-purchase">
                                <p>Save card for furure use</p>
                                <div className="">
                                    <div className="clearfix">
                                        {/* <div className="pretty p-switch p-fill">
												        <input type="checkbox" />
												        <div className="state p-danger">
												            <label></label>
												        </div>
                                                    </div> */}
                                        <div className="pretty p-switch p-fill" >
                                            <Switch isChecked={this.state.saveCard} handleToggle={this.handleToggle} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.saveCard ? (
                                    <div className="save-purchase-frm">
                                        {/* <form> */}
                                            <div className={this.state.aliasInvalid ? "input-ctn form-error" : "input-ctn"}>
                                                <label>Give Card a name</label>
                                                <input
                                                 type="text"
                                                 value={this.state.Alias}
                                                 maxLength="50"
                                                 onChange={this.handleAlias}
                                                />
                                            </div>

                                            <center>
                                                <button type="button" 
                                                disabled={this.props.save_card.save_card_status === fundAccountConstants.SAVE_CARD_PENDING}
                                                onClick={this.onSubmitSaveForm} className="btn-alat m-t-10 m-b-20 text-center">
                                                    {this.props.save_card.save_card_status === fundAccountConstants.SAVE_CARD_PENDING ? "Saving..." : "Save Card"}
                                                    
                                                </button>
                                            </center>
                                        {/* </form> */}
                                    </div>
                                ) : (
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <button type="button" onClick={this.handleSubmit} className="btn-alat m-t-10 m-b-20 text-center">Next</button>
                                                    {/* <Link to={'/dashboard'} className="btn-alat m-t-10 m-b-20 text-center">Go to Dashboard</Link> */}
                                                </center>
                                            </div>
                                        </div>
                                    )
                            }
                       </div> {/* </form> */}
                    </div>
                </div>
                <center>
                    {/* '/bills/airtime/buy' */}
                    <Link to={'/fund/card'} className="add-bene m-t-50">Go Back</Link>
                </center>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        save_card: state.fundAccountReducerPile.saveCard,
        card_details: state.fundAccountReducerPile.cardDetails
    }
}

export default connect(mapStateToProps)(FundCardDetails);