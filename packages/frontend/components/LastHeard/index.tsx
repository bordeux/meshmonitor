import TimeAgo from "../TimeAgo";
import * as React from "react";
import red from "@mui/material/colors/red";
import orange from "@mui/material/colors/orange";
import green from "@mui/material/colors/green";

const getColor = (hours: number): string | undefined => {
  if (hours > 48) {
    return red[800];
  }

  if (hours > 24) {
    return red[500];
  }

  if (hours > 6) {
    return orange[500];
  }

  if (hours > 3) {
    return orange[200];
  }

  if (hours > 1) {
    return orange[100];
  }

  return green[500];
};

const LastHeard: React.FC<{ date: Date }> = ({ date }) => {
  const diffInMilliseconds = Date.now() - date.getTime();
  // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60);
  const color = getColor(diffInDays);
  return (
    <span
      style={{
        color,
      }}
    >
      <TimeAgo date={date} />
    </span>
  );
};

export default LastHeard;
