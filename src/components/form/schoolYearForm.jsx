import { Box, Grid, TextField, Button, Container, InputLabel } from '@mui/material';

function MyForm() {
  return (
    <Container sx={{ maxWidth: 600, margin: 'auto', padding: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={3}>
          <InputLabel sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            Code
          </InputLabel>
        </Grid>
        <Grid item xs={9}>
          <TextField fullWidth variant="outlined" />
        </Grid>

        <Grid item xs={3}>
          <InputLabel sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            Description
          </InputLabel>
        </Grid>
        <Grid item xs={9}>
          <TextField fullWidth variant="outlined" />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 3 }}>
        <Button variant="contained" color="primary">
          Save
        </Button>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
      </Box>
    </Container>
  );
}

export default MyForm;
