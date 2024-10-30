import {
  Box,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { useLiveQuery } from "../../services/db/useQuery.ts";
import { MAIN_CHANNEL_ID, Node } from "../../../shared/Schemas/NodeSchema.ts";
import { getDisplayNodeName } from "../../helpers/getDisplayNodeName.ts";
import NodeAvatar from "../../components/NodeAvatar";
import { useNavigate, useParams } from "react-router-dom";
import { generatePath } from "../../helpers/generatePath.ts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isNodeMatchString } from "../../helpers/isNodeMatchString.ts";

export const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `,
);

export const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `,
);

const SidebarContent: React.FC = () => {
  const { t } = useTranslation("message");
  const navigate = useNavigate();
  const { nodeId } = useParams();
  const [search, setSearch] = useState("");
  const result = useLiveQuery<Node>(
    `SELECT * FROM node WHERE has_private_message = true`,
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
        {t("channels")}
      </Typography>
      <Box mt={2}>
        <List disablePadding component="div">
          <ListItemWrapper
            selected={MAIN_CHANNEL_ID === nodeId}
            onClick={() => {
              navigate(
                generatePath("/message/channel/:channelId", {
                  channelId: MAIN_CHANNEL_ID,
                }),
                { replace: true },
              );
            }}
          >
            <ListItemAvatar>
              <NodeAvatar shortName={"Main"} size={42} />
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
              primary={t("main_channel")}
            />
          </ListItemWrapper>
        </List>
      </Box>
      <Typography
        sx={{
          mb: 1,
          mt: 2,
        }}
        variant="h3"
      >
        {t("nodes")}
      </Typography>

      <Box mt={2}>
        <List disablePadding component="div">
          {result?.map((node) => {
            if (!isNodeMatchString(node, search)) {
              return null;
            }

            return (
              <ListItemWrapper
                key={String(node.id.id)}
                selected={String(node.id.id) === nodeId}
                onClick={() => {
                  navigate(
                    generatePath("/message/node/:nodeId/all", {
                      nodeId: String(node.id.id),
                    }),
                    { replace: true },
                  );
                }}
              >
                <ListItemAvatar>
                  <NodeAvatar shortName={node.short_name ?? ""} size={42} />
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
                  secondary={String(node.id.id)}
                />
              </ListItemWrapper>
            );
          })}
        </List>
      </Box>
    </RootWrapper>
  );
};

export default SidebarContent;
