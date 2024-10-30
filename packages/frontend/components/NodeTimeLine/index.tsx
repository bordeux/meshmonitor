import * as React from "react";
import { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import Timeline from "@mui/lab/Timeline";
import { useQuery } from "../../services/db/useQuery.ts";
import { RecordId } from "surrealdb";
import { Log } from "../../../shared/Schemas/LogSchema.ts";
import Item from "./Item.tsx";
import {
  Alert,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import Scrollbar from "../Scrollbar";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import mapValues from "lodash/mapValues";
import { ItemTypes } from "./Items";
import { omitBy } from "lodash";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineContent from "@mui/lab/TimelineContent";
import useLocalStorageState from "ahooks/es/useLocalStorageState";
import { useTranslation } from "react-i18next";
import { camelToSnakeCase } from "../../../shared/helpers/camelToSnakeCase.ts";

interface NodeTimeLineProps {
  nodeId: string;
}

const Container = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ButtonsContainer = styled(Box)`
  position: absolute;
  right: 10px;
  top: 20px;
  z-index: 50;
  float: right;
`;

const PAGE_SIZE = 50;
const NodeTimeLine: React.FC<NodeTimeLineProps> = ({ nodeId }) => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString());
  const [limit, setLimit] = useState(PAGE_SIZE);
  const settingsButtonRef = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const telemetryDefault = mapValues(ItemTypes, () => true);
  const [selectedEntities, setSelectedEntities] = useLocalStorageState<{
    [key: string]: boolean;
  }>(`timeline:filters`, {
    defaultValue: telemetryDefault,
  });
  const { t } = useTranslation("timeline");

  const typesPick = omitBy(selectedEntities, (val) => !val);

  const data = useQuery<Log>(
    `
        SELECT
          node_from.*,
          node_from as node_from_id,
          node_to.*,
          node_to as node_to_id,
          *
        FROM
          log
        WHERE
            (node_from = $nodeId OR node_to = $nodeId)
        AND time <= $time
        AND type IN ($types)
        ORDER BY time DESC
        LIMIT $limit`,
    {
      nodeId: new RecordId("node", nodeId),
      time: new Date(currentDate),
      types: Object.keys(typesPick),
      limit,
    },
  );

  const onClickMore = () => {
    setLimit((prevState) => prevState + PAGE_SIZE);
  };

  return (
    <Container>
      <ButtonsContainer>
        <IconButton ref={settingsButtonRef} onClick={() => setMenuOpen(true)}>
          <SettingsIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={settingsButtonRef.current}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          <Divider />
          {selectedEntities &&
            Object.keys(telemetryDefault).map((key) => {
              const selected =
                selectedEntities[key as keyof typeof selectedEntities] ?? false;
              return (
                <MenuItem
                  key={key}
                  onClick={() => {
                    setSelectedEntities((prevState) => ({
                      ...prevState,
                      [key]: !selected,
                    }));
                  }}
                >
                  {selected && (
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText inset={!selected}>
                    {t(
                      camelToSnakeCase(
                        key.replaceAll("meshtastic.", ""),
                      ) as any,
                    )}
                  </ListItemText>
                </MenuItem>
              );
            })}
          <Divider />

          <MenuItem
            onClick={() => {
              setCurrentDate(new Date().toISOString());
              setMenuOpen(false);
            }}
          >
            <ListItemIcon>
              <RefreshIcon />
            </ListItemIcon>
            <ListItemText>{t("refresh")}</ListItemText>
          </MenuItem>
        </Menu>
      </ButtonsContainer>
      <Scrollbar>
        {data?.length === 0 && (
          <Alert
            severity="error"
            style={{
              maxWidth: 500,
              margin: "auto",
              marginTop: "50px",
            }}
          >
            No data found. Please check filters or try again later.
          </Alert>
        )}
        <Timeline>
          {data &&
            data.map((log) => (
              <Item log={log} key={String(log.id)} nodeId={nodeId} />
            ))}

          {limit === data?.length && (
            <TimelineItem>
              <TimelineOppositeContent></TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary">
                  <IconButton onClick={onClickMore}>
                    <KeyboardDoubleArrowDownIcon />
                  </IconButton>
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
          )}
        </Timeline>
      </Scrollbar>
    </Container>
  );
};
export default NodeTimeLine;
