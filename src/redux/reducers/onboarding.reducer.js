import {USER_REGISTER_SAVE, USER_REGISTER_FETCH, BVN_VERIFICATION_SUCCESS, 
    BVN_VERIFICATION_PENDING, SKIP_BVN_PENDING, SKIP_BVN_SUCCESS,
    OTP_VERIFICATION_PENDING,OTP_VERIFICATION_SUCCESS,SAVE_BVN_INFO,  OTP_VERIFICATION_FAILURE, DATA_FROM_BVN, BVN_VERIFICATION_FAILURE,
    GET_NDPRSTATUS_SUCCESS,
    GET_NDPRSTATUS_PENDING,
    GET_NDPRSTATUS_FAILURE,
    ACCEPT_NDRP_SUCCESS,
    ACCEPT_NDRP_PENDING,
    ACCEPT_NDRP_FAILURE,
    GET_CMDMPRIORITY_SUCCESS,
    GET_CMDMPRIORITY_PENDING,
    GET_CMDMPRIORITY_FAILURE,
    UPDATE_CMDMPRIORITY_SUCCESS,
    UPDATE_CMDMPRIORITY_PENDING,
    UPDATE_CMDMPRIORITY_FAILURE,
    SENDANSWERFOR_FORGOTPW_SUCCESS,
    SENDANSWERFOR_FORGOTPW_PENDING,
    SENDANSWERFOR_FORGOTPW_FAILURE,
    SENDEMAILFOR_FORGOTPW_SUCCESS,
    SENDEMAILFOR_FORGOTPW_PENDING,
    SENDEMAILFOR_FORGOTPW_FAILURE,
    SEND_CUSTOMERTOKEN_SUCCESS,
    SEND_CUSTOMERTOKEN_PENDING,
    SEND_CUSTOMERTOKEN_FAILURE,
    SEND_NEWPASSWORDINFO_SUCCESS,
    SEND_NEWPASSWORDINFO_PENDING,
    SEND_NEWPASSWORDINFO_FAILURE,
    GET_QUESTION_FORPINRESET_SUCCESS,
    GET_QUESTION_FORPINRESET_PENDING,
    GET_QUESTION_FORPINRESET_FAILURE,
    SEND_ANSWER_FORPINRESET_SUCCESS,
    SEND_ANSWER_FORPINRESET_PENDING,
    SEND_ANSWER_FORPINRESET_FAILURE,
    SEND_OTP_OR_TOKEN_FORPINRESET_SUCCESS,
    SEND_OTP_OR_TOKEN_FORPINRESET_PENDING,
    SEND_OTP_OR_TOKEN_FORPINRESET_FAILURE,
    SEND_NEWPIN_FORPINRESET_SUCCESS,
    SEND_NEWPIN_FORPINRESET_PENDING,
    SEND_NEWPIN_FORPINRESET_FAILURE,
    SEND_CUSTOMERRATING_SUCCESS,
    SEND_CUSTOMERRATING_PENDING,
    SEND_CUSTOMERRATING_FAILURE,
    SEND_WILLCUSTOMER_REFERALAT_SUCCESS,
    SEND_WILLCUSTOMER_REFERALAT_PENDING,
    SEND_WILLCUSTOMER_REFERALAT_FAILURE,

    OFFLINELOAN_GET_DATAOF_CUSTOMER_SUCCESS,
    OFFLINELOAN_GET_DATAOF_CUSTOMER_PENDING,
    OFFLINELOAN_GET_DATAOF_CUSTOMER_FAILURE,

    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_SUCCESS,
    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_PENDING,
    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_FAILURE,
} from "../constants/onboarding/user.constants"

export function userRegistrationRequest(state={}, action) {
    switch (action.type) {
        case USER_REGISTER_SAVE:
            return {
                registration_status: USER_REGISTER_SAVE,
                registration_data: action,
                //registration_step: 1
            };
        case USER_REGISTER_FETCH:
            return {
                registration_status: USER_REGISTER_FETCH,
                registration_data: action,
               // registration_step: 1
            };

        default:
            return {
                 ...state,
                // registration_status: USER_REGISTER_SAVE,
                // registration_data: action,
                // registration_step: 1
            };
    }
}

