//
// in-app loan specific reducer
//
import { loanConstants } from '../constants/loans/loans.constants';
import { userConstants} from '../constants/onboarding/user.constants';

export function loanCalcDataReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_CALC_DATA_SUCCESS:
            return {
                loan_calcData_status: loanConstants.LOAN_CALC_DATA_SUCCESS,
                loan_calcData_data: action,
            };
        case loanConstants.LOAN_CALC_DATA_PENDING:
            return {
                loan_calcData_status: loanConstants.LOAN_CALC_DATA_PENDING,
                loan_calcData_data: action,
            };
        case loanConstants.LOAN_CALC_DATA_FAILURE:
            return {
                loan_calcData_status: loanConstants.LOAN_CALC_DATA_FAILURE,
                loan_calcData_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function loanApplyReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_APPLY_SUCCESS:
            return {
                loan_apply_status: loanConstants.LOAN_APPLY_SUCCESS,
                loan_apply_data: action,
            };
        case loanConstants.LOAN_APPLY_PENDING:
            return {
                loan_apply_status: loanConstants.LOAN_APPLY_PENDING,
                loan_apply_data: action,
            };
        case loanConstants.LOAN_APPLY_FAILURE:
            return {
                loan_apply_status: loanConstants.LOAN_APPLY_FAILURE,
                loan_apply_data: action,
            };
        case loanConstants.LOAN_APPLY_CLEAR:
            return{
                loan_apply_status: loanConstants.LOAN_APPLY_CLEAR,
                loan_apply_data: {},
            };
        default:
            return {
                ...state,
            };
    }
}

export function GetIndustriesReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_GETINDUSTRIES_SUCCESS:
            return {
                loan_industries_status: loanConstants.LOAN_GETINDUSTRIES_SUCCESS,
                loan_industries_data: action,
            };
        case loanConstants.LOAN_GETINDUSTRIES_PENDING:
            return {
                loan_industries_status: loanConstants.LOAN_GETINDUSTRIES_PENDING,
                loan_industries_data: action,
            };
        case loanConstants.LOAN_GETINDUSTRIES_FAILURE:
            return {
                loan_industries_status: loanConstants.LOAN_GETINDUSTRIES_FAILURE,
                loan_industries_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function EnableStatementUploadReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_ENABLE_STATEMENTUPLOAD_SUCCESS:
            return {
                request_status: loanConstants.LOAN_ENABLE_STATEMENTUPLOAD_SUCCESS,
                request_data: action,
                is_processing: false
            };
        case loanConstants.LOAN_ENABLE_STATEMENTUPLOAD_PENDING:
            return {
                request_status: loanConstants.LOAN_ENABLE_STATEMENTUPLOAD_PENDING,
                request_data: action,
                is_processing: true
            };
        case loanConstants.LOAN_ENABLE_STATEMENTUPLOAD_FAILURE:
            return {
                request_status: loanConstants.LOAN_ENABLE_STATEMENTUPLOAD_FAILURE,
                request_data: action,
                is_processing: false
            };
        default:
            return {
                ...state,
            };
    }
}

export function GetEmployerReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_EMPLOYER_SUCCESS:
            return {
                loan_employer_status: loanConstants.LOAN_EMPLOYER_SUCCESS,
                loan_employer_data: action,
            };
        case loanConstants.LOAN_EMPLOYER_PENDING:
            return {
                loan_employer_status: loanConstants.LOAN_EMPLOYER_PENDING,
                loan_employer_data: action,
            };
        case loanConstants.LOAN_EMPLOYER_FAILURE:
            return {
                loan_employer_status: loanConstants.LOAN_EMPLOYER_FAILURE,
                loan_employer_data: action,
            };
        default:
            return {
                ...state,
            };
    }
}

