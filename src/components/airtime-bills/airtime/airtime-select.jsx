import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { airtimeConstants } from '../../../redux/constants/airtime/airtime.constants';
import { airtimeWebPinpayment } from "../../../redux/actions/airtime-bill/airtime.action";
import Airtime from './airtime';
import Select from 'react-select';
import { Textbox } from "react-inputs-validation";
import * as  utils from '../../../shared/utils'
import * as  constants from '../../../shared/constants'
import SelectAcount from './selectAccount';
//import SelectAcount from './selectAccount';



class AirtimeSelectAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            bill: {}
        };

        this.getBillInfo();
        this.onSubmit = this.onSubmit.bind(this);
    }

    getBillInfo() {
        let props = this.props
        if (props.airtime.airtime_buydata == airtimeConstants.AIRTIME_BUYDATA_PAGE2) {
            var bill = {
                ...this.props.airtime.airtime_buydata_data.data
            };
            bill.valueRecipent = bill.PhoneNumber;
            bill.billCategory = "Airtime Recharge";
            bill.ActionText ="Buy Airtime";
        

            this.state.bill = {
                ...bill
            }
        } else {
            this.props.history.push("/bills/airtime/buy");
        }
    }

    onSubmit(object){
     console.log(this.state.bill);
     console.log(object);
        this.props.dispatch(airtimeWebPinpayment(this.state.user.token,
            { NetworkCode: this.state.bill.NetworkCode,
              TransactionPin: object.TransactionPin,
              Amount : this.state.bill.Amount,
              AccountNumber : object.AccountNumber,
              PhoneNumber : this.state.bill.PhoneNumber
             }));
     // this.props.history.push("/bills/airtime/otp");
    }


    render() {
         if(this.props.airtime_webpin.airtime_buydata === airtimeConstants.AIRTIME_WEBPIN_SUCCESS)
         {this.props.history.push("/bills/airtime/otp");}
        //Pass in the Bill,
        //pass in the back link and what should happen onSubmit
        //Handles validation for PIN and AccountNumber selection
        return (<SelectAcount 
            bill={this.state.bill} 
            backLink={"/bills/airtime/buy"} 
            submitAction={this.onSubmit}
            submitBusy={this.props.airtime_webpin.airtime_buydata === 
                airtimeConstants.AIRTIME_WEBPIN_PENDING} />);
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        alert: state.alert,
        airtime: state.airtime_buydata,
        airtime_webpin : state.airtime_webpin,
    }
}



export default connect(mapStateToProps)(AirtimeSelectAccount);