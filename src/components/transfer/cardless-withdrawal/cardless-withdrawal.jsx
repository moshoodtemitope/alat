import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { Link, NavLink, Route } from 'react-router-dom';

import Index from '.';

class CardlessWithdrawal extends Component{
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
                <Route exact path='/cardless-withdrawal' render={(props) => <Index {...props} />} />
           </Fragment>
       );
   }
}


export default CardlessWithdrawal;