import {
    fixedGoalConstants
} from '../../constants/goal/fixed-goal.constant'


export function fixedGoalStep1Reducer(state = {}, action) {
    switch (action.type) {
        case fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS:
            return {
                fixed_step1_status: fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS,
                fixed_step1_data: action,
                //registration_step: 1
            };
        case fixedGoalConstants.FETCH_FIXED_GOAL_PENDING:
            return {
                fixed_step1_status: fixedGoalConstants.FETCH_FIXED_GOAL_PENDING,
                fixed_step1_data: action,
                // registration_step: 1
            };
        case fixedGoalConstants.FETCH_FIXED_GOAL_FAILURE:
            return {
                fixed_step1_status: fixedGoalConstants.FETCH_FIXED_GOAL_FAILURE,
                fixed_step1_data: action,
            };
        
        default:
            return {
                ...state,
            };
    }
}
export function fixedGoalStep2Reducer(state = [], action) {
    switch (action.type) {
        case fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS_STEP2:
            return{
                fixed_step2_status:fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS_STEP2,
                fixed_step2_data:action,
            }
        case fixedGoalConstants.FETCH_FIXED_GOAL_PENDING_STEP2:
            return{
                fixed_step2_status:fixedGoalConstants.FETCH_FIXED_GOAL_PENDING_STEP2,
                fixed_step2_data:action,
            }
        case fixedGoalConstants.FETCH_FIXED_GOAL_FAILURE_STEP2:
            return{
                fixed_step2_status:fixedGoalConstants.FETCH_FIXED_GOAL_FAILURE_STEP2,
                fixed_step2_data:action,

        }
        
        default: return {
            ...state
        };
    }
}