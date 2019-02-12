import * as React from "react";
import {connect, Provider} from "react-redux";
import {history} from "../_helpers";
import {Router} from "react-router";
import InnerContainer from "../shared/templates/inner-container";
import UserAccounts from "./user-accounts";
import UserGoals from "./user-goals";
import OnboardingPriority from "./onboarding-priority";
import AnnouncementCard from "./announcement-card";


class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // user: user
            // user: user
        };

        // if(!user){
        //     history.push('/');
        // }
        // SystemConstant.HEADER['alat-token'] = user.token;
    }


    render(){
        const resp = this.props;
        const user = JSON.parse(localStorage.getItem("user"));
        // console.log(JSON.parse(localStorage.getItem("user")));
        return (
            <Router history={history}>
                <InnerContainer>
                <div className="dashboard-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="welcome-name">Welcome back, <span>{user.fullName}</span></p>
                            </div>

                            <div className="col-sm-12">
                                <div className="row">
                                    <UserAccounts />
                                    <UserGoals />
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12 col-md-8">
                                        <OnboardingPriority/>

                                        <div className="al-card transact-history">
                                            <h4 className="m-b-20">Transaction History <span><a
                                                href="#">View All</a></span></h4>

                                            <div className="history-table clearfix">
                                                <div className="history-ctn">
                                                    <div className="history-list clearfix">
                                                        <img src="/public/assets/img/hs-transfer.svg" />
                                                            <p className="desc">Funded Apple Virtual Card with USD 200
                                                                for NGN 80,000<span className="date">Feb 9, 2017</span>
                                                            </p>
                                                            <p className="balance credit">USD 200</p>
                                                    </div>
                                                </div>

                                                <div className="history-ctn">
                                                    <div className="history-list clearfix">
                                                        <img src="/public/assets/img/hs-atm.svg" />
                                                            <p className="desc">Funded Apple Virtual Card with USD 200
                                                                for NGN 80,000<span className="date">Feb 9, 2017</span>
                                                            </p>
                                                            <p className="balance debit">USD 200</p>
                                                    </div>
                                                </div>

                                                <div className="history-ctn">
                                                    <div className="history-list clearfix">
                                                        <img src="/public/assets/img/hs-pos.svg" />
                                                            <p className="desc">Funded Apple Virtual Card with USD 200
                                                                for NGN 80,000<span className="date">Feb 9, 2017</span>
                                                            </p>
                                                            <p className="balance credit">USD 200</p>
                                                    </div>
                                                </div>

                                                <div className="history-ctn">
                                                    <div className="history-list clearfix">
                                                        <img src="/public/assets/img/hs-fund.svg" />
                                                            <p className="desc">Funded Apple Virtual Card with USD 200
                                                                for NGN 80,000<span className="date">Feb 9, 2017</span>
                                                            </p>
                                                            <p className="balance credit">USD 200</p>
                                                    </div>
                                                </div>

                                                <div className="history-ctn">
                                                    <div className="history-list clearfix">
                                                        <img src="/public/assets/img/hs-transfer.svg" />
                                                            <p className="desc">Funded Apple Virtual Card with USD 200
                                                                for NGN 80,000<span className="date">Feb 9, 2017</span>
                                                            </p>
                                                            <p className="balance credit">USD 200</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <div className="al-card">
                                            <div className="reminder-card">
                                                <div className="text-center">
                                                    <img src="/public/assets/img/calendar.svg" />
                                                        <p>You currently do not have any pending reminders</p>
                                                        <a href="" className="btn-alat m-t-20">Setup a reminder</a>
                                                </div>
                                            </div>
                                        </div>

                                        <AnnouncementCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </InnerContainer>
            </Router>

        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

export default connect(null)(Dashboard);