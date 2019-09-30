import {alertConstants} from "../constants/alert.constants";

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'info-label success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'info-label error',
        message: action.message,
        status_code: action.status_code
      };
    case alertConstants.CLEAR:
      return { };
    default:
      return {};
  }
}