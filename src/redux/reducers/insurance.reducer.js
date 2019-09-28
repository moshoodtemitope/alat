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
    SET_PRODUCT_COVERID,
    SAVE_CUSTOMER_DETAILS,
    SAVE_CUSTOMERPOLICY_DATA,
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
 }from "../constants/insurance/insurance.constants";


//Existing Policies
export function getExistingPolicy(state=[], action) {
    switch (action.type) {
        case FETCH_EXISTING_POLICIES_PENDING:
            return {
                fetch_status: FETCH_EXISTING_POLICIES_PENDING,
                existingpolicy_data: action
            };
        case FETCH_EXISTING_POLICIES_SUCCESS:
            return {
                fetch_status: FETCH_EXISTING_POLICIES_SUCCESS,
                existingpolicy_data: action
            };
        case FETCH_EXISTING_POLICIES_FAILURE:
            return {
                fetch_status: FETCH_EXISTING_POLICIES_FAILURE,
                existingpolicy_data: action
            };

        default:
            return { ...state }
    }
}

//Get new Policy Data Chunk
export function getNewPolicyDataChunk(state=[], action) {
    switch (action.type) {
        case FETCH_NEWINSURANCE_INFOSETS_PENDING:
            return {
                fetch_status: FETCH_NEWINSURANCE_INFOSETS_PENDING,
                newpolicy_data: action
            };
        case FETCH_NEWINSURANCE_INFOSETS_SUCCESS:
            return {
                fetch_status: FETCH_NEWINSURANCE_INFOSETS_SUCCESS,
                newpolicy_data: action
            };
        case FETCH_NEWINSURANCE_INFOSETS_FAILURE:
            return {
                fetch_status: FETCH_NEWINSURANCE_INFOSETS_FAILURE,
                newpolicy_data: action
            };

        default:
            return { ...state }
    }
}

//Get Covers in Product
export function getCoversInPoductRequest(state=[], action) {
    switch (action.type) {
        case FETCH_COVERSIN_PRODUCTS_PENDING:
            return {
                is_processing: true,
                fetch_status: FETCH_COVERSIN_PRODUCTS_PENDING,
                policycover_data: action
            };
        case FETCH_COVERSIN_PRODUCTS_SUCCESS:
            return {
                is_processing: false,
                fetch_status: FETCH_COVERSIN_PRODUCTS_SUCCESS,
                policycover_data: action
            };
        case FETCH_COVERSIN_PRODUCTS_FAILURE:
            return {
                is_processing: false,
                fetch_status: FETCH_COVERSIN_PRODUCTS_FAILURE,
                policycover_data: action
            };

        default:
            return { ...state }
    }
}

//Get Cars made in Year
export function getCarInYearRequest(state=[], action) {
    switch (action.type) {
        case FETCH_CARMAKES_INYEAR_PENDING:
            return {
                is_processing: true,
                fetch_status: FETCH_CARMAKES_INYEAR_PENDING,
                carsinyear_data: action
            };
        case FETCH_CARMAKES_INYEAR_SUCCESS:
            return {
                is_processing: false,
                fetch_status: FETCH_CARMAKES_INYEAR_SUCCESS,
                carsinyear_data: action
            };
        case FETCH_CARMAKES_INYEAR_FAILURE:
            return {
                is_processing: false,
                fetch_status: FETCH_CARMAKES_INYEAR_FAILURE,
                carsinyear_data: action
            };

        default:
            return { ...state }
    }
}

//Get Car models
export function getCarModelRequest(state=[], action) {
    switch (action.type) {
        case FETCH_CARMAKES_MODELS_PENDING:
            return {
                is_processing: true,
                fetch_status: FETCH_CARMAKES_MODELS_PENDING,
                carmodels_data: action
            };
        case FETCH_CARMAKES_MODELS_SUCCESS:
            return {
                is_processing: false,
                fetch_status: FETCH_CARMAKES_MODELS_SUCCESS,
                carmodels_data: action
            };
        case FETCH_CARMAKES_MODELS_FAILURE:
            return {
                is_processing: false,
                fetch_status: FETCH_CARMAKES_MODELS_FAILURE,
                carmodels_data: action
            };

        default:
            return { ...state }
    }
}

//Get Car Details
export function getCarDetailsRequest(state=[], action) {
    switch (action.type) {
        case GET_VEHICLEDETAILS_PENDING:
            return {
                is_processing: true,
                fetch_status: GET_VEHICLEDETAILS_PENDING,
                vehicledetails_data: action
            };
        case GET_VEHICLEDETAILS_SUCCESS:
            return {
                is_processing: false,
                fetch_status: GET_VEHICLEDETAILS_SUCCESS,
                vehicledetails_data: action
            };
        case GET_VEHICLEDETAILS_FAILURE:
            return {
                is_processing: false,
                fetch_status: GET_VEHICLEDETAILS_FAILURE,
                vehicledetails_data: action
            };

        default:
            return { ...state }
    }
}

//Post motor schedule
export function postMotorScheduleRequest(state=[], action) {
    switch (action.type) {
        case POST_MOTORSCHEDULEDATA_PENDING:
            return {
                is_processing: true,
                fetch_status: POST_MOTORSCHEDULEDATA_PENDING,
                motorschedule_data: action
            };
        case POST_MOTORSCHEDULEDATA_SUCCESS:
            return {
                is_processing: false,
                fetch_status: POST_MOTORSCHEDULEDATA_SUCCESS,
                motorschedule_data: action
            };
        case POST_MOTORSCHEDULEDATA_FAILURE:
            return {
                is_processing: false,
                fetch_status: POST_MOTORSCHEDULEDATA_FAILURE,
                motorschedule_data: action
            };

        default:
            return { ...state }
    }
}

//Post motor insurance payment
export function postAutoInsurancePaymentRequest(state=[], action) {
    switch (action.type) {
        case POST_AUTOINSURANCE_PAYMENTDATA_PENDING:
            return {
                is_processing: true,
                fetch_status: POST_AUTOINSURANCE_PAYMENTDATA_PENDING,
                motorinsurancepayment_data: action
            };
        case POST_AUTOINSURANCE_PAYMENTDATA_SUCCESS:
            return {
                is_processing: false,
                fetch_status: POST_AUTOINSURANCE_PAYMENTDATA_SUCCESS,
                motorinsurancepayment_data: action
            };
        case POST_AUTOINSURANCE_PAYMENTDATA_FAILURE:
            return {
                is_processing: false,
                fetch_status: POST_AUTOINSURANCE_PAYMENTDATA_FAILURE,
                motorinsurancepayment_data: action
            };

        default:
            return { ...state }
    }
}

//Save Product Cover details
export function saveProductCoverId(state=[], action){
    switch (action.type){
        case SET_PRODUCT_COVERID:
            return {
                policycover_data: action
            };

        default:
            return { ...state }
    }
}

//Save Customer details
export function saveCustomerInfo(state=[], action){
    switch (action.type){
        case SAVE_CUSTOMER_DETAILS:
            return {
                customer_data: action
            };

        default:
            return { ...state }
    }
}

//Save Customer Policy details
export function saveCustomerPolicyInfo(state=[], action){
    switch (action.type){
        case SAVE_CUSTOMERPOLICY_DATA:
            return {
                customerpolicy_data: action
            };

        default:
            return { ...state }
    }
}