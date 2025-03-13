// React and hooks
import React, { useState } from 'react';

// MUI components
import { Box, Container } from '@mui/material';

// Custom components
import CollapsibleCard from '../../../components/collapsible-card/CollapsibleCard';
import { UserTable } from './components/user-table';

// Utility functions and config
import { CONFIG } from 'src/config-global';
import { _mock } from 'src/_mock';

// Fetching hook
import UserForm from './components/user-form';
import { fetchUserList } from 'src/api/admin/User';

const Main = () => {
  const { data, error, loading, refetch } = fetchUserList();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = (row) => {
    setSelectedUser(row); // Set the user data to be edited
    setEditMode(true); // Set edit mode to true
  };

  return (
    <Container maxWidth={false}>
      {/* User Creation Form Section */}
      <CollapsibleCard title={editMode ? 'Update User Info' : 'User Registration Form'} defaultOpen={editMode}>
        <UserForm refetch={refetch} editMode={editMode} userData={selectedUser} setEditMode={setEditMode} />
      </CollapsibleCard>

      {/* DataGrid for Listing Users */}
      <CollapsibleCard title="User List" defaultOpen>
        <Box sx={CONFIG.tableBoxStyle}>
          <UserTable data={data} loading={loading} refetch={refetch} onEdit={handleEditClick} />
        </Box>
      </CollapsibleCard>
    </Container>
  );
};

export default Main;
