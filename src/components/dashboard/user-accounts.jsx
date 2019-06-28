import * as React from "react";
import { connect } from "react-redux";
import $ from 'jquery';
import Slider from 'react-animated-slider';
import {NavLink, Link} from "react-router-dom";
import {Fragment} from "react";
import {getAccountHistory, getAccounts} from "../../redux/actions/dashboard/dashboard.actions";
import {dashboardConstants as userConstants} from "../../redux/constants/dashboard/dashboard.constants";
import * as utils from "../../shared/utils";

class UserAccounts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    fetchAccounts(){
        const { dispatch } = this.props;
        // console.log(this.props);
        console.log(this.state.user.token);
        dispatch(getAccounts(this.state.user.token));
    };

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
                <h4 className="text-center" style={{ marginTop: '65px'}}>No Account Data Found</h4>
            );
        }
        else if (accounts.user_account === userConstants.DASHBOARD_ACCOUNT_FETCH_SUCCESS){
            let userAccounts = accounts.user_account_data.response.Accounts;
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
                                    {acct.IsDebitable && <NavLink to={"/fund"} className="btn-alat btn-white m-t-10 btn-sm">Fund </NavLink>}
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            );P
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
    }

    render(){
        const { accounts } = this.props;

        return (
            <Fragment>

                <div className="col-sm-12 col-md-6">
                    <div className="al-card no-pad acct-card-pad acct-match">
                        <div className="account-slide">
                            <h4>My Accounts <span>
                                <NavLink to="/accounts/accounts-history">
                                    View All
                                </NavLink>
                                </span></h4>
                        </div>
                        {this.renderAccounts()}
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state){
    return {
        accounts: state.dashboard_accounts
    };
}


export default connect(mapStateToProps)(UserAccounts);