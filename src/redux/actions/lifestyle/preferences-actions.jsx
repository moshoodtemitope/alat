import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {listStyleConstants} from "../../constants/lifestyle/lifestyle-constants";
import {SystemConstant} from "../../../shared/constants";
import {alertActions} from "../alert.actions";
import {modelStateErrorHandler} from "../../../shared/utils";

export const getAllEngagements = (token,data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_PREFENCE, "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type:listStyleConstants.PREFERENCES_PENDING, request} }
    function success(response) { return {type:listStyleConstants.PREFERENCES_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.PREFERENCES_ERROR, error} }
};

export const getCustomersEngagements = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_CUSTOMER_ENGAGEMENTS, "GET", null, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type:listStyleConstants.GET_CUSTOMER_ENGAGEMENT_PENDING, request} }
    function success(response) { return {type:listStyleConstants.GET_CUSTOMER_ENGAGEMENT_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.GET_CUSTOMER_ENGAGEMENT_FAILURE, error} }
};



























