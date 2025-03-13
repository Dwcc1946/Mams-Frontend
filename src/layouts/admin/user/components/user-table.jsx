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
import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { PasswordModal, FacultyAssignmentModal } from './user-modal';
import { useForm } from 'react-hook-form';
import { deactivateUser, activateUser } from 'src/api/admin/User';

export function UserTable({ data: users, loading, refetch, onEdit }) {
  const { reset, ...formMethods } = useForm();
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterButtonEl, setFilterButtonEl] = useState(null); // Initialize filterButtonEl state
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openCampusModal, setOpenCampusModal] = useState(false);

  const handleOpenModal = (row, type) => {
    setSelectedRow(row);
    console.log('selected row:', row);
    if (type === 'password') {
      setOpenPasswordModal(true);
    } else if (type === 'campus') {
      setOpenCampusModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenPasswordModal(false);
    setOpenCampusModal(false);
    setSelectedRow(null);
  };

  const handleDeactivate = async (id) => {
    const promise = deactivateUser(id).then((msg) => {
      refetch();
      return msg;
    });

    toast.promise(promise, {
      loading: 'Deactivating user...',
      success: (msg) => msg,
      error: (error) => `Error: ${error.message}`,
      closeButton: false,
    });
  };

  const handleActivate = async (id) => {
    const promise = activateUser(id).then((msg) => {
      refetch();
      return msg;
    });

    toast.promise(promise, {
      loading: 'Activating user...',
      success: (msg) => msg,
      error: (error) => `Error: ${error.message}`,
      closeButton: false,
    });
  };

  // Column Export
  const baseColumns = (onEdit) => [
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
    },
    {
      field: 'username',
      headerName: 'User Name',
      flex: 1,
    },
    {
      field: 'position',
      headerName: 'User Type',
      flex: 1,
    },
    {
      type: 'singleSelect',
      field: 'status',
      headerName: 'Status',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <Label
          variant="soft"
          color={
            (params.row.status === 'Inactive' && 'error') || (params.row.status === 'N/A' && 'warning') || 'success'
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
          icon={<Iconify icon="solar:key-bold" />}
          label="Change Password"
          onClick={() => handleOpenModal(params.row.id, 'password')}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="mingcute:school-fill" />}
          label="Campus Assignment"
          onClick={() => handleOpenModal(params.row.id, 'campus')}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => onEdit(params.row)}
        />,
        params.row.status === 'Active' ? (
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

  const rows = useMemo(() => {
    return users.map((user) => ({
      id: user.ID,
      fullName: `${user.LNAME}, ${user.FNAME}`,
      username: user.r_account?.username || 'N/A',
      position: user.r_account?.usertype || 'N/A',
      status: user.r_account?.status || 'N/A',
      userid: user.r_account ? user.r_account.userid : null,
      firstName: user.FNAME,
      lastName: user.LNAME,
      middleName: user.MNAME,
      dob: user.DOB,
      placeOfBirth: user.PLACEOFBIRTH,
      gender: user.GENDER,
      civilStatus: user.CIVILSTATUS,
      nationality: user.NATIONALITY,
      presentAddress: {
        region: user.RESIDENT_REGION,
        province: user.RESIDENT_PROVINCE,
        municipality: user.RESIDENT_MUNICIPALITY,
        address: user.RESIDENT_ADDRESS,
        zipCode: user.RESIDENT_ZIPCODE,
      },
      permanentAddress: {
        region: user.PERMANENT_REGION,
        province: user.PERMANENT_PROVINCE,
        municipality: user.PERMANENT_MUNICIPALITY,
        address: user.PERMANENT_ADDRESS,
        zipCode: user.PERMANENT_ZIPCODE,
      },
      contactNo: user.CONTACT_NUM,
      height: user.HEIGHT,
      weight: user.WEIGHT,
      email: user.EMAIL,
      religion: user.RELIGION,
      bloodType: user.BLOOD_TYPE,
      avatarUrl: user.PROFILEPIC,
      dateRegistered: user.DATE_REGISTERED,
      title: user.Title,
      fcode: user.Fcode,
    }));
  }, [users]);

  const columns = useMemo(
    () =>
      baseColumns(
        onEdit,
        (userid) => handleActivate(userid),
        (userid) => handleDeactivate(userid)
      ),
    [onEdit]
  );

  return (
    <>
      <DataGrid
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        loading={loading}
        columnVisibilityModel={{ id: false }}
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
      <FacultyAssignmentModal open={openCampusModal} onClose={handleCloseModal} id={selectedRow} />
      <PasswordModal open={openPasswordModal} onClose={handleCloseModal} id={selectedRow} />
    </>
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
