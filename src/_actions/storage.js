import {alertConstants} from "../_constants";
import {storageConstants} from "../_constants/storage.constants";

export const storageActions = {
    saveStorage,
    removeStorage,
};

function saveStorage(user){
    console.log(user);
    console.log("saved storage");
    return { type: storageConstants.SAVE_STORAGE, user: user }
    // return dispatch => {
    //     dispatch(save(user));
    // };
    //
    // function save(user) { return { type: storageConstants.SAVE_STORAGE, user } }
}


function removeStorage(user) {
    return { type: storageConstants.READ_FAILURE, user };
}

// function error(message) {
//     return { type: alertConstants.ERROR, message };
// }
//
// function clear() {
//     return { type: alertConstants.CLEAR };
// }

