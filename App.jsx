import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import configureStore from './src/store/utils/configureStore';
import NavigationStack from './src/navigation/Stack';

// optimize the memory usage for screens: https://reactnavigation.org/docs/en/next/native-stack-navigator.html
enableScreens();

function App() {
  const { store, persistor } = configureStore();

  function storeContainer(children: ReactNode | ReactNode[]) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  }

  return storeContainer(
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaProvider>
        <NavigationStack />
      </SafeAreaProvider>
    </>,
  );
}

export default App;
