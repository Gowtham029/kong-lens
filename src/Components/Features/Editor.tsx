/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as React from 'react';
import { Box, Button, Stack, styled } from '@mui/material';
import { FormLabel } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { toastDisable } from '../../Actions/toastActions';
import { SnackBarAlert } from './SnackBarAlert';
import Spinner from './spinner/Spinner';
import { GetTextFields } from './TextFields';
import { EditorProps } from '../../interfaces';

const StyledButton = styled(Button)({
  backgroundColor: '#1ABB9C',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1AAA9C',
  },
});

const Editor = ({
  content,
  textFields,
  handleOnCancel,
  handleOnSubmit,
  formData,
  setFormData,
  requiredCancel,
  submitText,
}: EditorProps): JSX.Element => {
  const dispatch = useDispatch();

  const loadingData = useSelector((state: any) => state.loadingData);

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

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
            width: '1000px',
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
                <div key={text.key}>
                  <FormLabel sx={{ fontSize: 16, color: '#1ABB9C' }}>
                    {text.key.charAt(0).toUpperCase() +
                      text.key.slice(1).replaceAll('_', ' ')}
                  </FormLabel>
                  <GetTextFields
                    text={text}
                    formData={formData}
                    setFormData={setFormData}
                    content={content}
                  />
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#B2B2B2',
                      maxWidth: 800,
                    }}
                  >
                    {parse(text.help)}
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
              {requiredCancel && (
                <StyledButton variant="contained" onClick={handleOnCancel}>
                  Cancel
                </StyledButton>
              )}
              <StyledButton variant="contained" type="submit">
                {submitText}
              </StyledButton>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
};

export default Editor;
