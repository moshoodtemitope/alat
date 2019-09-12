import {SystemConstant} from "../../../shared/constants";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {history} from '../../../_helpers/history';
import { modelStateErrorHandler } from "../../../shared/utils";
import {
   FETCH_EXISTING_POLICIES_SUCCESS,
   FETCH_EXISTING_POLICIES_PENDING,
   FETCH_EXISTING_POLICIES_FAILURE,
   FETCH_NEWINSURANCE_INFOSETS_SUCCESS,
   FETCH_NEWINSURANCE_INFOSETS_PENDING,
   FETCH_NEWINSURANCE_INFOSETS_FAILURE,
   FETCH_COVERSIN_PRODUCTS_SUCCESS,
   FETCH_COVERSIN_PRODUCTS_PENDING,
   FETCH_COVERSIN_PRODUCTS_FAILURE,
   FETCH_CARMAKES_INYEAR_SUCCESS,
   FETCH_CARMAKES_INYEAR_PENDING,
   FETCH_CARMAKES_INYEAR_FAILURE,
   FETCH_CARMAKES_MODELS_SUCCESS,
   FETCH_CARMAKES_MODELS_PENDING,
   FETCH_CARMAKES_MODELS_FAILURE,
   POST_MOTORSCHEDULEDATA_SUCCESS,
   POST_MOTORSCHEDULEDATA_PENDING,
   POST_MOTORSCHEDULEDATA_FAILURE,
   POST_AUTOINSURANCE_PAYMENTDATA_SUCCESS,
   POST_AUTOINSURANCE_PAYMENTDATA_PENDING,
   POST_AUTOINSURANCE_PAYMENTDATA_FAILURE,
   GET_VEHICLEDETAILS_SUCCESS,
   GET_VEHICLEDETAILS_PENDING,
   GET_VEHICLEDETAILS_FAILURE,
   SET_PRODUCT_COVERID,
   SAVE_CUSTOMER_DETAILS,
   SAVE_CUSTOMERPOLICY_DATA,
   ALATINSURANCE_REDUCER_CLEAR
}from "../../constants/insurance/insurance.constants";


//Get existing Policies
export const getExistingPolicies = (token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch)=>{ 

        // Get Insurance Products
        let consume =  ApiService.request(routes.FETCH_EXISTING_POLICIES, "POST", null, SystemConstant.HEADER); 
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


    function request(request) { return { type:FETCH_EXISTING_POLICIES_PENDING, request} }
    function success(response) { return {type:FETCH_EXISTING_POLICIES_SUCCESS, response} }
    function failure(error) { return {type:FETCH_EXISTING_POLICIES_FAILURE, error} }
}

