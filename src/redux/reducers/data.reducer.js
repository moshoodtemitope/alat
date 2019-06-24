import * as actionTypes from "../constants/dataConstants/data.constant";
import {alertConstants} from "../constants/alert.constants";

import {updateObject} from '../actions/dataActions/data.actions';

// const mock = [
//     {
//         Amount: 499,
//         BeneficiaryId: 382264,
//         BillerAlias: "Not data",
//         BillerName: "OtherBills",
//         BillerPaymentCode: "0427757",
//         CustomerId: 0,
//         DataNetwork: "Airtel Data Plan",
//         IsAirtime: true,
//         NetworkCode: 3,
//         PaymentItem: "Data ERC - N500(750MB valid for 14 days)",
//         PhoneNumber: "08163152616",
//     },
//     {
//         Amount: 1000,
//         BeneficiaryId: 382264,
//         BillerAlias: "Na data data",
//         BillerName: "OtherBills",
//         BillerPaymentCode: "0427757",
//         CustomerId: 0,
//         DataNetwork: "Airtel Data Plan",
//         IsAirtime: false,
//         NetworkCode: 2,
//         PaymentItem: "Data ERC - N500(750MB valid for 14 days)",
//         PhoneNumber: "08163152000",
//     },
//     {
//         Amount: 800,
//         BeneficiaryId: 382264,
//         BillerAlias: "Na 2nd data data",
//         BillerName: "OtherBills",
//         BillerPaymentCode: "0427757",
//         CustomerId: 0,
//         DataNetwork: "Airtel Data Plan",
//         IsAirtime: false,
//         NetworkCode: 3,
//         PaymentItem: "Data ERC - N500(750MB valid for 14 days)",
//         PhoneNumber: "08163152616",
//     },
//     {
//         Amount: 8000,
//         BeneficiaryId: 382264,
//         BillerAlias: "Na 8thnd data data",
//         BillerName: "OtherBills",
//         BillerPaymentCode: "0427757",
//         CustomerId: 0,
//         DataNetwork: "Airtel Data Plan",
//         IsAirtime: false,
//         NetworkCode: 3,
//         PaymentItem: "Data ERC - N500(750MB valid for 14 days)",
//         PhoneNumber: "08163152616",
//     },
//     {
//         Amount: 5000,
//         BeneficiaryId: 382264,
//         BillerAlias: "Nobi data",
//         BillerName: "OtherBills",
//         BillerPaymentCode: "0427757",
//         CustomerId: 0,
//         DataNetwork: "Airtel Data Plan",
//         IsAirtime: true,
//         NetworkCode: 3,
//         PaymentItem: "Data ERC - N500(750MB valid for 14 days)",
//         PhoneNumber: "08163152616",
//     }
// ];

//--------------------------//
//Pin Verifed status
// 0-correct/good to go
// 1-There is an error
// 2-Retry Pin/default State
// 3-go to start
//--------------------------//

const initialState = {
    beneficiaries : [],
    dataPlans : [],
    isFetching: false,
    isFetchingData: false,
    dataToBuy: null,
    debitableAccounts : [],
    pinVerified: 2,
    errorMessage: null,
    network: ""
}; 

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_DATA_BENEFICIARIES_SUCCESS:
            return updateObject(state, {beneficiaries: action.data, isFetching : false});
            // return updateObject(state, {beneficiaries: mock, isFetching : false});
        case actionTypes.IS_FETCHING_TRUE:
           return updateObject(state, {isFetching: true});
        case actionTypes.IS_FETCHING_FALSE:
            return updateObject(state, {isFetching: false});
        case actionTypes.SET_DATA_TRANSACTION_DETAILS:
            return updateObject(state, {dataToBuy: action.data, network: action.network});
        case actionTypes.FETCH_DATA_PLAN_SUCCESS:
            return updateObject(state, {dataPlans: action.data, network : ""});
        case actionTypes.FETCH_DEBITABLE_ACCOUNTS_SUCCESS:
            return updateObject(state, {debitableAccounts : action.data, isFetching: false, pinErrorMessage: null});
            // return updateObject(state, {debitableAccounts : mock2});
        case actionTypes.TO_NEXT:
            return updateObject(state, {pinVerified : 0});
        case actionTypes.PIN_VERIFICATION_TRY_AGAIN:
            return updateObject(state, {pinVerified : 2, errorMessage: null});
        case actionTypes.IS_FETCHING_DATA:
            return updateObject(state, {isFetchingData : !state.isFetchingData});
        case actionTypes.CLEAR_DATA_INFO_NOPOST:
            return updateObject(state, {pinVerified : 3, dataToBuy : null, dataPlans : [], debitableAccounts : [], network : ""});
        case actionTypes.CLEAR_DATA_INFO_POST:
            return updateObject(state, {pinVerified : 0, dataToBuy : null, dataPlans : [], debitableAccounts : [], network : ""});
        case alertConstants.ERROR:
            return updateObject(state, {pinVerified : 1, errorMessage: action.message});
        default: return state;
    }
}

export default reducer;