import {
    FETCH_CURRENTCARD_SUCCESS,
    FETCH_CURRENTCARD_PENDING,
    FETCH_CURRENTCARD_FAILURE,
    SEND_NEWVC_DATA_SUCCESS,
    SEND_NEWVC_DATA_PENDING,
    SEND_NEWVC_DATA_FAILURE,
    SEND_TOPUP_DATA_SUCCESS,
    SEND_TOPUP_DATA_PENDING,
    SEND_TOPUP_DATA_FAILURE,
    FETCH_CARD_DATA_SUCCESS,
    FETCH_CARD_DATA_PENDING,
    FETCH_CARD_DATA_FAILURE,
    LIQUIDATE_CARD_SUCCESS,
    LIQUIDATE_CARD_PENDING,
    LIQUIDATE_CARD_FAILURE,
    DELETE_VIRTUALCARD_SUCCESS,
    DELETE_VIRTUALCARD_PENDING,
    DELETE_VIRTUALCARD_FAILURE,
    GET_VIRTUALCARD_HISTORY_SUCCESS,
    GET_VIRTUALCARD_HISTORY_PENDING,
    GET_VIRTUALCARD_HISTORY_FAILURE,
    CHANGEACTIVESTATUS_VIRTUAL_SUCCESS,
    CHANGEACTIVESTATUS_VIRTUAL_PENDING,
    CHANGEACTIVESTATUS_VIRTUAL_FAILURE,
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

export function sendTopVCCardinfo(state=[], action) {
    switch (action.type) {
        case SEND_TOPUP_DATA_PENDING:
            return {
                is_processing: true,
                fetch_status: SEND_TOPUP_DATA_PENDING,
                topup_vc_info: action
            };
        case SEND_TOPUP_DATA_SUCCESS:
            return {
                is_processing: false,
                fetch_status: SEND_TOPUP_DATA_SUCCESS,
                topup_vc_info: action
            };
        case SEND_TOPUP_DATA_FAILURE:
            return {
                is_processing: false,
                fetch_status: SEND_TOPUP_DATA_FAILURE,
                topup_vc_info: action
            };

        default:
            return { ...state }
    }
}


export function getAVirtualCardinfo(state=[], action) {
    switch (action.type) {
        case FETCH_CARD_DATA_PENDING:
            return {
                is_processing: true,
                fetch_status: FETCH_CARD_DATA_PENDING,
                vc_info: action
            };
        case FETCH_CARD_DATA_SUCCESS:
            return {
                is_processing: false,
                fetch_status: FETCH_CARD_DATA_SUCCESS,
                vc_info: action
            };
        case FETCH_CARD_DATA_FAILURE:
            return {
                is_processing: false,
                fetch_status: FETCH_CARD_DATA_FAILURE,
                vc_info: action
            };

        default:
            return { ...state }
    }
}

export function liquidateCard(state=[], action){
    switch (action.type) {
        case LIQUIDATE_CARD_PENDING:
            return {
                is_processing: true,
                fetch_status: LIQUIDATE_CARD_PENDING,
                liquidate_info: action
            };
        case LIQUIDATE_CARD_SUCCESS:
            return {
                is_processing: false,
                fetch_status: LIQUIDATE_CARD_SUCCESS,
                liquidate_info: action
            };
        case LIQUIDATE_CARD_FAILURE:
            return {
                is_processing: false,
                fetch_status: LIQUIDATE_CARD_FAILURE,
                liquidate_info: action
            };

        default:
            return { ...state }
    }
}

export function changeCardStatus(state=[], action){
    switch (action.type) {
        case CHANGEACTIVESTATUS_VIRTUAL_PENDING:
            return {
                is_processing: true,
                fetch_status: CHANGEACTIVESTATUS_VIRTUAL_PENDING,
                changecardstatus_info: action
            };
        case CHANGEACTIVESTATUS_VIRTUAL_SUCCESS:
            return {
                is_processing: false,
                fetch_status: CHANGEACTIVESTATUS_VIRTUAL_SUCCESS,
                changecardstatus_info: action
            };
        case CHANGEACTIVESTATUS_VIRTUAL_FAILURE:
            return {
                is_processing: false,
                fetch_status: CHANGEACTIVESTATUS_VIRTUAL_FAILURE,
                changecardstatus_info: action
            };

        default:
            return { ...state }
    }
}

export function deleteVirtualCard(state=[], action){
    switch (action.type) {
        case DELETE_VIRTUALCARD_PENDING:
            return {
                is_processing: true,
                fetch_status: DELETE_VIRTUALCARD_PENDING,
                delete_virtualcard_info: action
            };
        case DELETE_VIRTUALCARD_SUCCESS:
            return {
                is_processing: false,
                fetch_status: DELETE_VIRTUALCARD_SUCCESS,
                delete_virtualcard_info: action
            };
        case DELETE_VIRTUALCARD_FAILURE:
            return {
                is_processing: false,
                fetch_status: DELETE_VIRTUALCARD_FAILURE,
                delete_virtualcard_info: action
            };

        default:
            return { ...state }
    }
}

export function getVirtualCardHistoryRequest(state=[], action){
    switch (action.type) {
        case GET_VIRTUALCARD_HISTORY_PENDING:
            return {
                is_processing: true,
                fetch_status: GET_VIRTUALCARD_HISTORY_PENDING,
                vchistory_info: action
            };
        case GET_VIRTUALCARD_HISTORY_SUCCESS:
            return {
                is_processing: false,
                fetch_status: GET_VIRTUALCARD_HISTORY_SUCCESS,
                vchistory_info: action
            };
        case GET_VIRTUALCARD_HISTORY_FAILURE:
            return {
                is_processing: false,
                fetch_status: GET_VIRTUALCARD_HISTORY_FAILURE,
                vchistory_info: action
            };

        default:
            return { ...state }
    }
}