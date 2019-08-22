// Group Savings Reducer
import { GROUPSAVINGSCONSTANT } from "../../constants/savings/group";

export function groupSavingsTargetGoal(state=[], action){
    switch(action.type){
        
        case GROUPSAVINGSCONSTANT.CREATEGROUPSAINGSPENDING: 
           return {
               message: GROUPSAVINGSCONSTANT.CREATEGROUPSAINGSPENDING,
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
