import * as actionTypes from '../../constants/cardless-withdrawal/cardless.constants';

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

export const fetchAllUnexpiredPaycodes = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.FETCH_UNEXPIRED_PAYCODES, "POST", data, SystemConstant.HEADER);
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
        type : actionTypes.FETCH_ALL_UNEXPIRED_PAYCODES_SUCCESS,
        data: response
     } }
};

export const setCardlessWithdrawalInfo = (data) => {
    return{
        type : actionTypes.SET_CARDLESS_WITHDRAWAL_INFO,
        data : data
    }
}