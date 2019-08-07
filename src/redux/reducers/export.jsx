import {userRegistrationRequest, bvnDetailsReducer,bvnSkipReducer, bvnCustomerDetailsReducer} from "./onboarding.reducer";
import {
    accountFetch,
    accountHistoryReducer,
    announcementReducer,
    onboardingPriorityReducer,
    userGoalsReducer
} from "./dashboard.reducer";
import {bankListRequest,
        beneficiariesRequest,
        fetchAccountDetailsRequest,
        transferDetailsReducer,
        transferSenderDetailsReducer,
        fetchTransactionLimitRequest,
        sendMoneyTransferRequest,
        processMoneyTransferRequest,
        saveBankTransferReducer,
        getBankChargesReducer,
        deleteBeneficiaryRequest} from "./transfer.reducer";

import { airtimeBeneficiariesReducer, deleteBeneficiaryReducer, buyAirtimeReducer,
     debitableAccountsReducer, buyAirtimeWebPinReducer, buyAirtimeWebPinOTPReducer,
     airtimeSaveBeneficiaryReducer  } from './airtime.reducer';

import { fundAccountReducer, getTokenizedCardsReducer,
     saveCardReducer, tranCardDetailsReducer, deleteCardReducer,saveCardAfterTranReducer,
      getEncryptionRuleReducer, verifyPANReducer, fundWemaAccountReducer } from './fund-account.reducer';

import { loanOnboardingStep1Reducer, loanOnboardingStep2Reducer, loanOnboardingVerifyBVNReducer,
     loanOnboardingStep3Reducer, loanOnboardingValidateOTPReducer} from './loan-onboarding.reducer';

     import {fixedGoalStep1Reducer,fixedGoalStep2Reducer,addGoalReducer} from './goal/fixed-goal.reducers';
     import {flexGoalStep1Reducer,flexGoalStep2Reducer,addFlexGoalReducer} from './goal/flex-goal.reducer';
     import {createStashGoalReducer,createStashGoalStep1Reducer} from './goal/create-stash.reducer'
    import {groupSavingsTargetGoal, groupDetails, deleteGroup, contribute, editGroup, pauseGroup, findGroup, customerGroup, joinGroup, scheduleContribution, deleteMember, cashOut,
    continueScheduleGroupPayment} from './group-savings/group-savings-reducers';


export const onboarding = {
    userRegistrationRequest,
    bvnDetailsReducer,
    bvnSkipReducer,
    bvnCustomerDetailsReducer
};

export const loanOnboarding = {
    loanOnboardingStep1Reducer,
    loanOnboardingStep2Reducer,
    loanOnboardingVerifyBVNReducer,
    loanOnboardingStep3Reducer,
    loanOnboardingValidateOTPReducer
}

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
    fetchAccountDetailsRequest,
    transferDetailsReducer,
    transferSenderDetailsReducer,
    deleteBeneficiaryRequest,
    fetchTransactionLimitRequest,
    sendMoneyTransferRequest,
    processMoneyTransferRequest,
    saveBankTransferReducer,
    getBankChargesReducer
};

export const airtime ={
    airtimeBeneficiariesReducer,
    deleteBeneficiaryReducer,
    buyAirtimeReducer,
    buyAirtimeWebPinReducer,
    buyAirtimeWebPinOTPReducer,
    airtimeSaveBeneficiaryReducer
    
}

export const global ={
    debitableAccountsReducer,
    getEncryptionRuleReducer,
    verifyPANReducer
}

export const fundAccount={
    fundAccountReducer,
    getTokenizedCardsReducer,
    saveCardReducer,
    tranCardDetailsReducer,
    deleteCardReducer,
    fundWemaAccountReducer,
    //fundFromTokenisedCardReducer,
    //fundFromCardWithPinReducer
    saveCardAfterTranReducer
}
export const fixedGoal ={
    fixedGoalStep1Reducer,
    fixedGoalStep2Reducer,
    addGoalReducer
 }
 export const flexGoal={
    flexGoalStep1Reducer,
    flexGoalStep2Reducer,
    addFlexGoalReducer

 }
 export const groupSavings ={
    groupSavingsTargetGoal,
    groupDetails,
    deleteGroup, 
    contribute, 
    editGroup, 
    pauseGroup, 
    findGroup, 
    customerGroup, 
    joinGroup, 
    scheduleContribution, 
    deleteMember, 
    cashOut,
    continueScheduleGroupPayment
}
export const stashGoal={
    createStashGoalStep1Reducer,
    createStashGoalReducer,
    
}
 
 
