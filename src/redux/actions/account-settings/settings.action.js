import * as actionTypes from '../../constants/account-settings/settings.constants';

import { alertActions } from "../alert.actions";
import { handleError, modelStateErrorHandler } from './../../../shared/utils';
import { SystemConstant } from "../../../shared/constants";
import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";

export const isFetchingTrue = () => {
    return {
        type: actionTypes.IS_FETCHING_TRUE
    }
}

export const isFetchingFalse = () => {
    return {
        type: actionTypes.IS_FETCHING_FALSE
    }
}

export const resetPageState = () => {
    return {
        type: actionTypes.RESET_PAGE_STATE,
    };
};
export const clearChangePinData = () => {
    return {
        type: actionTypes.CLEAR_CHANGE_PIN_DATA,
    };
};

export const storeInfo = (data) => {
    return {
        type: actionTypes.STORE_INFO,
        data: data
    };
};

export const clearQuestionData = () => {
    return {
        type: actionTypes.CLEAR_QUESTION_DATA,
    };
};



export const changePassword = (token, payload, callback) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CHANGE_PASSWORD, "POST", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                console.log(response.data);
                callback();
                dispatch(success(response.data));

            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) {
        return {
            type: actionTypes.CHANGE_PIN_SUCCESS,
            data: data
        }
    }
};

export const changeAlatPin = (token, payload) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CHANGE_PIN, "POST", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                //  console.log(response.data);
                dispatch(success());
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) {
        return {
            type: actionTypes.CHANGE_PIN_SUCCESS,
            data: data
        }
    }
};

export const getSecurityQuestion = (token, payload) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_RANDOM_SECURITY_QUESTION, "GET", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                console.log(response.data);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) {
        return {
            type: actionTypes.GET_QUESTION_SUCCESS,
            data: data
        }
    }
};

export const getSecurityQuestionForgot = (token, payload) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_RANDOM_SECURITY_QUESTION, "GET", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                console.log(response.data);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) {
        return {
            type: actionTypes.GET_QUESTION_SUCCESS_FORGOT,
            data: data
        }
    }
};

export const checkSecurityQuestionAnswerNoOTP = (token, payload) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CHECK_ANSWER_WITHOUT_OTP, "POST", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                dispatch(success());
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() {
        return {
            type: actionTypes.CHANGE_PIN_ANSWER_CORRECT,
        }
    }
};

export const checkSecurityQuestionAnswer = (token, payload, isResending = false) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.CHECK_ANSWER, "POST", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                if (isResending == false) {
                    dispatch(success(response.data));
                } else {
                    dispatch(isFetchingFalse());
                }
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) {
        return {
            type: actionTypes.FORGOT_PIN_ANSWER_CORRECT,
            data: data
        }
    }
};

export const verifyOtpForForgotPassword = (token, payload) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.VERIFYSKIPOTPURL, "POST", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                dispatch(success());
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() {
        return {
            type: actionTypes.OTP_VERIFY_SUCCESS,
        }
    }
};

export const resetPin = (token, payload) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.RESET_PIN, "POST", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                dispatch(success());
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success() {
        return {
            type: actionTypes.RESET_PIN_SUCCESS,
        }
    }
};


export const getAllSecurityQuestions = (token, payload) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_ALL_SECURITY_QUESTIONS, "POST", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                console.log(response.data);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function success(data) {
        return {
            type: actionTypes.GET_SECURITY_QUESTIONS_SUCCESS,
            data: data
        }
    }
};

export const saveSecurityQuestion = (token, payload, callback) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.SAVE_SECURITY_QUESTION, "POST", payload, SystemConstant.HEADER);
        dispatch(isFetchingTrue());
        return consume
            .then(response => {
                dispatch(success());
                dispatchClearQuestion();
            })
            .catch(error => {
                dispatch(isFetchingFalse());
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function dispatchClearQuestion() {
        setTimeout(() => {
            callback();
        }, 5000);
    };

    function success(data) {
        return {
            type: actionTypes.SAVE_SECURITY_QUESTION_SUCCESS,
            data: data
        }
    }
};



