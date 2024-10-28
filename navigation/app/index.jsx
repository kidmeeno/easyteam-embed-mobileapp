// navigators/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from '../../components/Layout';
import TabNavigator from './TabNavigator';
import AdminkNavigator from './AdminNavigator';

const RootStack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Layout>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2C2C2E',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <RootStack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Time Sheet" component={AdminkNavigator} />
      </RootStack.Navigator>
    </Layout>
  );
}

export default AppNavigator;
