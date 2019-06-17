import * as actionTypes from "../constants/dataConstants/data.constant";

import {updateObject} from '../actions/dataActions/data.actions';

// const mock = [
//     {
//         BillerName: "MTN",
//         PhoneNumber: "08166445586",
//         Amount: 5000,
//         BillerAlias: "My Data"
//     },
//     {
//         BillerName: "GLO",
//         PhoneNumber: "08166000586",
//         Amount: 300,
//         BillerAlias: "WIfe Data"
//     },
//     {
//         BillerName: "9MOBILE",
//         PhoneNumber: "08099445586",
//         Amount: 80,
//         BillerAlias: "My Data"
//     },
//     {
//         BillerName: "AIRTEL",
//         PhoneNumber: "08099445586",
//         Amount: 80,
//         BillerAlias: "Airtel Data"
//     }
// ];

const initialState = {
    currentComponent : "Index",
    beneficiaries : [],
    isFetching: false
}; 

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SWITCH_CURRENT_COMPONENT:
            return updateObject(state, {currentComponent: action.name});
        case actionTypes.FETCH_DATA_BENEFICIARIES_SUCCESS:
            return updateObject(state, {beneficiaries: action.data, isFetching : false});
            // return updateObject(state, {beneficiaries: mock, isFetching : false});
        case actionTypes.IS_FETCHING_TRUE:
           return updateObject(state, {isFetching: true});
        case actionTypes.IS_FETCHING_FALSE:
            return updateObject(state, {isFetching: false});
        default: return state;
    }
}

export default reducer;