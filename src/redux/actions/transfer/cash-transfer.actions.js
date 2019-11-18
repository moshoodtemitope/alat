import {SystemConstant} from "../../../shared/constants";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {history} from './../../../_helpers/history';
import { modelStateErrorHandler } from "../../../shared/utils";
import {
    FETCH_BANK_FAILURE,
    FETCH_BANK_SUCCESS,
    FETCH_BANK_PENDING,
    FETCH_TRANSFER_BENEFICIARY_PENDING,
    FETCH_TRANSFER_BENEFICIARY_SUCCESS,
    FETCH_TRANSFER_BENEFICIARY_FAILURE,
    DELETE_TRANSFER_BENEFICIARY_PENDING,
    DELETE_TRANSFER_BENEFICIARY_SUCCESS,
    DELETE_TRANSFER_BENEFICIARY_FAILURE,
    TRANSFER__BANK_DETAILS,
    TRANSFER__BANK_DETAILS_FAILURE,
    TRANSFER__BANK_DETAILS_SUCCESS,
    GET_ACCOUNT_DETAILS_PENDING, 
    GET_ACCOUNT_DETAILS_SUCCESS, 
    GET_ACCOUNT_DETAILS_FAILURE,
    GET_TRANSACTION_LIMIT_PENDING, 
    GET_TRANSACTION_LIMIT_SUCCESS, 
    GET_TRANSACTION_LIMIT_FAILURE,
    GET_BANKCHARGES_PENDING,
    GET_BANKCHARGES_SUCCESS, 
    GET_BANKCHARGES_FAILURE,
    SENDBANK_TRANSFER_PENDING, 
    SENDBANK_TRANSFER_SUCCESS, 
    SENDBANK_TRANSFER_FAILURE,
    PROCESS_TRANSFER_PENDING, 
    PROCESS_TRANSFER_SUCCESS, 
    PROCESS_TRANSFER_FAILURE,
    SENDER__BANK_DETAILS,
    TRANSFER_REDUCER_CLEAR,
    SAVE_TRANSFER_BENEFICIARY_PENDING,
    SAVE_TRANSFER_BENEFICIARY_SUCCESS,
    SAVE_TRANSFER_BENEFICIARY_FAILURE
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

export const deleteTransferBeneficiary = (token, beneficiaryToDelete, callback) => {
    SystemConstant.HEADER['alat-token'] = token;
    
    return (dispatch) => {
        let consume = ApiService.request(routes.DELETE_TRANSFER_BENEFICIARIES, "POST", beneficiaryToDelete, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
                .then(response=>{
                    dispatch(success(response.data));
                    return response;
                })
                .catch(error => {
                    // dispatch(failure(modelStateErrorHandler(error)));
                //    dispatch(alertActions.error(modelStateErrorHandler(error)));
                    // throw(error);
                    if(error.response){
                        dispatch(failure(error.response.message.toString()));
                    }else{
                        dispatch(failure('We are unable to delete your beneficiary.'));
                    }
                });
    }

    function request(request) { return { type:DELETE_TRANSFER_BENEFICIARY_PENDING, request} }
    function success(response) { return {type:DELETE_TRANSFER_BENEFICIARY_SUCCESS, response} }
    function failure(error) { return {type:DELETE_TRANSFER_BENEFICIARY_FAILURE, error} }
}

export const cashTransferData = (transferDetails,isFxTransfer,token) =>{
    // if(isTransfer===true){
    //     SystemConstant.HEADER['alat-token'] = token;
    //     return(dispatch)=>{
    //         let consume = ApiService.request(routes.INTERBANK_CHARGES, "GET", SystemConstant.HEADER);
    //             dispatch(request(consume));
    //             return consume
    //                     .then(response=>{
    //                         let result  = Object.assign({}, ...response.data, transferDetails)
    //                         dispatch(success(result));
    //                         this.props.history.push("/transfer/provide-details");
    //                     })
    //                     .catch(error=>{
    //                         console.log('bank error is', error.response);
    //                         if(error.response && error.response.data.Message){
    //                             dispatch(failure(error.response.data.Message.toString()));
    //                         }else{
                                
    //                             dispatch(failure('Unable to proceed.'));
    //                         }
    //                     })
    //     }
    // }else{
    //     return(dispatch)=>{
    //         dispatch(success(transferDetails));
    //         history.push("/transfer/provide-details");
    //     }
        
    // }

    return(dispatch)=>{
        dispatch(request(transferDetails));
        if(isFxTransfer ===false){
            // console.log('bank transfer');
            history.push("/transfer/provide-details");
        }else{
            // console.log('FX transfer');
            history.push("/fx-transfer/provide-details");
        }
       
    }
    
    function request(data) { return { type: TRANSFER__BANK_DETAILS, data } }
    function success(response) { return { type: TRANSFER__BANK_DETAILS_SUCCESS, response } }
    function failure(error) { return { type: TRANSFER__BANK_DETAILS_FAILURE, error } }
}

export const senderTransferData = (senderTansferDetails) =>{
    return(dispatch)=>dispatch(request(senderTansferDetails));
    function request(data) { return { type: SENDER__BANK_DETAILS, data } }
}

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
                if(error.response.message){
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


export const getTransactionLimit = (token, accountNumber) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GETLIMIT, "POST", {AccountNumber: accountNumber}, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.error(response);
                dispatch(success(response));
            })
            .catch(error => {
                console.error('was here', error);
                if(error.response.message){
                    dispatch(failure(error.response.message.toString()));
                }else{
                    dispatch(failure('An error while getting your transaction limit.'));
                }
                
            });
    };

    function request(request) { return { type:GET_TRANSACTION_LIMIT_PENDING, request} }
    function success(response) { return {type:GET_TRANSACTION_LIMIT_SUCCESS, response} }
    function failure(error) { return {type:GET_TRANSACTION_LIMIT_FAILURE, error} }
};

