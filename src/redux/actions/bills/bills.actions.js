import * as actionTypes from '../../constants/bills/bills.constant';

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

export const isFetchingBillerItems = () => {
    return {
        type: actionTypes.IS_FETCHING_BILLER_ITEM
    }
}

export const fetchBillBeneficiaries = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.FETCH_BILLS_BENEFICIARIES, "POST", data, SystemConstant.HEADER);
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

    // function request(request) { return { 
        
    //  } }
    function success(response) { return { 
        type : actionTypes.FETCH_BILLS_BENEFICIARY_SUCCESS,
        data: response
     } }
};

export const fetchBillersCategory = (token, data) => {
    console.log("fetch biller category 1st")
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.FETCH_BILLERS_CATEGORY, "POST", data, SystemConstant.HEADER);
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

    function success(response) { return { 
        type : actionTypes.FETCH_BILLERS_CATEGORY_SUCCESS,
        data: response
     } }
};

export const fetchBillerItems = (token, data) => {
    console.log("fetch biller category 1st")
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingBillerItems());
        let consume = ApiService.request(routes.FETCH_BILLER_ITEM, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                dispatch(isFetchingBillerItems());
                console.log(response.data);
                console.log("response.data");
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(isFetchingBillerItems());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(response) { 
        var itemsArray = [];
        response.map(item => itemsArray.push({value: item.PaymentItem, label: item.PaymentItem, amount: item.Amount, paymentCode: item.BillerPaymentCode, ref : item.ReferenceDetails, charge: item.Charge, hasAmount: item.Amount > 0}));
        return { 
        type : actionTypes.FETCH_BILLER_ITEMS_SUCCESS,
        // data: response,
        items: itemsArray,
     } }

};

export const setBillInfo = (billInfo, otpData) => {
    return {
        type: actionTypes.SET_BILL_TO_PAY_INFO,
        data: billInfo,
        otpPayload: otpData
    }
};

export const getSubscriberNameEnquiry = (token, data) => {
    console.log("fetch biller category 1st")
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.GET_SUBSCRIBER_NAME, "POST", data, SystemConstant.HEADER);
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

    function success(response) { return { 
        type : actionTypes.VALID_SUBSCRIBER_NAME,
        data: response
     } }
};

export const resetBillPage= (code) => {
    return{
        type: actionTypes.RESET_PAGE_STATE_BILL,
        code: code,
    }
}

export const clearBillsInfo = () => {
    return {
        type: actionTypes.CLEAR_ALL_BILLS_DATA,
    }
}

export const fetchOtpForCustomer = (token, data, isResending = false) => {
    console.log("fetch biller category 1st")
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.PIN_VERIFICATION, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(isFetchingFalse());
                if(response.data.Response == 0){
                    if(isResending == false) dispatch(success());
                }else{
                    dispatch(alertActions.error(modelStateErrorHandler(response.data.ValidationMsg)));
                }
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() { return { 
        type : actionTypes.FETCH_OTP_SUCCESS,
     } }
};

export const verifyOtpForCustomer = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.DATA_OTP_VERIFICATION, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(isFetchingFalse());
                if(response.data.Response == 0){
                    dispatch(success());
                }else{
                    dispatch(alertActions.error(modelStateErrorHandler(response.data.ValidationMsg)));
                }
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() { return { 
        type : actionTypes.VERIFY_OTP_SUCCESS,
     } }
};

export const saveBillsBeneficiary = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.SAVE_BILLS_BENEFICIARY, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(isFetchingFalse());
                if(response.data.Response == 0){
                    dispatch(success());
                }else{
                    dispatch(alertActions.error(modelStateErrorHandler(response.data.Description)));
                }
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() { return { 
        type : actionTypes.SAVE_BILL_BENEFICIARY_SUCCESS,
     } }
};

export const goToDashboard = () => {
    return {
        type: actionTypes.GO_TO_DASHBOARD_BILL
    }
}

export const deleteBillsBeneficiary = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.DELETE_DATA_BENEFICIARY, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(isFetchingFalse());
                if(response.data.Response == 0){
                    dispatch(fetchBillBeneficiaries(token));
                }else{
                    dispatch(alertActions.error(modelStateErrorHandler(response.data.Description)));
                }
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                console.log(error);
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };
};

