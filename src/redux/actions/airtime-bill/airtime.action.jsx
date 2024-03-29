import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {airtimeConstants} from "../../constants/airtime/airtime.constants";
import {SystemConstant} from "../../../shared/constants";
import { modelStateErrorHandler } from "../../../shared/utils";
import { alertActions } from "../alert.actions";
import * as utils from "../../../shared/utils";

//const user = JSON.parse(localStorage.getItem("user"));

export const getAirtimeBeneficiaries = (token) => {

    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.AIRTIME_BENEFICIARIES, "POST", null, SystemConstant.HEADER);
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        window.smartech('identify', user.email);
        window.smartech('dispatch', 'ALAT_Airtime_View', {
            "Email": user.email,
            "mobile": user.phoneNo
        });
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                // console.log(response);
                
                dispatch(success(response.data));
               
            })
            .catch(error => {
                //dispatch(failure(modelStateErrorHandler(error)));
               dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_PENDING, request } }
    function success(response) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_SUCCESS, response } }
    function failure(error) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_FAILURE, error } }
};

export const deleteBeneficairy =(token, BeneficiaryId) =>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.AIRTIME_DELETE_BENEFICIARY, "POST", {BeneficiaryId : BeneficiaryId}, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
              
                dispatch(success(response.data));
                return response;
            })
            .catch(error => {
                //dispatch(failure(modelStateErrorHandler(error)));
               dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_DELETE_PENDING, request } }
    function success(response) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_DELETE_SUCCESS, response } }
    function failure(error) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_DELETE_FAILURE, error } }
}

export const fetchDebitableAccounts = (token, requestType, data) => {
    SystemConstant.HEADER['alat-token'] = token;

    if(requestType && requestType==="forBankTransfer"){ //For Bank Transfer
        return (dispatch) => {
            dispatch(request(data));
            let consume = ApiService.request(routes.GetAllCustomerAccountsWithLimitsV2, "POST", {}, SystemConstant.HEADER);
            return consume
                .then(response => {
                    // console.log(response);
                    dispatch(success(response.data));
                })
                .catch(error => {
                    dispatch(failure(utils.modelStateErrorHandler(error)));
                    //dispatch(isFetchingFalse());
                    //console.log(error);
                });
        };
        
        function request(data) { return { type : airtimeConstants.GET_DEBTABLE_ACCOUNTS_PENDING, request: data}}
        function success(response) { return { type : airtimeConstants.GET_DEBTABLE_ACCOUNTS_SUCCESS, data: response } }
        function failure(data) { return { type : airtimeConstants.GET_DEBTABLE_ACCOUNTS_FAILURE, response: data }}
    }else{ //For None Bank Transfer activity
        return (dispatch) => {
            dispatch(request(data));
            let consume = ApiService.request(routes.FETCH_DEBITABLE_ACCOUNTS, "POST", data, SystemConstant.HEADER);
            return consume
                .then(response => {
                    // console.log(response);
                    dispatch(success(response.data));
                })
                .catch(error => {
                    dispatch(failure(utils.modelStateErrorHandler(error)));
                    //dispatch(isFetchingFalse());
                    //console.log(error);
                });
        };
        
        function request(data) { return { type : airtimeConstants.GET_DEBTABLE_ACCOUNTS_PENDING, request: data}}
        function success(response) { return { type : airtimeConstants.GET_DEBTABLE_ACCOUNTS_SUCCESS, data: response } }
        function failure(data) { return { type : airtimeConstants.GET_DEBTABLE_ACCOUNTS_FAILURE, response: data }}
    }
}

export const airtimeBuyData =(airtimeTransaction, isBene)=>{
    return(dispatch)=>dispatch(request(airtimeTransaction,isBene));
    function request(data) { return { type: airtimeConstants.AIRTIME_BUYDATA_PAGE2, data, isBene : isBene ? true : false } }
}

export const selectAccount = (airtimeTransaction)=>{
   return(dispatch)=> dispatch(request(airtimeTransaction));
    function request(data) { return { type: airtimeConstants.AIRTIME_BUYDATA_PAGE3, data } }
}


export const airtimeWebPinpayment =(token, data) =>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.AIRTIME_PAYMENT_WEBPIN, "POST", data, SystemConstant.HEADER);
        dispatch(request(data));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        window.smartech('identify', user.email);
        window.smartech('dispatch', 'ALAT_Airtime_Initiate', {
            "Email": user.email,
            "mobile": user.phoneNo,
            "airtimetype": user.phoneNo,
        });
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
              
                dispatch(success(response.data, data));
                
               // return response;
            })
            .catch(error => {
                //dispatch(failure(modelStateErrorHandler(error)));
                dispatch(failure(modelStateErrorHandler(error)));
               dispatch(alertActions.error(modelStateErrorHandler(error)));
               
                // throw(error);
            });
    };

    function request(request) { return { type: airtimeConstants.AIRTIME_WEBPIN_PENDING, request } }
    function success(response, request) { return { type: airtimeConstants.AIRTIME_WEBPIN_SUCCESS, obj :{response : response, request : request } }}
    function failure(error) { return { type: airtimeConstants.AIRTIME_WEBPIN_FAILURE, error } }
}

export const airtimeWebPinOTPpayment =(token, data) =>{
    
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.AIRTIME_PAYMENT_WEBPINOTP, "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        window.smartech('identify', user.email);
        window.smartech('dispatch', 'ALAT_Airtime_Success', {
            "Email": user.email,
            "mobile": user.phoneNo,
            "airtimetype": user.phoneNo
        });
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
              
                dispatch(success(response.data));
                
               // return response;
            })
            .catch(error => {
                //dispatch(failure(modelStateErrorHandler(error)));
                dispatch(failure(modelStateErrorHandler(error)));
                let user_details = localStorage.getItem("user");
                let user = JSON.parse(user_details)
                window.smartech('identify', user.email);
                window.smartech('dispatch', 'ALAT_Airtime_Failure', {
                    "Email": user.email,
                    "mobile": user.phoneNo,
                    "airtimetype": user.phoneNo,
                });
                dispatch(alertActions.error(modelStateErrorHandler(error)));
               
                // throw(error);
            });
    };

    function request(request) { return { type: airtimeConstants.AIRTIME_WEBPIN_OTP_PENDING, request } }
    function success(response) { return { type: airtimeConstants.AIRTIME_WEBPIN_OTP_SUCCESS, response } }
    function failure(error) { return { type: airtimeConstants.AIRTIME_WEBPIN_OTP_FAILURE, error } }
}

export const airtimeBeneficiarySave =(token, data) =>{
    
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.AIRTIME_BENEFICIARY_SAVE, "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
              
                dispatch(success(response.data));
               // return response;
            })
            .catch(error => {
                //dispatch(failure(modelStateErrorHandler(error)));
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
               
                // throw(error);
            });
    };

    function request(request) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_PENDING, request } }
    function success(response) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_SUCCESS, response } }
    function failure(error) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_FAILURE, error } }
}

export const clearAirtimeStore =()=>{
    return (dispatch) => { 
        dispatch(clear());
    }
    function clear(){return {type: airtimeConstants.AIRTIME_REDUCER_CLEAR, clear_data: "" }}
}