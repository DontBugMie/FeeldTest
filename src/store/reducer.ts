import { combineReducers } from 'redux';

import discover from './discover/reducer';
import auth from './auth/reducer';

const reducer = combineReducers({
  discover: discover,
  auth: auth,
});

export default reducer;
