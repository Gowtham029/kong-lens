import * as React from 'react';
import parse from 'html-react-parser';
import Box from '@mui/material/Box';
import { PageHeaderDescProps } from '../../interfaces';

const PageHeaderBox = ({
  header,
  description,
  component,
}: PageHeaderDescProps): JSX.Element => {
  React.useEffect(() => {
    //
  }, [header]);
  return (
    <Box
      sx={{
        bgcolor: '#EDEDED',
        padding: '15px',
        width: '1250px',
        height: '110px',
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
      }}
    >
      <h3 style={{ fontSize: '28px', margin: '10px 0 11.5px' }}>{header}</h3>
      {description && (
        <p
          style={{
            fontSize: '14px',
            color: '#a6a6a6',
            margin: '5px 0 10px',
          }}
        >
          {parse(description)}
        </p>
      )}
      {component}
    </Box>
  );
};

export default function PageHeader({
  header,
  description,
  component,
}: PageHeaderDescProps): JSX.Element {
  return (
    <PageHeaderBox
      header={header}
      description={description}
      component={component}
    />
  );
}
