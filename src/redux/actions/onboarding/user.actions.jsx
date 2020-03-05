import React from 'react'
import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { alertActions } from "../alert.actions";
import { SystemConstant } from "../../../shared/constants";
import { history } from './../../../_helpers/history';
import { handleError, modelStateErrorHandler } from './../../../shared/utils';

import {
    USER_REGISTER_FETCH, USER_REGISTER_SAVE, userConstants, BVN_VERIFICATION_PENDING,
    BVN_VERIFICATION_SUCCESS, BVN_VERIFICATION_FAILURE, SKIP_BVN_PENDING, SKIP_BVN_SUCCESS,
    OTP_VERIFICATION_PENDING, OTP_VERIFICATION_FAILURE, DATA_FROM_BVN, SAVE_BVN_INFO,
    GET_PROFILE_IMAGE_SUCCESS,
    GET_PROFILE_IMAGE_PENDING,
    GET_PROFILE_IMAGE_FAILURE,
    GET_NDPRSTATUS_SUCCESS,
    GET_NDPRSTATUS_PENDING,
    GET_NDPRSTATUS_FAILURE,
    ACCEPT_NDRP_SUCCESS,
    ACCEPT_NDRP_PENDING,
    ACCEPT_NDRP_FAILURE,
    GET_CMDMPRIORITY_SUCCESS,
    GET_CMDMPRIORITY_PENDING,
    GET_CMDMPRIORITY_FAILURE,
    UPDATE_CMDMPRIORITY_SUCCESS,
    UPDATE_CMDMPRIORITY_PENDING,
    UPDATE_CMDMPRIORITY_FAILURE,
    SENDANSWERFOR_FORGOTPW_SUCCESS,
    SENDANSWERFOR_FORGOTPW_PENDING,
    SENDANSWERFOR_FORGOTPW_FAILURE,
    SENDEMAILFOR_FORGOTPW_SUCCESS,
    SENDEMAILFOR_FORGOTPW_PENDING,
    SENDEMAILFOR_FORGOTPW_FAILURE,
    SEND_CUSTOMERTOKEN_SUCCESS,
    SEND_CUSTOMERTOKEN_PENDING,
    SEND_CUSTOMERTOKEN_FAILURE,
    SEND_NEWPASSWORDINFO_SUCCESS,
    SEND_NEWPASSWORDINFO_PENDING,
    SEND_NEWPASSWORDINFO_FAILURE,
    GET_QUESTION_FORPINRESET_SUCCESS,
    GET_QUESTION_FORPINRESET_PENDING,
    GET_QUESTION_FORPINRESET_FAILURE,
    SEND_ANSWER_FORPINRESET_SUCCESS,
    SEND_ANSWER_FORPINRESET_PENDING,
    SEND_ANSWER_FORPINRESET_FAILURE,
    SEND_OTP_OR_TOKEN_FORPINRESET_SUCCESS,
    SEND_OTP_OR_TOKEN_FORPINRESET_PENDING,
    SEND_OTP_OR_TOKEN_FORPINRESET_FAILURE,
    SEND_NEWPIN_FORPINRESET_SUCCESS,
    SEND_NEWPIN_FORPINRESET_PENDING,
    SEND_NEWPIN_FORPINRESET_FAILURE,
    SEND_CUSTOMERRATING_SUCCESS,
    SEND_CUSTOMERRATING_PENDING,
    SEND_CUSTOMERRATING_FAILURE,
    SEND_WILLCUSTOMER_REFERALAT_SUCCESS,
    SEND_WILLCUSTOMER_REFERALAT_PENDING,
    SEND_WILLCUSTOMER_REFERALAT_FAILURE,

    OFFLINELOAN_GET_DATAOF_CUSTOMER_SUCCESS,
    OFFLINELOAN_GET_DATAOF_CUSTOMER_PENDING,
    OFFLINELOAN_GET_DATAOF_CUSTOMER_FAILURE,

    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_SUCCESS,
    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_PENDING,
    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_FAILURE,
} from "../../constants/onboarding/user.constants";
import { dispatch } from "rxjs/internal/observable/pairs";

