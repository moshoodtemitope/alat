import * as actionTypes from '../../constants/account-settings/settings.constants';

import { alertActions } from "../alert.actions";
import { handleError, modelStateErrorHandler } from './../../../shared/utils';
import { SystemConstant } from "../../../shared/constants";
import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";



export const isFetchingTrue = () => {
    return {
        type: actionTypes.IS_FETCHING_TRUE
    }
}

export const isFetchingFalse = () => {
    return {
        type: actionTypes.IS_FETCHING_FALSE
    }
}

export const resetPageState = () => {
    return {
        type: actionTypes.RESET_PAGE_STATE,
    };
};

export const changePassword = (token, payload) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CHANGE_PASSWORD, "POST", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
               console.log(response.data);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) {
        return {
            type: actionTypes.CHANGE_PIN_SUCCESS,
            data: data
        }
    }
};

export const getSecurityQuestion = (token, payload) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_RANDOM_SECURITY_QUESTION, "GET", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
               console.log(response.data);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) {
        return {
            type: actionTypes.GET_QUESTION_SUCCESS,
            data: data
        }
    }
};

