import {ApiService} from "../shared/apiService";
import {routes} from "../shared/urls";
import {SystemConstant} from "../shared/constants";
import {userConstants} from "../_constants";

// const user = JSON.parse(localStorage.getItem("user"));
const user = JSON.parse(localStorage.getItem("user"));
//
// export function getAccounts(){
//     SystemConstant.HEADER['alat-token'] = user.token;
//
//     return dispatch => {
//         let consume = ApiService.request(routes.CUSTOMERACCOUNTS_ACCOUNT_MAINTANANCE, "POST", {'IsRegistration': false}, SystemConstant.HEADER);
//         // dispatch(request({user}));
//         return consume.then(function (response) {
//             console.log(response.data.Accounts);
//             // this.setState({userAccounts: response.data.Accounts});
//             dispatch(success(response.data));
//
//         }).catch(err => {
//             // console.log(err.response.data.message);
//             console.log(err);
//             dispatch(failure(err.response.toString()));
//         });
//     };
//
//     function request(user) { return { type: userConstants.PENDING, user } }
//     function success(accounts) { return { type: userConstants.SUCCESS, accounts } }
//     function failure(error) { return { type: userConstants.FAILURE, error } }
// }


//
// export const fetchPosts = (userAccounts) => {
//     return {
//         type: userConstants.SUCCESS,
//         userAccounts
//     }
// };


export const getAccounts = (token) => {

    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CUSTOMERACCOUNTS_ACCOUNT_MAINTANANCE, "POST", {'IsRegistration': false}, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                console.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(failure(error.response.data.message.toString()));
                // throw(error);
            });
    };

    function request(request) { return { type: userConstants.DASHBOARD_ACCOUNT_FETCH_PENDING, request } }
    function success(response) { return { type: userConstants.DASHBOARD_ACCOUNT_FETCH_SUCCESS, response } }
    function failure(error) { return { type: userConstants.DASHBOARD_ACCOUNT_FETCH_FAILURE, error } }
};


export const getGoalsSummary = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CUSTOMERGOALS, "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return { type: userConstants.DASHBOARD_GOALS_SUMMARY_FETCH_PENDING, request } }
    function success(response) { return { type: userConstants.DASHBOARD_GOALS_SUMMARY_FETCH_SUCCESS, response } }
    function failure(error) { return { type: userConstants.DASHBOARD_GOALS_SUMMARY_FETCH_FAILURE, error } }
};


export const getOnboardingPriority = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.ONBOARDING_PRIORITY, "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                return error.response.data.message.toString();
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return { type:userConstants.DASHBOARD_ONBOARDING_PRIORITY_PENDING, request} }
    function success(response) { return {type:userConstants.DASHBOARD_ONBOARDING_PRIORITY_SUCCESS, response} }
};

export const getAnnouncement = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.ANNOUNCEMENT, "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            })
            .catch(error => {
                return error.response.data.message.toString();
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return { type:userConstants.ANNOUNCEMENT_FETCH_PENDING, request} }
    function success(response) { return {type:userConstants.ANNOUNCEMENT_FETCH_SUCCESS, response} }
};