/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  ModalClose,
  Typography,
  Modal,
  ModalOverflow,
  ModalDialog,
  Button,
} from '@mui/joy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useDispatch, useSelector } from 'react-redux';
import { RawViewProps } from '../../interfaces';
import { toastDisable } from '../../Actions/toastActions';
import { SnackBarAlert } from './SnackBarAlert';
import { ACTION_TYPES } from '../../Shared/actionTypes';
import { API_RESPONSE_SNACK_MESSAGE } from '../../Shared/constants';

export const RawView = ({ json, open, onClose }: RawViewProps): JSX.Element => {
  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );
  const dispatch = useDispatch();
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
    >
      <ModalOverflow>
        <ModalDialog
          aria-labelledby="modal-dialog-overflow"
          sx={{
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            border: '3px solid #1ABB9C',
          }}
        >
          <ModalClose />

          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            sx={{ display: 'flex', gap: '10px' }}
          >
            Raw View
            <CopyToClipboard
              text={JSON.stringify(json, undefined, 2)}
              onCopy={() => {
                dispatch({
                  type: ACTION_TYPES.TOAST_NOTIFICATION,
                  payload: {
                    message: API_RESPONSE_SNACK_MESSAGE.copiedToClipboard,
                    severity: 'success',
                  },
                });
              }}
            >
              <Button sx={{ width: '40px', bgcolor: '#1ABB9C' }}>
                <ContentPasteIcon />
              </Button>
            </CopyToClipboard>
            <SnackBarAlert
              open={isOpen}
              message={toastMessage.message}
              severity={toastMessage.severity}
              handleClose={() => {
                dispatch(toastDisable());
              }}
            />
          </Typography>
          <pre style={{ width: 500, margin: 'auto' }}>
            <Typography id="modal-desc" textColor="text.tertiary">
              {JSON.stringify(json, undefined, 2)}
            </Typography>
          </pre>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};
