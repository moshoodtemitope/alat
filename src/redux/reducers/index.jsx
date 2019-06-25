import {combineReducers} from "redux";
import {authentication} from "./authentication.reducer";
import { alert} from "./alert.reducer";
import {dashboard, transfer, onboarding, airtime, global} from "./export";
import {bankListRequest, beneficiariesRequest} from "./transfer.reducer";
import {accountHistoryReducer} from "./dashboard.reducer";
import { userConstants } from "../constants/onboarding/user.constants";
import dataReducer from './data.reducer';
// import { * as dashboard_reducer } from './dashboard.reducer';

const rootReducer = (state, action)=>{
    if(action.type === userConstants.LOGOUT)
        {   state = undefined;    }
    return appReducer(state, action)

};

const appReducer = combineReducers({
    authentication,
    // registration,
    alert,
    onboarding_user_details: onboarding.userRegistrationRequest,
    onboarding_bvn_details: onboarding.bvnDetailsReducer,
    onboarding_bvnskip_details: onboarding.bvnSkipReducer,
    onboarding_dataFrom_bvn: onboarding.bvnCustomerDetailsReducer,
    dashboard_accounts: dashboard.accountFetch,
    dashboard_accounts_history: dashboard.accountHistoryReducer,
    dashboard_userGoals: dashboard.userGoalsReducer,
    dashboard_userOnboardingPriority: dashboard.onboardingPriorityReducer,
    dashboard_announcementCard: dashboard.announcementReducer,
    transfer_bankList: transfer.bankListRequest,
    transfer_beneficiaries: transfer.beneficiariesRequest,
    transfer_fetch_user_account: transfer.fetchAccountDetailsRequest,
    airtime_beneficiaries: airtime.airtimeBeneficiariesReducer,
    airtime_beneDelete: airtime.deleteBeneficiaryReducer,
    airtime_buydata: airtime.buyAirtimeReducer,
    airtime_webpin: airtime.buyAirtimeWebPinReducer,  
    airtime_webpinotp: airtime.buyAirtimeWebPinOTPReducer,

    accounts: global.debitableAccountsReducer,
    // storage_reducer
    // storage_reducer

    //data_reducer
    data_reducer: dataReducer

});

//export defualt appReducer;
export default rootReducer;