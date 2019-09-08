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
    SAVE_CUSTOMERPOLICY_DATA
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

//Save Product Cover Id
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