export const getBankTransferCharges = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.INTERBANK_CHARGES, "GET", SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.error(response);
                dispatch(success(response));
            })
            .catch(error => {
                
                if((error.response.data.Message)){
                    dispatch(failure(error.response.data.Message.toString()));
                }
                else if(error.response.message){
                    dispatch(failure(error.response.message.toString()));
                }
                    
                else if(error.response.data.ModelState){
                        dispatch(failure(modelStateErrorHandler(error)));
                }
                else{
                    dispatch(failure('Unable to get bank charges'));
                }
                
            });
    };

    function request(request) { return { type:GET_BANKCHARGES_PENDING, request} }
    function success(response) { return {type:GET_BANKCHARGES_SUCCESS, response} }
    function failure(error) { return {type:GET_BANKCHARGES_FAILURE, error} }
};

export const accountEnquiry = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => { 
        //  INTERBANK_CHARGES
        if(Object.getOwnPropertyNames(data).length === 0){
            dispatch(failure(''));
        }else if(data.AccountNumber===""){
            dispatch(failure('Account number required'));
        }else if(data.AccountNumber.length <10){
            dispatch(failure('Valid account number required'));
        }else if(data.BankCode.length ===""){
            dispatch(failure('Select recipient bank'));
        }else{
        let consume = ApiService.request(routes.INTERBANK_CHARGES, "GET", SystemConstant.HEADER);
        // let consume = ApiService.request(routes.FETCH_ACCOUNT_DETAILS, "POST", data, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                // callback();
                let consume2 = ApiService.request(routes.FETCH_ACCOUNT_DETAILS, "POST", data, SystemConstant.HEADER);
                return consume2
                        .then(response2=>{
                            let result  = Object.assign({}, ...response.data, response2.data)
                            dispatch(success(result));
                        })
                        .catch(error=>{
                            if(error.response && error.response.data && error.response.data.Message){
                                dispatch(failure(error.response.data.Message.toString()));
                            }else{
                                // console.log('bank error is', error.response);
                                dispatch(failure('We are unable to get recipient details.'));
                            }
                        })
               
            })
            .catch(error => {
                if(error.response.data.Message){
                    dispatch(failure(error.response.data.Message.toString()));
                }else{
                    // console.log('bank error is', error.response);
                    dispatch(failure('We are unable to get recipient details.'));
                }
            });
        }
    };

    function request(request) { return { type:GET_ACCOUNT_DETAILS_PENDING, request} }
    function success(response) { return {type:GET_ACCOUNT_DETAILS_SUCCESS, response} }
    function failure(error) { return {type:GET_ACCOUNT_DETAILS_FAILURE, error} }
};

