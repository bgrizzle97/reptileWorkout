/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppProvider from './src/AppProvider';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <AppProvider>
    <AppNavigator />
  </AppProvider>
);

export default App;
