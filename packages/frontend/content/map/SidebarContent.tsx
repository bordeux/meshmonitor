import { Box, Checkbox, FormControlLabel } from "@mui/material";
import NodeInfo from "../../components/NodeInfo";
import * as React from "react";
import { useContext } from "react";
import { MapContext } from "./MapContext.tsx";

const SidebarContent: React.FC = () => {
  const { node } = useContext(MapContext);

  if (!node) {
    return null;
  }

  return (
    <>
      <NodeInfo nodeId={String(node.id.id)} />
      <Box p={2}>
        <Box>
          <FormControlLabel
            label="Position history"
            control={<Checkbox name="position_history" />}
          />
        </Box>
        <Box>
          <FormControlLabel
            label="Routes"
            control={<Checkbox name="routes" />}
          />
        </Box>
      </Box>
    </>
  );
};

export default SidebarContent;
