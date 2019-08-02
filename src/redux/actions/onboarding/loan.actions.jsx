import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {alertActions} from "../alert.actions";
import {SystemConstant} from "../../../shared/constants";
import { modelStateErrorHandler } from "../../../shared/utils";
import { loanOnboardingConstants } from '../../constants/onboarding/loan.constants';
import {
    FETCH_BANK_PENDING,
    FETCH_BANK_SUCCESS,
    FETCH_BANK_FAILURE,
} from "../../../redux/constants/transfer.constants";

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

export const saveUserDetails =(data)=>{
    //SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(success(data));
    };
   // function request(request) { return { type: loanOnboardingConstants.LOAN_STEP1_PENDING, request } }
    function success(data) { return { type: loanOnboardingConstants.LOAN_USERNAME_SUCCESS, data: data}}
   // function failure(error) { return { type: loanOnboardingConstants.LOAN_STEP1_FAILURE, error } }
}


// Email and password is also collected on this page and saved wth this endpoint
export const LoanOnboardingStep3 =(data)=>{
    //SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOANS_STEP_3, //route to be changed to customerProfile
             "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                var dataToSave = {
                    ...response.data,
                    firstname : data.firstname
                };
                localStorage.setItem("user", JSON.stringify(dataToSave));
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

export const generateStatement =(token, url)=>{
    let paramsurl = `${routes.LOAN_GENERATE_STATEMENT}?${url}`;
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(paramsurl,
             "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                //dispatch(success(response.data, data));
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

    function request(request) { return { type: loanOnboardingConstants.LOAN_GENERATE_STATEMENT_PENDING, request } }
    // function success(response, request) { return { type: loanOnboardingConstants.LOAN_GENERATE_STATEMENT_SUCCESS, data: { response : response, request: request } }}
    function success(response) { return { type: loanOnboardingConstants.LOAN_GENERATE_STATEMENT_SUCCESS, data: {response} }}
    function failure(error) { return { type: loanOnboardingConstants.LOAN_GENERATE_STATEMENT_FAILURE, error } }
}

export const requestStatement =(token, data)=>{
    //let paramsurl = `${routes.LOAN_REQUEST_STATEMENT}?${url}`;
    //SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOAN_REQUEST_STATEMENT,
             "GET", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
               // dispatch(success(response.data, data));
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

    function request(request) { return { type: loanOnboardingConstants.LOAN_REQUEST_STATEMENT_PENDING, request } }
    // function success(response, request) { return { type: loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS, data: { response : response, request: request } }}
    function success(response, request) { return { type: loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS, data: { response : response, request : request } }}
    function failure(error) { return { type: loanOnboardingConstants.LOAN_REQUEST_STATEMENT_FAILURE, error } }
}

export const salaryTransaction =(token)=>{
    //  let url = `${routes.LOAN_REQUEST_STATEMENT}?${url}`;
      SystemConstant.HEADER['alat-token'] = token;
      return (dispatch) => {
          let consume = ApiService.request(routes.LOAN_SALARY_TRANSACTION,
               "GET", null, SystemConstant.HEADER);
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
  
      function request(request) { return { type: loanOnboardingConstants.LOAN_SALARYTRANSACTION_PENDING, request } }
    //   function success(response, request) { return { type: loanOnboardingConstants.LOAN_SALARYTRANSACTION_SUCCESS, data: { response : response, request: request } }}
      function success(response) { return { type: loanOnboardingConstants.LOAN_SALARYTRANSACTION_SUCCESS, data: { response : response } }}
      function failure(error) { return { type: loanOnboardingConstants.LOAN_SALARYTRANSACTION_FAILURE, error } }
  }

export const salaryEntry =(token, data)=>{
  //  let url = `${routes.LOAN_REQUEST_STATEMENT}?${url}`;
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOAN_SELECTED_ENTRIES,
             "POST", data, SystemConstant.HEADER);
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

    function request(request) { return { type: loanOnboardingConstants.LOAN_SALARYENTRY_PENDING, request } }
    function success(response, request) { return { type: loanOnboardingConstants.LOAN_SALARYENTRY_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: loanOnboardingConstants.LOAN_SALARYENTRY_FAILURE, error } }
}

  export const getScoreCard =(token)=>{
    //  let url = `${routes.LOAN_REQUEST_STATEMENT}?${url}`;
      SystemConstant.HEADER['alat-token'] = token;
      return (dispatch) => {
          let consume = ApiService.request(routes.LOAN_GET_SCORECARD_QUESTIONS,
               "GET", null, SystemConstant.HEADER);
          dispatch(request(consume));
          return consume
              .then(response => {
                  //TODO: edit localDB accounts object
                  //dispatch(success(response.data, data));
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
  
      function request(request) { return { type: loanOnboardingConstants.LOAN_SCORECARD_QUESTION_PENDING, request } }
      function success(response) { return { type: loanOnboardingConstants.LOAN_SCORECARD_QUESTION_SUCCESS, data: { response : response } }}
      function failure(error) { return { type: loanOnboardingConstants.LOAN_SCORECARD_QUESTION_FAILURE, error } }
  }

  export const postScoreCardAnswer =(token, data)=>{
    //  let url = `${routes.LOAN_REQUEST_STATEMENT}?${url}`;
      SystemConstant.HEADER['alat-token'] = token;
      return (dispatch) => {
          let consume = ApiService.request(routes.LOAN_POST_SCORECARD_ANSWER,
               "POST", data, SystemConstant.HEADER);
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
  
      function request(request) { return { type: loanOnboardingConstants.LOAN_SCORECARD_ANSWER_PENDING, request } }
      function success(response, request) { return { type: loanOnboardingConstants.LOAN_SCORECARD_ANSWER_SUCCESS, data: { response : response, request: request } }}
      function failure(error) { return { type: loanOnboardingConstants.LOAN_SCORECARD_ANSWER_FAILURE, error } }
  }

  export const getBanks = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOAN_BANK_LIST, "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                if(error.response.message){
                    dispatch(failure(error.response.message.toString()));
                }else{
                    dispatch(failure('We are unable to load banks.'));
                }
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return { type:FETCH_BANK_PENDING, request} }
    function success(response) { return {type:FETCH_BANK_SUCCESS, response} }
    function failure(error) { return {type:FETCH_BANK_FAILURE, error} }
};

export const clearLoanOnboardingStore =()=>{
    return (dispatch) => { 
        dispatch(clear());
    }
    function clear(){return {type: loanOnboardingConstants.LOAN_ONBOARDING_CLEAR, clear_data: "" }}
}