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
      FetchMovieGenre} from './lifestyle/lifestyle-reducer';


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
      postScoreCardAnswerReducer} from './loan-onboarding.reducer';

import { loanCalcDataReducer, loanApplyReducer, GetIndustriesReducer, GetEmployerReducer, CurrentLoanReducer, 
    LoanHistoryReducer, WorkIdFrontReducer, WorkIdBackReducer, loanRejectReducer, loanStandingOrderReducer,
     loanMandateStatusReducer, loanValidateRemitaOtpReducer } from './loan.reducer';

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
    loanValidateRemitaOtpReducer
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
    saveUserDetailsReducer
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
    saveCardAfterTranReducer
}

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
    FetchMovieGenre
}

export const preferences = {
    getAllEngagements,
    getCustomersEngagements
}
























