import * as React from "react";
import "leaflet/dist/leaflet.css";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import { SubItemProps } from "../Item.tsx";
import NodeLink from "../../NodeLink";
import { lightGreen } from "@mui/material/colors";
import TimelineSeparator from "./helpers/TimelineSeparator.tsx";
import { getNode } from "../helpers/getNode.ts";
import TimeAgo from "../../TimeAgo";
import { Trans } from "react-i18next";

const User: React.FC<SubItemProps> = ({ log, position }) => {
  return (
    <TimelineItem position={position}>
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        variant="body2"
        color="text.secondary"
      >
        <TimeAgo date={log.time} />
      </TimelineOppositeContent>
      <TimelineSeparator color={lightGreen[500]} log={log}>
        <InfoIcon />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span">
          {position === "left" ? (
            <Trans
              i18nKey={"timeline:x_sent_node_info_to_x"}
              components={{
                actor1: <NodeLink node={getNode(log, "from")} key={"from"} />,
                actor2: <NodeLink node={getNode(log, "to")} key={"to"} />,
              }}
            />
          ) : (
            <Trans
              i18nKey={"timeline:x_received_node_info_from_x"}
              components={{
                actor1: <NodeLink node={getNode(log, "to")} key={"to"} />,
                actor2: <NodeLink node={getNode(log, "from")} key={"from"} />,
              }}
            />
          )}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
export default User;
