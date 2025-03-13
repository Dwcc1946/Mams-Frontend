import { useState } from 'react';
import { toast } from 'src/components/snackbar';
import { Box, Grid, TextField, Button, Container } from '@mui/material';
import { DataGridCustom } from './components/school-year-table';
import CollapsibleCard from '../../../components/collapsible-card/CollapsibleCard';
import { CONFIG } from 'src/config-global';
import { fetchSchoolYear, createSchoolYear } from 'src/api/admin/SchoolYear';

// ----------------------------------------------------------------------

export default function Main() {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
  });
  const [editMode, setEditMode] = useState(false); // State to control the edit modal visibility
  const { data, error, loading, refetch } = fetchSchoolYear();

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission (create or edit)
  const handleSubmit = async () => {
    const promise = createSchoolYear(formData, editMode).then((msg) => {
      setFormData({ code: '', description: '' });
      refetch();
      setEditMode(false);
      return msg;
    });

    toast.promise(promise, {
      loading: editMode ? 'Updating...' : 'Submitting...',
      success: (msg) => msg,
      error: (error) => `Error: ${error.message}`,
      closeButton: false,
    });
  };

  // Open edit modal with selected data
  const handleEditClick = (row) => {
    setFormData({ code: row.CODE, description: row.DESCRIPTION });
    setEditMode(true); // Set edit mode
  };

  // Close the modal
  const resetData = () => {
    setEditMode(false);
    setFormData({ code: '', description: '' }); // Reset form data
  };

  return (
    <Container maxWidth={false}>
      {/* Form Section */}
      <CollapsibleCard title={editMode ? 'Edit School Year' : 'School Year Creation'} defaultOpen={editMode}>
        <Box sx={{ width: '100%', padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="code"
                fullWidth
                variant="outlined"
                label="Code"
                value={formData.code}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="description"
                fullWidth
                variant="outlined"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {editMode ? 'Update' : 'Save'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={resetData}>
              Cancel
            </Button>
          </Box>
        </Box>
      </CollapsibleCard>

      {/* Data Table Section */}
      <CollapsibleCard title="School Year List" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={data} loading={loading} refetch={refetch} onEdit={handleEditClick} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
