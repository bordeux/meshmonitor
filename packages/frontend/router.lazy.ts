import { lazy } from "react";

export const Map = lazy(() => import("./content/map"));
export const Node = lazy(() => import("./content/node"));
export const NodeMap = lazy(() => import("./content/node/Map"));
export const NodeMetrics = lazy(() => import("./content/node/Metrics"));
export const NodeTimeline = lazy(() => import("./content/node/TimeLine"));
export const Messages = lazy(() => import("./content/messages"));

export const MessagesNodeSelect = lazy(
  () => import("./content/messages/NodeSelect"),
);
export const MessagesNodeChatWindow = lazy(
  () => import("./content/messages/NodeChatWindow"),
);
export const MessagesChannelChatWindow = lazy(
  () => import("./content/messages/ChannelChatWindow"),
);
export const Status404 = lazy(() => import("./content/pages/Status/Status404"));
export const Status500 = lazy(() => import("./content/pages/Status/Status500"));
export const UtilsDecode = lazy(() => import("./content/utils/decode"));
