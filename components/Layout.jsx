import React, { } from "react";
import { EasyTeamProvider } from "@easyteam/ui";
import { BASE_PATH } from "../config/api";
import { useAppState } from "@/context/AppStateContext";

const Layout = ({ children }) => {
  const { state } = useAppState();

  return (
    <EasyTeamProvider
      token={state.token}
      employees={state.employees}
      basePath={BASE_PATH}
      isGlobalTimeTrackingEnabled={state.isGlobalTimeTrackingEnabled}
    >
      {children}
    </EasyTeamProvider>
  );
};

export default Layout;
