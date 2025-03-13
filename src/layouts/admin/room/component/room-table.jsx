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
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { toast } from 'src/components/snackbar';
import { deleteBuilding } from 'src/api/admin/Building';
import { Tooltip } from '@mui/material';

export function DataGridCustom({ data: rooms, loading, refetch, onEdit }) {
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false });

  // Function to handle delete operation
  const handleDelete = async (id) => {
    const promise = deleteBuilding(id).then((msg) => {
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
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'building',
      headerName: 'Building',
      flex: 1,
    },
    {
      field: 'floor',
      headerName: 'Floor',
      flex: 1,
    },
    {
      field: 'aircon',
      headerName: 'Aircondition',
      flex: 1,
      renderCell: (params) => {
        if (params.value === 'yes') {
          return 'Air-Conditioned';
        } else if (params.value === 'no') {
          return 'Not Air-Conditioned';
        } else {
          return 'Unknown';
        }
      },
    },
    {
      field: 'course',
      headerName: 'Course',
      width: 300,
      renderCell: (params) => (
        <Tooltip title={params.value} enterDelay={500} leaveDelay={200}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Label
          variant="soft"
          color={
            (params.row.status === 'inactive' && 'error') || (params.row.status === 'N/A' && 'warning') || 'success'
          }
        >
          {params.row.status}
        </Label>
      ),
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
        params.row.status === 'active' ? (
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="typcn:delete" width="24px" height="24px" />}
            label="Deactivate"
            onClick={() => handleDeactivate(params.row.userid)}
            sx={{ color: 'error.main' }}
          />
        ) : (
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="mingcute:check-2-fill" />}
            label="Activate"
            onClick={() => handleActivate(params.row.userid)}
            sx={{ color: 'success.main' }}
          />
        ),
      ],
    },
  ];

  // Map the data to rows
  const rows = useMemo(() => {
    return rooms.map((room) => {
      const building = room.r_building || {};
      const courses = room.courses || [];
      const courseDescriptions = courses.length > 0 ? courses.map((course) => course.DESCRIPTION).join(', ') : 'N/A';

      return {
        id: room.ID,
        code: room.CODE,
        description: room.DESCRIPTION,
        floor: room.FLOOR,
        aircon: room.IS_AIRCONDITIONED,
        status: room.STATUS,
        building: building.NAME ? `${building.NAME}` : 'N/A',
        buildingId: building.ID ? `${building.ID}` : `N/A`,
        course: courseDescriptions,
      };
    });
  }, [rooms]);

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
