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