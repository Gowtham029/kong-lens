import React from 'react';
import DropDown from './DropDown';

const ColumnList = (): JSX.Element => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 100,
          gap: 20,
        }}
      >
        <div>fdsf</div>
        <div>test.com</div>
        <div>
          <DropDown />
        </div>
      </div>
    </div>
  );
};

export default ColumnList;
