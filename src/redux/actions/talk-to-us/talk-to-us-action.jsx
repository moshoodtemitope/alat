import {
    talktoUsConstant
} from '../../constants/talk-to-us/talk-to-us.constant';
import {alertActions} from "../alert.actions";
import { modelStateErrorHandler } from "../../../shared/utils";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {history} from "../../../_helpers/history";
import {SystemConstant} from "../../../shared/constants";


export const TalkUsMessage =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.SEND_MESSAGE,
             "POST", data);
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        console.log(user)
        window.smartech('identify', user.email);
        window.smartech('dispatch', 'alat_talk_to_us', {
            "Email": user.email,
            "mobile": user.phoneNo
        });
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data));
                
                // history.push({pathname:"/savings/group/success-message"})
               
            })
            .catch(error => {
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type:talktoUsConstant.TALK_TO_US_PENDING,  request } }
    function success(response, request) { return { type: talktoUsConstant.TALK_TO_US_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: talktoUsConstant.TALK_TO_US_FAILURE, error } }
};

export const ReportErrorMessage =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.REPORT_ERROR,
             "POST", data);
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

    function request(request) { return { type:talktoUsConstant.REPORT_ERROR_PENDING,  request } }
    function success(response) { return { type: talktoUsConstant.REPORT_ERROR_SUCCESS, response }}
    function failure(error) { return { type: talktoUsConstant.REPORT_ERROR_FAILURE, error } }
};

export const GetBankLocator =(token,data)=>{
    SystemConstant.HEADER['alat-token'] = token;

    return (dispatch) => {
        let consume = ApiService.request(routes.BRANCH_ATM,
             "GET", data, null, SystemConstant.HEADER);
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

    function request(request) { return { type:talktoUsConstant.GET_BANK_BRANCHES_PENDING,  request } }
    function success(response) { return { type: talktoUsConstant.GET_BANK_BRANCHES_SUCCESS, response }}
    function failure(error) { return { type: talktoUsConstant.GET_BANK_BRANCHES_FAILURE, error } }
};

export const GetPageData =(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_PAGE_DATA, "GET", data, null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.error(response);
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };
    

    function request(request) { return { type:talktoUsConstant.GET_PAGE_DATA_PENDING,  request } }
    function success(response) { return { type: talktoUsConstant.GET_PAGE_DATA_SUCCESS, response} }
    function failure(error) { return { type: talktoUsConstant.GET_PAGE_DATE_FAILURE, error } }
};

export const GetBankList =(token, data)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.BANK_LIST, "GET", data, null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.error(response);
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };
    

    function request(request) { return { type:talktoUsConstant.GET_BANK_LIST_PENDING,  request } }
    function success(response) { return { type: talktoUsConstant.GET_BANK_LIST_SUCCESS, response} }
    function failure(error) { return { type: talktoUsConstant.GET_BANK_LIST_FAILURE, error } }
};




