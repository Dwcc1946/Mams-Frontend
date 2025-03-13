import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { UploadAvatar } from 'src/components/upload';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from './schema';
import { fData } from 'src/utils/format-number';
import { toast } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';
import dayjs from 'dayjs';
import { submitUserForm } from 'src/api/admin/User';

export const defaultValues = {
  avatarUrl: '',
  firstName: '',
  middleName: '',
  lastName: '',
  dob: null,
  placeOfBirth: '',
  gender: '',
  civilStatus: '',
  nationality: 'Filipino',
  presentAddress: {
    region: '',
    province: '',
    municipality: '',
    address: '',
    zipCode: '',
  },
  permanentAddress: {
    region: '',
    province: '',
    municipality: '',
    address: '',
    zipCode: '',
  },
  contactNo: '',
  religion: '',
  height: '',
  weight: '',
  bloodType: '',
  position: '',
  username: '',
  password: '',
  password_confirmation: '',
};

const UserForm = ({ refetch, editMode, userData, setEditMode }) => {
  const password = useBoolean();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const [isSameAddress, setIsSameAddress] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const onSubmit = (data) => {
    const userId = editMode ? userData.id : null;
    const promise = submitUserForm(data, userId).then((msg) => {
      handleReset(); // Reset the form
      refetch(); // Refresh data
      setEditMode(false); // Close modal if in edit mode
      return msg; // Return the success message
    });

    toast.promise(promise, {
      loading: editMode ? 'Updating...' : 'Submitting...',
      success: (msg) => msg,
      error: (error) => `Error: ${error.message}`,
      closeButton: false,
    });
  };

  useEffect(() => {
    if (editMode && userData) {
      console.log('Editing user:', userData);
      setValue('firstName', userData.firstName);
      setValue('middleName', userData.middleName);
      setValue('lastName', userData.lastName);
      setValue('placeOfBirth', userData.placeOfBirth);
      setValue('civilStatus', userData.civilStatus);
      setValue('nationality', userData.nationality);
      setValue('contactNo', userData.contactNo);
      setValue('gender', userData.gender);
      setValue('religion', userData.religion);
      setValue('height', userData.height);
      setValue('weight', userData.weight);
      setValue('bloodType', userData.bloodType);
      setValue('position', userData.position);
      setValue('username', userData.username);
      setValue('dob', dayjs(userData.dob));
      setValue('presentAddress.region', userData.presentAddress.region);
      setValue('presentAddress.province', userData.presentAddress.province);
      setValue('presentAddress.municipality', userData.presentAddress.municipality);
      setValue('presentAddress.address', userData.presentAddress.address);
      setValue('presentAddress.zipCode', userData.presentAddress.zipCode);
      setValue('permanentAddress.region', userData.permanentAddress.region);
      setValue('permanentAddress.province', userData.permanentAddress.province);
      setValue('permanentAddress.municipality', userData.permanentAddress.municipality);
      setValue('permanentAddress.address', userData.permanentAddress.address);
      setValue('permanentAddress.zipCode', userData.permanentAddress.zipCode);
    } else {
      reset(); // Reset form if not editing
    }
  }, [editMode, userData, setValue, reset]);

  const handleDropAvatar = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        const newUrl = URL.createObjectURL(newFile); // Create URL for the uploaded file
        setValue('avatarUrl', newUrl); // Update avatarUrl in react-hook-form
        setAvatarUrl(newUrl); // Update local avatarUrl state
      }
    },
    [setValue]
  );

  const renderLabel = (text) => (
    <Typography component="span">
      {text}
      <Typography component="span" color="error">
        *
      </Typography>
    </Typography>
  );

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsSameAddress(isChecked);

    if (isChecked) {
      const presentAddress = getValues('presentAddress'); // Get present address values from the form
      setValue('permanentAddress', presentAddress); // Use a single call to set entire object
    } else {
      setValue('permanentAddress', {
        region: '',
        province: '',
        municipality: '',
        address: '',
        zipCode: '',
      });
    }
  };

  const handleReset = () => {
    setEditMode(false);
    reset();
    setAvatarUrl(null);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Profile Picture */}
          <Grid item xs={12} sm={14}>
            <Typography variant="body1" align="center">
              Profile Picture
            </Typography>
            <Controller
              name="avatarUrl"
              control={control}
              render={({ field }) => (
                <UploadAvatar
                  value={field.value}
                  onDrop={handleDropAvatar}
                  validator={(fileData) => {
                    if (fileData.size > 1000000) {
                      return { code: 'file-too-large', message: `File is larger than ${fData(1000000)}` };
                    }
                    return null;
                  }}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{ mt: 3, mx: 'auto', display: 'block', textAlign: 'center', color: 'text.disabled' }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              )}
            />
          </Grid>

          <Divider sx={{ width: '100%', marginY: 2 }} />

          {/* First Name */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="firstName"
              control={control}
              defaultValue="" // Default value set to blank
              render={({ field }) => (
                <TextField
                  label={renderLabel('First Name')}
                  fullWidth
                  variant="outlined"
                  {...field} // Spread field props
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>

          {/* Middle Name */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="middleName"
              control={control}
              defaultValue="" // Default value set to blank
              render={({ field }) => (
                <TextField
                  label="Middle Name"
                  fullWidth
                  variant="outlined"
                  {...field}
                  error={!!errors.middleName}
                  helperText={errors.middleName?.message}
                />
              )}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="lastName"
              control={control}
              defaultValue="" // Default value set to blank
              render={({ field }) => (
                <TextField
                  label={renderLabel('Last Name')}
                  fullWidth
                  variant="outlined"
                  {...field}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12} sm={2}>
            <Controller
              name="dob"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  label={renderLabel('Date of Birth')}
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
                      error={!!errors.dob}
                      helperText={errors.dob?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          {/* Place of Birth */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="placeOfBirth"
              control={control}
              defaultValue="" // Default value set to blank
              render={({ field }) => (
                <TextField
                  label={renderLabel('Place of Birth')}
                  fullWidth
                  variant="outlined"
                  {...field}
                  error={!!errors.placeOfBirth}
                  helperText={errors.placeOfBirth?.message}
                />
              )}
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="gender"
              control={control}
              defaultValue="" // Default value set to blank
              render={({ field }) => (
                <TextField
                  label={renderLabel('Gender')}
                  select
                  fullWidth
                  variant="outlined"
                  {...field}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Civil Status */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="civilStatus"
              control={control}
              defaultValue="" // Default value set to blank
              render={({ field }) => (
                <TextField
                  label={renderLabel('Civil Status')}
                  select
                  fullWidth
                  variant="outlined"
                  {...field}
                  error={!!errors.civilStatus}
                  helperText={errors.civilStatus?.message}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Nationality */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="nationality"
              control={control}
              defaultValue="" // Default value set to blank
              render={({ field }) => (
                <TextField
                  label={renderLabel('Nationality')}
                  fullWidth
                  variant="outlined"
                  {...field}
                  error={!!errors.nationality}
                  helperText={errors.nationality?.message}
                />
              )}
            />
          </Grid>

          {/* Present Address Header */}
          <Divider sx={{ width: '100%', marginY: 2 }} />
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              PRESENT ADDRESS
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="presentAddress.region"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Region')}
                  select
                  variant="outlined"
                  fullWidth
                  {...field} // Spread field props
                  error={!!errors.presentAddress?.region}
                  helperText={errors.presentAddress?.region?.message}
                >
                  <MenuItem value="NCR">NCR</MenuItem>
                  <MenuItem value="CAR">CAR</MenuItem>
                  <MenuItem value="ARMM">ARMM</MenuItem>
                  <MenuItem value="I">I</MenuItem>
                  <MenuItem value="II">II</MenuItem>
                  <MenuItem value="III">III</MenuItem>
                  <MenuItem value="IV">IV</MenuItem>
                  <MenuItem value="V">V</MenuItem>
                  <MenuItem value="VI">VI</MenuItem>
                  <MenuItem value="VII">VII</MenuItem>
                  <MenuItem value="VIII">VIII</MenuItem>
                  <MenuItem value="IX">IX</MenuItem>
                  <MenuItem value="X">X</MenuItem>
                  <MenuItem value="XI">XI</MenuItem>
                  <MenuItem value="XII">XII</MenuItem>
                  <MenuItem value="XIII">XIII</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Present Address Province */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="presentAddress.province"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Province')}
                  variant="outlined"
                  fullWidth
                  {...field} // Spread field props
                  error={!!errors.presentAddress?.province}
                  helperText={errors.presentAddress?.province?.message}
                />
              )}
            />
          </Grid>

          {/* Present Address Municipality */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="presentAddress.municipality"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Municipality')}
                  variant="outlined"
                  fullWidth
                  {...field} // Spread field props
                  error={!!errors.presentAddress?.municipality}
                  helperText={errors.presentAddress?.municipality?.message}
                />
              )}
            />
          </Grid>

          {/* Present Address */}
          <Grid item xs={12} sm={9}>
            <Controller
              name="presentAddress.address"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Address')}
                  variant="outlined"
                  fullWidth
                  {...field} // Spread field props
                  error={!!errors.presentAddress?.address}
                  helperText={errors.presentAddress?.address?.message}
                />
              )}
            />
          </Grid>

          {/* Present Address Zip Code */}
          <Grid item xs={12} sm={3}>
            <Controller
              name="presentAddress.zipCode"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Zip Code"
                  variant="outlined"
                  fullWidth
                  {...field} // Spread field props
                  error={!!errors.presentAddress?.zipCode}
                  helperText={errors.presentAddress?.zipCode?.message}
                />
              )}
            />
          </Grid>

          {/* Permanent Address Header */}
          <Divider sx={{ width: '100%', marginY: 2 }} />
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              PERMANENT ADDRESS
            </Typography>
          </Grid>

          {/* Same as Residential Address Checkbox */}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={isSameAddress} onChange={handleCheckboxChange} />}
              label="Same as Residential Address"
            />
          </Grid>

          {/* Permanent Address Region */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="permanentAddress.region"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Region')}
                  select
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.permanentAddress?.region}
                  helperText={errors.permanentAddress?.region?.message}
                >
                  <MenuItem value="NCR">NCR</MenuItem>
                  <MenuItem value="CAR">CAR</MenuItem>
                  <MenuItem value="ARMM">ARMM</MenuItem>
                  <MenuItem value="I">I</MenuItem>
                  <MenuItem value="II">II</MenuItem>
                  <MenuItem value="III">III</MenuItem>
                  <MenuItem value="IV">IV</MenuItem>
                  <MenuItem value="V">V</MenuItem>
                  <MenuItem value="VI">VI</MenuItem>
                  <MenuItem value="VII">VII</MenuItem>
                  <MenuItem value="VIII">VIII</MenuItem>
                  <MenuItem value="IX">IX</MenuItem>
                  <MenuItem value="X">X</MenuItem>
                  <MenuItem value="XI">XI</MenuItem>
                  <MenuItem value="XII">XII</MenuItem>
                  <MenuItem value="XIII">XIII</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Permanent Address Province */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="permanentAddress.province"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Province')}
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.permanentAddress?.province}
                  helperText={errors.permanentAddress?.province?.message}
                />
              )}
            />
          </Grid>

          {/* Permanent Address Municipality */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="permanentAddress.municipality"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Municipality')}
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.permanentAddress?.municipality}
                  helperText={errors.permanentAddress?.municipality?.message}
                />
              )}
            />
          </Grid>

          {/* Permanent Address */}
          <Grid item xs={12} sm={9}>
            <Controller
              name="permanentAddress.address"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Address')}
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.permanentAddress?.address}
                  helperText={errors.permanentAddress?.address?.message}
                />
              )}
            />
          </Grid>

          {/* Permanent Address Zip Code */}
          <Grid item xs={12} sm={3}>
            <Controller
              name="permanentAddress.zipCode"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Zip Code"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.permanentAddress?.zipCode}
                  helperText={errors.permanentAddress?.zipCode?.message}
                />
              )}
            />
          </Grid>
          <Divider sx={{ width: '100%', marginY: 2 }} />

          {/* Contact No. */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="contactNo"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Contact No.')}
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.contactNo}
                  helperText={errors.contactNo?.message}
                />
              )}
            />
          </Grid>

          {/* Email Address */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          {/* Religion */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="religion"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Religion"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.religion}
                  helperText={errors.religion?.message}
                />
              )}
            />
          </Grid>

          {/* Height */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="height"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Height"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.height}
                  helperText={errors.height?.message}
                />
              )}
            />
          </Grid>

          {/* Weight */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Weight"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.weight}
                  helperText={errors.weight?.message}
                />
              )}
            />
          </Grid>

          {/* Blood Type */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="bloodType"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Blood Type"
                  select
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.bloodType}
                  helperText={errors.bloodType?.message}
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="AB">AB</MenuItem>
                  <MenuItem value="O">O</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Account Information Header */}
          <Divider sx={{ width: '100%', marginY: 2 }} />
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              ACCOUNT INFORMATION
            </Typography>
          </Grid>

          {/* Position */}
          <Grid item xs={12}>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Position')}
                  select
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.position}
                  helperText={errors.position?.message}
                >
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="Registrar">Registrar</MenuItem>
                  <MenuItem value="Dean">Dean</MenuItem>
                  <MenuItem value="Accountant">Accountant</MenuItem>
                  <MenuItem value="Faculty">Faculty</MenuItem>
                  <MenuItem value="Cashier">Cashier</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Username */}
          <Grid item xs={12}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Username')}
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Password')}
                  variant="outlined"
                  fullWidth
                  type={password.value ? 'text' : 'password'}
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={password.onToggle} edge="end">
                          <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* Confirm Password */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="password_confirmation"
              control={control}
              render={({ field }) => (
                <TextField
                  label={renderLabel('Confirm Password')}
                  variant="outlined"
                  fullWidth
                  type={password.value ? 'text' : 'password'}
                  {...field}
                  error={!!errors.password_confirmation}
                  helperText={errors.password_confirmation?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={password.onToggle} edge="end">
                          <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          <Divider sx={{ width: '100%', marginY: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 3, width: '100%' }}>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              {editMode ? 'Update' : 'Save'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default UserForm;
