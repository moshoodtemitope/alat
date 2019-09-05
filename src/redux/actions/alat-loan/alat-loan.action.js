import * as actionTypes from '../../constants/bills/bills.constant';

import {alertActions} from "../alert.actions";
import {handleError, modelStateErrorHandler} from './../../../shared/utils';
import {SystemConstant} from "../../../shared/constants";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";


export const isFetchingTrue = () => {
    return {
        type: actionTypes.IS_FETCHING_TRUE
    }
}

export const isFetchingFalse = () => {
    return {
        type: actionTypes.IS_FETCHING_FALSE
    }
}