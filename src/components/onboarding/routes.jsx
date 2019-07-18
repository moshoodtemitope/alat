import * as React from 'react';
import Login from "./login";
import Signup from "./signup";
import Bvn from "./signup/bvn";
import VerifyBvn from "./signup/verify-bvn";
import CreateAccount from "./signup/create-account";
import ConfirmBvnDetails from "./signup/confirm-bvndetails";
import SecurityQuestions from "./signup/security-questions";
import DocumentUplaod from "./signup/doc-upload";
import { Route} from 'react-router-dom'
import {history} from './../../_helpers/history';
import {Redirect, Router} from "react-router";
// import Logout from "./Logout";
import {Fragment} from "react";
import Dashboard from "../dashboard";
import OnboardingLandingPage from "./landing-page";
import LoanOnboardingStep1 from "./loans/loans-step-1";
import LoanOnboardingStep2 from './loans/loan-step-2';
import LoanOnboardingStep3 from './loans/loan-step-3';
import LoanOnboardingValidateOTP from './loans/loan-validateotp';

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
            <div>
                <Route exact path="/" component={Login} render={props => (<Login fakeAuth={fakeAuth} {...props} />)} />
                {/*<Route exact path="/" component={Login} />*/}
                {/*<Route exact path="/logout" component={Logout} />*/}
                <Route exact path="/register" component={Signup}/>
                <Route path="/register/bvn" component={Bvn}/>
                <Route path="/register/verify-bvn" component={VerifyBvn}/>
                <Route path="/register/create-account" component={CreateAccount}/>
                <Route path="/register/confirm-bvndetails" component={ConfirmBvnDetails}/>
                <Route path="/register/security-questions" component={SecurityQuestions}/>
                <Route path="/register/doc-upload" component={DocumentUplaod}/>
                {/* <PrivateRoute fakeAuth={fakeAuth} exact path='/dashboard' component={Dashboard} />*/}
                {/*<Route component={Error404} />*/}
                <Route path="/signup-landing" component={OnboardingLandingPage}/>
                <Route path="/loan/step-1" component={LoanOnboardingStep1}/>
                <Route path="/loan/step-2" component={LoanOnboardingStep2}/>
                <Route path="/loan/step-3" component={LoanOnboardingStep3} />
                <Route path="/loan/validateotp" component={LoanOnboardingValidateOTP}/>
            </div>
        )
    }
}

export default OnboardingRoute;