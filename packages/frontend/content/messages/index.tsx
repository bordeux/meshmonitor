import SidebarContent from "./SidebarContent";

import Scrollbar from "../../components/Scrollbar";

import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Suspense from "../../components/Suspense";
import { Helmet } from "../../components/Helmet";
import { useTranslation } from "react-i18next";

export const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`,
);

export const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`,
);

function ApplicationsMessenger() {
  const { t } = useTranslation("message");
  return (
    <>
      <Helmet>
        <title>{t("messages")}</title>
      </Helmet>
      <RootWrapper className="Mui-FixedWrapper">
        <Sidebar
          sx={{
            display: "inline-block",
          }}
        >
          <Scrollbar>
            <SidebarContent />
          </Scrollbar>
        </Sidebar>
        <Suspense>
          <Outlet />
        </Suspense>
      </RootWrapper>
    </>
  );
}

export default ApplicationsMessenger;
