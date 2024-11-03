import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import NodeInfo from "../../components/NodeInfo";
import * as React from "react";
import { useContext } from "react";
import { LayerType, MapContext } from "./MapContext.tsx";
import { useTranslation } from "react-i18next";

const SidebarContent: React.FC = () => {
  const { node } = useContext(MapContext);
  const { layers, setValue } = useContext(MapContext);
  const { t } = useTranslation("common");

  if (!node) {
    return null;
  }

  return (
    <>
      <NodeInfo nodeId={String(node.id.id)} />
      <Box p={2}>
        <Typography variant="h5" component="h5">
          Layers
        </Typography>

        {Object.values(LayerType).map((type) => (
          <Box pt={1} key={type}>
            <FormControlLabel
              label={t(type as any)}
              checked={layers.includes(type)}
              onChange={() => {
                setValue({
                  layers: layers.includes(type)
                    ? layers.filter((l) => l !== type)
                    : [...layers, type],
                });
              }}
              control={<Checkbox />}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default SidebarContent;
