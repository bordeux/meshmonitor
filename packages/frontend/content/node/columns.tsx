import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import type { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { HardwareModel } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb";
import { Config_DeviceConfig_Role } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/config_pb";
import { GeometryPoint } from "surrealdb";
import { Link } from "react-router-dom";
import { geometryPointToDMS } from "../../helpers/geometryPointToDMS.ts";
import { generatePath } from "../../helpers/generatePath.ts";
import NodeAvatar from "../../components/NodeAvatar";
import { Box } from "@mui/material";
import TimeAgo from "../../components/TimeAgo";
import { Translation } from "react-i18next";
import MapIcon from "@mui/icons-material/Map";
import HistoryIcon from "@mui/icons-material/History";

const booleanValues = [
  "has_message",
  "has_info",
  "has_position",
  "has_device_metrics",
  "has_environment_metrics",
];

const booleanValuesDefinitions = booleanValues.map((key) => {
  return {
    field: key,
    type: "boolean",
    valueGetter: (_: boolean, row: Node) => row[key as keyof Node] ?? false,
  };
}) as GridColDef<Node>[];

const columnsRaw: GridColDef<Node>[] = [
  {
    field: "short_name",
    width: 80,
    hideable: false,
    type: "string",
    renderCell: (params: GridRenderCellParams<Node, string>) => {
      return (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NodeAvatar shortName={params.value ?? ""} size={50} />
        </Box>
      );
    },
  },
  {
    field: "id",
    valueGetter: (_, row) => row.id.id,
    hideable: false,
    width: 100,
    type: "string",
    renderCell: (params: GridRenderCellParams<Node, string>) => {
      if (!params.value) {
        return null;
      }
      return (
        <Link
          to={generatePath("/node/:nodeId/timeline", {
            nodeId: String(params.row.id.id),
          })}
          replace={true}
        >
          {params.value}
        </Link>
      );
    },
  },
  {
    field: "long_name",
    width: 200,
    type: "string",
  },
  {
    field: "last_heard",
    width: 140,
    renderCell: (params: GridRenderCellParams<Node, Date>) => {
      if (!params.value) {
        return null;
      }
      return <TimeAgo date={params.value} />;
    },
    type: "dateTime",
  },
  {
    field: "is_licensed",
    width: 80,
    type: "boolean",
  },
  {
    field: "hw_model",
    width: 150,
    type: "singleSelect",
    getOptionValue: (value: any) => value.code,
    getOptionLabel: (value: any) => value.name,
    valueOptions: Object.keys(HardwareModel)
      .map((key: string) => {
        const code = Number(key);
        if (isNaN(code)) {
          return null;
        }
        return {
          code,
          name: String(
            HardwareModel[key as keyof typeof HardwareModel],
          ).replaceAll("_", " "),
        };
      })
      .filter((value) => value !== null),
  },
  {
    field: "role",
    type: "singleSelect",
    getOptionValue: (value: any) => value.code,
    getOptionLabel: (value: any) => value.name,
    valueOptions: Object.keys(Config_DeviceConfig_Role)
      .map((key: string) => {
        const code = Number(key);
        if (isNaN(code)) {
          return null;
        }
        return {
          code,
          name: String(
            Config_DeviceConfig_Role[
              key as keyof typeof Config_DeviceConfig_Role
            ],
          ).replaceAll("_", " "),
        };
      })
      .filter((value) => value !== null),
  },
  {
    field: "position",
    width: 250,
    filterable: false,
    renderCell: (params: GridRenderCellParams<Node, GeometryPoint>) => {
      if (!params.value) {
        return null;
      }
      return (
        <Link
          to={generatePath("/node/:nodeId/map", {
            nodeId: String(params.row.id.id),
          })}
          replace={true}
        >
          {geometryPointToDMS(params.value)}
        </Link>
      );
    },
  },
  {
    field: "environment_metrics",
    width: 150,
    filterable: false,
    valueGetter: (_: boolean, row: Node) => !!row.environment_metrics,
    renderCell: (params: GridRenderCellParams<Node, GeometryPoint>) => {
      if (!params.value) {
        return null;
      }

      return (
        <Link
          to={generatePath("/node/:nodeId/metrics/:metricType", {
            nodeId: String(params.row.id.id),
            metricType: "environment",
          })}
          replace={true}
        >
          <Translation>{(t) => <>{t("show")}</>}</Translation>
        </Link>
      );
    },
  },
  {
    field: "device_metrics",
    width: 150,
    filterable: false,
    valueGetter: (_: boolean, row: Node) => !!row.device_metrics,
    renderCell: (params: GridRenderCellParams<Node, GeometryPoint>) => {
      if (!params.value) {
        return null;
      }
      return (
        <Link
          to={generatePath("/node/:nodeId/metrics/:metricType", {
            nodeId: String(params.row.id.id),
            metricType: "device",
          })}
          replace={true}
        >
          <Translation>{(t) => <>{t("show")}</>}</Translation>
        </Link>
      );
    },
  },
  ...booleanValuesDefinitions,

  {
    field: "actions",
    type: "actions",
    hideable: false,
    getActions: (params: GridRowParams) =>
      [
        params.row.position ? (
          <Translation>
            {(t) => (
              <Link
                to={generatePath("/node/:nodeId/map", {
                  nodeId: String(params.row.id.id),
                })}
                title={t("map")}
              >
                <MapIcon />
              </Link>
            )}
          </Translation>
        ) : null,
        <Translation>
          {(t) => (
            <Link
              to={generatePath("/node/:nodeId/timeline", {
                nodeId: String(params.row.id.id),
              })}
              title={t("timeline")}
            >
              <HistoryIcon />
            </Link>
          )}
        </Translation>,
      ].filter((item) => item !== null),
  },
] as const;

export const columns: GridColDef<Node>[] = columnsRaw;

export const defaultVisibilityModel = booleanValuesDefinitions.reduce(
  (acc, column) => {
    acc[column.field] = false;
    return acc;
  },
  {} as Record<string, boolean>,
);
