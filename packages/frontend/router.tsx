import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "./layouts/SidebarLayout";
import BaseLayout from "./layouts/BaseLayout";

import * as Lazy from "./router.lazy";
import { MAIN_CHANNEL_ID } from "../shared/Schemas/Consts.ts";

const routes: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/map" replace />,
      },

      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Lazy.Status404 />,
          },
          {
            path: "500",
            element: <Lazy.Status500 />,
          },
        ],
      },
      {
        path: "*",
        element: <Lazy.Status404 />,
      },
    ],
  },
  {
    path: "/map",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Lazy.Map />,
      },
      {
        path: ":lat/:long/:zoom",
        element: <Lazy.Map />,
      },
    ],
  },
  {
    path: "/message",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Lazy.Messages />,
        children: [
          {
            path: "channel",
            element: <Navigate to={MAIN_CHANNEL_ID} replace />,
          },
          {
            path: "channel/:nodeId",
            element: <Lazy.MessagesChannelChatWindow />,
          },
          {
            path: "node/:nodeId",
            element: <Lazy.MessagesNodeSelect />,
            children: [
              {
                path: "",
                element: <Navigate to="all" replace />,
              },
              {
                path: ":nodeIdSecond",
                element: <Lazy.MessagesNodeChatWindow />,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/node",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Lazy.Node />,
        children: [
          {
            path: ":nodeId/map",
            element: <Lazy.NodeMap />,
          },
          {
            path: ":nodeId/metrics/:metricType",
            element: <Lazy.NodeMetrics />,
          },
          {
            path: ":nodeId/timeline",
            element: <Lazy.NodeTimeline />,
          },
        ],
      },
    ],
  },
  {
    path: "/utils",
    element: <SidebarLayout />,
    children: [
      {
        path: "decode",
        element: <Lazy.UtilsDecode />,
      },
    ],
  },
];

export default routes;
