import {
    FETCH_CURRENTCARD_SUCCESS,
    FETCH_CURRENTCARD_PENDING,
    FETCH_CURRENTCARD_FAILURE,
    SEND_NEWVC_DATA_SUCCESS,
    SEND_NEWVC_DATA_PENDING,
    SEND_NEWVC_DATA_FAILURE
} from "../constants/cards/cards.constants";

export function geCurrentVirtualCardsRequest(state=[], action) {
    switch (action.type) {
        case FETCH_CURRENTCARD_PENDING:
            return {
                fetch_status: FETCH_CURRENTCARD_PENDING,
                virtualcard_data: action
            };
        case FETCH_CURRENTCARD_SUCCESS:
            return {
                fetch_status: FETCH_CURRENTCARD_SUCCESS,
                virtualcard_data: action
            };
        case FETCH_CURRENTCARD_FAILURE:
            return {
                fetch_status: FETCH_CURRENTCARD_FAILURE,
                virtualcard_data: action
            };

        default:
            return { ...state }
    }
}

export function sendVCNewCardinfo(state=[], action) {
    switch (action.type) {
        case SEND_NEWVC_DATA_PENDING:
            return {
                is_fetching: true,
                fetch_status: SEND_NEWVC_DATA_PENDING,
                new_vc_info: action
            };
        case SEND_NEWVC_DATA_SUCCESS:
            return {
                is_fetching: false,
                fetch_status: SEND_NEWVC_DATA_SUCCESS,
                new_vc_info: action
            };
        case SEND_NEWVC_DATA_FAILURE:
            return {
                is_fetching: false,
                fetch_status: SEND_NEWVC_DATA_FAILURE,
                new_vc_info: action
            };

        default:
            return { ...state }
    }
}