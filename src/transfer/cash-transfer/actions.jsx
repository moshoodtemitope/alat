import {SystemConstant} from "../../shared/constants";
import {ApiService} from "../../shared/apiService";
import {routes} from "../../shared/urls";
import {userConstants} from "../../_constants";

const user = JSON.parse(localStorage.getItem("user"));

export const FETCH_BANK_SUCCESS = 'FETCH_BANK_SUCCESS';
export const FETCH_BANK_PENDING = 'FETCH_BANK_PENDING';
export const FETCH_BANK_FAILURE = 'FETCH_BANK_FAILURE';

export const getBanks = () => {
    SystemConstant.HEADER['alat-token'] = user.token;
    return (dispatch) => {
        let consume = ApiService.request(routes.BANK_LIST, "GET", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return { type:FETCH_BANK_PENDING, request} }
    function success(response) { return {type:FETCH_BANK_SUCCESS, response} }
    function failure(error) { return {type:FETCH_BANK_FAILURE, error} }
};