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
    SEND_TOPUP_DATA_FAILURE,
    FETCH_CARD_DATA_SUCCESS,
    FETCH_CARD_DATA_PENDING,
    FETCH_CARD_DATA_FAILURE,
    LIQUIDATE_CARD_SUCCESS,
    LIQUIDATE_CARD_PENDING,
    LIQUIDATE_CARD_FAILURE,
    DELETE_VIRTUALCARD_SUCCESS,
    DELETE_VIRTUALCARD_PENDING,
    DELETE_VIRTUALCARD_FAILURE,
    GET_VIRTUALCARD_HISTORY_SUCCESS,
    GET_VIRTUALCARD_HISTORY_PENDING,
    GET_VIRTUALCARD_HISTORY_FAILURE,
    CHANGEACTIVESTATUS_VIRTUAL_SUCCESS,
    CHANGEACTIVESTATUS_VIRTUAL_PENDING,
    CHANGEACTIVESTATUS_VIRTUAL_FAILURE,
    GETCURRENT_ATMCARD_SUCCESS,
    GETCURRENT_ATMCARD_PENDING,
    GETCURRENT_ATMCARD_FAILURE,
    GET_ATMCARD_HOTLISTREASONS_SUCCESS,
    GET_ATMCARD_HOTLISTREASONS_PENDING,
    GET_ATMCARD_HOTLISTREASONS_FAILURE,
    HOTLIST_ATMCARD_SUCCESS,
    HOTLIST_ATMCARD_PENDING,
    HOTLIST_ATMCARD_FAILURE,
    GETRANDOM_SECURITYQUESTION_SUCCESS,
    GETRANDOM_SECURITYQUESTION_PENDING,
    GETRANDOM_SECURITYQUESTION_FAILURE,
    VALIDATE_SECURITYQUESTION_WITHOUTOTP_SUCCESS,
    VALIDATE_SECURITYQUESTION_WITHOUTOTP_PENDING,
    VALIDATE_SECURITYQUESTION_WITHOUTOTP_FAILURE,
    ACTIVATE_ALATCARD_SUCCESS,
    ACTIVATE_ALATCARD_PENDING,
    ACTIVATE_ALATCARD_FAILURE,
    GETALAT_CARDSETTINGS_SUCCESS,
    GETALAT_CARDSETTINGS_PENDING,
    GETALAT_CARDSETTINGS_FAILURE,
    UPDATEALAT_CARDSETTINGS_SUCCESS,
    UPDATEALAT_CARDSETTINGS_PENDING,
    UPDATEALAT_CARDSETTINGS_FAILURE,
    LOADING_INFOFOR_CARDREQUEST_SUCCESS,
    LOADING_INFOFOR_CARDREQUEST_PENDING,
    LOADING_INFOFOR_CARDREQUEST_FAILURE,
    REQUESTINGOTP_FOR_CARDREQUEST_SUCCESS,
    REQUESTINGOTP_FOR_CARDREQUEST_PENDING,
    REQUESTINGOTP_FOR_CARDREQUEST_FAILURE,
    POSTINGDATA_FOR_CARDREQUEST_SUCCESS,
    POSTINGDATA_FOR_CARDREQUEST_PENDING,
    POSTINGDATA_FOR_CARDREQUEST_FAILURE,
    ALATCARD_REDUCER_CLEAR
} from "../../constants/cards/cards.constants";

