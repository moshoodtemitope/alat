import {
    createGoalConstants
} from '../../../constants/goal/create-stash.constant';
import {alertActions} from "../../alert.actions";
import { modelStateErrorHandler } from "../../../../shared/utils";
import {ApiService} from "../../../../services/apiService";
import {routes} from "../../../../services/urls";
import  {history} from "../../../../_helpers/history";


export const createStashGoalStep1 =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    }
    function success(data){
        return{
            type:createGoalConstants.CREATE_STASH_GOAL_SUCCESS_STEP1,
            data:data
        }
    }
};


// add StashGoal
export const CreateStashGoal =(data)=>{
    return (dispatch) => {
        let consume = ApiService.request(routes.ADDSTACHGOAL,
             "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
                history.push({
                    pathname:"/savings/goal/create-stash-success-message",
                    state:{
                        details:response.data,
                    }
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

    function request(request) { return { type:createGoalConstants.CREATE_STASH_GOAL_PENDING,  request } }
    function success(response, request) { return { type: createGoalConstants.CREATE_STASH_GOAL_SUCCESS, data: { response : response, request: request } }}
    function failure(error) { return { type: createGoalConstants.CREATE_STASH_GOAL_SUCCESS, error } }
};
