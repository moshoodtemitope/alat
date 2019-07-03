import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {fundAccountConstants} from "../../constants/fund-account/fund-account.constant";
import {SystemConstant} from "../../../shared/constants";
import { modelStateErrorHandler } from "../../../shared/utils";
import { alertActions } from "../alert.actions";
import * as utils from "../../../shared/utils";

export const fundAlatWemaAccount =(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.WEMA_TO_ALAT_TRANSFER_WITHOUT_OTP,
             "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, request));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.FUND_ALAT_WEMA_PENDING, request } }
    function success(response, request) { return { type: fundAccountConstants.FUND_ALAT_WEMA_SUCCESS, response : response, data: request } }
    function failure(error) { return { type: fundAccountConstants.FUND_ALAT_WEMA_FAILURE, error } }
}

export const getTokenizedCards =(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_TOKENIZED_CARDS,
             "GET", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, request));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.GET_TOKENIZED_CARDS_PENDING, request } }
    function success(response, request) { return { type: fundAccountConstants.GET_TOKENIZED_CARDS_FAILURE, response : response, data: request } }
    function failure(error) { return { type: fundAccountConstants.GET_TOKENIZED_CARDS_SUCCESS, error } }
}