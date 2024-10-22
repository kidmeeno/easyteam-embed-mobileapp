import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
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
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6347",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarStyle: {
          backgroundColor: "#2C2C2E",
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
          tabBarLabel: "Clock",
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
          tabBarLabel: "Timesheet",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="file" color={color} size={size} />
          ),
        }}
      />

      {userRole === "admin" && (
        <>
          <Tab.Screen
            name="EmployeesAdminScreen"
            component={EmployeesAdminScreen}
            options={{
              tabBarLabel: "Employees",
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
              tabBarLabel: "Settings",
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

export function AppNavigator() {
  return (
    <Layout>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2C2C2E",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <RootStack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <RootStack.Screen name="Time Sheet" component={AdminStackNavigator} />
      </RootStack.Navigator>
    </Layout>
  );
}
