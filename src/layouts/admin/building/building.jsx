import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Grid, TextField, Button, Container, FormControl, MenuItem } from '@mui/material';
import { DataGridCustom } from './component/building-table';
import CollapsibleCard from '../../../components/collapsible-card/CollapsibleCard';
import { CONFIG } from 'src/config-global';
import { fetchBuilding, createBuilding } from 'src/api/admin/Building';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { campusAssignList } from 'src/api/admin/User';
import { toast } from 'src/components/snackbar';

const buildingSchema = zod.object({
  id: zod.number().optional(),
  code: zod.string().min(1, 'Code is required'),
  description: zod.string().min(1, 'Description is required'),
  campus: zod.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    zod.number({ required_error: 'Campus is required' })
  ),
});

export default function Main() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(buildingSchema),
    defaultValues: {
      code: '',
      description: '',
      campus: '',
    },
  });

  const [editMode, setEditMode] = useState(false);
  const { data, loading, refetch } = fetchBuilding();
  const { data: campuses } = campusAssignList();
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const onSubmit = (data) => {
    const buildingId = editMode ? data.id : null;
    const promise = createBuilding(data, buildingId).then((msg) => {
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

  const handleEdit = (row) => {
    console.log(row);
    setSelectedBuilding(row);
    setEditMode(true);
  };

  useEffect(() => {
    if (editMode && selectedBuilding) {
      setValue('id', selectedBuilding.id);
      setValue('code', selectedBuilding.code);
      setValue('description', selectedBuilding.name);
      setValue('campus', selectedBuilding.campusId);
    } else {
      reset();
    }
  }, [editMode, data, setValue, reset]);

  return (
    <Container maxWidth={false}>
      <CollapsibleCard title={editMode ? 'Update building info' : 'Create building'} defaultOpen={editMode}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: '100%', padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <Controller
                    name="code"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="code"
                        label="Code"
                        variant="outlined"
                        fullWidth
                        error={!!errors.code}
                        helperText={errors.code?.message}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <Controller
                    name="campus"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="campus"
                        select
                        label="Campus"
                        variant="outlined"
                        fullWidth
                        {...register('campus')}
                        error={!!errors.campus}
                        helperText={errors.campus?.message}
                      >
                        {campuses.map((campus) => (
                          <MenuItem key={campus.ID} value={campus.ID}>
                            {campus.NAME}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                {editMode ? 'Update' : 'Save'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleReset}>
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </CollapsibleCard>

      <CollapsibleCard title="Building" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={data} loading={loading} refetch={refetch} onEdit={handleEdit} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
