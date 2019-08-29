import { profile } from '../constants/profile/profile-constants';

export function linkBVN(state=[], action){
    switch(action.type){
        
        case profile.LINK_BVN_PENDING: 
           return {
               message: profile.LINK_BVN_PENDING,
               data: action
           }
        case profile.LINK_BVN_SUCCESS:
           return {
               message: profile.LINK_BVN_SUCCESS,
               data: action
           }
        case profile.LINK_BVN_FAILURE:
           return {
               message: profile.LINK_BVN_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function profileMenu (state=[], action){
    switch(action.type){
        case profile.GET_PROFILE_MENU_PENDING: 
           return {
               message: profile.GET_PROFILE_MENU_PENDING,
               data: action
           }
        case profile.GET_PROFILE_MENU_SUCCESS:
           return {
               message: profile.GET_PROFILE_MENU_SUCCESS,
               data: action
           }
        case profile.GET_PROFILE_MENU_FAILURE:
           return {
               message: profile.GET_PROFILE_MENU_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function profileSuccessMessage (state=[], action){
    switch(action.type){
        case 'profile success message': 
           return {
               message: 'profile success message',
               data: action
           }
      
        default: 
           return {... state}
    }
}

