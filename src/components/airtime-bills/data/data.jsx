import React, {Component} from 'react';
import { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink, Route } from 'react-router-dom';

import Index from '.';
import BuyData from './buy-data';
import * as actions from '../../../redux/actions/dataActions/export';

class Data extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    componentDidMount() {
        this.props.fetchBeneficiaries(this.state.user.token);
    }
   render() {
       return(
           <Fragment>
               {this.props.children}
            <Route exact path='/bills/data' render={(props) => <Index {...props} beneficiaries={this.props.beneficiaries} isFetching={this.props.fetching} />} />
            <Route path='/bills/data/buy' render={(props) => <BuyData {...props} />} />
           </Fragment>
       );
   }
}

const mapStateToProps = state => {
    return{
        beneficiaries : state.data_reducer.beneficiaries,
        fetching: state.data_reducer.isFetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBeneficiaries : (token) => dispatch(actions.fetchDataBeneficiaries(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Data);