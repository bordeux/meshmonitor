import {
  Box,
  Divider,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { useQuery } from "../../services/db/useQuery.ts";
import type { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { getDisplayNodeName } from "../../helpers/getDisplayNodeName.ts";
import NodeAvatar from "../../components/NodeAvatar";
import { useNavigate, useParams } from "react-router-dom";
import { generatePath } from "../../helpers/generatePath.ts";
import { ListItemWrapper, RootWrapper } from "./SidebarContent.tsx";
import { RecordId } from "surrealdb";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isNodeMatchString } from "../../helpers/isNodeMatchString.ts";
import Label from "../../components/Label";
import { MAIN_CHANNEL_ID } from "../../../shared/Schemas/Consts.ts";

interface ResultItem {
  id: RecordId;
  node: Node;
  messages_count: number;
  [key: string]: any;
}

const SidebarContent: React.FC = () => {
  const { t } = useTranslation("message");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { nodeId, nodeIdSecond } = useParams();
  const result = useQuery<ResultItem>(
    `SELECT
            (IF node_from = $node THEN node_to ELSE node_from END) as id,
            (IF node_from = $node THEN node_to ELSE node_from END).* as node,
            COUNT(1) as messages_count
        FROM message
        WHERE (node_from = $node OR node_to = $node)
        AND node_to != $mainChannel
        GROUP BY node;
    `,
    {
      node: new RecordId("node", String(nodeId)),
      mainChannel: new RecordId("node", MAIN_CHANNEL_ID),
    },
  );

  return (
    <RootWrapper>
      <TextField
        sx={{
          mt: 1,
          mb: 1,
        }}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          ),
        }}
        placeholder={t("search")}
        value={search}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
      />
      <Typography
        sx={{
          mb: 1,
          mt: 2,
        }}
        variant="h3"
      >
        {t("chats")}
      </Typography>

      <Box mt={2}>
        <List disablePadding component="div">
          <ListItemWrapper
            selected={"all" === nodeIdSecond}
            onClick={() => {
              navigate(
                generatePath("/message/node/:nodeId/:nodeIdSecond", {
                  nodeId: String(nodeId),
                  nodeIdSecond: "all",
                }),
                { replace: true },
              );
            }}
          >
            <ListItemAvatar>
              <AllInboxIcon />
            </ListItemAvatar>
            <ListItemText
              sx={{
                mr: 1,
              }}
              primaryTypographyProps={{
                color: "textPrimary",
                variant: "h5",
                noWrap: true,
              }}
              secondaryTypographyProps={{
                color: "textSecondary",
                noWrap: true,
              }}
              primary={t("all_chats")}
              secondary={t("display_all_chats")}
            />
          </ListItemWrapper>
          <Divider />
          {result?.map((item) => {
            const id = item.id;
            const node = item.node;
            if (!isNodeMatchString(node, search)) {
              return null;
            }

            return (
              <ListItemWrapper
                key={String(id.id)}
                selected={String(id.id) === nodeIdSecond}
                onClick={() => {
                  navigate(
                    generatePath("/message/node/:nodeId/:nodeIdSecond", {
                      nodeId: String(nodeId),
                      nodeIdSecond: String(id.id),
                    }),
                    { replace: true },
                  );
                }}
              >
                <ListItemAvatar>
                  <NodeAvatar shortName={node?.short_name ?? ""} size={42} />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    mr: 1,
                  }}
                  primaryTypographyProps={{
                    color: "textPrimary",
                    variant: "h5",
                    noWrap: true,
                  }}
                  secondaryTypographyProps={{
                    color: "textSecondary",
                    noWrap: true,
                  }}
                  primary={getDisplayNodeName(node)}
                  secondary={String(id.id)}
                />
                <Label color="primary">
                  <b>{item.messages_count}</b>
                </Label>
              </ListItemWrapper>
            );
          })}
        </List>
      </Box>
    </RootWrapper>
  );
};

export default SidebarContent;
