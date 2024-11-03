import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import NodeInfo from "../../components/NodeInfo";
import * as React from "react";
import { useContext } from "react";
import { LayerType, MapContext } from "./MapContext.tsx";
import { useTranslation } from "react-i18next";

const LAYERS = [{ id: LayerType.POSITION_HISTORY, name: "position_history" }];

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

        {LAYERS.map((layer) => (
          <Box pt={1} key={layer.id}>
            <FormControlLabel
              label={t(layer.name as any)}
              checked={layers.includes(layer.id)}
              onChange={() => {
                setValue({
                  layers: layers.includes(layer.id)
                    ? layers.filter((l) => l !== layer.id)
                    : [...layers, layer.id],
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