export function bvnDetailsReducer(state={}, action) {
    switch (action.type) {
        case BVN_VERIFICATION_PENDING:
            return {
                bvn_verification_status: BVN_VERIFICATION_PENDING,
                bvn_verification_data: action,
                // registration_step: 2

            };
        case BVN_VERIFICATION_SUCCESS:
            return {
                bvn_verification_status: BVN_VERIFICATION_SUCCESS,
                bvn_verification_data: action,
                // registration_step: 2
            };
        case BVN_VERIFICATION_FAILURE:
            return {
                bvn_verification_status: BVN_VERIFICATION_FAILURE,
                bvn_verification_data: action,
            };
        default:
            return {
                ...state,
               registration_step: 2
            };
    }
}

export function bvnSkipReducer(state=[], action) {
    switch (action.type) {
        case SKIP_BVN_PENDING:
            return {
                bvn_verification_status: SKIP_BVN_PENDING,
                bvn_verification_data: action,
               // registration_step: 2
            };
        case SKIP_BVN_SUCCESS:
            return {
                bvn_verification_status: SKIP_BVN_SUCCESS,
                bvn_verification_data: action,
                //registration_step: 2
            };

        default:
            return {
                ...state
               // registration_step: 2
            };
    }
}

export function bvnCustomerDetailsReducer(state=[], action){
    switch (action.type){
        case OTP_VERIFICATION_PENDING:
            return{
                otp_confirmation_status :OTP_VERIFICATION_PENDING,
                otp_data_returned: action
            };
        case SAVE_BVN_INFO:
            return {
                otp_confirmation_status: OTP_VERIFICATION_SUCCESS,
                otp_data_returned: action
            };
        default:
            return {
                otp_data_returned: ''
            };
    }

}

export function sendEmailForgotPasswordReducer(state=[], action){
    switch (action.type) {
        case SENDEMAILFOR_FORGOTPW_PENDING:
            return {
                is_processing: true,
                fetch_status: SENDEMAILFOR_FORGOTPW_PENDING,
                sendmail_status: action
            };
        case SENDEMAILFOR_FORGOTPW_SUCCESS:
            return {
                is_processing: false,
                fetch_status: SENDEMAILFOR_FORGOTPW_SUCCESS,
                sendmail_status: action
            };
        case SENDEMAILFOR_FORGOTPW_FAILURE:
            return {
                is_processing: false,
                fetch_status: SENDEMAILFOR_FORGOTPW_FAILURE,
                sendmail_status: action
            };

        default:
            return { ...state }
    }

}


export function sendAnswerForgotPasswordReducer(state=[], action){
    switch (action.type) {
        case SENDANSWERFOR_FORGOTPW_PENDING:
            return {
                is_processing: true,
                fetch_status: SENDANSWERFOR_FORGOTPW_PENDING,
                sendanswer_status: action
            };
        case SENDANSWERFOR_FORGOTPW_SUCCESS:
            return {
                is_processing: false,
                fetch_status: SENDANSWERFOR_FORGOTPW_SUCCESS,
                sendanswer_status: action
            };
        case SENDANSWERFOR_FORGOTPW_FAILURE:
            return {
                is_processing: false,
                fetch_status: SENDANSWERFOR_FORGOTPW_FAILURE,
                sendanswer_status: action
            };

        default:
            return { ...state }
    }

}

export function sendTokenResetPasswordRequest(state=[], action){
    switch (action.type) {
        case SEND_CUSTOMERTOKEN_PENDING:
            return {
                is_processing: true,
                fetch_status: SEND_CUSTOMERTOKEN_PENDING,
                sendtoken_data: action
            };
        case SEND_CUSTOMERTOKEN_SUCCESS:
            return {
                is_processing: false,
                fetch_status: SEND_CUSTOMERTOKEN_SUCCESS,
                sendtoken_data: action
            };
        case SEND_CUSTOMERTOKEN_FAILURE:
            return {
                is_processing: false,
                fetch_status: SEND_CUSTOMERTOKEN_FAILURE,
                sendtoken_data: action
            };

        default:
            return { ...state }
    }

}

export function sendNewPasswordDetailsRequest(state=[], action){
    switch (action.type) {
        case SEND_NEWPASSWORDINFO_PENDING:
            return {
                is_processing: true,
                fetch_status: SEND_NEWPASSWORDINFO_PENDING,
                sendnewpassword_data: action
            };
        case SEND_NEWPASSWORDINFO_SUCCESS:
            return {
                is_processing: false,
                fetch_status: SEND_NEWPASSWORDINFO_SUCCESS,
                sendnewpassword_data: action
            };
        case SEND_NEWPASSWORDINFO_FAILURE:
            return {
                is_processing: false,
                fetch_status: SEND_NEWPASSWORDINFO_FAILURE,
                sendnewpassword_data: action
            };

        default:
            return { ...state }
    }

}

