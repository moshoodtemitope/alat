import {USER_REGISTER_SAVE, USER_REGISTER_FETCH, BVN_VERIFICATION_SUCCESS, 
    BVN_VERIFICATION_PENDING, SKIP_BVN_PENDING, SKIP_BVN_SUCCESS,
    OTP_VERIFICATION_PENDING,OTP_VERIFICATION_SUCCESS,SAVE_BVN_INFO,  OTP_VERIFICATION_FAILURE, DATA_FROM_BVN
} from "../constants/onboarding/user.constants"

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
                 state,
                // registration_status: USER_REGISTER_SAVE,
                // registration_data: action,
                // registration_step: 1
            };
    }
}

export function bvnDetailsReducer(state=[], action) {
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

        default:
            return {
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