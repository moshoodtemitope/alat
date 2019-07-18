import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {alertActions} from "../alert.actions";
import {SystemConstant} from "../../../shared/constants";
import { modelStateErrorHandler } from "../../../shared/utils";
import { loanOnboardingConstants } from '../../constants/onboarding/loan.constants';

export const loanOnbaordingStep1 =(data)=>{
    //SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOANS_STEP_1,
             "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
            })
            .catch(error => {
               // console.log("error in here");
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: loanOnboardingConstants.LOAN_STEP1_PENDING, request } }
    function success(response, request) { return { type: loanOnboardingConstants.LOAN_STEP1_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: loanOnboardingConstants.LOAN_STEP1_FAILURE, error } }
}

//Fill in Amount and estimate repayment
export const loanOnbaordingStep2 =(data)=>{
    //SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(success(data));
    };

   // function request(request) { return { type: loanOnboardingConstants.LOAN_STEP1_PENDING, request } }
    function success(data) { return { type: loanOnboardingConstants.LOAN_STEP2_SUCCESS, data: data}}
   // function failure(error) { return { type: loanOnboardingConstants.LOAN_STEP1_FAILURE, error } }
}


// Email and password is also collected on this page and saved wth this endpoint
export const LoanOnboardingStep3 =(data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOANS_STEP_3, //route to be changed to customerProfile
             "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
            })
            .catch(error => {
               // console.log("error in here");
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: loanOnboardingConstants.LOAN_STEP3_PENDING, request } }
    function success(response, request) { return { type: loanOnboardingConstants.LOAN_STEP3_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: loanOnboardingConstants.LOAN_STEP3_FAILURE, error } }
}

export const verifyBvn =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.LOAN_VERIFY_BVN,
             "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
            })
            .catch(error => {
               // console.log("error in here");
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: loanOnboardingConstants.LOAN_VERIFY_BVN_PENDING, request } }
    function success(response, request) { return { type: loanOnboardingConstants.LOAN_VERIFY_BVN_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: loanOnboardingConstants.LOAN_VERIFY_BVN_FAILURE, error } }
}

export const validateOtp =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.LOAN_VALIDATE_OTP,
             "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
            })
            .catch(error => {
               // console.log("error in here");
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: loanOnboardingConstants.LOAN_VALIDATEOTP_PENDING, request } }
    function success(response, request) { return { type: loanOnboardingConstants.LOAN_VALIDATEOTP_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: loanOnboardingConstants.LOAN_VALIDATEOTP_FAILURE, error } }
}