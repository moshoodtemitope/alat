import {combineReducers} from "redux";
import {authentication} from "./authentication.reducer";
import { alert} from "./alert.reducer";
// import {dashboard, transfer, onboarding, airtime, global, fundAccount, loanOnboarding, loans} from "./export";
import {dashboard, 
        transfer, 
        onboarding, 
        airtime, 
        global, 
        fundAccount, 
        loanOnboarding,
        loans,
        receiveMoney,
        fixedGoal,
        flexGoal,
        stashGoal,
        groupSavings,
        rotatingSavings, 
        customerGoal,
        movies,
        preferences,
        talktous,
        profile,
        insurance,
        alatCards} from "./export";

import {bankListRequest, beneficiariesRequest} from "./transfer.reducer";
import {accountHistoryReducer} from "./dashboard.reducer";
import { userConstants } from "../constants/onboarding/user.constants";
import dataReducer from './data.reducer';
import cardlessReducer from './cardless.reducer';
import billsReducer from './bills.reducer';
import accountsReducer from './accounts.reducer';
import settingsReducer from './settings.reducer';
import alatLoanReducer from './alat-loan.reducer';
import { airtimeConstants } from "../constants/airtime/airtime.constants";
import { TRANSFER_REDUCER_CLEAR } from "../constants/transfer.constants";
import { fundAccountConstants } from "../constants/fund-account/fund-account.constant";
import { loanOnboardingConstants } from '../constants/onboarding/loan.constants';
import { loanConstants } from '../constants/loans/loans.constants';
import { ALATINSURANCE_REDUCER_CLEAR } from '../constants/insurance/insurance.constants';
import { ALATCARD_REDUCER_CLEAR } from '../constants/cards/cards.constants';
import { WESTERNUNION_REDUCER_CLEAR } from '../constants/remittance/remittance.constants';
import {fixedGoalConstants} from '../constants/goal/fixed-goal.constant';
import {flexGoalConstants} from '../constants/goal/flex-goal.constant';
import {createGoalConstants} from '../constants/goal/create-stash.constant';
import {customerGoalConstants} from '../constants/goal/get-customer-trans-history.constant';
import {listStyleConstants} from '../constants/lifestyle/lifestyle-constants'
//import { saveCardReducer } from "./fund-account.reducer";
// import { * as dashboard_reducer } from './dashboard.reducer';

