import {userRegistrationRequest, bvnDetailsReducer,bvnSkipReducer, bvnCustomerDetailsReducer} from "./onboarding.reducer";
import {getCinemaList, 
    getSingleMovie, 
    buyMovieTicket,
     getEvents, 
     getSingleEvent, 
     SearchfetchMovieList, 
     purchaseEventTicket, 
     getAllEngagements, 
     getCustomersEngagements, 
     fetchMovieList,
     ShowTime,
     SubmitTicketData,
     SubmitEventTicketData,
     SearchfetchEventList,
      movieDetails,
      FetchMovieGenre,
      PostMovieContent
    } from './lifestyle/lifestyle-reducer';


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
     loanOnboardingStep3Reducer, loanOnboardingValidateOTPReducer, generateStatementReducer,
      requestStatementReducer,salaryTransactionReducer, salaryEntryReducer, saveUserDetailsReducer, getScoreCardQuestionReducer,
      postScoreCardAnswerReducer, resendOTPReducer} from './loan-onboarding.reducer';

import { loanCalcDataReducer, loanApplyReducer, GetIndustriesReducer, GetEmployerReducer, CurrentLoanReducer, 
        LoanHistoryReducer, WorkIdFrontReducer, WorkIdBackReducer, loanRejectReducer, loanStandingOrderReducer,
     loanMandateStatusReducer, loanValidateRemitaOtpReducer, loanStatementUpload, continueApplication, 
     SignatureReducer , PassportReducer, KycRequired, termsReducer } from './loan.reducer';
import { linkBVN, profileSuccessMessage, profileMenu, capturePersonalInformation,getContactDetail,
        getResidential, addNextOfKin, addContactDetails, occupationAndSector, addDocuments,getPersonalInfo, getStates, nextOfKinsRelationship } from './profile-reducer';

import { geCurrentVirtualCardsRequest,
         sendVCNewCardinfo,
         sendTopVCCardinfo,
         getAVirtualCardinfo,
         liquidateCard,
         deleteVirtualCard,
         getVirtualCardHistoryRequest,
         changeCardStatus,
         getAtmCardRequest,
         getAtmCardHotlistReasonsRequest,
         atmCardHotlistRequest,
         randomQuestionRequest,
         answerRandomQuestionRequest,
         activateALATCardRequest,
         loadALATCardSettingsRequest,
         updateALATCardSettingsRequest,
         infoForATMCardRequest,
         otpForATMCardRequest,
         postATMCardRequest} from './alatcards.reducer'
import {getWesternUnionCountries,receiveWesternUnion } from './remittance.reducer';

     import {fixedGoalStep1Reducer,fixedGoalStep2Reducer,addGoalReducer} from './goal/fixed-goal.reducers';
     import {flexGoalStep1Reducer,flexGoalStep2Reducer,addFlexGoalReducer} from './goal/flex-goal.reducer';
     import {createStashGoalReducer,createStashGoalStep1Reducer} from './goal/create-stash.reducer'
    import {groupSavingsTargetGoal, groupDetails, deleteGroup, contribute, editGroup, pauseGroup, findGroup, customerGroup, joinGroup, scheduleContribution, deleteMember, cashOut,
    continueScheduleGroupPayment, setAutomateSavingsEndDate, setAutomateSavingsStartDate, setAmountToWithDraw, setFrequency} from './group-savings/group-savings-reducers';
     import {getCustomerGoalTransHistoryReducer,GET_FORMULAR,GET_GOAL_TYPE,TopUPGoalStep1,TopUPGoal,WithDrawFromGoalStep1,Cashout,
         WithDrawFromGoal,PauseCustomerGoal,unPauseCustomerGoal,EditCustomerGoal,DeleteCustomerGoal,StashCashout,StashCashoutStep1} from './goal/get-customer-goal-trans-history-reducers';
     import {createRotatingSavings, rotatingGroupDetails, joinAGroup, EditSlots, 
        editGroupEsusu, deleteGroupEsusu, GetGroupsEsusu, joinGroupEsusu, refferalCode} from './group-savings/rotating-group-reducers';



    
export const onboarding = {
    userRegistrationRequest,
    bvnDetailsReducer,
    bvnSkipReducer,
    bvnCustomerDetailsReducer
};

