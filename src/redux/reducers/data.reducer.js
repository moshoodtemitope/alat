import * as actionTypes from "../constants/dataConstants/data.constant";

import {updateObject} from '../actions/dataActions/data.actions';

const initialState = {
    currentComponent : "Index",
    beneficiaries : []
}; 

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SWITCH_CURRENT_COMPONENT:
            return updateObject(state, {currentComponent: action.name});
        case actionTypes.FETCH_DATA_BENEFICIARIES_SUCCESS:
            return updateObject(state, {beneficiaries: action.data});
        default: return state;
    }
}

export default reducer;