export function CurrentLoanReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_CURRENT_SUCCESS:
            return {
                loan_current_status: loanConstants.LOAN_CURRENT_SUCCESS,
                loan_current_data: action
            };
        case loanConstants.LOAN_CURRENT_PENDING:
            return {
                loan_current_status: loanConstants.LOAN_CURRENT_PENDING,
                loan_current_data: action
            };
        case loanConstants.LOAN_CURRENT_FAILURE:
            return {
                loan_current_status: loanConstants.LOAN_CURRENT_FAILURE,
                loan_current_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function LoanHistoryReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_HISTORY_SUCCESS:
            return {
                loan_history_status: loanConstants.LOAN_HISTORY_SUCCESS,
                loan_history_data: action
            };
        case loanConstants.LOAN_HISTORY_PENDING:
            return {
                loan_history_status: loanConstants.LOAN_HISTORY_PENDING,
                loan_history_data: action
            };
        case loanConstants.LOAN_HISTORY_FAILURE:
            return {
                loan_history_status: loanConstants.LOAN_HISTORY_FAILURE,
                loan_history_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function WorkIdFrontReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_WORkID_FRONT_SUCCESS:
            return {
                loan_frontId_status: loanConstants.LOAN_WORkID_FRONT_SUCCESS,
                loan_frontId_data: action
            };
        case loanConstants.LOAN_WORkID_FRONT_PENDING:
            return {
                loan_frontId_status: loanConstants.LOAN_WORkID_FRONT_PENDING,
                loan_frontId_data: action
            };
        case loanConstants.LOAN_WORkID_FRONT_FAILURE:
            return {
                loan_frontId_status: loanConstants.LOAN_WORkID_FRONT_FAILURE,
                loan_frontId_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function WorkIdBackReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_WORkID_BACK_SUCCESS:
            return {
                loan_backId_status: loanConstants.LOAN_WORkID_BACK_SUCCESS,
                loan_backId_data: action
            };
        case loanConstants.LOAN_WORkID_BACK_PENDING:
            return {
                loan_backId_status: loanConstants.LOAN_WORkID_BACK_PENDING,
                loan_backId_data: action
            };
        case loanConstants.LOAN_WORkID_BACK_FAILURE:
            return {
                loan_backId_status: loanConstants.LOAN_WORkID_BACK_FAILURE,
                loan_backId_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function loanRejectReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_REJECT_SUCCESS:
            return {
                loan_reject_status: loanConstants.LOAN_REJECT_SUCCESS,
                loan_reject_data: action
            };
        case loanConstants.LOAN_REJECT_PENDING:
            return {
                loan_reject_status: loanConstants.LOAN_REJECT_PENDING,
                loan_reject_data: action
            };
        case loanConstants.LOAN_REJECT_FAILURE:
            return {
                loan_reject_status: loanConstants.LOAN_REJECT_FAILURE,
                loan_reject_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function loanStandingOrderReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_STAND_ORDER_SUCCESS:
            return {
                loan_standOrder_status: loanConstants.LOAN_STAND_ORDER_SUCCESS,
                loan_standOrder_data: action
            };
        case loanConstants.LOAN_STAND_ORDER_PENDING:
            return {
                loan_standOrder_status: loanConstants.LOAN_STAND_ORDER_PENDING,
                loan_standOrder_data: action
            };
        case loanConstants.LOAN_STAND_ORDER_FAILURE:
            return {
                loan_standOrder_status: loanConstants.LOAN_STAND_ORDER_FAILURE,
                loan_standOrder_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function loanMandateStatusReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_MANDATE_STATUS_SUCCESS:
            return {
                loan_mandate_status: loanConstants.LOAN_MANDATE_STATUS_SUCCESS,
                loan_mandate_data: action
            };
        case loanConstants.LOAN_MANDATE_STATUS_PENDING:
            return {
                loan_mandate_status: loanConstants.LOAN_MANDATE_STATUS_PENDING,
                loan_mandate_data: action
            };
        case loanConstants.LOAN_MANDATE_STATUS_FAILURE:
            return {
                loan_mandate_status: loanConstants.LOAN_MANDATE_STATUS_FAILURE,
                loan_mandate_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function loanValidateRemitaOtpReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_VALIDATEOTP_SUCCESS:
            return {
                loan_valotp_status: loanConstants.LOAN_VALIDATEOTP_SUCCESS,
                lo_valotp_data: action
            };
        case loanConstants.LOAN_VALIDATEOTP_PENDING:
            return {
                loan_valotp_status: loanConstants.LOAN_VALIDATEOTP_PENDING,
                lo_valotp_data: action
            };
        case loanConstants.LOAN_VALIDATEOTP_FAILURE:
            return {
                loan_valotp_status: loanConstants.LOAN_VALIDATEOTP_FAILURE,
                lo_valotp_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function loanStatementUpload(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_STATEMENT_UPLOAD_SUCCESS:
            return {
                loan_statement_status: loanConstants.LOAN_STATEMENT_UPLOAD_SUCCESS,
                loan_statement_data: action
            };
        case loanConstants.LOAN_STATEMENT_UPLOAD_PENDING:
            return {
                loan_statement_status: loanConstants.LOAN_STATEMENT_UPLOAD_PENDING,
                loan_statement_data: action
            };
        case loanConstants.LOAN_STATEMENT_UPLOAD_FAILURE:
            return {
                loan_statement_status: loanConstants.LOAN_STATEMENT_UPLOAD_FAILURE,
                loan_statement_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function continueApplication(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_CONTINUE_APPLICATION:
            return {
                loan_app_status: loanConstants.LOAN_CONTINUE_APPLICATION,
                loan_app_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function PassportReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.PASSPORT_UPLOAD_SUCCESS:
            return {
                passport_status: userConstants.PASSPORT_UPLOAD_SUCCESS,
                passport_data: action
            };
        case userConstants.PASSPORT_UPLOAD_PENDING:
            return {
                passport_status: userConstants.PASSPORT_UPLOAD_PENDING,
                passport_data: action
            };
        case userConstants.PASSPORT_UPLOAD_FAILURE:
            return {
                passport_status: userConstants.PASSPORT_UPLOAD_FAILURE,
                passport_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function SignatureReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.SIGNATURE_UPLOAD_SUCCESS:
            return {
                sign_status: userConstants.SIGNATURE_UPLOAD_SUCCESS,
                sign_data: action
            };
        case userConstants.SIGNATURE_UPLOAD_PENDING:
            return {
                sign_status: userConstants.SIGNATURE_UPLOAD_PENDING,
                sign_data: action
            };
        case userConstants.SIGNATURE_UPLOAD_FAILURE:
            return {
                sign_status: userConstants.SIGNATURE_UPLOAD_FAILURE,
                sign_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function KycRequired(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_KYCREQUIRED_SUCCESS:
            return {
                kyc_required_status: loanConstants.LOAN_KYCREQUIRED_SUCCESS,
                kyc_required_data: action
            };
        case loanConstants.LOAN_KYCREQUIRED_PENDING:
            return {
                kyc_required_status: loanConstants.LOAN_KYCREQUIRED_PENDING,
                kyc_required_data: action
            };
        case loanConstants.LOAN_KYCREQUIRED_FAILURE:
            return {
                kyc_required_status: loanConstants.LOAN_KYCREQUIRED_FAILURE,
                kyc_required_data: action
            };
        default:
            return{
                ...state,
            };
    }
}


export function liquidateLoanReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LIQUIDATE_LOAN_SUCCESS:
            return {
                liquidateloan_status: loanConstants.LIQUIDATE_LOAN_SUCCESS,
                is_processing: false,
                liquidateloan_data: action
            };
        case loanConstants.LIQUIDATE_LOAN_PENDING:
            return {
                liquidateloan_status: loanConstants.LIQUIDATE_LOAN_PENDING,
                is_processing: true,
                liquidateloan_data: action
            };
        case loanConstants.LIQUIDATE_LOAN_FAILURE:
            return {
                liquidateloan_status: loanConstants.LIQUIDATE_LOAN_FAILURE,
                is_processing: false,
                liquidateloan_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

export function termsReducer(state = {}, action) {
    switch (action.type) {
        case loanConstants.LOAN_TERMS_SUCCESS:
            return {
                terms_status: loanConstants.LOAN_TERMS_SUCCESS,
                terms_data: action
            };
        case loanConstants.LOAN_TERMS_PENDING:
            return {
                terms_status: loanConstants.LOAN_TERMS_PENDING,
                terms_data: action
            };
        case loanConstants.LOAN_TERMS_FAILURE:
            return {
                terms_status: loanConstants.LOAN_TERMS_FAILURE,
                terms_data: action
            };
        default:
            return{
                ...state,
            };
    }
}

