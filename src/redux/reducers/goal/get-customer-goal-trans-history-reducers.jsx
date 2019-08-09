import {customerGoalConstants} from "../../constants/goal/get-customer-trans-history.constant";

export function getCustomerGoalTransHistoryReducer(state=[], action) {
    switch (action.type) {
        case customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_History_PENDING:
            return {
                customer_goal:customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_History_PENDING,
                customer_goal_data: action
            };
        case customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_SUCCESS:
            return {
                customer_goal: customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_HISTORY_SUCCESS,
                customer_goal_data: action
            };
        case customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_History_FAILURE:
            return {
                customer_goal: customerGoalConstants.FETCH_CUSTOMER_GOAL_TRANS_History_FAILURE,
                customer_goal_data: action
            };


        default:
            return { ...state }
    }
}
