
import React, { Component, Fragment } from 'react';
import {Link, NavLink, Route} from 'react-router-dom';
import { connect } from "react-redux";

import RequestCard from "./request-card";
// import ProvideDetails from "./provide-details";
// import ConFirmTransfer from "./confirm";
// import TransferOtp from "./transfer-otp";
// import TransferSuccess from "./transfer-success";
// import SaveBeneficiary from "./save-beneficiary";
// import TransferContainer from "../container"

class RequestCardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    componentDidMount() {
      console.log("index is mounted");
    }
   render() {
       return(
           <Fragment>
                {this.props.children}
                <Route exact path='/cards' render={(props) => <RequestCard {...props} />} />
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

export default connect(mapStateToProps)(RequestCardContainer);
//export default Airtime;