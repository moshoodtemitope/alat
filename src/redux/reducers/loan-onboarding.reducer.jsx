import { loanOnboardingConstants } from "../constants/onboarding/loan.constants";

export function loanOnboardingStep1Reducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_STEP1_SUCCESS:
            return {
                loan_step1_status: loanOnboardingConstants.LOAN_STEP1_SUCCESS,
                loan_step1_data: action,
                //registration_step: 1
            };
        case loanOnboardingConstants.LOAN_STEP1_PENDING:
            return {
                loan_step1_status: loanOnboardingConstants.LOAN_STEP1_PENDING,
                loan_step1_data: action,
                // registration_step: 1
            };
        case loanOnboardingConstants.LOAN_STEP1_FAILURE:
            return {
                loan_step1_status: loanOnboardingConstants.LOAN_STEP1_FAILURE,
                loan_step1_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function loanOnboardingStep2Reducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_STEP2_SUCCESS:
            return {
                loan_step2_status: loanOnboardingConstants.LOAN_STEP2_SUCCESS,
                loan_step2_data: action,
                //registration_step: 1
            };
        case loanOnboardingConstants.LOAN_STEP2_PENDING:
            return {
                loan_step2_status: loanOnboardingConstants.LOAN_STEP2_PENDING,
                loan_step2_data: action,
                // registration_step: 1
            };
        case loanOnboardingConstants.LOAN_STEP2_FAILURE:
            return {
                loan_step2_status: loanOnboardingConstants.LOAN_STEP2_FAILURE,
                loan_step2_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function loanOnboardingStep3Reducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_STEP3_SUCCESS:
            return {
                loan_step3_status: loanOnboardingConstants.LOAN_STEP3_SUCCESS,
                loan_step3_data: action,
                //registration_step: 1
            };
        case loanOnboardingConstants.LOAN_STEP3_PENDING:
            return {
                loan_step3_status: loanOnboardingConstants.LOAN_STEP3_PENDING,
                loan_step3_data: action,
                // registration_step: 1
            };
        case loanOnboardingConstants.LOAN_STEP3_FAILURE:
            return {
                loan_step3_status: loanOnboardingConstants.LOAN_STEP3_FAILURE,
                loan_step3_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function loanOnboardingVerifyBVNReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_VERIFY_BVN_SUCCESS:
            return {
                loan_bvn_status: loanOnboardingConstants.LOAN_VERIFY_BVN_SUCCESS,
                loan_bvn_data: action,
                //registration_step: 1
            };
        case loanOnboardingConstants.LOAN_VERIFY_BVN_PENDING:
            return {
                loan_bvn_status: loanOnboardingConstants.LOAN_VERIFY_BVN_PENDING,
                loan_bvn_data: action,
                // registration_step: 1
            };
        case loanOnboardingConstants.LOAN_VERIFY_BVN_FAILURE:
            return {
                loan_bvn_status: loanOnboardingConstants.LOAN_VERIFY_BVN_FAILURE,
                loan_bvn_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function loanOnboardingValidateOTPReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_VALIDATEOTP_SUCCESS:
            return {
                loan_valOtp_status: loanOnboardingConstants.LOAN_VALIDATEOTP_SUCCESS,
                loan_valOtp_data: action,
                //registration_step: 1
            };
        case loanOnboardingConstants.LOAN_VALIDATEOTP_PENDING:
            return {
                loan_valOtp_status: loanOnboardingConstants.LOAN_VALIDATEOTP_PENDING,
                loan_valOtp_data: action,
                // registration_step: 1
            };
        case loanOnboardingConstants.LOAN_VALIDATEOTP_FAILURE:
            return {
                loan_valOtp_status: loanOnboardingConstants.LOAN_VALIDATEOTP_FAILURE,
                loan_valOtp_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}