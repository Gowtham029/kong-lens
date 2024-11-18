/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  ModalClose,
  Typography,
  Modal,
  ModalOverflow,
  ModalDialog,
  Divider,
  Box,
} from '@mui/joy';
import parse from 'html-react-parser';
import { ModalOpenCLoseProps } from '../../interfaces';

export const ModalForm = ({
  open,
  onClose,
  serviceName,
  component,
  headerDescription,
}: ModalOpenCLoseProps): JSX.Element => {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: '1250px' }}>
        <ModalOverflow>
          <ModalDialog
            aria-labelledby="modal-dialog-overflow"
            sx={{
              maxWidth: 'auto',
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
              border: '3px solid #1ABB9C',
            }}
          >
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
              sx={{ maxWidth: '1000px' }}
            >
              {serviceName}
            </Typography>
            <ModalClose />
            <Divider />
            {headerDescription && (
              <div
                style={{
                  background: '#EDEDED',
                  width: '1000px',
                  padding: '25px',
                  margin: 'auto',
                }}
              >
                {parse(headerDescription)}
              </div>
            )}
            {component}
          </ModalDialog>
        </ModalOverflow>
      </Box>
    </Modal>
  );
};
