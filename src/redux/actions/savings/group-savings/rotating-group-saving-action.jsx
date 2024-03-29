import {SystemConstant} from "../../../../shared/constants";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";
import {history} from '../../../../_helpers/history';
import { modelStateErrorHandler } from "../../../../shared/utils";
import {GROUPSAVINGSCONSTANT} from "../../../constants/savings/group/index";
import {alertActions} from "../../alert.actions";


export const createRotatingSavings = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CREATE_ROTATING_SAVINGS, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push("/savings/rotating-group");
            }) 
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP_ERROR, error} }
};

export const rotatingGroupDetails = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.ROTATING_GROUP_DETAILS.concat("?groupId=", parseInt(data.groupId)), "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                if(data.parent != undefined)
                     history.push('/savings/group-analytics-mini');
            }) 
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_ERROR, error} }
};

export const joinAGroup = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {    
        let consume = ApiService.request(routes.JOIN_A_GROUP, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume)); 
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/savings/joined-group-successfully');    
            })    
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.JOIN_A_GROUP, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.JOIN_A_GROUP_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.JOIN_A_GROUP_ERROR, error} }
};

export const EditSlots = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.EDIT_SLOTS, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            }) 
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.EDIT_SLOTS, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.EDIT_SLOTS_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.EDIT_SLOTS_ERROR, error} }
};

export const ActivateGroup = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.ACTIVATE_GROUP, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/savings/group-started-successfully'); 
            }) 
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.ACTIVATE_ROTATING_GROUP_PENDING, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.ACTIVATE_ROTATING_GROUP_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.ACTIVATE_ROTATING_GROUP_FAILURE, error} }
};

export const GetGroupsEsusu = (token, data = null) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_GROUPS, "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            }) 
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.GET_GROUPS_ESUSU, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.GET_GROUPS_ESUSU_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.GET_GROUPS_ESUSU_ERROR, error} }
};

export const editGroupEsusu = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.EDIT_GROUP_ESUSU, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/savings/rotating-edited-successfully');
            }) 
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.EDIT_GROUP_ESUSU, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.EDIT_GROUP_ESUSU_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.EDIT_GROUP_ESUSU_ERROR, error} }
};

export const deleteGroupEsusu = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.DELETE_GROUP_ESUSU, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/savings/rotating-deleted-successfully');
            }) 
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

                // dispatch(failure(error.response.data.message.toString()));
            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.DELETE_GROUP_ESUSU, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.DELETE_GROUP_ESUSU_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.DELETE_GROUP_ESUSU_ERROR, error} }
};

export const joinGroupEsusu = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.JOIN_GROUP_ESUSU, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/savings/joined-group-successfully');
            }) 
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

                // dispatch(failure(error.response.data.message.toString()));
            });
    };
    
    function request(request) { return {type:GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU_ERROR, error} }
};

// export const pauseGroupEsusu = (token, data) => {
//     SystemConstant.HEADER['alat-token'] = token;
//     return (dispatch) => {
//         let consume = ApiService.request(routes.DELETE_GROUP_ESUSU, "POST", data, SystemConstant.HEADER, false);
//         dispatch(request(consume));
//         return consume
//             .then(response => {
//                 dispatch(success(response.data));
//             }) 
//             .catch(error => {
//                 if(error.response.message){
//                     dispatch(failure(error.response.message.toString()));
//                 }else{
//                     dispatch(failure('You are unable to Join NOW!'));
//                 }
//                 // dispatch(failure(error.response.data.message.toString()));
//             });
//     };
    
//     function request(request) { return {type:GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU, request} }
//     function success(response) { return {type:GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU_SUCCESS, response} }
//     function failure(error) { return {type:GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU_ERROR, error} }
// };

export const refferalCode = (data) =>{
    return(dispatch)=>{
        dispatch(success(data))
        // history.push('/savings/join-group-summary');
    }
    function success(data){
        return{
            type: 'refferalCode',
            data: data
        }
    }
}


