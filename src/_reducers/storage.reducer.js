import {storageConstants} from "../_constants/storage.constants";

const storage_reducer = (state = {}, action) => {
    // const { type, ...rest } = action;
    // const data = { ...rest };
    // console.log({ action }, data);
    switch (action.type) {
        case storageConstants.SAVE_STORAGE:
            return { storage: storageConstants.SAVE_STORAGE, data };
        case storageConstants.READ_SUCCESS:
            return { storage: storageConstants.READ_SUCCESS, data };
        case storageConstants.READ_FAILURE:
            return { storage: storageConstants.READ_FAILURE, data: null };
        default:
            return state;
    }
};

export default storage_reducer;
