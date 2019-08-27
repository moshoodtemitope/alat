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
