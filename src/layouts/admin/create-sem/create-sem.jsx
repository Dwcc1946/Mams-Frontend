import { useState, useEffect } from 'react';
import { toast } from 'src/components/snackbar';
import { Box, Grid, TextField, Button, Container, FormControl, MenuItem } from '@mui/material';
import { DataGridCustom } from './components/create-sem-table';
import CollapsibleCard from '../../../components/collapsible-card/CollapsibleCard';
import { CONFIG } from 'src/config-global';
import { fetchSem, createSem } from 'src/api/admin/CreateSem';

export default function Main() {
  const [formData, setFormData] = useState({
    schoolYear: '',
    semester: '',
    code: '',
  });

  // Fetch school year data
  const { data, error, loading, refetch } = fetchSem();
  const [schoolYears, setSchoolYears] = useState([]);

  useEffect(() => {
    if (data) {
      setSchoolYears(data);
    }
  }, [data]);

  // Update code whenever school year or semester changes
  useEffect(() => {
    const { schoolYear, semester } = formData;
    if (schoolYear && semester) {
      setFormData((prevState) => ({
        ...prevState,
        code: `${schoolYear}${semester}`,
      }));
    }
  }, [formData.schoolYear, formData.semester]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const promise = createSem(formData).then((msg) => {
      setFormData({ schoolYear: '', semester: '', code: '' });
      refetch();
      return msg;
    });

    toast.promise(promise, {
      loading: 'Submitting...',
      success: (msg) => msg,
      error: (error) => `Error: ${error.message}`,
      closeButton: false,
    });
  };

  // Reset form
  const resetData = () => {
    setFormData({ schoolYear: '', semester: '', code: '' });
  };

  return (
    <Container maxWidth={false}>
      {/* Form Section */}
      <CollapsibleCard title="School Year Semester Form">
        <Box sx={{ width: '100%', padding: 2 }}>
          <Grid container spacing={2}>
            {/* School Year Dropdown */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  name="schoolYear" // Updated to use name
                  select
                  label="School Year"
                  variant="outlined"
                  fullWidth
                  value={formData.schoolYear}
                  onChange={handleInputChange}
                  error={!formData.schoolYear && formData.schoolYear !== ''} // Validation for empty field
                >
                  {schoolYears.length > 0 ? (
                    schoolYears.map((sy) => (
                      <MenuItem key={sy.CODE} value={sy.CODE}>
                        {sy.CODE}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled value="">
                      No School Years Available
                    </MenuItem>
                  )}
                </TextField>
              </FormControl>
            </Grid>

            {/* Semester Dropdown */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  name="semester" // Updated to use name
                  select
                  label="Semester"
                  variant="outlined"
                  fullWidth
                  value={formData.semester}
                  onChange={handleInputChange}
                  error={!formData.semester && formData.semester !== ''} // Validation for empty field
                >
                  <MenuItem value="A">Summer</MenuItem>
                  <MenuItem value="B">1st Semester</MenuItem>
                  <MenuItem value="C">2nd Semester</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 2 }}>
            <FormControl fullWidth variant="outlined">
              <TextField
                name="code"
                label="Code"
                variant="outlined"
                fullWidth
                disabled
                value={formData.code}
                sx={{ backgroundColor: '#f5f5f5' }}
              />
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={resetData}>
            Cancel
          </Button>
        </Box>
      </CollapsibleCard>

      {/* Data Table Section */}
      <CollapsibleCard title="School Year Semester List" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={data} loading={loading} refetch={refetch} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
