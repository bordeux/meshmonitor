import SidebarContent from "./SidebarContent";

import Scrollbar from "../../components/Scrollbar";

import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Suspense from "../../components/Suspense";
import { Helmet } from "../../components/Helmet";
import { useTranslation } from "react-i18next";
import * as React from "react";

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

const ApplicationsMessenger: React.FC = () => {
  const { t } = useTranslation("message");
  return (
    <>
      <Helmet>
        <title>{t("messages")}</title>
        <meta name="description" content={t("messages.description")} />
        <meta name="keywords" content={t("messages.keywords")} />
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
};

export default ApplicationsMessenger;
