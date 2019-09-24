import {USER_REGISTER_SAVE, USER_REGISTER_FETCH, BVN_VERIFICATION_SUCCESS, 
    BVN_VERIFICATION_PENDING, SKIP_BVN_PENDING, SKIP_BVN_SUCCESS,
    OTP_VERIFICATION_PENDING,OTP_VERIFICATION_SUCCESS,SAVE_BVN_INFO,  OTP_VERIFICATION_FAILURE, DATA_FROM_BVN, BVN_VERIFICATION_FAILURE,
    GET_NDPRSTATUS_SUCCESS,
    GET_NDPRSTATUS_PENDING,
    GET_NDPRSTATUS_FAILURE,
    ACCEPT_NDRP_SUCCESS,
    ACCEPT_NDRP_PENDING,
    ACCEPT_NDRP_FAILURE} from "../constants/onboarding/user.constants"

export function userRegistrationRequest(state={}, action) {
    switch (action.type) {
        case USER_REGISTER_SAVE:
            return {
                registration_status: USER_REGISTER_SAVE,
                registration_data: action,
                //registration_step: 1
            };
        case USER_REGISTER_FETCH:
            return {
                registration_status: USER_REGISTER_FETCH,
                registration_data: action,
               // registration_step: 1
            };

        default:
            return {
                 ...state,
                // registration_status: USER_REGISTER_SAVE,
                // registration_data: action,
                // registration_step: 1
            };
    }
}

export function bvnDetailsReducer(state={}, action) {
    switch (action.type) {
        case BVN_VERIFICATION_PENDING:
            return {
                bvn_verification_status: BVN_VERIFICATION_PENDING,
                bvn_verification_data: action,
                // registration_step: 2

            };
        case BVN_VERIFICATION_SUCCESS:
            return {
                bvn_verification_status: BVN_VERIFICATION_SUCCESS,
                bvn_verification_data: action,
                // registration_step: 2
            };
        case BVN_VERIFICATION_FAILURE:
            return {
                bvn_verification_status: BVN_VERIFICATION_FAILURE,
                bvn_verification_data: action,
            };
        default:
            return {
                ...state,
               registration_step: 2
            };
    }
}

export function bvnSkipReducer(state=[], action) {
    switch (action.type) {
        case SKIP_BVN_PENDING:
            return {
                bvn_verification_status: SKIP_BVN_PENDING,
                bvn_verification_data: action,
               // registration_step: 2
            };
        case SKIP_BVN_SUCCESS:
            return {
                bvn_verification_status: SKIP_BVN_SUCCESS,
                bvn_verification_data: action,
                //registration_step: 2
            };

        default:
            return {
                ...state
               // registration_step: 2
            };
    }
}

export function bvnCustomerDetailsReducer(state=[], action){
    switch (action.type){
        case OTP_VERIFICATION_PENDING:
            return{
                otp_confirmation_status :OTP_VERIFICATION_PENDING,
                otp_data_returned: action
            };
        case SAVE_BVN_INFO:
            return {
                otp_confirmation_status: OTP_VERIFICATION_SUCCESS,
                otp_data_returned: action
            };
        default:
            return {
                otp_data_returned: ''
            };
    }

}

export function getNDPRStatusReducer(state=[], action){
    switch (action.type) {
        case GET_NDPRSTATUS_PENDING:
            return {
                is_processing: true,
                fetch_status: GET_NDPRSTATUS_PENDING,
                ndpr_status: action
            };
        case GET_NDPRSTATUS_SUCCESS:
            return {
                is_processing: false,
                fetch_status: GET_NDPRSTATUS_SUCCESS,
                ndpr_status: action
            };
        case GET_NDPRSTATUS_FAILURE:
            return {
                is_processing: false,
                fetch_status: GET_NDPRSTATUS_FAILURE,
                ndpr_status: action
            };

        default:
            return { ...state }
    }

}

export function acceptNDRpReducer(state=[], action){
    switch (action.type) {
        case ACCEPT_NDRP_PENDING:
            return {
                is_processing: true,
                fetch_status: ACCEPT_NDRP_PENDING,
                ndpr_status: action
            };
        case ACCEPT_NDRP_SUCCESS:
            return {
                is_processing: false,
                fetch_status: ACCEPT_NDRP_SUCCESS,
                ndpr_status: action
            };
        case ACCEPT_NDRP_FAILURE:
            return {
                is_processing: false,
                fetch_status: ACCEPT_NDRP_FAILURE,
                ndpr_status: action
            };

        default:
            return { ...state }
    }

}