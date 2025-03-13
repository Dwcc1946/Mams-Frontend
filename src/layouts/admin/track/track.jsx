import { Box, Grid, TextField, Button, Container, FormControl, MenuItem } from '@mui/material';
import { DataGridCustom } from '../../../components/data-grid/school-year-table';
import { _mock } from 'src/_mock';
import CollapsibleCard from '../../../components/collapsible-card/CollapsibleCard';
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
      <CollapsibleCard title="Track Form">
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
                <TextField id="description" label="Description" variant="outlined" fullWidth />
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
      <CollapsibleCard title="Track" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={_dataGrid} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
