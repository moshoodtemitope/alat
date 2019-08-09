import {SystemConstant} from "../../../../shared/constants";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";
import {customerGoalConstants} from '../../../constants/goal/get-customer-trans-history.constant'
import {modelStateErrorHandler} from "../../../../shared/utils";
import {alertActions} from "../../alert.actions";

export const getCustomerGoalTransHistory = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CUSTOMERGOALS, "POST", data, null, SystemConstant.HEADER);
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

    function request(request) { return { type:customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_History_PENDING, request} }
    function success(response) { return {type:customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_SUCCESS, response} }
    function failure(error) { return {type:customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_History_FAILURE, error} }
};
