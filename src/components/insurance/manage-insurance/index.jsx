
import React, { Component, Fragment } from 'react';
import {Link, NavLink, Route} from 'react-router-dom';
import { connect } from "react-redux";

import ManageInsurance from "./manage-insurance";
import BuyPolicy from "./buy-policy";

class ManageInsuranceContainer extends Component {
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
                <Route exact path='/insurance' render={(props) => <ManageInsurance {...props} />} />
                <Route exact path='/insurance/buy-insurance' render={(props) => <BuyPolicy {...props} />} />
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

export default connect(mapStateToProps)(ManageInsuranceContainer);
//export default Airtime;