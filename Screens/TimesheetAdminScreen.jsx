import React, { useLayoutEffect, useRef, useState } from "react";
import { Timesheet, AddButton } from "@easyteam/ui";

const TimesheetAdminScreen = ({ navigation, route }) => {
  const ref = useRef(null);
  // Ensure employeeId is either a string or we handle the case where it's undefined
  const employeeId = route.params?.employeeId || ""; // Provide a fallback value

  useLayoutEffect(() => {
    if (ref.current?.adminWritePermissions) {
      // Add a button to the header to add a new shift
      navigation.setOptions({
        headerRight: () => (
          <AddButton
            onPress={() => {
              const selectedEmployeeId = ref.current?.selectedEmployeeId;
              if (selectedEmployeeId) {
                navigation.navigate("Time Sheet", {
                  screen: "ShiftFormScreen",
                  params: { employeeId: selectedEmployeeId }, 
                });
              }
            }}
          />
        ),
      });

      // Reload the data when the screen is focused
      const unsubscribe = navigation.addListener("focus", () => {
        ref.current?.reloadData();
      });

      return unsubscribe;
    }
  }, [navigation]);

  // If employeeId is critical and can't be empty, handle the case when it's missing
  if (!employeeId) {
    // Optionally, show an error message or navigate back if employeeId is missing
    console.warn("employeeId is missing");
    navigation.goBack();
    return null; 
  }

  return (
    <Timesheet
      ref={ref}
      employeeId={employeeId}
      onEditPress={(date, selectedEmployeeId) => {
        navigation.navigate("Time Sheet", {
          screen: "ShiftFormScreen",
          params: {
            date,
            employeeId: selectedEmployeeId,
          },
        });
      }}
    />
  );
};

export default TimesheetAdminScreen;
