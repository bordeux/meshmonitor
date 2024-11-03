import * as React from "react";
import "leaflet/dist/leaflet.css";
import { Alert, Box, ListItemText, Stack } from "@mui/material";
import { useLiveRecord } from "../../services/db/useQuery.ts";
import type { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { RecordId } from "surrealdb";
import { styled } from "@mui/material/styles";
import MapIcon from "@mui/icons-material/Map";
import MessageIcon from "@mui/icons-material/Message";
import { generatePath } from "../../helpers/generatePath.ts";
import { Link } from "react-router-dom";
import NodeAvatar from "../NodeAvatar";
import HistoryIcon from "@mui/icons-material/History";
import { useTranslation } from "react-i18next";
import SuspenseLoader from "../SuspenseLoader";
import { HardwareModel } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb";
import {
  Config_DeviceConfig_Role,
  Config_LoRaConfig_RegionCode,
} from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/config_pb";
import NodeBattery from "../NodeBattery";
import LastHeard from "../LastHeard";

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
  const { data, loaded } = useLiveRecord<Node>(
    new RecordId<string>("node", nodeId),
  );
  const name = data?.short_name ?? data?.id.id.toString() ?? "";

  const { t } = useTranslation("nodes");

  if (!loaded) {
    return <SuspenseLoader />;
  }

  if (loaded && !data) {
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
      <Box
        style={{
          textAlign: "center",
        }}
      >
        {data?.device_metrics && (
          <Box pb={1}>
            <NodeBattery node={data} />
          </Box>
        )}
        <NodeAvatar shortName={name} />
        <Box pt={2}>
          {data?.position && (
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
          {data?.has_private_message && (
            <Link
              to={generatePath("/message/node/:nodeId", {
                nodeId: nodeId,
              })}
            >
              <MessageIcon />
            </Link>
          )}
        </Box>
      </Box>
      <Box>
        <ListItemTextItem primary={String(data?.id.id)} secondary={t("id")} />
        {data?.long_name && (
          <ListItemTextItem
            primary={data.long_name ?? "-"}
            secondary={t("long_name")}
          />
        )}

        {data?.last_heard && (
          <ListItemTextItem
            primary={<LastHeard date={data.last_heard} />}
            secondary={t("last_heard")}
          />
        )}

        {data?.firmware_version && (
          <ListItemTextItem
            primary={data.firmware_version}
            secondary={t("firmware_version")}
          />
        )}

        {data?.hw_model && (
          <ListItemTextItem
            primary={String(HardwareModel[data.hw_model]).replaceAll("_", " ")}
            secondary={t("hw_model")}
          />
        )}
        {data?.role != undefined && (
          <ListItemTextItem
            primary={String(Config_DeviceConfig_Role[data.role]).replaceAll(
              "_",
              " ",
            )}
            secondary={t("role")}
          />
        )}

        {data?.region != undefined && (
          <ListItemTextItem
            primary={String(
              Config_LoRaConfig_RegionCode[data.region],
            ).replaceAll("_", " ")}
            secondary={t("region")}
          />
        )}
      </Box>
    </StackStyled>
  );
};
export default NodeInfo;
