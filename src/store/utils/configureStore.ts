import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

import reducer from '../reducer';
import saga from '../saga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const composables = [applyMiddleware(sagaMiddleware)];
  const store = createStore(persistedReducer, compose(...composables));
  const persistor = persistStore(store);
  sagaMiddleware.run(saga);

  // Uncomment this line and reload the app to clear the local state.
  // Remember to comment out this line afterwards, otherwise the state
  // will be cleared each time the app loads.
  // persistor.purge();

  return {
    store,
    persistor,
  };
};

export default configureStore;
