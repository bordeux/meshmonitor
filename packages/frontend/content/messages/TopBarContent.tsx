import { Box, styled, Typography } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { RecordId } from "surrealdb";
import { useLiveRecord } from "../../services/db/useQuery.ts";
import type { Node } from "../../../shared/Schemas/NodeSchema.ts";
import NodeAvatar from "../../components/NodeAvatar";
import TimeAgo from "../../components/TimeAgo";
import * as React from "react";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { useTranslation } from "react-i18next";

const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`,
);
interface TopBarContentProps {
  nodeId: RecordId;
  nodeIdSecond?: RecordId;
}

const NodeView: React.FC<{ nodeId: RecordId }> = ({ nodeId }) => {
  const { data } = useLiveRecord<Node>(nodeId);
  return (
    <Box display="flex" alignItems="center">
      <NodeAvatar shortName={data?.short_name ?? ""} size={48} />
      <Box ml={1}>
        <Typography variant="h4">
          {data?.long_name ?? data?.short_name ?? String(nodeId.id)}
        </Typography>
        {data?.last_heard && (
          <Typography variant="subtitle1">
            <TimeAgo date={data?.last_heard} />
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const AllChatsView: React.FC = () => {
  const { t } = useTranslation("message");
  return (
    <Box display="flex" alignItems="center">
      <AllInboxIcon />
      <Box ml={1}>
        <Typography variant="h4">{t("all_chats")}</Typography>
      </Box>
    </Box>
  );
};

const TopBarContent: React.FC<TopBarContentProps> = ({
  nodeId,
  nodeIdSecond,
}) => {
  return (
    <>
      <RootWrapper>
        <NodeView nodeId={nodeId} />
        <Box>
          <CompareArrowsIcon />
        </Box>
        {nodeIdSecond ? <NodeView nodeId={nodeIdSecond} /> : <AllChatsView />}
      </RootWrapper>
    </>
  );
};

export default TopBarContent;
