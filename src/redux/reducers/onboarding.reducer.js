import {USER_REGISTER_SAVE, USER_REGISTER_FETCH, BVN_VERIFICATION_SUCCESS, 
    BVN_VERIFICATION_PENDING, SKIP_BVN_PENDING, SKIP_BVN_SUCCESS} from "../constants/onboarding/user.constants"

export function userRegistrationRequest(state=[], action) {
    switch (action.type) {
        case USER_REGISTER_SAVE:
            return {
                registration_status: USER_REGISTER_SAVE,
                registration_data: action,
                registration_step: 1
            };
        case USER_REGISTER_FETCH:
            return {
                registration_status: USER_REGISTER_FETCH,
                registration_data: action,
                registration_step: 1
            };

        default:
            return {
                registration_step: 1
            };
    }
}

export function bvnDetailsReducer(state=[], action) {
    switch (action.type) {
        case BVN_VERIFICATION_PENDING:
            return {
                bvn_verification_status: BVN_VERIFICATION_PENDING,
                bvn_verification_data: action,
                registration_step: 2

            };
        case BVN_VERIFICATION_SUCCESS:
            return {
                bvn_verification_status: BVN_VERIFICATION_SUCCESS,
                bvn_verification_data: action,
                registration_step: 2
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
                registration_step: 2
            };
        case BVN_VERIFICATION_SUCCESS:
            return {
                bvn_verification_status: SKIP_BVN_SUCCESS,
                bvn_verification_data: action,
                registration_step: 2
            };

        default:
            return {
                registration_step: 2
            };
    }
}