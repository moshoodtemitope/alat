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

export function generateStatementReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_GENERATE_STATEMENT_SUCCESS:
            return {
                loan_genStat_status: loanOnboardingConstants.LOAN_GENERATE_STATEMENT_SUCCESS,
                loan_genStat_data: action,
                //registration_step: 1
            };
        case loanOnboardingConstants.LOAN_GENERATE_STATEMENT_PENDING:
            return {
                loan_genStat_status: loanOnboardingConstants.LOAN_GENERATE_STATEMENT_PENDING,
                loan_genStat_data: action,
                // registration_step: 1
            };
        case loanOnboardingConstants.LOAN_GENERATE_STATEMENT_FAILURE:
            return {
                loan_genStat_status: loanOnboardingConstants.LOAN_GENERATE_STATEMENT_FAILURE,
                loan_genStat_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function requestStatementReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS:
            return {
                loan_reqStat_status: loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS,
                loan_reqStat_data: action,
                //registration_step: 1
            };
        case loanOnboardingConstants.LOAN_REQUEST_STATEMENT_PENDING:
            return {
                loan_reqStat_status: loanOnboardingConstants.LOAN_REQUEST_STATEMENT_PENDING,
                loan_reqStat_data: action,
                // registration_step: 1
            };
        case loanOnboardingConstants.LOAN_REQUEST_STATEMENT_FAILURE:
            return {
                loan_reqStat_status: loanOnboardingConstants.LOAN_REQUEST_STATEMENT_FAILURE,
                loan_reqStat_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function salaryEntryReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_SALARYENTRY_SUCCESS:
            return {
                loan_salEnt_status: loanOnboardingConstants.LOAN_SALARYENTRY_SUCCESS,
                loan_salEnt_data: action,
                //registration_step: 1
            };
        case loanOnboardingConstants.LOAN_SALARYENTRY_PENDING:
            return {
                loan_salEnt_status: loanOnboardingConstants.LOAN_SALARYENTRY_PENDING,
                loan_salEnt_data: action,
                // registration_step: 1
            };
        case loanOnboardingConstants.LOAN_SALARYENTRY_FAILURE:
            return {
                loan_salEnt_status: loanOnboardingConstants.LOAN_SALARYENTRY_FAILURE,
                loan_salEnt_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}