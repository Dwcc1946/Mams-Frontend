import { useState, useEffect } from 'react';

import List from '@mui/material/List';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

import { Iconify } from 'src/components/iconify';
import { courseList } from 'src/api/admin/Room';

// ----------------------------------------------------------------------

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

// ----------------------------------------------------------------------

export function RoomTransferList() {
  const [checked, setChecked] = useState([]);

  const { data: courses } = courseList();

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    if (courses) {
      setLeft(courses);
    }
  }, [courses]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card sx={{ borderRadius: 1.5 }}>
      <CardHeader
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'All items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
        sx={{ p: 2 }}
      />

      <Divider />

      <List
        dense
        component="div"
        role="list"
        sx={{
          width: {
            xs: '100%',
            sm: 400,
            md: 500,
            lg: 650,
          },
          overflow: 'auto',
          maxHeight: 300,
        }}
      >
        {items.map((value) => (
          <ListItemButton key={courses.ID} role="listitem" onClick={handleToggle(courses.ID)}>
            <ListItemIcon>
              <Checkbox
                disableRipple
                checked={checked.indexOf(courses.ID) !== -1}
                tabIndex={-1}
                inputProps={{ 'aria-labelledby': `transfer-list-all-item-${courses.ID}-label` }}
              />
            </ListItemIcon>
            <ListItemText id={`transfer-list-all-item-${courses.ID}-label`} primary={courses.DESCRIPTION} />
          </ListItemButton>
        ))}
      </List>
    </Card>
  );

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ width: 'auto', p: 3 }}>
      <Grid>{customList('Choices', left)}</Grid>

      <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
          aria-label="move selected right"
          sx={{ my: 1 }}
        >
          <Iconify icon="eva:arrow-ios-forward-fill" width={18} />
        </Button>

        <Button
          color="inherit"
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
          aria-label="move selected left"
          sx={{ my: 1 }}
        >
          <Iconify icon="eva:arrow-ios-back-fill" width={18} />
        </Button>
      </Grid>

      <Grid>{customList('Chosen', right)}</Grid>
    </Grid>
  );
}
