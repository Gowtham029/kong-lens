import React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';
import { ModalDialog } from '@mui/joy';
import { DialogModalProps } from '../../interfaces';

const ConfirmDialogModal = ({
  description,
  open,
  onClose,
  onConfirm,
}: DialogModalProps): JSX.Element => (
  <div>
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
      >
        <Typography
          id="alert-dialog-modal-title"
          component="h2"
          startDecorator={<WarningRoundedIcon />}
        >
          CONFIRM
        </Typography>
        <Divider />
        <Typography
          id="alert-dialog-modal-description"
          textColor="text.tertiary"
        >
          {description}
        </Typography>
        <Box
          sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}
        >
          <Button variant="plain" color="neutral" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" color="danger" onClick={onConfirm}>
            Yes! Delete
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  </div>
);

export default function DialogModal({
  description,
  open,
  onClose,
  onConfirm,
}: DialogModalProps): JSX.Element {
  return (
    <ConfirmDialogModal
      open={open}
      description={description}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
