import * as actionTypes from '../../constants/dataConstants/data.constant';

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
        dispatch(isFetchingTrue());
        let consume = ApiService.request(routes.FETCH_DATA_PLANS, "POST", data, SystemConstant.HEADER);
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
        type : actionTypes.FETCH_DATA_PLAN_SUCCESS,
        data: response
     } }
}