export const userActions = {
    login,
    logout,
    register,
    bvnVerify,
    skipBvn,
    saveBvnInfo,
    saveBvnData,
    getCustomerProfileImage,
    loginAfterOnboarding,
    reissueToken,
    initStore,
    checkNDPRStatus,
    acceptNDPR,
    fetchCMDMPriority,
    updateCMDM,
    sendCustomerRating,
    sendForgotPwEmail,
    sendForgotPwAnswer,
    sendTokenResetPassword,
    sendNewPasswordDetails,
    getQuestionForPinReset,
    sendAnswerForPinReset,
    sendOtpOrTokenForPinReset,
    sendNewPinForPinReset,
    reissueToken,
    offlineLoanGetCustomerData,
    offlineLoanSendCustomerData
};

function reissueToken(payload) {
    let userDetails = JSON.parse(localStorage.getItem("user"));
    SystemConstant.HEADER['alat-token'] = userDetails.token;
    return (dispatch) => {
        let consume = ApiService.request(routes.REISSUE_TOKEN, "GET", payload, SystemConstant.HEADER);
        return consume
            .then(response => {

                if (userDetails) {
                    userDetails.token = response.data.token;
                    localStorage.setItem("user", JSON.stringify(userDetails));
                    // console.log("reissuired token---------")
                }
            })
            .catch(error => {
                // console.log("reissue token failed", error)
            });
    };
}

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));
        let data = {
            email: email,
            password: password,
            deviceName: 'rdtr',
            deviceOs: 'uhiu',
            gcmRegId: '',
            channelId: 2,
            deviceCode: 'uytyyt',
            imei: '123456789012345'
        };

        let consume = ApiService.request(routes.LOGIN, "POST", data);
        return consume
            .then(function (response) {
                // console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                let user_details = localStorage.getItem("user");
                let user = JSON.parse(user_details)
                window.smartech('identify', user.email);
                window.smartech('dispatch', 'alat_Login_Success', {
                    "Email": user.email,
                    "mobile": user.phoneNo
                });
                // console.log(user);
                //     this.apiService.getEncrytionRule(encrytedData => {
                //         this.sharedData.keepData('encryptedFigure', encrytedData);
                //     });
                // console.log(response);
                // dispatch(storageActions.saveStorage(response.data));
                dispatch(success(response.data));

                // history.push('/dashboard');
                history.push('/home');
            }).catch(error => {

                // console.log(err.response.data.message);
                // console.log("---------error at login");
                // console.log(error);
                // console.log(error.response)
                // submitting = false;
                // throw new SubmissionError({ _error: err.response.data.message});
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });


    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(response) { return { type: userConstants.LOGIN_SUCCESS, response } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function loginAfterOnboarding(loginData) {
    return dispatch => {
        localStorage.setItem("user", JSON.stringify(loginData));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        console.log("the user on boarding ",user)
        window.smartech('identify', user.email);
        window.smartech('dispatch', 'alat_onboarding_mobile_input', {
            "Email": user.email,
            "mobile": user.phoneNo
        });

        dispatch(success(loginData));
        history.push('/dashboard');
    }
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(response) { return { type: userConstants.LOGIN_SUCCESS, response } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function sendForgotPwEmail(payload){
    return dispatch =>{
        let consume = ApiService.request(routes.EMAIL_FOR_FORGETPASSWORD, "POST", payload,  SystemConstant.HEADER);
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        window.smartech('identify', user.email);
        window.smartech('dispatch', 'alat_onboarding_emailpwd_Success', {
            "Email":user.email,
            "mobile": user.email
        });
        return consume
            .then(response =>{
                dispatch(success(response));
                history.push('/forgot-password/security-question');
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }
    function request(user) { return { type: SENDEMAILFOR_FORGOTPW_PENDING, user } }
    function success(response) { return { type: SENDEMAILFOR_FORGOTPW_SUCCESS, response, payload } }
    function failure(error) { return { type: SENDEMAILFOR_FORGOTPW_FAILURE, error } }
}

function sendForgotPwAnswer(payload){
    return dispatch =>{
        let consume = ApiService.request(routes.VERIFYUSER_FOR_FORGETPASSWORD, "POST", payload,  SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
                history.push('/forgot-password/success');
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }
    function request(user) { return { type: SENDANSWERFOR_FORGOTPW_PENDING, user } }
    function success(response) { return { type: SENDANSWERFOR_FORGOTPW_SUCCESS, response } }
    function failure(error) { return { type: SENDANSWERFOR_FORGOTPW_FAILURE, error } }
}

function sendTokenResetPassword(token){
    return dispatch =>{
        let customerToken = encodeURIComponent(token);
        let consume;
        if(token===undefined){
            return dispatch(failure('Please click the link in the email we sent to you'));
        }else{
            consume = ApiService.request(routes.GET_QUESTIONBY_TOKEN+customerToken, "GET", null,  SystemConstant.HEADER);
        }
         
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                if(token===undefined){
                    dispatch(failure('Please click the link in the email we sent to you'));
                }else{
                    dispatch(failure(modelStateErrorHandler(error)));
                    // dispatch(alertActions.error(modelStateErrorHandler(error)));
                }
                
            });
        
    }
    function request(user) { return { type: SEND_CUSTOMERTOKEN_PENDING, user } }
    function success(response) { return { type: SEND_CUSTOMERTOKEN_SUCCESS, response } }
    function failure(error) { return { type: SEND_CUSTOMERTOKEN_FAILURE, error } }
}

function sendNewPasswordDetails(payload){
    return dispatch =>{
        let consume = ApiService.request(routes.RESET_PASSWORD_WITHPIN, "POST", payload,  SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
                history.push('/maintenance/reset-password/success');
            }).catch(error =>{
                if(error.message && error.message.indexOf('This token has expired')){
                    dispatch(failure('This reset password link has expired.'));
                    setTimeout(() => {
                        history.push('/forgot-password');
                    }, 3500);
                }
                else{
                    dispatch(failure(modelStateErrorHandler(error)));
                    // dispatch(alertActions.error(modelStateErrorHandler(error)));
                }
                
            });
        
    }
    function request(user) { return { type: SEND_NEWPASSWORDINFO_PENDING, user } }
    function success(response) { return { type: SEND_NEWPASSWORDINFO_SUCCESS, response } }
    function failure(error) { return { type: SEND_NEWPASSWORDINFO_FAILURE, error } }
}


function getQuestionForPinReset(token){
    return dispatch =>{
        let customerToken = encodeURIComponent(token);

        let consume;
        if(token===undefined){
            return dispatch(failure('Please click the link in the email we sent to you'));
        }else{
            consume = ApiService.request(routes.GETPINRESETQUESTION+customerToken, "GET", null,  SystemConstant.HEADER);
        }

        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                if(error.message && error.message.indexOf('Request has expired')){
                    dispatch(failure('This reset pin link has expired.'));
                    
                } else{
                    dispatch(failure(modelStateErrorHandler(error)));
                    // dispatch(alertActions.error(modelStateErrorHandler(error)));
                }
                
            });
        
    }
    function request(user) { return { type: GET_QUESTION_FORPINRESET_PENDING, user } }
    function success(response) { return { type: GET_QUESTION_FORPINRESET_SUCCESS, response } }
    function failure(error) { return { type: GET_QUESTION_FORPINRESET_FAILURE, error } }
}

function sendAnswerForPinReset(payload, token){
    return dispatch =>{
        let customerToken = encodeURIComponent(token);

        let consume;
        if(token===undefined){
            return dispatch(failure('Please click the link in the email we sent to you'));
        }else{
            consume = ApiService.request(routes.VALIDATEQUESTIONANDSENDOTP+customerToken, "POST", payload,  SystemConstant.HEADER);
        }

         
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                if(error.message && error.message.indexOf('Invalid answer')){
                    dispatch(failure('The answer you provided is wrong.'));
                    
                } else{
                    dispatch(failure(modelStateErrorHandler(error)));
                    // dispatch(alertActions.error(modelStateErrorHandler(error)));
                }
            });
        
    }
    function request(user) { return { type: SEND_ANSWER_FORPINRESET_PENDING, user } }
    function success(response) { return { type: SEND_ANSWER_FORPINRESET_SUCCESS, response } }
    function failure(error) { return { type: SEND_ANSWER_FORPINRESET_FAILURE, error } }
}

