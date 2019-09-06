// Group Savings Reducer
import { listStyleConstants } from "../../constants/lifestyle/lifestyle-constants";

export function getCinemaList(state=[], action){
    switch(action.type){
        
        case listStyleConstants.GET_CINEMA_LIST_PENDING: 
           return {
               message: listStyleConstants.GET_CINEMA_LIST_PENDING,
               data: action
           }
        case listStyleConstants.GET_CINEMA_LIST_SUCCESS:
           return {
               message: listStyleConstants.GET_CINEMA_LIST_SUCCESS,
               data: action
           }
        case listStyleConstants.GET_CINEMA_LIST_ERROR:
           return {
               message: listStyleConstants.GET_CINEMA_LIST_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function getSingleMovie(state=[], action){
    switch(action.type){
        
        case listStyleConstants.GET_SINGLE_MOVIE_PENDING: 
           return {
               message: listStyleConstants.GET_SINGLE_MOVIE_PENDING,
               data: action
           }
        case listStyleConstants.GET_SINGLE_MOVIE_SUCCESS:
           return {
               message: listStyleConstants.GET_SINGLE_MOVIE_SUCCESS,
               data: action
           }
        case listStyleConstants.GET_SINGLE_MOVIE_ERROR:
           return {
               message: listStyleConstants.GET_SINGLE_MOVIE_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}


export function buyMovieTicket(state=[], action){
    switch(action.type){
        
        case listStyleConstants.BUY_MOVIE_TICKET_PENDING: 
           return {
               message: listStyleConstants.BUY_MOVIE_TICKET_PENDING,
               data: action
           }
        case listStyleConstants.BUY_MOVIE_TICKET_SUCCESS:
           return {
               message: listStyleConstants.BUY_MOVIE_TICKET_SUCCESS,
               data: action
           }
        case listStyleConstants.BUY_MOVIE_TICKET_ERROR:
           return {
               message: listStyleConstants.BUY_MOVIE_TICKET_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function getEvents(state=[], action){
    switch(action.type){
        
        case listStyleConstants.GET_EVENTS_PENDING: 
           return {
               message: listStyleConstants.GET_EVENTS_PENDING,
               data: action
           }
        case listStyleConstants.GET_EVENTS_SUCCESS:
           return {
               message: listStyleConstants.GET_EVENTS_SUCCESS,
               data: action
           }
        case listStyleConstants.GET_EVENTS_ERROR:
           return {
               message: listStyleConstants.GET_EVENTS_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function getSingleEvent(state=[], action){
    switch(action.type){
        
        case listStyleConstants.GET_SINGLE_EVENT_PENDING: 
           return {
               message: listStyleConstants.GET_SINGLE_EVENT_PENDING,
               data: action
           }
        case listStyleConstants.GET_SINGLE_EVENT_SUCCESS:
           return {
               message: listStyleConstants.GET_SINGLE_EVENT_SUCCESS,
               data: action
           }
        case listStyleConstants.GET_SINGLE_EVENT_ERROR:
           return {
               message: listStyleConstants.GET_SINGLE_EVENT_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}


export function purchaseEventTicket(state=[], action){
    switch(action.type){
        
        case listStyleConstants.BUY_EVENT_TICKET_PENDING: 
           return {
               message: listStyleConstants.BUY_EVENT_TICKET_PENDING,
               data: action
           }
        case listStyleConstants.BUY_EVENT_TICKET_SUCCESS:
           return {
               message: listStyleConstants.BUY_EVENT_TICKET_SUCCESS,
               data: action
           }
        case listStyleConstants.BUY_EVENT_TICKET_ERROR:
           return {
               message: listStyleConstants.BUY_EVENT_TICKET_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}


export function fetchMovieList(state=[], action){
    switch(action.type){

        case listStyleConstants.GET_MOVIE_LIST_PENDING:
            return {
                message: listStyleConstants.GET_MOVIE_LIST_PENDING,
                data: action
            };
        case listStyleConstants.GET_MOVIE_LIST_SUCCESS:
            return {
                message: listStyleConstants.GET_MOVIE_LIST_SUCCESS,
                data: action
            };
        case listStyleConstants.GET_MOVIE_LIST_FAILURE:
            return {
                message: listStyleConstants.GET_MOVIE_LIST_FAILURE,
                data: action
            };
        default:
            return {... state}
    }
}
export function SearchfetchMovieList(state=[], action){
    switch(action.type){

        case listStyleConstants.SEARCH_FETCH_MOVIE_PENDING:
            return {
                message: listStyleConstants.SEARCH_FETCH_MOVIE_PENDING,
                data: action
            };
        case listStyleConstants.SEARCH_FETCH_MOVIE_SUCCESS:
            return {
                message: listStyleConstants.SEARCH_FETCH_MOVIE_SUCCESS,
                data: action
            };
        case listStyleConstants.SEARCH_FETCH_MOVIE_FAILURE:
            return {
                message: listStyleConstants.SEARCH_FETCH_MOVIE_FAILURE,
                data: action
            };
        default:
            return {... state}
    }
}
export function SearchfetchEventList(state=[], action){
    switch(action.type){

        case listStyleConstants.SEARCH_FETCH_EVENT_PENDING:
            return {
                message: listStyleConstants.SEARCH_FETCH_EVENT_PENDING,
                data: action
            };
        case listStyleConstants.SEARCH_FETCH_EVENT_SUCCESS:
            return {
                message: listStyleConstants.SEARCH_FETCH_EVENT_SUCCESS,
                data: action
            };
        case listStyleConstants.SEARCH_FETCH_EVENT_FAILURE:
            return {
                message: listStyleConstants.SEARCH_FETCH_EVENT_FAILURE,
                data: action
            };
        default:
            return {... state}
    }
}



export function getAllEngagements(state=[], action){
    switch(action.type){
        case listStyleConstants.PREFERENCES_PENDING: 
           return {
               message: listStyleConstants.PREFERENCES_PENDING,
               data: action
           }
        case listStyleConstants.PREFERENCES_SUCCESS:
           return {
               message: listStyleConstants.PREFERENCES_SUCCESS,
               data: action
           }
        case listStyleConstants.PREFERENCES_ERROR:
           return {
               message: listStyleConstants.PREFERENCES_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function getCustomersEngagements(state=[], action){
    switch(action.type){
        case listStyleConstants.GET_CUSTOMER_ENGAGEMENT_PENDING: 
           return {
               message: listStyleConstants.GET_CUSTOMER_ENGAGEMENTS_PENDING,
               data: action
           }
        case listStyleConstants.GET_CUSTOMER_ENGAGEMENT_SUCCESS:
           return {
               message: listStyleConstants.GET_CUSTOMER_ENGAGEMENT_SUCCESS,
               data: action
           }
        case listStyleConstants.GET_CUSTOMER_ENGAGEMENT_FAILURE:
           return {
               message: listStyleConstants.GET_CUSTOMER_ENGAGEMENT_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function ShowTime(state=[], action){
    switch(action.type){
        case listStyleConstants.GET_MOVIE_SHOWTIME_PENDING: 
           return {
               message: listStyleConstants.GET_MOVIE_SHOWTIME_PENDING,
               data: action
           }
        case listStyleConstants.GET_MOVIE_SHOWTIME_SUCCESS:
           return {
               message: listStyleConstants.GET_MOVIE_SHOWTIME_SUCCESS,
               data: action
           }
        case listStyleConstants.GET_MOVIE_SHOWTIME_FAILURE:
           return {
               message: listStyleConstants.GET_MOVIE_SHOWTIME_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function SubmitTicketData(state=[], action){
    switch(action.type){
        case listStyleConstants.SUBMIT_MOVIE_TICKET_PENDING: 
           return {
               message: listStyleConstants.SUBMIT_MOVIE_TICKET_PENDING,
               data: action
           }
        case listStyleConstants.SUBMIT_MOVIE_TICKET_SUCCESS:
           return {
               message: listStyleConstants.SUBMIT_MOVIE_TICKET_SUCCESS,
               data: action
           }
        case listStyleConstants.SUBMIT_MOVIE_TICKET_FAILURE:
           return {
               message: listStyleConstants.SUBMIT_MOVIE_TICKET_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}


export function SubmitEventTicketData(state=[], action){
    switch(action.type){
        case listStyleConstants.SUBMIT_EVENT_TICKET_PENDING: 
           return {
               message: listStyleConstants.SUBMIT_EVENT_TICKET_PENDING,
               data: action
           }
        case listStyleConstants.SUBMIT_EVENT_TICKET_SUCCESS:
           return {
               message: listStyleConstants.SUBMIT_EVENT_TICKET_SUCCESS,
               data: action
           }
        case listStyleConstants.SUBMIT_EVENT_TICKET_FAILURE:
           return {
               message: listStyleConstants.SUBMIT_EVENT_TICKET_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function movieDetails (state=[], action){
    switch(action.type){
        case '"movie detials info"': 
           return {  
               message: "data from movie",
               data: action
           }
        
        default: 
           return {... state}
    }
}




















