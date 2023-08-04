/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as React from 'react';
import { Box, Button, InputLabel, Stack, styled } from '@mui/material';
import Input from '@mui/joy/Input';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TagsInput } from 'react-tag-input-component';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPES } from '../../Shared/actionTypes';
import { SnackBarAlert } from '../Features/SnackBarAlert';
import { ConsumerDetails, ConsumerEditorProps } from '../../interfaces';
import { toastDisable } from '../../Actions/toastActions';
import Spinner from '../Features/spinner/Spinner';
import {
  patchCurrentConsumerData,
  postCurrentConsumerData,
} from '../../Actions/consumerActions';

const StyledButton = styled(Button)({
  backgroundColor: '#1ABB9C',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1AAA9C',
  },
});

const ConsumerEditor = ({
  content,
  textFields,
}: ConsumerEditorProps): JSX.Element => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const param = query.get('newId') === 'true';

  const loadingData = useSelector((state: any) => state.loadingData);

  const { currentConsumerData } = useSelector(
    (state: any) => state.consumerReducer
  );

  const [formData, setFormData] = React.useState(content);

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const dispatch = useDispatch();

  const handleOnCancel = (): void => {
    setFormData(currentConsumerData);
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_CONSUMER_DATA,
      payload: currentConsumerData,
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
          ? parseInt(value === undefined ? 0 : value, 10)
          : value,
    });
  };

  const handleListChange = (
    key: keyof ConsumerDetails,
    value: string[]
  ): void => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const request = formData;
    if (param) {
      delete request.id;
      dispatch(postCurrentConsumerData(request, navigate));
    } else {
      dispatch(patchCurrentConsumerData(request, id as string));
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
            width: '60%',
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
              {textFields.map((text) => (
                <div
                  key={text.key}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <InputLabel sx={{ fontSize: 16, color: '#1ABB9C' }}>
                    {text.key.charAt(0).toUpperCase() +
                      text.key.slice(1).replace('_', ' ')}
                  </InputLabel>
                  {text.type === 'list' && (
                    <TagsInput
                      value={formData[text.key as keyof ConsumerDetails]}
                      onChange={(e) => {
                        handleListChange(text.key as keyof ConsumerDetails, e);
                      }}
                    />
                  )}
                  {(text.type === 'number' || text.type === 'text') && (
                    <Input
                      sx={{
                        borderRadius: '5px',
                      }}
                      type={text.type}
                      name={text.key}
                      value={formData[text.key as keyof ConsumerDetails]}
                      onChange={handleOnChange}
                    />
                  )}
                  <span style={{ fontSize: '13px', color: '#B2B2B2' }}>
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

export default ConsumerEditor;
