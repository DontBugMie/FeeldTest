import { call, put, takeLatest, select } from 'redux-saga/effects';

import { callApi } from '../../middleware/api';
import { DiscoverActionTypes, DiscoverAction } from './types';

function* fetchProfiles(action: DiscoverAction) {
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

    yield put({ type: DiscoverActionTypes.FETCH_PROFILES_SUCCESS, response });
  } catch (error) {
    yield put({
      type: DiscoverActionTypes.FETCH_PROFILES_FAILURE,
      error: error,
    });
  }
}

function* discoverSaga() {
  yield takeLatest(DiscoverActionTypes.FETCH_PROFILES_REQUEST, fetchProfiles);
}

export default discoverSaga;
