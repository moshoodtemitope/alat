import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {alertActions} from "../alert.actions";
import {SystemConstant} from "../../../shared/constants";
import {history} from './../../../_helpers/history';
import {handleError, modelStateErrorHandler} from './../../../shared/utils';
import {USER_REGISTER_FETCH, USER_REGISTER_SAVE, userConstants, BVN_VERIFICATION_PENDING, 
    BVN_VERIFICATION_SUCCESS, BVN_VERIFICATION_FAILURE, SKIP_BVN_PENDING, SKIP_BVN_SUCCESS,
    OTP_VERIFICATION_PENDING, OTP_VERIFICATION_FAILURE, DATA_FROM_BVN, SAVE_BVN_INFO} from "../../constants/onboarding/user.constants";
import { dispatch } from "rxjs/internal/observable/pairs";

export const userActions = {
    login,
    logout,
    register,
    bvnVerify,
    skipBvn,
    saveBvnInfo,
    saveBvnData,
    loginAfterOnboarding
};

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
            .then(function (response){
                // console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                // console.log(user);
                //     this.apiService.getEncrytionRule(encrytedData => {
                //         this.sharedData.keepData('encryptedFigure', encrytedData);
                //     });
                // console.log(response);
                // dispatch(storageActions.saveStorage(response.data));
                dispatch(success(response.data));

                history.push('/dashboard');
            }).catch(error => {
                
                // console.log(err.response.data.message);
                console.log("---------error at login");
                console.log(error);
                console.log(error.response)
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

function loginAfterOnboarding(loginData){
    return dispatch =>{
        localStorage.setItem("user", JSON.stringify(loginData));

        dispatch(success(loginData));
        history.push('/dashboard');
    }
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(response) { return { type: userConstants.LOGIN_SUCCESS, response } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    // userService.logout();
    //console.error("We are logging you out...");
    localStorage.clear();
    history.push('/');
    // window.location.reload();
    return { type: userConstants.LOGOUT };
}

function skipBvn(bvnDetails){
    return dispatch =>{
        let data = {
            imei: "354553073954109",
            phoneNo : bvnDetails.phone,
          };
        let consume= ApiService.request(routes.SKIPBVNOTP, "POST", data);
        dispatch (request(consume));
        return consume
            .then(response =>{
                data.maskedPhoneNo = response.data.phoneNo;
                dispatch(success(data));
                history.push('/register/verify-bvn');
            }).catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };
    function request(request) { return { type:SKIP_BVN_PENDING, request} }
    function success(response) { return {type:SKIP_BVN_SUCCESS, response} }
    function failure(error) { return {type:BVN_VERIFICATION_FAILURE, error} }
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
        let consume= ApiService.request(routes.BVN_VERIFICATION, "POST", bvnDetails);
        dispatch (request(consume));
        return consume
            .then(response =>{
                dispatch(success(response.data));
                // this.props.history.push('/register/verify-bvn');
                
                history.push('/register/verify-bvn', {userPhone: bvnDetails.phoneNo});
            }).catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };
    function request(request) { return { type:BVN_VERIFICATION_PENDING, request} }
    function success(response) { return {type:BVN_VERIFICATION_SUCCESS, response} }
    function failure(error) { return {type:BVN_VERIFICATION_FAILURE, error} }
}

function saveBvnInfo(otpData){
    return dispatch =>{
        let consume = ApiService.request(routes.VERIFYBVNOTP, "POST", otpData);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response.data));
                history.push('/register/confirm-bvndetails')
            }).catch(error =>{
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
        
    }

    function request(request) { return { type:OTP_VERIFICATION_PENDING, request} }
    function success(response) { return {type:DATA_FROM_BVN, response} }
    function failure(error) { return {type:OTP_VERIFICATION_FAILURE, error} }
}

function saveBvnData(otpData, action){
    switch(action){
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



function register(user, action) {
    switch(action){
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


export const uploadDocument =(token, data, action)=>{
    const requestHeaders =  Object.assign({},SystemConstant.HEADER);
    delete  requestHeaders['Content-Type'];
    delete requestHeaders['Accept'];  
    requestHeaders['alat-token'] =  token;
    requestHeaders['Content-Type'] =  false;
      return (dispatch) => {
          let consume = ApiService.request(routes.DOCUMENT_UPLOAD,
               "POST", data, requestHeaders);
          dispatch(request(consume));
          return consume
              .then(response => {
                  //TODO: edit localDB accounts object
                //   dispatch(success(response.data, data));
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
  
      function request(request) { return { type: action.pending, request } }
    //   function success(response, request) { return { type: loanOnboardingConstants.LOAN_SALARYTRANSACTION_SUCCESS, data: { response : response, request: request } }}
      function success(response) { return { type: action.success, data: { response : response } }}
      function failure(error) { return { type: action.failure, error } }
  }



