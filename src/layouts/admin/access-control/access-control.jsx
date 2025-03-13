import { Box, Container, Typography } from '@mui/material';
import { DataGridCustom } from '../../../components/data-grid/school-year-table';
import { _mock } from 'src/_mock';

const _dataGrid = [...Array(20)].map((_, index) => {
  const status = (index % 2 && 'online') || (index % 3 && 'alway') || (index % 4 && 'busy') || 'offline';

  return {
    id: _mock.id(index),
    status,
    email: _mock.email(index),
    name: _mock.fullName(index),
    age: _mock.number.age(index),
    lastLogin: _mock.time(index),
    isAdmin: _mock.boolean(index),
    lastName: _mock.lastName(index),
    rating: _mock.number.rating(index),
    firstName: _mock.firstName(index),
    performance: _mock.number.percent(index),
  };
});

export default function Main() {
  return (
    <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
      {/* Data Table Section */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1500,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
          borderColor: 'grey.300',
          height: 800,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <DataGridCustom data={_dataGrid} />
      </Box>
    </Container>
  );
}
