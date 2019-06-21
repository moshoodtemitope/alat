import * as actionTypes from '../../constants/dataConstants/data.constant';

import {alertActions} from "../alert.actions";
import {handleError, modelStateErrorHandler} from './../../../shared/utils';
import {SystemConstant} from "../../../shared/constants";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";


//Utility
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};
//Utiliy End


// export const switchCurrentComponent = (name) => {
//     return{
//         type: actionTypes.SWITCH_CURRENT_COMPONENT,
//         name: name
//     };
// };

export const isFetchingTrue = () => {
    return {
        type: actionTypes.IS_FETCHING_TRUE
    }
}

export const isFetchingFalse = () => {
    return {
        type: actionTypes.IS_FETCHING_FALSE
    }
}

export const fetchDataBeneficiaries = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.FETCH_DATA_BENEFICIARIES, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(success(response.data));
            })
            .catch(error => {
                // dispatch(failure(error.response.data.message.toString()));
                dispatch(isFetchingFalse());
                console.log(error);
            });
    };

    // function request(request) { return { 
        
    //  } }
    function success(response) { return { 
        type : actionTypes.FETCH_DATA_BENEFICIARIES_SUCCESS,
        data: response
     } }
};

export const deleteDataBeneficiary =  (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.DELETE_DATA_BENEFICIARY, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(fetchDataBeneficiaries(token));
            })
            .catch(error => {
                //handle error
                // dispatch(failure(error.response.data.message.toString()));
                dispatch(isFetchingFalse());
                console.log(error);
            });
    };
    
    // function failure(response) { return { 
    //     type : actionTypes.DELETE_DATA_BENEFICIARY_SUCCESS,
    //     data: response
    //  } }
}

export const fetchDataPlans = (token, data) => {
    
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(status());
        let consume = ApiService.request(routes.FETCH_DATA_PLANS, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(success(response.data));
                dispatch(status())
            })
            .catch(error => {
                // dispatch(failure(error.response.data.message.toString()));
                dispatch(isFetchingFalse());
                dispatch(status())
                console.log(error);
            });
    };

    // function request(request) { return { 
        
    //  } }
    function status() { return { 
        type : actionTypes.IS_FETCHING_DATA,
     } }
    function success(response) { return { 
        type : actionTypes.FETCH_DATA_PLAN_SUCCESS,
        data: response
     } }
}

export const setDataTransactionDetails = (dataDetails, networkName) => {
    return{
        type : actionTypes.SET_DATA_TRANSACTION_DETAILS,
        data : dataDetails,
        network: networkName
    }
}

export const fetchDebitableAccounts = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_DEBITABLE_ACCOUNTS, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(success(response.data));
            })
            .catch(error => {
                // dispatch(failure(error.response.data.message.toString()));
                dispatch(isFetchingFalse());
                console.log(error);
            });
    };

    function success(response) { return { 
        type : actionTypes.FETCH_DEBITABLE_ACCOUNTS_SUCCESS,
        data: response
     } }
}

export const pinVerificationStart = (token, data) => {
    console.log("is verifying pin");
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        dispatch(isFetchingTrue());
        console.log("is treuly fetching pin");
        let consume = ApiService.request(routes.PIN_VERIFICATION, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                dispatch(isFetchingFalse());
                if(response.data.Response == 0){
                    dispatch(correctPin())
                }
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                dispatch(isFetchingFalse());
                console.log(error);
            });

            
    };

    function correctPin() {
        return {
            type: actionTypes.PIN_VERIFICATION_CORRECT
        }
    }


    // function success(response) { return { 
    //     type : actionTypes.FETCH_DEBITABLE_ACCOUNTS_SUCCESS,
    //     data: response
    //  } }
}

export const pinVerificationTryAgain = () => {
    return {
        type : actionTypes.PIN_VERIFICATION_TRY_AGAIN
    }
}