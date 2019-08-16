import {customerGoalConstants} from "../../constants/goal/get-customer-trans-history.constant";

export function getCustomerGoalTransHistoryReducer(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_PENDING:
            return {
                customer_goal:customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_PENDING,
                customer_goal_data: action
            };
        case customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_SUCCESS:
            return {
                customer_goal: customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_SUCCESS,
                customer_goal_data: action
            };
        case customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_FAILURE:
            return {
                customer_goal: customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_FAILURE,
                customer_goal_data: action
            };


        default:
            return { ...state }
    }
}
export function GET_FORMULAR(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.GET_GOAL_FORMULAR_PENDING:
            return {
                customer_goal:customerGoalConstants.GET_GOAL_FORMULAR_PENDING,
                customer_goal_data: action
            };
        case customerGoalConstants.GET_GOAL_FORMULAR_SUCCESS:
            return {
                customer_goal: customerGoalConstants.GET_GOAL_FORMULAR_SUCCESS,
                customer_goal_data: action
            };
        case customerGoalConstants.GET_GOAL_FORMULAR_FAILURE:
            return {
                customer_goal: customerGoalConstants.GET_GOAL_FORMULAR_FAILURE,
                customer_goal_data: action
            };


        default:
            return { ...state }
    }
}
export function GET_GOAL_TYPE(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.GET_GOAL_TYPE_PENDING:
            return {
                customer_goal:customerGoalConstants.GET_GOAL_TYPE_PENDING,
                customer_goal_data: action
            };
        case customerGoalConstants.GET_GOAL_TYPE_SUCCESS:
            return {
                customer_goal: customerGoalConstants.GET_GOAL_TYPE_SUCCESS,
                customer_goal_data: action
            };
        case customerGoalConstants.GET_GOAL_TYPE_FAILURE:
            return {
                customer_goal: customerGoalConstants.GET_GOAL_TYPE_FAILURE,
                customer_goal_data: action
            };


        default:
            return { ...state }
    }
}
export function TopUPGoal(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.TOP_UP_GOAL_PENDING:
            return {
                top_up_goal_status:customerGoalConstants.TOP_UP_GOAL_PENDING,
                top_up_goal_data: action
            };
        case customerGoalConstants.TOP_UP_GOAL_SUCCESS:
            return {
                top_up_goal_status: customerGoalConstants.TOP_UP_GOAL_SUCCESS,
                top_up_goal_data: action
            };
        case customerGoalConstants.TOP_UP_GOAL_FAILURE:
            return {
                top_up_goal_status: customerGoalConstants.TOP_UP_GOAL_FAILURE,
                top_up_goal_data: action
            };


        default:
            return { ...state }
    }
}
export function TopUPGoalStep1(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.TOP_UP_GOAL_PENDING_STEP1:
            return {
                top_up_goal_status_step1:customerGoalConstants.TOP_UP_GOAL_PENDING_STEP1,
                top_up_goal_data_step1: action
            };
        case customerGoalConstants.TOP_UP_GOAL_SUCCESS_STEP1:
            return {
                top_up_goal_status_step1: customerGoalConstants.TOP_UP_GOAL_SUCCESS_STEP1,
                top_up_goal_data_step1: action
            };
        case customerGoalConstants.TOP_UP_GOAL_FAILURE_STEP1:
            return {
                top_up_goal_status_step1: customerGoalConstants.TOP_UP_GOAL_FAILURE_STEP1,
                top_up_goal_data_step1: action
            };


        default:
            return { ...state }
    }
}
export function WithDrawFromGoalStep1(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.WITHDRAW_FROM_GOAL_PENDING_STEP1:
            return {
                withdraw_from_goal_status_step1:customerGoalConstants.WITHDRAW_FROM_GOAL_PENDING_STEP1,
                withdraw_from_goal_data_step1: action
            };
        case customerGoalConstants.WITHDRAW_FROM_GOAL_SUCCESS_STEP1:
            return {
                withdraw_from_goal_status_step1: customerGoalConstants.WITHDRAW_FROM_GOAL_SUCCESS_STEP1,
                withdraw_from_goal_data_step1: action
            };
        case customerGoalConstants.WITHDRAW_FROM_GOAL_FAILURE_STEP1:
            return {
                withdraw_from_goal_status_step1: customerGoalConstants.WITHDRAW_FROM_GOAL_FAILURE_STEP1,
                withdraw_from_goal_data_step1: action
            };


        default:
            return { ...state }
    }
}
export function WithDrawFromGoal(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.WITHDRAW_FROM_GOAL_PENDING:
            return {
                withdraw_from_goal_status:customerGoalConstants.WITHDRAW_FROM_GOAL_PENDING,
                withdraw_from_goal_data: action
            };
        case customerGoalConstants.WITH_DRAW_FROM_GOAL_SUCCESS:
            return {
                withdraw_from_goal_status: customerGoalConstants.WITH_DRAW_FROM_GOAL_SUCCESS,
                withdraw_from_goal_data: action
            };
        case customerGoalConstants.WITH_DRAW_FROM_GOAL_FAILURE:
            return {
                withdraw_from_goal_status: customerGoalConstants.WITH_DRAW_FROM_GOAL_FAILURE,
                withdraw_from_goal_data: action
            };


        default:
            return { ...state }
    }
}





