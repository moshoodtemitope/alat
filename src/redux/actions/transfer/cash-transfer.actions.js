import {SystemConstant} from "../../../shared/constants";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {
    FETCH_BANK_FAILURE,
    FETCH_BANK_SUCCESS,
    FETCH_BANK_PENDING,
    FETCH_TRANSFER_BENEFICIARY_PENDING,
    FETCH_TRANSFER_BENEFICIARY_SUCCESS,
    FETCH_TRANSFER_BENEFICIARY_FAILURE,
    GET_ACCOUNT_DETAILS_PENDING, GET_ACCOUNT_DETAILS_SUCCESS, GET_ACCOUNT_DETAILS_FAILURE
} from "../../constants/transfer.constants";

export const getBanks = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.BANK_LIST, "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                if(error.response){
                    dispatch(failure(error.response.message.toString()));
                }else{
                    dispatch(failure('We are unable to load your beneficiaries.'));
                }
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return { type:FETCH_BANK_PENDING, request} }
    function success(response) { return {type:FETCH_BANK_SUCCESS, response} }
    function failure(error) { return {type:FETCH_BANK_FAILURE, error} }
};


export const getBeneficiaries = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_TRANSFER_BENEFICIARIES, "POST", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.error(response);
                dispatch(success(response));
            })
            .catch(error => {
                console.error('was here', error);
                if(error.response){
                    dispatch(failure(error.response.message.toString()));
                }else{
                    dispatch(failure('We are unable to load your beneficiaries.'));
                }
                
            });
    };

    function request(request) { return { type:FETCH_TRANSFER_BENEFICIARY_PENDING, request} }
    function success(response) { return {type:FETCH_TRANSFER_BENEFICIARY_SUCCESS, response} }
    function failure(error) { return {type:FETCH_TRANSFER_BENEFICIARY_FAILURE, error} }
};

export const accountEnquiry = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_ACCOUNT_DETAILS, "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // callback();
                dispatch(success(response.data));
            })
            .catch(error => {
                if(error.response.message){
                    dispatch(failure(error.response.message.toString()));
                }else{
                    dispatch(failure('We are unable to get recipient details.'));
                }
            });
    };

    function request(request) { return { type:GET_ACCOUNT_DETAILS_PENDING, request} }
    function success(response) { return {type:GET_ACCOUNT_DETAILS_SUCCESS, response} }
    function failure(error) { return {type:GET_ACCOUNT_DETAILS_FAILURE, error} }
};