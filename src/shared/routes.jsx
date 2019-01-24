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
import InnerRoute from "./innerRoute";
// import { Route} from 'react-router-dom'


const MainRoute = props => (
    <Router history={history}>
        <div>
            <Route exact path="/" component={Login} />
            <InnerRoute />
        </div>
    </Router>
);

export default MainRoute;
