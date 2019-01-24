import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}

// export function authentication (state = initialState, action) {
//     switch(action.type) {
//         case USER_INIT:
//             console.log(action);
//             return {
//                 loggedIn: true,
//                 user: action.user
//             };
//             // return state.set("fields", Immutable.fromJS(action.data.person) )
//
//         default:
//             return state
//
//     }
// }