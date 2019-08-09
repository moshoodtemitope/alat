import {
    createGoalConstants
} from '../../constants/goal/create-stash.constant'
export function createStashGoalStep1Reducer(state = {}, action) {
    switch (action.type) {
        case createGoalConstants.CREATE_STASH_GOAL_SUCCESS_STEP1:
            return {
                stash_goal_step1_status:createGoalConstants.CREATE_STASH_GOAL_SUCCESS_STEP1,
                stash_goal_step1_data: action,
                //registration_step: 1
            };
        case createGoalConstants.CREATE_STASH_GOAL_PENDING_STEP1:
            return {
                stash_goal_step1_status:createGoalConstants.CREATE_STASH_GOAL_PENDING_STEP1,
                stash_goal_step1_data: action,
                // registration_step: 1
            };
        case createGoalConstants.CREATE_STASH_GOAL_FAILURE_STEP1:
            return {
                stash_goal_step1_status: createGoalConstants.CREATE_STASH_GOAL_FAILURE_STEP1,
                stash_goal_step1_data: action,
            };
        
        default:
            return {
                ...state,
            };
    }
}

export function createStashGoalReducer(state = [], action) {
    switch (action.type) {
        case createGoalConstants.CREATE_STASH_GOAL_SUCCESS:
            return{
                create_stash_goal_status:createGoalConstants.CREATE_STASH_GOAL_SUCCESS,
                create_stash_goal_data:action,
            };
        case createGoalConstants.CREATE_STASH_GOAL_PENDING:
            return{
                create_stash_goal_status:createGoalConstants.CREATE_STASH_GOAL_PENDING,
<<<<<<< Updated upstream
                create_stash_data:action,
=======
                create_stash_goal_data:action,
>>>>>>> Stashed changes
            };
        case createGoalConstants.CREATE_STASH_GOAL_FAILURE:
            return{
                create_stash_goal_status:createGoalConstants.CREATE_STASH_GOAL_FAILURE,
                create_stash_goal_data:action,

        };
        
        default: return {
            ...state
        };
    }
}