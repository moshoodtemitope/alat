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

    function success(response) { return { 
        type : actionTypes.FETCH_BILLER_ITEMS_SUCCESS,
        data: response
     } }
};

export const setBillInfo = (billInfo) => {
    return {
        type: actionTypes.SET_BILL_TO_PAY_INFO,
        data: billInfo
    }
}

