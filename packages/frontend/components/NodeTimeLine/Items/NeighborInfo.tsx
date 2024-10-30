import * as React from "react";
import "leaflet/dist/leaflet.css";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import Typography from "@mui/material/Typography";
import { SubItemProps } from "../Item.tsx";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import NodeLink from "../../NodeLink";
import { deepOrange } from "@mui/material/colors";
import TimelineSeparator from "./helpers/TimelineSeparator.tsx";
import { getNode } from "../helpers/getNode.ts";
import TimeAgo from "../../TimeAgo";
import { Trans } from "react-i18next";

const NeighborInfo: React.FC<SubItemProps> = ({ position, log }) => {
  return (
    <TimelineItem position={position}>
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        <TimeAgo date={log.time} />
      </TimelineOppositeContent>
      <TimelineSeparator color={deepOrange[500]} log={log}>
        <ConnectWithoutContactIcon />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span">
          <Trans i18nKey={"timeline:neighbor_info"} />
        </Typography>
        <Typography>
          <Trans
            i18nKey={"timeline:x_connected_to_x"}
            components={{
              actor1: <NodeLink node={getNode(log, "from")} key={"from"} />,
              actor2: <NodeLink node={getNode(log, "to")} key={"to"} />,
            }}
          />
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
export default NeighborInfo;
