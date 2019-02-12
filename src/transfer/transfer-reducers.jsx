import {combineReducers} from "redux";
import {bankListRequest} from "./transfer-reducer";

// export * from './transfer-reducer';
// console.error('Transfer Reducer');
const transferReducer = combineReducers({
    bankList: bankListRequest
});

export default transferReducer;