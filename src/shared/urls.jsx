//const URL = 'https://api.alat.ng';
const URL = 'https://196.43.215.170';
// const URL = 'https://196.43.215.157';

const BASEURL = URL;

export const routes = {
    BASEURL: BASEURL,
    SIGNUP_IMAGES: BASEURL + '/RegistrationApi',
    SIGNUP_PHONE: BASEURL + '/RegistrationApi/api/registration/SavePhoneNumber',
    SKIPBVNOTP: BASEURL + '/RegistrationApi/api/registration/RequestOtpForOnBoarding',
    LOGIN: BASEURL + '/UserSecurityApi/api/v1/Account/LoginV2',
    CUSTOMERACCOUNTS_ACCOUNT_MAINTANANCE: BASEURL + '/AccountMaintenance/api/account/customeraccounts'
};