import { talktoUsConstant } from "../../constants/talk-to-us/talk-to-us.constant";

export function GetBankBranch(state=[], action){
    switch(action.type){
        
        case talktoUsConstant.GET_BANK_BRANCHES_PENDING: 
           return {
               message: talktoUsConstant.GET_BANK_BRANCHES_PENDING,
               data: action
           }
        case talktoUsConstant.GET_BANK_BRANCHES_SUCCESS:
           return {
               message: talktoUsConstant.GET_BANK_BRANCHES_SUCCESS,
               data: action
           }
        case talktoUsConstant.GET_BANK_BRANCHES_FAILURE:
           return {
               message: talktoUsConstant.GET_BANK_BRANCHES_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function TalkToUs(state=[], action){
    switch(action.type){
        
        case talktoUsConstant.TALK_TO_US_PENDING: 
           return {
               message: talktoUsConstant.TALK_TO_US_PENDING,
               data: action
           }
        case talktoUsConstant.TALK_TO_US_SUCCESS:
           return {
               message: talktoUsConstant.TALK_TO_US_SUCCESS,
               data: action
           }
        case talktoUsConstant.TALK_TO_US_FAILURE:
           return {
               message: talktoUsConstant.TALK_TO_US_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function ReportError(state=[], action){
    switch(action.type){
        
        case talktoUsConstant.REPORT_ERROR_PENDING: 
           return {
               message: talktoUsConstant.REPORT_ERROR_PENDING,
               data: action
           }
        case talktoUsConstant.REPORT_ERROR_SUCCESS:
           return {
               message: talktoUsConstant.REPORT_ERROR_SUCCESS,
               data: action
           }
        case talktoUsConstant.REPORT_ERROR_FAILURE:
           return {
               message: talktoUsConstant.REPORT_ERROR_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}