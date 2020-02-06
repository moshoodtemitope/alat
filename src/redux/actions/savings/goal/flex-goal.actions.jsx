import {
    flexGoalConstants
} from '../../../constants/goal/flex-goal.constant';
import {alertActions} from "../../alert.actions";
import { modelStateErrorHandler } from "../../../../shared/utils";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";
import {history} from "../../../../_helpers/history";




// add FixedGoal
export const fetchFlexGoalStep1 = (data) =>{
    return(dispatch)=>{
        dispatch(success(data))
    };
    function success(data){
        return{
            type:flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS,
            data:data
        
        }
    }
};

export const fetchFlexGoalStep2 =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    };
    function success(data){
        return{
            type:flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS_STEP2,
            data:data
        }
    }
};
export const addFlexGoal =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.ADDFLEXIGOAL,
             "POST", data);
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        window.smartech('identify', user.email);
        window.smartech('dispatch', 'ALAT_Goal_Create_Success', {
            "Email": user.email,
            "mobile": user.phoneNo
        });
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
               
                history.push({
                    pathname:"/savings/goal/success",
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

    function request(request) { return { type:flexGoalConstants.ADD_FLEX_GOAL_PENDING,  request } }
    function success(response, request) { return { type: flexGoalConstants.ADD_FLEX_GOAL_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: flexGoalConstants.ADD_FLEX_GOAL_FAILURE, error } }
};
export const ClearAction=(type)=>{
    return (dispatch) =>{
        dispatch(clear(type))
    };
    function clear(type){return {type : type}}
};
