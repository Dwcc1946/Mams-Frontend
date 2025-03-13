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

// Delete Function
const handleDelete = async (id, refetch) => {
  const promise = fetch(`http://localhost:8000/api/faculty_type/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error deleting item');
    }
    refetch(); // Refresh data
    return 'Item deleted successfully!';
  });

  toast.promise(promise, {
    loading: 'Deleting...',
    success: (msg) => msg,
    error: (error) => `Error: ${error.message}`,
    closeButton: false,
  });
};

// Column Export
const baseColumns = (onDelete, onEdit) => [
  {
    field: 'DESCRIPTION',
    headerName: 'Description',
    flex: 1,
  },
  {
    field: 'MAXHR_REG_LOAD',
    headerName: 'Max(Regular)',
    flex: 1,
  },
  {
    field: 'MAXHR_PART_LOAD',
    headerName: 'Max(Part-time)',
    flex: 1,
  },
  {
    field: 'MAXHR_TEMP_LOAD',
    headerName: 'Max(Temp Load)',
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
    getActions: (params) => [
      <GridActionsCellItem
        showInMenu
        icon={<Iconify icon="solar:pen-bold" />}
        label="Edit"
        onClick={() => onEdit(params.row)}
      />,
      <GridActionsCellItem
        showInMenu
        icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        label="Delete"
        onClick={() => onDelete(params.row.ID)} // Make sure ID is the correct field
        sx={{ color: 'error.main' }}
      />,
    ],
  },
];

export function DataGridCustom({ data: rows, loading, refetch, onEdit }) {
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false });

  const columns = useMemo(
    () =>
      baseColumns(
        (id) => handleDelete(id, refetch), // Pass delete function
        onEdit // Pass the onEdit function
      ),
    [refetch, onEdit]
  );

  return (
    <DataGrid
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
      getRowId={(row) => row.ID} // Use ID for getting row ID
      loading={loading}
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
