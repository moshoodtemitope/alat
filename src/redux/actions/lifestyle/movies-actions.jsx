import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {listStyleConstants} from "../../constants/lifestyle/lifestyle-constants";
import {SystemConstant} from "../../../shared/constants";
import {alertActions} from "../alert.actions";
import {modelStateErrorHandler} from "../../../shared/utils";
import {history} from "../../../_helpers/history";




export const FetchMovie = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_MOVIES_LIST + data, "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        
        return consume
            .then(response => {
                // console.log("=======",response);
                dispatch(success(response.data, data));
                let user_details = localStorage.getItem("user");
                let user = JSON.parse(user_details)
                console.log(user)
                // window.smartech('identify', user.email);
                // window.smartech('dispatch', 'alat_movies', {
                //     "Email": user.email,
                //     "mobile": user.phoneNo
                // });
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type:listStyleConstants.GET_MOVIE_LIST_PENDING, request} }
    function success(response) { return {type:listStyleConstants.GET_MOVIE_LIST_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.GET_MOVIE_LIST_FAILURE, error} }
};

export const SearchFetchMovie = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_MOVIES_LIST + 1 + "&" + 'search=' + data, "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                console.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(alertActions.error(modelStateErrorHandler(error)));
            });
    };

    function request(request) { return { type:listStyleConstants.SEARCH_FETCH_MOVIE_PENDING, request} }
    function success(response) { return {type:listStyleConstants.SEARCH_FETCH_MOVIE_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.SEARCH_FETCH_MOVIE_FAILURE, error} }
};



export const getCinemaList = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_MOVIE_CINEMAS, "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                // console.log(response);
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
        let consume = ApiService.request(routes.GET_SINGLE_MOVIE, "GET", data, SystemConstant.HEADER, false);
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
export const fetchMovieGenre = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_MOVIE_GENRE, "GET", data, SystemConstant.HEADER, false);
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

    function request(request) { return { type:listStyleConstants.FETCH_MOVIE_GENRE_PENDING, request} }
    function success(response) { return {type:listStyleConstants.FETCH_MOVIE_GENRE_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.FETCH_MOVIE_GENRE_FAILURE, error} }
};

export const buyMovieTicket = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.BUY_MOVIE_TICKET, "POST", data, SystemConstant.HEADER, false);
        console.log("movie name",data)
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        console.log("+++++++", user)
        dispatch(request(consume));
        // window.smartech('identify', user.email);
        // window.smartech('dispatch', 'alat_movies_purchase success', {
        //     "Email": user.email,
        //     "mobile": user.phoneNo,
        //     "moviename": data.title,
        // });
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
                history.push({
                    pathname:"/lifestyle/movie-success",
                    state:{details:response.data}
                })
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));


            });
    };

    function request(request) { return { type:listStyleConstants.BUY_MOVIE_TICKET_PENDING, request} }
    function success(response) { return {type:listStyleConstants.BUY_MOVIE_TICKET_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.BUY_MOVIE_TICKET_ERROR, error} }
};


export const getEvents = (token,data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_EVENTS + data, "GET", data, SystemConstant.HEADER, false);
        console.log("===",data)
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        // window.smartech('identify', user.email);
        // window.smartech('dispatch', 'ALAT_Events', {
        //     "Email": user.email,
        //     "mobile": user.phoneNo,
        //     "pagetitle": data
        // })
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
        let consume = ApiService.request(routes.BUY_EVENT_TICKETV2, "POST", data, SystemConstant.HEADER, false);
        console.log(data)
        dispatch(request(consume));
        let user_details = localStorage.getItem("user");
        let user = JSON.parse(user_details)
        // window.smartech('identify', user.email);
        // window.smartech('dispatch', 'ALAT_Events_Tickets_Success', {
        //     "Email": user.email,
        //     "mobile": user.phoneNo,
        //     "eventname": data.title
        // }); 
        return consume
            .then(response => {
                // consume.log(response);
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));
                
            });
    };

    function request(request) { return { type:listStyleConstants.BUY_EVENT_TICKET_PENDING, request} }
    function success(response) { return {type:listStyleConstants.BUY_EVENT_TICKET_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.BUY_EVENT_TICKET_ERROR, error} }
};
export const ShowTime = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.FETCH_MOVIE_SHOWTIME  + data.item + "&" + 'ticketId=' + data.id, "GET", data, SystemConstant.HEADER, false);
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

    function request(request) { return { type:listStyleConstants.GET_MOVIE_SHOWTIME_PENDING, request} }
    function success(response) { return {type:listStyleConstants.GET_MOVIE_SHOWTIME_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.GET_MOVIE_SHOWTIME_ERROR, error} }
};


