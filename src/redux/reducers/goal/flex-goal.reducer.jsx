import {
    flexGoalConstants
} from '../../constants/goal/flex-goal.constant'


export function flexGoalStep1Reducer(state = {}, action) {
    switch (action.type) {
        case flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS:
            return {
                flex_step1_status:flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS,
                flex_step1_data: action,
                //registration_step: 1
            };
        case flexGoalConstants.FETCH_FLEX_GOAL_PENDING:
            return {
                flex_step1_status:flexGoalConstants.FETCH_FLEX_GOAL_PENDING,
                flex_step1_data: action,
                // registration_step: 1
            };
        case flexGoalConstants.FETCH_FLEX_GOAL_FAILURE:
            return {
                flex_step1_status: flexGoalConstants.FETCH_FLEX_GOAL_FAILURE,
                flex_step1_data: action,
            };
        
        default:
            return {
                ...state,
            };
    }
}
export function flexGoalStep2Reducer(state = [], action) {
    switch (action.type) {
        case flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS_STEP2:
            return{
                flex_step2_status:flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS_STEP2,
                flex_step2_data:action,
            }
        case flexGoalConstants.FETCH_FLEX_GOAL_PENDING_STEP2:
            return{
                flex_step2_status:flexGoalConstants.FETCH_FLEX_GOAL_PENDING_STEP2,
                flex_step2_data:action,
            }
        case flexGoalConstants.FETCH_FLEX_GOAL_FAILURE_STEP2:
            return{
                flex_step2_status:flexGoalConstants.FETCH_FLEX_GOAL_FAILURE_STEP2,
                flex_step2_data:action,

        }
        
        default: return {
            ...state
        };
    }
}
export function addFlexGoalReducer(state = [], action) {
    switch (action.type) {
        case flexGoalConstants.ADD_FLEX_GOAL_SUCCESS:
            return{
                add_flex_goal_status:flexGoalConstants.ADD_FLEX_GOAL_SUCCESS,
                add_flex_goal_data:action,
            }
        case flexGoalConstants.ADD_FLEX_GOAL_PENDING:
            return{
                add_flex_goal_status:flexGoalConstants.ADD_FLEX_GOAL_PENDING,
                add_flex_goal_data:action,
            }
        case flexGoalConstants.ADD_FLEX_GOAL_FAILURE:
            return{
                add_flex_goal_status:flexGoalConstants.ADD_FLEX_GOAL_FAILURE,
                add_flex_goal_data:action,

        }
        
        default: return {
            ...state
        };
    }
}