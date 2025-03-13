import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Container,
  Divider,
} from '@mui/material';
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
  const [mandatory, setMandatory] = useState('');
  const [documentType, setDocumentType] = useState('submission');
  const [applicantType, setApplicantType] = useState('');
  return (
    <Container maxWidth={false}>
      {/* Form Section */}
      <CollapsibleCard title="Document Form">
        <Box sx={{ width: '100%', padding: 2 }}>
          <Grid container spacing={2}>
            {/* Description Input */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <TextField id="description" label="Description" variant="outlined" fullWidth />
              </FormControl>
            </Grid>

            {/* Mandatory Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="mandatory"
                  select
                  label="Mandatory"
                  value={mandatory}
                  onChange={(e) => setMandatory(e.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            {/* Applicant Type Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="applicantType"
                  select
                  label="Applicant Type"
                  value={applicantType}
                  onChange={(e) => setApplicantType(e.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="Domestic">Domestic</MenuItem>
                  <MenuItem value="International">International</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Divider sx={{ width: '100%', marginY: 2 }} />

            {/* Document Type Radio Buttons */}
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <Typography component="legend">Document Type</Typography>
                <RadioGroup row value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                  <FormControlLabel value="submission" control={<Radio />} label="For Submission" />
                  <FormControlLabel value="processing" control={<Radio />} label="For Processing" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Divider sx={{ width: '100%', marginY: 2 }} />
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
      <CollapsibleCard title="Document" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={_dataGrid} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
