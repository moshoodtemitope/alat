import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {requester} from "../shared/reducers";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  requester
});

export default rootReducer;