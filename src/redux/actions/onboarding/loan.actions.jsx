import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {alertActions} from "../alert.actions";
import {SystemConstant} from "../../../shared/constants";
import { modelStateErrorHandler } from "../../../shared/utils";
import { loanOnboardingConstants } from '../../constants/onboarding/loan.constants';

export const loanOnbaordingStep1 =(data)=>{
    //SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.LOANS_STEP_1,
             "POST", data);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                dispatch(success(response.data, data));
            })
            .catch(error => {
                console.log("error in here");
               // dispatch(success(response.data, request));
                 dispatch(failure(modelStateErrorHandler(error)));
                 dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: loanOnboardingConstants.LOAN_STEP1_PENDING, request } }
    function success(response, request) { return { type: loanOnboardingConstants.LOAN_STEP1_SUCCESS, response : response, data: request } }
    function failure(error) { return { type: loanOnboardingConstants.LOAN_STEP1_FAILURE, error } }
}