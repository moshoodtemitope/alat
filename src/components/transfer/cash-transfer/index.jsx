
import React, { Component, Fragment } from 'react';
import {Link, NavLink, Route} from 'react-router-dom';
import { connect } from "react-redux";

import NewTransfer from "./new-transfer";
import ProvideDetails from "./provide-details";
import ConFirmTransfer from "./confirm";
import TransferSuccess from "./transfer-success";

class Cashtransfer extends Component {
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
                <Route exact path='/transfer' render={(props) => <NewTransfer {...props} />} />
                <Route path='/transfer/provide-details' render={(props) => <ProvideDetails {...props} />}/>
                <Route path='/transfer/send' render={(props) => <ConFirmTransfer {...props} />}/>
                <Route path='/transfer/success' render={(props) => <TransferSuccess {...props} />}/>
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

export default connect(mapStateToProps)(Cashtransfer);
//export default Airtime;