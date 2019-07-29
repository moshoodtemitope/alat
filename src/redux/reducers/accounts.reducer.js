import * as actionTypes from "../constants/accounts/accounts.constants";
import { alertConstants } from "../constants/alert.constants";

import { updateObject } from '../actions/dataActions/data.actions';



//--------------------------//
//Pin Verifed status
// 0-correct/good to go
// 1-There is an error
// 2-Retry Pin/default State
// 3-go to start
//--------------------------//

const initialState = {
    history: [],
    isFetching: false,
    isFetchingHistory: false,
    receivedTransactions: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCHING_HISTORY_SUCCESS:
            return updateObject(state, { history: [...state.history, ...action.data], isFetchingHistory: false });
        // return updateObject(state, {beneficiaries: mock, isFetching : false});
        case actionTypes.IS_FETCHING_TRUE:
            return updateObject(state, { isFetching: true });
        case actionTypes.IS_FETCHING_FALSE:
            return updateObject(state, { isFetching: false });
        case actionTypes.IS_FETCHING_HISTORY:
            return updateObject(state, { isFetchingHistory: true });
        case actionTypes.CLEAR_CURRENT_HISTORY:
            return updateObject(state, { history: [], receivedTransactions: 0 });
        case actionTypes.SET_RECEIVED_TRANSACTIONS:
            return updateObject(state, { receivedTransactions: action.count });
        case actionTypes.SEND_STATEMENT_SUCCESS:
            return updateObject(state, { isFetching: false });
        default: return state;
    }
}

export default reducer;