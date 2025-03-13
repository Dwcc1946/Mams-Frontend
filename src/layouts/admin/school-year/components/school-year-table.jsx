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
import { deleteSchoolYear } from 'src/api/admin/SchoolYear';

// Make present function
const handleMakePresent = async (code, refetch) => {
  const promise = fetch('http://localhost:8000/api/school_year/make-present', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ code }),
  }).then(async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error updating status');
    }
    refetch();
    return 'Status updated successfully!';
  });

  toast.promise(promise, {
    loading: 'Updating...',
    success: (msg) => msg,
    error: (error) => `Error: ${error.message}`,
    closeButton: false,
  });
};

// Delete Function
const handleDelete = async (code, refetch) => {
  const promise = deleteSchoolYear(code).then((msg) => {
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

// Column Export
const baseColumns = (onMakePresent, onDelete, onEdit) => [
  {
    field: 'CODE',
    headerName: 'CODE',
    flex: 1,
  },
  {
    field: 'DESCRIPTION',
    headerName: 'DESCRIPTION',
    flex: 1,
  },
  {
    field: 'STATUS',
    headerName: 'STATUS',
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
      if (params.row.STATUS === 'Present') {
        return [];
      }
      return [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="mingcute:check-2-fill" />}
          label="Make Present"
          onClick={() => onMakePresent(params.row.CODE)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => onEdit(params.row)} // Call onEdit with the row data
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => onDelete(params.row.CODE)}
          sx={{ color: 'error.main' }}
        />,
      ];
    },
  },
];

export function DataGridCustom({ data: rows, loading, refetch, onEdit }) {
  // Add onEdit prop
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [setSelectedRows] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false });

  const columns = useMemo(
    () =>
      baseColumns(
        (code) => handleMakePresent(code, refetch),
        (code) => handleDelete(code, refetch),
        onEdit
      ),
    [refetch, onEdit]
  );

  return (
    <DataGrid
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
      getRowId={(row) => row.CODE}
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
