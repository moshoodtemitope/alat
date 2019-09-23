import * as actionTypes from '../../constants/accounts/accounts.constants';

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

export const setReceivedTransactions = (number) => {
    return {
        type: actionTypes.SET_RECEIVED_TRANSACTIONS,
        count: number
    }
}

export const setReceivedTransactionsAlt = (number) => {
    return {
        type: actionTypes.SET_RECEIVED_TRANSACTIONS_ALT,
        count: number
    }
}

export const setFilteredTransaction = (number) => {
    return {
        type: actionTypes.SET_FILTERED_TRANSACTION,
        count: number
    }
}

export const sendStatementSuccess = () => {
    return {
        type: actionTypes.SEND_STATEMENT_SUCCESS
    }
}

export const setLimitData = (data) => {
    return {
        type: actionTypes.SET_LIMIT_DATA,
        data: data
    }
}

export const clearLimitData = () => {
    return {
        type: actionTypes.CLEAR_LIMIT_DATA,
    }
}



export const resetPageState = () => {
    return {
        type: actionTypes.RESET_PAGE_STATE,
    }
}

export const clearResponse = (status) => {
    return {
        type: actionTypes.CLEAR_RESPONSE,
        status: status
    };
};

export const fetchAccountHistory = (token, data, type = "All") => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GETACCOUNTHISTORY, "POST", data, SystemConstant.HEADER);
        dispatch(isFetchingHistory());
        return consume
            .then(response => {
                let responseCount = 0
                if (response.data.length) {
                    for (var data of response.data) {
                        for (var transaction of data.Transactions) {
                            responseCount++;
                        }
                    }
                }
                
                if (type == "All") {
                    dispatch(setReceivedTransactions(responseCount));
                    dispatch(success(response.data));
                } else {
                    let responseData;
                    let newDataArray = [];
                    let count = 0;
                    for (var data of response.data) {
                        if (type == "Debits") {
                            
                            responseData = data.Transactions.filter(transaction => transaction.TransactionType == "D");
                            // console.log("in Debits", responseData)
                        }else{
                            
                            responseData = data.Transactions.filter(transaction => transaction.TransactionType == "C");
                            // console.log("in Credits", responseData)
                        }
                        newDataArray = [...newDataArray, ...responseData];
                    }
                    dispatch(success(newDataArray));
                    dispatch(setReceivedTransactionsAlt(responseCount));
                    dispatch(setFilteredTransaction(newDataArray.length));
                }
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
        let consume = ApiService.request(routes.GET_RECEIPT_TRANSACTIONS(payload.accountNumber, payload.take, payload.skip, payload.startDate, payload.endDate), "GET", data, SystemConstant.HEADER);
        dispatch(isFetchingHistory());
        return consume
            .then(response => {
                let responseCount = 0
                if (response.data.length) {
                    for (var data of response.data) {
                        for (var transaction of data.Transactions) {
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
            type: actionTypes.FETCHING_RECEIPT_HISTORY_SUCCESS,
            data: data
        }
    }
};


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

export const getTransactionLimit = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_TRANSACTION_LIMIT, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(failed({ LimitToCompare: "--Limit not retreived" }));
            });
    };

    function success(data) {
        return {
            type: actionTypes.GET_LIMIT_SUCCESS,
            data: data
        }
    }

    function failed(data) {
        return {
            type: actionTypes.GET_LIMIT_FAILED,
            data: data
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

export const getOtpForCustomer = (token, data, isResending = false) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.GET_OTP_FOR_CUSTOMER, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                dispatch(isFetchingFalse());
                console.log(response.data);
                console.log("response.data");
                if (isResending == false) {
                    dispatch(success(response.data));
                }
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };
    function success(response) {
        return {
            type: actionTypes.SUCCESS_NEXT_PAGE,
            data: response
        }
    }
};