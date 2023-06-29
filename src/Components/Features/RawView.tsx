import React from 'react';
import {
  ModalClose,
  Typography,
  Modal,
  ModalOverflow,
  ModalDialog,
} from '@mui/joy';

import { RawViewProps } from '../../interfaces';

export const RawView = ({ json, open, onClose }: RawViewProps): JSX.Element => {
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
          >
            Raw View
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
