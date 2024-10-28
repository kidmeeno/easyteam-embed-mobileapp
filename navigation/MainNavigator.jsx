import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigator from "./app";
import AuthNavigator from "./auth";
import useAppState from "../state/hooks/useAppState";

const MainNavigator = () => {
  const { state } = useAppState();
  const authenticatedUser = state.user;
  
  return (
    <NavigationContainer>
      {authenticatedUser ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
