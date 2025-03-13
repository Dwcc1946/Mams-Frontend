import { Box, Grid, TextField, Button, Container, FormControl, MenuItem } from '@mui/material';
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
      <CollapsibleCard title="Course Group Form">
        <Box sx={{ width: '100%', padding: 2 }}>
          <Grid container spacing={2}>
            {/* Code Input */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <TextField id="code" label="Code" variant="outlined" fullWidth />
              </FormControl>
            </Grid>

            {/* Description Input */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <TextField id="name" label="Name" variant="outlined" fullWidth />
              </FormControl>
            </Grid>

            {/* College Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="college"
                  select
                  label="College"
                  variant="outlined"
                  fullWidth
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                >
                  <MenuItem value="College 1">College 1</MenuItem>
                  <MenuItem value="College 2">College 2</MenuItem>
                  {/* Add more Colleges as needed */}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 3 }}>
          <Button variant="contained" color="primary">
            Save
          </Button>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </CollapsibleCard>

      {/* Data Table Section */}
      <CollapsibleCard title="Course Group" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={_dataGrid} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
