import './global.css';
import RootNavigator from './navigation/common/RootNavigator';
import { AuthProvider } from './context/AuthContext';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
