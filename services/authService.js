// authService.js

import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL } from "../config/api";

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
  // Email validation
  if (!validateEmail(email)) {
    Alert.alert("Invalid Email", "Please enter a valid email address");
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    Alert.alert("Error", "Passwords do not match");
    return;
  }

  // Check if username is empty
  if (username === "") {
    Alert.alert("Error", "Fix the name field to continue");
    return;
  }

  // Create the payload for the signup request
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
    // Send the POST request to the backend
    const response = await axios.post(
      BASE_URL + "/employees/create",
      payloadToSave
    );

    // Set loading state to true while the request is processed
    setLoading(true);

    // Handle successful sign-up
    if (response.status === 201) {
      Alert.alert(
        "Sign Up Successful",
        `Your account has been created as a ${role}.`,
        [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
      );
    }
  } catch (error) {
    // Handle errors in the sign-up process
    console.error("Sign Up Error:", error);
    Alert.alert(
      "Sign Up Failed",
      "There was an error creating your account. Please try again.",
      [{ text: "OK" }]
    );
  } finally {
    // Set loading state back to false after request completion
    setLoading(false);
  }
};

export // Function to fetch the locations from the backend
const fetchLocations = async ({ setLocations, setLoading }) => {
  try {
    const response = await axios.get(BASE_URL + "/locations"); // Adjust base URL if necessary

    if (response.status === 200) {
      setLocations(response.data); // Store fetched locations in state
    }
  } catch (err) {
    console.error("Error fetching locations:", err);
  } finally {
    setLoading(false); // Set loading to false after request completes
  }
};

// Simple email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
