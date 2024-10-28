// navigators/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import ClockScreen from '../../Screens/ClockScreen';
import TimesheetScreen from '../../Screens/TimesheetEmployeeScreen';
import SettingsScreen from '../../Screens/SettingsScreen';
import EmployeesAdminScreen from '../../Screens/EmployeesAdminScreen';
import useAppState from '../../state/hooks/useAppState';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { state } = useAppState();
  const userRole = state?.user?.role.name;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {
          backgroundColor: '#2C2C2E',
          borderTopWidth: 0,
          paddingBottom: 5,
          height: 60,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="ClockScreen"
        component={ClockScreen}
        options={{
          tabBarLabel: 'Clock',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="clock-o" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Timesheet"
        component={TimesheetScreen}
        options={{
          tabBarLabel: 'Timesheet',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="file" color={color} size={size} />
          ),
        }}
      />
      {userRole === 'admin' && (
        <>
          <Tab.Screen
            name="EmployeesAdminScreen"
            component={EmployeesAdminScreen}
            options={{
              tabBarLabel: 'Employees',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="users" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="cogs" color={color} size={size} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

export default TabNavigator;
