import { Box, Grid, TextField, Button, Container, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import { DataGridCustom } from '../../../components/data-grid/school-year-table';
import { _mock } from 'src/_mock';
import CollapsibleCard from '../../../components/collapsible-card/CollapsibleCard';
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
  const [eptSubject, setEptSubject] = useState('');
  const [englishSubject, setEnglishSubject] = useState('');
  return (
    <Container maxWidth={false}>
      {/* Form Section */}
      <CollapsibleCard title="EPT Subject Form">
        <Box sx={{ width: '100%', padding: 2 }}>
          <Grid container spacing={2}>
            {/* EPT Subject Dropdown */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="ept-subject"
                  select
                  label="EPT Subject"
                  value={eptSubject}
                  onChange={(e) => setEptSubject(e.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="EPT 101">EPT 101</MenuItem>
                  <MenuItem value="EPT 102">EPT 102</MenuItem>
                  <MenuItem value="EPT 103">EPT 103</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            {/* Equivalent English Subject Dropdown */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="english-subject"
                  select
                  label="Equivalent English Subject"
                  value={englishSubject}
                  onChange={(e) => setEnglishSubject(e.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="English 101">English 101</MenuItem>
                  <MenuItem value="English 102">English 102</MenuItem>
                  <MenuItem value="English 103">English 103</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Action Buttons */}
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
      <CollapsibleCard title="EPT Subject" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={_dataGrid} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
