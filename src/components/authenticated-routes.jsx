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
import CardsContainer from './cards/cards-container';
import RemittanceContainer from './remittance/remittance-container';
import LifestyleIndex from './lifestyle/index'


import ChooseGoalPlan from './savings/goal/goal-plan';
import FixedGoal from './savings/fixed-goal_step1'
import FixedGoalComplete from './savings/fixed-goal-step2';
import FixedGoalSummary from './savings/fixed-goal-summary';
import FlexGoal from './savings/flex-goal-step1';
import FlexGoalSummary from './savings/flex-goal-summary';
import CreateStashGoal from './savings/create-stash_step1';
import CreateStashGoalStep2 from './savings/create-stash-step2'
import GroupSavingsSelection from './savings/group/group-saving-selection';
import CreateATargetGoal from './savings/group/create-a-target-goal';
import GroupCreated from './savings/group/group-created';
import GroupAnalytics from './savings/group/group-analytics';
import GroupAnalytics2 from './savings/group/group-analytics2';
import GroupAnalytics3 from './savings/group/group-analytics3';
import AutomateGroupSavings from './savings/group/automated-group-savings';
import SuccessMessage from './savings/group/success-message';
import RotatingGroup from './savings/group/rotating-savings-group';
import RotatingGroupCreated from './savings/group/rotating-group-created';
import GroupAnalyticsMini from './savings/group/group-analytics-mini';
import JoinAGroup from './savings/group/join-a-group';
import JoinedGroupSuccessfully from './savings/group/joined-group-successfully';
import CreateStashSuccessMessage from './savings/goal/create-stash-success';
import GroupAnalyticsMini2 from './savings/group/group-analytics-mini2';
import ParentDashBoard from './savings/group/parent-dashboard';
import ViewGoalSummary from './savings/goal/view-goal-summary';
import WithDrawFromGoal from './savings/goal/withdraw-from-goal';
import WithDrawFromGoalSummary from './savings/goal/withdraw-from-goal-summary'
import TopUpGoal from './savings/goal/Top-up-goal';
import TopUpGoalSummary from './savings/goal/Top-up-goal-summary';
import TopUpGoalSuccess from './savings/goal/top-up-goal-success';
import FixedGoalSuccess from './savings/goal/Fixed-goal-success';
import MemberSlots from './savings/group/members-slot';
// import EditGroupSavings from './savings/group/edit-group-savings';
import EditRotatingGroup from './savings/group/edit-rotating-savings-group';
import DeleteGoal from './savings/goal/delete-goal';
import EditGoal from './savings/goal/Edit-Goal';
import FlexGoalStep2 from './savings/flex-goal-step2';
import StashCashout from './savings/goal/cash-out-goal';
import FlexSuccessMessage from './savings/goal/flex-goal-success';
import JoinGroupSummary from './savings/group/join-group-summary';
import JoinGroupSuccessMessage from './savings/group/joined-group-successfully';
import CashoutStashGoal from './savings/goal/cash-out-stash-goal_summary';
import deleteGoalSucess from "./savings/goal/delete-goal-success"
import RotatingSavingsEditedSuccessfully from './savings/group/success-message-edit-esusu';
import RotatingSavingsEditedSuccessfullyDeleted from './savings/group/success-message-rotating-delete';
import RotatingDelete from './savings/group/confirm-rotating-delete';
import GroupDelete from './savings/group/confirm-group-savings-delete';
import SavingsGroupDeleted from './savings/group/success-deleted-group-savings';
import ContributeToGroup from './savings/group/contribute-to-group';
import { userActions } from "../redux/actions/onboarding/user.actions";




// import MemberSlots from './savings/group/members-slot';

// function PrivateRoute ({component: Component, authed, ...rest}) {



