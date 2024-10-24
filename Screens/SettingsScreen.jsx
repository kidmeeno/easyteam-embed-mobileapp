import React from "react";
import { Settings } from "@easyteam/ui";
import { BASE_URL } from "../config/api";
import { useAppState } from "../context/AppStateContext";
import axios from "axios";

const SettingsScreen = () => {

  const updateGlobalTrackingSetting = async (payload) => {
    try {
      await axios.put(
        BASE_URL + "/settings",
        { isGlobalTrackingEnabled: payload },
      );
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
