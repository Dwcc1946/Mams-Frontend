import { Box, Grid, TextField, Button, Container, FormControl, MenuItem } from '@mui/material';
import { DataGridCustom } from './component/campus-table';
import CollapsibleCard from '../../../components/collapsible-card/CollapsibleCard';
import { CONFIG } from 'src/config-global';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createCampus, fetchCampus, directorOptions } from 'src/api/admin/Campus';
import { toast } from 'src/components/snackbar';

export default function Main(campusData) {
  const [editMode, setEditMode] = useState(false);
  const { data, error, loading, refetch } = fetchCampus();
  const { data: users } = directorOptions();
  const [selectedCampus, setSelectedCampus] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      campusCode: '',
      campusName: '',
      address: '',
      phone: '',
      director: '',
    },
  });

  useEffect(() => {
    if (editMode && selectedCampus) {
      console.log('Editing user:', selectedCampus);
      setValue('id', selectedCampus.id);
      setValue('campusCode', selectedCampus.code);
      setValue('campusName', selectedCampus.name);
      setValue('address', selectedCampus.address);
      setValue('phone', selectedCampus.telephone);
      setValue('director', selectedCampus.directorId);
    } else {
      reset(); // Reset form if not editing
    }
  }, [editMode, campusData, setValue, reset]);

  const handleEditClick = (row) => {
    setSelectedCampus(row);
    setEditMode(true);
  };

  const onSubmit = (campusdata) => {
    const campusId = editMode ? campusdata.id : null;
    const promise = createCampus(campusdata, campusId).then((msg) => {
      handleReset();
      refetch();
      return msg;
    });

    toast.promise(promise, {
      loading: editMode ? 'Updating..' : 'Submitting..',
      success: (msg) => msg,
      error: (error) => `Error: ${error.message}`,
      closeButton: false,
    });
  };

  const handleReset = () => {
    setEditMode(false);
    reset();
  };

  return (
    <Container maxWidth={false}>
      {/* Form Section */}
      <CollapsibleCard title={editMode ? 'Update Campus Info' : 'Campus Form'} defaultOpen={editMode}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: '100%', padding: 2 }}>
            <Grid container spacing={2}>
              {/* Campus Code Input */}
              <Grid item xs={6}>
                <Controller
                  name="campusCode"
                  control={control}
                  rules={{ required: 'Campus Code is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        label="Campus Code"
                        variant="outlined"
                        fullWidth
                        error={!!errors.campusCode}
                        helperText={errors.campusCode ? errors.campusCode.message : ''}
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Campus Name Input */}
              <Grid item xs={6}>
                <Controller
                  name="campusName"
                  control={control}
                  rules={{ required: 'Campus Name is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        label="Campus Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.campusName}
                        helperText={errors.campusName ? errors.campusName.message : ''}
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Address Input */}
              <Grid item xs={6}>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: 'Address is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        error={!!errors.address}
                        helperText={errors.address ? errors.address.message : ''}
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Phone Input */}
              <Grid item xs={6}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Phone must be a number',
                    },
                  }}
                  render={({ field }) => (
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone ? errors.phone.message : ''}
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Director Dropdown */}
              <Grid item xs={12}>
                <Controller
                  name="director"
                  control={control}
                  rules={{ required: 'Director is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        select
                        label="Director"
                        variant="outlined"
                        fullWidth
                        error={!!errors.director}
                        helperText={errors.director ? errors.director.message : ''}
                        {...field}
                      >
                        {users.map((user) => (
                          <MenuItem key={user.ID} value={user.ID}>
                            {user.FNAME} {user.LNAME} {/* Display full name */}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 3 }}>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
              {editMode ? 'Update' : 'Save'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Cancel
            </Button>
          </Box>
        </form>
      </CollapsibleCard>

      {/* Data Table Section */}
      <CollapsibleCard title="Campus" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={data} loading={loading} refetch={refetch} onEdit={handleEditClick} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
