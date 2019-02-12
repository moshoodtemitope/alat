import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {announcementReducer, onboardingPriorityReducer, requester, userGoalsReducer} from "../shared/reducers";
import TransferReducers from "../transfer/transfer-reducers";
import storage_reducer from "./storage.reducer";
// import {bankListRequest} from "../transfer/transfer-reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  accounts: requester,
    userGoals: userGoalsReducer,
    userOnboardingPriority: onboardingPriorityReducer,
    transfer: TransferReducers,
    announcementCard: announcementReducer
    // storage_reducer

});

export default rootReducer;