import { useTranslation } from "react-i18next";
import * as React from "react";
import "leaflet/dist/leaflet.css";

import { Box, styled } from "@mui/material";
import RootWrapper from "../../components/RootWrapper";
import Suspense from "../../components/Suspense";
import { lazy, useContext } from "react";
import MapEvents, { PositionData } from "../../components/NodeMap/MapEvents.ts";
import { useNavigate, useParams } from "react-router-dom";
import { generatePath } from "../../helpers/generatePath.ts";
import { Helmet } from "../../components/Helmet";
import Scrollbar from "../../components/Scrollbar";
import NodeInfo from "../../components/NodeInfo";
import { LatLng } from "leaflet";
import { MapContext } from "./MapContext.tsx";
import { Layers } from "./Layers.tsx";

const Content = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Sidebar = styled(Box)`
  width: 300px;
`;

const Map = lazy(() => import("../../components/Map"));

const View: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { node } = useContext(MapContext);
  const navigate = useNavigate();
  let position: PositionData | undefined = undefined;
  if (params.lat) {
    position = {
      lat: Number(params.lat),
      long: Number(params.long),
      zoom: Number(params.zoom),
    };
  }
  return (
    <>
      <Helmet>
        <title>{t("map")}</title>
      </Helmet>
      <RootWrapper className="Mui-FixedWrapper">
        <Content>
          <Suspense>
            <Map
              center={
                position ? new LatLng(position.lat, position.long) : undefined
              }
              zoom={position?.zoom}
            >
              <MapEvents
                onPositionChanged={(position) => {
                  navigate(
                    generatePath("/map/:lat/:long/:zoom", {
                      lat: String(position.lat),
                      long: String(position.long),
                      zoom: String(position.zoom),
                    }),
                    { replace: true },
                  );
                }}
              />

              <Layers />
            </Map>
          </Suspense>
        </Content>
        <Sidebar>
          <Scrollbar>
            {node ? (
              <Box>
                <NodeInfo nodeId={String(node.id.id)} />
              </Box>
            ) : (
              <Box>Select node from map</Box>
            )}
          </Scrollbar>
        </Sidebar>
      </RootWrapper>
    </>
  );
};
export default View;
