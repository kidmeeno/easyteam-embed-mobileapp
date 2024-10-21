import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClockScreen from "../Screens/ClockScreen";
import TimesheetScreen from "../Screens/TimesheetEmployeeScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import EmployeesAdminScreen from "../Screens/EmployeesAdminScreen";
import TimesheetAdminScreen from "../Screens/TimesheetAdminScreen";
import ShiftFormScreen from "../Screens/ShiftFormScreen";
import { useAppState } from "../context/AppStateContext";
import Layout from "../components/Layout";

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

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

function TabNavigator() {
  const { state } = useAppState();
  const userRole = state?.user?.role.name;

  return (
    <Tab.Navigator>
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
      <RootStack.Navigator>
        <RootStack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="AdminStack"
          component={AdminStackNavigator}
        />
      </RootStack.Navigator>
    </Layout>
  );
}
