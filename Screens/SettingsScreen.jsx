import React from "react";
import { Settings } from "@easyteam/ui";
import { BASE_URL } from "../config/api";
import axios from "axios";
import Logger from "../infrastructure/logger/Logger";
import httpClient from "../infrastructure/httpClient/HttpClient";

const SettingsScreen = () => {

  const updateGlobalTrackingSetting = async (payload) => {
    try {
      await httpClient.put(
        BASE_URL + "/settings",
        { isGlobalTrackingEnabled: payload },
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
