import {
    FETCH_CURRENTCARD_SUCCESS,
    FETCH_CURRENTCARD_PENDING,
    FETCH_CURRENTCARD_FAILURE
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