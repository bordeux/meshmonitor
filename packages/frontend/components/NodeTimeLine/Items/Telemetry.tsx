import * as React from "react";
import "leaflet/dist/leaflet.css";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import PositionIcon from "@mui/icons-material/Room";
import Typography from "@mui/material/Typography";
import { SubItemProps } from "../Item.tsx";
import NodeLink from "../../NodeLink";
import { lightBlue } from "@mui/material/colors";
import { Box, Button } from "@mui/material";
import TimelineSeparator from "./helpers/TimelineSeparator.tsx";
import { getNode } from "../helpers/getNode.ts";
import ShowJson from "../../ShowJson";
import { useState } from "react";
import TimeAgo from "../../TimeAgo";
import { Trans, useTranslation } from "react-i18next";
import { camelToSnakeCase } from "../../../../shared/helpers/camelToSnakeCase.ts";

const Telemetry: React.FC<SubItemProps> = ({ log, position }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("nodes");

  const telemetryType = camelToSnakeCase(log.data.variant.case);

  return (
    <TimelineItem position={position}>
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        variant="body2"
        color="text.secondary"
      >
        <TimeAgo date={log.time} />
      </TimelineOppositeContent>
      <TimelineSeparator color={lightBlue[500]} log={log}>
        <PositionIcon />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span">
          {position === "left" ? (
            <Trans
              i18nKey={"timeline:x_sent_x_to_x"}
              components={{
                actor1: <NodeLink node={getNode(log, "from")} key={"from"} />,
                actor2: <NodeLink node={getNode(log, "to")} key={"to"} />,
                type: (
                  <span key={"type"}>
                    {t(String(telemetryType) as any).toLowerCase()}
                  </span>
                ),
              }}
            />
          ) : (
            <Trans
              i18nKey={"timeline:x_received_x_to_x"}
              components={{
                actor1: <NodeLink node={getNode(log, "to")} key={"to"} />,
                actor2: <NodeLink node={getNode(log, "from")} key={"from"} />,
                type: (
                  <span key={"type"}>
                    {t(String(telemetryType) as any).toLowerCase()}
                  </span>
                ),
              }}
            />
          )}
        </Typography>

        <Box pt={2}>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            <Trans i18nKey={"timeline:show_telemetry_data"} key={"data"} />
          </Button>
        </Box>
        {open && (
          <ShowJson
            data={log.data.variant.value}
            onClose={() => setOpen(false)}
            title="Event"
            name={String(telemetryType)}
          />
        )}
      </TimelineContent>
    </TimelineItem>
  );
};
export default Telemetry;
