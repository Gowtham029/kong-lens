/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as React from 'react';
import { Box, Button, InputLabel, Stack, styled } from '@mui/material';
import { Input, Select, Option } from '@mui/joy';
import { useParams } from 'react-router-dom';
import { TagsInput } from 'react-tag-input-component';
import { useDispatch, useSelector } from 'react-redux';
import { PROCESS_TYPE } from '../Shared/constants';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { SnackBarAlert } from './Features/SnackBarAlert';
import { RouteDetails, RouteEditorProps } from '../interfaces';
import { toastDisable } from '../Actions/toastActions';
import Spinner from './Features/spinner/Spinner';
import { processRouteData } from '../Utils/ProcessData';
import {
  patchCurrentRouteData,
  postCurrentRouteData,
} from '../Actions/routeActions';
import { ToggleComponent } from './Features/ToggleComponent';

const StyledButton = styled(Button)({
  backgroundColor: '#1ABB9C',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1AAA9C',
  },
});

const RouteEditor = ({
  content,
  textFields,
  param,
}: RouteEditorProps): JSX.Element => {
  const { id } = useParams();

  const dispatch = useDispatch();

  content = processRouteData(content, PROCESS_TYPE.PRE_PROCESS, dispatch);

  const loadingData = useSelector((state: any) => state.loadingData);

  const { currentRouteData } = useSelector((state: any) => state.routeReducer);

  const [formData, setFormData] = React.useState<RouteDetails>(content);

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const handleOnCancel = (): void => {
    setFormData(currentRouteData);
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_ROUTE_DATA,
      payload: currentRouteData,
    });
  };

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
          ? parseInt(value === undefined || Number.isNaN(value) ? 0 : value, 10)
          : value,
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
    const request: RouteDetails = processRouteData(
      formData,
      PROCESS_TYPE.POST_PROCESS,
      dispatch
    );
    if (param) {
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
                    <div style={{ maxWidth: 800 }}>
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
                      sx={{ maxWidth: 800 }}
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
                        maxWidth: 800,
                      }}
                    >
                      <Input
                        sx={{
                          borderRadius: '5px',
                        }}
                        type={text.type}
                        name={text.key}
                        value={formData[text.key as keyof typeof content]}
                        onChange={handleOnChange}
                      />
                    </div>
                  )}
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#B2B2B2',
                      maxWidth: 800,
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
