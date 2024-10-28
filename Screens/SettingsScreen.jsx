import React from "react";
import { Settings } from "@easyteam/ui";
import { BASE_URL } from "../config/api";
import Logger from "../infrastructure/logger/Logger";
import httpClient from "../infrastructure/httpClient/HttpClient";
import useAppState from "../state/hooks/useAppState";

const SettingsScreen = () => {
  const { state } = useAppState();
  const authToken = state.token;

  const updateGlobalTrackingSetting = async (payload) => {
    try {
      await httpClient.put(
        BASE_URL + "/settings",
        {
          isGlobalTrackingEnabled: payload,
        },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );
    } catch (error) {
      Logger.error("Error updating global tracking setting:", error);
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
