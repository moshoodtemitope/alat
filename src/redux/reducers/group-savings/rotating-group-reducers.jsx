// Rotating Group Reducer
import { GROUPSAVINGSCONSTANT } from "../../constants/savings/group";

export function createRotatingSavings(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP: 
           return {
               message: GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function rotatingGroupDetails(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS: 
           return {
               message: GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function joinAGroup(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.JOIN_A_GROUP: 
           return {
               message: GROUPSAVINGSCONSTANT.JOIN_A_GROUP,
               data: action
           }
        case GROUPSAVINGSCONSTANT.JOIN_A_GROUP_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.JOIN_A_GROUP_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.JOIN_A_GROUP_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.JOIN_A_GROUP_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function EditSlots(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.EDIT_SLOTS: 
           return {
               message: GROUPSAVINGSCONSTANT.EDIT_SLOTS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.EDIT_SLOTS_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.EDIT_SLOTS_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.EDIT_SLOTS_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.EDIT_SLOTS_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function GetGroupsEsusu(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.GET_GROUPS_ESUSU: 
           return {
               message: GROUPSAVINGSCONSTANT.GET_GROUPS_ESUSU,
               data: action
           }
        case GROUPSAVINGSCONSTANT.GET_GROUPS_ESUSU_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.GET_GROUPS_ESUSU_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.GET_GROUPS_ESUSU_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.GET_GROUPS_ESUSU_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function editGroupEsusu(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.EDIT_GROUP: 
           return {
               message: GROUPSAVINGSCONSTANT.EDIT_GROUP,
               data: action
           }
        case GROUPSAVINGSCONSTANT.EDIT_GROUP_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.EDIT_GROUP_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.EDIT_GROUP_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.EDIT_GROUP_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function deleteGroupEsusu(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.DELETE_GROUP: 
           return {
               message: GROUPSAVINGSCONSTANT.DELETE_GROUP,
               data: action
           }
        case GROUPSAVINGSCONSTANT.DELETE_GROUP_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.DELETE_GROUP_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.DELETE_GROUP_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.DELETE_GROUP_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function joinGroupEsusu(state=[], action){
    switch(action.type){
        case GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU: 
           return {
               message: GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU,
               data: action
           }
        case GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU_SUCCESS:
           return {
               message: GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU_SUCCESS,
               data: action
           }
        case GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU_ERROR:
           return {
               message: GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU_ERROR,
               data: action
           }
        default: 
           return {... state}
    }
}

export function refferalCode (state=[], action){
    switch(action.type){
        case 'refferalCode':
           return {
               message: 'refferalCode',
               data: action.data
           }
       
        default: 
        return {
            message: "refferalCode",
            data: ""
        }
    }
}

