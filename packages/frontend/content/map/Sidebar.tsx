import { Box, IconButton, styled } from "@mui/material";
import Scrollbar from "../../components/Scrollbar";
import * as React from "react";
import { useContext } from "react";
import { MapContext } from "./MapContext.tsx";
import CloseIcon from "@mui/icons-material/Close";
import SidebarContent from "./SidebarContent.tsx";

const SIDEBAR_WIDTH = 300;
const SidebarWrapper = styled(Box)`
  position: relative;
  transition: width 0.1s ease-out;
`;

const CloseButtonStyled = styled(IconButton)`
  position: absolute;
  right: 5px;
  top: 2px;
  z-index: 5;
`;

const Sidebar: React.FC = () => {
  const { node, setValue } = useContext(MapContext);

  return (
    <SidebarWrapper width={node ? SIDEBAR_WIDTH : 0}>
      {node && (
        <CloseButtonStyled
          onClick={() => {
            setValue({ node: undefined });
          }}
        >
          <CloseIcon />
        </CloseButtonStyled>
      )}
      <Scrollbar>
        <SidebarContent />
      </Scrollbar>
    </SidebarWrapper>
  );
};

export default Sidebar;
