import {alertConstants} from "../constants/alert.constants";

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message, code=null) {
    // console.log(code);
    return { type: alertConstants.ERROR, message, status_code : code };
}

function clear() {
    return { type: alertConstants.CLEAR };
}