export function getQuestionForPinResetRequest(state=[], action){
    switch (action.type) {
        case GET_QUESTION_FORPINRESET_PENDING:
            return {
                is_processing: true,
                fetch_status: GET_QUESTION_FORPINRESET_PENDING,
                getquestion_data: action
            };
        case GET_QUESTION_FORPINRESET_SUCCESS:
            return {
                is_processing: false,
                fetch_status: GET_QUESTION_FORPINRESET_SUCCESS,
                getquestion_data: action
            };
        case GET_QUESTION_FORPINRESET_FAILURE:
            return {
                is_processing: false,
                fetch_status: GET_QUESTION_FORPINRESET_FAILURE,
                getquestion_data: action
            };

        default:
            return { ...state }
    }

}

export function sendAnswerForPinResetRequest(state=[], action){
    switch (action.type) {
        case SEND_ANSWER_FORPINRESET_PENDING:
            return {
                is_processing: true,
                fetch_status: SEND_ANSWER_FORPINRESET_PENDING,
                otpinfo_data: action
            };
        case SEND_ANSWER_FORPINRESET_SUCCESS:
            return {
                is_processing: false,
                fetch_status: SEND_ANSWER_FORPINRESET_SUCCESS,
                otpinfo_data: action
            };
        case SEND_ANSWER_FORPINRESET_FAILURE:
            return {
                is_processing: false,
                fetch_status: SEND_ANSWER_FORPINRESET_FAILURE,
                otpinfo_data: action
            };

        default:
            return { ...state }
    }

}

export function sendOtpOrTokenForPinResetRequest(state=[], action){
    switch (action.type) {
        case SEND_OTP_OR_TOKEN_FORPINRESET_PENDING:
            return {
                is_processing: true,
                fetch_status: SEND_OTP_OR_TOKEN_FORPINRESET_PENDING,
                sentotpinfo_data: action
            };
        case SEND_OTP_OR_TOKEN_FORPINRESET_SUCCESS:
            return {
                is_processing: false,
                fetch_status: SEND_OTP_OR_TOKEN_FORPINRESET_SUCCESS,
                sentotpinfo_data: action
            };
        case SEND_OTP_OR_TOKEN_FORPINRESET_FAILURE:
            return {
                is_processing: false,
                fetch_status: SEND_OTP_OR_TOKEN_FORPINRESET_FAILURE,
                sentotpinfo_data: action
            };

        default:
            return { ...state }
    }

}

export function sendNewPinForPinResetRequest(state=[], action){
    switch (action.type) {
        case SEND_NEWPIN_FORPINRESET_PENDING:
            return {
                is_processing: true,
                fetch_status: SEND_NEWPIN_FORPINRESET_PENDING,
                sendnewpin_data: action
            };
        case SEND_NEWPIN_FORPINRESET_SUCCESS:
            return {
                is_processing: false,
                fetch_status: SEND_NEWPIN_FORPINRESET_SUCCESS,
                sendnewpin_data: action
            };
        case SEND_NEWPIN_FORPINRESET_FAILURE:
            return {
                is_processing: false,
                fetch_status: SEND_NEWPIN_FORPINRESET_FAILURE,
                sendnewpin_data: action
            };

        default:
            return { ...state }
    }

}

export function getNDPRStatusReducer(state=[], action){
    switch (action.type) {
        case GET_NDPRSTATUS_PENDING:
            return {
                is_processing: true,
                fetch_status: GET_NDPRSTATUS_PENDING,
                ndpr_status: action
            };
        case GET_NDPRSTATUS_SUCCESS:
            return {
                is_processing: false,
                fetch_status: GET_NDPRSTATUS_SUCCESS,
                ndpr_status: action
            };
        case GET_NDPRSTATUS_FAILURE:
            return {
                is_processing: false,
                fetch_status: GET_NDPRSTATUS_FAILURE,
                ndpr_status: action
            };

        default:
            return { ...state }
    }

}

export function acceptNDRpReducer(state=[], action){
    switch (action.type) {
        case ACCEPT_NDRP_PENDING:
            return {
                is_processing: true,
                fetch_status: ACCEPT_NDRP_PENDING,
                ndpr_status: action
            };
        case ACCEPT_NDRP_SUCCESS:
            return {
                is_processing: false,
                fetch_status: ACCEPT_NDRP_SUCCESS,
                ndpr_status: action
            };
        case ACCEPT_NDRP_FAILURE:
            return {
                is_processing: false,
                fetch_status: ACCEPT_NDRP_FAILURE,
                ndpr_status: action
            };

        default:
            return { ...state }
    }

}

