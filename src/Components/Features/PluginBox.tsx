import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { PluginBoxContainerProps } from '../../interfaces';

const BoxHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
  backgroundColor: '#f2f2f2',
  padding: '0.5rem',
});

// Define styles for the icon in the box header
const BoxIcon = styled(Box)({
  marginRight: '0.5rem',
});

const useStyles = makeStyles({
  root: {
    lineHeight: 2,
    borderRadius: 5,
  },
});

export default function PluginBox({
  icon,
  header,
  chips,
  coloredChipNames,
}: PluginBoxContainerProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box
      sx={{
        borderRadius: '10px',
        border: '1px',
        padding: '0.1rem',
        flex: 1,
        boxShadow: '5px 5px 5px lightgrey',
      }}
    >
      <BoxHeader>
        <BoxIcon>{icon}</BoxIcon>
        <Typography variant="h6" sx={{ color: 'black' }}>
          {header}
        </Typography>
      </BoxHeader>
      <Box>
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: 'wrap', gap: '10px 10px', alignItems: 'flex-start' }}
        >
          {chips.map((chip: string) => (
            <Chip
              className={classes.root}
              key={chip}
              label={chip}
              color={coloredChipNames.includes(chip) ? 'success' : undefined}
            />
          ))}
        </Stack>
        <br />
      </Box>
    </Box>
  );
}
