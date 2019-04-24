import * as React from 'react';
import Login from "./login";
import Signup from "./signup";
import Bvn from "./signup/bvn";
import VerifyBvn from "./signup/verify-bvn";
import { Route} from 'react-router-dom'
import {history} from './../../_helpers/history';
import {Redirect, Router} from "react-router";
// import Logout from "./Logout";
import {Fragment} from "react";
import Dashboard from "../dashboard";

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

// const OnboardingRoute = props => (
//
//     <Router history={history}>
//         <Fragment>
//             <Route exact path="/" component={Login} render={props => (<Login fakeAuth={fakeAuth} {...props} />)} />
//             {/*<Route exact path="/" component={Login} />*/}
//             {/*<Route exact path="/logout" component={Logout} />*/}
//             <Route exact path="/register" component={Signup}/>
//             <Route path="/register/bvn" component={Bvn}/>
//             <PrivateRoute fakeAuth={fakeAuth} exact path='/dashboard' component={Dashboard} />
//             {/*<Route component={Error404} />*/}
//         </Fragment>
//     </Router>
// );

class OnboardingRoute extends React.Component{
    render(){
        return(
            <Router history={history}>
                <Fragment>
                    <Route exact path="/" component={Login} render={props => (<Login fakeAuth={fakeAuth} {...props} />)} />
                    {/*<Route exact path="/" component={Login} />*/}
                    {/*<Route exact path="/logout" component={Logout} />*/}
                    <Route exact path="/register" component={Signup}/>
                    <Route path="/register/bvn" component={Bvn}/>
                    <Route path="/register/verify-bvn" component={VerifyBvn}/>
                    <PrivateRoute fakeAuth={fakeAuth} exact path='/dashboard' component={Dashboard} />
                    {/*<Route component={Error404} />*/}
                </Fragment>
            </Router>
        )
    }
}

export default OnboardingRoute;