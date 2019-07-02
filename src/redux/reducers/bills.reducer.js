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
    // dataPlans : [],
    isFetching: false,
    isFetchingItems: false,
    // isFetchingData: false,
    billToPay: null,
    billerItems: [],
    pageState: 2,
    isFromBeneficiary: false
}; 

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_BILLS_BENEFICIARY_SUCCESS:
            return updateObject(state, {bills: action.data, isFetching : false});
            // return updateObject(state, {beneficiaries: mock, isFetching : false});
        case actionTypes.IS_FETCHING_TRUE:
           return updateObject(state, {isFetching: true});
        case actionTypes.IS_FETCHING_FALSE:
            return updateObject(state, {isFetching: false});
        case actionTypes.FETCH_BILLERS_CATEGORY_SUCCESS:
            return updateObject(state, {billers: action.data});
        case actionTypes.FETCH_BILLER_ITEMS_SUCCESS:
            return updateObject(state, {billerItems: action.data});
        case actionTypes.IS_FETCHING_BILLER_ITEM:
            return updateObject(state, {isFetchingItems: !state.isFetchingItems});
        
        // case actionTypes.SET_DATA_TRANSACTION_DETAILS:
        //     return updateObject(state, {dataToBuy: action.data, network: action.network, isFromBeneficiary: action.fromBeneficiary});
        // 
        // case actionTypes.FETCH_DEBITABLE_ACCOUNTS_SUCCESS:
        //     return updateObject(state, {debitableAccounts : action.data, isFetching: false, pinErrorMessage: null});
        //     // return updateObject(state, {debitableAccounts : mock2});
        // case actionTypes.TO_NEXT:
        //     return updateObject(state, {pinVerified : 0});
        // case actionTypes.PIN_VERIFICATION_TRY_AGAIN:
        //     return updateObject(state, {pinVerified : 2, errorMessage: null});
        // case actionTypes.IS_FETCHING_DATA:
        //     return updateObject(state, {isFetchingData : !state.isFetchingData});
        // case actionTypes.CLEAR_DATA_INFO_NOPOST:
        //     return updateObject(state, {pinVerified : 3, dataToBuy : null, dataPlans : [], debitableAccounts : [], network : ""});
        // case actionTypes.CLEAR_DATA_INFO_POST:
        //     return updateObject(state, {pinVerified : 0, dataToBuy : null, dataPlans : [], debitableAccounts : [], network : "", beneficiaries : []});
        // case alertConstants.ERROR:
        //     return updateObject(state, {pinVerified : 1, errorMessage: action.message});
        default: return state;
    }
}

export default reducer;