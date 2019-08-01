import * as actionTypes from "../constants/accounts/accounts.constants";
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
    history: [],
    receiptHistory: [],
    isFetching: false,
    isFetchingHistory: false,
    receivedTransactions: 0,
    limits: { LimitToCompare: "--Fetching max limit--" },
    limitData: null,
    pageState: 2,
    sendingReceipt: false,
    receiptResponse: 2, //0 success,1 open, 2 close
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCHING_HISTORY_SUCCESS:
            return updateObject(state, { history: [...state.history, ...action.data], isFetchingHistory: false });
        case actionTypes.FETCHING_RECEIPT_HISTORY_SUCCESS:
            return updateObject(state, { receiptHistory: [...state.receiptHistory, ...action.data], isFetchingHistory: false });
        case actionTypes.IS_FETCHING_TRUE:
            return updateObject(state, { isFetching: true });
        case actionTypes.IS_FETCHING_FALSE:
            return updateObject(state, { isFetching: false });
        case actionTypes.IS_FETCHING_HISTORY:
            return updateObject(state, { isFetchingHistory: true });
        case actionTypes.CLEAR_CURRENT_HISTORY:
            return updateObject(state, { history: [], receiptHistory: [], receivedTransactions: 0 });
        case actionTypes.SET_RECEIVED_TRANSACTIONS:
            return updateObject(state, { receivedTransactions: action.count });
        case actionTypes.SEND_STATEMENT_SUCCESS:
            return updateObject(state, { isFetching: false });
        case actionTypes.GET_LIMIT_SUCCESS:
            return updateObject(state, { limits: action.data });
        case actionTypes.GET_LIMIT_FAILED:
            return updateObject(state, { limits: action.data });
        case actionTypes.SET_LIMIT_DATA:
            return updateObject(state, { limitData: action.data });
        case actionTypes.SUCCESS_NEXT_PAGE:
            return updateObject(state, { pageState: 0 });
        case actionTypes.RESET_PAGE_STATE:
            return updateObject(state, { pageState: 2 });
        case actionTypes.IS_SENDING_RECEIPT:
            return updateObject(state, { sendingReceipt: !state.sendingReceipt });
        case actionTypes.SEND_RECEIPT_SUCCESS:
            return updateObject(state, { sendingReceipt: false, receiptResponse: 0 });
        case actionTypes.CLEAR_RESPONSE:
            return updateObject(state, { receiptResponse: action.status });
        default: return state;
    }
}

export default reducer;