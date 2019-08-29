import {
    FETCH_EXISTING_POLICIES_SUCCESS,
    FETCH_EXISTING_POLICIES_PENDING,
    FETCH_EXISTING_POLICIES_FAILURE,
    FETCH_NEWINSURANCE_INFOSETS_SUCCESS,
    FETCH_NEWINSURANCE_INFOSETS_PENDING,
    FETCH_NEWINSURANCE_INFOSETS_FAILURE
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