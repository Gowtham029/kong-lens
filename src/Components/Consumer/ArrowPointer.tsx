import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type text = {
  text: string;
};
const ArrowPointer = ({ text }: text): JSX.Element => {
  return (
    <div style={{ gap: 15, display: 'flex', width: '100' }}>
      <div>{text}</div>
      <ArrowForwardIcon />
    </div>
  );
};

export default ArrowPointer;
