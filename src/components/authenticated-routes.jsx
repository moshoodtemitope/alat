import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Redirect, Router } from "react-router";
import { history } from "../_helpers/history";
import Dashboard from "../components/dashboard";
import TransferRoute from "./transfer/routes";
import { Fragment } from "react";
import Login from "./onboarding/login";
import Signup from "./onboarding/signup";
import Bvn from "./onboarding/signup/bvn";
import connect from "react-redux/es/connect/connect";
import Bills from './airtime-bills/airtime-bills-home';
import TransferContainer from "./transfer/container";
import NewTransfer from "./transfer/cash-transfer/new-transfer";
import ProvideDetails from "./transfer/cash-transfer/provide-details";
import TransferHome from "./transfer/transfer-home";
//import BillsRoute from './airtime-bills/bills-route';
import FundAccountIndex from './fund-account/index';
import Modal from 'react-responsive-modal';
import { userActions } from "../redux/actions/onboarding/user.actions";




function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )
}

class AuthenticatedRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            signoutTime: 1000 * 10 * 1,
            isloggedout: false,
        };
    }

    

    // componentDidMount() {
    //     this.events = [
    //         'load',
    //         'mousemove',
    //         'mousedown',
    //         'click',
    //         'scroll',
    //         'keypress'
    //     ];

    //     if(this.state.isloggedout){
            
    //     }
    //     for (var i in this.events) {
    //         window.addEventListener(this.events[i], this.resetTimeout);
    //     }

    //     this.setTimeout();
    // }

    // clearTimeoutFunc = () => {
    //     // if (this.warnTimeout) clearTimeout(this.warnTimeout);

    //     if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
    // };

    // setTimeout = () => {
    //     // this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
    //     console.warn("setting time again")
    //     this.logoutTimeout = setTimeout(this.logoutUser, this.state.signoutTime);
    // };

    // resetTimeout = () => {
    //     this.clearTimeoutFunc();
    //     this.setTimeout();
    // };

    // logoutUser = () => {
    //     this.setState({show: true, isloggedout: true});
    //     this.clearTimeoutFunc();
    //     var userDetails = localStorage.getItem("user");
    //     userDetails["token"] = "xxxxxxxxxxxxx";
    //     localStorage.setItem("user" , userDetails);
        
    // };

    // onCloseModal = () => {
    //     this.setState({ show: false, })
    //     this.props.logout();
    // }

    render() {
        if (this.props.user) {
            // let timerId = setInterval(() => console.log("Do refresh token"), 5000);
            // after 5 seconds stop
            // setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
        }


        return (
            <Fragment>
                {/* <Modal open={this.state.show} onClose={this.onCloseModal} center>
                    <div className="div-modal">
                        <h3> Opss!! your session has expired.</h3>
                        <div className="btn-opt">
                            <button onClick={this.onCloseModal} className="border-btn">Log in</button>
                        </div>
                    </div>
                </Modal> */}
                <Router history={history}>
                    <Switch>
                        {/*<Route path="/dashboard" component={Dashboard} />*/}
                        <PrivateRoute path='/dashboard' authed={this.props.user} component={Dashboard} />
                        <PrivateRoute path='/fund' authed={this.props.user} component={FundAccountIndex} />
                        {/* <BillsRoute authed={this.props.user}/> */}
                        {/* <PrivateRoute exact path='/bills' authed={this.props.user} component= {Bills}>
                        <Redirect to={'/bills/airtime'} />
                    </PrivateRoute> */}
                        <PrivateRoute path='/bills/airtime' authed={this.props.user} component={Bills} />
                        <PrivateRoute path='/bills/data' authed={this.props.user} component={Bills} />
                        <PrivateRoute path='/bills/paybills' authed={this.props.user} component={Bills} />
                        <PrivateRoute path='/transfer' authed={this.props.user} component={TransferContainer} />
                        <PrivateRoute path='/cardless-withdrawal' authed={this.props.user} component={TransferContainer} />
                        <PrivateRoute path='/fx-transfer' authed={this.props.user} component={TransferContainer} />
                    </Switch>
                </Router>
            </Fragment>


            // <Router history={history}>
            //     <Switch>
            //         {/*<PrivateRoute authed={this.state.authed} exact path='/dashboard' component={Dashboard} />*/}
            //         <Route path="/dashboard" component={Dashboard} />
            //         {/*<TransferRoute />*/}
            //         {/*<Route exact path="/transfer" component={TransferComponent} />*/}
            //     </Switch>
            //  bills/airtime => bills/airtime/buy-airtime => bills/airtime/comfirm-aritme
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


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(userActions.logout()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoutes);
