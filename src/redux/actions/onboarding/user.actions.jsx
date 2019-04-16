import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {alertActions} from "../alert.actions";
import {history} from './../../../_helpers/history';
import {USER_REGISTER_FETCH, USER_REGISTER_SAVE, userConstants} from "../../constants/onboarding/user.constants";

export const userActions = {
    login,
    logout,
    register,
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));
        let data = {
            email: email,
            password: password,
            deviceName: 'rdtr',
            deviceOs: 'uhiu',
            gcmRegId: '',
            channelId: 2,
            deviceCode: 'uytyyt',
            imei: '123456789012345'
        };

        let consume = ApiService.request(routes.LOGIN, "POST", data);
        return consume
            .then(function (response){
                // console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                // console.log(user);
                //     this.apiService.getEncrytionRule(encrytedData => {
                //         this.sharedData.keepData('encryptedFigure', encrytedData);
                //     });
                // console.log(response);
                // dispatch(storageActions.saveStorage(response.data));
                dispatch(success(response.data));

                history.push('/dashboard');
            }).catch(error => {
                // console.log(err.response.data.message);
                console.log(error);
                // submitting = false;
                // throw new SubmissionError({ _error: err.response.data.message});
                dispatch(failure(error.response.data.message.toString()));
                dispatch(alertActions.error(error.response.data.message.toString()));
            });


    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(response) { return { type: userConstants.LOGIN_SUCCESS, response } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    // userService.logout();
    console.error("We are logging you out...");
    localStorage.clear();
    history.push('/');
    // window.location.reload();
    return { type: userConstants.LOGOUT };
}



function register(user, action) {
    switch(action){
        case USER_REGISTER_FETCH:
            return dispatch => {
                dispatch(fetch(user));
            };
        case USER_REGISTER_SAVE:
            return dispatch => {
                dispatch(save(user));
            };
        default:
            return dispatch => {
                dispatch(pending(user));
            };
    }

    function pending(user) { return null }
    function fetch(user) { return { type: USER_REGISTER_FETCH, user } }
    function save(user) { return { type: USER_REGISTER_SAVE, user } }
}