var timer = 60
var user = JSON.parse(localStorage.getItem("user"));
console.log("ouside", user);
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
        console.log("you are active")
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
            <Fragment>
                <Modal open={this.state.openModal} onClose={this.closeModal} center>
                    <div className="div-modal">

                        <h3>You will be logged out in <strong>{this.state.countDownSeconds} seconds</strong></h3>

                        <div className="btn-opt">
                            {/* <button onClick={this.toggleModal} className="border-btn">Log out now</button>
                                    <button onClick={this.deleteBeneficiary} disabled={this.getDeleteStatus()}
                                        className="btn-alat">Continue</button> */}
                            <button onClick={this.logoutButton} className="border-btn">Log out</button>
                            <button onClick={this.closeModal} className="btn-alat">Continue</button>
                        </div>
                    </div>
                </Modal>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute path='/dashboard' authed={this.props.user} component={Dashboard} />
                        <PrivateRoute path='/fund' authed={this.props.user} component={FundAccountIndex} />
                        <PrivateRoute path='/bills/airtime' authed={this.props.user} component={Bills} />
                        <PrivateRoute path='/bills/data' authed={this.props.user} component={Bills} />
                        <PrivateRoute path='/bills/paybills' authed={this.props.user} component={Bills} />
                        <PrivateRoute path='/transfer' authed={this.props.user} component={TransferContainer} />
                        <PrivateRoute path='/cardless-withdrawal' authed={this.props.user} component={TransferContainer} />
                        <PrivateRoute path='/fx-transfer' authed={this.props.user} component={TransferContainer} />
                        <PrivateRoute path='/loans' authed={this.props.user} component={LoansIndex} />
                        <PrivateRoute path='/account' authed={this.props.user} component={Accounts} />
                        <PrivateRoute path='/settings' authed={this.props.user} component={AccountSettings} />
                        <PrivateRoute path='/cards' authed={this.props.user} component={CardsContainer} />
                        <PrivateRoute path='/hotlist' authed={this.props.user} component={CardsContainer} />
                        <PrivateRoute path='/setcard-pin' authed={this.props.user} component={CardsContainer} />
                        <PrivateRoute path='/cards-control' authed={this.props.user} component={CardsContainer} />
                        <PrivateRoute path='/virtual-cards' authed={this.props.user} component={CardsContainer} />
                        <PrivateRoute path='/receive-money' authed={this.props.user} component={RemittanceContainer} />
                        <PrivateRoute path='/savings/choose-goal-plan' authed={this.props.user} component={ChooseGoalPlan} />
                        <PrivateRoute path='/savings/fixed-goal' authed={this.props.user} component={FixedGoal} />
                        <PrivateRoute path='/savings/fixed-goal-complete' authed={this.props.user} component={FixedGoalComplete} />
                        <PrivateRoute path='/savings/fixed-goal-summary' authed={this.props.user} component={FixedGoalSummary} />
                        <PrivateRoute path='/savings/flex-goal' authed={this.props.user} component={FlexGoal} />
                        <PrivateRoute path='/savings/flex-goal-summary' authed={this.props.user} component={FlexGoalSummary} />
                        <PrivateRoute path='/savings/create-stash_step1' authed={this.props.user} component={CreateStashGoal} />
                        <PrivateRoute path='/savings/create-stash_step2' authed={this.props.user} component={CreateStashGoalStep2} />
                        <PrivateRoute path='/savings/goal/group-savings-selection' authed={this.props.user} component={GroupSavingsSelection} />
                        <PrivateRoute path='/savings/group/save-towards-a-target' authed={this.props.user} component={CreateATargetGoal} />
                        <PrivateRoute path='/savings/group/group-created' authed={this.props.user} component={GroupCreated} />
                        <PrivateRoute path='/savings/group/group-analytics' authed={this.props.user} component={GroupAnalytics} />
                        <PrivateRoute path='/savings/group/group-analytics2' authed={this.props.user} component={GroupAnalytics2} />
                        <PrivateRoute path="/savings/group/automate-contributions" authed={this.props.user} component={GroupAnalytics3} />
                        <PrivateRoute path="/savings/group/automate-group-savings" authed={this.props.user} component={AutomateGroupSavings} />
                        <PrivateRoute path="/savings/group/success-message" authed={this.props.user} component={SuccessMessage} />
                        <PrivateRoute path="/savings/group/create-rotating" authed={this.props.user} component={RotatingGroup} />
                        <PrivateRoute path="/savings/rotating-group" authed={this.props.user} component={RotatingGroupCreated} />
                        <PrivateRoute path='/savings/group-analytics-mini' authed={this.props.user} component={GroupAnalyticsMini} />
                        <PrivateRoute path='/savings/group-mini2' authed={this.props.user} component={GroupAnalyticsMini2} />
                        <PrivateRoute path='/savings/group/join-a-group' authed={this.props.user} component={JoinAGroup} />
                        <PrivateRoute path="/savings/group/joingroup-success-message" authed={this.props.user} component={JoinedGroupSuccessfully} />
                        <PrivateRoute path="/savings/goal/create-stash-success-message" authed={this.props.user} component={CreateStashSuccessMessage} />
                        <PrivateRoute path='/savings/fixed-goal-success' authed={this.props.user} component={FixedGoalSuccess} />
                        <PrivateRoute path='/savings/activityDashBoard' authed={this.props.user} component={ParentDashBoard} />
                        <PrivateRoute path='/savings/view-goal-summary' authed={this.props.user} component={ViewGoalSummary} />
                        <PrivateRoute path='/savings/withdraw-from-goal_step1' authed={this.props.user} component={WithDrawFromGoal} />
                        <PrivateRoute path='/savings/withdraw-from-goal_summary' authed={this.props.user} component={WithDrawFromGoalSummary} />
                        <PrivateRoute path='/savings/top-up-goal-step1' authed={this.props.user} component={TopUpGoal} />
                        <PrivateRoute path='/savings/top-up-goal-summary' authed={this.props.user} component={TopUpGoalSummary} />
                        <PrivateRoute path='/savings/top-up-goal-success' authed={this.props.user} component={TopUpGoalSuccess} />
                        <PrivateRoute path='/group-savings/edit-members-slots' authed={this.props.user} component={MemberSlots} />
                        {/* <PrivateRoute path='/group-savings/edit-group' authed={this.props.user} component={EditGroupSavings} /> */}
                        <PrivateRoute path='/group-savings/edit-rotating' authed={this.props.user} component={EditRotatingGroup} />
                        <PrivateRoute path='/savings/delete-goal' authed={this.props.user} component={DeleteGoal} />
                        <PrivateRoute path='/savings/edit-goal' authed={this.props.user} component={EditGoal} />
                        <PrivateRoute path='/savings/flex-goal-step2' authed={this.props.user} component={FlexGoalStep2} />
                        <PrivateRoute path='/savings/stash-cashout' authed={this.props.user} component={StashCashout} />
                        <PrivateRoute path='/savings/flex-success-message' authed={this.props.user} component={FlexSuccessMessage} />
                        <PrivateRoute path="/savings/join-group-summary" authed={this.props.user} component={JoinGroupSummary} />
                        <PrivateRoute path="/savings/joined-group-successfully" authed={this.props.user} component={JoinGroupSuccessMessage} />
                        <PrivateRoute path="/savings/cashout-goal-summary" authed={this.props.user} component={CashoutStashGoal} />
                        <PrivateRoute path="/savings/delete-goal-success" authed={this.props.user} component={deleteGoalSucess} />
                        <PrivateRoute path="/savings/rotating-edited-successfully" authed={this.props.user} component={RotatingSavingsEditedSuccessfully} />
                        <PrivateRoute path="/savings/rotating-deleted-successfully" authed={this.props.user} component={RotatingSavingsEditedSuccessfullyDeleted} />
                        <PrivateRoute path="/savings/rotating-confirm-delete" authed={this.props.user} component={RotatingDelete} />
                        <PrivateRoute path="/savings/delete-group-savings" authed={this.props.user} component={GroupDelete} />
                        <PrivateRoute path="/savings/delete-group-savings-mod" authed={this.props.user} component={SavingsGroupDeleted} />
                        <PrivateRoute path="/savings/contribute-to-group" authed={this.props.user} component={ContributeToGroup} />
                        <PrivateRoute path='/lifestyle' authed={this.props.user} component={LifestyleIndex} />

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
        getAnotherToken: () => dispatch(userActions.reissueToken()),
        logout: () => dispatch(userActions.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoutes);
