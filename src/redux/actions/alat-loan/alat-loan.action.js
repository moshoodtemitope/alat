import * as actionTypes from '../../constants/alat-loan/alat-loan.constant';

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

export const setLoanDetail = (data) => {
    return {
        type: actionTypes.SET_LOAN_DETAIL,
        data: data,
    }
}

export const resetPageState = (code) => {
    return {
        type: actionTypes.RESET_PAGE_STATE,
        code: code
    }
}

export const resetJourney = () => {
    return {
        type: actionTypes.RESET_JOURNEY,
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

export const liquidateLoan = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.LIQUIDATE_LOAN, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(success(response.data));
            })
            .catch(error => {

                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() {
        return {
            type: actionTypes.LOAN_REPAID_SUCCESS,
        }
    }
};

export const liquidateAlatLoan = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.LIQUIDATE_ALAT_LOAN, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(success(response.data));
            })
            .catch(error => {

                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() {
        return {
            type: actionTypes.LOAN_REPAID_SUCCESS,
        }
    }
};

export const getLoanState = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.GET_LOAN_STATE, "GET", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(success(response.data));
            })
            .catch(error => {

                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) {
        return {
            type: actionTypes.GET_LOAN_STATE_SUCCESS,
            data: data
        }
    }
};

export const getLoanOffers = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.GET_LOAN_OFFERS, "GET", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(success(response.data));
            })
            .catch(error => {

                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) {
        return {
            type: actionTypes.GET_LOAN_OFFERS_SUCCESS,
            data: data
        }
    }
};

export const sendLoan = (token, data, isResending = false) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.SEND_ACCEPT_LOAN, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                if(!isResending) dispatch(setLoanDetail(data))
                dispatch(success());
            })
            .catch(error => {

                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() {
        return {
            type: actionTypes.SEND_LOAN_FOR_OTP_SUCCESS,
        }
    }
};

export const sendLoanWithOtp = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.SEND_ACCEPT_LOAN_WITH_OTP, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                dispatch(success());
            })
            .catch(error => {

                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() {
        return {
            type: actionTypes.SEND_LOAN_WITH_OTP_SUCCESS,
        }
    }
};