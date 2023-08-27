/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { CssBaseline, Button, Box, Tooltip } from '@mui/material';
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';
import { ActionIcon } from '@mantine/core';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useAwaitableComponent from 'use-awaitable-component';
import Spinner from '../Components/Features/spinner/Spinner';
import { SnackBarAlert } from '../Components/Features/SnackBarAlert';
import { PageTypeProps, PluginData } from '../interfaces';
import PageHeader from '../Components/Features/PageHeader';
import { toastDisable } from '../Actions/toastActions';
import { deleteConsumerData } from '../Actions/consumerActions';
import DialogModal from '../Components/Features/DialogModal';
import { RawView } from '../Components/Features/RawView';

import { ACTION_TYPES } from '../Shared/actionTypes';
import { PLUGIN_DETAILS_INTERFACE } from '../Shared/constants';
import { DateTimeFormat } from '../Utils/DateTimeFormatter';
import {
  getPluginData,
  patchCurrentPluginData,
} from '../Actions/pluginActions';
import { ToggleComponent } from '../Components/Features/ToggleComponent';

export default function Plugins({ nested }: PageTypeProps): JSX.Element {
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const deleteRow = React.useRef(false);

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const [promise, setPromise] = React.useState<unknown>();
  const { showConsumerRawView } = useSelector(
    (state: any) => state.rawViewReducer
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, execute, resolve, reject, reset] = useAwaitableComponent();
  const tableData = useSelector(
    (state: any) => state.pluginReducer.tablePluginData
  );
  const loadingData = useSelector((state: any) => state.loadingData);
  // const [tableData, setTableData] = useState<ServiceDetails[]>([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    dispatch(getPluginData());
  }, [dispatch]);

  const handleDeleteRow = React.useCallback(
    (row: MRT_Row<PluginData>) => {
      if (!deleteRow) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      dispatch(deleteConsumerData(row.original.id, row.index));
    },
    [dispatch]
  );

  const handleRawView = (key: string, value: boolean): void => {
    dispatch({
      type: ACTION_TYPES.HANDLE_PLUGIN_RAW_VIEW,
      payload: { key, value },
    });
  };

  const handleAwaitModal = async (row: MRT_Row<PluginData>): Promise<void> => {
    setConfirmDialogOpen(true);
    const val: any = await execute();
    setPromise(val);
    handleDeleteRow(row);
  };

  const handleConfirmDelete = (): void => {
    deleteRow.current = true;
    resolve(promise);
    setConfirmDialogOpen(!confirmDialogOpen);
  };

  const columns = React.useMemo<MRT_ColumnDef<PluginData>[]>(
    () => [
      {
        accessorKey: 'name',
        enableHiding: false,
        header: 'NAME',
        size: 140,
        // muiTableBodyCellProps: ({ cell }) => ({
        //   // onClick: () => {
        //   //   navigate(`/consumers/${cell.row.original.username}?newId=false`);
        //   // },
        //   sx: {
        //     cursor: 'pointer',
        //     textDecoration: 'none',
        //     color: '#438BCA',
        //   },
        // }),
      },
      {
        accessorKey: 'scope',
        enableHiding: false,
        header: 'SCOPE',
        size: 140,
        // muiTableBodyCellProps: ({ cell }) => ({
        //   // onClick: () => {
        //   //   navigate(`/consumers/${cell.row.original.username}?newId=false`);
        //   // },
        //   sx: {
        //     cursor: 'pointer',
        //     textDecoration: 'none',
        //     color: '#438BCA',
        //   },
        // }),
      },
      {
        // eslint-disable-next-line yoda
        accessorKey: 'service.id',
        header: 'APPLY TO',
        enableHiding: false,
        muiTableBodyCellProps: ({ cell }) => ({
          onClick: () => {
            cell.row.original.consumer.id !== 'All Services'
              ? navigate(
                  `/services/${cell.row.original.service.id}?newId=false`
                )
              : null;
          },
          sx: {
            cursor:
              cell.row.original.consumer.id !== 'All Consumers'
                ? 'pointer'
                : null,
            textDecoration: 'none',
            color:
              cell.row.original.consumer.id !== 'All Consumers'
                ? '#438BCA'
                : 'black',
          },
        }),
      },
      {
        accessorKey: 'consumer.id',
        header: 'CONSUMER',
        enableHiding: false,
        muiTableBodyCellProps: ({ cell }) => ({
          onClick: () => {
            cell.row.original.consumer.id !== 'All Consumers'
              ? navigate(
                  `/consumers/${cell.row.original.consumer.id}?newId=false`
                )
              : null;
          },
          sx: {
            cursor:
              cell.row.original.consumer.id !== 'All Consumers'
                ? 'pointer'
                : null,
            textDecoration: 'none',
            color:
              cell.row.original.consumer.id !== 'All Consumers'
                ? '#438BCA'
                : 'black',
          },
        }),
      },
      {
        accessorKey: 'created_at',
        header: 'CREATED',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row }) => (
          <div style={{ display: 'flex' }}>
            {DateTimeFormat(row.original.created_at)}
          </div>
        ),
      },
    ],
    [navigate]
  );
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {!nested && (
          <PageHeader
            header="Plugins"
            description="A Plugin entity represents a plugin configuration that will be executed during the HTTP request/response workflow, and it's how you can add functionalities to APIs that run behind Kong, like Authentication or Rate Limiting for example."
          />
        )}
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
                    open={showConsumerRawView[row.original.id] as boolean}
                    onClose={() => handleRawView(row.original.id, false)}
                  />
                </>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <ActionIcon
                  color="red"
                  onClick={() => {
                    handleAwaitModal(row);
                  }}
                >
                  <Delete />
                </ActionIcon>
              </Tooltip>
              <Tooltip arrow placement="right-end" title="Toggle Enable">
                <ActionIcon color="red">
                  <ToggleComponent
                    yes={row.original.enabled}
                    onChange={() => {
                      dispatch(
                        patchCurrentPluginData(
                          { enabled: !row.original.enabled },
                          row.original.id
                        )
                      );
                    }}
                    size="xs"
                  />
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
                navigate(`/plugins/createPlugin/?newId=true`);
                dispatch({
                  type: ACTION_TYPES.SET_CURRENT_PLUGIN_DATA,
                  payload: PLUGIN_DETAILS_INTERFACE,
                });
              }}
              variant="contained"
            >
              Create Plugin
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
}