const rootReducer = (state, action)=>{
    //console.log(action);
    if(action.type === userConstants.LOGOUT)
        { 
              state = undefined;   
             }
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

const insurancePile = (state, action)=>{
    if(action.type ===ALATINSURANCE_REDUCER_CLEAR){
        state = undefined;
    }
    return alatInsuranceReducer(state, action);
}

const alatInsuranceReducer = combineReducers({
    getExistingPolicy: insurance.getExistingPolicy,
    getNewPolicyDataChunk: insurance.getNewPolicyDataChunk,
    getCoversInPoductRequest: insurance.getCoversInPoductRequest,
    saveProductCoverId: insurance.saveProductCoverId,
    saveCustomerInfo: insurance.saveCustomerInfo,
    saveCustomerPolicyInfo: insurance.saveCustomerPolicyInfo,
    getCarInYearRequest: insurance.getCarInYearRequest,
    getCarModelRequest: insurance.getCarModelRequest,
    postMotorScheduleRequest: insurance.postMotorScheduleRequest,
    postAutoInsurancePaymentRequest: insurance.postAutoInsurancePaymentRequest,
    getCarDetailsRequest: insurance.getCarDetailsRequest
})
const alatCardReducersPile = (state, action)=>{
    if(action.type ===ALATCARD_REDUCER_CLEAR){
        state = undefined;
    }
    return alatCardsReducer(state, action);
}  


const remittanceReducerPile = (state, action)=>{
    if(action.type ===WESTERNUNION_REDUCER_CLEAR){
        state = undefined;
    }
    return remittanceReducer(state, action);
}
const GoalReducerPile=(state, action)=>{
    if(action.type === fixedGoalConstants.FIXED_GOAL_REDUCER_CLEAR ){
        state = undefined
    }

    return GoalReducer(state, action)
}
const LifestyleReducerPile=(state,action)=>{
    if(action.type === listStyleConstants.MOVIE_REDUCER_CLEAR){
        state = undefined
    }
    return LifestyleReducer(state, action)
}
const FlexGoalReducerPile=(state,action)=>{
    if(action.type === flexGoalConstants.FLEX_GOAL_REDUCER_CLEAR){
        state = undefined
    }
    return FlexGoalReducer(state, action)
}

const CreateGoalReducerPile=(state,action)=>{
    if(action.type === createGoalConstants.STASH_GOAL_REDUCER_CLEAR){
        state =undefined
    }
    return CreateGoalReducer(state, action)
}

const CustomerGoalReducerPile=(state,action)=>{
    if(action.type === customerGoalConstants.CUSTOMER_GOAL_REDUCER_CLEAR){
        state = undefined
    }
    return CustomerGoalReducer(state, action)
}
const remittanceReducer = combineReducers({
    getCountries: receiveMoney.getWesternUnionCountries,
    receiveWUMoney: receiveMoney.receiveWesternUnion
    
})


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
    loanUserDetails: loanOnboarding.saveUserDetailsReducer,
    loanResendOTP: loanOnboarding.resendOTPReducer,
    sec_question: loanOnboarding.securityQuestionReducer
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
    loanValRemOtp: loans.loanValidateRemitaOtpReducer,
    loanStament: loans.loanStatementUpload,
    loanAppStatus: loans.continueApplication,
    passport: loans.PassportReducer,
    signature: loans.SignatureReducer,
    kycrequired : loans.KycRequired,
    terms: loans.termsReducer,
})
 const GoalReducer = combineReducers({
    fixed_goal_step1:fixedGoal.fixedGoalStep1Reducer,
    fixed_goal_step2:fixedGoal.fixedGoalStep2Reducer,
    add_goal_reducer:fixedGoal.addGoalReducer,


});
const LifestyleReducer = combineReducers({
    //EVENTS
    getEvents: movies.getEvents,
    getSingleEvent: movies.getSingleEvent,
    purchaseEventTicket: movies.purchaseEventTicket,
    getMovieList:movies.fetchMovieList,

    getAllEngagements: preferences.getAllEngagements,
    getCustomersEngagements: preferences.getCustomersEngagements,

    movieDetails: movies.movieDetails,

    //MOVIES
    getCinemaList:movies.getCinemaList,
    getSingleMovie:movies.getSingleMovie,
    buyMovieTicket:movies.buyMovieTicket,
    ShowTime:movies.ShowTime,
    SubmitTicketData:movies.SubmitTicketData,
    SubmitEventTicketData:movies.SubmitEventTicketData,
    SearchfetchMovieList:movies.SearchfetchMovieList,
    SearchfetchEventList:movies.SearchfetchEventList,
    FetchMovieGenre:movies.FetchMovieGenre,
    PostMovieContent:movies.PostMovieContent,
    SubmitMovieData:movies.SubmitMovieData,
    SubmitEventData:movies.SubmitEventData,

    //Visa
    PostVisa:movies.PostVisa,
    GetVisaOptions:movies.GetVisaOptions,
    GetVisaPackage:movies.GetVisaPackage,
    PostVisaDetail:movies.PostVisaDetail,
    PostPersonalDetail:movies.PostPersonalDetail,
    PostVisaPayment: movies.PostVisaPayment

})
            
 const FlexGoalReducer = combineReducers({

    flex_goal_step1:flexGoal.flexGoalStep1Reducer,
    flex_goal_step2:flexGoal.flexGoalStep2Reducer,
    add_flex_goal:flexGoal.addFlexGoalReducer,

 })
  const CreateGoalReducer = combineReducers({
    create_stash_goal:stashGoal.createStashGoalReducer,
    create_stash_step1:stashGoal.createStashGoalStep1Reducer,

  })
  const CustomerGoalReducer = combineReducers({
          //customer Goal reducers
    customerGoalTransHistory:customerGoal.getCustomerGoalTransHistoryReducer,
    customerGoalType:customerGoal.GET_GOAL_TYPE,
    customerGoalFormular:customerGoal.GET_FORMULAR,
    top_up_goal:customerGoal.TopUPGoal,
    top_up_goal_step1:customerGoal.TopUPGoalStep1,
    withdraw_from_goal_step1:customerGoal.WithDrawFromGoalStep1,
    withdraw_from_goal:customerGoal.WithDrawFromGoal,
    delete_goal:customerGoal.DeleteCustomerGoal,
    edit_goal:customerGoal.EditCustomerGoal,
    pause_goal:customerGoal.PauseCustomerGoal,
    unpause_goal:customerGoal.unPauseCustomerGoal,
    stashGoal:customerGoal.StashCashout,
    stashGoal_step1:customerGoal.StashCashoutStep1,
    Cashout:customerGoal.Cashout,
    submitDashboardData:customerGoal.submitDashboardData,


  })


