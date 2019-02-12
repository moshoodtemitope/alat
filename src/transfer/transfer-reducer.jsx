import {userConstants} from "../_constants";
import {FETCH_BANK_FAILURE, FETCH_BANK_PENDING, FETCH_BANK_SUCCESS} from "./cash-transfer/actions";



export function bankListRequest(state=[], action) {
    switch (action.type) {
        case FETCH_BANK_PENDING:
            return {
                pending: true,
                data: action
            };
        case FETCH_BANK_SUCCESS:
            return {
                success: true,
                data: action
            };
        case FETCH_BANK_FAILURE:
            return {
                failure: true,
                data: action
            };

        default:
            return {
                pending: true,
                data: action
            };
    }
}
