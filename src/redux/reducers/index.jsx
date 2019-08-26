import {combineReducers} from "redux";
import {authentication} from "./authentication.reducer";
import { alert} from "./alert.reducer";
import {dashboard, transfer, onboarding, airtime, global, fundAccount, movies,loanOnboarding, loans, preferences} from "./export";
import {bankListRequest, beneficiariesRequest} from "./transfer.reducer";
import {accountHistoryReducer} from "./dashboard.reducer";
import { userConstants } from "../constants/onboarding/user.constants";
import dataReducer from './data.reducer';
import cardlessReducer from './cardless.reducer';
import billsReducer from './bills.reducer';
import accountsReducer from './accounts.reducer';
import settingsReducer from './settings.reducer';
import { airtimeConstants } from "../constants/airtime/airtime.constants";
import { TRANSFER_REDUCER_CLEAR } from "../constants/transfer.constants";
import { fundAccountConstants } from "../constants/fund-account/fund-account.constant";
import { loanOnboardingConstants } from '../constants/onboarding/loan.constants';
import { loanConstants } from '../constants/loans/loans.constants';
//import { saveCardReducer } from "./fund-account.reducer";
// import { * as dashboard_reducer } from './dashboard.reducer';

const rootReducer = (state, action)=>{
    if(action.type === userConstants.LOGOUT)
        {   state = undefined;    }
    return appReducer(state, action)

};


const airtimeReducerPile =(state, action)=>{
    if(action.type === airtimeConstants.AIRTIME_REDUCER_CLEAR)
    { state = undefined; }
    return airtimeReducer(state, action);
}

const transferReducerPile =(state, action)=>{
    if(action.type === TRANSFER_REDUCER_CLEAR){ 
        state = undefined; 
    }
    return transferReducers(state, action);
}

const fundAccountReducerPile = (state, action)=>{
    if(action.type === fundAccountConstants.FUND_ACCOUNT_REDUCER_CLEAR){ 
        state = undefined; 
    }
    return fundAccountReducer(state, action);
}

const loanOnboardingReducerPile = (state, action)=>{
    if(action.type === loanOnboardingConstants.LOAN_ONBOARDING_CLEAR){
        state = undefined;
    }
    return loanOnboardingReducer(state, action);
}

const loanReducerPile =(state, action)=>{
    if(action.type === loanConstants.LOAN_ONBOARDING_CLEAR){
        state = undefined;
    }
    return loansReducer(state, action);
}


const transferReducers = combineReducers({
    transfer_bankList: transfer.bankListRequest,
    transfer_beneficiaries: transfer.beneficiariesRequest,
    delete_transfer_beneficiaryState: transfer.deleteBeneficiaryRequest,
    save_beneficiary: transfer.saveBankTransferReducer,
    transfer_fetch_user_account: transfer.fetchAccountDetailsRequest,
    transfer_details_data: transfer.transferDetailsReducer,
    transfersender_details_data: transfer.transferSenderDetailsReducer,
    transfer_send_money: transfer.sendMoneyTransferRequest,
    transfer_processsend_money: transfer.processMoneyTransferRequest,
    tranferlimit_info: transfer.fetchTransactionLimitRequest,
    transfer_bank_charges: transfer.getBankChargesReducer
})

const airtimeReducer = combineReducers({
    airtime_beneficiaries: airtime.airtimeBeneficiariesReducer,
    airtime_beneDelete: airtime.deleteBeneficiaryReducer,
    airtime_buydata: airtime.buyAirtimeReducer,
    airtime_webpin: airtime.buyAirtimeWebPinReducer,  
    airtime_webpinotp: airtime.buyAirtimeWebPinOTPReducer,
    airtime_save_bene: airtime.airtimeSaveBeneficiaryReducer
})

const fundAccountReducer = combineReducers({
    fundAccount : fundAccount.fundAccountReducer,
    getTokencards : fundAccount.getTokenizedCardsReducer,
    saveCard: fundAccount.saveCardReducer,
    cardDetails: fundAccount.tranCardDetailsReducer,
    deleteCard: fundAccount.deleteCardReducer,
    saveTransCard: fundAccount.saveCardAfterTranReducer, 
    fundwema_alat: fundAccount.fundWemaAccountReducer
    //fundFromCardToken: fundAccount.fundFromTokenisedCardReducer,
    //fundfromWithPin: fundAccount.fundFromCardWithPinReducer
})

const loanOnboardingReducer = combineReducers({
    loanOnboardingStep1 : loanOnboarding.loanOnboardingStep1Reducer,
    loanOnboardingStep2 : loanOnboarding.loanOnboardingStep2Reducer,
    loanOnboardingBVN: loanOnboarding.loanOnboardingVerifyBVNReducer,
    loanOnboardingStep3 : loanOnboarding.loanOnboardingStep3Reducer,
    loanOnboardingValidateOTP : loanOnboarding.loanOnboardingValidateOTPReducer,
    loanOnboardingGenerateStatement : loanOnboarding.generateStatementReducer,
    loanOnboardingRequestStatement : loanOnboarding.requestStatementReducer,
    loanOnboardingSalaryTransaction: loanOnboarding.salaryTransactionReducer,
    loanSalaryEntryReducer : loanOnboarding.salaryEntryReducer,
    loanGetScoreCardQuestion: loanOnboarding.getScoreCardQuestionReducer,
    loanPostScoreCardAnswer : loanOnboarding.postScoreCardAnswerReducer,
    loanUserDetails: loanOnboarding.saveUserDetailsReducer
})

const loansReducer = combineReducers({
    loanCalcData : loans.loanCalcDataReducer,
    loanApply : loans.loanApplyReducer,
    loanIndustries: loans.GetIndustriesReducer,
    loanEmployer: loans.GetEmployerReducer,
    loanCurrent: loans.CurrentLoanReducer,
    loanHistory: loans.LoanHistoryReducer,
    loanFrontId: loans.WorkIdFrontReducer,
    loanBackId: loans.WorkIdBackReducer,
    loanReject: loans.loanRejectReducer,
    loanStandingOrder: loans.loanStandingOrderReducer,
    loanMandate: loans.loanMandateStatusReducer,
    loanValRemOtp: loans.loanValidateRemitaOtpReducer
})

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
    
    airtimeReducerPile,
    transferReducerPile,
    fundAccountReducerPile,
    loanOnboardingReducerPile,
    loanReducerPile,
    accounts: global.debitableAccountsReducer,
    encrypt_rule: global.getEncryptionRuleReducer,
    verify_pan: global.verifyPANReducer,
    // storage_reducer
    // storage_reducer

    //data_reducer
    data_reducer: dataReducer,
    cardless_reducer: cardlessReducer,
    bills_reducer: billsReducer,
    accountsM_reducer : accountsReducer,
    settings_reducer : settingsReducer,

    //MOVIES
    getCinemaList: movies.getCinemaList,
    getSingleMovie: movies.getSingleMovie,
    buyMovieTicket: movies.buyMovieTicket,

    //EVENTS
    getEvents: movies.getEvents,
    getSingleEvent: movies.getSingleEvent,
    purchaseEventTicket: movies.purchaseEventTicket,
    getMovieList:movies.fetchMovieList,

    getAllEngagements: preferences.getAllEngagements,
    getCustomersEngagements: preferences.getCustomersEngagements
});

//export defualt appReducer;
export default rootReducer;