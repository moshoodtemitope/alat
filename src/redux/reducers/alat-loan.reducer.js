import * as actionTypes from "../constants/alat-loan/alat-token.constant";

import { updateObject } from '../actions/dataActions/data.actions';



//--------------------------//
//Page State status
// 0-correct/good to go
// 1-There is an error
// 2-Retry Pin/default State
// 3-go to start
//--------------------------//

const initialState = {
    isFetching: false,
    isFetchingLoan: false,
    pageState: 2,
    activeLoans: [],
    pastLoans: [],
    loanInfo: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IS_FETCHING_TRUE:
            return updateObject(state, { isFetching: true });
        case actionTypes.IS_FETCHING_FALSE:
            return updateObject(state, { isFetching: false });
        case actionTypes.FETCH_ACTIVE_LOANS_SUCCESS:
            return updateObject(state, { isFetchingLoan: false, activeLoans: action.data });
        case actionTypes.IS_FETCHING_LOAN_TRUE:
            return updateObject(state, { isFetchingLoan: true });
        case actionTypes.IS_FETCHING_LOAN_FALSE:
            return updateObject(state, { isFetchingLoan: false });
        case actionTypes.SET_LOAN_TO_LIQUIDATE:
            return updateObject(state, { loanInfo: action.data });
        case actionTypes.CLEAR_LOAN_INFO:
            return updateObject(state, { loanInfo: null });

        default: return state;
    }
}

export default reducer;