/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as React from 'react';
import { Box, Button, Stack, styled, InputLabel } from '@mui/material';

import { useLocation, useParams } from 'react-router-dom';
import { Input, Select, Switch, Typography, Option } from '@mui/joy';
import { TagsInput } from 'react-tag-input-component';
import { useDispatch, useSelector } from 'react-redux';
import { API_RESPONSE_SNACK_MESSAGE, PROCESS_TYPE } from '../Shared/constants';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { SnackBarAlert } from './Features/SnackBarAlert';
import { EditorProps, RouteDetails, toggleProps } from '../interfaces';
import { toastDisable } from '../Actions/toastActions';
import {
  patchCurrentRouteData,
  postCurrentRouteData,
} from '../Actions/routeActions';
import Spinner from './Features/spinner/Spinner';

const StyledButton = styled(Button)({
  backgroundColor: '#1ABB9C',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1AAA9C',
  },
});

function ToggleComponent({ yes, onChange }: toggleProps): JSX.Element {
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
              <Typography component="span" level="inherit" sx={{ ml: '4px' }}>
                YES
              </Typography>
              <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                NO
              </Typography>
            </>
          ),
        },
      }}
      sx={{
        '--Switch-thumbSize': '27px',
        '--Switch-trackWidth': '64px',
        '--Switch-trackHeight': '31px',
        display: 'flex',
        justifyContent: 'flex-start',
        margin: '8px 0px',
      }}
    />
  );
}

const RouteEditor = ({ content, textFields }: EditorProps): JSX.Element => {
  const dispatch = useDispatch();

  const processData = (
    data: RouteDetails,
    processType: string
  ): RouteDetails => {
    if (processType === PROCESS_TYPE.PRE_PROCESS) {
      const keyList = Object.keys(data);
      for (let i = 0; i < keyList.length; i += 1) {
        const key = keyList[i];
        if (
          data[key as keyof typeof data] === null ||
          data[key as keyof typeof data] === undefined
        )
          data = { ...data, [key]: '' };
      }
      if (Object.keys(data.headers).length === 0) {
        data = { ...data, headers: [] };
      } else if (data.headers) {
        const headers = [];
        const keys = Object.keys(data.headers);
        for (let j = 0; j < keys.length; j += 1) {
          headers.push(keys[j].concat(`:${data.headers[keys[j]]}`));
        }
        data = { ...data, headers };
      }
    } else {
      if (
        data.protocols.length !== 0 &&
        data.sources.length === 0 &&
        data.destinations.length === 0
      ) {
        data = { ...data, sources: null, destinations: null };
      }
      if (data.headers.length === 0) data = { ...data, headers: {} };
      else {
        try {
          const header = data.headers;
          const res: any = {};
          for (let i = 0; i < header.length; i += 1) {
            const current = header[i].split(':');
            res[current[0]] = current[1].split(',');
          }
          data = { ...data, headers: res };
        } catch (error) {
          dispatch({
            type: ACTION_TYPES.TOAST_NOTIFICATION,
            payload: {
              message: API_RESPONSE_SNACK_MESSAGE.incorrectHeader,
              severity: 'error',
            },
          });
        }
      }
    }
    return data;
  };

  const { id } = useParams();

  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const param = query.get('newId') === 'true';

  const { currentRouteData } = useSelector((state: any) => state.routeReducer);

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const loadingData = useSelector((state: any) => state.loadingData);

  content = processData(content, PROCESS_TYPE.PRE_PROCESS);

  const [formData, setFormData] = React.useState(content);

  const handleOnChange = (e: {
    preventDefault: any;
    target: { name: any; type: any; value: any };
  }): void => {
    e.preventDefault;
    const { name, type, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === 'number'
          ? parseInt(value === undefined ? 0 : value, 10)
          : value,
    });
  };

  const handleOnCancel = (): void => {
    setFormData(processData(currentRouteData, PROCESS_TYPE.PRE_PROCESS));
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_ROUTE_DATA,
      payload: currentRouteData,
    });
  };

  const handleToggle = (key: string): void => {
    const values = {
      strip_path: formData.strip_path,
      preserve_host: formData.preserve_host,
    };
    setFormData({
      ...formData,
      [key]: values[key as keyof typeof values],
    });
  };

  const handleListChange = (
    key: keyof typeof content,
    value: string[]
  ): void => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handlePathHandling = (): void => {
    const value = formData.path_handling === 'v1' ? 'v0' : 'v1';
    setFormData({
      ...formData,
      path_handling: value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const request: RouteDetails = processData(
      formData,
      PROCESS_TYPE.POST_PROCESS
    );
    if (!param) {
      dispatch(patchCurrentRouteData(request, id as string));
    } else {
      request.service = {
        id,
      };
      dispatch(postCurrentRouteData(request));
    }
  };

  return (
    <>
      <SnackBarAlert
        open={isOpen}
        message={toastMessage.message}
        severity={toastMessage.severity}
        handleClose={() => {
          dispatch(toastDisable());
        }}
      />
      <br />
      {loadingData ? (
        <Spinner />
      ) : (
        <Box
          sx={{
            width: '100%',
            gap: '24px',
            margin: 'auto',
          }}
        >
          <form onSubmit={handleOnSubmit}>
            <Stack
              sx={{
                width: '80%',
                gap: '24px',
                margin: 'auto',
              }}
            >
              {textFields.map((text, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index}>
                  <InputLabel sx={{ fontSize: 16, color: '#1ABB9C' }}>
                    {text.key.charAt(0).toUpperCase() +
                      text.key.slice(1).replace('_', ' ')}
                  </InputLabel>
                  {text.type === 'checkbox' && (
                    <div style={{ display: 'block' }}>
                      <ToggleComponent
                        yes={formData[text.key as keyof typeof content]}
                        onChange={() => handleToggle(text.key)}
                      />
                    </div>
                  )}
                  {text.type === 'list' && (
                    <div style={{ maxWidth: 700 }}>
                      <TagsInput
                        value={formData[text.key as keyof typeof content]}
                        onChange={(e) => {
                          handleListChange(text.key as keyof typeof content, e);
                        }}
                      />
                    </div>
                  )}
                  {text.type === 'dropdown' && (
                    <Select
                      sx={{ maxWidth: 700 }}
                      defaultValue={formData[text.key as keyof typeof content]}
                      value={formData[text.key as keyof typeof content]}
                      onChange={handlePathHandling}
                    >
                      <Option value="v1">v1</Option>
                      <Option value="v0">v0</Option>
                    </Select>
                  )}
                  {(text.type === 'number' || text.type === 'text') && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: 700,
                      }}
                    >
                      <Input
                        sx={{
                          borderRadius: '5px',
                        }}
                        name={text.key}
                        value={formData[text.key as keyof typeof content]}
                        disabled={text.key === 'id'}
                        onChange={handleOnChange}
                      />
                    </div>
                  )}
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#B2B2B2',
                      maxWidth: 700,
                      display: 'flex',
                    }}
                  >
                    {text.value}
                  </span>
                </div>
              ))}
            </Stack>
            <Box
              sx={{
                padding: '20px',
                width: '100%',
                justifyContent: 'center',
                gap: '16px',
                margin: 'auto',
                display: 'flex',
              }}
            >
              <StyledButton variant="contained" onClick={handleOnCancel}>
                Cancel
              </StyledButton>
              <StyledButton variant="contained" type="submit">
                Submit
              </StyledButton>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
};

export default RouteEditor;
