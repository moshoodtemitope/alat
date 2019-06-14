import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {airtimeConstants} from "../../constants/airtime/airtime.constants";
import {SystemConstant} from "../../../shared/constants";
import { modelStateErrorHandler } from "../../../shared/utils";
import { alertActions } from "../alert.actions";

//const user = JSON.parse(localStorage.getItem("user"));

export const getAirtimeBeneficiaries = (token) => {

    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.AIRTIME_BENEFICIARIES, "POST", SystemConstant.HEADER);
        dispatch(request(consume));
        return consume
            .then(response => {
                //TODO: edit localDB accounts object
                console.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                //dispatch(failure(modelStateErrorHandler(error)));
               dispatch(alertActions.error(modelStateErrorHandler(error)));
                // throw(error);
            });
    };

    function request(request) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_PENDING, request } }
    function success(response) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_SUCCESS, response } }
    function failure(error) { return { type: airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_FAILURE, error } }
};