/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  ModalClose,
  Typography,
  Modal,
  ModalOverflow,
  ModalDialog,
} from '@mui/joy';
import { useSelector } from 'react-redux';
import { CreateRouteProps } from '../../interfaces';
import { ROUTE_TEXT_FIELDS } from '../../Shared/constants';
import RouteEditor from '../Routes/RouteEditor';

export const CreateRoute = ({
  open,
  onClose,
  serviceName,
}: CreateRouteProps): JSX.Element => {
  const routeData = useSelector(
    (state: any) => state.routeReducer.currentRouteData
  );

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
            maxWidth: 'auto',
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
            Add Route to {serviceName}
          </Typography>
          <RouteEditor
            content={routeData}
            textFields={ROUTE_TEXT_FIELDS}
            param={false}
          />
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};
