import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { DatePicker } from '@mui/x-date-pickers';
import { toast } from 'src/components/snackbar';
import {
  campusAssignList,
  facultyTypeList,
  changePassword,
  departmentList,
  facultyAssignment,
} from 'src/api/admin/User';

// Schema for Password Modal
const passwordSchema = zod
  .object({
    password: zod.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: zod.string().min(6, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

// PasswordModal Component
const PasswordModal = ({ open, onClose, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data) => {
    console.log('Data:', data);
    const promise = changePassword(data, id).then((msg) => {
      onClose();
      return msg;
    });

    toast.promise(promise, {
      loading: 'Updating...',
      success: (msg) => msg,
      error: (error) => `Error: ${error.message}`,
      closeButton: false,
    });
  };

  useEffect(() => {
    if (!open) {
      formReset();
    }
  }, [open, formReset]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '50em',
          maxWidth: 'none',
        },
      }}
    >
      <DialogTitle>Set Password</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const facultyAssignmentSchema = zod.object({
  campus: zod.number().min(1, 'Campus is required'),
  department: zod.number().min(1, 'Department is required'),
  facultyType: zod.number().min(1, 'Faculty type is required'),
  programType: zod.string().min(1, 'Program type is required'),
  dateAssigned: zod.custom((date) => date.isValid(), {
    message: 'Date assigned is required',
  }),
  overrideMax: zod.boolean().optional(),
});

// FacultyAssignmentModal Component
const FacultyAssignmentModal = ({ open, onClose, id }) => {
  const { data: campuses } = campusAssignList();
  const { data: facultyTypes } = facultyTypeList();
  const { data: departments } = departmentList();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset: formReset,
  } = useForm({
    resolver: zodResolver(facultyAssignmentSchema),
  });

  const onSubmit = (data) => {
    const promise = facultyAssignment(data, id).then((msg) => {
      onClose();
      return msg;
    });

    toast.promise(promise, {
      loading: 'Submitting...',
      success: (msg) => msg,
      error: (error) => `Error: ${error.message}`,
      closeButton: false,
    });
  };

  useEffect(() => {
    if (!open) {
      formReset({
        campus: '',
        department: '',
        facultyType: '',
        programType: '',
        dateAssigned: null,
        overrideMax: false,
      });
    }
  }, [open, formReset]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '50em',
          maxWidth: 'none',
        },
      }}
    >
      <DialogTitle>Faculty Campus Assignment</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Dropdown for Campus */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="campus"
                label="Campus"
                fullWidth
                margin="normal"
                {...register('campus')}
                error={!!errors.campus}
                helperText={errors.campus ? errors.campus.message : ''}
              >
                {campuses.map((campus) => (
                  <MenuItem key={campus.ID} value={campus.ID}>
                    {campus.NAME}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Dropdown for Department */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="department"
                label="Department"
                fullWidth
                margin="normal"
                {...register('department')}
                error={!!errors.department}
                helperText={errors.department ? errors.department.message : ''}
              >
                {departments.map((department) => (
                  <MenuItem key={department.ID} value={department.ID}>
                    {department.NAME}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Dropdown for Faculty Type*/}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="facultyType"
                label="Faculty Type"
                fullWidth
                margin="normal"
                {...register('facultyType')}
                error={!!errors.facultyType}
                helperText={errors.facultyType ? errors.facultyType.message : ''}
              >
                {facultyTypes.map((facultyType) => (
                  <MenuItem key={facultyType.ID} value={facultyType.ID}>
                    {facultyType.DESCRIPTION}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Dropdown for program */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="programType"
                label="Program Type"
                fullWidth
                margin="normal"
                {...register('programType')}
                error={!!errors.programType}
                helperText={errors.programType ? errors.programType.message : ''}
              >
                <MenuItem value="BASIC">Basic Education</MenuItem>
                <MenuItem value="COLLEGE">College</MenuItem>
                <MenuItem value="GS">GS</MenuItem>
              </TextField>
            </Grid>

            {/* DatePicker for Date Assigned */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="dateAssigned"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    label="Date Assigned"
                    value={field.value || null} // Use field.value directly
                    onChange={(newValue) => {
                      console.log('Selected Date:', newValue); // Log the selected date value
                      field.onChange(newValue); // Pass the Day.js object directly to field.onChange
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        error={!!errors.dateAssigned}
                        helperText={errors.dateAssigned?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* Checkbox for Active Status */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Controller
                    name="overrideMax"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => <Checkbox {...field} checked={field.value} />}
                  />
                }
                label="Override Maximum Units Allowed?"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { PasswordModal, FacultyAssignmentModal };
