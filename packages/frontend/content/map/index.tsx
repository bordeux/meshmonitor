import { useTranslation } from "react-i18next";
import * as React from "react";
import "leaflet/dist/leaflet.css";

import { Box, styled } from "@mui/material";
import RootWrapper from "../../components/RootWrapper";
import Suspense from "../../components/Suspense";
import { lazy } from "react";
import MapEvents, { PositionData } from "../../components/NodeMap/MapEvents.ts";
import { useNavigate, useParams } from "react-router-dom";
import { generatePath } from "../../helpers/generatePath.ts";
import { Helmet } from "../../components/Helmet";

const Content = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NodeMap = lazy(() => import("../../components/NodeMap"));

const View: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams();
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
            <NodeMap position={position}>
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
            </NodeMap>
          </Suspense>
        </Content>
      </RootWrapper>
    </>
  );
};
export default View;