//VIRTUAL CARD ACTIONS
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
                                                                virtualCardData     :  response.data[0],
                                                                accountDetails      :  response2.data[0],
                                                                accountLimits       :  response3.data,
                                                                exchangeRates       :  response4.data,
                                                                customerAccounts    :  response2.data,
                                                                encryptedCharacters :  response5.data
                                                            }
                                                            // result2.encryptedData = response5.data;
                                                            dispatch(success(result2));
                                                            if(source==="new"){
                                                                history.push("/virtual-cards/topup");
                                                            }
                                                           
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
                
                if(hasOtp===true){
                    isCompleted = true;
                    dispatch(success(response.data));
                    history.push("/virtual-cards/fund-success");
                }else{
                    dispatch(success(response.data));
                    history.push("/virtual-cards/otp");
                }
                
            })
            .catch(error =>{
                console.log('Error name is', error.response);
                if(error.response && typeof(error.response.message) !=="undefined"){
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

    function request(request) { return { type:SEND_NEWVC_DATA_PENDING, request} }
    function success(response) { return {type:SEND_NEWVC_DATA_SUCCESS, response, cardpayload: newVirtualCardInfo, isCompleted} }
    function failure(error) { return {type:SEND_NEWVC_DATA_FAILURE, error, hasOtp, cardpayload: newVirtualCardInfo, isCompleted} }
}

export const topUpVirtualCard = (cardTopUpDetails, token, hasOtp)=>{
    SystemConstant.HEADER['alat-token'] = token;
    let isCompleted =false;
    return (dispatch) =>{
        let consume;
        if(hasOtp===false){
            if(cardTopUpDetails.hasOwnProperty('OTP')){
                delete cardTopUpDetails.OTP;
            }
            consume = ApiService.request(routes.TOPUP_VIRTUAL_CARD_INITIAL, "POST", cardTopUpDetails, SystemConstant.HEADER);
        }

        if(hasOtp===true){
            consume = ApiService.request(routes.TOPUP_VIRTUAL_CARD_FINAL, "POST", cardTopUpDetails, SystemConstant.HEADER);
        }
        
        dispatch(request(consume));
        
        return consume
            .then(response=>{
                
                
                if(hasOtp===true){
                    isCompleted = true;
                    dispatch(success(response))
                    history.push("/virtual-cards/fund-success");
                }else{
                    dispatch(success(response))
                    history.push("/virtual-cards/otp");
                }
            })
            .catch(error =>{
                console.log('log is', error.response);
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

    function request(request) { return { type:SEND_TOPUP_DATA_PENDING, request} }
    function success(response) { return {type:SEND_TOPUP_DATA_SUCCESS, response, hasOtp, cardpayload: cardTopUpDetails, isCompleted} }
    function failure(error) { return {type:SEND_TOPUP_DATA_FAILURE, error, hasOtp, cardpayload: cardTopUpDetails, isCompleted} }
}

export const getVirtualDetails = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;  
    return (dispatch)=>{
        let consume =  ApiService.request(routes.GET_SINGLE_VC, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type:FETCH_CARD_DATA_PENDING, request} }
    function success(response) { return {type:FETCH_CARD_DATA_SUCCESS, response} }
    function failure(error) { return {type:FETCH_CARD_DATA_FAILURE, error} }
}

export const liquidateVirtualCard = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;  
    return (dispatch)=>{
        let consume =  ApiService.request(routes.LIQUIDATE_VIRTUAL_CARD, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type: LIQUIDATE_CARD_PENDING, request} }
    function success(response) { return {type: LIQUIDATE_CARD_SUCCESS, response} }
    function failure(error) { return {type: LIQUIDATE_CARD_FAILURE, error} }
}

export const changeVirtualCardActiveStatus = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;  
    return (dispatch)=>{
        let consume =  ApiService.request(routes.VIRTUAL_CARD_CHANGE_STATE, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                
                dispatch(success(response));
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
    
    function request(request) { return { type: CHANGEACTIVESTATUS_VIRTUAL_PENDING, request} }
    function success(response) { return {type: CHANGEACTIVESTATUS_VIRTUAL_SUCCESS, response} }
    function failure(error) { return {type: CHANGEACTIVESTATUS_VIRTUAL_FAILURE, error} }
}

export const deleteAlatVirtualCard = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;  
    return (dispatch)=>{
        let consume =  ApiService.request(routes.DELETE_VIRTUAL_CARD, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type: DELETE_VIRTUALCARD_PENDING, request} }
    function success(response) { return {type: DELETE_VIRTUALCARD_SUCCESS, response} }
    function failure(error) { return {type: DELETE_VIRTUALCARD_FAILURE, error} }
}

export const getCurrentVirtualCardHistory = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;  
    let queriedRoute = `${routes.VIRTUAL_CARD_HISTORY}${payload}`;
    return (dispatch)=>{
        let consume =  ApiService.request(queriedRoute, "GET", null, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type:GET_VIRTUALCARD_HISTORY_PENDING, request} }
    function success(response) { return {type:GET_VIRTUALCARD_HISTORY_SUCCESS, response} }
    function failure(error) { return {type:GET_VIRTUALCARD_HISTORY_FAILURE, error} }
}


//ATM CARD ACTIONS
export const getCurrentATMCard = (token)=>{
    SystemConstant.HEADER['alat-token'] = token;  

    return (dispatch)=>{
        let consume =  ApiService.request(routes.GET_PANS, "GET", null, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type:GETCURRENT_ATMCARD_PENDING, request} }
    function success(response) { return {type:GETCURRENT_ATMCARD_SUCCESS, response} }
    function failure(error) { return {type:GETCURRENT_ATMCARD_FAILURE, error} }
}

export const getATMCardHotlistReasons = (token)=>{
    SystemConstant.HEADER['alat-token'] = token;  

    return (dispatch)=>{
        let consume =  ApiService.request(routes.HOTLIST_CARD_REASONS, "GET", null, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type:GET_ATMCARD_HOTLISTREASONS_PENDING, request} }
    function success(response) { return {type:GET_ATMCARD_HOTLISTREASONS_SUCCESS, response} }
    function failure(error) { return {type:GET_ATMCARD_HOTLISTREASONS_FAILURE, error} }
}

export const hotlistATMCard = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;  

    return (dispatch)=>{
        let consume =  ApiService.request(routes.HOTLIST_CARD, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type: HOTLIST_ATMCARD_PENDING, request} }
    function success(response) { return {type: HOTLIST_ATMCARD_SUCCESS, response} }
    function failure(error) { return {type: HOTLIST_ATMCARD_FAILURE, error} }
}

export const getRandomSecurityQuestion = (token)=>{
    SystemConstant.HEADER['alat-token'] = token;  

    return (dispatch)=>{
        let consume =  ApiService.request(routes.GETRANDOMSECURITYQUESTION, "GET", null, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type:GETRANDOM_SECURITYQUESTION_PENDING, request} }
    function success(response) { return {type:GETRANDOM_SECURITYQUESTION_SUCCESS, response} }
    function failure(error) { return {type:GETRANDOM_SECURITYQUESTION_FAILURE, error} }
}

export const answerRandomSecurityQuestion = (payload,token)=>{
    SystemConstant.HEADER['alat-token'] = token;  

    return (dispatch)=>{
        let consume =  ApiService.request(routes.VERIFY_SECURITY_QUESTION, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type:VALIDATE_SECURITYQUESTION_WITHOUTOTP_PENDING, request} }
    function success(response) { return {type:VALIDATE_SECURITYQUESTION_WITHOUTOTP_SUCCESS, response} }
    function failure(error) { return {type:VALIDATE_SECURITYQUESTION_WITHOUTOTP_FAILURE, error} }
}

export const activateALATCard = (payload,token)=>{
    SystemConstant.HEADER['alat-token'] = token;  

    return (dispatch)=>{
        let consume =  ApiService.request(routes.ACTIVATE_CARD, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type:ACTIVATE_ALATCARD_PENDING, request} }
    function success(response) { return {type:ACTIVATE_ALATCARD_SUCCESS, response} }
    function failure(error) { return {type:ACTIVATE_ALATCARD_FAILURE, error} }
}

export const getALATCardSettings = (token)=>{
    SystemConstant.HEADER['alat-token'] = token;  

    return (dispatch)=>{
        let consume =  ApiService.request(routes.GET_PANS, "GET", null, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                if(response.data.length>=1){
                    let consume2 = ApiService.request(routes.GET_CARD_EXISTING_SETTINGS, "GET", SystemConstant.HEADER); 
                    
                    dispatch(request(consume2))
                    return consume2
                        .then(response2=>{
                            let panNum = response.data[0].maskedPan.replace(/\*/g, '');
                            let consume3 = ApiService.request(routes.GET_CARD_CONTROL_SETTINGS, "POST", {pan:panNum}, SystemConstant.HEADER); 
        
                            dispatch(request(consume3))
                            return consume3
                                .then(response3=>{
                                    let bulkResponse={
                                            panDetails              : response.data[0],
                                            cardControlSettings     : response2.data,
                                            otherCardControlDetails : response3.data
                                    }
                                    dispatch(success(bulkResponse));
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
                }
                else{
                    let bulkResponse={
                        panDetails : null
                    }
                    dispatch(success(bulkResponse));
                }
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
    
    function request(request) { return { type:GETALAT_CARDSETTINGS_PENDING, request} }
    function success(response) { return {type:GETALAT_CARDSETTINGS_SUCCESS, response} }
    function failure(error) { return {type:GETALAT_CARDSETTINGS_FAILURE, error} }
}

export const updateALATCardSettings = (payload,token)=>{
    SystemConstant.HEADER['alat-token'] = token;  

    return (dispatch)=>{
        let consume =  ApiService.request(routes.UPDATE_CARD_CONTROL, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
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
    
    function request(request) { return { type:UPDATEALAT_CARDSETTINGS_PENDING, request} }
    function success(response) { return {type:UPDATEALAT_CARDSETTINGS_SUCCESS, response} }
    function failure(error) { return {type:UPDATEALAT_CARDSETTINGS_FAILURE, error} }
}

export const loadInfoForCardRequest = (token)=>{
    SystemConstant.HEADER['alat-token'] = token; 
    
    return(dispatch)=>{
        let consume =  ApiService.request(routes.GETCUSTOMERINFO, "GET", null, SystemConstant.HEADER); 
        dispatch(request(consume));

        return consume
            .then(response=>{
                    let consume2 =  ApiService.request(routes.GETCARDDESIGN, "GET", null, SystemConstant.HEADER); 
                    dispatch(request(consume2));
                    return consume2
                        .then(response2=>{
                            if(response.data.customerCardIds.length===0){
                            // if(response.data.customerCardIds.length!==0){ //To be removed
                                // call get debittable accounts 
                                let consume4 =  ApiService.request(routes.GETALLACCOUNTS, "GET", null, SystemConstant.HEADER); 
                                dispatch(request(consume4));
                                return consume4
                                    .then(response4=>{
                                        // let infoForNewCard;

                                        // infoForNewCard = {
                                        //     allCardDesigns  : response2.data,
                                        //     customerAccounts: response4.data
                                        // }
                                        // dispatch(success(infoForNewCard));

                                        // Get States and LGAs
                                        let consume6 =  ApiService.request(routes.GETSTATES, "GET", null, SystemConstant.HEADER); 
                                        dispatch(request(consume6));
                                            return consume6
                                                .then(response6=>{
                                                    let existingcardDetails;

                                                    existingcardDetails = {
                                                        allCardDesigns  : response2.data,
                                                        customerAccounts: response4.data,
                                                        statesData      : response6.data.States,
                                                        citiesData      : response6.data.Cities,
                                                    }
                                                   
                                                    dispatch(success(existingcardDetails));
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
                                            dispatch(failure('An error occured loading your account(s) details. Please try again '));
                                        }
                                    })
                                    
                            }else{
                                // call get pans
                                let consume3 =  ApiService.request(routes.GET_PANS, "GET", null, SystemConstant.HEADER); 
                                dispatch(request(consume3));
                                return consume3
                                    .then(response3=>{


                                        let existingcardDetails;

                                        if(response3.data.length>=1){
                                            existingcardDetails = {
                                                cardDesignId    : response.data.customerCardIds,
                                                allCardDesigns  : response2.data,
                                                pans            : response3.data,
                                            }
                                        }else{
                                            existingcardDetails = {
                                                cardDesignId    : response.data.customerCardIds,
                                                allCardDesigns  : response2.data,
                                                pans            :null
                                            }
                                        }
                                        dispatch(success(existingcardDetails));

                                        /// Section To be deleted after test

                                            // Get customer accounts
                                        // let consume5 =  ApiService.request(routes.GETALLACCOUNTS, "GET", null, SystemConstant.HEADER); 
                                        // dispatch(request(consume5));
                                        // return consume5
                                        //     .then(response5=>{

                                        //         // Get States and LGAs
                                        //         let consume6 =  ApiService.request(routes.GETSTATES, "GET", null, SystemConstant.HEADER); 
                                        //         dispatch(request(consume6));
                                        //             return consume6
                                        //                 .then(response6=>{
                                        //                     let existingcardDetails;

                                        //                     if(response3.data.length>=1){
                                        //                         existingcardDetails = {
                                        //                             cardDesignId    : response.data.customerCardIds,
                                        //                             allCardDesigns  : response2.data,
                                        //                             pans            : response3.data,
                                        //                             customerAccounts: response5.data,
                                        //                             statesData      : response6.data.States,
                                        //                             citiesData      : response6.data.Cities,
                                        //                         }
                                        //                     }else{
                                        //                         existingcardDetails = {
                                        //                             cardDesignId    : response.data.customerCardIds,
                                        //                             allCardDesigns  : response2.data,
                                        //                             pans            :null,
                                        //                             customerAccounts: response5.data,
                                        //                             statesData      : response6.data.States,
                                        //                             citiesData      : response6.data.Cities,
                                        //                         }
                                        //                     }
                                        //                     dispatch(success(existingcardDetails));
                                        //                 })
                                        //                 .catch(error=>{
                                        //                     if(error.response && typeof(error.response.message) !=="undefined"){
                                        //                         dispatch(failure(error.response.message.toString()));
                                        //                     }
                                        //                     else if(error.response!==undefined && ((error.response.data.Message) || (error.response.data.message))){
                                        //                         if(error.response.data.Message){
                                        //                             dispatch(failure(error.response.data.Message.toString()));
                                        //                         }
                                            
                                        //                         if(error.response!==undefined && error.response.data.message){
                                        //                             dispatch(failure(error.response.data.message.toString()));
                                        //                         }
                                        //                     }
                                        //                     else{
                                        //                         dispatch(failure('An error occured. Please try again '));
                                        //                     }
                                        //                 })

                                                
                                        //     })
                                        //     .catch(error=>{
                                        //         if(error.response && typeof(error.response.message) !=="undefined"){
                                                    
                                        //             dispatch(failure(error.response.message.toString()));
                                        //         }
                                        //         else if(error.response!==undefined && ((error.response.data.Message) || (error.response.data.message))){
                                        //             if(error.response.data.Message){
                                                       
                                        //                 dispatch(failure(error.response.data.Message.toString()));
                                        //             }
                                
                                        //             if(error.response!==undefined && error.response.data.message){
                                        //                 if(error.response.data.message.toString().indexOf('You already have an active card')>-1){
                                        //                     console.log('hadddddd');
                                        //                 }
                                        //                 dispatch(failure(error.response.data.message.toString()));
                                        //             }
                                        //         }
                                        //         else{
                                        //             dispatch(failure('An error occured loading your accounts details. Please try again '));
                                        //         }
                                        //     })

                                        /// To be deleted after test
                                       
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
                                            dispatch(failure('An error occured loading your ATM card details. Please try again '));
                                        }
                                    })

                                    
                            }
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
                                dispatch(failure('An error occured loading your card design. Please try again '));
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


    function request(request) { return { type:LOADING_INFOFOR_CARDREQUEST_PENDING, request} }
    function success(response) { return {type:LOADING_INFOFOR_CARDREQUEST_SUCCESS, response} }
    function failure(error) { return {type:LOADING_INFOFOR_CARDREQUEST_FAILURE, error} }
}

export const requestOtpForNewATMCard = (payload, token, newCardRequestData)=>{
    SystemConstant.HEADER['alat-token'] = token; 
    
    return(dispatch)=>{
        let consume =  ApiService.request(routes.GET_OTP_FOR_CUSTOMER, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
                history.push("/cards/cardrequest-otp");
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

    function request(request) { return { type:REQUESTINGOTP_FOR_CARDREQUEST_PENDING, request} }
    function success(response) { return {type:REQUESTINGOTP_FOR_CARDREQUEST_SUCCESS, response, payload, newCardRequestData} }
    function failure(error) { return {type:REQUESTINGOTP_FOR_CARDREQUEST_FAILURE, error} }
}

export const postDataForNewATMCard = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token; 
    
    return(dispatch)=>{
        let consume =  ApiService.request(routes.SAVECARD, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{
                dispatch(success(response));
                history.push("/cards/cardrequest-success");
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

    function request(request) { return { type:POSTINGDATA_FOR_CARDREQUEST_PENDING, request} }
    function success(response) { return {type:POSTINGDATA_FOR_CARDREQUEST_SUCCESS, response} }
    function failure(error) { return {type:POSTINGDATA_FOR_CARDREQUEST_FAILURE, error} }
}


export const clearCardsStore =()=>{
    return (dispatch) => { 
        dispatch(clear());
    }
    function clear(){return {type: ALATCARD_REDUCER_CLEAR, clear_data: "" }}
}