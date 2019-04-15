import * as React from 'react';
// import { Route } from 'react-router'
import {Route, Switch} from "react-router-dom";
// import OnboardingRoute from "../onboarding/routes";
import {Redirect, Router} from "react-router";
import {history} from "../_helpers/history";
// import Login from "../onboarding/login";
// import Signup from "../onboarding/signup";
// import Bvn from "../onboarding/signup/bvn";
import Dashboard from "../components/dashboard";
import TransferRoute from "./transfer/routes";
// import TransferComponent from "../transfer/TransferComponent";
// import { Route} from 'react-router-dom'


export const fakeAuth = {
    isAuthenticated: false,
    authenticate() {
        return (this.isAuthenticated = true);
    },
    logout() {
        return (this.isAuthenticated = false);
    }
};

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
        />
    )
}

const AuthenticatedRoutes = props => (
    <Router history={history}>
        <Switch>
            <PrivateRoute authed={this.state.authed} exact path='/dashboard' component={Dashboard} />
            {/*<Route exact path="/dashboard" component={Dashboard} />*/}
            {/*<TransferRoute />*/}
            {/*<Route exact path="/transfer" component={TransferComponent} />*/}
        </Switch>
    </Router>
);

export default AuthenticatedRoutes;
