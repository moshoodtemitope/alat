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
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        // smartech('identify', user.email);
        // smartech('dispatch', 'ALATfund_My_Account_Success', {
        //     "Email": user.email,
        //     "mobile": user.phoneNo
        // });

        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.FUND_ALAT_WEMA_PENDING, request } }
    function success(response, data) { return { type: fundAccountConstants.FUND_ALAT_WEMA_SUCCESS, response : response, data } }
    function failure(error) { return { type: fundAccountConstants.FUND_ALAT_WEMA_FAILURE, error } }
};

export const saveCardAfterTransaction =(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request("",
             "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        // smartech('identify', user.email);
        // smartech('dispatch', 'ALATFund_My_Account_View ', {
        //     "Email": user.email,
        //     "mobile": user.phoneNo
        // });

        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.SAVEAFTER_TRANSACTION_PENDING, request } }
    function success(response) { return { type: fundAccountConstants.SAVEAFTER_TRANSACTION_SUCCESS, response  } }
    function failure(error) { return { type: fundAccountConstants.SAVEAFTER_TRANSACTION_FAILURE, error } }
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
                dispatch(success(response.data));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.GET_TOKENIZED_CARDS_PENDING, request } }
    function success(response) { return { type: fundAccountConstants.GET_TOKENIZED_CARDS_SUCCESS, response  } }
    function failure(error) { return { type: fundAccountConstants.GET_TOKENIZED_CARDS_FAILURE, error } }
}

export const saveCard =(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => { 
        let consume = ApiService.request(routes.SAVE_CARD,
             "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        // smartech('identify', user.email);
        // smartech('dispatch', 'ALATFund_My_Account_Initiate', {
        //     "Email": user.email,
        //     "mobile": user.phoneNo
        // });

        return consume
            .then(response => {
                dispatch(success(response.data));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.SAVE_CARD_PENDING, request } }
    function success(response) { return { type: fundAccountConstants.SAVE_CARD_SUCCESS, response  } }
    function failure(error) { return { type: fundAccountConstants.SAVE_CARD_FAILURE, error } }
}

export const fundCardDetails =(data)=>{
    return (dispatch) => { 
       dispatch(success(data));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        // smartech('identify', user.email);
        // smartech('dispatch', 'ALATFund_My_Account_View ', {
        //     "Email": user.email,
        //     "mobile": user.phoneNo
        // });

    };
   // function request(request) { return { type: fundAccountConstants.SAVE_CARD_PENDING, request } }
    function success(response) { return { type: fundAccountConstants.FUNDCARD_DETAILS_SUCCESS, data  } }
   // function failure(error) { return { type: fundAccountConstants.SAVE_CARD_FAILURE, error } }
}

export const deleteCard=(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {  //Route to be added
        let consume = ApiService.request(routes.DELETETOKENIZEDCARDS,
             "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.DELETE_SAVED_CARD_PENDING, request } }
    function success(response) { return { type: fundAccountConstants.DELETE_SAVED_CARD_SUCCESS, response  } }
    function failure(error) { return { type: fundAccountConstants.DELETE_SAVED_CARD_FAILURE, error } }
}

export const fundFromTokenizedCard=(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {  //Route to be added
        let consume = ApiService.request(routes.CARDTO_ACCOUNTTOKENIZED_TRANSFER,
             "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data, data));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.FUND_ACCOUNT_PENDING, request } }
    function success(response, request) { return { type: fundAccountConstants.FUND_ACCOUNT_SUCCESS, data: {response , request}  } }
    function failure(error) { return { type: fundAccountConstants.FUND_ACCOUNT_FAILURE, error } }
}

export const fundFromCardWithPin=(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {  //Route to be added
        let consume = ApiService.request(routes.CARD_TO_ACCOUNT_TRANSFER_PIN,
             "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data, data));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.FUND_ACCOUNT_PENDING, request } }
    function success(response, request) { return { type: fundAccountConstants.FUND_ACCOUNT_SUCCESS, data: {response , request}  } }
    function failure(error) { return { type: fundAccountConstants.FUND_ACCOUNT_FAILURE, error } }
}

export const getEncryptionRule=(token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {  //Route to be added
        let consume = ApiService.request(routes.ENCRYPTED_DATA_URL,
             "POST", {}, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.ENCRYPTION_RULE_PENDING, request } }
    function success(response) { return { type: fundAccountConstants.ENCRYPTION_RULE_SUCCESS, response  } }
    function failure(error) { return { type: fundAccountConstants.ENCRYPTION_RULE_FAILURE, error } }
}

export const verifyPAN=(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {  //Route to be added
        let consume = ApiService.request(routes.VERIFY_CARD_PAN,
             "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            })
            .catch(error => {
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: fundAccountConstants.VERIFY_PAN_PENDING, request } }
    function success(response) { return { type: fundAccountConstants.VERIFY_PAN_SUCCESS, response  } }
    function failure(error) { return { type: fundAccountConstants.VERIFY_PAN_FAILURE, error } }
};

export const ClearAction=(type)=>{
    return (dispatch) =>{
       dispatch(clear(type))
    };
    function clear(type){return {type : type}}
};