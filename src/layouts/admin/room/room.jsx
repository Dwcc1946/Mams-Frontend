import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Button,
  Container,
  Divider,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { DataGridCustom } from './component/room-table';
import CollapsibleCard from '../../../components/collapsible-card/CollapsibleCard';
import { CONFIG } from 'src/config-global';
import { RoomTransferList } from '../../../components/transfer-list/room';
import { fetchRoom, campusList, buildingList, createRoom } from 'src/api/admin/Room';
import { toast } from 'src/components/snackbar';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

const roomSchema = zod.object({
  code: zod.string().min(1, 'Code is required'),
  description: zod.string().min(1, 'Description is required'),
  campus: zod.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    zod.number({ required_error: 'Campus is required' })
  ),
  building: zod.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    zod.number({ required_error: 'Building is required' })
  ),
  floor: zod.string().min(1, 'Floor is required'),
  capacity: zod.string().min(1, 'Capacity is required'),
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
    resolver: zodResolver(roomSchema),
    defaultValues: {
      code: '',
      description: '',
      campus: '',
      building: '',
      floor: '',
      capacity: '',
      roomType: 'yes',
      scheduleConflict: 'Exclude',
    },
  });

  const [editMode, setEditMode] = useState(false);
  const { data, loading, refetch } = fetchRoom();
  const { data: campuses } = campusList();
  const { data: buildings } = buildingList();
  const [assignedCourses, setAssignedCourses] = useState([]);

  const onSubmit = (formData) => {
    const roomId = editMode ? formData.id : null;

    const payload = {
      ...formData,
      assignedCourses,
    };

    const promise = createRoom(payload, roomId).then((msg) => {
      handleReset();
      refetch();
      return msg;
    });

    toast.promise(promise, {
      loading: editMode ? 'Updating...' : 'Submitting...',
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
      <CollapsibleCard title={editMode ? 'Update Room Info' : 'Create Room'} defaultOpen={editMode}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: '100%', padding: 2 }}>
            <Grid container spacing={2}>
              {/* Code and Description Inputs */}
              <Grid item xs={6}>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Code"
                      variant="outlined"
                      fullWidth
                      error={!!errors.code}
                      helperText={errors.code?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      variant="outlined"
                      fullWidth
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              {/* Campus and Building Dropdowns */}
              <Grid item xs={6}>
                <Controller
                  name="campus"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Campus"
                      variant="outlined"
                      fullWidth
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
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="building"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Building"
                      variant="outlined"
                      fullWidth
                      error={!!errors.building}
                      helperText={errors.building?.message}
                    >
                      {buildings.map((building) => (
                        <MenuItem key={building.ID} value={building.ID}>
                          {building.NAME}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Floor and Capacity Inputs */}
              <Grid item xs={6}>
                <Controller
                  name="floor"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Floor"
                      variant="outlined"
                      fullWidth
                      error={!!errors.floor}
                      helperText={errors.floor?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="capacity"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Capacity"
                      variant="outlined"
                      fullWidth
                      error={!!errors.capacity}
                      helperText={errors.capacity?.message}
                    />
                  )}
                />
              </Grid>

              <Divider sx={{ width: '100%', marginY: 2 }} />

              {/* Room Type Radio Buttons */}
              <Grid item xs={6}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Room Type</FormLabel>
                  <Controller
                    name="roomType"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel value="no" control={<Radio />} label="Not-Air Conditioned" />
                        <FormControlLabel value="yes" control={<Radio />} label="Air Conditioned" />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Schedule Conflict Radio Buttons */}
              <Grid item xs={6}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Schedule Conflict</FormLabel>
                  <Controller
                    name="scheduleConflict"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup row value={field.value} onChange={(e) => field.onChange(e.target.value)}>
                        <FormControlLabel value="Include" control={<Radio />} label="Include" />
                        <FormControlLabel value="Exclude" control={<Radio />} label="Exclude" />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>

              <Divider sx={{ width: '100%', marginY: 2 }} />

              {/* Course Assignment */}
              <Box sx={{ mt: 4, width: '100%' }}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Course Assignment</FormLabel>
                  <RoomTransferList onChange={setAssignedCourses} />
                </FormControl>
              </Box>
            </Grid>

            <Divider sx={{ width: '100%', marginY: 2 }} />

            {/* Action Buttons */}
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

      {/* Data Table Section */}
      <CollapsibleCard title="Room" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={data} loading={loading} refetch={refetch} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
