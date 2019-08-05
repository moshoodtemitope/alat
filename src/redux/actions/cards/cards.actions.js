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
                if(response.data.length>=1){
                    dispatch(success(response.data));
                }else{
                    let consume2 = ApiService.request(routes.FETCH_CUSTOMER_ACCOUNTS, "POST", null, SystemConstant.HEADER);
                    dispatch(request(consume2));
                    return consume2
                        .then(response2=>{
                            
                            let getLimitPayload = {
                                AccountNumber: response2.data[0].AccountNumber
                              };


                            let consume3 = ApiService.request(routes.GETLIMIT, "POST", getLimitPayload, SystemConstant.HEADER);
                            dispatch(request(consume3));
                            return consume3
                                .then(response3=>{
                                    // let result2  = Object.assign({}, response2.data[0], response3.data);

                                    let consume4 = ApiService.request(routes.GET_VC_EXCHENGE_RATE, "GET", null, SystemConstant.HEADER);
                                    dispatch(request(consume4));
                                    return consume4
                                        .then(response4=>{
                                            let result2  = Object.assign({}, response2.data[0], response3.data, response4.data);
                                            dispatch(success(result2));
                                        })
                                        .catch(error=>{
                                            if(error.response && typeof(error.response.message) !=="undefined"){
                                                dispatch(failure(error.response.message.toString()));
                                            }else{
                                                dispatch(failure('Unable to get exchange rates'));
                                            }
                                        })

                                    
                                })
                                .catch(error => {
                                    if(error.response && typeof(error.response.message) !=="undefined"){
                                        dispatch(failure(error.response.message.toString()));
                                    }else{
                                        dispatch(failure('Unable to load your transaction limits'));
                                    }
                                    // dispatch(failure(error.response.data.message.toString()));
                                });
                        })
                        .catch(error => {
                            if(error.response && typeof(error.response.message) !=="undefined"){
                                dispatch(failure(error.response.message.toString()));
                            }else{
                                dispatch(failure('Unable to load your account details'));
                            }
                            // dispatch(failure(error.response.data.message.toString()));
                        });
                }
                
            })
            .catch(error => {
                if(error.response && typeof(error.response.message) !=="undefined"){
                    dispatch(failure(error.response.message.toString()));
                }else{
                    dispatch(failure('Unable to load your dollar cards.'));
                }
                // dispatch(failure(error.response.data.message.toString()));
            });
    };

    function request(request) { return { type:FETCH_CURRENTCARD_PENDING, request} }
    function success(response) { return {type:FETCH_CURRENTCARD_SUCCESS, response} }
    function failure(error) { return {type:FETCH_CURRENTCARD_FAILURE, error} }
};