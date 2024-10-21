import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Timesheet, TimesheetRef, AddButton } from "@easyteam/ui";
import { Button } from "react-native";
import { useAppState } from "../context/AppStateContext";

const TimesheetAdminScreen = ({ navigation, route }) => {
  const { state } = useAppState();
  const ref = useRef(null);

  // Ensure employeeId is either a string or we handle the case where it's undefined
  const employeeId = route.params?.employeeId || ""; // Provide a fallback value

  const [startDate, setStartDate] = useState(route.params?.startDate);
  const [endDate, setEndDate] = useState(route.params?.endDate);

  useLayoutEffect(() => {
    if (ref.current?.adminWritePermissions) {
      // Add a button to the header to add a new shift
      navigation.setOptions({
        headerRight: () => (
          <AddButton
            onPress={() => {
              const selectedEmployeeId = ref.current?.selectedEmployeeId;
              if (selectedEmployeeId) {
                navigation.navigate("AdminStack", {
                  screen: "ShiftFormScreen",
                  params: { employeeId: selectedEmployeeId }, // Pass the payload as params
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
    return null; // Avoid rendering if employeeId is missing
  }

  return (
    <Timesheet
      ref={ref}
      onDateRangeChange={(newStartDate, newEndDate) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
      }}
      employeeId={employeeId} // Safe to pass employeeId here
      onEditPress={(date, selectedEmployeeId) => {
        navigation.navigate("AdminStack", {
          screen: "ShiftFormScreen",
          params: {
            date,
            employeeId: selectedEmployeeId,
          },
        });
      }}
      onEvent={(event) => console.log(event)}
    />
  );
};

export default TimesheetAdminScreen;
