import React from "react";
import { Clock } from "@easyteam/ui";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const ClockScreen = () => {
  const navigation = useNavigation();
  const onClick = (event) => {
    console.log(event);
  };
  return <Clock onEvent={onClick} />;
};

export default ClockScreen;
