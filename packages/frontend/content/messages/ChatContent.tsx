import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  styled,
  SxProps,
  Typography,
} from "@mui/material";

import { format } from "date-fns";
import ScheduleTwoToneIcon from "@mui/icons-material/ScheduleTwoTone";
import { MessageRecord } from "./NodeChatWindow.tsx";
import { RecordId } from "surrealdb";
import TimeAgo from "../../components/TimeAgo";
import * as React from "react";
import { PropsWithChildren, useLayoutEffect, useRef } from "react";
import NodeAvatar from "../../components/NodeAvatar";
import { useCurrentLocale } from "../../helpers/useCurrentLocale.tsx";
import { LocaleType } from "../../locales";
import Scrollbar from "../../components/Scrollbar";
import Scrollbars from "react-custom-scrollbars-2";
import NodePopover from "../../components/NodePopover";
import { Theme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        border-radius: ${theme.general.borderRadiusSm};
        text-transform: none;
        background: ${theme.palette.background.default};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.colors.alpha.black[50]};
      }
`,
);

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`,
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`,
);

interface ChatContentProps {
  messages: MessageRecord[];
  node?: RecordId;
  onClickMore?: () => void;
  showLoadMore: boolean;
}

interface MessageItemProps {
  message: MessageRecord;
}

const MessageAvatar: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <NodePopover nodeId={message.node_from_id}>
      <NodeAvatar shortName={message?.node_from?.short_name ?? ""} size={50} />
    </NodePopover>
  );
};

const MessageSecondary: React.FC<
  { sx?: SxProps<Theme> } & PropsWithChildren
> = ({ children, sx }) => {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        ...sx,
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </Typography>
  );
};

const MessageContent: React.FC<MessageItemProps & { primary?: boolean }> = ({
  message,
  primary,
}) => {
  const Component = primary ? CardWrapperPrimary : CardWrapperSecondary;
  const nodeFrom = message.node_from;
  return (
    <>
      <MessageSecondary sx={{ pb: 1 }}>
        {nodeFrom?.long_name ??
          nodeFrom?.short_name ??
          String(message.node_from_id.id)}
      </MessageSecondary>
      <Component>{message.content}</Component>
      <MessageSecondary sx={{ pt: 1 }}>
        <ScheduleTwoToneIcon
          sx={{
            mr: 0.5,
            ml: 0.5,
          }}
          fontSize="small"
        />
        <TimeAgo date={message.time} />
      </MessageSecondary>
    </>
  );
};

const Message: React.FC<MessageItemProps & { primary?: boolean }> = ({
  message,
  primary,
}) => {
  const flexPosition = primary ? "flex-end" : "flex-start";
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent={flexPosition}
      py={3}
    >
      {!primary && <MessageAvatar message={message} />}
      <Box
        display="flex"
        alignItems={flexPosition}
        flexDirection="column"
        justifyContent={flexPosition}
        mr={2}
        ml={2}
      >
        <MessageContent message={message} primary={primary} />
      </Box>
      {primary && <MessageAvatar message={message} />}
    </Box>
  );
};

const groupByDate = (messages: MessageRecord[], currentLocale: LocaleType) => {
  const result: Record<string, MessageRecord[]> = {};
  for (const message of messages) {
    const date = format(message.time, "dd MMMM yyyy", {
      locale: currentLocale.dateLocale,
    });
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(message);
  }
  return result;
};

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  node,
  onClickMore,
  showLoadMore,
}) => {
  const { t } = useTranslation("message");
  const currentLocale = useCurrentLocale();
  const [interacted, setInteracted] = React.useState(false);
  const messagesList = groupByDate(messages.reverse(), currentLocale);
  const ref = useRef<Scrollbars>(null);
  const depedencyRefresh = node?.id || "main";

  useLayoutEffect(() => {
    window.requestAnimationFrame(() => {
      if (ref.current && !interacted) {
        ref.current.scrollToBottom();
      }
    });
  }, [ref, depedencyRefresh, messagesList, interacted]);

  return (
    <Scrollbar ref={ref}>
      <Box p={3}>
        {showLoadMore && (
          <Button
            variant="outlined"
            fullWidth
            style={{
              marginBottom: "30px",
            }}
            onClick={() => {
              setInteracted(true);
              onClickMore?.();
            }}
          >
            {t("load_more")}
          </Button>
        )}

        {messages.length === 0 && (
          <Alert
            severity="info"
            style={{
              maxWidth: 500,
              margin: "auto",
              marginTop: "50px",
            }}
          >
            {t("no_messages_found")}
          </Alert>
        )}
        {Object.entries(messagesList).map(([date, messages]) => {
          return (
            <div key={date}>
              <DividerWrapper key={date}>{date}</DividerWrapper>
              {messages.map((message) => {
                const isPrimary =
                  node && String(message.node_from_id.id) === String(node.id);
                return (
                  <Message
                    message={message}
                    key={String(message.id.id)}
                    primary={isPrimary}
                  />
                );
              })}
            </div>
          );
        })}
      </Box>
    </Scrollbar>
  );
};

export default ChatContent;
