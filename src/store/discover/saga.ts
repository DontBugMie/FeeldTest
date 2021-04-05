import { call, put, takeLatest, select } from 'redux-saga/effects';
import { callApi } from '../../middleware/api';
import { DiscoverActionTypes, DiscoverAction } from './types';

function* fetchProfiles(action: DiscoverAction) {
  console.log('saga fetch profiles')
  if (action.type !== DiscoverActionTypes.FETCH_PROFILES_REQUEST) {
    return;
  }

  try {
    const { sessionToken } = yield select(state => state.auth);
   
    const response = yield call(callApi, {
      endpoint: 'users',
      method: 'GET',
      sessionToken: sessionToken,
    });

    yield put({ 
      type: DiscoverActionTypes.FETCH_PROFILES_SUCCESS, 
      response: response 
    });

  } catch (error) {

    yield put({
      type: DiscoverActionTypes.FETCH_PROFILES_FAILURE,
      error: error,
    });
  }
}

export const getProfiles = (state) => state.discover.profiles;

function* rateProfile(action: DiscoverAction){
  console.log('does this work');
  let profiles = yield select(getProfiles);
  console.log("state:", profiles.length)
  if (profiles.length === 0) {
    yield put({
      type: DiscoverActionTypes.FETCH_PROFILES_REQUEST
    });
  }
}

function* discoverSaga() {
  yield takeLatest(DiscoverActionTypes.FETCH_PROFILES_REQUEST, fetchProfiles);
  yield takeLatest(DiscoverActionTypes.RATE_PROFILE, rateProfile);
}

export default discoverSaga;
