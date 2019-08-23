import {SystemConstant} from "../../../shared/constants";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {history} from '../../../_helpers/history';
import { modelStateErrorHandler } from "../../../shared/utils";
import {
    LOADING_WESTERNUNION_COUNTRIES_SUCCESS,
    LOADING_WESTERNUNION_COUNTRIES_PENDING,
    LOADING_WESTERNUNION_COUNTRIES_FAILURE,
    RECEIVING_WESTERNUNION_SUCCESS,
    RECEIVING_WESTERNUNION_PENDING,
    RECEIVING_WESTERNUNION_FAILURE,
    WESTERNUNION_REDUCER_CLEAR
} from "../../constants/remittance/remittance.constants";


export const getWesternUnionCountries = (token)=>{
    SystemConstant.HEADER['alat-token'] = token;  

    return (dispatch)=>{
        let consume =  ApiService.request(routes.WESTERNUNION_COUNTRIES, "GET", null, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                // dispatch(success(response));

                let consume2 =  ApiService.request(routes.FETCH_CUSTOMER_ACCOUNTS, "POST", null, SystemConstant.HEADER); 
                dispatch(request(consume2));
                return consume2
                    .then(response2=>{
                        let westernunionData={
                            countries       :  response.data,
                            customerAccounts:  response2.data
                        };
                            
                        dispatch(success(westernunionData));
                    })
                    .catch(error=>{
                        if(error.response && typeof(error.response.message) !=="undefined"){
                            dispatch(failure(error.response.message.toString()));
                        }
                        else if(error.response!==undefined && ((error.response.data.Message) || (error.response.data.message))){
                            if(error.response.data.Message){
                                dispatch(failure(error.response.data.Message.toString()));
                            }

                            if(error.response!==undefined && error.response.data.message){
                                dispatch(failure(error.response.data.message.toString()));
                            }
                        }
                        else{
                            dispatch(failure('An error occured. Please try again '));
                        }
                    })
            })
            .catch(error=>{
                if(error.response && typeof(error.response.message) !=="undefined"){
                    dispatch(failure(error.response.message.toString()));
                }
                else if(error.response!==undefined && ((error.response.data.Message) || (error.response.data.message))){
                    if(error.response.data.Message){
                        dispatch(failure(error.response.data.Message.toString()));
                    }

                    if(error.response!==undefined && error.response.data.message){
                        dispatch(failure(error.response.data.message.toString()));
                    }
                }
                else{
                    dispatch(failure('An error occured. Please try again '));
                }
            })
    };
    
    function request(request) { return { type:LOADING_WESTERNUNION_COUNTRIES_PENDING, request} }
    function success(response) { return {type:LOADING_WESTERNUNION_COUNTRIES_SUCCESS, response} }
    function failure(error) { return {type:LOADING_WESTERNUNION_COUNTRIES_FAILURE, error} }
}

export const receiveWUMoney = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    let isCompleted =false;
    return (dispatch) =>{
        let consume = ApiService.request(routes.RECEIVE_WESTERNUNION, "POST", payload, SystemConstant.HEADER);
        
         
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
            })
            .catch(error =>{
                console.log('Error name is', error.response);
                
                if(error.response.data.ModelState){
                    dispatch(failure(modelStateErrorHandler(error)));
                }
                else if(error.response && typeof(error.response.message) !=="undefined"){
                    dispatch(failure(error.response.message.toString()));
                }
                else if((error.response.data.Message) || ((error.response.data.message))){
                    if(error.response.data.Message){
                        dispatch(failure(error.response.data.Message.toString()));
                    }

                    if(error.response.data.message){
                        dispatch(failure(error.response.data.message.toString()));
                    }
                }
                else{
                    dispatch(failure('An error occured. Please try again '));
                }
            })
    };

    function request(request) { return { type:RECEIVING_WESTERNUNION_PENDING, request} }
    function success(response) { return {type:RECEIVING_WESTERNUNION_SUCCESS, response} }
    function failure(error) { return {type:RECEIVING_WESTERNUNION_FAILURE, error} }
}

export const clearRemittanceStore =()=>{
    return (dispatch) => { 
        dispatch(clear());
    }
    function clear(){return {type: WESTERNUNION_REDUCER_CLEAR, clear_data: "" }}
}