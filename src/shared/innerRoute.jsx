import * as React from 'react';
// import { Route } from 'react-router'
import {Route, Switch} from "react-router-dom";
import OnboardingRoute from "../onboarding/routes";
import {Router} from "react-router";
import {history} from "../_helpers";
import Login from "../onboarding/login";
import Signup from "../onboarding/signup";
import Bvn from "../onboarding/signup/bvn";
import Dashboard from "../dashboard";
import TransferComponent from "../transfer/TransferComponent";
// import { Route} from 'react-router-dom'



// const user = JSON.parse(localStorage.getItem("user"));
//
// console.log(user);
// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Router history={history} {...rest} render={(props) => (
//         user != null
//             ? <Redirect to='/' />
//             : <Component {...props} />
//     )} />
// );


const InnerRoute = props => (
    <Router history={history}>
        <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/transfer" component={TransferComponent} />
        </Switch>
    </Router>
);

export default InnerRoute;
