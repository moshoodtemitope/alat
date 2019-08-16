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


///
export const sendTransactionReceipt = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.SEND_TRANSACTION_RECEIPT, "POST", data, SystemConstant.HEADER);
        dispatch(isSendingReceipt());
        return consume
            .then(response => {
                dispatch(success());
                dispatchClearResponse(2);
                // console.log("the receipt thing",response.data);
            })
            .catch(error => {
                // dispatch(isSendingReceipt());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });

        function dispatchClearResponse(status) {
            setTimeout(() => {
                dispatch(clearResponse(status));
            }, 3000);
        };
    };

    function success() {
        return {
            type: actionTypes.SEND_RECEIPT_SUCCESS,
        }
    }

};

export const sendStatement = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.SEND_STATEMENT, "POST", data, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                dispatch(sendStatementSuccess());
                dispatch(alertActions.success(modelStateErrorHandler({ message: "Your request has been sent successfully" })));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() {
        return {
            type: actionTypes.SEND_STATEMENT_SUCCESS,
        }
    }
};


export const sendTransactionLimit = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.SET_TRANSACTION_LIMIT, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                dispatch(success(response.data));
                dispatchClearLimitInfo();
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });

        function dispatchClearLimitInfo() {
            setTimeout(() => {
                dispatch(clearLimitData());
            }, 5000);
        };
    };

    function success() {
        return {
            type: actionTypes.SEND_TRANSACTION_LIMIT_SUCCESS,
        }
    }
};