// const URL = 'https://api.alat.ng';
const URL = 'https://196.43.215.170';
//const URL = 'https://196.43.215.157';

const BASEURL = URL;

export const routes = {
    BASEURL: BASEURL,

    //registration
    SIGNUP_IMAGES: BASEURL + '/RegistrationApi',
    SIGNUP_PHONE: BASEURL + '/RegistrationApi/api/registration/SavePhoneNumber',
    BVN_VERIFICATION: BASEURL + '/RegistrationApi/api/registration/CallBvnService',
    SKIPBVNOTP: BASEURL + '/RegistrationApi/api/registration/RequestOtpForOnBoarding',
    VERIFYBVNOTP: BASEURL + '/RegistrationApi/api/registration/VerifyOtpForBvn',
    VERIFYSKIPOTPURL: BASEURL + '/RegistrationApi/api/registration/VerifyOtpForAll',
    // RESENDOTP: BASEURL + '/RegistrationApi/api/registration/ResendOtp',
    RESENDOTP: BASEURL + '/RegistrationApi/api/registration/ResendOtpV2',
    GETALLQUESTIONS: BASEURL + '/UserSecurityApi/api/v1/Account/AllQuestions',
    REGISTRATIONURLV2: BASEURL + '/UserSecurityApi/api/v1/Account/RegistrationV2',
    DOCUMENT_UPLOAD: BASEURL + '/DocumentUpload/api/upload/document',
   
    //user security
    ONBOARDING_PRIORITY: BASEURL + '/UserSecurityApi/api/v1/Account/GetOnboardingPriority',
    ANNOUNCEMENT: BASEURL + '/UserSecurityapi/api/v1/Account/GetNewsFeeds',
    REISSUE_TOKEN: BASEURL + '/UserSecurityApi/api/v1/Account/ReissueToken',
    LOGIN: BASEURL + '/UserSecurityApi/api/v1/Account/LoginV2',

    //account maintanance
    CUSTOMERACCOUNTS_ACCOUNT_MAINTANANCE: BASEURL + '/AccountMaintenance/api/account/customeraccounts',
    GETACCOUNTHISTORY: BASEURL + '/AccountMaintenance/api/transactions',
    SEND_TRANSACTION_RECEIPT: BASEURL + '/AccountMaintenance/api/transactions/sendreciept',
    GET_RECEIPT_TRANSACTIONS : function (accountNumber, take, skip, startDate =null, endDate=null){
        return `${BASEURL}/AccountMaintenance/api/transactions/getreciepts?accountNumber=${accountNumber}&take=${take}&skip=${skip}&startDate=${startDate}&endDate=${endDate}`;    
    },
    SEND_STATEMENT: BASEURL + '/AccountMaintenance/api/transactions/statementsV2',
    GET_TRANSACTION_LIMIT: BASEURL + '/AccountMaintenance/api/transactions/getTransactionlimit',
    SET_TRANSACTION_LIMIT: BASEURL + '/AccountMaintenance/api/transactions/setTransactionlimit',

    //goals and savings
    CUSTOMERGOALS: BASEURL + '/Savings.WebApi/api/Savings/CustomergoalsV2',

    //Payment

    //FundAccount 
    WEMA_TO_ALAT_TRANSFER_WITHOUT_OTP: BASEURL + '/PaymentApi/api/WemaAccountToAlatAccountWithoutOTP',
    GET_TOKENIZED_CARDS: BASEURL + '/PaymentCardServicesApi/api/v1/TokenizationApi/GetTokenizedCards',
    SAVE_CARD: BASEURL +  '/PaymentCardServicesApi/api/v1/TokenizationApi/TokenizedCardsBeforeTrans',
    DELETETOKENIZEDCARDS: BASEURL + '/PaymentCardServicesApi/api/v1/TokenizationApi/DeleteTokenizedCards',
    CARDTO_ACCOUNTTOKENIZED_TRANSFER: BASEURL + '/PaymentCardServicesApi/api/v1/TokenizationApi/CardToAccountTokenizedTransfer',
    VERIFY_CARD_PAN :BASEURL + '/PaymentCardServicesApi/api/Cards/VerifyCardPanDetailsWEB',
    CARD_TO_ACCOUNT_TRANSFER_PIN: BASEURL + '/PaymentCardServicesApi/api/Cards/CardToAccountTransferWithPinWEB',
    ENCRYPTED_DATA_URL: BASEURL + '/PaymentCardServicesApi/api/Cards/EncryptedNumbers',

    //Transfer
    BANK_LIST: BASEURL + '/PaymentApi/api/BankList',
    FETCH_TRANSFER_BENEFICIARIES: BASEURL + '/PaymentApi/api/Beneficiary/All',
    SAVE_TRANSFER_BENEFICIARY: BASEURL + '/PaymentApi/api/Beneficiary/Save',
    FETCH_ACCOUNT_DETAILS: BASEURL + '/PaymentApi/api/Accounts/VerifyAccountName',
    DELETE_TRANSFER_BENEFICIARIES: BASEURL + '/PaymentApi/api/Beneficiary/Delete',
    DELETE_TRANSFER_BENEFICIARIES: BASEURL + '/PaymentApi/api/Beneficiary/Delete',
    BANK_TRANSFER_WITHPIN: BASEURL + '/PaymentApi/api/BankTransferRequestWebWithPin',
    BANK_TRANSFER_WITHPIN_ANDOTP: BASEURL + '/PaymentApi/api/BankTransferRequestWebWithPinAndOTP',
    INTERBANK_CHARGES: BASEURL + '/PaymentApi/api/InterBankCharges/All',
    GETLIMIT: BASEURL + '/AccountMaintenance/api/transactions/getTransactionlimit', 
    GetAllCustomerAccountsWithLimitsV2: BASEURL + '/PaymentApi/api/Accounts/GetAllCustomerAccountsWithLimitsV2', 
    
    //PaymentApi/api/Accounts/VerifyAccountName

    //Airtime
    AIRTIME_BENEFICIARIES : BASEURL + '/PaymentApi/api/AirtimeBill/GetAirtimeBeneficiaries',
    AIRTIME_DELETE_BENEFICIARY : BASEURL + '/PaymentApi/api/AirtimeBill/DeleteSavedAirtimeBillBeneficiaries',
    AIRTIME_PAYMENT_WEBPIN : BASEURL + '/PaymentApi/api/AirtimeBill/AirtimePaymentWebWithPIN',
    AIRTIME_PAYMENT_WEBPINOTP : BASEURL +'/PaymentApi/api/AirtimeBill/AirtimePaymentWebPINAndOTP',
    AIRTIME_BENEFICIARY_SAVE : BASEURL + '/PaymentApi/api/AirtimeBill/SaveAirtimeBeneficiaries',
    //Data
    FETCH_DATA_BENEFICIARIES : BASEURL + '/PaymentApi/api/AirtimeBill/GetAirtimeBeneficiaries',
    DELETE_DATA_BENEFICIARY : BASEURL + '/PaymentApi/api/AirtimeBill/DeleteSavedAirtimeBillBeneficiaries',
    FETCH_DATA_PLANS : BASEURL + '/PaymentApi/api/AirtimeBill/QuickTellerBillerItemsData',
    FETCH_DEBITABLE_ACCOUNTS : BASEURL + '/PaymentApi/api/Accounts/GetAllCustomerAccountsWithLimitsV2',
    PIN_VERIFICATION : BASEURL + '/PaymentApi/api/AirtimeBill/BillPaymentWebWithPIN',
    DATA_OTP_VERIFICATION : BASEURL + '/PaymentApi/api/AirtimeBill/BillPaymentWebWithPINAndOTP',
    SAVE_DATA_BENEFICIARY : BASEURL + '/PaymentApi/api/AirtimeBill/SaveDataBeneficiaries',

    //Cardless Withdrawal
    FETCH_UNEXPIRED_PAYCODES: BASEURL + '/PaymentApi/api/CardlessTransfer/GetAllUnExpiredPayCode',
    GET_OTP_FOR_CUSTOMER: BASEURL + '/RegistrationApi/api/registration/RequestOtpForCustomer',
    CARDLESS_OTP_PIN_VERIFICATION: BASEURL + '/PaymentApi/api/CardlessTransfer/CardlessPaycodeRequestWeb',

    // Bills
    FETCH_BILLS_BENEFICIARIES: BASEURL + '/PaymentApi/api/AirtimeBill/GetBillBeneficiaries',
    FETCH_BILLERS_CATEGORY: BASEURL + '/PaymentApi/api/AirtimeBill/QuickTellerCategoryAndBillers',
    FETCH_BILLER_ITEM : BASEURL + '/PaymentApi/api/AirtimeBill/GetQuickTellerBillItems',
    GET_SUBSCRIBER_NAME: BASEURL + '/PaymentApi/api/AirtimeBill/GetQuickTellerSubscriberNameEnquiryV2',
    SAVE_BILLS_BENEFICIARY: BASEURL + '/PaymentApi/api/AirtimeBill/SaveBillBeneficiaries',

    //Loans_Onboarding
    LOANS_STEP_1 :BASEURL +'/DL_LoanOnboardingAPI/api/DigitalLendingOnBoarding/SignUp',
    LOANS_STEP_3 :BASEURL + '/DL_LoanOnboardingAPI/api/DigitalLendingOnBoarding/CustomerProfile',
    LOAN_VERIFY_BVN : BASEURL + '/DL_LoanOnboardingAPI/api/DigitalLendingOnBoarding/CallBvnService',
    LOAN_VALIDATE_OTP: BASEURL + '/DL_LoanOnboardingAPI/api/DigitalLendingOnBoarding/VerifyOtpForBvn',
    LOAN_RESEND_OTP: BASEURL + 'DL_LoanOnboardingAPI/api/DigitalLendingOnBoarding/ResendOtp',
    LOAN_REQUEST_STATEMENT: BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/RequestBankStatement', // request param
    LOAN_GENERATE_STATEMENT: BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/GenerateBankStatement', //request params
    LOAN_SELECTED_ENTRIES : BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/SelectedSalaryEntries',
    LOAN_SALARY_TRANSACTION: BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/GetSalaryTransactions',
    LOAN_GET_SCORECARD_QUESTIONS : BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/GetScoreCardQuestions',
    LOAN_POST_SCORECARD_ANSWER: BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/PostScoreCardResponse',
    LOAN_BANK_LIST: BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/GetBankList',

    //Loan InApp
    LOAN_APPLICATION_HISTORY : BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/DashboardLoanApplicationHistory',
    LOAN_CALCULATOR_DATA :BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/GetLoanCalculatorData',
    LOAN_CURRENT: BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/DashBoardCurrentLoanFinacle',
    LOAN_EMPLOYMENT_INDUSTRIES: BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/GetEmploymentIndustries',
    LOAN_EMPLOYER: BASEURL +  '/DL_LoanRequest.WebApi/api/AccountDetails/GetEmployers',
    LOAN_APPLY : BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/RequestLoan',
    LOAN_STANDING_ORDER : BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/SetupStandingOrder',
    LOAN_REJECT : BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/RejectLoan',
    LOAN_MANDATE_STATUS : BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/MandateStatus',
    LOAN_OTP_MANDATE : BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/ValidateOtpMandate',
    LOAN_KYC_REQIURED : BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/KycRequired',
    LOAN_TERMS: BASEURL + '/DL_LoanRequest.WebApi/api/AccountDetails/TermsAndConditions',

    //Settings
    CHANGE_PASSWORD : BASEURL + '/AccountSetting/api/password/change',
    GET_RANDOM_SECURITY_QUESTION: BASEURL + '/AccountSetting/api/securityquestion/Random',
    CHECK_ANSWER_WITHOUT_OTP: BASEURL + '/AccountSetting/api/securityquestion/validatewithoutotp',
    CHECK_ANSWER: BASEURL + '/AccountSetting/api/securityquestion/validate',
    CHANGE_PIN: BASEURL + '/AccountSetting/api/pin/change',
    RESET_PIN :BASEURL + '/AccountSetting/api/pin/CreateOrReset',
    GET_ALL_SECURITY_QUESTIONS : BASEURL + '/AccountSetting/api/securityquestion',
    SAVE_SECURITY_QUESTION : BASEURL + '/AccountSetting/api/securityquestion/saveorupdate',
};