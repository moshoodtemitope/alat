import { airtimeConstants } from "../constants/airtime/airtime.constants";

export function airtimeBeneficiariesReducer(state = [], action) {
    switch (action.type) {
        case airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_SUCCESS:
            return {
                airtime_beneficiary: airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_SUCCESS,
                airtime_beneficiary_data: action
            };
        case airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_PENDING:
            return {
                airtime_beneficiary: airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_PENDING,
                airtime_beneficiary_data: action
            };
        case airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_PENDING:
            return {
                airtime_beneficiary: airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_FAILURE,
                airtime_beneficiary_data: action
            };
        default:
            return { ...state }
    }
}

export function deleteBeneficiaryReducer(state = [], action) {
    switch (action.type) {
        case airtimeConstants.AIRTIME_BENEFICIARIES_DELETE_SUCCESS:
            return {
                airtime_beneficiary: airtimeConstants.AIRTIME_BENEFICIARIES_DELETE_SUCCESS,
                airtime_beneficiary_data: action
            };
        case airtimeConstants.AIRTIME_BENEFICIARIES_DELETE_PENDING:
            return {
                airtime_beneficiary: airtimeConstants.AIRTIME_BENEFICIARIES_DELETE_PENDING,
                airtime_beneficiary_data: action
            };
        case airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_FAILURE:
            return {
                airtime_beneficiary: airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_FAILURE,
                airtime_beneficiary_data: action
            };
        
        default:
            return { ...state }
    }
}

export function buyAirtimeReducer(state = [], action) {
    switch (action.type) {
        case airtimeConstants.AIRTIME_BUYDATA_PAGE1:
            return {
                airtime_buydata: airtimeConstants.AIRTIME_BUYDATA_PAGE1,
                airtime_buydata_data: action
            };
        case airtimeConstants.AIRTIME_BUYDATA_PAGE2:
            return {
                airtime_buydata: airtimeConstants.AIRTIME_BUYDATA_PAGE2,
                airtime_buydata_data: action
            };
        

        default: return {
            ...state
        };
    }
}

export function buyAirtimeWebPinReducer(state = [], action) {
    switch (action.type) {
        case airtimeConstants.AIRTIME_WEBPIN_SUCCESS:
            return {
                airtime_buydata: airtimeConstants.AIRTIME_WEBPIN_SUCCESS,
                airtime_buydata_data: action
            };
        case airtimeConstants.AIRTIME_WEBPIN_PENDING:
            return {
                airtime_buydata: airtimeConstants.AIRTIME_WEBPIN_PENDING,
                airtime_buydata_data: action
            };
        case airtimeConstants.AIRTIME_WEBPIN_FAILURE:
            return {
                airtime_buydata: airtimeConstants.AIRTIME_WEBPIN_FAILURE,
                airtime_buydata_data: action
            };
        
        default: return {
            ...state
        };
    }
}

export function buyAirtimeWebPinOTPReducer(state = [], action) {
    switch (action.type) {
        case airtimeConstants.AIRTIME_WEBPIN_OTP_SUCCESS:
            return {
                airtime_buydata: airtimeConstants.AIRTIME_WEBPIN_OTP_SUCCESS,
                airtime_buydata_data: action
            };
        case airtimeConstants.AIRTIME_WEBPIN_OTP_PENDING:
            return {
                airtime_buydata: airtimeConstants.AIRTIME_WEBPIN_OTP_PENDING,
                airtime_buydata_data: action
            };
        case airtimeConstants.AIRTIME_WEBPIN_OTP_FAILURE:
            return {
                airtime_buydata: airtimeConstants.AIRTIME_WEBPIN_OTP_FAILURE,
                airtime_buydata_data: action
            };
        
        default: return {
            ...state
        };
    }
}

export function debitableAccountsReducer(state = [], action) {
    switch (action.type) {
        case airtimeConstants.GET_DEBTABLE_ACCOUNTS_SUCCESS:
            return {
                debitable_accounts: airtimeConstants.GET_DEBTABLE_ACCOUNTS_SUCCESS,
                debitable_accounts_data: action
            };

        case airtimeConstants.GET_DEBTABLE_ACCOUNTS_PENDING:
            return {
                debitable_accounts: airtimeConstants.GET_DEBTABLE_ACCOUNTS_PENDING,
                debitable_accounts_data: action
            };

        case airtimeConstants.GET_DEBTABLE_ACCOUNTS_FAILURE:
            return {
                debitable_accounts: airtimeConstants.GET_DEBTABLE_ACCOUNTS_FAILURE,
                debitable_accounts_data: action
            };
        
        default: return {
            ...state
        };
    }
}

export function airtimeSaveBeneficiaryReducer(state = [], action) {
    switch (action.type) {
        case airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_SUCCESS:
            return {
                airtime_beneficiary: airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_SUCCESS,
                airtime_beneficiary_data: action
            };

        case airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_PENDING:
            return {
                airtime_beneficiary: airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_PENDING,
                airtime_beneficiary_data: action
            };

        case airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_FAILURE:
            return {
                airtime_beneficiary: airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_FAILURE,
                airtime_beneficiary_data: action
            };
        
        default: return {
            ...state
        };
    }
}