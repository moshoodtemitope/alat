import { airtimeConstants } from "../constants/airtime/airtime.constants";

export function airtimeBeneficiariesReducer(state=[], action) {
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
            return state
    }
}

export function deleteBeneficiaryReducer(state=[], action){
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
            return state
    }
}