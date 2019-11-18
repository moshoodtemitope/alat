import * as actionTypes from "../constants/alat-loan/alat-loan.constant";

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
    loanDetail: null,
    isSuccess: false,
    loanStatusData: null,
    loanOffers: [],
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
            return updateObject(state, { loanInfo: action.data, pageState: 2, isSuccess: false });
        case actionTypes.CLEAR_LOAN_INFO:
            return updateObject(state, { loanInfo: null, });
        case actionTypes.RESET_PAGE_STATE:
            return updateObject(state, { pageState: action.code });
        case actionTypes.LOAN_REPAID_SUCCESS:
            return updateObject(state, { pageState: 0, isSuccess: true });
        case actionTypes.RESET_JOURNEY:
            return updateObject(state, { pageState: 2, isSuccess: false, loanStatusData: null, loanDetail: null });
        case actionTypes.GET_LOAN_STATE_SUCCESS:
            return updateObject(state, { isFetching: false, loanStatusData: action.data });
        case actionTypes.GET_LOAN_OFFERS_SUCCESS:
            return updateObject(state, { isFetching: false, loanOffers: action.data });
        case actionTypes.SEND_LOAN_FOR_OTP_SUCCESS:
            return updateObject(state, { isFetching: false, pageState: 0 });
        case actionTypes.SEND_LOAN_WITH_OTP_SUCCESS:
            return updateObject(state, { isFetching: false, pageState: 0, loanDetail : {...state.loanDetail, loanId : action.data.Id}});
        case actionTypes.SET_LOAN_DETAIL:
            return updateObject(state, { isFetching: false, loanDetail: action.data });
        case actionTypes.ACCEPT_INTERSWITCH_LOAN_SUCCESS:
            return updateObject(state, { isFetching: false, pageState: 0 });
        case actionTypes.FETCH_PAST_LOAN_SUCCESS:
            return updateObject(state, { isFetching: false, pastLoans: action.data });
        case actionTypes.AUTOMATE_REPAYMENT_SUCCESS:
            return updateObject(state, { isFetching: false, pageState: 0 });

        default: return state;
    }
}

export default reducer;