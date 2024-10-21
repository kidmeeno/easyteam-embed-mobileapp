import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TimesheetScreen from "../Screens/TimesheetEmployeeScreen";
import TimesheetAdminScreen from "../Screens/TimesheetAdminScreen";
import ShiftFormScreen from "../Screens/ShiftFormScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import EmployeesAdminScreen from "../Screens/EmployeesAdminScreen";
import ClockScreen from "../Screens/ClockScreen";

// Create a new stack for authentication
const AppStack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="ClockScreen"
        component={ClockScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen name="EmployeesAdminScreen" component={EmployeesAdminScreen} />
      <AppStack.Screen name="TimesheetScreen" component={TimesheetScreen} />
      <AppStack.Screen name="TimesheetAdminScreen" component={TimesheetAdminScreen} />
      <AppStack.Screen name="ShiftFormScreen" component={ShiftFormScreen} />
      <AppStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </AppStack.Navigator>
  );
}
