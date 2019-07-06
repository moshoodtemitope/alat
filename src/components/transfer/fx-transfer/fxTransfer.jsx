import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { Link, NavLink, Route } from 'react-router-dom';

import Index from '.';
import ProvideDetails from './provide-details';
import ConFirmFxTransfer from './confirm';

class fxTransfer extends Component{
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
                <Route exact path='/fx-transfer' render={(props) => <Index {...props} />} />
                <Route exact path='/fx-transfer/provide-details' render={(props) => <ProvideDetails {...props} />} />
                <Route exact path='/fx-transfer/confirm' render={(props) => <ConFirmFxTransfer {...props} />} />
           </Fragment>
       );
   }
}


export default fxTransfer;