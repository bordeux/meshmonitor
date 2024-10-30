import { useContext } from "react";

import { Box, styled } from "@mui/material";
import { SidebarContext } from "../../../../contexts/SidebarContext";
import { MonitoringList } from "./MonitoringList.tsx";
import { UtilsList } from "./UtilsList.tsx";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`,
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <>
      <MenuWrapper pt={2}>
        <MonitoringList closeSidebar={closeSidebar} />
        <UtilsList closeSidebar={closeSidebar} />
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
