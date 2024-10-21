import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClockScreen from "../Screens/ClockScreen";
import TimesheetScreen from "../Screens/TimesheetEmployeeScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import EmployeesAdminScreen from "../Screens/EmployeesAdminScreen";
import TimesheetAdminScreen from "../Screens/TimesheetAdminScreen";
import ShiftFormScreen from "../Screens/ShiftFormScreen";
import { useAppState } from "../context/AppStateContext"; // Assume this is where you manage state (including user info)
import Layout from "../components/Layout";

// Create the bottom tab and stack navigators
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

// Admin Stack Navigator for TimesheetAdminScreen and ShiftFormScreen
function AdminStackNavigator() {
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

// Main Tab Navigator (without AdminStack)
function TabNavigator() {
  const { state } = useAppState(); // Assuming state contains user role information
  const userRole = state?.user?.role.name; // Get user role (e.g., 'admin' or 'employee')

  return (
    <Tab.Navigator>
      {/* Tabs accessible to all users */}
      <Tab.Screen
        name="ClockScreen"
        component={ClockScreen}
        options={{ tabBarLabel: "Clock", headerShown: false }}
      />
      <Tab.Screen
        name="Timesheet"
        component={TimesheetScreen}
        options={{ tabBarLabel: "Timesheet", headerShown: false }}
      />

      {/* Admin-specific tab (conditionally rendered based on role) */}
      {userRole === "admin" && (
        <>
          <Tab.Screen
            name="EmployeesAdminScreen"
            component={EmployeesAdminScreen}
            options={{ tabBarLabel: "Employees" }}
          />
          <Tab.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ tabBarLabel: "Settings", headerShown: false }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Layout>
      {/* Root Stack Navigator */}
      <RootStack.Navigator>
        {/* Main Tab Navigator */}
        <RootStack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        {/* Admin Stack Navigator (no tab, but accessible via navigation) */}
        <RootStack.Screen
          name="AdminStack"
          component={AdminStackNavigator}
          // options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </Layout>
  );
}
