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
import { geometryPointToDMS } from "../../../helpers/geometryPointToDMS.ts";
import { Box } from "@mui/material";
import TimelineSeparator from "./helpers/TimelineSeparator.tsx";
import { getNode } from "../helpers/getNode.ts";
import TimeAgo from "../../TimeAgo";
import { Trans } from "react-i18next";
import { createGeoPointFromMesh } from "../../../../shared/helpers/createGeoPointFromMesh.ts";
import { GeometryPoint } from "surrealdb";

const Position: React.FC<SubItemProps> = ({ log, position }) => {
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
              i18nKey={"timeline:x_sent_position_to_x"}
              components={{
                actor1: <NodeLink node={getNode(log, "from")} key={"from"} />,
                actor2: <NodeLink node={getNode(log, "to")} key={"to"} />,
              }}
            />
          ) : (
            <>
              <Trans
                i18nKey={"timeline:x_received_position_from_x"}
                components={{
                  actor1: <NodeLink node={getNode(log, "to")} key={"to"} />,
                  actor2: <NodeLink node={getNode(log, "from")} key={"from"} />,
                }}
              />
            </>
          )}
        </Typography>

        <Box>
          {log.data.longitude_i ? (
            geometryPointToDMS(
              createGeoPointFromMesh(
                log.data.latitude_i,
                log.data.longitude_i,
              ) as GeometryPoint,
            )
          ) : (
            <Trans i18nKey={"timeline:no_position"} />
          )}
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};
export default Position;
