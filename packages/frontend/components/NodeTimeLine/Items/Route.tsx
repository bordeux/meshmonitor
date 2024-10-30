import * as React from "react";
import "leaflet/dist/leaflet.css";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import { SubItemProps } from "../Item.tsx";
import NodeLink from "../../NodeLink";
import { yellow } from "@mui/material/colors";
import TimelineSeparator from "./helpers/TimelineSeparator.tsx";
import { getNode } from "../helpers/getNode.ts";
import { RecordId } from "surrealdb";
import type { Node } from "../../../../shared/Schemas/NodeSchema.ts";
import DirectionsIcon from "@mui/icons-material/Directions";
import TimeAgo from "../../TimeAgo";
import { Trans } from "react-i18next";

const Route: React.FC<SubItemProps> = ({ log, position }) => {
  const routes = (log?.data?.route || []) as number[];
  const viaRoutes = routes
    .map((nodeId) => {
      const node = new RecordId("node", nodeId.toString(16));
      return (
        <NodeLink
          key={node.toString()}
          node={
            {
              id: node,
            } as Node
          }
        />
      );
    })
    .reduce((prev, curr) => [prev, " → ", curr] as any, []);

  return (
    <TimelineItem position={position}>
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        variant="body2"
        color="text.secondary"
      >
        <TimeAgo date={log.time} />
      </TimelineOppositeContent>
      <TimelineSeparator color={yellow["A700"]} log={log}>
        <DirectionsIcon />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span">
          {position === "left" ? (
            <Trans
              i18nKey={"timeline:x_sent_route_to_x_via_x"}
              components={{
                actor1: <NodeLink node={getNode(log, "from")} key={"from"} />,
                actor2: <NodeLink node={getNode(log, "to")} key={"to"} />,
                via: viaRoutes.length ? (
                  <span>{viaRoutes}</span>
                ) : (
                  <Trans i18nKey={"timeline:none"} />
                ),
              }}
            />
          ) : (
            <Trans
              i18nKey={"timeline:x_received_route_to_x_via_x"}
              components={{
                actor1: <NodeLink node={getNode(log, "from")} key={"from"} />,
                actor2: <NodeLink node={getNode(log, "to")} key={"to"} />,
                via: viaRoutes.length ? (
                  <span>{viaRoutes}</span>
                ) : (
                  <Trans i18nKey={"timeline:none"} />
                ),
              }}
            />
          )}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
export default Route;
