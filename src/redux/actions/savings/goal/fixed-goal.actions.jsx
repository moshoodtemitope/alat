import {
    fixedGoalConstants
} from '../../../constants/goal/fixed-goal.constant';
import {alertActions} from "../../alert.actions";
import { modelStateErrorHandler } from "../../../../shared/utils";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";
import {history} from "../../../../_helpers/history";



// add FixedGoal
export const fetchFixedGoalStep1 = (data) =>{
    return(dispatch)=>{
        dispatch(success(data))
    };
    function success(data){
        return{
            type:fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS,
            data:data
        }
    }
};

export const fetchFixedGoalStep2 =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    };
    function success(data){
        return{
            type:fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS_STEP2,
            data:data
        }
    }
};
export const addFixedGoal =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.ADDGOAL,
             "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
                history.push({
                    pathname:"/savings/fixed-goal-success",
                    state:{details:response.data}
                })
            })
            .catch(error => {
               // console.log("error in here");
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type:fixedGoalConstants.ADD_FIXED_GOAL_PENDING,  request } }
    function success(response, request) { return { type: fixedGoalConstants.ADD_FIXED_GOAL_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: fixedGoalConstants.ADD_FIXED_GOAL_FAILURE, error } }
}
