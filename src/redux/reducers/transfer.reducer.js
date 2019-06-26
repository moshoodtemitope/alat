import {
    FETCH_BANK_PENDING,
    FETCH_BANK_FAILURE,
    FETCH_BANK_SUCCESS,
    FETCH_TRANSFER_BENEFICIARY_FAILURE,
    FETCH_TRANSFER_BENEFICIARY_PENDING,
    FETCH_TRANSFER_BENEFICIARY_SUCCESS,
    DELETE_TRANSFER_BENEFICIARY_FAILURE,
    DELETE_TRANSFER_BENEFICIARY_PENDING,
    DELETE_TRANSFER_BENEFICIARY_SUCCESS,
    GET_ACCOUNT_DETAILS_PENDING,
    GET_ACCOUNT_DETAILS_SUCCESS,
    GET_ACCOUNT_DETAILS_FAILURE
} from "../constants/transfer.constants";

export function bankListRequest(state=[], action) {
    switch (action.type) {
        case FETCH_BANK_PENDING:
            return {
                banks: FETCH_BANK_PENDING,
                banks_data: action
            };
        case FETCH_BANK_SUCCESS:
            return {
                banks: FETCH_BANK_SUCCESS,
                banks_data: action
            };
        case FETCH_BANK_FAILURE:
            return {
                banks: FETCH_BANK_FAILURE,
                banks_data: action
            };

        // default:
        //     return {
        //         banks: FETCH_BANK_PENDING,
        //         banks_data: action
        //     };
        default:
            return state;
    }
}


export function beneficiariesRequest(state=[], action) {
    switch (action.type) {
        case FETCH_TRANSFER_BENEFICIARY_PENDING:
            return {
                beneficiaries: FETCH_TRANSFER_BENEFICIARY_PENDING,
                beneficiaries_data: action
            };
        case FETCH_TRANSFER_BENEFICIARY_SUCCESS:
            return {
                beneficiaries: FETCH_TRANSFER_BENEFICIARY_SUCCESS,
                beneficiaries_data: action
            };
        case FETCH_TRANSFER_BENEFICIARY_FAILURE:
            return {
                beneficiaries: FETCH_TRANSFER_BENEFICIARY_FAILURE,
                beneficiaries_data: action
            };

        default:
            return state;
    }
}

export function deleteBeneficiaryRequest(state=[], action) {
    switch (action.type) {
        case DELETE_TRANSFER_BENEFICIARY_PENDING:
            return {
                beneficiary_delete_state: DELETE_TRANSFER_BENEFICIARY_PENDING,
                beneficiaryDeleteStatus : true,
                beneficiary_delete_data: action
            };
        case DELETE_TRANSFER_BENEFICIARY_SUCCESS:
            return {
                beneficiary_delete_state: DELETE_TRANSFER_BENEFICIARY_SUCCESS,
                beneficiaryDeleteStatus : false,
                beneficiary_delete_data: action
            };
        case DELETE_TRANSFER_BENEFICIARY_FAILURE:
            return {
                beneficiary_delete_state: DELETE_TRANSFER_BENEFICIARY_FAILURE,
                beneficiaryDeleteStatus : false,
                beneficiary_delete_data: action
            };

        default:
            return state;
    }
}

export function fetchAccountDetailsRequest(state=[], action) {
    switch (action.type) {
        case GET_ACCOUNT_DETAILS_PENDING:
            return {
                account_detail: GET_ACCOUNT_DETAILS_PENDING,
                account_detail_data: action,
                fetchStatus: true
            };
        case GET_ACCOUNT_DETAILS_SUCCESS:
            return {
                account_detail: GET_ACCOUNT_DETAILS_SUCCESS,
                account_detail_data: action,
                fetchStatus: true
            };
        case GET_ACCOUNT_DETAILS_FAILURE:
            return {
                account_detail: GET_ACCOUNT_DETAILS_FAILURE,
                account_detail_data: action,
                fetchStatus: false
            };

        default:
            return state;
    }
}