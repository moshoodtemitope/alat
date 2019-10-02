const URL = 'https://api.alat.ng';
//const URL = 'https://196.43.215.170';
// const URL = 'https://196.43.215.157';

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
    GET_USERPROFILE_IMAGE: BASEURL + '/DocumentUpload/api/upload/dp2/',

    //user security
    ONBOARDING_PRIORITY: BASEURL + '/UserSecurityApi/api/v1/Account/GetOnboardingPriority',
    ANNOUNCEMENT: BASEURL + '/UserSecurityapi/api/v1/Account/GetNewsFeeds',
    REISSUE_TOKEN: BASEURL + '/UserSecurityApi/api/v1/Account/ReissueToken',
    LOGIN: BASEURL + '/UserSecurityApi/api/v1/Account/LoginV2',
    ACCEPTNDRP: BASEURL + '/UserSecurityApi/api/v1/Account/AcceptNdrp?isNdrpAccepted=',
    CHECK_NDRP: BASEURL + '/UserSecurityApi/api/v1/Account/GetNDRPPriority',
    EMAIL_FOR_FORGETPASSWORD: BASEURL + '/UserSecurityApi/api/v1/Account/EmailForForgetPassword',
    VERIFYUSER_FOR_FORGETPASSWORD: BASEURL + '/UserSecurityApi/api/v1/Account/VerifyUserForForgetPassword',
    RESET_PASSWORD_WITHPIN: BASEURL + '/UserSecurityApi/api/v1/Account/CallResetPasswordWithPin',
    GET_QUESTIONBY_TOKEN: BASEURL + '/UserSecurityApi/api/v1/Account/GetUserQuestionByToken?token=',

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
    GETSTATES: BASEURL + '/AccountMaintenance/api/account/GetStatesAndLgas',
    

    //goals and savings
    CUSTOMERGOALS: BASEURL + '/Savings.WebApi/api/Savings/CustomergoalsV2',

    //Virtual Cards
    GET_VC_EXCHENGE_RATE: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/GetCurrentExchangeRateV2',
    CREAT_VIRTUAL_CARD_INITIAL: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/CreateVirtualCardInit',
    CREAT_VIRTUAL_CARD_FINAL: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/CreateVirtualCardFinal',
    GET_CURRENT_VC: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/GetCurrrentVirtualCardWeb',
    GET_SINGLE_VC: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/GetSingleVirtualCardWeb',
    DELETE_VIRTUAL_CARD: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/Delete',
    TOPUP_VIRTUAL_CARD_INITIAL: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/FundVirtualCardInit',
    TOPUP_VIRTUAL_CARD_FINAL: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/FundVirtualCardFinal',
    LIQUIDATE_VIRTUAL_CARD: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/LiquidateVirtualCard',
    VIRTUAL_CARD_HISTORY: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/VirtualCardHistory',
    VIRTUAL_CARD_CHANGE_STATE: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/ChangeVirtualCardState',
    VIRTUAL_CARD_ENCRYPTED_NUMBER: BASEURL + '/virtual.cards.api/api/v1/VirtualCard/GetEncryptedNumberList',

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
    BANK_TRANSFER_WITHPIN: BASEURL + '/PaymentApi/api/BankTransferRequestWebWithPin',
    BANK_TRANSFER_WITHPIN_ANDOTP: BASEURL + '/PaymentApi/api/BankTransferRequestWebWithPinAndOTP',
    INTERBANK_CHARGES: BASEURL + '/PaymentApi/api/InterBankCharges/All',
    GETLIMIT: BASEURL + '/AccountMaintenance/api/transactions/getTransactionlimit', 
    GetAllCustomerAccountsWithLimitsV2: BASEURL + '/PaymentApi/api/Accounts/GetAllCustomerAccountsWithLimitsV2', 
    FETCH_CUSTOMER_ACCOUNTS: BASEURL + '/PaymentApi/api/Accounts/GetAllCustomerAccounts', 

    
    // Card Maintenance
   
    GET_CARD_CONTROL_SETTINGS: BASEURL + '/CardMaintenanceApi/api/v1/CardControl/CardSettingFromCardControl',
    GET_PANS: BASEURL + '/CardMaintenanceApi/api/v1/CardMaintenance/getpans',
    ACTIVATE_CARD: BASEURL + '/CardMaintenanceApi/api/v1/CardMaintenance/activatecard',
    GET_ACTIVE_PANS: BASEURL + '/CardMaintenanceApi/api/v1/CardMaintenance/getactivepans',
    GET_CARD_EXISTING_SETTINGS: BASEURL + '/CardMaintenanceApi/api/v1/CardControl/CustomerCardsFromCardControl',
    GETCARDDESIGN: BASEURL + '/CardMaintenanceApi/api/v1/CardMaintenance/GetJson',
    HOTLIST_CARD: BASEURL + '/CardMaintenanceApi/api/v1/CardMaintenance/hotlistcard',
    GETCUSTOMERINFO: BASEURL + '/CardMaintenanceApi/api/v1/CardMaintenance/GetAllCustomerInfo',
    GETALLACCOUNTS: BASEURL + '/CardMaintenanceApi/api/v1/CardMaintenance/GetAllCustomerAccounts',
    HOTLIST_CARD_REASONS: BASEURL + '/CardMaintenanceApi/api/v1/CardMaintenance/gethotlistreasons',
    SAVECARD: BASEURL + '/CardMaintenanceApi/api/v1/CardMaintenance/Save',
    UPDATE_CARD_CONTROL: BASEURL + '/CardMaintenanceApi/api/v1/CardControl/UpdateCustomerCardsFromCardControl',
    CARD_STATUS: BASEURL + '/cardmaintenanceapi/api/v1/CardMaintenance/getcardstatus',
    CARD_STATUS_ERROR: BASEURL + '/cardmaintenanceapi/api/v1/CardMaintenance/LogCardDeliveryError',

    //Account Settings
    GETRANDOMSECURITYQUESTION: BASEURL + '/AccountSetting/api/securityquestion/Random',
    VERIFY_SECURITY_QUESTION: BASEURL + '/AccountSetting/api/securityquestion/validatewithoutotp',
    
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
    LOAN_RESEND_OTP: BASEURL + '/DL_LoanOnboardingAPI/api/DigitalLendingOnBoarding/ResendOtp',
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

    //ALat-Loans
    GET_ACTIVE_LOANS : BASEURL + '/Lending.API/api/loan/GetCustomerStatus',

    //WesternUnion
    WESTERNUNION_COUNTRIES: BASEURL + '/PaymentApi/api/WesternunionCountries',
    RECEIVE_WESTERNUNION: BASEURL + '/PaymentApi/api/WesternUnionMoneyTransfer',

    //Settings
    CHANGE_PASSWORD : BASEURL + '/AccountSetting/api/password/change',
    GET_RANDOM_SECURITY_QUESTION: BASEURL + '/AccountSetting/api/securityquestion/Random',
    CHECK_ANSWER_WITHOUT_OTP: BASEURL + '/AccountSetting/api/securityquestion/validatewithoutotp',
    CHECK_ANSWER: BASEURL + '/AccountSetting/api/securityquestion/validate',
    CHANGE_PIN: BASEURL + '/AccountSetting/api/pin/change',
    RESET_PIN :BASEURL + '/AccountSetting/api/pin/CreateOrReset',
    //profiles
    GET_PROFILE_MENU: BASEURL + '/ProfileManagement.WebApi/api/ProfileMenu',
    POST_PROFILE_INFO: BASEURL + '/ProfileManagement.WebApi/api/PersonalInfo/Add',
    ADD_NEXT_OF_KIN: BASEURL + '/ProfileManagement.WebApi/api/nextOfKin/AddV2',
    ADD_CONTACT: BASEURL + '/ProfileManagement.WebApi/api/ContactDetails/SaveV2',
    OCCUPA_AND_SECTOR: BASEURL + '/ProfileManagement.WebApi/api/OccupationAndSector',
    NEXT_OF_KIN_RELATIONSHIP: BASEURL + '/ProfileManagement.WebApi/api/nextOfKin/NextofKinRelationships',
    GET_CONTACT_DETAIL: BASEURL + '/ProfileManagement.WebApi/api/ContactDetails',
    GET_RESIDENTIAL_ADDRESS: BASEURL + '/ProfileManagement.WebApi/api/ResidentialAddress',
    POST_RESIDENTIAL_ADDRESS: BASEURL + '/ProfileManagement.WebApi/api/ResidentialAddress/Save',
    GETPERSONALINFO: BASEURL + '/ProfileManagement.WebApi/api/PersonalInfo',
    GETSTATES: BASEURL + '/AccountMaintenance/api/account/GetStatesAndLgas',
    ADD_DOCUMENT: BASEURL + '/DocumentUpload/api/upload/document',

    IDENTITY_TYPE: BASEURL + '/DocumentUpload/api/upload/check',
    



    //Insurance
     FETCH_EXISTING_POLICIES: BASEURL + '/PaymentApi/api/Insurance/GetInsuranceTransactionHistory',
     FETCH_ACCIDENT_SCHEDULE: BASEURL + '/PaymentApi/api/Insurance/PersonalAccidentSchedule',
     FETCH_BILLS_BENEFICIARIES: BASEURL + '/PaymentApi/api/Insurance/TravelSchedule',
     FETCH_INSURANCE_PRODUCTS: BASEURL + '/PaymentApi/api/Insurance/GetProduct',
     FETCH_INSURANCE_COUNTRIES: BASEURL + '/PaymentApi/api/Insurance/GetInsuranceCountries',
     FETCH_INSURANCE_COLORLIST: BASEURL + '/PaymentApi/api/Insurance/GetColorList',
     FETCH_INSURANCE_LGA: BASEURL + '/PaymentApi/api/Insurance/GetInsuranceAllLga',
     FETCH_INSURANCE_BODYTYPES: BASEURL + '/PaymentApi/api/Insurance/GetBodyTypes',
     FETCH_INSURANCE_MANUFACTUREYEAR: BASEURL + '/PaymentApi/api/Insurance/GetManufactureYear',
     FETCH_INSURANCE_TITLES: BASEURL + '/PaymentApi/api/Insurance/GetInsuranceTitles',
     FETCH_INSURANCE_GENDERS: BASEURL + '/PaymentApi/api/Insurance/GetInsuranceGenders',
     FETCH_INSURANCE_NONSCHENGENCOUNTRIES: BASEURL + '/PaymentApi/api/Insurance/GetInsuranceNonSchengenCountries',
     FETCH_COVERS_IN_PRODCUTS: BASEURL + '/PaymentApi/api/Insurance/GetProductSubClassCoverTypes',
     FETCH_CARS_MADEINYEAR: BASEURL + '/PaymentApi/api/Insurance/GetVehicleMake?makeYear=',
     FETCH_CAR_MODELS: BASEURL + '/PaymentApi/api/Insurance/GetVehicleMakeModel',
     FETCH_VEHICLE_DETAILS: BASEURL + '/PaymentApi/api/Insurance/GetVehiclesDetails',
     SEND_MOTOR_SCHEDULE: BASEURL + '/PaymentApi/api/Insurance/MotorSchedule',
     FINALPAYMENT_FORAUTO_INSURANCE: BASEURL + '/PaymentApi/api/Insurance/FinalizePartnerPayment',

    //savings&goals
    ADDGOAL: BASEURL + '/Savings.WebApi/api/Savings/AddGoal',
    ADDFLEXIGOAL: BASEURL + '/Savings.WebApi/api/Savings/AddFlexiGoal',
    ADDSTACHGOAL: BASEURL + '/Savings.WebApi/api/Savings/AddStashGoal',
    FETCH_DEBITABLE_ACCOUNTS_WITH_LIMITS: BASEURL + '/PaymentApi/api/Accounts/GetAllCustomerAccountsWithLimitsV2',
    GOALTYPE: BASEURL + '/Savings.WebApi/api/Savings/GoalType',
    GOAL_FORMULAR: BASEURL + '/Savings.WebApi/api/savings/GetValues',
    GOALTRANSACTIONHISTORY: BASEURL + '/Savings.WebApi/api/Savings/GetCustomerGoalTransHistory',
    CUSTOMERGOALDASHBOARD: BASEURL + '/Savings.WebApi/api/Savings/CustomergoalDashBoard',
    TOPUPGOAL: BASEURL + '/Savings.WebApi/api/Savings/TopUpGoal',
    UNPAUSEGOAL: BASEURL + '/Savings.WebApi/api/Savings/ContinueGoal',
    WITHDRAWFROMGOAL: BASEURL + '/Savings.WebApi/api/Savings/WithDrawal',
    DELETEGOAL: BASEURL + '/Savings.WebApi/api/Savings/DeleteGoal',
    EDITGOAL: BASEURL + '/Savings.WebApi/api/Savings/EditGoal',
    EDITFLEXIGOAL: BASEURL + '/Savings.WebApi/api/Savings/EditFlexiGoal',
    PAUSEGOAL: BASEURL + '/Savings.WebApi/api/Savings/PauseGoal',
    CASHOUTSTASH:BASEURL + '/Savings.WebApi/api/Savings/CashoutStashGoal',

    // Group Savings
    CREATEGOAL: BASEURL + '/Savings.WebApi/api/GroupSaving/CreateGroup',
    GROUPCUSTOMERS: BASEURL + '/Savings.WebApi/api/GroupSaving/GetCustomerGroups',
    DELETE_GROUP: BASEURL + '/Savings.WebApi/api/GroupSaving/DeleteGroup',
    GETGROUPDETAILS: BASEURL + '/Savings.WebApi/api/GroupSaving/GetGroupDetails',
    SCHEDULE_CONTRIBUTION: BASEURL + '/Savings.WebApi/api/GroupSaving/ScheduleContribution',
    EDIT_GROUP_SAVINGS: BASEURL + '/Savings.WebApi/api/GroupSaving/EditGroup',
    PAUSE_GROUP: BASEURL + '/Savings.WebApi/api/GroupSaving/PauseScheduledGroupPayemnt',
    FIND_GROUP: BASEURL + '/Savings.WebApi/api/GroupSaving/FindGroup',
    JOIN_GROUP: BASEURL + '/Savings.WebApi/api/GroupSaving/JoinGroup',
    CONTRIBUTE: BASEURL + '/Savings.WebApi/api/GroupSaving/Contribute',
    
    // ROTATING SAVINGS (ESUSU)
    CREATE_ROTATING_SAVINGS: BASEURL + '/Savings.WebApi/api/EsusuSaving/CreateGroup',
    ROTATING_GROUP_DETAILS: BASEURL +  '/Savings.WebApi/api/EsusuSaving/GetGroupDetails',
    JOIN_A_GROUP: BASEURL + '/Savings.WebApi/api/EsusuSaving/JoinGroup',
    EDIT_SLOTS: BASEURL + '/Savings.WebApi/api/EsusuSaving/EditSlots',
    GET_GROUPS: BASEURL + '/Savings.WebApi/api/EsusuSaving/GetGroups',
    EDIT_GROUP_ESUSU: BASEURL + '/Savings.WebApi/api/EsusuSaving/EditGroup',
    DELETE_GROUP_ESUSU: BASEURL + '/Savings.WebApi/api/EsusuSaving/DeleteGroup',
    JOIN_GROUP_ESUSU: BASEURL + '/Savings.WebApi/api/EsusuSaving/JoinGroup',
    GET_ALL_SECURITY_QUESTIONS : BASEURL + '/AccountSetting/api/securityquestion',
    SAVE_SECURITY_QUESTION : BASEURL + '/AccountSetting/api/securityquestion/saveorupdate',
    ACTIVATE_GROUP: BASEURL + '/Savings.WebApi/Api/EsusuSaving/Activate',

    //EVENTS
    GET_EVENTS: BASEURL + '/LifeStylePaymentMoviesApi/api/events/getevents?pageNum=',
    GET_SINGLE_EVENT: BASEURL + '/LifeStylePaymentMoviesApi/api/v1/Movies/GetSingleEvent',
    BUY_EVENT_TICKET: BASEURL + '/LifeStylePaymentMoviesApi/api/v1/Movies/BuyEventTicket',

    //PREFERENCES
    GET_PREFENCE: BASEURL + '/LifeStylePaymentMoviesApi/api/v1/Account/GetAllEngagements',
    GET_CUSTOMER_ENGAGEMENTS: BASEURL + '/LifeStylePaymentMoviesApi/api/v1/Account/GetCustomerEngagements',

    //movies
    FETCH_MOVIES_LIST : BASEURL + '/LifeStylePaymentMoviesApi/api/v1/Movies/GetMovies?page=',
    FETCH_MOVIE_SHOWTIME : BASEURL + '/LifeStylePaymentMoviesApi/api/v1/Movies/GetShowTimes?cinemaUid=',
    BUY_MOVIE_TICKET : BASEURL + '/LifeStylePaymentMoviesApi/api/v1/Movies/BuyMovieTicket',
    FETCH_MOVIE_GENRE : BASEURL + '/LifeStylePaymentMoviesApi/api/v1/Movies/GetGenreList',
    FETCH_MOVIE_CINEMAS : BASEURL + '/LifeStylePaymentMoviesApi/api/v1/Movies/GetCinemaList',
    GET_CONVENIENCE_FEE : BASEURL + '/LifeStylePaymentMoviesApi/api/v1/Movies/GetCinemaListAndFee',
    SEND_MESSAGE:BASEURL + '/Contact.WebApi/api/Contact/send',
    GET_PAGE_DATA:BASEURL +'/Contact.WebApi/api/contact/getpagedata',
    BRANCH_ATM:BASEURL + '/Contact.WebApi/api/contact/branchesatm',
    REPORT_ERROR:BASEURL + '/Contact.WebApi/api/contact/reporterror',

};