export const loans = {
    loanCalcDataReducer,
    loanApplyReducer,
    GetIndustriesReducer,
    GetEmployerReducer,
    CurrentLoanReducer,
    LoanHistoryReducer,
    WorkIdFrontReducer,
    WorkIdBackReducer,
    loanRejectReducer,
    loanStandingOrderReducer,
    loanMandateStatusReducer,
    loanValidateRemitaOtpReducer,
    loanStatementUpload,
    continueApplication,
    SignatureReducer,
    PassportReducer,
    KycRequired,
    termsReducer
}

export const loanOnboarding = {
    loanOnboardingStep1Reducer,
    loanOnboardingStep2Reducer,
    loanOnboardingVerifyBVNReducer,
    loanOnboardingStep3Reducer,
    loanOnboardingValidateOTPReducer,
    generateStatementReducer,
    requestStatementReducer,
    salaryTransactionReducer,
    salaryEntryReducer,
    getScoreCardQuestionReducer,
    postScoreCardAnswerReducer,
    saveUserDetailsReducer,
    resendOTPReducer
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
};

export const fundAccount={
    fundAccountReducer,
    getTokenizedCardsReducer,
    saveCardReducer,
    tranCardDetailsReducer,
    deleteCardReducer,
    fundWemaAccountReducer,
    saveCardAfterTranReducer
}

export const alatCards={
    geCurrentVirtualCardsRequest,
    sendVCNewCardinfo,
    sendTopVCCardinfo,
    getAVirtualCardinfo,
    liquidateCard,
    deleteVirtualCard,
    getVirtualCardHistoryRequest,
    changeCardStatus,
    getAtmCardRequest,
    getAtmCardHotlistReasonsRequest,
    atmCardHotlistRequest,
    randomQuestionRequest,
    answerRandomQuestionRequest,
    activateALATCardRequest,
    loadALATCardSettingsRequest,
    updateALATCardSettingsRequest,
    infoForATMCardRequest,
    otpForATMCardRequest,
    postATMCardRequest
}
export const receiveMoney={
    getWesternUnionCountries,
    receiveWesternUnion
}
export const fixedGoal ={
    fixedGoalStep1Reducer,
    fixedGoalStep2Reducer,
    addGoalReducer
 };
 export const flexGoal={
    flexGoalStep1Reducer,
    flexGoalStep2Reducer,
    addFlexGoalReducer

 }
 export const groupSavings = {
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
    continueScheduleGroupPayment,
    setAutomateSavingsEndDate,
    setAutomateSavingsStartDate,
    setAmountToWithDraw,
    setFrequency,
}
 
export const rotatingSavings = {
    createRotatingSavings,
    rotatingGroupDetails,
    joinAGroup,
    EditSlots,
    GetGroupsEsusu,
    editGroupEsusu,
    deleteGroupEsusu,
    joinGroupEsusu,
    refferalCode
}
export const stashGoal={
    createStashGoalStep1Reducer,
    createStashGoalReducer,
};

export const customerGoal={
    getCustomerGoalTransHistoryReducer,
    GET_FORMULAR,
    GET_GOAL_TYPE,
    TopUPGoalStep1,
    TopUPGoal,
    WithDrawFromGoalStep1,
    WithDrawFromGoal,
    PauseCustomerGoal,
    unPauseCustomerGoal,
    EditCustomerGoal,
    DeleteCustomerGoal,
    StashCashout,
    StashCashoutStep1,
    Cashout


};
 
 
export const movies = {
    getCinemaList,
    getSingleMovie,
    buyMovieTicket,
    getEvents,
    getSingleEvent,
    purchaseEventTicket,
    fetchMovieList,
    ShowTime,
    SubmitTicketData,
    SubmitEventTicketData,
    SearchfetchMovieList,
    SearchfetchEventList,
    movieDetails,
    FetchMovieGenre,
    PostMovieContent
}

export const preferences = {
    getAllEngagements,
    getCustomersEngagements
}
export const profile = {
    linkBVN,
    profileSuccessMessage,
    profileMenu,
    capturePersonalInformation,
    addNextOfKin,
    addContactDetails,
    occupationAndSector,
    addDocuments,
    getContactDetail,
    getResidential,
    getPersonalInfo,
    getStates,
    nextOfKinsRelationship

}
