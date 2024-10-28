import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ShiftForm } from "@easyteam/ui";
import { Alert, Platform } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";

const ShiftFormScreen = ({ navigation, route }) => {
  const { date } = route.params;
  const ref = useRef(null);

  useLayoutEffect(() => {
    const dateFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const screenTitle = date
      ? new Date(date).toLocaleString("en-US", dateFormatOptions)
      : "Add Shift";

    const headerLeft = Platform.select({
      ios: () => (
        <HeaderBackButton
          tintColor="#ff3479"
          onPress={() => navigation.goBack()}
        />
      ),
      default: undefined,
    });

    navigation.setOptions({
      title: screenTitle,
      headerLeft,
    });
  }, [navigation, date]);

  useEffect(() => {
    const preventGoingBack = (e) => {
      if (!ref.current?.unsavedChanges) {
        return;
      }
      e.preventDefault();

      Alert.alert(
        "Unsaved Changes",
        "Are you sure you want to discard the changes?",
        [
          { text: "Cancel", style: "cancel", onPress: () => {} },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    };

    const unsubscribe = navigation.addListener(
      "beforeRemove",
      preventGoingBack
    );

    return unsubscribe;
  }, [navigation]);

  return (
    <ShiftForm
      ref={ref}
      employeeId={route.params.employeeId}
      shiftDate={route.params.date}
      onSaveSuccess={() => navigation.goBack()}
      onCancelPress={() => navigation.goBack()}
    />
  );
};

export default ShiftFormScreen;
