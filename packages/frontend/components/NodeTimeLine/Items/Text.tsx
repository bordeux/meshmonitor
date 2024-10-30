import * as React from "react";
import "leaflet/dist/leaflet.css";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import MessageIcon from "@mui/icons-material/Message";
import Typography from "@mui/material/Typography";
import { SubItemProps } from "../Item.tsx";
import BlockQuote from "../../BlockQuote";
import { Box } from "@mui/material";
import NodeLink from "../../NodeLink";
import { purple } from "@mui/material/colors";
import TimelineSeparator from "./helpers/TimelineSeparator.tsx";
import { getNode } from "../helpers/getNode.ts";
import TimeAgo from "../../TimeAgo";
import { Trans } from "react-i18next";

const Text: React.FC<SubItemProps> = ({ log, position }) => {
  return (
    <TimelineItem position={position}>
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        variant="body2"
        color="text.secondary"
      >
        <TimeAgo date={log.time} />
      </TimelineOppositeContent>
      <TimelineSeparator color={purple[500]} log={log}>
        <MessageIcon />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span">
          {position === "left" ? (
            <Trans
              i18nKey={"timeline:message_sent_to_x"}
              components={{
                actor1: <NodeLink node={getNode(log, "to")} key={"to"} />,
              }}
            />
          ) : (
            <Trans
              i18nKey={"timeline:message_received_from_x"}
              components={{
                actor1: <NodeLink node={getNode(log, "from")} key={"from"} />,
              }}
            />
          )}
        </Typography>
        <Box>
          <BlockQuote maxWidth={200}>{String(log.data.text ?? "")}</BlockQuote>
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};
export default Text;
