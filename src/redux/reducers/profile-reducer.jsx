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
export function checkProfileUploads (state=[], action){
    switch(action.type){
        case profile.CHECK_PROFILE_UPLOADS_PENDING: 
           return {
               message: profile.CHECK_PROFILE_UPLOADS_PENDING,
               data: action
           }
        case profile.CHECK_PROFILE_UPLOADS_SUCCESS:
           return {
               message: profile.CHECK_PROFILE_UPLOADS_SUCCESS,
               data: action
           }
        case profile.CHECK_PROFILE_UPLOADS_FAILURE:
           return {
               message: profile.CHECK_PROFILE_UPLOADS_FAILURE,
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
               is_processing: true,
               data: action           
           }
        case profile.DOCUMENTS_SUCCESS:
           return {
               message: profile.DOCUMENTS_SUCCESS,
               is_processing: false,
               data: action
           }
        case profile.DOCUMENTS_FAILURE:
           return {
               message: profile.DOCUMENTS_FAILURE,
               is_processing: false,
               data: action
           }
        case profile.DOCUMENTS_CLEAR:
            return {
                message: profile.DOCUMENTS_CLEAR,
                is_processing: false,
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

export function getContactDetail (state=[], action){
    switch(action.type){
        case profile.GET_CONTACT_DETAILS_PENDING: 
           return {
               message: profile.GET_CONTACT_DETAILS_PENDING,
               data: action
           }
        case profile.GET_CONTACT_DETAILS_SUCCESS:
           return {
               message: profile.GET_CONTACT_DETAILS_SUCCESS,
               data: action
           }
        case profile.GET_CONTACT_DETAILS_FAILURE:
           return {
               message: profile.GET_CONTACT_DETAILS_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function getStates (state=[], action){
    switch(action.type){
        case profile.GET_STATE_PENDING: 
           return {
               message: profile.GET_STATE_PENDING,
               data: action
           }
        case profile.GET_STATE_SUCCESS:
           return {
               message: profile.GET_STATE_SUCCESS,
               data: action
           }
        case profile.GET_STATE_FAILURE:
           return {
               message: profile.GET_STATE_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}


export function getResidential (state=[], action){
    switch(action.type){
        case profile.GET_RESIDENTIAL_PENDING: 
           return {
               message: profile.GET_RESIDENTIAL_PENDING,
               data: action
           }
        case profile.GET_RESIDENTIAL_SUCCESS:
           return {
               message: profile.GET_RESIDENTIAL_SUCCESS,
               data: action
           }
        case profile.GET_RESIDENIAL_FAILURE:
           return {
               message: profile.GET_RESIDENIAL_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function getPersonalInfo (state=[], action){
    switch(action.type){
        case profile.GET_PERSONAL_INFO_PENDING: 
           return {
               message: profile.GET_PERSONAL_INFO_PENDING,
               data: action
           }
        case profile.GET_PERSONAL_INFO_SUCCESS:
           return {
               message: profile.GET_PERSONAL_INFO_SUCCESS,
               data: action
           }
        case profile.GET_PERSONAL_INFO_FAILURE:
           return {
               message: profile.GET_PERSONAL_INFO_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function addResidentialAddress (state=[], action){
    switch(action.type){
        case profile.POST_RESIDENTIAL_ADDRESS_PENDING: 
           return {
               message: profile.POST_RESIDENTIAL_ADDRESS_PENDING,
               data: action
           }
        case profile.POST_RESIDENTIAL_ADDRESS_SUCCESS:
           return {
               message: profile.POST_RESIDENTIAL_ADDRESS_SUCCESS,
               data: action
           }
        case profile.POST_RESIDENTIAL_ADDRESS_FAILURE:
           return {
               message: profile.POST_RESIDENTIAL_ADDRESS_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function GetResidentialAddress (state=[], action){
    switch(action.type){
        case profile.GET_RESIDENTIAL_ADDRESS_PENDING: 
           return {
               message: profile.GET_RESIDENTIAL_ADDRESS_PENDING,
               data: action
           }
        case profile.GET_RESIDENTIAL_ADDRESS_SUCCESS:
           return {
               message: profile.GET_RESIDENTIAL_ADDRESS_SUCCESS,
               data: action
           }
        case profile.GET_RESIDENTIAL_ADDRESS_FAILURE:
           return {
               message: profile.GET_RESIDENTIAL_ADDRESS_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}

export function ActivateGroup (state=[], action){
    switch(action.type){
        case profile.ACTIVATE_ROTATING_GROUP_PENDING: 
           return {
               message: profile.ACTIVATE_ROTATING_GROUP_PENDING,
               data: action
           }
        case profile.ACTIVATE_ROTATING_GROUP_SUCCESS:
           return {
               message: profile.ACTIVATE_ROTATING_GROUP_SUCCESS,
               data: action
           }
        case profile.ACTIVATE_ROTATING_GROUP_FAILURE:
           return {
               message: profile.ACTIVATE_ROTATING_GROUP_FAILURE,
               data: action
           }
        default: 
           return {... state}
    }
}
export function DocumentUploadCheckReducer(state = [], action) {
    switch (action.type) {
        case profile.DOCUMENT_UPLOAD_CHECK_PENDING:
            return {
                message: profile.DOCUMENT_UPLOAD_CHECK_PENDING,
                data: action
            }
        case profile.DOCUMENT_UPLOAD_CHECK_SUCCESS:
            return {
                message: profile.DOCUMENT_UPLOAD_CHECK_SUCCESS,
                data: action
            }
        case profile.DOCUMENT_UPLOAD_CHECK_FAILURE:
            return {
                message: profile.DOCUMENT_UPLOAD_CHECK_FAILURE,
                data: action
            }
        default:
            return { ...state }
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


