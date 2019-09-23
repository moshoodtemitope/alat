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
export function PauseCustomerGoal(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.PAUSE_CUSTOMER_GOAL_PENDING:
            return {
                pause_customer_goal_status:customerGoalConstants.PAUSE_CUSTOMER_GOAL_PENDING,
                pause_customer_goal_data: action
            };
        case customerGoalConstants.PAUSE_CUSTOMER_GOAL_SUCCESS:
            return {
                pause_customer_goal_status: customerGoalConstants.PAUSE_CUSTOMER_GOAL_SUCCESS,
                pause_customer_goal_data: action
            };
        case customerGoalConstants.PAUSE_CUSTOMER_GOAL_FAILURE:
            return {
                pause_customer_goal_status: customerGoalConstants.PAUSE_CUSTOMER_GOAL_FAILURE,
                pause_customer_goal_data: action
            };


        default:
            return { ...state }
    }
}
export function unPauseCustomerGoal(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.UNPAUSE_CUSTOMER_GOAL_PENDING:
            return {
                unpause_customer_goal_status:customerGoalConstants.UNPAUSE_CUSTOMER_GOAL_PENDING,
                unpause_customer_goal_data: action
            };
        case customerGoalConstants.UNPAUSE_CUSTOMER_GOAL_SUCCESS:
            return {
                unpause_customer_goal_status: customerGoalConstants.UNPAUSE_CUSTOMER_GOAL_SUCCESS,
                unpause_customer_goal_data: action
            };
        case customerGoalConstants.UNPAUSE_CUSTOMER_GOAL_FAILURE:
            return {
                unpause_customer_goal_status: customerGoalConstants.UNPAUSE_CUSTOMER_GOAL_FAILURE,
                unpause_customer_goal_data: action
            };


        default:
            return { ...state }
    }
}

export function EditCustomerGoal(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.EDIT_CUSTOMER_GOAL_PENDING:
            return {
                edit_customer_goal_status:customerGoalConstants.EDIT_CUSTOMER_GOAL_PENDING,
                edit_customer_goal_data: action
            };
        case customerGoalConstants.EDIT_CUSTOMER_GOAL_SUCCESS:
            return {
                edit_customer_goal_status: customerGoalConstants.EDIT_CUSTOMER_GOAL_SUCCESS,
                edit_customer_goal_data: action
            };
        case customerGoalConstants.EDIT_CUSTOMER_GOAL_FAILURE:
            return {
                edit_customer_goal_status: customerGoalConstants.EDIT_CUSTOMER_GOAL_FAILURE,
                edit_customer_goal_data: action
            };


        default:
            return { ...state }
    }
}
export function DeleteCustomerGoal(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.DELETE_CUSTOMER_GOAL_PENDING:
            return {
                delete_customer_goal_status:customerGoalConstants.DELETE_CUSTOMER_GOAL_PENDING,
                delete_customer_goal_data: action
            };
        case customerGoalConstants.DELETE_CUSTOMER_GOAL_SUCCESS:
            return {
                delete_customer_goal_status: customerGoalConstants.DELETE_CUSTOMER_GOAL_SUCCESS,
                delete_customer_goal_data: action
            };
        case customerGoalConstants.DELETE_CUSTOMER_GOAL_FAILURE:
            return {
                delete_customer_goal_status: customerGoalConstants.DELETE_CUSTOMER_GOAL_FAILURE,
                delete_customer_goal_data: action
            };


        default:
            return { ...state }
    }
}
export function StashCashoutStep1(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.STASH_CASHOUT_STEP1_PENDING:
            return {
                stashout_goal_status_step1:customerGoalConstants.STASH_CASHOUT_STEP1_PENDING,
                stashout_goal_data_step1: action
            };
        case customerGoalConstants.STASH_CASHOUT_STEP1_SUCCESS:
            return {
                stashout_goal_status_step1: customerGoalConstants.STASH_CASHOUT_STEP1_SUCCESS,
                stashout_goal_data_step1: action
            };
        case customerGoalConstants.STASH_CASHOUT__STEP1_FAILURE:
            return {
                stashout_goal_status_step1: customerGoalConstants.STASH_CASHOUT__STEP1_FAILURE,
                stashout_goal_data_step1: action
            };


        default:
            return { ...state }
    }
}



export function StashCashout(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.STASH_CASHOUT__PENDING:
            return {
                stashout_goal_status:customerGoalConstants.STASH_CASHOUT__PENDING,
                stashout_goal_data: action
            };
        case customerGoalConstants.STASH_CASHOUT_SUCCESS:
            return {
                stashout_goal_status: customerGoalConstants.STASH_CASHOUT_SUCCESS,
                stashout_goal_data: action
            };
        case customerGoalConstants.STASH_CASHOUT_FAILURE:
            return {
                stashout_goal_status: customerGoalConstants.STASH_CASHOUT_FAILURE,
                stashout_goal_data: action
            };


        default:
            return { ...state }
    }
}

export function Cashout(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.CASH_OUT_PENDING:
            return {
                message:customerGoalConstants.CASH_OUT_PENDING,
                data: action
            };
        case customerGoalConstants.CASH_OUT_SUCCESS:
            return {
                message: customerGoalConstants.CASH_OUT_SUCCESS,
                data: action
            };
        case customerGoalConstants.CASH_OUT_FAILURE:
            return {
                message: customerGoalConstants.CASH_OUT_FAILURE,
                data: action
            };


        default:
            return { ...state }
    }
}
export function submitDashboardData(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.SUBMIT_DASHBOARD_DATA_PENDING:
            return {
                message:customerGoalConstants.SUBMIT_DASHBOARD_DATA_PENDING,
                data: action
            };
        case customerGoalConstants.SUBMIT_DASHBOARD_DATA_SUCCESS:
            return {
                message: customerGoalConstants.SUBMIT_DASHBOARD_DATA_SUCCESS,
                data: action
            };
        case customerGoalConstants.SUBMIT_DASHBOARD_DATA_FAILURE:
            return {
                message: customerGoalConstants.SUBMIT_DASHBOARD_DATA_FAILURE,
                data: action
            };


        default:
            return { ...state }
    }
}









