import { fork } from 'redux-saga/effects';

import discoverSaga from './discover/saga';

function* saga() {
  yield fork(discoverSaga);
}

export default saga;
