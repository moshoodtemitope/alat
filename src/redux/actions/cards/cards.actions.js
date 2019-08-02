import {SystemConstant} from "../../../shared/constants";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {history} from './../../../_helpers/history';
import { modelStateErrorHandler } from "../../../shared/utils";
import {
    FETCH_CURRENTCARD_SUCCESS,
    FETCH_CURRENTCARD_PENDING,
    FETCH_CURRENTCARD_FAILURE
} from "../../constants/cards/cards.constants";

export const getCurrentVirtualCard = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_CURRENT_VC, "POST", null, SystemConstant.HEADER);
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

    function request(request) { return { type:FETCH_CURRENTCARD_PENDING, request} }
    function success(response) { return {type:FETCH_CURRENTCARD_SUCCESS, response} }
    function failure(error) { return {type:FETCH_CURRENTCARD_FAILURE, error} }
};