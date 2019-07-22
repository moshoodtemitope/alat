
import React, { Component, Fragment } from 'react';
import {Link, NavLink, Route} from 'react-router-dom';
import { connect } from "react-redux";

// import NewTransfer from "./new-transfer";

class VirtualCards extends Component {
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
                {/* <Route exact path='/transfer' render={(props) => <NewTransfer {...props} />} />
                <Route path='/transfer/provide-details' render={(props) => <ProvideDetails {...props} />}/>
                <Route path='/transfer/send' render={(props) => <ConFirmTransfer {...props} />}/>
                <Route path='/transfer/otp' render={(props) => <TransferOtp {...props} />}/>
                <Route path='/transfer/success' render={(props) => <TransferSuccess {...props} />}/>
                <Route path='/transfer/save-beneficiary' render={(props) => <SaveBeneficiary {...props} />}/> */}
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

export default connect(mapStateToProps)(VirtualCards);
//export default Airtime;