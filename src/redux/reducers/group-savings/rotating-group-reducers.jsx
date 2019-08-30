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


