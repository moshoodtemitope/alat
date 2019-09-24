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
                history.push('/profile/profile-succ-linked');
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
        let consume = ApiService.request(routes.POST_PROFILE_INFO, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/profile/profile-success-personalInfo');
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
        let consume = ApiService.request(routes.ADD_NEXT_OF_KIN, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                 history.push('/profile/profile-success-nextofkin');
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
                history.push('/profile/profile-succ-message');
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
        let consume = ApiService.request(routes.OCCUPA_AND_SECTOR, "GET", data, SystemConstant.HEADER, true);
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
        let consume = ApiService.request(routes.ADD_DOCUMENT, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push('/profile/profile-success-document');
            })
            .catch(error => {
                // dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type: profile.DOCUMENTS_PENDING, request} }
    function success(response) { return {type: profile.DOCUMENTS_SUCCESS, response} }
    function failure(error) { return {type: profile.DOCUMENTS_FAILURE, error} }
};

export const getContactDetails = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_CONTACT_DETAIL, "GET", data, SystemConstant.HEADER, true);
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

    function request(request) { return {type: profile.GET_CONTACT_DETAILS_PENDING, request} }
    function success(response) { return {type: profile.GET_CONTACT_DETAILS_SUCCESS, response} }
    function failure(error) { return {type: profile.GET_CONTACT_DETAILS_FAILURE, error} }
};

export const getResidentialDetails = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_RESIDENTIAL_ADDRESS, "GET", null, SystemConstant.HEADER, true);
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

    function request(request) { return {type: profile.GET_RESIDENTIAL_PENDING, request} }
    function success(response) { return {type: profile.GET_RESIDENTIAL_SUCCESS, response} }
    function failure(error) { return {type: profile.GET_RESIDENIAL_FAILURE, error} }
};

export const getPersonalInfo = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GETPERSONALINFO, "GET", data, SystemConstant.HEADER, true);
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

    function request(request) { return {type: profile.GET_PERSONAL_INFO_PENDING, request} }
    function success(response) { return {type: profile.GET_PERSONAL_INFO_SUCCESS, response} }
    function failure(error) { return {type: profile.GET_PERSONAL_INFO_FAILURE, error} }
};
export const getStates = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GETSTATES, "GET", data, SystemConstant.HEADER, true);
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

    function request(request) { return {type: profile.GET_STATE_PENDING, request} }
    function success(response) { return {type: profile.GET_STATE_SUCCESS, response} }
    function failure(error) { return {type: profile.GET_STATE_FAILURE, error} }
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

export const GetResidentialAddress = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_RESIDENTIAL_ADDRESS, "GET", null, SystemConstant.HEADER, true);
        dispatch(request(consume));
    return consume
            .then(response => {
                dispatch(success(response.data));
                // history.push('/');
            })
            .catch(error => {
                // dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return {type: profile.GET_RESIDENTIAL_ADDRESS_PENDING, request} }
    function success(response) { return {type: profile.GET_RESIDENTIAL_ADDRESS_SUCCESS, response} }
    function failure(error) { return {type: profile.GET_RESIDENTIAL_ADDRESS_FAILURE, error} }
};

export const addResidentialAddress = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.POST_RESIDENTIAL_ADDRESS, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                // history.push('/');
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return {type: profile.POST_RESIDENTIAL_ADDRESS_PENDING, request} }
    function success(response) { return {type: profile.POST_RESIDENTIAL_ADDRESS_SUCCESS, response} }
    function failure(error) { return {type: profile.POST_RESIDENTIAL_ADDRESS_FAILURE, error} }
};


export const profileSuccessMessage = (data) =>{
    return (dispatch) => {
        dispatch(success(data));
        history.push('/profile/profile-success-message');
    }

    function success(data){
        return{
            type:"profile success message",
            data:data
        }
    }
}


























