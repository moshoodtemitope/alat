import { fundAccountConstants } from '../constants/fund-account/fund-account.constant';

export function fundWemaAccountReducer(state = [], action) {
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

export function fundAccountReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.FUND_ACCOUNT_SUCCESS:
            return {
                fund_account_status: fundAccountConstants.FUNDACCOUNT_CARD_SUCCESS,
                fund_account_data: action
            };
        case fundAccountConstants.FUND_ACCOUNT_PENDING:
            return {
                fund_account_status: fundAccountConstants.FUND_ACCOUNT_PENDING,
                fund_account_data: action
            };
        case fundAccountConstants.FUND_ACCOUNT_FAILURE:
            return {
                fund_account_status: fundAccountConstants.FUND_ACCOUNT_FAILURE,
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

export function fundFromTokenisedCardReducer(state = [], action) {
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

export function fundFromCardWithPinReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.FUNDFROM_CARDWITH_PIN_SUCCESS:
            return {
                fund_fromcard_withpin_status: fundAccountConstants.FUNDFROM_CARDWITH_PIN_SUCCESS,
                fund_fromcard_withpin_data: action
            };
        case fundAccountConstants.FUNDFROM_CARDWITH_PIN_PENDING:
            return {
                fund_fromcard_withpin_status: fundAccountConstants.FUNDFROM_CARDWITH_PIN_PENDING,
                fund_fromcard_withpin_data: action
            };
        case fundAccountConstants.FUNDFROM_CARDWITH_PIN_FAILURE:
            return {
                fund_fromcard_withpin_status: fundAccountConstants.FUNDFROM_CARDWITH_PIN_FAILURE,
                fund_fromcard_withpin_data: action
            };
        default:
            return { ...state }

    }
}

export function getEncryptionRuleReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.ENCRYPTION_RULE_SUCCESS:
            return {
                encryption_rule_status: fundAccountConstants.ENCRYPTION_RULE_SUCCESS,
                encryption_rule_data: action
            };
        case fundAccountConstants.ENCRYPTION_RULE_PENDING:
            return {
                encryption_rule_status: fundAccountConstants.ENCRYPTION_RULE_PENDING,
                encryption_rule_data: action
            };
        case fundAccountConstants.ENCRYPTION_RULE_FAILURE:
            return {
                encryption_rule_status: fundAccountConstants.ENCRYPTION_RULE_FAILURE,
                encryption_rule_data: action
            };
        case fundAccountConstants.ENCRYPTION_RULE_CLEAR:
            return {
                encryption_rule_status: fundAccountConstants.ENCRYPTION_RULE_CLEAR,
                encryption_rule_data: undefined
            };
        default:
            return { ...state }
    }
}

export function verifyPANReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.VERIFY_PAN_SUCCESS:
            return {
                verify_pan_status: fundAccountConstants.VERIFY_PAN_SUCCESS,
                verify_pan_data: action
            };
        case fundAccountConstants.VERIFY_PAN_PENDING:
            return {
                verify_pan_status: fundAccountConstants.VERIFY_PAN_PENDING,
                verify_pan_data: action
            };
        case fundAccountConstants.VERIFY_PAN_FAILURE:
            return {
                verify_pan_status: fundAccountConstants.VERIFY_PAN_FAILURE,
                verify_pan_data: action
            };
        case fundAccountConstants.VERIFY_PAN_CLEAR:
            return {
                verify_pan_status: fundAccountConstants.VERIFY_PAN_CLEAR,
                verify_pan_data: undefined
            };
        default:
            return { ...state }
    }
}

export function saveCardAfterTranReducer(state = [], action) {
    switch (action.type) {
        case fundAccountConstants.SAVEAFTER_TRANSACTION_SUCCESS:
            return {
                saveafter_trans_status: fundAccountConstants.SAVEAFTER_TRANSACTION_SUCCESS,
                saveafter_trans_data: action
            };
        case fundAccountConstants.SAVEAFTER_TRANSACTION_PENDING:
            return {
                saveafter_trans_status: fundAccountConstants.SAVEAFTER_TRANSACTION_PENDING,
                saveafter_trans_data: action
            };
        case fundAccountConstants.SAVEAFTER_TRANSACTION_FAILURE:
            return {
                saveafter_trans_status: fundAccountConstants.SAVEAFTER_TRANSACTION_FAILURE,
                saveafter_trans_data: action
            };
       
        default:
            return { ...state }
    }
}