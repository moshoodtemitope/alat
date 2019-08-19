import React, {Component, Fragment} from 'react';
import { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link, NavLink, Route } from 'react-router-dom';

import { alertActions } from "../../../redux/actions/alert.actions";
import * as settingsActions from "../../../redux/actions/account-settings/export"

class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

 


   render() {
       return(
           
           <Fragment>
                {this.props.children}
                <Route exact path='/bills/paybills' render={(props) => <Index {...props} />} />
           </Fragment>
       );
   }
}

const mapStateToProps = state => {
    return{
        alert: state.alert,
        fetching: state.settings_reducer.isFetching,
        pageState: state.settings_reducer.pageState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onChangePassword: (token, payload) => dispatch(settingsActions.(token, payload)),
        // resetPageState: () => dispatch(settingsActions.resetPageState()),
        clearError: () => dispatch(alertActions.clear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);