// const URL = 'https://api.alat.ng';
const URL = 'https://196.43.215.170';
// const URL = 'https://196.43.215.157';

const BASEURL = URL;

export const routes = {
    BASEURL: BASEURL,
    SIGNUP_IMAGES: BASEURL + '/RegistrationApi',
    SIGNUP_PHONE: BASEURL + '/RegistrationApi/api/registration/SavePhoneNumber',
    SKIPBVNOTP: BASEURL + '/RegistrationApi/api/registration/RequestOtpForOnBoarding',
    LOGIN: BASEURL + '/UserSecurityApi/api/v1/Account/LoginV2',
    CUSTOMERACCOUNTS_ACCOUNT_MAINTANANCE: BASEURL + '/AccountMaintenance/api/account/customeraccounts',
    CUSTOMERGOALS: BASEURL + '/Savings.WebApi/api/Savings/CustomergoalsV2',
    ONBOARDING_PRIORITY: BASEURL + '/UserSecurityApi/api/v1/Account/GetOnboardingPriority',
    ANNOUNCEMENT: BASEURL + '/UserSecurityapi/api/v1/Account/GetNewsFeeds',
    REISSUE_TOKEN: BASEURL + '/UserSecurityApi/api/v1/Account/ReissueToken',

    //Transfers
    BANK_LIST: BASEURL + '/PaymentApi/api/BankList'
};