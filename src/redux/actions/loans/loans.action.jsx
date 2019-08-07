// In app Loan specific actions
//

import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {alertActions} from "../alert.actions";
import {SystemConstant} from "../../../shared/constants";
import { modelStateErrorHandler } from "../../../shared/utils";
import { loanConstants } from "../../constants/loans/loans.constants";

export const loanCalcData =(token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOAN_CALCULATOR_DATA,
             "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data));
            })
            .catch(error => {
               // console.log("error in here");
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: loanConstants.LOAN_CALC_DATA_PENDING, request } }
    function success(response) { return { type: loanConstants.LOAN_CALC_DATA_SUCCESS, response }}
    function failure(error) { return { type: loanConstants.LOAN_CALC_DATA_FAILURE, error } }
}

export const loanApply =(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOAN_APPLY,
             "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
            })
            .catch(error => {
               
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type: loanConstants.LOAN_APPLY_PENDING, request } }
    function success(response, request) { return { type: loanConstants.LOAN_APPLY_SUCCESS, data:{ response : response, request : request} }}
    function failure(error) { return { type: loanConstants.LOAN_APPLY_FAILURE, error } }
}

export const getIndustries =(token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOAN_EMPLOYMENT_INDUSTRIES,
             "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data));
            })
            .catch(error => {
               
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type: loanConstants.LOAN_GETINDUSTRIES_PENDING, request } }
    function success(response) { return { type: loanConstants.LOAN_GETINDUSTRIES_SUCCESS, response} }
    function failure(error) { return { type: loanConstants.LOAN_GETINDUSTRIES_FAILURE, error } }
}

export const getEmployers =(token, data)=>{
    let url = `${routes.LOAN_EMPLOYER}?industryId=${data}`;
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(url,
             "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data));
            })
            .catch(error => {
               
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type: loanConstants.LOAN_EMPLOYER_PENDING, request } }
    function success(response) { return { type: loanConstants.LOAN_EMPLOYER_SUCCESS, response} }
    function failure(error) { return { type: loanConstants.LOAN_EMPLOYER_FAILURE, error } }
}

export const loanHistory =(token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOAN_APPLICATION_HISTORY,
             "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data));
            })
            .catch(error => {
               // console.log("error in here");
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: loanConstants.LOAN_HISTORY_PENDING, request } }
    function success(response) { return { type: loanConstants.LOAN_HISTORY_SUCCESS, response }}
    function failure(error) { return { type: loanConstants.LOAN_HISTORY_FAILURE, error } }
}

export const loanCurrent =(token) =>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOAN_CURRENT,
             "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data));
            })
            .catch(error => {
               // console.log("error in here");
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: loanConstants.LOAN_CURRENT_PENDING, request } }
    function success(response) { return { type: loanConstants.LOAN_CURRENT_SUCCESS, response }}
    function failure(error) { return { type: loanConstants.LOAN_CURRENT_FAILURE, error } }
}