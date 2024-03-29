import {userRegistrationRequest, 
    bvnDetailsReducer,
    bvnSkipReducer, 
    bvnCustomerDetailsReducer, 
    getNDPRStatusReducer,
    acceptNDRpReducer,
    sendEmailForgotPasswordReducer,
    sendAnswerForgotPasswordReducer,
    sendTokenResetPasswordRequest,
    sendNewPasswordDetailsRequest,
    getQuestionForPinResetRequest,
    sendAnswerForPinResetRequest,
    sendOtpOrTokenForPinResetRequest,
    sendNewPinForPinResetRequest,
    getCMDMPriorityReducer,
    updateCMDMPriorityReducer,
    sendCustomerRatingReducer,
    sendCustomerWillReferAlatReducer,
    offlineLoanGetCustomerDataReducer,
    offlineLoanSendCustomerDataReducer,
} from "./onboarding.reducer";

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
      PostMovieContent,SubmitMovieData,
      SubmitEventData,
    PostVisa,
    GetVisaOptions,
    GetVisaPackage,
    PostVisaDetail,
    PostPersonalDetail,
    PostVisaPayment,
    DebitableAccount
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
      postScoreCardAnswerReducer, resendOTPReducer, securityQuestionReducer} from './loan-onboarding.reducer';

import { loanCalcDataReducer, loanApplyReducer, GetIndustriesReducer, GetEmployerReducer, CurrentLoanReducer, 
        LoanHistoryReducer, WorkIdFrontReducer, WorkIdBackReducer, loanRejectReducer, loanStandingOrderReducer,
     loanMandateStatusReducer, loanValidateRemitaOtpReducer, loanStatementUpload, continueApplication, 
     SignatureReducer , PassportReducer, KycRequired,liquidateLoanReducer, termsReducer, EnableStatementUploadReducer } from './loan.reducer';
import { linkBVN, profileSuccessMessage, profileMenu, capturePersonalInformation,getContactDetail,
        getResidential, addNextOfKin, addContactDetails, occupationAndSector,
         addDocuments,getPersonalInfo, GetResidentialAddress, addResidentialAddress, getStates,
        nextOfKinsRelationship, DocumentUploadCheckReducer, checkProfileUploads,
 } from './profile-reducer';

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
    import {groupSavingsTargetGoal,
        editRotatingSavings, groupDetails, deleteGroup, contribute, editGroup, pauseGroup, findGroup, customerGroup, joinGroup, scheduleContribution, deleteMember, cashOut,
    continueScheduleGroupPayment, setAutomateSavingsEndDate, setAutomateSavingsStartDate, setAmountToWithDraw, setFrequency} from './group-savings/group-savings-reducers';
     import {getCustomerGoalTransHistoryReducer,GET_FORMULAR,GET_GOAL_TYPE,TopUPGoalStep1,TopUPGoal,WithDrawFromGoalStep1,Cashout,
         WithDrawFromGoal,PauseCustomerGoal,unPauseCustomerGoal,EditCustomerGoal,DeleteCustomerGoal,StashCashout,StashCashoutStep1,submitDashboardData} from './goal/get-customer-goal-trans-history-reducers';
     import {createRotatingSavings, rotatingGroupDetails, joinAGroup, EditSlots, 
        editGroupEsusu, ActivateGroup, deleteGroupEsusu, GetGroupsEsusu, joinGroupEsusu, refferalCode} from './group-savings/rotating-group-reducers';
    import {GetBankBranch,TalkToUs,ReportError,GetPageData, GetBankList} from './talk-to-us/talk-to-us.reducer'



import{
    getExistingPolicy,
    getNewPolicyDataChunk,
    getCoversInPoductRequest,
    saveProductCoverId,
    saveCustomerInfo,
    saveCustomerPolicyInfo,
    getCarInYearRequest,
    getCarModelRequest,
    postMotorScheduleRequest,
    postAutoInsurancePaymentRequest,
    getCarDetailsRequest 
} from './insurance.reducer'

export const onboarding = {
    userRegistrationRequest,
    bvnDetailsReducer,
    bvnSkipReducer,
    bvnCustomerDetailsReducer,
    getNDPRStatusReducer,
    acceptNDRpReducer,
    sendEmailForgotPasswordReducer,
    sendAnswerForgotPasswordReducer,
    sendTokenResetPasswordRequest,
    sendNewPasswordDetailsRequest,
    getQuestionForPinResetRequest,
    sendAnswerForPinResetRequest,
    sendOtpOrTokenForPinResetRequest,
    sendNewPinForPinResetRequest,
    getCMDMPriorityReducer,
    updateCMDMPriorityReducer,
    sendCustomerRatingReducer,
    sendCustomerWillReferAlatReducer,
    offlineLoanGetCustomerDataReducer,
    offlineLoanSendCustomerDataReducer,
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
    liquidateLoanReducer,
    termsReducer,
    EnableStatementUploadReducer
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
    resendOTPReducer,
    securityQuestionReducer
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

export const insurance = {
    getExistingPolicy,
    getNewPolicyDataChunk,
    getCoversInPoductRequest,
    saveProductCoverId,
    saveCustomerInfo,
    saveCustomerPolicyInfo,
    getCarInYearRequest,
    getCarModelRequest,
    postMotorScheduleRequest,
    postAutoInsurancePaymentRequest,
    getCarDetailsRequest
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
    editRotatingSavings,
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
export const talktous ={
    GetBankBranch,
    TalkToUs,
    ReportError,
    GetPageData,
    GetBankList,

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
    refferalCode,
    ActivateGroup
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
    Cashout,
    submitDashboardData


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
    PostMovieContent,
    SubmitMovieData,
    SubmitEventData,
    PostVisa,
    GetVisaOptions,
    GetVisaPackage,
    PostVisaDetail,
    PostPersonalDetail,
    PostVisaPayment,
    DebitableAccount
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
    checkProfileUploads,
    addContactDetails,
    occupationAndSector,
    addDocuments,
    getContactDetail,
    getResidential,
    getPersonalInfo,
    getStates,
    nextOfKinsRelationship,
    addResidentialAddress,
    GetResidentialAddress,
    DocumentUploadCheckReducer
}
