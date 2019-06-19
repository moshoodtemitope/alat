import {userRegistrationRequest, bvnDetailsReducer,bvnSkipReducer, bvnCustomerDetailsReducer} from "./onboarding.reducer";
import {
    accountFetch,
    accountHistoryReducer,
    announcementReducer,
    onboardingPriorityReducer,
    userGoalsReducer
} from "./dashboard.reducer";
import {bankListRequest, beneficiariesRequest, fetchAccountDetailsRequest} from "./transfer.reducer";

import { airtimeBeneficiariesReducer, deleteBeneficiaryReducer  } from './airtime.reducer';


export const onboarding = {
    userRegistrationRequest,
    bvnDetailsReducer,
    bvnSkipReducer,
    bvnCustomerDetailsReducer
};

export const dashboard = {
    accountFetch,
    userGoalsReducer,
    onboardingPriorityReducer,
    announcementReducer,
    accountHistoryReducer,
};

export const transfer = {
    bankListRequest,
    beneficiariesRequest,
    fetchAccountDetailsRequest
};

export const airtime ={
    airtimeBeneficiariesReducer,
    deleteBeneficiaryReducer
}