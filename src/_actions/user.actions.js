import { userConstants } from '../_constants';
// import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import {ApiService} from "../shared/apiService";
import {routes} from "../shared/urls";

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
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
        console.log(consume);
        return consume
            .then(function (response){
            // console.log(response.data);
            let user = localStorage.setItem("user", JSON.stringify(response.data));
            // console.log(user);
            //     this.apiService.getEncrytionRule(encrytedData => {
            //         this.sharedData.keepData('encryptedFigure', encrytedData);
            //     });

            dispatch(success(response.data));
            history.push('/dashboard');
        }).catch(error => {
            // console.log(err.response.data.message);
            console.log(error.response);
            // submitting = false;
            // throw new SubmissionError({ _error: err.response.data.message});
            dispatch(failure(error.response.data.message.toString()));
            dispatch(alertActions.error(error.response.data.message.toString()));
        });

        // userService.login(email, password)
        //     .then(
        //         user => {
        //             dispatch(success(user));
        //             history.push('/');
        //         },
        //         error => {
        //             dispatch(failure(error.toString()));
        //             dispatch(alertActions.error(error.toString()));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(response) { return { type: userConstants.LOGIN_SUCCESS, response } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    // userService.logout();
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

function getAll() {
    return dispatch => {
        dispatch(request());

        // userService.getAll()
        //     .then(
        //         users => dispatch(success(users)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        // userService.delete(id)
        //     .then(
        //         user => dispatch(success(id)),
        //         error => dispatch(failure(id, error.toString()))
        //     );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}