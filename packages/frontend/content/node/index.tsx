import { useTranslation } from "react-i18next";
import * as React from "react";
import Box from "@mui/material/Box";
import { useQuery } from "../../services/db/useQuery.ts";
import { Outlet } from "react-router-dom";
import type { Node } from "../../../shared/Schemas/NodeSchema.ts";
import Suspense from "../../components/Suspense";
import { columns, defaultVisibilityModel } from "./columns.tsx";
import DataGrid from "../../components/DataGrid";
import { Helmet } from "../../components/Helmet";
import { styled } from "@mui/material";

const columnsList = columns.map((column) => column.field);

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`,
);

const View: React.FC = () => {
  const { t } = useTranslation("nodes");
  const { data } = useQuery<Node>(`
    SELECT ${columnsList.join(", ")}
    FROM node
  `);

  return (
    <>
      <Helmet>
        <title>{t("nodes_list")}</title>
        <meta name="description" content={t("nodes.description")} />
        <meta name="keywords" content={t("nodes.keywords")} />
      </Helmet>
      <Suspense>
        <Outlet />
      </Suspense>
      <RootWrapper p={2}>
        <DataGrid
          name="node"
          rows={data}
          columns={columns.map((column) => {
            column.headerName = t(column.field as any);
            return column;
          })}
          defaultVisibility={defaultVisibilityModel}
        />
      </RootWrapper>
    </>
  );
};
export default View;
