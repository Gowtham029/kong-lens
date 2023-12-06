/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ActionIcon } from '@mantine/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Delete } from '@mui/icons-material';
import { Tooltip, Button } from '@mui/material';
import {
  MRT_Row,
  MRT_ColumnDef,
  MaterialReactTable,
} from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAwaitableComponent from 'use-awaitable-component';
import PageHeader from '../Components/Features/PageHeader';
import { toastDisable } from '../Actions/toastActions';
import DialogModal from '../Components/Features/DialogModal';
import { RawView } from '../Components/Features/RawView';
import { SnackBarAlert } from '../Components/Features/SnackBarAlert';
import { TagComponent } from '../Components/Features/TagComponent';
import Spinner from '../Components/Features/spinner/Spinner';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { CONSUMER_DETAILS_INTERFACE } from '../Shared/constants';
import { DateTimeFormat } from '../Utils/DateTimeFormatter';
import { ConsumerDetails } from '../interfaces';
import {
  deleteConsumerData,
  getConsumerData,
} from '../Actions/consumerActions';

export default function Consumers(): JSX.Element {
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
    (state: any) => state.consumerReducer.consumerData
  );
  const loadingData = useSelector((state: any) => state.loadingData);
  // const [tableData, setTableData] = useState<ServiceDetails[]>([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    dispatch(getConsumerData());
  }, [dispatch]);

  const handleDeleteRow = React.useCallback(
    (row: MRT_Row<ConsumerDetails>) => {
      if (!deleteRow) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      dispatch(deleteConsumerData(row.original.username, row.index));
    },
    [dispatch]
  );

  const handleRawView = (key: string, value: boolean): void => {
    dispatch({
      type: ACTION_TYPES.HANDLE_CONSUMER_RAW_VIEW,
      payload: { key, value },
    });
  };

  const handleAwaitModal = async (
    row: MRT_Row<ConsumerDetails>
  ): Promise<void> => {
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

  const columns = React.useMemo<MRT_ColumnDef<ConsumerDetails>[]>(
    () => [
      {
        accessorKey: 'username',
        enableHiding: false,
        header: 'User Name',
        size: 140,
        muiTableBodyCellProps: ({ cell }) => ({
          onClick: () => {
            navigate(`/consumers/${cell.row.original.id}?newId=false`);
          },
          sx: {
            cursor: 'pointer',
            textDecoration: 'none',
            color: '#438BCA',
          },
        }),
      },
      {
        accessorKey: 'custom_id',
        header: 'Custom ID',
        enableHiding: false,
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
        accessorKey: 'created_at',
        header: 'Created',
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
        <PageHeader
          header="Consumers"
          description="The Consumer object represents a consumer - or a user - of an API. You can either rely on Kong as the primary datastore, or you can map the consumer list with your database to keep consistency between Kong and your existing primary datastore."
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
                    onClick={() => handleRawView(row.original.custom_id, true)}
                  />
                  <RawView
                    json={row.original}
                    open={
                      showConsumerRawView[row.original.custom_id] as boolean
                    }
                    onClose={() => handleRawView(row.original.custom_id, false)}
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
                navigate(`/consumers/createConsumer/?newId=true`);
                dispatch({
                  type: ACTION_TYPES.SET_CURRENT_CONSUMER_DATA,
                  payload: CONSUMER_DETAILS_INTERFACE,
                });
              }}
              variant="contained"
            >
              Create Consumer
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
