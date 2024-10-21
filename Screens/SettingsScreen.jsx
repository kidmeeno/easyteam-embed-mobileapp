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
      const response = await axios.put(
        BASE_URL + "/settings",
        { isGlobalTrackingEnabled: payload },
      );
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
