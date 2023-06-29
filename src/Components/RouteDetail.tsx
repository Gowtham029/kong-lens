/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IconInfoCircle } from '@tabler/icons-react';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useSelector, useDispatch } from 'react-redux';
import PageHeader from './Features/PageHeader';
import MiniPageHeader from './Features/MiniPageHeader';
import { ROUTE_TEXT_FIELDS } from '../Shared/constants';
import { navBarProps } from '../interfaces';
import RouteEditor from './RouteEditor';
import Plugins from '../Pages/Plugins';
import { SnackBarAlert } from './Features/SnackBarAlert';
import { getCurrentRouteData } from '../Actions/routeActions';
import { toastDisable } from '../Actions/toastActions';
import Spinner from './Features/spinner/Spinner';

const RouteDetail = (): JSX.Element => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const param = query.get('newId') === 'true';

  const routeData = useSelector(
    (state: any) => state.routeReducer.currentRouteData
  );

  const list: navBarProps[] = [
    { value: 'Route Details', icon: <IconInfoCircle /> },
    { value: 'Plugins', icon: <ExtensionIcon /> },
  ];

  const [currentPage, setCurrentPage] = React.useState(list[0].value);

  const [number, setNumber] = React.useState(0);

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const { loadingData } = useSelector((state: any) => state.loadingData);

  const handleCurrentPage = (value: string): void => {
    setCurrentPage(value);
    setNumber(() => number + 1);
  };

  React.useEffect(() => {
    if (!param) dispatch(getCurrentRouteData(id as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const renderComponent = {
    'Route Details': (
      <RouteEditor content={routeData} textFields={ROUTE_TEXT_FIELDS} />
    ),
    Plugins: <Plugins nested />,
  };
  return (
    <Box sx={{ width: '1250px', margin: 'auto' }}>
      <SnackBarAlert
        open={isOpen}
        message={toastMessage.message}
        severity={toastMessage.severity}
        handleClose={() => {
          dispatch(toastDisable());
        }}
      />
      <br />
      <CssBaseline />
      <PageHeader
        header={`Routes ${routeData.name}`}
        description="<a href='/routes' style=color:'#79C2E3';text-decoration:none>routes</a> / show"
      />
      <br />
      <Divider />
      <Box
        sx={{
          width: '1250px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: '200px' }}>
          <List>
            {list.map((text) => (
              <ListItem
                key={text.value}
                sx={{
                  backgroundColor:
                    currentPage === text.value ? '#1ABB9C' : 'white',
                  color: 'black',
                  borderRadius: '10px',
                }}
                onClick={() => {
                  handleCurrentPage(text.value);
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon> {text.icon}</ListItemIcon>
                  <ListItemText primary={text.value} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            width: '1000px',
            alignContent: 'center',
          }}
        >
          <MiniPageHeader
            header={`<b>${currentPage}</b>`}
            icon={<IconInfoCircle />}
          />
          {loadingData ? (
            <Spinner />
          ) : (
            renderComponent[currentPage as keyof typeof renderComponent]
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RouteDetail;
