import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MaterialReactTable, {
  MRT_Row,
  MRT_ColumnDef,
} from 'material-react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAwaitableComponent from 'use-awaitable-component';
import { ActionIcon } from '@mantine/core';
import { Delete } from '@mui/icons-material';
import { Tooltip, Button } from '@mui/material';
import {
  getUpstreamsData,
  deleteUpstreamData,
} from '../Actions/upstreamActions';
import { TagComponent } from '../Components/Features/TagComponent';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { DateTimeFormat } from '../Utils/DateTimeFormatter';
import { UpstreamsDetails } from '../interfaces';
import PageHeader from '../Components/Features/PageHeader';
import { toastDisable } from '../Actions/toastActions';
import DialogModal from '../Components/Features/DialogModal';
import { RawView } from '../Components/Features/RawView';
import { SnackBarAlert } from '../Components/Features/SnackBarAlert';
import Spinner from '../Components/Features/spinner/Spinner';
import { CreatePlugins } from '../Components/Plugins/CreatePlugins';

export default function Certificates(): JSX.Element {
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const deleteRow = React.useRef(false);

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const [promise, setPromise] = React.useState<unknown>();
  const { showUpstreamRawView } = useSelector(
    (state: any) => state.rawViewReducer
  );

  const [openPluginModal, setOpenPluginModal] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, execute, resolve, reject, reset] = useAwaitableComponent();
  const tableData = useSelector(
    (state: any) => state.upstreamReducer.upstreamData
  );
  const loadingData = useSelector((state: any) => state.loadingData);
  // const [tableData, setTableData] = useState<ServiceDetails[]>([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    dispatch(getUpstreamsData());
  }, [dispatch]);

  const handleDeleteRow = React.useCallback(
    (row: MRT_Row<UpstreamsDetails>) => {
      if (!deleteRow) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      dispatch(deleteUpstreamData(row.original.id, row.index));
    },
    [dispatch]
  );

  const handleRawView = (key: string, value: boolean): void => {
    dispatch({
      type: ACTION_TYPES.HANDLE_UPSTREAMS_RAW_VIEW,
      payload: { key, value },
    });
  };

  const handleAwaitModal = async (
    row: MRT_Row<UpstreamsDetails>
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

  const columns = React.useMemo<MRT_ColumnDef<UpstreamsDetails>[]>(
    () => [
      {
        enableHiding: true,
        accessorKey: 'name',
        header: 'NAME',
        enableColumnOrdering: false,
        enableEditing: false, // disable editing on this column
        enableSorting: false,
        size: 80,
      },

      {
        accessorKey: 'tags',
        header: 'Tags',
        enableHiding: true,
        size: 150,
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row }) => (
          <div style={{ display: 'flex' }}>
            {row.original.tags &&
              row.original.tags.map((tag: string) => (
                <div key={tag}>
                  <TagComponent tag={tag} isList={false} />
                </div>
              ))}
          </div>
        ),
      },
      {
        accessorKey: 'slots',
        enableHiding: true,
        header: 'SLOTS',
        size: 140,
        // muiTableBodyCellProps: ({ cell }) => ({
        //   onClick: () => {
        //     navigate(`/services/${cell.row.original.id}?newId=false`);
        //   },
        //   sx: {
        //     cursor: 'pointer',
        //     textDecoration: 'none',
        //     color: '#438BCA',
        //   },
        // }),
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
    []
  );
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <PageHeader
          header="Certificates"
          description="A certificate object represents a public certificate/private key pair for an SSL certificate. These objects are used by Kong to handle SSL/TLS termination for encrypted requests. Certificates are optionally associated with SNI objects to tie a cert/key pair to one or more hostnames."
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
                    open={showUpstreamRawView[row.original.id] as boolean}
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
                setOpenPluginModal(true);
              }}
              variant="contained"
            >
              Create Upstream
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
          reset();
        }}
        onConfirm={() => {
          handleConfirmDelete();
        }}
      />
    </>
  );
}
