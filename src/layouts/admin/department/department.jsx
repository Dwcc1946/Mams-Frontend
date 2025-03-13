import { Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Container } from '@mui/material';
import { DataGridCustom } from '../../components/data-grid/school-year-table';
import { _mock } from 'src/_mock';
import CollapsibleCard from '../../components/collapsible-card/CollapsibleCard';
import { CONFIG } from 'src/config-global';

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
  return (
    <Container maxWidth={false}>
      {/* Form Section */}
      <CollapsibleCard title="Department Form">
        <Box sx={{ width: '100%', padding: 2 }}>
          <Grid container spacing={2}>
            {/* Department Code Input */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <TextField id="department-code" label="Department Code" variant="outlined" fullWidth />
              </FormControl>
            </Grid>

            {/* Department Name Input */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <TextField id="department-name" label="Department Name" variant="outlined" fullWidth />
              </FormControl>
            </Grid>

            {/* Campus Dropdown */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="campus-label">Campus</InputLabel>
                <Select labelId="campus-label" id="campus" label="Campus">
                  <MenuItem value="Campus 1">Campus 1</MenuItem>
                  <MenuItem value="Campus 2">Campus 2</MenuItem>
                  {/* Add more options here */}
                </Select>
              </FormControl>
            </Grid>

            {/* Program Type Dropdown */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="program-type-label">Program Type</InputLabel>
                <Select labelId="program-type-label" id="program-type" label="Program Type">
                  <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                  <MenuItem value="Graduate">Graduate</MenuItem>
                  {/* Add more options here */}
                </Select>
              </FormControl>
            </Grid>

            {/* Chairperson Dropdown */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="chairperson-label">Chairperson</InputLabel>
                <Select labelId="chairperson-label" id="chairperson" label="Chairperson">
                  <MenuItem value="Chairperson 1">Chairperson 1</MenuItem>
                  <MenuItem value="Chairperson 2">Chairperson 2</MenuItem>
                  {/* Add more options here */}
                </Select>
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
      <CollapsibleCard title="Department" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={_dataGrid} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
