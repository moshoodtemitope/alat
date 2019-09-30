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
import Modal from 'react-responsive-modal';
import connect from "react-redux/es/connect/connect";
import Bills from './airtime-bills/airtime-bills-home';
import TransferContainer from "./transfer/container";
import Accounts from "./accounts/container";
import NewTransfer from "./transfer/cash-transfer/new-transfer";
import ProvideDetails from "./transfer/cash-transfer/provide-details";
import TransferHome from "./transfer/transfer-home";
//import BillsRoute from './airtime-bills/bills-route';
import FundAccountIndex from './fund-account/index';
import AccountSettings from './account-settings/container';
import LoansIndex from './loans';
import InsuranceContainer from './insurance/insurance-container';
import CardsContainer from './cards/cards-container';
import RemittanceContainer from './remittance/remittance-container';
import LifestyleIndex from './lifestyle/index'
import SavingsContainer from './savings/index'
import { userActions } from "../redux/actions/onboarding/user.actions";
import ProfileIndex from './profile';
import TalkToUsIndex from './talk-to-us/index'





// import MemberSlots from './savings/group/members-slot';

// function PrivateRoute ({component: Component, authed, ...rest}) {



var timer = 60
var user = JSON.parse(localStorage.getItem("user"));
//console.log("ouside", user);
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
            clearInterval: false,
            countDownTimeOn: false,
            countDownSeconds: 60,
            openModal: false
        };
        this.events = [
            "load",
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress"
        ];

        this.warn = this.warn.bind(this);
        this.logout = this.logout.bind(this);
        this.resetTimeout = this.resetTimeout.bind(this);
        this.reissue = this.reissue.bind(this);
        this.func = this.reissue;
        this.countSec = this.countSec.bind(this);
        this.secFunc = this.countSec;
        this.logoutButton = this.logoutButton.bind(this);

        for (var i in this.events) {
            window.addEventListener(this.events[i], this.resetTimeout);
        }


        this.setPlayInterval();
        this.setTimeout();

    }
    componentWillMount() {

    }
    componentWillUnmount() {
        this.destroy(true);
    }

    setPlayInterval() {
        this.run = setInterval(this.func, 4 * 60 * 1000);
    }

    setCountDown() {

        this.countDown = setInterval(this.secFunc, 1000);
    }

    clearTimeout(isIncludingSetIterval = false) {
        if (this.warnTimeout) clearTimeout(this.warnTimeout);

        if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
        if (isIncludingSetIterval) {
            clearInterval(this.run);
            clearInterval(this.countDown);
        }
    }

    setTimeout() {
        this.warnTimeout = setTimeout(this.warn, 4 * 59 * 1000);
        // this.warnTimeout = setTimeout(this.warn, 10 * 1000);

        this.logoutTimeout = setTimeout(this.logout, 5 * 60 * 1000);
        // this.logoutTimeout = setTimeout(this.logout, 71 * 1000);
    }
    reissue() {
        this.props.getAnotherToken()

    }

    countSec() {
        // console.log("do -1 here", this.state.countDownSeconds)
        this.setState({ countDownSeconds: timer });
        timer--;
    }

    resetTimeout() {
        //console.log("you are active")
        this.clearTimeout();
        this.setTimeout();
    }

    warn() {
        timer = 60;
        this.setState({ openModal: true, countDownTimeOn: true })
        this.setCountDown()
    }

    logout() {
        this.destroy();
        this.props.logout();
    }

    logoutButton(event) {
        event.preventDefault();
        this.destroy();
        this.props.logout();
    }

    destroy() {
        this.clearTimeout(true);

        for (var i in this.events) {
            window.removeEventListener(this.events[i], this.resetTimeout);
        }
    }

    closeModal = (event) => {
       if (event) event.preventDefault();
        timer = 60;
        this.setState({ openModal: false, countDownTimeOn: false }, clearInterval(this.countDown))

    }

    componentDidMount() {
    }

    render() {
        if (this.props.user) {
            // let timerId = setInterval(() => console.log("Do refresh token"), 5000);
            // after 5 seconds stop
            // setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
        }

        if (timer == 0 && this.state.countDownTimeOn) {
            this.closeModal();
            this.destroy();
            this.props.logout();
        }
        return (
            <Router history={history}>
                <Switch>
                   
                    <PrivateRoute path='/dashboard' authed={this.props.user} component={Dashboard} />
                    <PrivateRoute path='/fund' authed={this.props.user} component={FundAccountIndex} />
                    
                    <PrivateRoute path='/bills/airtime' authed={this.props.user} component={Bills}/>
                    <PrivateRoute path='/bills/data' authed={this.props.user} component={Bills}/>
                    <PrivateRoute path='/bills/paybills' authed={this.props.user} component={Bills}/>
                    <PrivateRoute path='/transfer' authed={this.props.user} component={TransferContainer}/>
                    <PrivateRoute path='/cardless-withdrawal' authed={this.props.user} component={TransferContainer}/>
                    <PrivateRoute path='/fx-transfer' authed={this.props.user} component={TransferContainer}/>
                    <PrivateRoute path='/loans' authed={this.props.user} component={LoansIndex}/>
                    <PrivateRoute path='/account' authed={this.props.user} component={Accounts}/>
                    <PrivateRoute path='/settings' authed={this.props.user} component={AccountSettings}/>
                    <PrivateRoute path='/profile' authed={this.props.user} component={ProfileIndex} />
                    <PrivateRoute path='/insurance' authed={this.props.user} component={InsuranceContainer}/>
                    <PrivateRoute path='/cards' authed={this.props.user} component={CardsContainer}/>
                    <PrivateRoute path='/hotlist' authed={this.props.user} component={CardsContainer}/>
                    <PrivateRoute path='/setcard-pin' authed={this.props.user} component={CardsContainer}/>
                    <PrivateRoute path='/cards-control' authed={this.props.user} component={CardsContainer}/>
                    <PrivateRoute path='/virtual-cards' authed={this.props.user} component={CardsContainer}/>
                    <PrivateRoute path='/receive-money' authed={this.props.user} component={RemittanceContainer}/>
                    <PrivateRoute path='/lifestyle' authed={this.props.user} component={LifestyleIndex}/>
                    <PrivateRoute path='/savings' authed={this.props.user} component={SavingsContainer}/>
                    <PrivateRoute path='/talk-to-us' authed={this.props.user} component={TalkToUsIndex}/>


                    

                </Switch>
            </Router>

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
        getAnotherToken: () => dispatch(userActions.reissueToken()),
        logout: () => dispatch(userActions.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoutes);