const alatCardsReducer = combineReducers({
    getVirtualCards: alatCards.geCurrentVirtualCardsRequest ,
    sendVCNewCardinfo: alatCards.sendVCNewCardinfo ,
    sendTopVCCardinfo: alatCards.sendTopVCCardinfo,
    getAVirtualCardinfo: alatCards.getAVirtualCardinfo,
    liquidateCard: alatCards.liquidateCard,
    deleteVirtualCard: alatCards.deleteVirtualCard,
    getCardHistory: alatCards.getVirtualCardHistoryRequest,
    changeCardStatus: alatCards.changeCardStatus,
    getAtmCard: alatCards.getAtmCardRequest,
    getAtmCardHotlistReasons: alatCards.getAtmCardHotlistReasonsRequest,
    atmCardHotlistRequest: alatCards.atmCardHotlistRequest,
    randomQuestionRequest: alatCards.randomQuestionRequest,
    answerRandomQuestionRequest: alatCards.answerRandomQuestionRequest,
    activateALATCardRequest: alatCards.activateALATCardRequest,
    loadALATCardSettingsRequest: alatCards.loadALATCardSettingsRequest,
    updateALATCardSettingsRequest: alatCards.updateALATCardSettingsRequest,
    infoForATMCardRequest: alatCards.infoForATMCardRequest,
    otpForATMCardRequest: alatCards.otpForATMCardRequest,
    postATMCardRequest: alatCards.postATMCardRequest,
})

