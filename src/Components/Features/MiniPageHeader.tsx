import * as React from 'react';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';
import { PageHeaderIconProps } from '../../interfaces';

const MiniPageHeaderBox = ({
  header,
  icon,
  style,
  button,
}: PageHeaderIconProps): JSX.Element => (
  <Box
    sx={
      style || {
        bgcolor: '#EDEDED',
        padding: '15px',
        width: '1000px',
        height: '110px',
        marginTop: '10px',
        display: 'flex',
      }
    }
  >
    <div
      style={{
        fontSize: '20px',
        margin: style ? '0' : 'auto',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      {icon}
      {parse(header)}
    </div>
    {button || null}
  </Box>
);

export default function MiniPageHeader({
  header,
  icon,
  style,
  button,
}: PageHeaderIconProps): JSX.Element {
  return (
    <MiniPageHeaderBox
      header={header}
      icon={icon}
      button={button}
      style={style}
    />
  );
}
