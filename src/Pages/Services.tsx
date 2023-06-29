/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';
import { ActionIcon } from '@mantine/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CssBaseline, Button, Box, Tooltip } from '@mui/material';
import useAwaitableComponent from 'use-awaitable-component';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import PageHeader from '../Components/Features/PageHeader';
import DialogModal from '../Components/Features/DialogModal';
import { ServiceDetails } from '../interfaces';
import { SnackBarAlert } from '../Components/Features/SnackBarAlert';
import { RawView } from '../Components/Features/RawView';
import { TagComponent } from '../Components/Features/TagComponent';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { deleteServiceData, getServiceData } from '../Actions/serviceActions';
import { toastDisable } from '../Actions/toastActions';
import Spinner from '../Components/Features/spinner/Spinner';

const Services = (): JSX.Element => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const deleteRow = useRef(false);

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const [promise, setPromise] = useState<unknown>();
  const { showServiceRawView } = useSelector(
    (state: any) => state.rawViewReducer
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, execute, resolve, reject, reset] = useAwaitableComponent();
  const tableData = useSelector(
    (state: any) => state.serviceReducer.serviceData
  );
  const loadingData = useSelector((state: any) => state.loadingData);
  // const [tableData, setTableData] = useState<ServiceDetails[]>([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    dispatch(getServiceData());
  }, [dispatch]);

  const handleDeleteRow = useCallback(
    (row: MRT_Row<ServiceDetails>) => {
      if (!deleteRow) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      dispatch(deleteServiceData(row.original.id, row.index));
    },
    [dispatch]
  );

  const handleRawView = (key: string, value: boolean): void => {
    dispatch({
      type: ACTION_TYPES.HANDLE_SERVICE_RAW_VIEW,
      payload: { key, value },
    });
  };

  const handleAwaitModal = async (
    row: MRT_Row<ServiceDetails>
  ): Promise<void> => {
    setConfirmDialogOpen(true);
    const val: unknown = await execute();
    setPromise(val);
    handleDeleteRow(row);
  };

  const handleConfirmDelete = (): void => {
    deleteRow.current = true;
    resolve(promise);
    setConfirmDialogOpen(!confirmDialogOpen);
  };

  const columns = useMemo<MRT_ColumnDef<ServiceDetails>[]>(
    () => [
      {
        enableHiding: true,
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, // disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'name',
        enableHiding: true,
        header: 'Service Name',
        size: 140,
        muiTableBodyCellProps: ({ cell }) => ({
          onClick: () => {
            navigate(`/services/${cell.row.original.id}/?newId=false`);
          },
          sx: {
            cursor: 'pointer',
            textDecoration: 'none',
            color: '#438BCA',
          },
        }),
      },
      {
        accessorKey: 'tags',
        header: 'Tags',
        enableHiding: true,
        size: 150,
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row }) => (
          <div style={{ display: 'flex' }}>
            {row.original.tags.map((tag: string) => (
              <div key={tag}>
                <TagComponent tag={tag} isList={false} />
              </div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'protocol',
        header: 'Protocol',
      },
      {
        accessorKey: 'host',
        header: 'Host',
        size: 140,
      },
      {
        accessorKey: 'port',
        header: 'Port',
        size: 80,
      },
      {
        accessorKey: 'path',
        header: 'Path',
        size: 80,
      },
      {
        accessorKey: 'retries',
        header: 'Retries',
        size: 80,
      },
      {
        accessorKey: 'read_timeout',
        header: 'Read Timeout',
        size: 80,
        enableHiding: true,
      },
      {
        accessorKey: 'write_timeout',
        header: 'Write Timeout',
        size: 80,
        enableHiding: true,
      },
      {
        accessorKey: 'connect_timeout',
        header: 'Connect Timeout',
        size: 80,
      },
      {
        accessorKey: 'created_at',
        header: 'Created',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row }) => (
          <div style={{ display: 'flex' }}>
            {new Date(row.original.created_at * 1000)
              .toISOString()
              .slice(0, 19)
              .replace('T', ' ')}
          </div>
        ),
      },
      {
        accessorKey: 'client_certificate',
        header: 'Client certificate',
        enableHiding: true,
      },
      {
        accessorKey: 'ca_certificates',
        header: 'CA certificates',
        enableHiding: true,
      },
    ],
    [navigate]
  );

  return (
    <>
      <Box>
        <CssBaseline />
        <PageHeader
          header="Services"
          description="Service entities, as the name implies, are abstractions of each of your own upstream services. Examples of Services would be a data transformation microservice, a billing API, etc."
        />
      </Box>
      <SnackBarAlert
        open={isOpen}
        message={toastMessage.message}
        severity={toastMessage.severity}
        handleClose={() => {
          dispatch(toastDisable());
        }}
      />
      <br />
      {loadingData && <Spinner />}
      {!loadingData && (
        <MaterialReactTable
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          columns={columns}
          data={tableData}
          editingMode="modal" // default
          enableColumnOrdering
          enableEditing
          initialState={{
            columnVisibility: {
              id: false,
              connect_timeout: false,
              write_timeout: false,
              read_timeout: false,
              retries: false,
              protocol: false,
              port: false,
              ca_certificates: false,
              client_certificate: false,
            },
          }}
          renderRowActions={({ row }) => (
            <Box
              sx={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
            >
              <Tooltip arrow placement="left" title="Raw">
                <>
                  <VisibilityIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleRawView(row.original.id, true)}
                  />
                  <RawView
                    json={row.original}
                    open={showServiceRawView[row.original.id] as boolean}
                    onClose={() => handleRawView(row.original.id, false)}
                  />
                </>
              </Tooltip>
              <Tooltip arrow placement="right-end" title="Delete">
                <ActionIcon
                  color="red"
                  onClick={() => {
                    handleAwaitModal(row);
                  }}
                >
                  <Delete />
                </ActionIcon>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              sx={{
                backgroundColor: '#1ABB9C',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#1AAA9C',
                },
              }}
              onClick={() => {
                navigate(`/services/createService/?newId=true`);
              }}
              variant="contained"
            >
              Create New Service
            </Button>
          )}
        />
      )}
      <DialogModal
        description="Really want to delete the selected item?"
        open={confirmDialogOpen}
        onClose={() => {
          setConfirmDialogOpen(false);
          reject(promise);
        }}
        onConfirm={() => {
          handleConfirmDelete();
        }}
      />
    </>
  );
};

export default Services;
