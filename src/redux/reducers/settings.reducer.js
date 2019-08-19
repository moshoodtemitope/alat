import * as actionTypes from "../constants/account-settings/settings.constants";
import { alertConstants } from "../constants/alert.constants";

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
            return updateObject(state, { pageState: 0, isFetching: false });
        case actionTypes.RESET_PAGE_STATE:
            return updateObject(state, { pageState: 2 });
        default: return state;
    }
}

export default reducer;