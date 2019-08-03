import {
    fixedGoalConstants
} from '../../../constants/goal/fixed-goal.constant'

// add FixedGoal
export const fetchFixedGoalStep1 = (data) =>{
    return(dispatch)=>{
        dispatch(success(data))
    }
    function success(data){
        return{
            type:fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS,
            data:data
        }
    }
}

export const fetchFixedGoalStep2 =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    }
    function success(data){
        return{
            type:fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS_STEP2,
            data:data
        }
    }
}

