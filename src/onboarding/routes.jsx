import * as React from 'react';
// import { Route } from 'react-router'
import Login from "./login";
import Signup from "./signup";
import { Switch } from "react-router-dom";
import Bvn from "./signup/bvn";
import { Route} from 'react-router-dom'
import { history } from '../_helpers';
import {Router} from "react-router";
import OnboardingContainer from "./Container";
import Logout from "./Logout";


const OnboardingRoute = props => (

    <Router history={history}>
        <div>

            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            {/*<Route path="/login" component={Login} />*/}
            <Route exact path="/register" component={Signup}/>
            <Route exact path="/register/bvn" component={Bvn}/>
            {/*<Route component={Error404} />*/}
        </div>
        {/*<div>*/}
            {/*<Route exact path="/" component={Login}/>*/}
            {/*<Route path="/register" component={Signup}/>*/}
            {/*<Route path="/register/bvn" component={Bvn}/>*/}
        {/*</div>*/}
    </Router>
);

export default OnboardingRoute;