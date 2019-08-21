import {SystemConstant} from "../../../../shared/constants";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";
import {history} from '../../../../_helpers/history';
import { modelStateErrorHandler } from "../../../../shared/utils";
import {alertActions} from "../../alert.actions";
import {GROUPSAVINGSCONSTANT} from "../../../constants/savings/group/index";

export const groupSavingsTargetGoal = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CREATEGOAL, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push("/savings/group/group-created");
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return {type:GROUPSAVINGSCONSTANT.CREATEGROUPSAINGSPENDING, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.CREATEGROUPSAVINGS_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.CREATEGROUPSAVINGS_ERROR, error} }
};

export const groupDetails = (token, data) => {
   //const dataLoad = {}
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        //const url = "/Savings.WebApi/api/GroupSaving/GetGroupDetails?groupId={".concat(data.groupId, "}");
        let consume = ApiService.request(routes.GETGROUPDETAILS.concat("?groupId=", parseInt(data.groupId)), "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                if(data.parent != undefined)
                    history.push('/savings/group/group-analytics');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type:GROUPSAVINGSCONSTANT.GROUPDETAILS, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.GROUPDETAILS_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.GROUPDETAILS_ERROR, error} }
};

export const deleteGroup = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.DELETE_GROUP, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                if(data.deleteGroup != undefined)
                     history.push('/savings/group/success-message');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));

                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type:GROUPSAVINGSCONSTANT.DELETEGROUP, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.DELETEGROUP_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.DELETEGROUP_ERROR, error} }
};

export const contribute = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.DELETE_GROUP, "POST", data, SystemConstant.HEADER, true);
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

    function request(request) { return {type:GROUPSAVINGSCONSTANT.CONTRIBUTE, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.CONTRIBUTE_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.CONTRIBUTE_ERROR, error} }
};

export const editGroup = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.EDIT_GROUP_SAVINGS, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/savings/group/success-message');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));

                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type:GROUPSAVINGSCONSTANT.EDITGROUP, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.EDITGROUP_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.EDITGROUP_ERROR, error} }
};

export const pauseGroup = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.PAUSE_GROUP, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/savings/group/success-message');  
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));

                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type:GROUPSAVINGSCONSTANT.PAUSEGROUP, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.PAUSEGROUP_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.PAUSEGROUP_ERROR, error} }
};


export const findGroup = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FIND_GROUP.concat("?referralCode=", data.referralCode), "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/savings/join-group-summary');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type:GROUPSAVINGSCONSTANT.FIND_GROUP, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.FIND_GROUP_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.FIND_GROUP_ERROR, error} }
};

export const customerGroup = (token, data = null) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GROUPCUSTOMERS, "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                // if(data.parent != undefined)
                //     history.push('/savings/group/group-analytics');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));

                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type:GROUPSAVINGSCONSTANT.CUSTOMER_GROUP, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.CUSTOMER_GROUP_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.CUSTOMER_GROUP_ERROR, error} }
};

export const joinGroup = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.JOIN_GROUP, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                this.history.push('/savings/group/joingroup-success-message');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type:GROUPSAVINGSCONSTANT.JOIN_GROUP, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.JOIN_GROUP_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.JOIN_GROUP_ERROR, error} }
};

export const scheduleContribution = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.SCHEDULE_CONTRIBUTION, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/savings/group/success-message');
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type:GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION_ERROR, error} }
};


export const deleteMember = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.DELETE_GROUP, "POST", data, SystemConstant.HEADER, true);
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
     
    function request(request) { return {type:GROUPSAVINGSCONSTANT.DELETE_MEMBER, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.DELETE_MEMBER_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.DELETE_MEMBER_ERROR, error} }
};

export const cashOut = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.DELETE_GROUP, "POST", data, SystemConstant.HEADER, true);
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
      
    function request(request) { return {type:GROUPSAVINGSCONSTANT.CASHOUT, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.CASHOUT_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.CASHOUT_ERROR, error} }
};

export const continueScheduleGroupPayment = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.DELETE_GROUP, "POST", data, SystemConstant.HEADER, true);
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
      
    function request(request) { return {type:GROUPSAVINGSCONSTANT.CONTINUE_SCHEDULEGROUP_PAYMENT, request} }
    function success(response) { return {type:GROUPSAVINGSCONSTANT.CONTINUE_SCHEDULEGROUP_PAYMENT_SUCCESS, response} }
    function failure(error) { return {type:GROUPSAVINGSCONSTANT.CONTINUE_SCHEDULEGROUP_PAYMENT_ERROR, error} }
};

export const setAutomateSavingsStartDate =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    }
    function success(data){
        return{
            type:GROUPSAVINGSCONSTANT.GROUPSAVINGS_STARTDATE,
            data:data
        }
    }
}

export const setAutomateSavingsEndDate =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    }
    function success(data){
        return{
            type:GROUPSAVINGSCONSTANT.GROUPSAVINGS_ENDATE,
            data:data
        }
    }
}

export const setAmountToWithDraw =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    }
    function success(data){
        return{
            type:GROUPSAVINGSCONSTANT.SETAMOUNT_TO_WITHDRAW,
            data:data
        }
    }
}

export const setFrequency =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))
    }
    function success(data){
        return{
            type:GROUPSAVINGSCONSTANT.SET_FREQUENCY,
            data:data
        }
    }
}

































