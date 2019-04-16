import {USER_REGISTER_SAVE, USER_REGISTER_FETCH} from "../constants/onboarding/user.constants"

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