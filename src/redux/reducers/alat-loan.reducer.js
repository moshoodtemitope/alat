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
    isFetching: false,
    pageState: 2,
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.IS_FETCHING_TRUE:
           return updateObject(state, {isFetching: true});
        case actionTypes.IS_FETCHING_FALSE:
            return updateObject(state, {isFetching: false});
        default: return state;
    }
}

export default reducer;