const appReducer = combineReducers({
    authentication,
    // registration,
    alert,
    onboarding_user_details: onboarding.userRegistrationRequest,
    onboarding_bvn_details: onboarding.bvnDetailsReducer,
    onboarding_bvnskip_details: onboarding.bvnSkipReducer,
    onboarding_dataFrom_bvn: onboarding.bvnCustomerDetailsReducer,
    ndpr_status_request: onboarding.getNDPRStatusReducer,
    acceptndrp_request: onboarding.acceptNDRpReducer,
    cmdmpriority_request: onboarding.getCMDMPriorityReducer,
    update_cmdmpriority_request: onboarding.updateCMDMPriorityReducer,
    send_rating_request: onboarding.sendCustomerRatingReducer,
    send_willrefer_alat_request: onboarding.sendCustomerWillReferAlatReducer,
    sendemailfor_forgotpw_request: onboarding.sendEmailForgotPasswordReducer,
    sendanswerfor_forgotpw_request: onboarding.sendAnswerForgotPasswordReducer,
    send_customertoken_request: onboarding.sendTokenResetPasswordRequest,
    send_newcustomerpassword_request: onboarding.sendNewPasswordDetailsRequest,
    get_questionforpinreset_request: onboarding.getQuestionForPinResetRequest,
    send_answerforpinreset_request: onboarding.sendAnswerForPinResetRequest,
    send_otportokenforpinreset_request: onboarding.sendOtpOrTokenForPinResetRequest,
    send_newpinforpinreset_request: onboarding.sendNewPinForPinResetRequest,
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
    alatCardReducersPile,
    accounts: global.debitableAccountsReducer,
    encrypt_rule: global.getEncryptionRuleReducer,
    verify_pan: global.verifyPANReducer,
    insurancePile,
    remittanceReducerPile,
    GoalReducerPile,
    FlexGoalReducerPile,
    CreateGoalReducerPile,
    CustomerGoalReducerPile,
    LifestyleReducerPile,
    // storage_reducer
    // storage_reducer

    //data_reducer
    data_reducer: dataReducer,
    cardless_reducer: cardlessReducer,
    bills_reducer: billsReducer,
    accountsM_reducer : accountsReducer,
    settings_reducer : settingsReducer,
    alat_loan_reducer: alatLoanReducer,
    

    //fixed goal reducers
    // fixed_goal_step1:fixedGoal.fixedGoalStep1Reducer,
    // fixed_goal_step2:fixedGoal.fixedGoalStep2Reducer,
    // add_goal_reducer:fixedGoal.addGoalReducer,

    // talktous
    talk_to_us:talktous.TalkToUs,
    reportError:talktous.ReportError,
    get_bank_branch:talktous.GetBankBranch,
    get_page_data:talktous.GetPageData,
    GetBankList:talktous.GetBankList,



    

   
    //Group Savings Reducers (GROUP SAVINGS)
    groupSavings: groupSavings.groupSavingsTargetGoal,
    groupDetails: groupSavings.groupDetails,
    deleteGroup: groupSavings.deleteGroup,
    contribute: groupSavings.contribute,
    editGroup: groupSavings.editGroup,
    findGroup: groupSavings.findGroup,
    customerGroup: groupSavings.customerGroup,
    joinGroup: groupSavings.joinGroup,
    scheduleContribution: groupSavings.scheduleContribution,
    deleteMember: groupSavings.deleteMember,
    cashOut: groupSavings.cashOut,
    continueScheduleGroupPayment: groupSavings.continueScheduleGroupPayment,
    pauseGroup: groupSavings.pauseGroup,
    automateContributionStartDate: groupSavings.setAutomateSavingsStartDate,
    automateContributionEndDate: groupSavings.setAutomateSavingsEndDate,
    setFrequency: groupSavings.setFrequency,
    setAmountToWithDraw: groupSavings.setAmountToWithDraw,
   
    /// ESUSU (GROUP SAVINGS)
    createRotatingGroupSavings: rotatingSavings.createRotatingSavings,
    rotatingGroupDetails: rotatingSavings.rotatingGroupDetails,
    joinAGroup: rotatingSavings.joinAGroup,
    editSlot: rotatingSavings.EditSlots,
    getGroupSavingsEsusu: rotatingSavings.GetGroupsEsusu,
    editGroupEsusu: rotatingSavings.editGroupEsusu,
    deleteGroupEsusu: rotatingSavings.deleteGroupEsusu,
    joinGroupEsusu: rotatingSavings.joinGroupEsusu,
    refferalCode: rotatingSavings.refferalCode,
    ActivateGroup: rotatingSavings.ActivateGroup,
    // pauseGroupEsusu: rotatingSavings.pauseGroupEsusu


     

 
     

    //profile reducer
    linkBVN:profile.linkBVN,
    profileSuccessMessage:profile.profileSuccessMessage,
    profileMenu:profile.profileMenu,
    capturePersonalInformation: profile.capturePersonalInformation,
    addNextOfKin:profile.addNextOfKin,
    addContactDetails:profile.addContactDetails,
    occupationAndSector:profile.occupationAndSector,
    addDocuments:profile.addDocuments,
    getResidential:profile.getResidential,
    getContactDetail:profile.getContactDetail,
    getPersonalInfo: profile.getPersonalInfo,
    getStates: profile.getStates,
    nextOfKinsRelationship: profile.nextOfKinsRelationship,
    addResidentialAddress: profile.addResidentialAddress,
    GetResidentialAddress: profile.GetResidentialAddress
});

//export defualt appReducer;
export default rootReducer;
















