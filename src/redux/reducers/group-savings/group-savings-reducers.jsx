// Group Savings Reducer
import { GROUPSAVINGSCONSTANT } from "../../constants/savings/group";

export function groupSavingsTargetGoal(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.CREATEGROUPSAINGS: 
           return {
               message: GROUPSAVINGSCONSTANT.CREATEGROUPSAINGS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CREATEGROUPSAVINGS_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.CREATEGROUPSAINGS_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CREATEGROUPSAINGS_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.CREATEGROUPSAINGS_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function groupDetails(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.GROUPDETAILS: 
           return {
               message: GROUPSAVINGSCONSTANT.GROUPDETAILS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.GROUPDETAILS_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.GROUPDETAILS_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.GROUPDETAILS_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.GROUPDETAILS_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function deleteGroup(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.DELETEGROUP: 
           return {
               message: GROUPSAVINGSCONSTANT.DELETEGROUP,
               data: action
           }
        case GROUPSAVINGSCONSTANT.DELETEGROUP_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.DELETEGROUP_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.DELETEGROUP_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.DELETEGROUP_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function contribute (state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.CONTRIBUTE: 
           return {
               message: GROUPSAVINGSCONSTANT.CONTRIBUTE,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CONTRIBUTE_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.CONTRIBUTE_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CONTRIBUTE_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.CONTRIBUTE_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function editGroup (state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.EDITGROUP: 
           return {
               message: GROUPSAVINGSCONSTANT.EDITGROUP,
               data: action
           }
        case GROUPSAVINGSCONSTANT.EDITGROUP_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.EDITGROUP_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.EDITGROUP_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.EDITGROUP_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function pauseGroup (state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.PAUSEGROUP: 
           return {
               message: GROUPSAVINGSCONSTANT.PAUSEGROUP,
               data: action
           }
        case GROUPSAVINGSCONSTANT.PAUSEGROUP_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.PAUSEGROUP_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.PAUSEGROUP_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.PAUSEGROUP_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function findGroup (state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.FIND_GROUP: 
           return {
               message: GROUPSAVINGSCONSTANT.FIND_GROUP,
               data: action
           }
        case GROUPSAVINGSCONSTANT.FIND_GROUP_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.FIND_GROUP_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.FIND_GROUP_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.FIND_GROUP_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function customerGroup (state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.CUSTOMER_GROUP: 
           return {
               message: GROUPSAVINGSCONSTANT.CUSTOMER_GROUP,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CUSTOMER_GROUP_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.CUSTOMER_GROUP_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CUSTOMER_GROUP_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.CUSTOMER_GROUP_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function joinGroup (state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.JOIN_GROUP: 
           return {
               message: GROUPSAVINGSCONSTANT.JOIN_GROUP,
               data: action
           }
        case GROUPSAVINGSCONSTANT.JOIN_GROUP_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.JOIN_GROUP_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.JOIN_GROUP_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.JOIN_GROUP_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}


export function scheduleContribution (state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION: 
           return {
               message: GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION,
               data: action
           }
        case GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}


export function deleteMember (state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.DELETE_MEMBER: 
           return {
               message: GROUPSAVINGSCONSTANT.DELETE_MEMBER,
               data: action
           }
        case GROUPSAVINGSCONSTANT.DELETE_MEMBER_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.DELETE_MEMBER_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.DELETE_MEMBER_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.DELETE_MEMBER_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}


export function cashOut (state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.CASHOUT: 
           return {
               message: GROUPSAVINGSCONSTANT.CASHOUT,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CASHOUT_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.CASHOUT_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CASHOUT_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.CASHOUT_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function continueScheduleGroupPayment (state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.CONTINUE_SCHEDULEGROUP_PAYMENT: 
           return {
               message: GROUPSAVINGSCONSTANT.CONTINUE_SCHEDULEGROUP_PAYMENT,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CONTINUE_SCHEDULEGROUP_PAYMENT_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.CONTINUE_SCHEDULEGROUP_PAYMENT_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CASHOUT_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.CONTINUE_SCHEDULEGROUP_PAYMENT_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}




































