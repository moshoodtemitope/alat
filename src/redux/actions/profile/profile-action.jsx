import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {history} from './../../../_helpers/history';
import {handleError, modelStateErrorHandler} from './../../../shared/utils';
import {alertActions} from "../alert.actions";
import { profile } from "../../constants/profile/profile-constants";


export const linkBVN = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.DELETE_GROUP, "POST", data, SystemConstant.HEADER, true);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // dispatch(failure(error.response.data.message.toString()));
            });
    };
    
    function request(request) { return {type: profile.LINK_BVN_PENDING, request} }
    function success(response) { return {type: profile.LINK_BVN_SUCCESS, response} }
    function failure(error) { return {type: profile.LINK_BVN_FAILURE, error} }
};
