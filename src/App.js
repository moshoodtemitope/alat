import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import {Redirect, Route, Router, Switch} from "react-router";
import {history} from "./_helpers/history";
import Login from "./components/onboarding/login";
import Signup from "./components/onboarding/signup";
import Bvn from "./components/onboarding/signup/bvn";
import OnboardingRoute from "./components/onboarding/routes";
import AuthenticatedRoutes from "./components/authenticated-routes";
import Dashboard from "./components/dashboard";
import IndexedRoute from "./components/routes";

{/*<PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />*/}



class App extends Component {
  render() {
    return (
        <Router history={history}>
            <Switch>
                <IndexedRoute />

                {/*<PrivateRoute fakeAuth={fakeAuth} exact path='/dashboard' component={Dashboard} />*/}
                {/*<AuthenticatedRoutes />*/}
                {/*<Route exact path="/" component={Login} render={props => (<Login fakeAuth={fakeAuth} {...props} />)} />*/}
                {/*/!*<Route exact path="/logout" component={Logout} />*!/*/}
                {/*<Route exact path="/register" component={Signup}/>*/}
                {/*<Route exact path="/register/bvn" component={Bvn}/>*/}


            </Switch>
        </Router>
    );
  }
}

export default App;
