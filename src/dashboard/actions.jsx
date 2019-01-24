import {ApiService} from "../shared/apiService";
import {routes} from "../shared/urls";
import {SystemConstant} from "../shared/constants";
import {userConstants} from "../_constants";

const user = JSON.parse(localStorage.getItem("user"));

export function getAccounts(){
    SystemConstant.HEADER['alat-token'] = user.token;

    return dispatch => {
        let consume = ApiService.request(routes.CUSTOMERACCOUNTS_ACCOUNT_MAINTANANCE, "POST", {'IsRegistration': false}, SystemConstant.HEADER);
        dispatch(request({user}));
        return consume.then(function (response) {
            console.log(response.data.Accounts);
            // this.setState({userAccounts: response.data.Accounts});
            dispatch(success(response.data));

        }).catch(err => {
            // console.log(err.response.data.message);
            console.log(err);
            dispatch(failure(err.response.toString()));
        });
    };

    function request(user) { return { type: userConstants.PENDING, user } }
    function success(accounts) { return { type: userConstants.SUCCESS, accounts } }
    function failure(error) { return { type: userConstants.FAILURE, error } }
}