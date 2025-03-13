import { Box, Grid, TextField, Button, Container, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import { DataGridCustom } from '../../components/data-grid/school-year-table';
import { _mock } from 'src/_mock';
import CollapsibleCard from '../../components/collapsible-card/CollapsibleCard';
import { CONFIG } from 'src/config-global';
import React, { useState } from 'react';

const _dataGrid = [...Array(20)].map((_, index) => {
  return {
    id: _mock.id(index),
    name: _mock.fullName(index),
    age: _mock.number.age(index),
    lastName: _mock.lastName(index),
    rating: _mock.number.rating(index),
    firstName: _mock.firstName(index),
  };
});

export default function Main() {
  const [college, setCollege] = useState('');
  return (
    <Container maxWidth={false}>
      {/* Form Section */}
      <CollapsibleCard title="Course Form">
        <Box sx={{ width: '100%', padding: 2 }}>
          <Grid container spacing={2}>
            {/* Department Dropdown */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="department">Deparment</InputLabel>
                <Select labelId="department" id="department" label="Department">
                  <MenuItem value={1}>Sample</MenuItem>
                  <MenuItem value={2}>Sample</MenuItem>
                  <MenuItem value={3}>Sample</MenuItem>
                  <MenuItem value={4}>Sample</MenuItem>
                  {/* Add more options if needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Course Group Dropdown */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="course-group">Course Group</InputLabel>
                <Select labelId="course-group" id="course-group" label="Course Group">
                  <MenuItem value={1}>Sample</MenuItem>
                  <MenuItem value={2}>Sample</MenuItem>
                  <MenuItem value={3}>Sample</MenuItem>
                  <MenuItem value={4}>Sample</MenuItem>
                  {/* Add more options if needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* No. of Enrollees Input */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="enrollees"
                  label="No. of Enrollees"
                  variant="outlined"
                  type="number" // Ensure numeric input
                  fullWidth
                />
              </FormControl>
            </Grid>

            {/* No. of Years Dropdown */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="no-of-years-label">No. of Years</InputLabel>
                <Select labelId="no-of-years-label" id="no-of-years" label="No. of Years">
                  <MenuItem value={1}>1 Year</MenuItem>
                  <MenuItem value={2}>2 Years</MenuItem>
                  <MenuItem value={3}>3 Years</MenuItem>
                  <MenuItem value={4}>4 Years</MenuItem>
                  {/* Add more options if needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Code Input */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <TextField id="code" label="Code" variant="outlined" fullWidth />
              </FormControl>
            </Grid>

            {/* Description Input */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <TextField id="description" label="Description" variant="outlined" fullWidth />
              </FormControl>
            </Grid>

            {/* Major Input */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <TextField id="major" label="Major" variant="outlined" fullWidth />
              </FormControl>
            </Grid>

            {/* Required HSGWA Input */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <TextField id="required-hsgwa" label="Required HSGWA" variant="outlined" fullWidth />
              </FormControl>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 3 }}>
            <Button variant="contained" color="primary">
              Save
            </Button>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        </Box>
      </CollapsibleCard>

      {/* Data Table Section */}
      <CollapsibleCard title="Course" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={_dataGrid} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
