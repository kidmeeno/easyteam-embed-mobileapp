import Layout from "@/components/Layout";
import React from "react";
import { Settings } from "@easyteam/ui";


const SettingsScreen = () => {
  return (
    <Layout>
      <Settings
        onSave={({ employees, isGlobalTrackingEnabled }) => {
          console.log(employees, isGlobalTrackingEnabled);
        }}
        onEvent={(event) => console.log(event)}
      />
    </Layout>
  );
};


export default SettingsScreen;
