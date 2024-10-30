import * as React from "react";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import TimelineSeparatorBase from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import ShowJson from "../../../ShowJson";
import type { Log } from "../../../../../shared/Schemas/LogSchema.ts";

interface TimelineSeparator {
  log: Log;
  color: string;
  children: React.ReactNode;
}
const TimelineSeparator: React.FC<TimelineSeparator> = ({
  log,
  color,
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <TimelineSeparatorBase>
      <TimelineConnector />
      <TimelineDot
        style={{
          backgroundColor: color,
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        {children}
      </TimelineDot>
      <TimelineConnector />
      {open && (
        <ShowJson data={log} onClose={() => setOpen(false)} title="Event" />
      )}
    </TimelineSeparatorBase>
  );
};
export default TimelineSeparator;
