import * as React from 'react';
import {Route, Switch} from "react-router-dom";
import {Redirect, Router} from "react-router";
import {history} from "../_helpers/history";
import Dashboard from "../components/dashboard";
import TransferRoute from "./transfer/routes";
import {Fragment} from "react";
import Login from "./onboarding/login";
import Signup from "./onboarding/signup";
import Bvn from "./onboarding/signup/bvn";
import connect from "react-redux/es/connect/connect";
import Bills from './airtime-bills/airtime-bills-home';
import NewTransfer from "./transfer/cash-transfer/new-transfer";
import TransferHome from "./transfer/transfer-home";


function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed ? <Component {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
        />
    )
}

class AuthenticatedRoutes extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        if(this.props.user){
            // let timerId = setInterval(() => console.log("Do refresh token"), 5000);
            // after 5 seconds stop
            // setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
        }


        return(
            <Router history={history}>
                <Switch>
                    {/*<Route path="/dashboard" component={Dashboard} />*/}
                    <PrivateRoute path='/dashboard' authed={this.props.user} component={Dashboard} />
                    <PrivateRoute path='/bills/airtime' authed={this.props.user} component={Bills}/>
                    <PrivateRoute path='/bills/data' authed={this.props.user} component={Bills}/>
                    <PrivateRoute path='/transfer' authed={this.props.user} component={NewTransfer}/>
                    <PrivateRoute path='/transfer/new-transfer' authed={this.props.user} component={TransferHome}/>
                </Switch>
            </Router>
            
            // <Router history={history}>
            //     <Switch>
            //         {/*<PrivateRoute authed={this.state.authed} exact path='/dashboard' component={Dashboard} />*/}
            //         <Route path="/dashboard" component={Dashboard} />
            //         {/*<TransferRoute />*/}
            //         {/*<Route exact path="/transfer" component={TransferComponent} />*/}
            //     </Switch>
            // </Router>
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    }
}

export default connect(mapStateToProps)(AuthenticatedRoutes);