function sendOtpOrTokenForPinReset(payload, token){
    return dispatch =>{
        let customerToken = encodeURIComponent(token);

        let consume;
        if(token===undefined){
            return dispatch(failure('Please click the link in the email we sent to you'));
        }else{
            consume = ApiService.request(routes.VERIFYRESETOTP+customerToken, "POST", payload,  SystemConstant.HEADER);
        }

        // let consume = ApiService.request(routes.VERIFYRESETOTP, "POST", payload,  SystemConstant.HEADER);
        // let user_details = localStorage.getItem("user");
        // let user = JSON.parse(user_details)
        // dispatch(request(consume));
        // window.smartech('identify', user.email);
        // window.smartech('dispatch', 'alat_otp_verified',{
        //     "Email": user.email,
        //     "mobile": user.phoneNo
        // });

        return consume
            .then(response =>{
                console.log("----+++");
                dispatch(success(response));
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }
    function request(user) { return { type: SEND_OTP_OR_TOKEN_FORPINRESET_PENDING, user } }
    function success(response) { return { type: SEND_OTP_OR_TOKEN_FORPINRESET_SUCCESS, response } }
    function failure(error) { return { type: SEND_OTP_OR_TOKEN_FORPINRESET_FAILURE, error } }
}

function sendNewPinForPinReset(payload, token){
    return dispatch =>{
        let customerToken = encodeURIComponent(token);

        let consume;
        if(token===undefined){
            return dispatch(failure('Please click the link in the email we sent to you'));
        }else{
            consume = ApiService.request(routes.CHANGEPIN+customerToken, "POST", payload,  SystemConstant.HEADER);
        }
        // let consume = ApiService.request(routes.CHANGEPIN, "POST", payload,  SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
                history.push('/maintenance/reset-pin/success');
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }
    function request(user) { return { type: SEND_NEWPIN_FORPINRESET_PENDING, user } }
    function success(response) { return { type: SEND_NEWPIN_FORPINRESET_SUCCESS, response } }
    function failure(error) { return { type: SEND_NEWPIN_FORPINRESET_FAILURE, error } }
}




function logout(type) {
    // userService.logout();
    //console.error("We are logging you out...");
    localStorage.clear();
    history.push('/');
    // window.location.reload();
    return (dispatch) => {
        dispatch(logout());
    }
    function logout() { return { type: userConstants.LOGOUT } }
}

function initStore() {
    localStorage.clear();
    return (dispatch) => {
        dispatch(logout());
    }
    function logout() { return { type: userConstants.LOGOUT } }
}

function skipBvn(bvnDetails) {
    return dispatch => {
        let data = {
            imei: "354553073954109",
            phoneNo: bvnDetails.phone,
        };
        let consume = ApiService.request(routes.SKIPBVNOTP, "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                data.maskedPhoneNo = response.data.phoneNo;
                dispatch(success(data));
                history.push('/register/verify-bvn');
            }).catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };
    function request(request) { return { type: SKIP_BVN_PENDING, request } }
    function success(response) { return { type: SKIP_BVN_SUCCESS, response } }
    function failure(error) { return { type: BVN_VERIFICATION_FAILURE, error } }
}

function checkNDPRStatus(token){
    SystemConstant.HEADER['alat-token'] = token; 
    return dispatch =>{
        let consume = ApiService.request(routes.CHECK_NDRP, "GET", null,  SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }

    function request(request) { return { type:GET_NDPRSTATUS_PENDING, request} }
    function success(response) { return {type:GET_NDPRSTATUS_SUCCESS, response} }
    function failure(error) { return {type:GET_NDPRSTATUS_FAILURE, error} }
}

function acceptNDPR(token){
    SystemConstant.HEADER['alat-token'] = token; 
    return dispatch =>{
        let consume = ApiService.request(routes.ACCEPTNDRP+true, "POST", null,  SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
                window.location.reload();
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }

    function request(request) { return { type:ACCEPT_NDRP_PENDING, request} }
    function success(response) { return {type:ACCEPT_NDRP_SUCCESS, response} }
    function failure(error) { return {type:ACCEPT_NDRP_FAILURE, error} }
}

function fetchCMDMPriority(token){
    SystemConstant.HEADER['alat-token'] = token; 
    return dispatch =>{
        let consume = ApiService.request(routes.CMDM_PRIORITY, "GET", null,  SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }

    function request(request) { return { type:GET_CMDMPRIORITY_PENDING, request} }
    function success(response) { return {type:GET_CMDMPRIORITY_SUCCESS, response} }
    function failure(error) { return {type:GET_CMDMPRIORITY_FAILURE, error} }
}

function updateCMDM(updatedfields, token){
    SystemConstant.HEADER['alat-token'] = token; 
    return dispatch =>{
        let consume = ApiService.request(routes.CMDM_UPDATEFIELD, "POST", updatedfields,  SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                console.log("====", error.response);
                if(error.response.status===400 || error.response.status===500){
                    dispatch(failure("An error occured Please try again later"))
                }else{
                    dispatch(failure(modelStateErrorHandler(error)));
                    dispatch(alertActions.error(modelStateErrorHandler(error)));
                }
            });
        
    }

    function request(request) { return { type:UPDATE_CMDMPRIORITY_PENDING, request} }
    function success(response) { return {type:UPDATE_CMDMPRIORITY_SUCCESS, response} }
    function failure(error) { return {type:UPDATE_CMDMPRIORITY_FAILURE, error} }
}

function sendCustomerRating(rating, willrefer){
    let requestHeaders = Object.assign({}, SystemConstant.HEADER);
    // delete requestHeaders['Content-Type'];
    return dispatch =>{
        let consume = ApiService.request(routes.SEND_CUSTOMER_RATING+rating, "POST", null, requestHeaders);
        dispatch(request(consume));
        return consume
            .then(response =>{
                let consume2 = ApiService.request(routes.WILL_CUSTOMER_REFER_ALAT+willrefer, "POST", null);
                dispatch(request(consume2));
                return consume2
                    .then(response2=>{
                        dispatch(success(response2));
                    }).catch(error =>{
                        dispatch(failure(modelStateErrorHandler(error)));
                        dispatch(alertActions.error(modelStateErrorHandler(error)));
                    });
                // dispatch(success(response));
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }

    function request(request) { return { type:SEND_CUSTOMERRATING_PENDING, request} }
    function success(response) { return {type:SEND_CUSTOMERRATING_SUCCESS, response} }
    function failure(error) { return {type:SEND_CUSTOMERRATING_FAILURE, error} }
}

function offlineLoanGetCustomerData(keyId){
    
    return dispatch =>{
        let consume = ApiService.request(routes.OFFLINELOAN_GET_CUSTOMERDATA+keyId, "GET", null,  SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                console.log("====",typeof error.response.data);
                let errorResponse = error.response.data;
                if(typeof errorResponse ==="string"){
                    errorResponse = JSON.parse(errorResponse);
                    
                    dispatch(failure(modelStateErrorHandler(errorResponse)));
                    dispatch(alertActions.error(modelStateErrorHandler(errorResponse)));
                }else{
                    dispatch(failure(modelStateErrorHandler(error)));
                    dispatch(alertActions.error(modelStateErrorHandler(error)));
                }
            });
        
    }

    function request(request) { return { type:OFFLINELOAN_GET_DATAOF_CUSTOMER_PENDING, request} }
    function success(response) { return {type:OFFLINELOAN_GET_DATAOF_CUSTOMER_SUCCESS, response} }
    function failure(error) { return {type:OFFLINELOAN_GET_DATAOF_CUSTOMER_FAILURE, error} }
}

function offlineLoanSendCustomerData(payload){
    
    return dispatch =>{
        let consume = ApiService.request(routes.OFFLINELOAN_SEND_RESPONSE_CUSTOMERDATA, "POST", payload,  SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }

    function request(request) { return { type:OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_PENDING, request} }
    function success(response) { return {type:OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_SUCCESS, response} }
    function failure(error) { return {type:OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_FAILURE, error} }
}


function bvnVerify (bvnDetails){
    
    return dispatch =>{
        // let data = {
        //     bvn: bvnDetails.bvn,
        //     dob: bvnDetails.dob,
        //     phoneNo : bvnDetails.phone,
        //     isOnboarding: true,
        //     channelId: 2
        //   };
        let consume = ApiService.request(routes.BVN_VERIFICATION, "POST", bvnDetails);
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        window.smartech('identify', user.email);
        window.smartech('dispatch', 'alat_bvn_verified', {
            "Email": user.email,
            "mobile": user.phoneNo
        });
        return consume
            .then(response => {
                dispatch(success(response.data));
                // this.props.history.push('/register/verify-bvn');
                


                history.push('/register/verify-bvn', { userPhone: bvnDetails.phoneNo });
            }).catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };
    function request(request) { return { type: BVN_VERIFICATION_PENDING, request } }
    function success(response) { return { type: BVN_VERIFICATION_SUCCESS, response } }
    function failure(error) { return { type: BVN_VERIFICATION_FAILURE, error } }
}

function saveBvnInfo(otpData) {
    return dispatch => {
        let consume = ApiService.request(routes.VERIFYBVNOTP, "POST", otpData);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/register/confirm-bvndetails')
            }).catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });

    }

    function request(request) { return { type: OTP_VERIFICATION_PENDING, request } }
    function success(response) { return { type: DATA_FROM_BVN, response } }
    function failure(error) { return { type: OTP_VERIFICATION_FAILURE, error } }
}

function saveBvnData(otpData, action) {
    switch (action) {
        case SAVE_BVN_INFO:
            return dispatch => {
                dispatch(save(otpData));
            };
        case OTP_VERIFICATION_PENDING:
            return dispatch => {
                dispatch(pending(otpData));
            };
        default:
            return dispatch => {
                dispatch(pending(otpData));
            };
    }
    function pending(otpData) { return null }
    function save(otpData) { return { type: SAVE_BVN_INFO, otpData } }
}

function getCustomerProfileImage(token, image){
    SystemConstant.HEADER['alat-token'] = token; 
    return dispatch =>{
        let profileroute = `${routes.GET_USERPROFILE_IMAGE}${image}`;
        let consume = ApiService.request(profileroute, "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        window.smartech('identify', user.email);
        window.smartech('dispatch', 'alat_onb_photo_sign_success',{
            "Email": user.email,
            "mobile": user.phoneNo
        });
        return consume
            .then(response =>{
                dispatch(success(response.data));
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }

    function request(request) { return { type:GET_PROFILE_IMAGE_PENDING, request} }
    function success(response) { return {type:GET_PROFILE_IMAGE_SUCCESS, response} }
    function failure(error) { return {type:GET_PROFILE_IMAGE_FAILURE, error} }
}



function register(user, action) {
    switch (action) {
        case USER_REGISTER_FETCH:
            return dispatch => {
                dispatch(fetch(user));
            };
        case USER_REGISTER_SAVE:
            return dispatch => {
                dispatch(save(user));
            };
        default:
            return dispatch => {
                dispatch(pending(user));
            };
    }

    function pending(user) { return null }
    function fetch(user) { return { type: USER_REGISTER_FETCH, user } }
    function save(user) { return { type: USER_REGISTER_SAVE, user } }
}

export const uploadDocument = (token, data, action, type) => {
    const requestHeaders = Object.assign({}, SystemConstant.HEADER);
    delete requestHeaders['Content-Type'];
    delete requestHeaders['Accept'];
    requestHeaders['alat-token'] = token;
    requestHeaders['Content-Type'] = false;
    let user_details = localStorage.getItem("user");
    let user = JSON.parse(user_details)
    window.smartech('identify', user.email);
    window.smartech('dispatch', 'alat_onb_photo_sign_success',{
        "Email": user.email,
        "mobile": user.phoneNo
    });
    return (dispatch) => {
        let consume = ApiService.request(routes.DOCUMENT_UPLOAD,
            "POST", data, requestHeaders);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                //   dispatch(success(response.data, data));
                dispatch(success(response.data));
                if(type === true) history.push('/loans/salary/dashboard');
            })
            .catch(error => {
                // console.log("error in here");
                // dispatch(success(response.data, request));
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: action.pending, request } }
    //   function success(response, request) { return { type: loanOnboardingConstants.LOAN_SALARYTRANSACTION_SUCCESS, data: { response : response, request: request } }}
    function success(response) { return { type: action.success, data: { response: response } } }
    function failure(error) { return { type: action.failure, error } }
}

