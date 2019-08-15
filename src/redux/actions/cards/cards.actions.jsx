import {SystemConstant} from "../../../shared/constants";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {history} from '../../../_helpers/history';
import { modelStateErrorHandler } from "../../../shared/utils";
import {
    FETCH_CURRENTCARD_SUCCESS,
    FETCH_CURRENTCARD_PENDING,
    FETCH_CURRENTCARD_FAILURE,
    SEND_NEWVC_DATA_SUCCESS,
    SEND_NEWVC_DATA_PENDING,
    SEND_NEWVC_DATA_FAILURE,
    SEND_TOPUP_DATA_SUCCESS,
    SEND_TOPUP_DATA_PENDING,
    SEND_TOPUP_DATA_FAILURE
} from "../../constants/cards/cards.constants";

export const getCurrentVirtualCard = (token, source) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => { //Load any existing dollar cards
        let consume = ApiService.request(routes.GET_CURRENT_VC, "POST", null, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // if(response.data.length>=1){
                    // if(source==='new'){
                    //     history.push("/virtual-cards/topup");
                    // }
                    // dispatch(success(response.data));
                    
                // }else{
                //     if(source==='topup'){
                //         history.push("/virtual-cards");
                //     }
                    
                    let consume2 = ApiService.request(routes.FETCH_CUSTOMER_ACCOUNTS, "POST", null, SystemConstant.HEADER);
                    dispatch(request(consume2)); // Load customer Accounts
                    return consume2
                        .then(response2=>{
                            let getLimitPayload;
                            if(response2.data.length>=1){
                                 getLimitPayload = {
                                    AccountNumber: response2.data[0].AccountNumber
                                };
                            }

                            let consume3 = ApiService.request(routes.GETLIMIT, "POST", getLimitPayload, SystemConstant.HEADER);
                            dispatch(request(consume3)); // Get Customer transaction Limits
                            return consume3
                                .then(response3=>{
                                    // let result2  = Object.assign({}, response2.data[0], response3.data);

                                    let consume4 = ApiService.request(routes.GET_VC_EXCHENGE_RATE, "GET", null, SystemConstant.HEADER);
                                    dispatch(request(consume4)); // Get Exchange Rates
                                    return consume4
                                        .then(response4=>{
                                            let result2 
                                                if(response.data.length>=1){
                                                    // result2  = Object.assign({}, response2.data[0], response3.data, response4.data);
                                                    
                                                    // result2.virtualCardData = response.data[0];
                                                    
                                                    let consume5 =  ApiService.request(routes.VIRTUAL_CARD_ENCRYPTED_NUMBER, "GET", null, SystemConstant.HEADER);
                                                    dispatch(request(consume4)); // Get Encrypted Card Characters
                                                    return consume5
                                                        .then(response5=>{
                                                            result2={
                                                                virtualCardData:  response.data[0],
                                                                accountDetails :  response2.data[0],
                                                                accountLimits  :  response3.data,
                                                                exchangeRates  :  response4.data,
                                                                encryptedCharacters  :  response5.data
                                                            }
                                                            // result2.encryptedData = response5.data;
                                                            dispatch(success(result2));
                                                            history.push("/virtual-cards/topup");
                                                        })
                                                        .catch(error=>{
                                                            if(error.response && typeof(error.response.message) !=="undefined"){
                                                                dispatch(failure(error.response.message.toString()));
                                                            }else{
                                                                dispatch(failure('Unable to load your dollar card details'));
                                                            }
                                                        })

                                                   
                                                    
                                                }else{
                                                    result2  = Object.assign({}, response2.data[0], response3.data, response4.data);

                                                    dispatch(success(result2));
                                                    history.push("/virtual-cards");
                                                }
                                                
                                          
                                            
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
                // }
                
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

export const sendNewVirtualCardInfo = (newVirtualCardInfo, token, hasOtp)=>{
    SystemConstant.HEADER['alat-token'] = token;
    let isCompleted =false;
    return (dispatch) =>{
        let consume; 
        if(hasOtp===false){
            consume = ApiService.request(routes.CREAT_VIRTUAL_CARD_INITIAL, "POST", newVirtualCardInfo, SystemConstant.HEADER);
        }

        if(hasOtp===true){
            consume = ApiService.request(routes.CREAT_VIRTUAL_CARD_FINAL, "POST", newVirtualCardInfo, SystemConstant.HEADER);
        }
         
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response.data));
                if(hasOtp===true){
                    isCompleted = true;
                    history.push("/virtual-cards/fund-success");
                }else{
                    history.push("/virtual-cards/otp");
                }
                
            })
            .catch(error =>{
                if(error.response && typeof(error.response.message) !=="undefined"){
                    dispatch(failure(error.response.message.toString()));
                }
                // else if((error.response.data.Message) || ((error.response.data.message))){

                // }
                else{
                    dispatch(failure('An error occured. Please try again '));
                }
            })
    };

    function request(request) { return { type:SEND_NEWVC_DATA_PENDING, request} }
    function success(response) { return {type:SEND_NEWVC_DATA_SUCCESS, response, cardpayload: newVirtualCardInfo, isCompleted} }
    function failure(error) { return {type:SEND_NEWVC_DATA_FAILURE, error} }
}

export const topUpVirtualCard = (cardTopUpDetails, token, hasOtp)=>{
    SystemConstant.HEADER['alat-token'] = token;
    let isCompleted =false;
    return (dispatch) =>{
        let consume;
        if(hasOtp===false){
            consume = ApiService.request(routes.TOPUP_VIRTUAL_CARD_INITIAL, "POST", cardTopUpDetails, SystemConstant.HEADER);
        }

        if(hasOtp===true){
            consume = ApiService.request(routes.TOPUP_VIRTUAL_CARD_FINAL, "POST", cardTopUpDetails, SystemConstant.HEADER);
        }
        
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response.data));

                if(hasOtp===true){
                    isCompleted = true;
                    history.push("/virtual-cards/fund-success");
                }else{
                    history.push("/virtual-cards/otp");
                }
            })
            .catch(error =>{
                if(error.response && typeof(error.response.message) !=="undefined"){
                    dispatch(failure(error.response.message.toString()));
                }
                // else if((error.response.data.Message) || ((error.response.data.message))){

                // }
                else{
                    dispatch(failure('An error occured. Please try again '));
                }
            })
    };

    function request(request) { return { type:SEND_TOPUP_DATA_PENDING, request} }
    function success(response) { return {type:SEND_TOPUP_DATA_SUCCESS, response, cardpayload: cardTopUpDetails, isCompleted} }
    function failure(error) { return {type:SEND_TOPUP_DATA_FAILURE, error} }
}

// export const completeTopUpVirtualCard = (cardTopUpDetails, token)=>{
//     SystemConstant.HEADER['alat-token'] = token;
//     return (dispatch) =>{
//         let consume = ApiService.request(routes.TOPUP_VIRTUAL_CARD_FINAL, "POST", cardTopUpDetails, SystemConstant.HEADER);
//         dispatch(request(consume));
//         return consume
//             .then(response=>{
//                 dispatch(success(response.data));
//                 history.push("/virtual-cards/otp");
//             })
//             .catch(error =>{
//                 if(error.response && typeof(error.response.message) !=="undefined"){
//                     dispatch(failure(error.response.message.toString()));
//                 }
//                 // else if((error.response.data.Message) || ((error.response.data.message))){

//                 // }
//                 else{
//                     dispatch(failure('An error occured. Please try again '));
//                 }
//             })
//     };

//     function request(request) { return { type:SEND_TOPUP_DATA_PENDING, request} }
//     function success(response) { return {type:SEND_TOPUP_DATA_SUCCESS, response, cardpayload: cardTopUpDetails} }
//     function failure(error) { return {type:SEND_TOPUP_DATA_FAILURE, error} }
// }