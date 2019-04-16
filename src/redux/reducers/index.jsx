import {combineReducers} from "redux";
import {authentication} from "./authentication.reducer";
import { alert} from "./alert.reducer";
import {dashboard, transfer, onboarding} from "./export";
import {bankListRequest, beneficiariesRequest} from "./transfer.reducer";
import {accountHistoryReducer} from "./dashboard.reducer";
// import { * as dashboard_reducer } from './dashboard.reducer';

const rootReducer = combineReducers({
    authentication,
    // registration,
    alert,
    onboarding_user_details: onboarding.userRegistrationRequest,
    dashboard_accounts: dashboard.accountFetch,
    dashboard_accounts_history: dashboard.accountHistoryReducer,
    dashboard_userGoals: dashboard.userGoalsReducer,
    dashboard_userOnboardingPriority: dashboard.onboardingPriorityReducer,
    dashboard_announcementCard: dashboard.announcementReducer,
    transfer_bankList: transfer.bankListRequest,
    transfer_beneficiaries: transfer.beneficiariesRequest,
    transfer_fetch_user_account: transfer.fetchAccountDetailsRequest
    // storage_reducer

});

export default rootReducer;