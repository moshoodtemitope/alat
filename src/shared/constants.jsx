const storage = JSON.parse(localStorage.getItem("user"));

export const SystemConstant = {
    EMAILREGEX: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    ENCRYPTIONSECRETKEY: '</#%!WeMa_AlAt!%#/>',
    HEADER: {
        'Content-Type': 'application/json',
        'alat-client-apiKey': 'ERTojertoijertoijert',
        'Authorization': 'Bearer',
        'Accept': 'application/json'
    },
    SESSIONKEY: '_sjkskkl23sd_',
    MASTERCARDREGEX: /^(5[1-5][0-9])|25[1-7][0-9]/,
    VERVE: /^506[0-1][0-9][0-8]/g,
    VISA: /^4[0-9]/,
    VISAMASTERCARD: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/,
    UNIONPAY: /^(62[0-9]{14,17})$/,
    DOCUMENT_TYPE: {
        signature: 'Signature',
        identity: 'Identity',
        passport: 'Passport',
        utility: 'Utility',
        residentPermit: 'ResidentPermit',
        workid: 'WorkId',
        workidBack: 'WorkIdBack',
        statement: 'Statement',
        otherIdentityType: 'Others'
    },
    RELATIONS: [{
        'Name': 'Father'},
        {'Name': 'Spouse'},
        {'Name': 'Mother'},
        {'Name': 'Sibling'}],
    TITLES: [{
        'Name': 'Mr'},
        {'Name': 'Miss'},
        {'Name': 'Mrs'},
        {'Name': 'Chief'},
        {'Name': 'Prof'},
        {'Name': 'Dr'}],

};

export const NetworkName = {
    '1': 'glo',
    '2': 'mtn',
    '3': 'airtel',
    '4': 'etisalat'
};

export const CollectionScreenOption = {
    WemaAccountSetup : 0,
    RemitaOtpSetup : 1,
    RemitaBankSetup: 2
}

// export const LoanApplicationProgress = {
//     InProgress_AccountDetails : 1,
//     Inprogress_SalaryEntries  :2,
//     Inprogress_ScoreCard	: 3,
//     Approved: 4,
//     Rejected : 5,
//     CustomerRejectedOffer	: 6,
//     Inprogress_Collection	: 7,
//     Inprogress_CollectionWemaAccountSetup :8,
//     Inprogress_CollectionRemitaOtpSetup	: 9,
//     Inprogress_CollectionRemitaBankSetup : 10,
//     KycVerificationInprogress	:    11,
//     KycVerificationSuccessful	:    12,
//     KycVerificationFailed	:    13,
//     GeneratingAccounts	:    14,
//     LoanActive	:    15,
//     LoanRepaidAndClosed	:    16,
//     LoanWrittenOffAndClosed	:    17,
//     ApplicationAborted	:    18,
//     DisburseFunds	:    19,
//     Inprogress_UploadStatement : 20
// }

export const LoanApplicationProgress =
{
    Empty:0,
    InProgress_AccountDetails:1,
    Inprogress_SalaryEntries:2,
    Inprogress_ScoreCard:3,
    Approved:4,
    Rejected:5,
    CustomerRejectedOffer:6,
    Inprogress_Collection:7,
    Inprogress_CollectionWemaAccountSetup:8,
    Inprogress_CollectionRemitaOtpSetup:9,
    Inprogress_CollectionRemitaBankSetup:10,
    KycVerificationInprogress:11,
    KycVerificationSuccessful:12,
    KycVerificationFailed:13,
    GeneratingAccounts:14,
    LoanActive:15,
    LoanRepaidAndClosed:16,
    LoanWrittenOffAndClosed:17,
    ApplicationAborted:18,
    DisburseFunds:19,
    Inprogress_UploadStatement:20,
    Inprogress_ReviewingStatement:21
}