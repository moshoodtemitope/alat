
import React, { Component, Fragment } from 'react';
import {Link, NavLink, Route} from 'react-router-dom';
import phoneimg from "../../../assets/img/phone-airtime.svg"
import { connect } from "react-redux";
import { getAirtimeBeneficiaries } from "../../../redux/actions/airtime-bill/airtime.action";
import { airtimeConstants } from '../../../redux/constants/airtime/airtime.constants';
import mtnImg from "../../../assets/img/mtn.svg";
import airtelImg from "../../../assets/img/airtel.svg";
import etiImg from "../../../assets/img/9mobile.svg";
import gloImg from "../../../assets/img/glo.svg";
import * as utils from "../../../shared/utils";
import BuyAirtime from './airtime-buy';
import Index from './index';
import SelectAccount from './selectAccount';

class Airtime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    componentDidMount() {
      
    }
   render() {
       return(
           <Fragment>
               {this.props.children}
            <Route exact path='/bills/airtime' render={(props) => <Index {...props} />} />
            <Route path='/bills/airtime/buy' render={(props) => <BuyAirtime {...props} />} />
            <Route path='/bills/airtime/select-account' render={(props) => <SelectAccount {...props} />} />
           </Fragment>
       );
   }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Airtime);
//export default Airtime;