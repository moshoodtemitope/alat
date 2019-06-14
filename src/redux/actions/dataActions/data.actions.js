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


export const switchCurrentComponent = (name) => {
    return{
        type: actionTypes.SWITCH_CURRENT_COMPONENT,
        name: name
    };
};

export const fetchDataBeneficiaries = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_DATA_BENEFICIARIES, "POST", data, SystemConstant.HEADER);
        return consume
            .then(response => {
                console.log(response.data);
                console.log("response.data");
                dispatch(success(response.data));
            })
            .catch(error => {
                // dispatch(failure(error.response.data.message.toString()));
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