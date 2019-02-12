import * as React from "react";
import { Provider, connect } from "react-redux";
import {history} from "../_helpers";
import {Router} from "react-router";
import InnerContainer from "../shared/templates/inner-container";
import * as utils from "../shared/utils";
import {ApiService} from "../shared/apiService";
import {routes} from "../shared/urls";
import {userActions} from "../_actions";
import {getAccounts} from "./actions";
import {userConstants} from "../_constants";
import $ from 'jquery';
import Slider from 'react-animated-slider';

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


    renderElement(accounts){
        if(accounts.pending)
            return  <h4>Loading accounts...</h4>;
        else if(accounts.success){
            let useraccounts = accounts.data.response.Accounts;
            console.log(useraccounts);
            return(
                <div className="bxslider">

                    {useraccounts.map(function(acct, key){
                        return(
                            <div key={key}>
                                <div className="account-card m-b-50">
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
                            </div>
                        );
                    })}
                </div>
            );
        }

        return <button onClick={this.fetchAccounts.bind(this)}>Retry</button>;
    }

    renderAccounts(){
        let user = this.state.user;
        let accounts = user.accounts;
        console.log(accounts.length);
        if(accounts.length === 0){
            return(
                <h4 className="text-center" style={{ marginTop: '65px'}}>No Account Data Found</h4>
            );
        }

        return(
            <Slider duration="500" infinite="true">
            {/*<div className="bxslider">*/}
                {accounts.map(function(acct, key){
                    return(

                            <div className="account-card m-b-50" key={key}>
                                <div className="account-name">
                                    <p>{acct.accountType} <span>History</span></p>
                                </div>
                                <div className="account-no-status clearfix">
                                    <p className="account-no">Acct No: {acct.accountNumber}</p>
                                    {acct.accountStatus==='A' && <p className="account-status">Active</p>}
                                    {acct.accountStatus==='PD' && <p className="account-status">Pending</p>}
                                    {acct.accountStatus==='P' && <p className="account-status">Restricted</p>}
                                </div>

                                <div className="account-balance clearfix">
                                    <p className="balance">₦{utils.formatAmount(acct.availableBalance)}</p>
                                    <a href="#" className="btn-alat btn-white m-t-10 btn-sm">Fund Account</a>
                                </div>
                            </div>
                    );

                    // return(
                    //     <div key={key}>
                    //         <div className="account-card m-b-50">
                    //             <div className="account-name">
                    //                 <p>{acct.accountType} <span>History</span></p>
                    //             </div>
                    //             <div className="account-no-status clearfix">
                    //                 <p className="account-no">Acct No: {acct.accountNumber}</p>
                    //                 {acct.accountStatus==='A' && <p className="account-status">Active</p>}
                    //                 {acct.accountStatus==='PD' && <p className="account-status">Pending</p>}
                    //                 {acct.accountStatus==='P' && <p className="account-status">Restricted</p>}
                    //             </div>
                    //
                    //             <div className="account-balance clearfix">
                    //                 <p className="balance">₦{utils.formatAmount(acct.availableBalance)}</p>
                    //                 <a href="#" className="btn-alat btn-white m-t-10 btn-sm">Fund Account</a>
                    //             </div>
                    //         </div>
                    //     </div>
                    // );
                })}
            {/*</div>*/}
            </Slider>
        );
    }


    render(){
        const { accounts } = this.props;

        return (
            <Router history={history}>

                <div className="col-sm-12 col-md-6">
                    <div className="al-card no-pad acct-card-pad acct-match">
                        <div className="account-slide">
                            <h4>My Accounts <span><a href="#">View All</a></span></h4>
                        </div>
                        {this.renderAccounts()}
                        {/*{this.renderAccounts()}*/}

                        {/*{accounts.data.type === userConstants.SUCCESS &&*/}
                        {/*<div className="bxslider">*/}
                            {/*{accounts.map(function(acct, key){*/}
                            {/*return(*/}
                            {/*<div key={key}>*/}
                            {/*<div className="account-card m-b-50">*/}
                            {/*<div className="account-name">*/}
                            {/*<p>{acct.accountType} <span>History</span></p>*/}
                            {/*</div>*/}
                            {/*<div className="account-no-status clearfix">*/}
                            {/*<p className="account-no">Acct No: {acct.accountNumber}</p>*/}
                            {/*{acct.accountStatus==='A' && <p className="account-status">Active</p>}*/}
                            {/*{acct.accountStatus==='PD' && <p className="account-status">Pending</p>}*/}
                            {/*{acct.accountStatus==='P' && <p className="account-status">Restricted</p>}*/}
                            {/*</div>*/}

                            {/*<div className="account-balance clearfix">*/}
                            {/*<p className="balance">₦{utils.formatAmount(acct.availableBalance)}</p>*/}
                            {/*<a href="#" className="btn-alat btn-white m-t-10 btn-sm">Fund Account</a>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*);*/}
                            {/*})}*/}
                        {/*</div>*/}
                        {/*}*/}
                    </div>
                </div>
            </Router>

        );
    }
}

function mapStateToProps(state){
    return {
        accounts: state.accounts
    };
};


export default connect(mapStateToProps)(UserAccounts);