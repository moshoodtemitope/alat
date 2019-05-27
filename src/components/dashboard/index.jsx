import * as React from "react";
import {connect} from "react-redux";
import {history} from "./../../_helpers/history";
import {Router} from "react-router";
import UserAccounts from "./user-accounts";
import UserGoals from "./user-goals";
import OnboardingPriority from "./onboarding-priority";
import AnnouncementCard from "./announcement-card";
import {NavLink} from "react-router-dom";
import {Fragment} from "react";
import InnerContainer from "../../shared/templates/inner-container";
import hstransfer from "../../assets/img/hs-transfer.svg";
import hsatm from "../../assets/img/hs-atm.svg";
import hspos from "../../assets/img/hs-pos.svg";
import hsfund from "../../assets/img/hs-fund.svg";
import calendar from "../../assets/img/calendar.svg";
import {getAccountHistory, getAccounts} from "../../redux/actions/dashboard/dashboard.actions";
import {dashboardConstants as userConstants} from "../../redux/constants/dashboard/dashboard.constants";
import Slider from "react-animated-slider";
import * as utils from "../../shared/utils";

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // user: user
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    fetchAccounts(){
        const { dispatch } = this.props;
        // console.log(this.props);
        console.log(this.state.user.token);
        dispatch(getAccounts(this.state.user.token));
    }

    componentDidMount() {
        this.fetchAccounts();
    }

    renderAccounts(){
        let user = this.state.user;
        let props = this.props;
        let accounts = props.accounts;
        if(accounts.user_account === userConstants.DASHBOARD_ACCOUNT_FETCH_PENDING){
            return  <h4 className="text-center" style={{ marginTop: '65px'}}>Loading accounts...</h4>;
        }
        else if(accounts.user_account === userConstants.DASHBOARD_ACCOUNT_FETCH_FAILURE){
            return(
                // <h4 className="text-center" style={{ marginTop: '65px'}}>No Account Data Found</h4>
                <div className="account-card m-b-50" style={{ minHeight : '190px' }}>
                <div className="account-name">
                    {/* <p>{acct.AccountType} <span>History</span></p> */}
                </div>
                <div className="account-no-status clearfix">
                    <p className="account-no">{accounts.user_account_data.error}</p>
                    {/* <p className="account-no">Acct No: {acct.AccountNumber}</p> */}
                    {/* {acct.AccountStatus==='A' && <p className="account-status">Active</p>}
                    {acct.AccountStatus==='PD' && <p className="account-status">Pending</p>}
                    {acct.AccountStatus==='P' && <p className="account-status">Restricted</p>} */}
                </div>

                <div className="account-balance clearfix">
                    <p className="balance">₦###,###</p>
                    {/* <a href="#" className="btn-alat btn-white m-t-10 btn-sm">Link BVN</a> */}
                </div>
            </div>
            );
        }
        else if (accounts.user_account === userConstants.DASHBOARD_ACCOUNT_FETCH_SUCCESS){
            let userAccounts = accounts.user_account_data.response.Accounts;
            if(accounts.user_account_data.response.AccountGenerationStatus === "Awaiting"){
                return (
                    <div className="account-card m-b-50" style={{ minHeight : '190px' }}>
                <div className="account-name">
                    {/* <p>{acct.AccountType} <span>History</span></p> */}
                </div>
                <div className="account-no-status clearfix">
                    <p className="account-no">Awaiting Generation</p>
                    {/* <p className="account-no">Acct No: {acct.AccountNumber}</p> */}
                    {/* {acct.AccountStatus==='A' && <p className="account-status">Active</p>}
                    {acct.AccountStatus==='PD' && <p className="account-status">Pending</p>}
                    {acct.AccountStatus==='P' && <p className="account-status">Restricted</p>} */}
                </div>

                <div className="account-balance clearfix">
                    <p className="balance">₦###,###</p>
                    {/* <a href="#" className="btn-alat btn-white m-t-10 btn-sm">Link BVN</a> */}
                </div>
            </div>
                );
            } else {
                return(
                    <Slider duration="500" infinite="true" emulateTouch="true" onSlideChange={event => this.getAccountHistory(event)}>
                        {userAccounts.map(function(acct, key){
                            return(
    
                                <div className="account-card m-b-50" key={key}>
                                    <div className="account-name">
                                        <p>{acct.AccountType} <span>History</span></p>
                                    </div>
                                    <div className="account-no-status clearfix">
                                        <p className="account-no">Acct No: {acct.AccountNumber}</p>
                                        {acct.AccountStatus==='A' && <p className="account-status">Active</p>}
                                        {acct.AccountStatus==='PD' && <p className="account-status">Pending</p>}
                                        {acct.AccountStatus==='P' && <p className="account-status">Restricted</p>}
                                    </div>
    
                                    <div className="account-balance clearfix">
                                        <p className="balance">₦{utils.formatAmount(acct.AvailableBalance)}</p>
                                        <a href="#" className="btn-alat btn-white m-t-10 btn-sm">Fund Account</a>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                );
            }
        }
    }

    getAccountHistory(accountIndex){
        console.log(accountIndex.slideIndex);
        console.log(this.props);

        const { dispatch } = this.props;
        let props = this.props;
        let accounts = props.accounts;
        let userAccounts = accounts.user_account_data.response.Accounts;
        let selectedAccount = userAccounts[accountIndex.slideIndex];
        console.log(selectedAccount);
        let payload = {
            Take: 10,
            Skip: 0,
            AccountNumber: selectedAccount.AccountNumber
        };
        dispatch(getAccountHistory(this.state.user.token, payload));
        // console.error(accountsHistory);
        // if(accounts.user_account === userConstants.DASHBOARD_ACCOUNT_FETCH_PENDING){
        //     return  <h4 className="text-center" style={{ marginTop: '65px'}}>Loading accounts...</h4>;
        // }
        // else if(accounts.user_account === userConstants.DASHBOARD_ACCOUNT_FETCH_FAILURE){
        //     return(
        //         <h4 className="text-center" style={{ marginTop: '65px'}}>No Account Data Found</h4>
        //     );
        // }
        // else if (accounts.user_account === userConstants.DASHBOARD_ACCOUNT_FETCH_SUCCESS){
        //     let userAccounts = accounts.user_account_data.response.Accounts;
        //     return(
        //         <Slider duration="500" infinite="true" emulateTouch="true" onSlideChange={event => this.getAccountHistory(event)}>
        //             {userAccounts.map(function(acct, key){
        //                 return(
        //
        //                     <div className="account-card m-b-50" key={key}>
        //                         <div className="account-name">
        //                             <p>{acct.AccountType} <span>History</span></p>
        //                         </div>
        //                         <div className="account-no-status clearfix">
        //                             <p className="account-no">Acct No: {acct.AccountNumber}</p>
        //                             {acct.AccountStatus==='A' && <p className="account-status">Active</p>}
        //                             {acct.AccountStatus==='PD' && <p className="account-status">Pending</p>}
        //                             {acct.AccountStatus==='P' && <p className="account-status">Restricted</p>}
        //                         </div>
        //
        //                         <div className="account-balance clearfix">
        //                             <p className="balance">₦{utils.formatAmount(acct.AvailableBalance)}</p>
        //                             <a href="#" className="btn-alat btn-white m-t-10 btn-sm">Fund Account</a>
        //                         </div>
        //                     </div>
        //                 );
        //             })}
        //         </Slider>
        //     );
        // }
    }

    renderHistory(){
        let props = this.props;
        let accountsHistory = props.accounts_history;
        console.error(accountsHistory);
        if(accountsHistory.account_history === userConstants.DASHBOARD_ACCOUNT_FETCH_HISTORY_PENDING){
            return  <h4 className="text-center" style={{ marginTop: '65px'}}>Loading account history...</h4>;
        }
        else if(accountsHistory.account_history === userConstants.DASHBOARD_ACCOUNT_FETCH_HISTORY_FAILURE){
            return(
                <h4 className="text-center" style={{ marginTop: '65px'}}>{ accountsHistory.account_history_data }</h4>
            );
        }
        else if (accountsHistory.account_history === userConstants.DASHBOARD_ACCOUNT_FETCH_HISTORY_SUCCESS){
            let transHistory = accountsHistory.account_history_data.response;
            // console.log("We are here now o");
            return(
                <Fragment>
                    {transHistory.map((hist, key)=> (
                        hist.Transactions.map((trans, k)=>(
                            <div className="history-ctn" key={k}>
                                <div className="history-list clearfix">
                                    {/* <img src={this.renderHistoryImage()}/> */}
                                    {this.renderHistoryImage(trans)}
                                    <p className="desc">{trans.Narration}<span className="date">{trans.TransactionDate}</span>
                                    </p>
                                    <p className={trans.TransactionType ='D' ? "balance debit" : "balance credit"}>₦{utils.formatAmount(trans.Amount)}</p> 
                                </div>
                            </div>
                        ))
                    ))}
                </Fragment>
            );
        }
        //console.error(props);
    }
    
    renderHistoryImage(Transaction){
        switch(Transaction.TransactionType){
         case "D" :
         if (Transaction.Narration.indexOf('ATM WD') >= 0) { 
            return (<img src={hsatm}/>);
        } else return (<img src={hstransfer}/>);

        break;
        default :
        return  (<img src={hspos}/>)
        }
    }

    render(){
        const resp = this.props;
        const user = JSON.parse(localStorage.getItem("user"));
        // this.getAccountHistory(0);
        // console.log(JSON.parse(localStorage.getItem("user")));
        return (
            <Fragment>
                <InnerContainer>
                <div className="dashboard-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="welcome-name">Welcome back, <span>{user.fullName}</span></p>
                            </div>

                            <div className="col-sm-12">
                                <div className="row">

                                    <div className="col-sm-12 col-md-6">
                                        <div className="al-card no-pad acct-card-pad acct-match">
                                            <div className="account-slide">
                                                <h4>My Accounts <span>
                                                <NavLink to="/accounts/accounts-history">
                                                    {/* View All */}
                                                </NavLink>
                                                </span></h4>
                                            </div>
                                            {this.renderAccounts()}
                                        </div>
                                    </div>

                                    <UserGoals />
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12 col-md-8">
                                        <OnboardingPriority/>

                                        <div className="al-card transact-history">
                                            <h4 className="m-b-20">Transaction History <span>
                                                <NavLink to="/accounts/accounts-history">
                                                    View All
                                                </NavLink>
                                            </span></h4>

                                            <div className="history-table clearfix">
                                                { this.renderHistory() }
                                                {/*<div className="history-ctn">*/}
                                                    {/*<div className="history-list clearfix">*/}
                                                        {/*<img src={hstransfer} />*/}
                                                            {/*<p className="desc">Funded Apple Virtual Card with USD 200*/}
                                                                {/*for NGN 80,000<span className="date">Feb 9, 2017</span>*/}
                                                            {/*</p>*/}
                                                            {/*<p className="balance credit">USD 200</p>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}

                                                {/*<div className="history-ctn">*/}
                                                    {/*<div className="history-list clearfix">*/}
                                                        {/*<img src={hsatm} />*/}
                                                            {/*<p className="desc">Funded Apple Virtual Card with USD 200*/}
                                                                {/*for NGN 80,000<span className="date">Feb 9, 2017</span>*/}
                                                            {/*</p>*/}
                                                            {/*<p className="balance debit">USD 200</p>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}

                                                {/*<div className="history-ctn">*/}
                                                    {/*<div className="history-list clearfix">*/}
                                                        {/*<img src={hspos} />*/}
                                                            {/*<p className="desc">Funded Apple Virtual Card with USD 200*/}
                                                                {/*for NGN 80,000<span className="date">Feb 9, 2017</span>*/}
                                                            {/*</p>*/}
                                                            {/*<p className="balance credit">USD 200</p>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}

                                                {/*<div className="history-ctn">*/}
                                                    {/*<div className="history-list clearfix">*/}
                                                        {/*<img src={hsfund} />*/}
                                                            {/*<p className="desc">Funded Apple Virtual Card with USD 200*/}
                                                                {/*for NGN 80,000<span className="date">Feb 9, 2017</span>*/}
                                                            {/*</p>*/}
                                                            {/*<p className="balance credit">USD 200</p>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}

                                                {/*<div className="history-ctn">*/}
                                                    {/*<div className="history-list clearfix">*/}
                                                        {/*<img src={hstransfer} />*/}
                                                            {/*<p className="desc">Funded Apple Virtual Card with USD 200*/}
                                                                {/*for NGN 80,000<span className="date">Feb 9, 2017</span>*/}
                                                            {/*</p>*/}
                                                            {/*<p className="balance credit">USD 200</p>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <div className="al-card">
                                            <div className="reminder-card">
                                                <div className="text-center">
                                                    <img src={calendar} />
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
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        accounts: state.dashboard_accounts,
        accounts_history: state.dashboard_accounts_history,
        OnboardingPriority: state.dashboard_userOnboardingPriority
    };
}

export default connect(mapStateToProps)(Dashboard);