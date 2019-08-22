import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {fundAccountConstants} from "../../constants/fund-account/fund-account.constant";
import {SystemConstant} from "../../../shared/constants";
import { modelStateErrorHandler } from "../../../shared/utils";
import { alertActions } from "../alert.actions";
import * as utils from "../../../shared/utils";


export const getCinemaList = (token) => {
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
                if(error.response.message){
                    dispatch(failure(error.response.message.toString()));
                }else{
                    dispatch(failure('We are unable to load banks.'));
                }
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return { type:FETCH_BANK_PENDING, request} }
    function success(response) { return {type:FETCH_BANK_SUCCESS, response} }
    function failure(error) { return {type:FETCH_BANK_FAILURE, error} }
};
