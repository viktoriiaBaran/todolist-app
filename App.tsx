/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { navigationRef } from '@navigation/RootNavigation';
import RootNavigator from '@navigation/RootNavigator/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

const App = () => {
  const isReadyRef = useRef(false);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer
          onReady={() => {
            isReadyRef.current = true;
          }}
          ref={navigationRef}
        >
          <RootNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