export const saveBankTransferBeneficiary = (token, bankTransferBeneficiary) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        if(Object.getOwnPropertyNames(bankTransferBeneficiary).length === 0){
            dispatch(failure(''));
        }else{
            if(bankTransferBeneficiary.NickName ===""){
                dispatch(failure('Provide Alias for this beneficiary'));
            }else if(bankTransferBeneficiary.TransactionPin ===""){
                dispatch(failure('ALAT Pin is required '));
            }else{   
                let consume = ApiService.request(routes.SAVE_TRANSFER_BENEFICIARY, "POST", bankTransferBeneficiary, SystemConstant.HEADER);
                dispatch(request(consume));
                return consume
                    .then(response => {
                        // history.push("/transfer");
                        dispatch(success(response));
                    })
                    .catch(error => {
                        if((error.response && error.response.data.Message)){
                            dispatch(failure(error.response.data.Message.toString()));
                        }
                        else if(error.response && error.response.message){
                            dispatch(failure(error.response.message.toString()));
                        }
                            
                        else if(error.response && error.response.data.ModelState){
                                dispatch(failure(modelStateErrorHandler(error)));
                        }
                        else{
                            dispatch(failure('An error occurred.'));
                        }
                        
                    });
            }
        }
    };

    

    function request(request) { return { type:SAVE_TRANSFER_BENEFICIARY_PENDING, request} }
    function success(response) { return {type:SAVE_TRANSFER_BENEFICIARY_SUCCESS, response} }
    function failure(error) { return {type:SAVE_TRANSFER_BENEFICIARY_FAILURE, error} }
};

export const sendMoneyTransfer = (token, transferPayload, resend, isFxTransfer) => {
    SystemConstant.HEADER['alat-token'] = token;
    
        return (dispatch) => {
            if(transferPayload.TransactionPin.length==4){
                let consume = ApiService.request(routes.BANK_TRANSFER_WITHPIN, "POST", transferPayload, SystemConstant.HEADER);
                dispatch(request(consume));
                return consume
                    .then(response => {
                        if(resend===false && !isFxTransfer){
                            history.push("/transfer/otp");
                        }
                        if(resend===false && isFxTransfer){
                            history.push("/fx-transfer/otp");
                        }
                        
                        dispatch(success(response));
                    })
                    .catch(error => {
                        if((error.response.data.Message)){
                            dispatch(failure(error.response.data.Message.toString()));
                        }
                        else if(error.response.message){
                            dispatch(failure(error.response.message.toString()));
                        }
                            
                        else if(error.response.data.ModelState){
                                dispatch(failure(modelStateErrorHandler(error)));
                        }
                        else{
                            dispatch(failure('An error occurred.'));
                        }
                        
                    });
            }else{
                dispatch(failure('Please provide a valid Pin.'))
            }
        };
    

    

    function request(request) { return { type:SENDBANK_TRANSFER_PENDING, request, resend} }
    function success(response) { return {type:SENDBANK_TRANSFER_SUCCESS, response, payloadPin:transferPayload.TransactionPin, resend} }
    function failure(error) { return {type:SENDBANK_TRANSFER_FAILURE, error, resend} }
};

export const processMoneyTransfer = (token, transferPayload ,isFxTransfer) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.BANK_TRANSFER_WITHPIN_ANDOTP, "POST", transferPayload, SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                if(!isFxTransfer){
                    history.push("/transfer/success");
                }
                
                if(isFxTransfer){
                    history.push("/fx-transfer/success");
                }
                dispatch(success(response));
            })
            .catch(error => {
                // console.log("error is", error.response);
                if((error.response.data.Message)){
                    dispatch(failure(error.response.data.Message.toString()));
                }
                else if(error.response.message){
                    dispatch(failure(error.response.message.toString()));
                }
                    
                else if(error.response.data.ModelState){
                        dispatch(failure(modelStateErrorHandler(error)));
                }
                else{
                    dispatch(failure('An error while sending funds.'));
                }
                   
                
                
            });
    };

    function request(request) { return { type:PROCESS_TRANSFER_PENDING, request} }
    function success(response) { return {type:PROCESS_TRANSFER_SUCCESS, response} }
    function failure(error) { return {type:PROCESS_TRANSFER_FAILURE, error} }
};

export const clearTransferStore =()=>{
    return (dispatch) => { 
        dispatch(clear());
    }
    function clear(){return {type: TRANSFER_REDUCER_CLEAR, clear_data: "" }}
}