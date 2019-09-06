import * as actionTypes from '../../constants/alat-loan/alat-token.constant';

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

export const isFetchingLoanTrue = () => {
    return {
        type: actionTypes.IS_FETCHING_LOAN_TRUE
    }
}

export const isFetchingLoanFalse = () => {
    return {
        type: actionTypes.IS_FETCHING_LOAN_FALSE
    }
}

export const setLoanToLiquidate = (data) => {
    return {
        type: actionTypes.SET_LOAN_TO_LIQUIDATE,
        data: data,
    }
}

export const clearLoanInfo = () => {
    return {
        type: actionTypes.CLEAR_LOAN_INFO,
    }
}

export const GetActiveLoans = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingLoanTrue());
        let consume = ApiService.request(routes.GET_ACTIVE_LOANS, "GET", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(success(response.data));
            })
            .catch(error => {

                dispatch(isFetchingLoanFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(response) {
        return {
            type: actionTypes.FETCH_ACTIVE_LOANS_SUCCESS,
            data: response
        }
    }
};