import {userConstants} from "../_constants";


// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};

export function requester(state={}, action) {
    switch (action.type) {
        case userConstants.PENDING:
            return {
                pending: true,
                data: action.data
            };
        case userConstants.SUCCESS:
            return {
                success: true,
                data: action
            };
        case userConstants.FAILURE:
            return {
                failure: true,
                data: action.data
            };
        default:
            return state
    }
}