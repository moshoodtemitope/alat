import * as React from "react";
import {Redirect, Route, Router, Switch} from "react-router";
import {connect} from "react-redux";
import {Fragment} from "react";
import OnboardingRoute from "./onboarding/routes";
// import {OnboardingRoute} from "./onboarding/routes";
import {history} from './../_helpers/history';
import AuthenticatedRoutes from "./authenticated-routes";
import Login from "./onboarding/login";
import Signup from "./onboarding/signup";
import Bvn from "./onboarding/signup/bvn";
import Dashboard from "./dashboard";
import TransferHome from "./transfer/transfer-home";
import NewTransfer from "./transfer/cash-transfer/new-transfer";
import TransferRoute from "./transfer/routes";

// function PrivateRoute ({component: Component, authed, ...rest}) {
//     console.error(authed);
//     return (
//         <Route
//             {...rest}
//             render={(props) => authed === true
//                 ? <Component {...props} />
//                 : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
//         />
//     )
// }

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            authed
                ? <Component {...props} />
                : <Redirect to="/" />
        )}
    />
);

class IndexedRoute extends React.Component {

    componentDidMount() {
        console.log('==== Routes mounted!');
    }

    render() {
        return (
            <div>
                <OnboardingRoute />
                <AuthenticatedRoutes />
            </div>
            // <Router history={history}>
            //     <Switch>
            //         <PrivateRoute path='/dashboard' component={Dashboard} authed={this.props.user} />
            //         <OnboardingRoute />
            //         <AuthenticatedRoutes />
            //
            //         {/*<Route exact path="/" component={Login} />*/}
            //         {/*<Route exact path="/" component={Login} />*/}
            //         {/*<Route exact path="/logout" component={Logout} />*/}
            //         {/*<Route exact path="/register" component={Signup}/>*/}
            //         {/*<Route path="/register/bvn" component={Bvn}/>*/}
            //
            //         {/*<PrivateRoute path="/transfer" component={TransferHome} authed={this.props.user} />*/}
            //         {/*<PrivateRoute path="/transfer/new-transfer" component={NewTransfer} authed={this.props.user} />*/}
            //         {/*<TransferRoute/>*/}
            //         {/*<AccountsRoute/>*/}
            //     </Switch>
            // </Router>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

export default connect(mapStateToProps)(IndexedRoute);