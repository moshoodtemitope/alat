import * as actionTypes from "../constants/bills/bills.constant";

import {updateObject} from '../actions/dataActions/data.actions';



//--------------------------//
//Page State status
// 0-correct/good to go
// 1-There is an error
// 2-Retry Pin/default State
// 3-go to start
//--------------------------//

const initialState = {
    bills : [],
    billers: [],
    otpData : null,
    isFetching: false,
    isFetchingItems: false,
    subscriberName: "",
    billToPay: null,
    billerItems: [],
    pageState: 2,
    isFromBeneficiary: false
}; 

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_BILLS_BENEFICIARY_SUCCESS:
            return updateObject(state, {bills: action.data, isFetching : false});
        case actionTypes.IS_FETCHING_TRUE:
           return updateObject(state, {isFetching: true});
        case actionTypes.IS_FETCHING_FALSE:
            return updateObject(state, {isFetching: false});
        case actionTypes.FETCH_BILLERS_CATEGORY_SUCCESS:
            return updateObject(state, {billers: action.data, isFetching : false});
        case actionTypes.FETCH_BILLER_ITEMS_SUCCESS:
            return updateObject(state, {billerItems: action.items,isFetching : false});
        case actionTypes.IS_FETCHING_BILLER_ITEM:
            return updateObject(state, {isFetchingItems: !state.isFetchingItems});
        case actionTypes.SET_BILL_TO_PAY_INFO:
            return updateObject(state, {billToPay: action.data, otpData: action.otpPayload});
        case actionTypes.VALID_SUBSCRIBER_NAME:
            return updateObject(state, {subscriberName: action.data.SubscriberName, pageState: 0, isFetching: false});
        case actionTypes.RESET_PAGE_STATE_BILL:
            return updateObject(state, {pageState: action.code});
        case actionTypes.FETCH_OTP_SUCCESS:
            return updateObject(state, {pageState: 0});
        case actionTypes.SAVE_BILL_BENEFICIARY_SUCCESS:
            return updateObject(state, {pageState: 0});
        case actionTypes.VERIFY_OTP_SUCCESS:
            return updateObject(state, {pageState: 0});
        case actionTypes.CLEAR_ALL_BILLS_DATA:
            return updateObject(state, initialState);
        case actionTypes.GO_TO_DASHBOARD_BILL:
            return updateObject(state, {pageState: 3});
        default: return state;
    }
}

export default reducer;