import { useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, Container } from '@mui/material';
import { DataGridCustom } from './faculty-type/faculty-type-table';
import CollapsibleCard from '../../../components/collapsible-card/CollapsibleCard';
import { CONFIG } from 'src/config-global';
import { toast } from 'src/components/snackbar';
import { fetchFacultyType, createFacultyType } from 'src/api/admin/FacultyType';

// ----------------------------------------------------------------------

export default function Main() {
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    maxUnitsRegular: '',
    maxUnitsPartTime: '',
    maxUnitsTemporaryLoad: '',
  });

  const [editMode, setEditMode] = useState(false); // State to control edit mode
  const { data, loading, refetch } = fetchFacultyType();

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission (create or edit)
  const handleSubmit = async () => {
    const promise = createFacultyType(formData, editMode).then((msg) => {
      setFormData({
        id: '',
        description: '',
        maxUnitsRegular: '',
        maxUnitsPartTime: '',
        maxUnitsTemporaryLoad: '',
      });
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

  // Open edit mode with selected data
  const handleEditClick = (row) => {
    setFormData({
      id: row.ID, // Include ID for editing
      description: row.DESCRIPTION,
      maxUnitsRegular: row.MAXHR_REG_LOAD,
      maxUnitsPartTime: row.MAXHR_PART_LOAD,
      maxUnitsTemporaryLoad: row.MAXHR_TEMP_LOAD,
    });
    setEditMode(true); // Set edit mode
  };

  // Reset form data and close edit mode
  const resetData = () => {
    setEditMode(false);
    setFormData({
      id: '',
      description: '',
      maxUnitsRegular: '',
      maxUnitsPartTime: '',
      maxUnitsTemporaryLoad: '',
    });
  };

  return (
    <Container maxWidth={false}>
      {/* Form Section */}
      <CollapsibleCard title={editMode ? 'Edit Faculty Type' : 'Faculty Type Form'} defaultOpen={editMode}>
        <Box sx={{ width: '100%', padding: 2 }}>
          <Grid container spacing={2}>
            {/* Faculty Type Description */}
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Faculty Type Description"
                variant="outlined"
                fullWidth
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Max Units (Regular), Max Units (Part-time), Max Units (Temporary Load) */}
            <Grid item xs={4}>
              <TextField
                id="maxUnitsRegular"
                label="Max Units (Regular)"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.maxUnitsRegular}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="maxUnitsPartTime"
                label="Max Units (Part-time)"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.maxUnitsPartTime}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="maxUnitsTemporaryLoad"
                label="Max Units (Temporary Load)"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.maxUnitsTemporaryLoad}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
              marginTop: 3,
            }}
          >
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
      <CollapsibleCard title="Faculty Types" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <DataGridCustom data={data} onEdit={handleEditClick} loading={loading} refetch={refetch} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
}
