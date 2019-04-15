import {dashboardConstants as userConstants} from "../constants/dashboard/dashboard.constants";

export function accountFetch(state=[], action) {
    switch (action.type) {
        case userConstants.DASHBOARD_ACCOUNT_FETCH_PENDING:
            return {
                user_account: userConstants.DASHBOARD_ACCOUNT_FETCH_PENDING,
                user_account_data: action
            };
        case userConstants.DASHBOARD_ACCOUNT_FETCH_SUCCESS:
            return {
                user_account: userConstants.DASHBOARD_ACCOUNT_FETCH_SUCCESS,
                user_account_data: action,
            };
        case userConstants.DASHBOARD_ACCOUNT_FETCH_FAILURE:
            return {
                user_account: userConstants.DASHBOARD_ACCOUNT_FETCH_FAILURE,
                user_account_data: action
            };

        default:
            return state;
    }
}

export function accountHistoryReducer(state=[], action) {
    switch (action.type) {
        case userConstants.DASHBOARD_ACCOUNT_FETCH_HISTORY_PENDING:
            return {
                account_history: userConstants.DASHBOARD_ACCOUNT_FETCH_HISTORY_PENDING,
                account_history_data: action
            };
        case userConstants.DASHBOARD_ACCOUNT_FETCH_HISTORY_SUCCESS:
            return {
                account_history: userConstants.DASHBOARD_ACCOUNT_FETCH_HISTORY_SUCCESS,
                account_history_data: action
            };
        case userConstants.DASHBOARD_ACCOUNT_FETCH_HISTORY_FAILURE:
            return {
                account_history: userConstants.DASHBOARD_ACCOUNT_FETCH_HISTORY_FAILURE,
                account_history_data: action
            };
        default:
            return state
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
