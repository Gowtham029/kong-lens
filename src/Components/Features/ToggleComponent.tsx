import * as React from 'react';
import { Switch } from '@mui/joy';
import { toggleProps } from '../../interfaces';

export const ToggleComponent = ({
  yes,
  onChange,
  size,
}: toggleProps): JSX.Element => {
  const [checked, setChecked] = React.useState<boolean>(yes);
  return (
    <Switch
      checked={checked}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        setChecked(value);
        onChange();
      }}
      slotProps={{
        track: {
          children: (
            <>
              {/* <Typography
                component="span"
                level="inherit"
                sx={{
                  ml: size ? '5px' : '4px',
                  fontSize: size ? '10px' : '16px',
                }}
              >
                YES
              </Typography> */}
              {/* <Typography
                component="span"
                level="inherit"
                sx={{
                  mr: !checked && size ? '2px' : '8px',
                  ml: checked && size ? '5px' : '4px',
                  fontSize: size ? '10px' : '16px',
                }}
              >
                {checked ? 'YES' : 'NO'}
              </Typography> */}
            </>
          ),
        },
      }}
      sx={{
        '--Switch-thumbSize': size ? '17px' : '27px',
        '--Switch-trackWidth': size ? '48px' : '64px',
        '--Switch-trackHeight': size ? '24px' : '31px',
        display: 'flex',
        justifyContent: 'flex-start',
        margin: '8px 0px',
      }}
    />
  );
};