export function getCMDMPriorityReducer(state=[], action){
    switch (action.type) {
        case GET_CMDMPRIORITY_PENDING:
            return {
                is_processing: true,
                fetch_status: GET_CMDMPRIORITY_PENDING,
                cmdm_priority: action
            };
        case GET_CMDMPRIORITY_SUCCESS:
            return {
                is_processing: false,
                fetch_status: GET_CMDMPRIORITY_SUCCESS,
                cmdm_priority: action
            };
        case GET_CMDMPRIORITY_FAILURE:
            return {
                is_processing: false,
                fetch_status: GET_CMDMPRIORITY_FAILURE,
                cmdm_priority: action
            };

        default:
            return { ...state }
    }

}

export function updateCMDMPriorityReducer(state=[], action){
    switch (action.type) {
        case UPDATE_CMDMPRIORITY_PENDING:
            return {
                is_processing: true,
                fetch_status: UPDATE_CMDMPRIORITY_PENDING,
                cmdm_priority: action
            };
        case UPDATE_CMDMPRIORITY_SUCCESS:
            return {
                is_processing: false,
                fetch_status: UPDATE_CMDMPRIORITY_SUCCESS,
                cmdm_priority: action
            };
        case UPDATE_CMDMPRIORITY_FAILURE:
            return {
                is_processing: false,
                fetch_status: UPDATE_CMDMPRIORITY_FAILURE,
                cmdm_priority: action
            };

        default:
            return { ...state }
    }

}

export function offlineLoanGetCustomerDataReducer(state=[], action){
    switch (action.type) {
        case OFFLINELOAN_GET_DATAOF_CUSTOMER_PENDING:
            return {
                is_processing: true,
                processing_status: OFFLINELOAN_GET_DATAOF_CUSTOMER_PENDING,
                rating_data: action
            };
        case OFFLINELOAN_GET_DATAOF_CUSTOMER_SUCCESS:
            return {
                is_processing: false,
                processing_status: OFFLINELOAN_GET_DATAOF_CUSTOMER_SUCCESS,
                rating_data: action
            };
        case OFFLINELOAN_GET_DATAOF_CUSTOMER_FAILURE:
            return {
                is_processing: false,
                processing_status: OFFLINELOAN_GET_DATAOF_CUSTOMER_FAILURE,
                rating_data: action
            };

        default:
            return { ...state }
    }

}

export function offlineLoanSendCustomerDataReducer(state=[], action){
    switch (action.type) {
        case OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_PENDING:
            return {
                is_processing: true,
                processing_status: OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_PENDING,
                rating_data: action
            };
        case OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_SUCCESS:
            return {
                is_processing: false,
                processing_status: OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_SUCCESS,
                rating_data: action
            };
        case OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_FAILURE:
            return {
                is_processing: false,
                processing_status: OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_FAILURE,
                rating_data: action
            };

        default:
            return { ...state }
    }

}

export function sendCustomerRatingReducer(state=[], action){
    switch (action.type) {
        case SEND_CUSTOMERRATING_PENDING:
            return {
                is_processing: true,
                postrating_status: SEND_CUSTOMERRATING_PENDING,
                rating_data: action
            };
        case SEND_CUSTOMERRATING_SUCCESS:
            return {
                is_processing: false,
                postrating_status: SEND_CUSTOMERRATING_SUCCESS,
                rating_data: action
            };
        case SEND_CUSTOMERRATING_FAILURE:
            return {
                is_processing: false,
                postrating_status: SEND_CUSTOMERRATING_FAILURE,
                rating_data: action
            };

        default:
            return { ...state }
    }

}

export function sendCustomerWillReferAlatReducer(state=[], action){
    switch (action.type) {
        case SEND_WILLCUSTOMER_REFERALAT_PENDING:
            return {
                is_processing: true,
                request_status: SEND_WILLCUSTOMER_REFERALAT_PENDING,
                request_data: action
            };
        case SEND_WILLCUSTOMER_REFERALAT_SUCCESS:
            return {
                is_processing: false,
                request_status: SEND_WILLCUSTOMER_REFERALAT_SUCCESS,
                request_data: action
            };
        case SEND_WILLCUSTOMER_REFERALAT_FAILURE:
            return {
                is_processing: false,
                request_status: SEND_WILLCUSTOMER_REFERALAT_FAILURE,
                request_data: action
            };

        default:
            return { ...state }
    }

}