import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { TamaguiProvider } from 'tamagui';
import { store } from './store';
import config from './tamagui.config';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => (
  <Provider store={store}>
    <TamaguiProvider config={config}>{children}</TamaguiProvider>
  </Provider>
);

export default AppProvider; 