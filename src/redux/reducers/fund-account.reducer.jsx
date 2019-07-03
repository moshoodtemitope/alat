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