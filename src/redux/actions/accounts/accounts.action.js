import * as actionTypes from '../../constants/accounts/accounts.constants';

import {alertActions} from "../alert.actions";
import {handleError, modelStateErrorHandler} from './../../../shared/utils';
import {SystemConstant} from "../../../shared/constants";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";



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

export const isFetchingHistory = () => {
    return {
        type: actionTypes.IS_FETCHING_HISTORY
    }
}

export const clearCurrentHistory = () => {
    return {
        type: actionTypes.CLEAR_CURRENT_HISTORY
    }
}

export const isSendingReceipt = () => {
    return {
        type: actionTypes.IS_SENDING_RECEIPT
    }
}

export const sendReceiptSuccess = () => {
    return {
        type: actionTypes.SEND_RECEIPT_SUCCESS
    }
}

export const setReceivedTransactions = (number) => {
    return {
        type: actionTypes.SET_RECEIVED_TRANSACTIONS,
        count: number
    }
}

export const sendStatementSuccess = () => {
    return {
        type: actionTypes.SEND_STATEMENT_SUCCESS
    }
}

export const fetchAccountHistory = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GETACCOUNTHISTORY, "POST", data, SystemConstant.HEADER);
        dispatch(isFetchingHistory());
        return consume
            .then(response => {
                let responseCount = 0
                if(response.data.length){
                    for(var data of response.data){
                        for(var transaction of data.Transactions){
                            responseCount++;
                        }
                    }
                }
                dispatch(setReceivedTransactions(responseCount));
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };
    function success(data) { 
        return { 
            type: actionTypes.FETCHING_HISTORY_SUCCESS, 
            data: data
        } 
    }
};

export const fetchReceiptEnableTransaction = (token, payload, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_RECEIPT_TRANSACTIONS(payload.accountNumber, payload.take, payload.skip, payload.startDate, payload.endDate), "POST", data, SystemConstant.HEADER);
        //dispatch(isFetchingHistory());
        return consume
            .then(response => {
                // dispatch(success(response.data));
                console.log("the receipt thing",response.data);
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) { 
        return { 
            type: actionTypes.FETCHING_HISTORY_SUCCESS, 
            data: data
        } 
    }
};

export const sendTransactionReceipt = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_RECEIPT_TRANSACTIONS(), "POST", data, SystemConstant.HEADER);
        dispatch(isFetchingHistory());
        return consume
            .then(response => {
                // dispatch(success(response.data));
                console.log("the receipt thing",response.data);
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) { 
        return { 
            type: actionTypes.FETCHING_HISTORY_SUCCESS, 
            data: data
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
                dispatch(alertActions.success(modelStateErrorHandler({message : "Your request has been sent successfully"})));
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