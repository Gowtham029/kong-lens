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
import DialogModal from '../Components/Features/DialogModal';
import { RawView } from '../Components/Features/RawView';

import { ACTION_TYPES } from '../Shared/actionTypes';
import { PLUGIN_DETAILS_INTERFACE } from '../Shared/constants';
import { DateTimeFormat } from '../Utils/DateTimeFormatter';
import {
  deletePluginData,
  getPluginData,
  patchCurrentPluginData,
} from '../Actions/pluginActions';
import { ToggleComponent } from '../Components/Features/ToggleComponent';
import { CreatePlugins } from '../Components/Plugins/CreatePlugins';

export default function Plugins({ nested }: PageTypeProps): JSX.Element {
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const deleteRow = React.useRef(false);

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const [promise, setPromise] = React.useState<unknown>();
  const { showPluginRawView } = useSelector(
    (state: any) => state.rawViewReducer
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, execute, resolve, reject, reset] = useAwaitableComponent();

  const { currentPagePluginData } = useSelector(
    (state: any) => state.pluginReducer
  );

  const { pluginData, tablePluginData } = useSelector(
    (state: any) => state.pluginReducer
  );

  const tableData = nested ? currentPagePluginData : tablePluginData;
  const [openPluginModal, setOpenPluginModal] = React.useState(false);
  const loadingData = useSelector((state: any) => state.loadingData);

  const navigate = useNavigate();
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    !nested && dispatch(getPluginData());
  }, [dispatch, nested]);

  const handleDeleteRow = React.useCallback(
    (row: MRT_Row<PluginData>) => {
      if (!deleteRow) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      dispatch(deletePluginData(row.original.id, row.index));
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

  const rawViewData: any = {};

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getOriginalPluginData = () => {
    pluginData.forEach((data: any) => {
      rawViewData[data.id] = data;
    });
  };

  getOriginalPluginData();

  const columns = React.useMemo<MRT_ColumnDef<PluginData>[]>(
    () => [
      {
        accessorKey: 'name',
        enableHiding: true,
        header: 'NAME',
        size: 140,
      },
      {
        accessorKey: 'scope',
        enableHiding: !nested,
        header: 'SCOPE',
        size: 140,
      },
      {
        // eslint-disable-next-line yoda
        accessorKey: 'service.id',
        header: 'APPLY TO',
        enableHiding: !nested,
        muiTableBodyCellProps: ({ cell }) => ({
          onClick: () => {
            cell.row.original.service.id !== 'All EntryPoints'
              ? navigate(
                  `/services/${cell.row.original.service.id}?newId=false`
                )
              : null;
          },
          sx: {
            cursor:
              cell.row.original.service.id !== 'All EntryPoints'
                ? 'pointer'
                : null,
            textDecoration: 'none',
            color:
              cell.row.original.service.id !== 'All EntryPoints'
                ? '#438BCA'
                : 'black',
          },
        }),
      },
      {
        accessorKey: 'consumer.id',
        header: 'CONSUMER',
        enableHiding: true,
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
    [navigate, nested]
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
              name: true,
              scope: !nested,
              'service.id': !nested,
              'consumer.id': true,
              created_at: true,
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
                    json={rawViewData[row.original.id]}
                    open={showPluginRawView[row.original.id] as boolean}
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
                if (!nested) {
                  navigate(`/plugins/add`);
                  dispatch({
                    type: ACTION_TYPES.SET_CURRENT_PLUGIN_DATA,
                    payload: PLUGIN_DETAILS_INTERFACE,
                  });
                } else {
                  setOpenPluginModal(true);
                }
              }}
              variant="contained"
            >
              Create Plugin
            </Button>
          )}
        />
      )}
      <CreatePlugins
        open={openPluginModal}
        onClose={() => setOpenPluginModal(false)}
      />
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
