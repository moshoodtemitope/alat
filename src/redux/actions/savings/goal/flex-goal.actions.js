import {
    flexGoalConstants
} from '../../../constants/goal/flex-goal.constant';
import {alertActions} from "../../alert.actions";
import { modelStateErrorHandler } from "../../../../shared/utils";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";



// add FixedGoal
export const fetchFlexGoalStep1 = (data) =>{
    return(dispatch)=>{
        dispatch(success(data))
    }
    function success(data){
        return{
            type:flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS,
            data:data
        
        }
    }
}

export const fetchFlexGoalStep2 =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    }
    function success(data){
        return{
            type:flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS_STEP2,
            data:data
        }
    }
}
export const addFlexGoal =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.ADDFLEXIGOAL,
             "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
            })
            .catch(error => {
               // console.log("error in here");
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type:flexGoalConstants.ADD_FLEX_GOAL_PENDING,  request } }
    function success(response, request) { return { type: flexGoalConstants.ADD_FLEX_GOAL_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: flexGoalConstants.ADD_FLEX_GOAL_FAILURE, error } }
}
