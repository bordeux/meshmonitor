import * as React from "react";
import { lazy, useContext } from "react";
import "leaflet/dist/leaflet.css";

import { Box, styled } from "@mui/material";
import RootWrapper from "../../components/RootWrapper";
import Suspense from "../../components/Suspense";
import { useNavigate, useParams } from "react-router-dom";
import { generatePath } from "../../helpers/generatePath.ts";
import { LatLng } from "leaflet";
import { Layers } from "./Layers.tsx";
import { UserContext } from "../../contexts/UserContext.tsx";
import Sidebar from "./Sidebar.tsx";
import MapEvents, { PositionData } from "./MapEvents.tsx";

const Content = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Map = lazy(() => import("../../components/Map"));

const View: React.FC = () => {
  const params = useParams();
  const { location } = useContext(UserContext);
  const navigate = useNavigate();
  let position: PositionData = {
    lat: location.lat,
    long: location.long,
    zoom: 14,
  };

  if (params.lat) {
    position = {
      lat: Number(params.lat),
      long: Number(params.long),
      zoom: Number(params.zoom),
    };
  }

  return (
    <>
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
        <Sidebar />
      </RootWrapper>
    </>
  );
};
export default View;
