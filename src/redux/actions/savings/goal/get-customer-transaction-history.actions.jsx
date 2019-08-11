import {SystemConstant} from "../../../../shared/constants";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";
import {customerGoalConstants} from '../../../constants/goal/get-customer-trans-history.constant'
import {modelStateErrorHandler} from "../../../../shared/utils";
import {alertActions} from "../../alert.actions";

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