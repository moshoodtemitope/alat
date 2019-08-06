//
// in app loan specific reducer
//
import { loanConstants } from '../constants/loans/loans.constants';

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