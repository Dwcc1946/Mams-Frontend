import React, { useState, useCallback } from 'react';
import { Box, Grid, TextField, Button, Typography, Container } from '@mui/material';
import CollapsibleCard from '../../../components/collapsible-card/CollapsibleCard';
import { UploadAvatar } from '../../../components/upload';
import { fData } from 'src/utils/format-number';

export default function Main() {
  const [logoUrl, setLogoUrl] = useState(null);

  const handleDropLogo = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setLogoUrl(newFile);
  }, []);

  return (
    <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Company Profile
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
          borderColor: 'grey.300',
          marginTop: 10,
        }}
      >
        <Grid container spacing={2}>
          {/* Company Logo Uploader */}
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Company Logo
            </Typography>
            <UploadAvatar
              value={logoUrl}
              onDrop={handleDropLogo}
              validator={(fileData) => {
                if (fileData.size > 1000000) {
                  return { code: 'file-too-large', message: `File is larger than ${fData(1000000)}` };
                }
                return null;
              }}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Grid>

          {/* School Name, Address, Phone Inputs */}
          <Grid item xs={4}>
            <TextField id="school-name" label="School Name" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField id="school-address" label="School Address" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField id="school-phone" label="School Phone" variant="outlined" fullWidth />
          </Grid>
        </Grid>

        {/* Action Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 3 }}>
          <Button variant="contained" color="primary">
            Update Company Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
