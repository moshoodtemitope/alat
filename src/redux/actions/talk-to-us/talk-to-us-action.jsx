import {
    talktoUsConstant
} from '../../constants/talk-to-us/talk-to-us.constant';
import {alertActions} from "../../alert.actions";
import { modelStateErrorHandler } from "../../../../shared/utils";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";
import {history} from "../../../../_helpers/history";

export const TalkUsMessage =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.ADDGOAL,
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

    function request(request) { return { type:talktoUsConstant.TALK_TO_US_PENDING,  request } }
    function success(response, request) { return { type: talktoUsConstant.TALK_TO_US_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: talktoUsConstant.TALK_TO_US_FAILURE, error } }
};

export const ReportError =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.ADDGOAL,
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
    function success(response, request) { return { type: talktoUsConstant.REPORT_ERROR_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: talktoUsConstant.REPORT_ERROR_FAILURE, error } }
};

export const GETBANKLOCATOR =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.ADDGOAL,
             "GET", data);
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
    function success(response, request) { return { type: talktoUsConstant.GET_BANK_BRANCHES_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: talktoUsConstant.GET_BANK_BRANCHES_FAILURE, error } }
};



