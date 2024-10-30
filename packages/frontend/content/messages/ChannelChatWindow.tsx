import { Box, styled } from "@mui/material";
import ChatContent from "./ChatContent.tsx";
import { useQuery } from "../../services/db/useQuery.ts";
import { useParams } from "react-router-dom";
import { RecordId } from "surrealdb";
import type { Message } from "../../../shared/Schemas/MessageSchema.ts";
import { useState } from "react";

const Root = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`,
);

interface MessageRecord extends Message {
  node_from_id: RecordId;
  node_to_id: RecordId;
  [key: string]: any;
}

const DEFAULT_LIMIT = 100;

const ChannelChatWindow = () => {
  const { nodeId } = useParams();
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const nodeSourceId = new RecordId("node", String(nodeId));
  const messages = useQuery<MessageRecord>(
    `
    SELECT *, node_from as node_from_id, node_to as node_to_id, node_from.* as node_from, node_to.* as node_to
    FROM message WHERE node_to = $nodeId
    ORDER BY time DESC
    LIMIT $limit
  `,
    {
      nodeId: nodeSourceId,
      limit,
    },
  );

  return (
    <Root>
      <Box flex={1}>
        {messages && (
          <ChatContent
            messages={messages}
            showLoadMore={messages?.length >= limit}
            onClickMore={() => {
              setLimit((prev) => prev + DEFAULT_LIMIT);
            }}
          />
        )}
      </Box>
    </Root>
  );
};

export default ChannelChatWindow;
