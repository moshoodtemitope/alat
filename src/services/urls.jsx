// const URL = 'https://api.alat.ng';
//  const URL = 'http://196.43.215.170';
const URL = 'http://196.43.215.157';

const BASEURL = URL;

export const routes = {
    BASEURL: BASEURL,

    //registration
    SIGNUP_IMAGES: BASEURL + '/RegistrationApi',
    SIGNUP_PHONE: BASEURL + '/RegistrationApi/api/registration/SavePhoneNumber',
    BVN_VERIFICATION: BASEURL + '/RegistrationApi/api/registration/CallBvnService',
    SKIPBVNOTP: BASEURL + '/RegistrationApi/api/registration/RequestOtpForOnBoarding',
    VERIFYBVNOTP: BASEURL + '/RegistrationApi/api/registration/VerifyOtpForBvn',
    RESENDOTP: BASEURL + '/RegistrationApi/api/registration/ResendOtp',

    //user security
    ONBOARDING_PRIORITY: BASEURL + '/UserSecurityApi/api/v1/Account/GetOnboardingPriority',
    ANNOUNCEMENT: BASEURL + '/UserSecurityapi/api/v1/Account/GetNewsFeeds',
    REISSUE_TOKEN: BASEURL + '/UserSecurityApi/api/v1/Account/ReissueToken',
    LOGIN: BASEURL + '/UserSecurityApi/api/v1/Account/LoginV2',

    //account maintanance
    CUSTOMERACCOUNTS_ACCOUNT_MAINTANANCE: BASEURL + '/AccountMaintenance/api/account/customeraccounts',
    GETACCOUNTHISTORY: BASEURL + '/AccountMaintenance/api/transactions',

    //goals and savings
    CUSTOMERGOALS: BASEURL + '/Savings.WebApi/api/Savings/CustomergoalsV2',

    //Payment

    //Transfer
    BANK_LIST: BASEURL + '/PaymentApi/api/BankList',
    FETCH_TRANSFER_BENEFICIARIES: BASEURL + '/PaymentApi/api/Beneficiary/All',
    FETCH_ACCOUNT_DETAILS: BASEURL + '/PaymentApi/api/Accounts/VerifyAccountName',
    //PaymentApi/api/Accounts/VerifyAccountName
};