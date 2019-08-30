import * as actionTypes from "../constants/account-settings/settings.constants";
import { alertConstants } from "../constants/alert.constants";
import { getOnlyNumericPhoneNumber } from '../../shared/utils'

import { updateObject } from '../actions/dataActions/data.actions';

//--------------------------//
//Page status
// 0-correct/good to go
// 1-There is an error
// 2-Retry Pin/default State
// 3-go to start
//--------------------------//

const initialState = {
    isFetching: false,
    pageState: 2,
    forgotPinData: null,
    changePinData: null,
    storedInfo: null,
    questionsData: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IS_FETCHING_TRUE:
            return updateObject(state, { isFetching: true });
        case actionTypes.IS_FETCHING_FALSE:
            return updateObject(state, { isFetching: false });
        case actionTypes.CHANGE_PIN_SUCCESS:
            return updateObject(state, { pageState: 0, isFetching: false });
        case actionTypes.GET_QUESTION_SUCCESS:
            return updateObject(state, { isFetching: false, pageState: 0, changePinData: { Question: action.data.message } });
        case actionTypes.GET_QUESTION_SUCCESS_FORGOT:
            return updateObject(state, { isFetching: false, pageState: 0, forgotPinData: { Question: action.data.message } });
        case actionTypes.CHANGE_PIN_ANSWER_CORRECT:
            return updateObject(state, { isFetching: false, pageState: 0 });
        case actionTypes.FORGOT_PIN_ANSWER_CORRECT:
            return updateObject(state, { isFetching: false, pageState: 0, forgotPinData: { ...state.forgotPinData, otpPhone: getOnlyNumericPhoneNumber(action.data.message) } });
        case actionTypes.RESET_PAGE_STATE:
            return updateObject(state, { pageState: 2 });
        case actionTypes.STORE_INFO:
            return updateObject(state, { storedInfo: action.data });
        case actionTypes.OTP_VERIFY_SUCCESS:
            return updateObject(state, { pageState: 0, isFetching: false });
        case actionTypes.RESET_PIN_SUCCESS:
            return updateObject(state, { pageState: 0, isFetching: false });
        case actionTypes.SAVE_SECURITY_QUESTION_SUCCESS:
            return updateObject(state, { pageState: 0, isFetching: false });
        case actionTypes.CLEAR_QUESTION_DATA:
            return updateObject(state, { pageState: 2, questionsData: null });
        case actionTypes.GET_SECURITY_QUESTIONS_SUCCESS:
            return updateObject(state, { pageState: 0, isFetching: false, questionsData: action.data });
        case actionTypes.CLEAR_CHANGE_PIN_DATA:
            return updateObject(state, { pageState: 2, changePinData: null, forgotPinData: null });
        default: return state;
    }
}

export default reducer;