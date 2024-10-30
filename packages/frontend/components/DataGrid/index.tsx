import {
  DataGrid as DataGridBase,
  DataGridProps as DataGridBaseProps,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import useLocalStorageState from "ahooks/es/useLocalStorageState";
import { GridColumnVisibilityModel } from "@mui/x-data-grid/hooks/features/columns/gridColumnsInterfaces";
import { Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import Locales from "../../locales";

interface DataGridProps extends DataGridBaseProps {
  name: string;
  defaultVisibility?: GridColumnVisibilityModel;
  defaultFilter?: GridFilterModel;
  defaultPagination?: GridPaginationModel;
  defaultSort?: GridSortModel;
}
interface DataGridStorageProps {
  columnsVisibility?: GridColumnVisibilityModel;
  filter?: GridFilterModel;
  pagination?: GridPaginationModel;
  sort?: GridSortModel;
}
const Toolbar = () => {
  return (
    <Stack direction="row" justifyContent="space-between" p={2}>
      <Box>
        <GridToolbarQuickFilter fullWidth={true} />
      </Box>
      <Box>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
      </Box>
    </Stack>
  );
};

const DataGrid: React.FC<DataGridProps> = (props) => {
  const { i18n } = useTranslation();
  const locale = Locales[i18n.language as keyof typeof Locales].dataGridLocale;
  const [dataGridStorage, setDataGridStorage] =
    useLocalStorageState<DataGridStorageProps>(`datagrid:${props.name}`, {
      defaultValue: {
        columnsVisibility: props.defaultVisibility,
        filter: props.defaultFilter,
        pagination: props.defaultPagination,
        sort: props.defaultSort,
      },
    });

  return (
    <DataGridBase
      {...props}
      slots={{
        toolbar: Toolbar,
      }}
      localeText={locale.components.MuiDataGrid.defaultProps.localeText}
      rowHeight={64}
      columnVisibilityModel={dataGridStorage?.columnsVisibility}
      filterModel={dataGridStorage?.filter}
      paginationModel={dataGridStorage?.pagination}
      sortModel={dataGridStorage?.sort}
      onColumnVisibilityModelChange={(model) =>
        setDataGridStorage((current) => {
          return { ...current, columnsVisibility: model };
        })
      }
      onFilterModelChange={(model) =>
        setDataGridStorage((current) => {
          return { ...current, filter: model };
        })
      }
      onPaginationModelChange={(model) =>
        setDataGridStorage((current) => {
          return { ...current, pagination: model };
        })
      }
      onSortModelChange={(model) =>
        setDataGridStorage((current) => {
          return { ...current, sort: model };
        })
      }
    />
  );
};

export default DataGrid;
