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
import { deleteCampus } from 'src/api/admin/Campus';

export function DataGridCustom({ data: campuses, loading, refetch, onEdit }) {
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false });

  // Function to handle delete operation
  const handleDelete = async (id, refetch) => {
    const promise = deleteCampus(id).then((msg) => {
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
  const baseColumns = (onEdit) => [
    {
      field: 'code',
      headerName: 'Code',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },
    {
      field: 'telephone',
      headerName: 'Telephone',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'director',
      headerName: 'Director',
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
          onClick={() => handleDelete(params.row.id)}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  // Map the data to rows
  const rows = useMemo(() => {
    return campuses.map((campus) => {
      const user = campus.r_user || {};
      return {
        id: campus.ID,
        code: campus.CODE,
        name: campus.NAME,
        address: campus.ADDRESS,
        telephone: campus.TELEPHONE,
        directorId: user.ID ? `${user.ID}` : null,
        director: user.FNAME ? `${user.FNAME}` : 'N/A',
      };
    });
  }, [campuses]);

  // Memoize the columns for performance
  const columns = useMemo(() => baseColumns(onEdit, (code) => handleDelete(code, refetch)), [onEdit]);

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
