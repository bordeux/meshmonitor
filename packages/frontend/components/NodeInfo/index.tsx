import * as React from "react";
import "leaflet/dist/leaflet.css";
import { Alert, Box, ListItemText, Stack } from "@mui/material";
import { useLiveRecord } from "../../services/db/useQuery.ts";
import { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { RecordId } from "surrealdb";
import { styled } from "@mui/material/styles";
import MapIcon from "@mui/icons-material/Map";
import MessageIcon from "@mui/icons-material/Message";
import { generatePath } from "../../helpers/generatePath.ts";
import { Link } from "react-router-dom";
import NodeAvatar from "../NodeAvatar";
import HistoryIcon from "@mui/icons-material/History";
import TimeAgo from "../TimeAgo";
import { useTranslation } from "react-i18next";

interface NodeLinkProps {
  nodeId: string;
}

const ListItemTextItem = styled(ListItemText)`
  padding: 5px;
`;

const StackStyled = styled(Stack)`
  padding: 5px;
  min-width: 300px;
  max-width: 100%;
  color: ${(props) => props.theme.palette.primary.contrastText};
`;

const NodeInfo: React.FC<NodeLinkProps> = ({ nodeId }) => {
  const record = useLiveRecord<Node>(new RecordId<string>("node", nodeId));
  const name = record?.short_name ?? record?.id.id.toString() ?? "";

  const { t } = useTranslation("nodes");

  if (!record) {
    return <Alert severity="error">Node {nodeId} not found in database</Alert>;
  }

  return (
    <StackStyled
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box>
        <NodeAvatar shortName={name} />
        <Box pt={2}>
          {record?.position && (
            <Link
              to={generatePath("/node/:nodeId/map", {
                nodeId: nodeId,
              })}
            >
              <MapIcon />
            </Link>
          )}

          <Link
            to={generatePath("/node/:nodeId/timeline", {
              nodeId: nodeId,
            })}
          >
            <HistoryIcon />
          </Link>
          <Link
            to={generatePath("/message/node/:nodeId", {
              nodeId: nodeId,
            })}
          >
            <MessageIcon />
          </Link>
        </Box>
      </Box>
      <Box>
        <ListItemTextItem primary={String(record.id.id)} secondary={t("id")} />
        <ListItemTextItem
          primary={record?.long_name ?? "-"}
          secondary={t("long_name")}
        />
        <ListItemTextItem
          primary={record?.short_name ?? "-"}
          secondary={t("short_name")}
        />
        {record?.last_heard && (
          <ListItemTextItem
            primary={<TimeAgo date={record?.last_heard} />}
            secondary={t("last_heard")}
          />
        )}
      </Box>
    </StackStyled>
  );
};
export default NodeInfo;
