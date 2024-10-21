import React from "react";
import { Settings } from "@easyteam/ui";
import { BASE_URL } from "../config/api";
import { useAppState } from "../context/AppStateContext";
import axios from "axios";

const SettingsScreen = () => {
  const { state } = useAppState();
  const token = state.token;

  const updateGlobalTrackingSetting = async (payload) => {
    try {
      // Make the PUT request with the token for authorization
      const response = await axios.put(
        BASE_URL + "/settings",
        { isGlobalTrackingEnabled: payload },
        {
          headers: {
            Authorization: `auth-token ${token}`, // Pass the token for verification
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );
      // Handle the response
      console.log("Updated Setting:", response.data);
    } catch (error) {
      console.error("Error updating global tracking setting:", error);
    }
  };

  return (
    <Settings
      onSave={({ isGlobalTrackingEnabled }) => {
        updateGlobalTrackingSetting(isGlobalTrackingEnabled);
      }}
    />
  );
};

export default SettingsScreen;
