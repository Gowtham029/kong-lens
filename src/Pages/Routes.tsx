/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';
import { ActionIcon } from '@mantine/core';
import { CssBaseline, Button, Box, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useAwaitableComponent from 'use-awaitable-component';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../Components/Features/PageHeader';
import DialogModal from '../Components/Features/DialogModal';
import { RouteDetails, PageTypeProps } from '../interfaces';
import { RawView } from '../Components/Features/RawView';
import { SnackBarAlert } from '../Components/Features/SnackBarAlert';
import { TagComponent } from '../Components/Features/TagComponent';
import { CreateRoute } from '../Components/Features/CreateRoute';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { deleteRouteData, getRouteData } from '../Actions/routeActions';
import { toastDisable } from '../Actions/toastActions';
import { ROUTE_DETAILS_INTERFACE } from '../Shared/constants';
import Spinner from '../Components/Features/spinner/Spinner';
import { DateTimeFormat } from '../Utils/DateTimeFormatter';

const Routes = ({ nested }: PageTypeProps): JSX.Element => {
  const dispatch = useDispatch();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const { isRouteOpen, routeData } = useSelector(
    (state: any) => state.routeReducer
  );
  const { currentServiceRouteData, currentServiceData } = useSelector(
    (state: any) => state.serviceReducer
  );

  const tableData = nested ? currentServiceRouteData : routeData;

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const loadingData = useSelector((state: any) => state.loadingData);

  const deleteRow = useRef(false);
  const [promise, setPromise] = useState<unknown>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, execute, resolve, reject, reset] = useAwaitableComponent();
  const { showRouteRawView } = useSelector(
    (state: any) => state.rawViewReducer
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    !nested && dispatch(getRouteData());
  }, [dispatch, nested]);

  const handleRawView = (key: string, value: boolean): void => {
    dispatch({
      type: ACTION_TYPES.HANDLE_ROUTE_RAW_VIEW,
      payload: { key, value },
    });
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<RouteDetails>) => {
      if (!deleteRow) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      dispatch(deleteRouteData(row.original.id, row.index));
    },
    [dispatch]
  );

  const handleAwaitModal = async (
    row: MRT_Row<RouteDetails>
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

  const columns = useMemo<MRT_ColumnDef<RouteDetails>[]>(
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
        header: 'Name',
        size: 140,
        muiTableBodyCellProps: ({ cell }) => ({
          onClick: () => {
            navigate(`/routes/${cell.row.original.id}`);
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
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row }) => (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {row.original.tags.map((tag: string) => (
              <TagComponent key={tag} tag={tag} isList={false} />
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'service.name',
        header: 'Service',
        enableHiding: !nested,
        muiTableBodyCellProps: ({ cell }) => ({
          onClick: () => {
            !nested
              ? navigate(
                  `/services/${cell.row.original.service.id}?newId=false`
                )
              : null;
          },
          sx: {
            cursor: !nested ? 'pointer' : null,
            textDecoration: 'none',
            color: !nested ? '#438BCA' : 'black',
          },
        }),
      },
      {
        accessorKey: 'hosts',
        header: 'Host',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row }) => (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {row.original.hosts.map((host: string, index: number) => (
              <div key={host}>
                <TagComponent
                  tag={
                    index !== row.original.hosts.length - 1 ? `${host},` : host
                  }
                  isList
                />
              </div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'paths',
        header: 'Paths',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row }) => (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {row.original.paths.map((path: string, index: number) => (
              <div key={path}>
                <TagComponent
                  tag={
                    index !== row.original.paths.length - 1 ? `${path},` : path
                  }
                  isList
                />
              </div>
            ))}
          </div>
        ),
      },

      {
        accessorKey: 'protocols',
        header: 'Protocols',
        enableHiding: true,
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row }) => (
          <div style={{ display: 'flex' }}>
            {row.original.protocols.map((protocol: string, index: number) => (
              <TagComponent
                key={protocol}
                tag={
                  index !== row.original.protocols.length - 1
                    ? `${protocol},`
                    : protocol
                }
                isList
              />
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'regex_priority',
        header: 'Regex Priority',
        size: 80,
        enableHiding: true,
      },
      {
        accessorKey: 'created_at',
        header: 'Created',
        size: 80,
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
      <Box>
        <CssBaseline />
        {!nested && (
          <PageHeader
            header="Routes"
            description="The Route entities defines rules to match client requests. Each Route is associated with a Service, and a Service may have multiple Routes associated to it. Every request matching a given Route will be proxied to its associated Service."
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
      {loadingData ? (
        <Spinner />
      ) : (
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
              'service.name': !nested,
              protocols: false,
              regex_priority: false,
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
                    open={showRouteRawView[row.original.id] as boolean}
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
                backgroundColor: '',
                color: '#1AAA9C',
                '&:hover': {
                  backgroundColor: '#f8f8f8',
                },
              }}
              onClick={() => {
                !nested
                  ? navigate(`/services`)
                  : [
                      dispatch({
                        type: ACTION_TYPES.OPEN_ROUTE_MODAL,
                      }),
                      dispatch({
                        type: ACTION_TYPES.SET_CURRENT_ROUTE_DATA,
                        payload: ROUTE_DETAILS_INTERFACE,
                      }),
                    ];
              }}
              variant="text"
            >
              {!nested
                ? 'YOU CAN ONLY CREATE ROUTES FROM A SERVICE PAGE'
                : 'ADD ROUTE'}
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
      <CreateRoute
        open={isRouteOpen}
        onClose={() => {
          dispatch({ type: ACTION_TYPES.CLOSE_ROUTE_MODAL });
          dispatch({
            type: ACTION_TYPES.SET_CURRENT_ROUTE_DATA,
            payload: ROUTE_DETAILS_INTERFACE,
          });
        }}
        serviceName={currentServiceData.name}
      />
    </>
  );
};

export default Routes;
