import { userConstants } from '../_constants';
// import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import {ApiService} from "../shared/apiService";
import {routes} from "../shared/urls";
import {storageConstants} from "../_constants/storage.constants";
import {storageActions} from "./storage";

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
    // window.location.reload();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        // userService.register(user)
        //     .then(
        //         user => {
        //             dispatch(success());
        //             history.push('/login');
        //             dispatch(alertActions.success('Registration successful'));
        //         },
        //         error => {
        //             dispatch(failure(error.toString()));
        //             dispatch(alertActions.error(error.toString()));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
