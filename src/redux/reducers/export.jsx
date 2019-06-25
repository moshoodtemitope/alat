import {userRegistrationRequest, bvnDetailsReducer,bvnSkipReducer, bvnCustomerDetailsReducer} from "./onboarding.reducer";
import {
    accountFetch,
    accountHistoryReducer,
    announcementReducer,
    onboardingPriorityReducer,
    userGoalsReducer
} from "./dashboard.reducer";
import {bankListRequest, beneficiariesRequest, fetchAccountDetailsRequest} from "./transfer.reducer";

import { airtimeBeneficiariesReducer, deleteBeneficiaryReducer, buyAirtimeReducer,
     debitableAccountsReducer, buyAirtimeWebPinReducer, buyAirtimeWebPinOTPReducer  } from './airtime.reducer';


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
    deleteBeneficiaryReducer,
    buyAirtimeReducer,
    buyAirtimeWebPinReducer,
    buyAirtimeWebPinOTPReducer
}

export const global ={
    debitableAccountsReducer
}