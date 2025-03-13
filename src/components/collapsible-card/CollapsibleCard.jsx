import React, { useState, useEffect } from 'react';
import { Card, CardHeader, IconButton, Collapse, Box } from '@mui/material';
import ICONS from '../iconify/icons';

const CollapsibleCard = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Effect to update the local state when defaultOpen changes
  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev); // Toggle the open state
  };

  return (
    <Card sx={{ width: '100%', margin: 0, padding: 0, mb: 4 }}>
      <CardHeader
        title={title}
        sx={{
          mb: 1,
          backgroundColor: (theme) => theme.palette.primary.main,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          padding: '10px 16px',
        }}
        action={<IconButton onClick={handleToggle}>{isOpen ? ICONS.arrowup : ICONS.arrowdown}</IconButton>}
      />
      <Collapse in={isOpen}>
        <Box sx={{ width: '100%', height: 'auto', padding: 3, borderRadius: 2 }}>{children}</Box>
      </Collapse>
    </Card>
  );
};

export default CollapsibleCard;
