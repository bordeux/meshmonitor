import BatteryGauge from "react-battery-gauge";
import * as React from "react";
import { Tooltip } from "@mui/material";
import { Node } from "../../../shared/Schemas/NodeSchema.ts";

const NodeBattery: React.FC<{ node: Node }> = ({ node }) => {
  const metrics = node.device_metrics;
  if (!metrics || !metrics.battery_level) {
    return null;
  }
  const level = Math.min(metrics.battery_level, 100);
  const isConnected = metrics.battery_level > 100;

  return (
    <Tooltip
      title={`Battery level: ${level}%, Voltage: ${metrics.voltage?.toPrecision(2)}V`}
    >
      <BatteryGauge
        value={level}
        size={30}
        charging={isConnected}
        customization={{
          batteryBody: {
            strokeColor: "#FFF",
          },
          batteryCap: {
            strokeColor: "#FFF",
          },
          readingText: {
            lightContrastColor: "#FFF",
            darkContrastColor: "#fff",
          },
        }}
      />
    </Tooltip>
  );
};

export default NodeBattery;
