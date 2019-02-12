import {userConstants} from "../_constants";

// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};
// export default DashboardReducers;

//
export function requester(state=[], action) {
    switch (action.type) {
        case userConstants.DASHBOARD_ACCOUNT_FETCH_PENDING:
            return {
                pending: true,
                data: action
            };
        case userConstants.DASHBOARD_ACCOUNT_FETCH_SUCCESS:
            return {
                success: true,
                data: action
            };
        case userConstants.DASHBOARD_ACCOUNT_FETCH_FAILURE:
            return {
                failure: true,
                data: action
            };

        default:
            return {
                pending: true,
                data: action
            };
    }
}

export function userGoalsReducer(state=[], action) {
    switch (action.type) {
        case userConstants.DASHBOARD_GOALS_SUMMARY_FETCH_PENDING:
            return {
                user_goals: userConstants.DASHBOARD_GOALS_SUMMARY_FETCH_PENDING,
                user_goals_data: action
            };
        case userConstants.DASHBOARD_GOALS_SUMMARY_FETCH_SUCCESS:
            return {
                user_goals: userConstants.DASHBOARD_GOALS_SUMMARY_FETCH_SUCCESS,
                user_goals_data: action
            };
        case userConstants.DASHBOARD_GOALS_SUMMARY_FETCH_FAILURE:
            return {
                user_goals: userConstants.DASHBOARD_GOALS_SUMMARY_FETCH_FAILURE,
                user_goals_data: action
            };

        default:
            return state
    }
}


export function onboardingPriorityReducer(state=[], action) {
    switch (action.type) {
        case userConstants.DASHBOARD_ONBOARDING_PRIORITY_PENDING:
            return {
                onboarding_priority: userConstants.DASHBOARD_ONBOARDING_PRIORITY_PENDING,
                onboarding_priority_data: action
            };
        case userConstants.DASHBOARD_ONBOARDING_PRIORITY_SUCCESS:
            return {
                onboarding_priority: userConstants.DASHBOARD_ONBOARDING_PRIORITY_SUCCESS,
                onboarding_priority_data: action
            };
        default:
            return state
    }
}


export function announcementReducer(state=[], action) {
    switch (action.type) {
        case userConstants.ANNOUNCEMENT_FETCH_PENDING:
            return {
                announcement_status: userConstants.ANNOUNCEMENT_FETCH_PENDING,
                announcement_data: action
            };
        case userConstants.ANNOUNCEMENT_FETCH_SUCCESS:
            return {
                announcement_status: userConstants.ANNOUNCEMENT_FETCH_SUCCESS,
                announcement_data: action
            };

        default:
            return state
    }
}
