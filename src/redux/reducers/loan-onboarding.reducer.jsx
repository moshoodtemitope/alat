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
            case loanOnboardingConstants.LOAN_STEP2_CLEAR:
                    return {
                        loan_step2_status: loanOnboardingConstants.LOAN_STEP2_CLEAR,
                        loan_step2_data: {},
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

export function salaryTransactionReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_SALARYTRANSACTION_SUCCESS:
            return {
                loan_salTran_status: loanOnboardingConstants.LOAN_SALARYTRANSACTION_SUCCESS,
                loan_salTran_data: action,
                //registration_step: 1
            };
        case loanOnboardingConstants.LOAN_SALARYTRANSACTION_PENDING:
            return {
                loan_salTran_status: loanOnboardingConstants.LOAN_SALARYTRANSACTION_PENDING,
                loan_salTran_data: action,
                // registration_step: 1
            };
        case loanOnboardingConstants.LOAN_SALARYTRANSACTION_FAILURE:
            return {
                loan_salTran_status: loanOnboardingConstants.LOAN_SALARYTRANSACTION_FAILURE,
                loan_salTran_data: action,
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

export function getScoreCardQuestionReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_SCORECARD_QUESTION_SUCCESS:
            return {
                loan_scoreQ_status: loanOnboardingConstants.LOAN_SCORECARD_QUESTION_SUCCESS,
                loan_scoreQ_data: action,
            };
        case loanOnboardingConstants.LOAN_SCORECARD_QUESTION_PENDING:
            return {
                loan_scoreQ_status: loanOnboardingConstants.LOAN_SCORECARD_QUESTION_PENDING,
                loan_scoreQ_data: action,
            };
        case loanOnboardingConstants.LOAN_SCORECARD_QUESTION_FAILURE:
            return {
                loan_scoreQ_status: loanOnboardingConstants.LOAN_SCORECARD_QUESTION_FAILURE,
                loan_scoreQ_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function postScoreCardAnswerReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_SCORECARD_ANSWER_SUCCESS:
            return {
                loan_scoreA_status: loanOnboardingConstants.LOAN_SCORECARD_ANSWER_SUCCESS,
                loan_scoreA_data: action,
            };
        case loanOnboardingConstants.LOAN_SCORECARD_ANSWER_PENDING:
            return {
                loan_scoreA_status: loanOnboardingConstants.LOAN_SCORECARD_ANSWER_PENDING,
                loan_scoreA_data: action,
            };
        case loanOnboardingConstants.LOAN_SCORECARD_ANSWER_FAILURE:
            return {
                loan_scoreA_status: loanOnboardingConstants.LOAN_SCORECARD_ANSWER_FAILURE,
                loan_scoreA_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function resendOTPReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_RESENTOTP_SUCCESS:
            return {
                resendotp_status: loanOnboardingConstants.LOAN_RESENTOTP_SUCCESS,
                resendotp_data: action,
            };
        case loanOnboardingConstants.LOAN_RESENTOTP_PENDING:
            return {
                resendotp_status: loanOnboardingConstants.LOAN_RESENTOTP_PENDING,
                resendotp_data: action,
            };
        case loanOnboardingConstants.LOAN_RESENTOTP_FAILURE:
            return {
                resendotp_status: loanOnboardingConstants.LOAN_RESENTOTP_FAILURE,
                resendotp_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function securityQuestionReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.SECURITY_QUESTION_SUCCESS:
            return {
                sec_que_status: loanOnboardingConstants.SECURITY_QUESTION_SUCCESS,
                sec_que_data: action,
            };
        case loanOnboardingConstants.SECURITY_QUESTION_PENDING:
            return {
                sec_que_status: loanOnboardingConstants.SECURITY_QUESTION_PENDING,
                sec_que_data: action,
            };
        case loanOnboardingConstants.SECURITY_QUESTION_FAILURE:
            return {
                sec_que_status: loanOnboardingConstants.SECURITY_QUESTION_FAILURE,
                sec_que_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function saveUserDetailsReducer(state = {}, action) {
    switch (action.type) {
        case loanOnboardingConstants.LOAN_USERNAME_SUCCESS:
            return {
                loan_userdetails_status: loanOnboardingConstants.LOAN_USERNAME_SUCCESS,
                loan_userdetails_data: action,
            };
       
        default:
            return {
                ...state,
            };
    }
}

