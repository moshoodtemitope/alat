import * as React from "react";
import { Provider, connect } from "react-redux";
import {history} from "../_helpers";
import {Router} from "react-router";
import InnerContainer from "../shared/templates/inner-container";
import * as utils from "../shared/utils";
import {ApiService} from "../shared/apiService";
import {routes} from "../shared/urls";
import {SystemConstant} from "../shared/constants";
import {userActions} from "../_actions";
import {getAccounts} from "./actions";


const user = JSON.parse(localStorage.getItem("user"));

class UserAccounts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userAccounts: []
        };

        // console.log(user);
        // SystemConstant.HEADER['alat-token'] = user.token;
        // this.fetchAccounts();
        this.fetchAccounts = this.fetchAccounts.bind(this);


    }

    fetchAccounts(){
        const { dispatch } = this.props;
        dispatch(getAccounts());
        // let consume = ApiService.request(routes.CUSTOMERACCOUNTS_ACCOUNT_MAINTANANCE, "POST", {'IsRegistration': false}, SystemConstant.HEADER);
        // console.log(SystemConstant.HEADER);
        // return consume.then(function (response){
        //     console.log(response.data.Accounts);
        //     this.setState({ userAccounts: response.data.Accounts });
        //     console.log(this.state.userAccounts);
        // }).catch(err => {
        //     // console.log(err.response.data.message);
        //     console.log(err);
        // });
    };

    // fetchAccounts(){
    //     let consume = ApiService.request(routes.CUSTOMERACCOUNTS_ACCOUNT_MAINTANANCE, "POST", {'IsRegistration': false}, SystemConstant.HEADER);
    //     console.log(SystemConstant.HEADER);
    //     return consume.then(function (response){
    //         console.log(response);
    //         this.setState({ userAccounts: response.data.Accounts });
    //         console.log(this.state.userAccounts);
    //     }).catch(err => {
    //         // console.log(err.response.data.message);
    //         console.log(err);
    //     });
    // }


    render(){
        // this.fetchAccounts.bind(this);
        // const { userAccounts } = this.state;
        // console.log(this.state.userAccounts);
        const { accounts } = this.state;
        const { pending } = this.props;
        console.log(this.props);
        console.log(accounts);

        return (
            <Router history={history}>
                <div className="col-sm-12 col-md-6">
                    <div className="al-card no-pad acct-card-pad acct-match">
                        <div className="account-slide">
                            <h4>My Accounts <span><a href="#">View All</a></span></h4>
                        </div>
                        <button onClick={this.fetchAccounts.bind(this)}>Load</button>
                        <div className="bxslider">
                            {user.accounts.map(function(acct, key){
                                return(
                                        <div key={key}>
                                            <div className="account-card m-b-50">
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
                                        </div>
                                    );
                            })}
                        </div>
                    </div>
                </div>
            </Router>

        );
    }
}


function mapStateToProps(state) {
    const { pending } = state.requester;
    return {
        pending
    };
}
//
// const connectedLoginPage = connect(mapStateToProps)(Login);
// export { connectedLoginPage as Login };
//

// export default connect()(UserAccounts);

export default connect(mapStateToProps)(UserAccounts);



