import BatteryGauge from "react-battery-gauge";
import * as React from "react";
import { Tooltip } from "@mui/material";
import { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { useTranslation } from "react-i18next";

const NodeBattery: React.FC<{ node: Node }> = ({ node }) => {
  const metrics = node.device_metrics;
  const { t } = useTranslation("nodes");
  if (!metrics || !metrics.battery_level) {
    return null;
  }
  const level = Math.min(metrics.battery_level, 100);
  const isConnected = metrics.battery_level > 100;

  return (
    <Tooltip
      title={t("battery_level_description", {
        level,
        voltage: metrics.voltage?.toPrecision(2),
      })}
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
