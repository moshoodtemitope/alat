import {USER_REGISTER_SAVE, USER_REGISTER_FETCH, BVN_VERIFICATION_SUCCESS, BVN_VERIFICATION_PENDING} from "../constants/onboarding/user.constants"

export function userRegistrationRequest(state=[], action) {
    switch (action.type) {
        case USER_REGISTER_SAVE:
            return {
                registration_status: USER_REGISTER_SAVE,
                registration_data: action
            };
        case USER_REGISTER_FETCH:
            return {
                registration_status: USER_REGISTER_FETCH,
                registration_data: action
            };

        default:
            return {};
    }
}

export function bvnDetailsReducer(state=[], action) {
    switch (action.type) {
        case BVN_VERIFICATION_PENDING:
            return {
                bvn_verification_status: BVN_VERIFICATION_PENDING,
                bvn_verification_data: action,

            };
        case BVN_VERIFICATION_SUCCESS:
            return {
                bvn_verification_status: BVN_VERIFICATION_SUCCESS,
                bvn_verification_data: action
            };

        default:
            return {};
    }
}