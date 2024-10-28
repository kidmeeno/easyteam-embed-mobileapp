// navigators/AdminNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimesheetAdminScreen from '../../Screens/TimesheetAdminScreen';
import ShiftFormScreen from '../../Screens/ShiftFormScreen';

const AdminStack = createNativeStackNavigator();

function AdminNavigator() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="TimesheetAdminScreen"
        component={TimesheetAdminScreen}
        options={{ headerShown: false }}
      />
      <AdminStack.Screen
        name="ShiftFormScreen"
        component={ShiftFormScreen}
        options={{ headerShown: false }}
      />
    </AdminStack.Navigator>
  );
}

export default AdminNavigator;
