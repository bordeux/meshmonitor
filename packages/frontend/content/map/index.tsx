import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapProvider } from "./MapContext.tsx";
import View from "./View.tsx";
import NodePick from "./NodePick.tsx";
import { Helmet } from "../../components/Helmet";
import { useTranslation } from "react-i18next";

const Index: React.FC = () => {
  const { t } = useTranslation("map");

  return (
    <MapProvider>
      <Helmet>
        <title>{t("map")}</title>
        <meta name="description" content={t("map.description")} />
        <meta name="keywords" content={t("map.keywords")} />
      </Helmet>
      <View />
      <NodePick />
    </MapProvider>
  );
};
export default Index;
