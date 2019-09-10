import {
    LOADING_WESTERNUNION_COUNTRIES_SUCCESS,
    LOADING_WESTERNUNION_COUNTRIES_PENDING,
    LOADING_WESTERNUNION_COUNTRIES_FAILURE,
    RECEIVING_WESTERNUNION_SUCCESS,
    RECEIVING_WESTERNUNION_PENDING,
    RECEIVING_WESTERNUNION_FAILURE,
} from "../constants/remittance/remittance.constants";

//Western Union
export function getWesternUnionCountries(state=[], action) {
    switch (action.type) {
        case LOADING_WESTERNUNION_COUNTRIES_PENDING:
            return {
                is_fetching: true,
                fetch_status: LOADING_WESTERNUNION_COUNTRIES_PENDING,
                westernunion_data: action
            };
        case LOADING_WESTERNUNION_COUNTRIES_SUCCESS:
            return {
                is_fetching: false,
                fetch_status: LOADING_WESTERNUNION_COUNTRIES_SUCCESS,
                westernunion_data: action
            };
        case LOADING_WESTERNUNION_COUNTRIES_FAILURE:
            return {
                is_fetching: false,
                fetch_status: LOADING_WESTERNUNION_COUNTRIES_FAILURE,
                westernunion_data: action
            };

        default:
            return { ...state }
    }
}

export function receiveWesternUnion(state=[], action) {
    switch (action.type) {
        case RECEIVING_WESTERNUNION_PENDING:
            return {
                is_processing: true,
                fetch_status: RECEIVING_WESTERNUNION_PENDING,
                receive_westernunion_data: action
            };
        case RECEIVING_WESTERNUNION_SUCCESS:
            return {
                is_processing: false,
                fetch_status: RECEIVING_WESTERNUNION_SUCCESS,
                receive_westernunion_data: action
            };
        case RECEIVING_WESTERNUNION_FAILURE:
            return {
                is_processing: false,
                fetch_status: RECEIVING_WESTERNUNION_FAILURE,
                receive_westernunion_data: action
            };

        default:
            return { ...state }
    }
}