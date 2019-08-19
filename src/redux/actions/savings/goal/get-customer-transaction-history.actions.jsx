import {SystemConstant} from "../../../../shared/constants";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";
import {customerGoalConstants} from '../../../constants/goal/get-customer-trans-history.constant'
import {modelStateErrorHandler} from "../../../../shared/utils";
import {alertActions} from "../../alert.actions";
import {history} from "../../../../_helpers/history";
import {GROUPSAVINGSCONSTANT} from "../../../constants/savings/group";

export const getCustomerGoalTransHistory = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CUSTOMERGOALS, "GET", data, null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.error(response);
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type:customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_PENDING, request} }
    function success(response) { return {type:customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_SUCCESS, response} }
    function failure(error) { return {type:customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_FAILURE, error} }
};
export const GoalFormula = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GOAL_FORMULAR, "GET", data, null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.error(response);
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type:customerGoalConstants.GET_GOAL_FORMULAR_PENDING, request} }
    function success(response) { return {type:customerGoalConstants.GET_GOAL_FORMULAR_SUCCESS, response} }
    function failure(error) { return {type:customerGoalConstants.GET_GOAL_FORMULAR_FAILURE, error} }
};
export const GoalType = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GOALTYPE, "GET", data, null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.error(response);
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type:customerGoalConstants.GET_GOAL_TYPE_PENDING, request} }
    function success(response) { return {type:customerGoalConstants.GET_GOAL_TYPE_SUCCESS, response} }
    function failure(error) { return {type:customerGoalConstants.GET_GOAL_TYPE_FAILURE, error} }
};
export const TopUPGoalStep1 = (data) =>{
    return(dispatch)=>{
        dispatch(success(data))
    };
    function success(data){
        return{
            type:customerGoalConstants.TOP_UP_GOAL_SUCCESS_STEP1,
            data:data
        }
    }
};
// add ToUpGoal
export const TopUPGoal =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.TOPUPGOAL,
            "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
                history.push({
                    pathname:"/savings/top-up-goal-success",
                    state:{details:response.data}
                });
            })
            .catch(error => {
                // console.log("error in here");
                // dispatch(success(response.data, request));
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type:customerGoalConstants.TOP_UP_GOAL_PENDING,  request } }
    function success(response, request) { return { type: customerGoalConstants.TOP_UP_GOAL_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: customerGoalConstants.TOP_UP_GOAL_FAILURE, error } }
};
export const WithDrawFromGoalStep1 = (data) =>{
    return(dispatch)=>{
        dispatch(success(data))
    };
    function success(data){
        return{
            type:customerGoalConstants.WITHDRAW_FROM_GOAL_SUCCESS_STEP1,
            data:data
        }
    }
};
export const WithDrawFromGoal =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.WITHDRAWFROMGOAL,
            "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
                // history.push({
                //     pathname:"/savings/top-up-goal-success",
                //     state:{details:response.data}
                // })
            })
            .catch(error => {
                // console.log("error in here");
                // dispatch(success(response.data, request));
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type:customerGoalConstants.WITHDRAW_FROM_GOAL_PENDING,  request } }
    function success(response, request) { return { type: customerGoalConstants.WITH_DRAW_FROM_GOAL_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: customerGoalConstants.WITH_DRAW_FROM_GOAL_FAILURE, error } }
};
export const PauseCustomerGoal =(token,data)=>{
    SystemConstant.HEADER['alat-token'] = token;

    return (dispatch) => {
        SystemConstant.HEADER['alat-token'] = token;
        let consume = ApiService.request(routes.PAUSEGOAL, "POST", data,SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
                // history.push({
                //     pathname:"/savings/top-up-goal-success",
                //     state:{details:response.data}
                // })
            })
            .catch(error => {
                // console.log("error in here");
                // dispatch(success(response.data, request));
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type:customerGoalConstants.PAUSE_CUSTOMER_GOAL_PENDING,  request } }
    function success(response, request) { return { type: customerGoalConstants.PAUSE_CUSTOMER_GOAL_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: customerGoalConstants.PAUSE_CUSTOMER_GOAL_FAILURE, error } }
};
export const unpauseCustomerGoal =(token,data)=>{
    SystemConstant.HEADER['alat-token'] = token;

    return (dispatch) => {
        let consume = ApiService.request(routes.UNPAUSEGOAL, "POST", data,SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
                // history.push({
                //     pathname:"/savings/top-up-goal-success",
                //     state:{details:response.data}
                // })
            })
            .catch(error => {
                // console.log("error in here");
                // dispatch(success(response.data, request));
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type:customerGoalConstants.UNPAUSE_CUSTOMER_GOAL_PENDING,  request } }
    function success(response, request) { return { type: customerGoalConstants.UNPAUSE_CUSTOMER_GOAL_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: customerGoalConstants.UNPAUSE_CUSTOMER_GOAL_FAILURE, error } }
};
export const deleteCustomerGoal =(token,data)=>{
    SystemConstant.HEADER['alat-token'] = token;

    return (dispatch) => {
        let consume = ApiService.request(routes.DELETEGOAL, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
                // history.push({
                //     pathname:"/savings/top-up-goal-success",
                //     state:{details:response.data}
                // })
            })
            .catch(error => {
                // console.log("error in here");
                // dispatch(success(response.data, request));
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type:customerGoalConstants.DELETE_CUSTOMER_GOAL_PENDING,  request } }
    function success(response, request) { return { type: customerGoalConstants.DELETE_CUSTOMER_GOAL_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: customerGoalConstants.DELETE_CUSTOMER_GOAL_FAILURE, error } }
};

export const EditCustomerGoal =(token,data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.EDITGOAL,
            "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
                // history.push({
                //     pathname:"/savings/top-up-goal-success",
                //     state:{details:response.data}
                // })
            })
            .catch(error => {
                // console.log("error in here");
                // dispatch(success(response.data, request));
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type:customerGoalConstants.EDIT_CUSTOMER_GOAL_PENDING,  request } }
    function success(response, request) { return { type: customerGoalConstants.EDIT_CUSTOMER_GOAL_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: customerGoalConstants.EDIT_CUSTOMER_GOAL_FAILURE, error } }
};

// export const EditFlexiCustomerGoal =(data)=>{
//     return (dispatch) => {
//         let consume = ApiService.request(routes.EDITFLEXIGOAL,
//             "POST", data);
//         dispatch(request(consume));
//         return consume
//             .then(response => {
//                 //TODO: edit localDB accounts object
//                 dispatch(success(response.data, data));
//                 // history.push({
//                 //     pathname:"/savings/top-up-goal-success",
//                 //     state:{details:response.data}
//                 // })
//             })
//             .catch(error => {
//                 // console.log("error in here");
//                 // dispatch(success(response.data, request));
//                 dispatch(failure(modelStateErrorHandler(error)));
//                 dispatch(alertActions.error(modelStateErrorHandler(error)));
//                 // throw(error);
//             });
//     };
//
//     function request(request) { return { type:customerGoalConstants.WITHDRAW_FROM_GOAL_PENDING,  request } }
//     function success(response, request) { return { type: customerGoalConstants.WITH_DRAW_FROM_GOAL_SUCCESS, data: { response : response, request: request } }}
//     function failure(error) { return { type: customerGoalConstants.WITH_DRAW_FROM_GOAL_FAILURE, error } }
// };