export const SubmitTicketData =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))
        history.push("/lifestyle/buy-ticket-details")
    }
    function success(data){

        return{
            type:listStyleConstants.SUBMIT_MOVIE_TICKET_SUCCESS,
            data:data
        }
    }
}
export const SubmitMoviesData =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    }
    function success(data){
        return{
            type:listStyleConstants.SUBMIT_MOVIE_DATA_SUCCESS,
            data:data
        }
    }
}
export const SubmitEventData =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    }
    function success(data){
        return{
            type:listStyleConstants.SUBMIT_EVENT_DATA_SUCCESS,
            data:data
        }
    }
}

export const SubmitEventTicketData =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))
        history.push("/lifestyle/buy-event-ticket")


    }
    function success(data){
        return{
            type:listStyleConstants.SUBMIT_EVENT_TICKET_SUCCESS,
            data:data
        }
    }
}


export const SearchFetchEvent = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_EVENTS + 1 + "&" + 'search=' + data, "GET", data, SystemConstant.HEADER, false);
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

    function request(request) { return { type:listStyleConstants.SEARCH_FETCH_EVENT_PENDING, request} }
    function success(response) { return {type:listStyleConstants.SEARCH_FETCH_EVENT_SUCCESS, response} }
    function failure(error) { return {type:listStyleConstants.SEARCH_FETCH_EVENT_FAILURE, error} }
};

export const movieDetails = (data) =>{
    return(dispatch)=>{
        dispatch(success(data))
    }
    function success(data){
        return{
            type: "movie detials info",
            data:data
        }
    }
}
export const postMovieContent =(data) =>{
    return(dispatch)=>{
        dispatch(success(data))

    }
    function success(data){
        return{
            type:listStyleConstants.POST_MOVIE_CONTENT_SUCCESS,
            data:data
        }
    }
}
export const ClearAction=(type)=>{
    return (dispatch) =>{
        dispatch(clear(type))
    };
    function clear(type){return {type : type}}
};

export const PostVisa = (data) => {
    return (dispatch) => {
        dispatch(success(data))
        history.push("/lifestyle/travels/personal-detail")
    }
    function success(data) {
        return {
            type: listStyleConstants.POST_VISA_SUCCESS,
            data: data
        }
    }
}

export const GetVisaOption = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_VISA_OPTIONS, "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };

    function request(request) { return { type: listStyleConstants.GET_VISA_OPTIONS_PENDING, request } }
    function success(response) { return { type: listStyleConstants.GET_VISA_OPTIONS_SUCCESS, response } }
    function failure(error) { return { type: listStyleConstants.GET_VISA_OPTIONS_FAILURE, error } }


}


export const GetVisaPackage = (token, data) => {

    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GET_VISA_PACKAGE, "GET", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };

    function request(request) { return { type: listStyleConstants.GET_VISA_PACKAGE_PENDING, request } }
    function success(response) { return { type: listStyleConstants.GET_VISA_PACKAGE_SUCCESS, response } }
    function failure(error) { return { type: listStyleConstants.GET_VISA_PACKAGE_FAILURE, error } }


}

export const PostPersonalDetails = (data) => {
    return (dispatch) => {
        dispatch(success(data))
        history.push("/lifestyle/travels/visa-detail")
    }
    function success(data) {
        return {
            type: listStyleConstants.POST_PERSONAL_DETAILS_SUCCESS,
            data: data
        }
    }
}
export const PostVisaDetail = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.SAVE_VISA_ENTRY, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data, data));
                history.push("/lifestyle/travels/visa-payment")
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };

    function request(request) { return { type: listStyleConstants.POST_VISA_DETAIL_PENDING, request } }
    function success(response, data) { 
        return {
                type: listStyleConstants.POST_VISA_DETAIL_SUCCESS, response,
                data: data,
            }}
    function failure(error) { return { type: listStyleConstants.POST_VISA_DETAIL_FAILURE, error } }
};

export const PostVisaPayment = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.VISA_PAYMENT, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
                history.push("/lifestyle/travels/success")
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };

    function request(request) { return { type: listStyleConstants.POST_VISA_PAYMENT_PENDING, request } }
    function success(response) { return { type: listStyleConstants.POST_VISA_PAYMENT_SUCCESS, response } }
    function failure(error) { return { type: listStyleConstants.POST_VISA_PAYMENT_FAILURE, error } }
};
export const DebitableAccount = (token, data) => {
    SystemConstant.HEADER['alat-token'] = token;
    return (dispatch) => {
        let consume = ApiService.request(routes.GetAllCustomerAccountsWithLimitsV2, "POST", data, SystemConstant.HEADER, false);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(failure(modelStateErrorHandler(error)));
                dispatch(alertActions.error(modelStateErrorHandler(error)));

            });
    };

    function request(request) { return { type: listStyleConstants.DEBITABLE_ACCOUNT_PENDING, request } }
    function success(response) { return { type: listStyleConstants.DEBITABLE_ACCOUNT_SUCCESS, response } }
    function failure(error) { return { type: listStyleConstants.DEBITABLE_ACCOUNT_FAILURE, error } }
};








