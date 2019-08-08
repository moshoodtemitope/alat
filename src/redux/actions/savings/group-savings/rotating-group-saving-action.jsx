import {SystemConstant} from "../../../../shared/constants";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";
import {history} from '../../../../_helpers/history';
import { modelStateErrorHandler } from "../../../../shared/utils";
import {GROUPSAVINGSCONSTANT} from "../../../constants/savings/group/index";


export const createRotatingSavings = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CREATE_ROTATING_SAVINGS, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            }) 
            .catch(error => {
                if(error.response.message){
                    dispatch(failure(error.response.message.toString()));
                }else{
                    dispatch(failure('We are unable to create rotating group now!'));
                }
                // dispatch(failure(error.response.data.message.toString()));
            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP_ERROR, error} }
};

export const rotatingGroupDetails = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.DELETE_GROUP, "POST", data, SystemConstant.HEADER, true);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            }) 
            .catch(error => {
                if(error.response.message){
                    dispatch(failure(error.response.message.toString()));
                }else{
                    dispatch(failure('We are unable to create rotating group now!'));
                }
                // dispatch(failure(error.response.data.message.toString()));
            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_ERROR, error} }
};
