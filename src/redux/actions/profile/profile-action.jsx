import {SystemConstant} from "../../../shared/constants";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {history} from './../../../_helpers/history';
import {handleError, modelStateErrorHandler} from './../../../shared/utils';
import {alertActions} from "../alert.actions";
import { profile } from "../../constants/profile/profile-constants";


export const linkBVN = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {  
        let consume = ApiService.request(routes.BVN_VERIFICATION, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
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

export const profileMenu = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_PROFILE_MENU, "GET", null, SystemConstant.HEADER, true);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                // history.push('/');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // dispatch(failure(error.response.data.message.toString()));
            });
    };
    
    function request(request) { return {type: profile.GET_PROFILE_MENU_PENDING, request} }
    function success(response) { return {type: profile.GET_PROFILE_MENU_SUCCESS, response} }
    function failure(error) { return {type: profile.GET_PROFILE_MENU_FAILURE, error} }
};

export const capturePersonalInformation = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.POST_PROFILE_INFO, "POST", data, SystemConstant.HEADER, true);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                // history.push('/');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // dispatch(failure(error.response.data.message.toString()));
            });
    };
    
    function request(request) { return {type: profile.POST_PROFILE_INFORMATION_PENDING, request} }
    function success(response) { return {type: profile.POST_PROFILE_INFORMATION_SUCCESS, response} }
    function failure(error) { return {type: profile.POST_PROFILE_INFORMATION_FAILURE, error} }
};


export const addNextOfKin = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.ADD_NEXT_OF_KIN, "POST", data, SystemConstant.HEADER, true);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                // history.push('/');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // dispatch(failure(error.response.data.message.toString()));
            });
    };
    
    function request(request) { return {type: profile.POST_NEXT_OF_KIN_PENDING, request} }
    function success(response) { return {type: profile.POST_NEXT_OF_KIN_SUCCESS, response} }
    function failure(error) { return {type: profile.POST_NEXT_OF_KIN_FAILURE, error} }
};


export const addContactDetails = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.ADD_CONTACT, "POST", data, SystemConstant.HEADER, true);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                // history.push('/');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type: profile.POST_CONTACT_DETAILS_PENDING, request} }
    function success(response) { return {type: profile.POST_CONTACT_DETAILS_SUCCESS, response} }
    function failure(error) { return {type: profile.POST_CONTACT_DETAILS_FAILURE, error} }
};

export const occupationAndSector = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.OCCUPA_AND_SECTOR, "POST", data, SystemConstant.HEADER, true);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                // history.push('/');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type: profile.OCCU_AND_SECTOR_PENDING, request} }
    function success(response) { return {type: profile.OCCU_AND_SECTOR_SUCCESS, response} }
    function failure(error) { return {type: profile.OCCU_AND_SECTOR_FAILURE, error} }
};

export const addDocuments = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.OCCUPA_AND_SECTOR, "POST", data, SystemConstant.HEADER, true);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                // history.push('/');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type: profile.DOCUMENTS_PENDING, request} }
    function success(response) { return {type: profile.DOCUMENTS_SUCCESS, response} }
    function failure(error) { return {type: profile.DOCUMENTS_FAILURE, error} }
};


export const nextOfKinsRelationship = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.NEXT_OF_KIN_RELATIONSHIP, "GET", null, SystemConstant.HEADER, true);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                // history.push('/');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type: profile.GET_NEXT_OF_KIN_RELATIONSHIP_PENDING, request} }
    function success(response) { return {type: profile.GET_NEXT_OF_KIN_RELATIONSHIP_SUCCESS, response} }
    function failure(error) { return {type: profile.GET_NEXT_OF_KIN_RELATIONSHIP_FAILURE, error} }
};


export const profileSuccessMessage = (data) =>{
    return (dispatch) => {
        dispatch(success(data));
        history.push('/profile-success-message');
    }

    function success(data){
        return{
            type:"profile success message",
            data:data
        }
    }
}


























