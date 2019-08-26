import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {listStyleConstants} from "../../constants/lifestyle/lifestyle-constants";
import {SystemConstant} from "../../../shared/constants";
import {alertActions} from "../alert.actions";
import {modelStateErrorHandler} from "../../../shared/utils";



export const FetchMovie = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_MOVIES_LIST, "GET", null, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type:listStyleConstants.GET_MOVIE_LIST_PENDING, request} }
    function success(response) { return {type:listStyleConstants.GET_MOVIE_LIST_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.GET_MOVIE_LIST_FAILURE, error} }
};


export const getCinemaList = (token) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_MOVIE_CINEMAS, "GET", null, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };

    function request(request) { return { type:listStyleConstants.GET_CINEMA_LIST_PENDING, request} }
    function success(response) { return {type:listStyleConstants.GET_CINEMA_LIST_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.GET_CINEMA_LIST_ERROR, error} }
};

export const getSingleMovie = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_SINGLE_MOVIE, "GET", null, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };

    function request(request) { return { type:listStyleConstants.GET_SINGLE_MOVIE_PENDING, request} }
    function success(response) { return {type:listStyleConstants.GET_SINGLE_MOVIE_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.GET_SINGLE_MOVIE_ERROR, error} }
};

export const buyMovieTicket = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.BUY_MOVIE_TICKET, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };

    function request(request) { return { type:listStyleConstants.BUY_MOVIE_TICKET_PENDING, request} }
    function success(response) { return {type:listStyleConstants.BUY_MOVIE_TICKET_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.BUY_MOVIE_TICKET_ERROR, error} }
};


export const getEvents = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_EVENTS, "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };

    function request(request) { return { type:listStyleConstants.GET_EVENTS_PENDING, request} }
    function success(response) { return {type:listStyleConstants.GET_EVENTS_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.GET_EVENTS_ERROR, error} }
};

export const getSingleEvent = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_SINGLE_EVENT, "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };

    function request(request) { return { type:listStyleConstants.GET_SINGLE_EVENT_PENDING, request} }
    function success(response) { return {type:listStyleConstants.GET_SINGLE_EVENT_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.GET_SINGLE_EVENT_ERROR, error} }
};


export const purchaseEventTicket = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.BUY_EVENT_TICKET, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                if(error.response.message){
                    dispatch(alertActions.error(modelStateErrorHandler(error)));
                }
            });
    };

    function request(request) { return { type:listStyleConstants.BUY_EVENT_TICKET_PENDING, request} }
    function success(response) { return {type:listStyleConstants.BUY_EVENT_TICKET_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.BUY_EVENT_TICKET_ERROR, error} }
};


