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
    GET_ACCOUNT_DETAILS_FAILURE,
    GET_TRANSACTION_LIMIT_PENDING, 
    GET_TRANSACTION_LIMIT_SUCCESS, 
    GET_TRANSACTION_LIMIT_FAILURE,
    SENDBANK_TRANSFER_PENDING, 
    SENDBANK_TRANSFER_SUCCESS, 
    SENDBANK_TRANSFER_FAILURE,
    SENDBANK_TRANSFER_RESET, 
    PROCESS_TRANSFER_PENDING, 
    PROCESS_TRANSFER_SUCCESS, 
    PROCESS_TRANSFER_FAILURE,
    TRANSFER__BANK_DETAILS,
    GET_BANKCHARGES_PENDING,
    GET_BANKCHARGES_SUCCESS, 
    GET_BANKCHARGES_FAILURE,
    TRANSFER__BANK_DETAILS_FAILURE,
    TRANSFER__BANK_DETAILS_SUCCESS,
    SENDER__BANK_DETAILS,
    SAVE_TRANSFER_BENEFICIARY_PENDING,
    SAVE_TRANSFER_BENEFICIARY_SUCCESS,
    SAVE_TRANSFER_BENEFICIARY_FAILURE
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
            return { ...state }
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
            return { ...state }
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
            return { ...state }
    }
}

export function transferDetailsReducer(state = [], action){
    switch (action.type) {
        case TRANSFER__BANK_DETAILS:
            return {
                transfer_info: TRANSFER__BANK_DETAILS,
                transfer_info_data: action
            };

        default: return {
            ...state
        };
    }
}

export function transferSenderDetailsReducer(state = [], action){
    switch (action.type) {
        case SENDER__BANK_DETAILS:
            return {
                transfer_info: SENDER__BANK_DETAILS,
                transfer_info_data: action
            };

        default: return {
            ...state
        };
    }
}


export function getBankChargesReducer(state=[], action) {
    switch (action.type) {
        case GET_BANKCHARGES_PENDING:
            return {
                bank_charges_state: GET_BANKCHARGES_PENDING,
                bank_charges_data: action,
                fetchStatus: true
            };
        case GET_BANKCHARGES_SUCCESS:
            return {
                bank_charges_state: GET_BANKCHARGES_SUCCESS,
                bank_charges_data: action,
                fetchStatus: false
            };
        case GET_BANKCHARGES_FAILURE:
            return {
                bank_charges_state: GET_BANKCHARGES_FAILURE,
                bank_charges_data: action,
                fetchStatus: true
            };

        default:
            return { ...state }
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
            return { ...state }
    }
}

export function sendMoneyTransferRequest(state=[], action) {
    switch (action.type) {
        case SENDBANK_TRANSFER_PENDING:
            return {
                sendmoney_status: SENDBANK_TRANSFER_PENDING,
                sendmoney_status_data: action,
                fetchStatus: true
            };
        case SENDBANK_TRANSFER_SUCCESS:
            return {
                sendmoney_status: SENDBANK_TRANSFER_SUCCESS,
                sendmoney_status_data: action,
                fetchStatus: false
            };
        case SENDBANK_TRANSFER_FAILURE:
            return {
                sendmoney_status: SENDBANK_TRANSFER_FAILURE,
                sendmoney_status_data: action,
                fetchStatus: false
            };
        case SENDBANK_TRANSFER_RESET:
            return {
                sendmoney_status: SENDBANK_TRANSFER_RESET,
                sendmoney_status_data: {},
                fetchStatus: false
            };

        default:
            return { ...state }
    }
}

export function saveBankTransferReducer(state=[], action) {
    switch (action.type) {
        case SAVE_TRANSFER_BENEFICIARY_PENDING:
            return {
                sendmoney_status: SAVE_TRANSFER_BENEFICIARY_PENDING,
                sendmoney_status_data: action,
                fetchStatus: true
            };
        case SAVE_TRANSFER_BENEFICIARY_SUCCESS:
            return {
                sendmoney_status: SAVE_TRANSFER_BENEFICIARY_SUCCESS,
                sendmoney_status_data: action,
                fetchStatus: true
            };
        case SAVE_TRANSFER_BENEFICIARY_FAILURE:
            return {
                sendmoney_status: SAVE_TRANSFER_BENEFICIARY_FAILURE,
                sendmoney_status_data: action,
                fetchStatus: false
            };

        default:
            return { ...state }
    }
}

export function processMoneyTransferRequest(state=[], action) {
    switch (action.type) {
        case PROCESS_TRANSFER_PENDING:
            return {
                sendmoney_status: PROCESS_TRANSFER_PENDING,
                sendmoney_status_data: action,
                fetchStatus: true
            };
        case PROCESS_TRANSFER_SUCCESS:
            return {
                sendmoney_status: PROCESS_TRANSFER_SUCCESS,
                sendmoney_status_data: action,
                fetchStatus: false
            };
        case PROCESS_TRANSFER_FAILURE:
            return {
                sendmoney_status: PROCESS_TRANSFER_FAILURE,
                sendmoney_status_data: action,
                fetchStatus: false
            };

        default:
            return { ...state }
    }
}

export function fetchTransactionLimitRequest(state=[], action) {
    switch (action.type) {
        case GET_TRANSACTION_LIMIT_PENDING:
            return {
                transferlimit: GET_TRANSACTION_LIMIT_PENDING,
                transferlimit_data: action,
                fetchStatus: true
            };
        case GET_TRANSACTION_LIMIT_SUCCESS:
            return {
                transferlimit: GET_TRANSACTION_LIMIT_SUCCESS,
                transferlimit_data: action,
                fetchStatus: true
            };
        case GET_TRANSACTION_LIMIT_FAILURE:
            return {
                transferlimit: GET_TRANSACTION_LIMIT_FAILURE,
                transferlimit_data: action,
                fetchStatus: false
            };

        default:
            return { ...state }
    }
}