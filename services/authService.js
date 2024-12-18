import { Alert } from "react-native";
import httpClient from "../infrastructure/httpClient/HttpClient";
import Logger from "../infrastructure/logger/Logger";
import { setAppState } from "../state/actions/appActions";
import { validateEmail } from "../core/utils";

export const handleSignUp = async ({
  email,
  password,
  confirmPassword,
  username,
  role,
  navigation,
  setLoading,
  locationId,
}) => {
  if (!validateEmail(email)) {
    Alert.alert("Invalid Email", "Please enter a valid email address");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert("Error", "Passwords do not match");
    return;
  }

  if (username === "") {
    Alert.alert("Error", "Fix the name field to continue");
    return;
  }

  const payloadToSave = {
    locationId: locationId,
    email: email,
    password: password,
    username: username,
    organizationId: locationId,
    partnerId: "d40e2f92-2523-4833-a9cc-a95cef576876",
    payrollId: "Payroll123",
    employerPayrollId: "EmployerPayroll123",
    accessRole: {
      name: "manager",
      permissions: ["LOCATION_READ", "SHIFT_READ", "SHIFT_WRITE", "SHIFT_ADD"],
    },
    role: {
      name: role,
    },
  };

  try {
    const response = await httpClient.post("/employees/create", payloadToSave);

    setLoading(true);

    if (response.status === 201) {
      Alert.alert(
        "Sign Up Successful",
        `Your account has been created as a ${role}.`,
        [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
      );
    }
  } catch (error) {
    Logger.error("Sign Up Error:", error);
    Alert.alert(
      "Sign Up Failed",
      "There was an error creating your account. Please try again.",
      [{ text: "OK" }]
    );
  } finally {
    setLoading(false);
  }
};

export const fetchLocations = async ({ setLocations, setLoading }) => {
  try {
    const response = await httpClient.get("/locations");

    if (response.status === 200) {
      setLocations(response.data);
    }
  } catch (err) {
    Logger.error("Error fetching locations:", err);
  } finally {
    setLoading(false);
  }
};

export const handleLogin = async ({
  email,
  password,
  setLoading,
  dispatch,
}) => {
  if (!email || !password) {
    Alert.alert("Error", "Please enter both email and password");
    return;
  }
  setLoading(true);
  try {
    const response = await httpClient.post("/employees/employee-login", {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      const { token, employee, employees, isGlobalTrackingEnabled } =
        response.data;
      dispatch(
        setAppState({
          token,
          user:employee,
          employees,
          isGlobalTrackingEnabled,
        })
      );
    } else {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again"
      );
    }
  } catch (error) {
    Logger.info(error);
    Alert.alert("Login Failed", "An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};
