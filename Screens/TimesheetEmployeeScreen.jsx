import React, { useRef, useState } from "react";
import { Timesheet } from "@easyteam/ui";

const TimesheetScreen = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const ref = useRef(null);
  return (
    <Timesheet
      ref={ref}
      onDateRangeChange={(newStartDate, newEndDate) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
      }}
      startDate={startDate}
      endDate={endDate}
      onEvent={(event) => console.log(event)}
    />
  );
};

export default TimesheetScreen;