//Get  new  policy chunk data
export const getNewPolicyDataChunk = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch)=>{ 

        // Get Insurance Products
        let consume =  ApiService.request(routes.FETCH_INSURANCE_PRODUCTS, "POST", null, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{ 

                // Get Insurance Countries
                let consume2 =  ApiService.request(routes.FETCH_INSURANCE_COUNTRIES, "POST", null, SystemConstant.HEADER); 
                dispatch(request(consume2));
                return consume2
                    .then(response2=>{

                         // Get Insurance Colors
                        let consume3 =  ApiService.request(routes.FETCH_INSURANCE_COLORLIST, "POST", null, SystemConstant.HEADER); 
                        dispatch(request(consume3));
                        return consume3
                            .then(response3=>{
                                
                                // Get Insurance LGAs
                                let consume4 =  ApiService.request(routes.FETCH_INSURANCE_LGA, "POST", null, SystemConstant.HEADER); 
                                dispatch(request(consume4));
                                return consume4
                                    .then(response4=>{

                                    // Get Insurance Body Types
                                    let consume5 =  ApiService.request(routes.FETCH_INSURANCE_BODYTYPES, "POST", null, SystemConstant.HEADER); 
                                    dispatch(request(consume5));
                                    return consume5
                                        .then(response5=>{

                                            // Get Insurance Manufacture Year
                                            let consume6 =  ApiService.request(routes.FETCH_INSURANCE_MANUFACTUREYEAR, "POST", null, SystemConstant.HEADER); 
                                            dispatch(request(consume6));
                                            return consume6
                                                .then(response6=>{


                                                    // Get Insurance Titles
                                                    let consume7 =  ApiService.request(routes.FETCH_INSURANCE_TITLES, "POST", null, SystemConstant.HEADER); 
                                                    dispatch(request(consume7));
                                                    return consume7
                                                        .then(response7=>{


                                                            // Get Insurance Gender
                                                            let consume8 =  ApiService.request(routes.FETCH_INSURANCE_GENDERS, "POST", null, SystemConstant.HEADER); 
                                                            dispatch(request(consume8));
                                                            return consume8
                                                                .then(response8=>{

                                                                    // Get Insurance non-schengen countries
                                                                    let consume9 =  ApiService.request(routes.FETCH_INSURANCE_NONSCHENGENCOUNTRIES, "POST", null, SystemConstant.HEADER); 
                                                                    dispatch(request(consume9));
                                                                    return consume9
                                                                        .then(response9=>{
                                                                            let newPolicyChunk = {
                                                                                    ProductsList          : response.data,
                                                                                    Countries             : response2.data,
                                                                                    Colorlist             : response3.data,
                                                                                    Lga                   : response4.data,
                                                                                    BodyTypes             : response5.data,
                                                                                    Manufactureyears      : response6.data,
                                                                                    Titles                : response7.data,
                                                                                    Genders               : response8.data,
                                                                                    NonSchengenCountries  : response9.data     
                                                                            }
                                                                            dispatch(success(newPolicyChunk));
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
                // dispatch(success(response));
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
    
    function request(request) { return { type:FETCH_NEWINSURANCE_INFOSETS_PENDING, request} }
    function success(response) { return {type:FETCH_NEWINSURANCE_INFOSETS_SUCCESS, response} }
    function failure(error) { return {type:FETCH_NEWINSURANCE_INFOSETS_FAILURE, error} }

}

export const getCoversInProduct =(token, payload, provider)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch)=>{ 

        // Get Insurance Products
        let consume =  ApiService.request(routes.FETCH_COVERS_IN_PRODCUTS, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{ 
                if(response.data.length>=1){
                    dispatch(success(response));
                    history.push("/insurance/buy-insurance/choose-cover");
                }else{
                    dispatch(failure('No policy covers found '));
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


    function request(request) { return { type:FETCH_COVERSIN_PRODUCTS_PENDING, request} }
    function success(response) { return {type:FETCH_COVERSIN_PRODUCTS_SUCCESS, response, productId:payload.productId, provider} }
    function failure(error) { return {type:FETCH_COVERSIN_PRODUCTS_FAILURE, error} }
}

export const setProductCoverId = (data) => {
    return {
        type: SET_PRODUCT_COVERID,
        data: data
    }
}

//Get cars made in select year
export const getCarMakesInYear = (year, token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch)=>{ 

        
        let consume =  ApiService.request(routes.FETCH_CARS_MADEINYEAR+year, "GET", null, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{ 
                if(response.data.length>=1){
                    dispatch(success(response));
                }else{
                    dispatch(failure('No cars in the selected year'));
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


    function request(request) { return { type:FETCH_CARMAKES_INYEAR_PENDING, request} }
    function success(response) { return {type:FETCH_CARMAKES_INYEAR_SUCCESS, response} }
    function failure(error) { return {type:FETCH_CARMAKES_INYEAR_FAILURE, error} }
}

// Get car models
export const getCarModels = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch)=>{ 

       //load car models
        let consume =  ApiService.request(routes.FETCH_CAR_MODELS, "POST", payload, SystemConstant.HEADER); 
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


    function request(request) { return { type:FETCH_CARMAKES_MODELS_PENDING, request} }
    function success(response) { return {type:FETCH_CARMAKES_MODELS_SUCCESS, response} }
    function failure(error) { return {type:FETCH_CARMAKES_MODELS_FAILURE, error} }
}

// Get car details
export const getCarDetails = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch)=>{ 

       //load car models
        let consume =  ApiService.request(routes.FETCH_VEHICLE_DETAILS, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{ 
                if(response.data.VehicleDetails.RegistrationNo !==null){
                     dispatch(success(response));
                }else{
                    dispatch(failure('Car Registration number notfound'));
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


    function request(request) { return { type:GET_VEHICLEDETAILS_PENDING, request} }
    function success(response) { return {type:GET_VEHICLEDETAILS_SUCCESS, response} }
    function failure(error) { return {type:GET_VEHICLEDETAILS_FAILURE, error} }
}

// Post motor schedule data
export const postMotorSchedule = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch)=>{ 

        //Send motor schedule data
        let consume =  ApiService.request(routes.SEND_MOTOR_SCHEDULE, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{ 
                dispatch(success(response));
                history.push("/insurance/buy-insurance/makepayment");
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


    function request(request) { return { type:POST_MOTORSCHEDULEDATA_PENDING, request} }
    function success(response) { return {type:POST_MOTORSCHEDULEDATA_SUCCESS, response} }
    function failure(error) { return {type:POST_MOTORSCHEDULEDATA_FAILURE, error} }
}

// Send motor insurance payment
export const postAutoInsurancePayment = (payload, token)=>{
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch)=>{ 

        //Send motor schedule data
        let consume =  ApiService.request(routes.FINALPAYMENT_FORAUTO_INSURANCE, "POST", payload, SystemConstant.HEADER); 
        dispatch(request(consume));
        return consume
            .then(response=>{ 
                dispatch(success(response));
                history.push("/insurance/payment-success");
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


    function request(request) { return { type:POST_AUTOINSURANCE_PAYMENTDATA_PENDING, request} }
    function success(response) { return {type:POST_AUTOINSURANCE_PAYMENTDATA_SUCCESS, response} }
    function failure(error) { return {type:POST_AUTOINSURANCE_PAYMENTDATA_FAILURE, error} }
}

export const saveCustomerDetails = (data) => {
    return {
        type: SAVE_CUSTOMER_DETAILS,
        data: data
    }
}

export const saveCustomerPolicyData = (data) => {
    return {
        type: SAVE_CUSTOMERPOLICY_DATA,
        data: data
    }
}

export const clearInsuranceStore =()=>{
    return (dispatch) => { 
        dispatch(clear());
    }
    function clear(){return {type: ALATINSURANCE_REDUCER_CLEAR, clear_data: "" }}
}