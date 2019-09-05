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


export function capturePersonalInformation (state=[], action){
    switch(action.type){
        case profile.POST_PROFILE_INFORMATION_PENDING: 
           return {
               message: profile.POST_PROFILE_INFORMATION_PENDING,
               data: action
           }
        case profile.POST_PROFILE_INFORMATION_SUCCESS:
           return {
               message: profile.POST_PROFILE_INFORMATION_SUCCESS,
               data: action
           }
        case profile.POST_PROFILE_INFORMATION_FAILURE:
           return {
               message: profile.POST_PROFILE_INFORMATION_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function addNextOfKin (state=[], action){
    switch(action.type){
        case profile.POST_NEXT_OF_KIN_PENDING: 
           return {
               message: profile.POST_NEXT_OF_KIN_PENDING,
               data: action
           }
        case profile.POST_NEXT_OF_KIN_SUCCESS:
           return {
               message: profile.POST_NEXT_OF_KIN_SUCCESS,
               data: action
           }
        case profile.POST_NEXT_OF_KIN_FAILURE:
           return {
               message: profile.POST_NEXT_OF_KIN_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function addContactDetails (state=[], action){
    switch(action.type){
        case profile.POST_CONTACT_DETAILS_PENDING: 
           return {
               message: profile.POST_CONTACT_DETAILS_PENDING,
               data: action
           }
        case profile.POST_CONTACT_DETAILS_SUCCESS:
           return {
               message: profile.POST_CONTACT_DETAILS_SUCCESS,
               data: action
           }
        case profile.POST_CONTACT_DETAILS_FAILURE:
           return {
               message: profile.POST_CONTACT_DETAILS_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function occupationAndSector (state=[], action){
    switch(action.type){
        case profile.OCCU_AND_SECTOR_PENDING: 
           return {
               message: profile.OCCU_AND_SECTOR_PENDING,
               data: action
           }
        case profile.OCCU_AND_SECTOR_SUCCESS:
           return {
               message: profile.OCCU_AND_SECTOR_SUCCESS,
               data: action
           }
        case profile.OCCU_AND_SECTOR_FAILURE:
           return {
               message: profile.OCCU_AND_SECTOR_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function addDocuments (state=[], action){
    switch(action.type){
        case profile.DOCUMENTS_PENDING: 
           return {
               message: profile.DOCUMENTS_PENDING,
               data: action
           }
        case profile.DOCUMENTS_SUCCESS:
           return {
               message: profile.DOCUMENTS_SUCCESS,
               data: action
           }
        case profile.DOCUMENTS_FAILURE:
           return {
               message: profile.DOCUMENTS_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function nextOfKinsRelationship (state=[], action){
    switch(action.type){
        case profile.GET_NEXT_OF_KIN_RELATIONSHIP_PENDING: 
           return {
               message: profile.GET_NEXT_OF_KIN_RELATIONSHIP_PENDING,
               data: action
           }
        case profile.GET_NEXT_OF_KIN_RELATIONSHIP_SUCCESS:
           return {
               message: profile.GET_NEXT_OF_KIN_RELATIONSHIP_SUCCESS,
               data: action
           }
        case profile.GET_NEXT_OF_KIN_RELATIONSHIP_FAILURE:
           return {
               message: profile.GET_NEXT_OF_KIN_RELATIONSHIP_FAILURE,
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













