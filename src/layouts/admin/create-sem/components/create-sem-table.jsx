import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  gridClasses,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { toast } from 'src/components/snackbar';
import { deleteSem, makePresentSem } from 'src/api/admin/CreateSem';

// Function to handle making an entry "Present"
const handleMakePresent = async (id, refetch) => {
  const promise = makePresentSem(id).then((msg) => {
    refetch();
    return msg;
  });

  toast.promise(promise, {
    loading: 'Updating...',
    success: (msg) => msg,
    error: (error) => `Error: ${error.message}`,
    closeButton: false,
  });
};

// Function to handle delete operation
const handleDelete = async (id, refetch) => {
  const promise = deleteSem(id).then((msg) => {
    refetch();
    return msg;
  });

  toast.promise(promise, {
    loading: 'Deleting...',
    success: (msg) => msg,
    error: (error) => `Error: ${error.message}`,
    closeButton: false,
  });
};

// Define base columns for the data grid
const baseColumns = (onMakePresent, onDelete) => [
  {
    field: 'sy',
    headerName: 'School Year',
    flex: 1,
  },
  {
    field: 'term',
    headerName: 'Term',
    flex: 1,
  },
  {
    field: 'code',
    headerName: 'Code',
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    type: 'actions',
    field: 'actions',
    headerName: 'Actions',
    align: 'right',
    headerAlign: 'right',
    width: 90,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    getActions: (params) => {
      if (params.row.status === 'Present') {
        return [];
      }
      return [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="mingcute:check-2-fill" />}
          label="Make Present"
          onClick={() => onMakePresent(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => onDelete(params.row.id)}
          sx={{ color: 'error.main' }}
        />,
      ];
    },
  },
];

export function DataGridCustom({ data: schoolYears, loading, refetch }) {
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false });

  // Map the data to rows
  const rows = useMemo(() => {
    return schoolYears.flatMap((sy) =>
      sy.t_sy_sems.map((sem) => ({
        id: sem.ID,
        sy: sy.DESCRIPTION,
        term: sem.TERM,
        code: sem.CODE,
        status: sem.STATUS,
      }))
    );
  }, [schoolYears]);

  // Memoize the columns for performance
  const columns = useMemo(
    () =>
      baseColumns(
        (code) => handleMakePresent(code, refetch),
        (code) => handleDelete(code, refetch)
      ),
    [refetch]
  );

  return (
    <DataGrid
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
      loading={loading}
      onRowSelectionModelChange={(newSelectionModel) => {
        setSelectedRows(newSelectionModel);
      }}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
      slots={{
        toolbar: CustomToolbar,
        noRowsOverlay: () => <EmptyContent />,
        noResultsOverlay: () => <EmptyContent title="No results found" />,
      }}
      slotProps={{
        panel: { anchorEl: filterButtonEl },
        toolbar: { setFilterButtonEl, showQuickFilter: true },
      }}
      sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
    />
  );
}

function CustomToolbar({ setFilterButtonEl }) {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}
