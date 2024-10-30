import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import TopBarContent from "./TopBarContent.tsx";
import { Box, IconButton, styled } from "@mui/material";
import ChatContent from "./ChatContent.tsx";
import { useQuery } from "../../services/db/useQuery.ts";
import { useParams } from "react-router-dom";
import { RecordId } from "surrealdb";
import type { Message } from "../../../shared/Schemas/MessageSchema.ts";
import { useState } from "react";
import { MAIN_CHANNEL_ID } from "../../../shared/Schemas/Consts.ts";

const Root = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`,
);

const ChatTopBar = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(2)};
        align-items: center;
`,
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${theme.colors.alpha.white[100]};
`,
);

const getQuery = (nodeIdSecond: string) => {
  let whereFilter = `
    ((node_from = $nodeId AND node_to = $nodeIdSecond)
    OR (node_to = $nodeId AND node_from = $nodeIdSecond))
  `;
  if (nodeIdSecond === "all") {
    whereFilter = `(node_from = $nodeId OR node_to = $nodeId)
            AND node_from != $mainChannel AND node_to != $mainChannel
            `;
  }

  return `SELECT *, node_from as node_from_id, node_to as node_to_id, node_from.* as node_from, node_to.* as node_to FROM message WHERE ${whereFilter} ORDER BY time DESC LIMIT $limit`;
};
export interface MessageRecord extends Message {
  node_from_id: RecordId;
  node_to_id: RecordId;
  [key: string]: any;
}

const DEFAULT_LIMIT = 100;

const NodeChatWindow = () => {
  const { nodeId, nodeIdSecond } = useParams();
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const query = getQuery(String(nodeIdSecond));
  const nodeSourceId = new RecordId("node", String(nodeId));
  const nodeSecondIdx = new RecordId("node", String(nodeIdSecond));
  const messages = useQuery<MessageRecord>(query, {
    nodeId: nodeSourceId,
    nodeIdSecond: nodeSecondIdx,
    mainChannel: new RecordId("node", MAIN_CHANNEL_ID),
    limit,
  });

  return (
    <Root>
      <ChatTopBar
        sx={{
          display: { xs: "flex", lg: "inline-block" },
        }}
      >
        <IconButtonToggle
          sx={{
            display: { lg: "none", xs: "flex" },
            mr: 2,
          }}
          color="primary"
          size="small"
        >
          <MenuTwoToneIcon />
        </IconButtonToggle>
        <TopBarContent
          nodeId={nodeSourceId}
          nodeIdSecond={nodeIdSecond === "all" ? undefined : nodeSecondIdx}
        />
      </ChatTopBar>
      <Box flex={1}>
        {messages && (
          <ChatContent
            messages={messages}
            node={nodeSourceId}
            showLoadMore={messages.length >= limit}
            onClickMore={() => {
              setLimit((prev) => prev + DEFAULT_LIMIT);
            }}
          />
        )}
      </Box>
    </Root>
  );
};

export default NodeChatWindow;
