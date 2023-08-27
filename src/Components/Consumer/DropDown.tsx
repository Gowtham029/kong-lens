import { Button, Select } from '@mui/joy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

const DropDown = (): JSX.Element => {
  return (
    <div>
      <Select placeholder="MORE" size="sm" sx={{ width: 80 }}>
        <Button variant="plain" sx={{ color: 'black' }}>
          <div
            style={{
              width: '120px',
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <VisibilityIcon />
            <div style={{ textAlign: 'left', width: '90px' }}>Raw View</div>
          </div>
        </Button>
        <Button variant="plain" sx={{ color: 'black' }}>
          <div
            style={{
              width: '120px',
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <EditIcon />
            <div style={{ textAlign: 'left', width: '90px' }}>Edit Service</div>
          </div>
        </Button>
      </Select>
    </div>
  );
};

export default DropDown;
