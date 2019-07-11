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
                loan_step1_status: loanOnboardingConstants.LOAN_STEP1_PENDING,
                loan_step1_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}