import * as React from "react";
import { PropsWithChildren, Suspense } from "react";
import "leaflet/dist/leaflet.css";
import { Box, CircularProgress, Link, Popover } from "@mui/material";
import { RecordId } from "surrealdb";

interface NodePopoverProps extends PropsWithChildren {
  nodeId: RecordId;
}

const NodeInfo = React.lazy(() => import("../NodeInfo"));

const NodePopover: React.FC<NodePopoverProps> = ({ nodeId, children }) => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <>
      <Link component="button" onClick={handleClick}>
        {children}
      </Link>
      {isOpen && (
        <Popover
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Suspense
            fallback={
              <Box p={5}>
                <CircularProgress size={32} disableShrink thickness={3} />
              </Box>
            }
          >
            <NodeInfo nodeId={String(nodeId.id)} />
          </Suspense>
        </Popover>
      )}
    </>
  );
};
export default NodePopover;
