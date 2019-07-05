import { fundAccountConstants } from '../constants/fund-account/fund-account.constant';

export function fundAccountReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.FUND_ALAT_WEMA_SUCCESS:
            return {
                fund_account_status: fundAccountConstants.FUND_ALAT_WEMA_SUCCESS,
                fund_account_data: action
            };
        case fundAccountConstants.FUND_ALAT_WEMA_PENDING:
            return {
                fund_account_status: fundAccountConstants.FUND_ALAT_WEMA_PENDING,
                fund_account_data: action
            };
        case fundAccountConstants.FUND_ALAT_WEMA_FAILURE:
            return {
                fund_account_status: fundAccountConstants.FUND_ALAT_WEMA_FAILURE,
                fund_account_data: action
            };
        default:
            return { ...state }
    }
}

export function getTokenizedCardsReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.GET_TOKENIZED_CARDS_FAILURE:
            return {
                get_card_status: fundAccountConstants.GET_TOKENIZED_CARDS_FAILURE,
                get_card_data: action
            };
        case fundAccountConstants.GET_TOKENIZED_CARDS_PENDING:
            return {
                get_card_status: fundAccountConstants.GET_TOKENIZED_CARDS_PENDING,
                get_card_data: action
            };
        case fundAccountConstants.GET_TOKENIZED_CARDS_SUCCESS:
            return {
                get_card_status: fundAccountConstants.GET_TOKENIZED_CARDS_SUCCESS,
                get_card_data: action
            };
        default:
            return { ...state }
    }
}

export function saveCardReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.SAVE_CARD_FAILURE:
            return {
                save_card_status: fundAccountConstants.SAVE_CARD_FAILURE,
                save_card_data: action
            };
        case fundAccountConstants.SAVE_CARD_PENDING:
            return {
                save_card_status: fundAccountConstants.SAVE_CARD_PENDING,
                save_card_data: action
            };
        case fundAccountConstants.SAVE_CARD_SUCCESS:
            return {
                save_card_status: fundAccountConstants.SAVE_CARD_SUCCESS,
                save_card_data: action
            };
        case fundAccountConstants.SAVE_CARD_CLEAR:
            return {
                save_card_status: fundAccountConstants.SAVE_CARD_CLEAR,
                save_card_data: undefined
            };
        default:
            return { ...state }
    }
}

export function tranCardDetailsReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.FUNDCARD_DETAILS_SUCCESS:
            return {
                card_details_status: fundAccountConstants.FUNDCARD_DETAILS_SUCCESS,
                card_details_data: action
            };
        case fundAccountConstants.FUNDCARD_DETAILS_PENDING:
            return {
                card_details_status: fundAccountConstants.FUNDCARD_DETAILS_PENDING,
                card_details_data: action
            };
        case fundAccountConstants.FUNDCARD_DETAILS_FAILURE:
            return {
                card_details_status: fundAccountConstants.FUNDCARD_DETAILS_FAILURE,
                card_details_data: action
            };
        case fundAccountConstants.FUNDCARD_DETAILS_CLEAR:
            return {
                card_details_status: fundAccountConstants.FUNDCARD_DETAILS_CLEAR,
                card_details_data: undefined
            }
        default:
            return { ...state }
    }
}

export function deleteCardReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.DELETE_SAVED_CARD_SUCCESS:
            return {
                delete_card_status: fundAccountConstants.DELETE_SAVED_CARD_SUCCESS,
                delete_card_data: action
            };
        case fundAccountConstants.DELETE_SAVED_CARD_PENDING:
            return {
                delete_card_status: fundAccountConstants.DELETE_SAVED_CARD_PENDING,
                delete_card_data: action
            };
        case fundAccountConstants.DELETE_SAVED_CARD_FAILURE:
            return {
                delete_card_status: fundAccountConstants.DELETE_SAVED_CARD_FAILURE,
                delete_card_data: action
            };
        case fundAccountConstants.DELETE_SAVED_CARD_CLEAR:
            return {
                delete_card_status: fundAccountConstants.DELETE_SAVED_CARD_CLEAR,
                delete_card_data: undefined
            }
        default:
            return { ...state }
    }
}

export function fundFromCardReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.FUND_FROM_CARD_SUCCESS:
            return {
                fund_fromcard_status: fundAccountConstants.FUND_FROM_CARD_SUCCESS,
                fund_fromcard_data: action
            };
        case fundAccountConstants.FUND_FROM_CARD_PENDING:
            return {
                fund_fromcard_status: fundAccountConstants.FUND_FROM_CARD_PENDING,
                fund_fromcard_data: action
            };
        case fundAccountConstants.FUND_FROM_CARD_FAILURE:
            return {
                fund_fromcard_status: fundAccountConstants.FUND_FROM_CARD_FAILURE,
                fund_fromcard_data: action
            };
        default:
            return { ...state }
    }
}