
import React, { Component, Fragment } from 'react';
import {Link, NavLink, Route} from 'react-router-dom';
import { connect } from "react-redux";
import VirtualCards from "./virtual-cards";
import TopUpVirtualCards from "./topup-card";
import VirtualCardsOtp  from "./virtualcard-otp";
import VirtualCardsFundSuccess  from "./virtualcardfund-success";
import DeleteCard from "./delete-card";
import TransactionHistory from "./transaction-history";
import LiquidateCard from "./liquidate-card";

// import NewTransfer from "./new-transfer";

class VirtualCardsContainer extends Component {
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
               
               {/* to here */}

                {this.props.children}
                <Route exact path='/virtual-cards' render={(props) => <VirtualCards {...props} />} />
                <Route exact path='/virtual-cards/topup' render={(props) => <TopUpVirtualCards {...props} />} />
                <Route exact path='/virtual-cards/otp' render={(props) => <VirtualCardsOtp {...props} />} />
                <Route exact path='/virtual-cards/fund-success' render={(props) => <VirtualCardsFundSuccess {...props} />} />
                <Route exact path='/virtual-cards/delete' render={(props) => <DeleteCard {...props} />} />
                <Route exact path='/virtual-cards/history' render={(props) => <TransactionHistory {...props} />} />
                <Route exact path='/virtual-cards/liquidate' render={(props) => <LiquidateCard {...props} />} />
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

export default connect(mapStateToProps)(VirtualCardsContainer);
//export default Airtime;