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
import AltRouteIcon from '@mui/icons-material/AltRoute';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../Features/PageHeader';
import ServiceEditor from './ServiceEditor';
import MiniPageHeader from '../Features/MiniPageHeader';
import { SERVICE_TEXT_FIELDS } from '../../Shared/constants';
import { navBarProps } from '../../interfaces';
import Routes from '../../Pages/Routes';
import Plugins from '../../Pages/Plugins';
import { SnackBarAlert } from '../Features/SnackBarAlert';
import {
  getCurrentServiceData,
  getCurrentServiceRouteData,
} from '../../Actions/serviceActions';
import { toastDisable } from '../../Actions/toastActions';
import Spinner from '../Features/spinner/Spinner';

const ServiceDetail = (): JSX.Element => {
  const { id } = useParams();

  const { search } = useLocation();

  const dispatch = useDispatch();

  const list: navBarProps[] = [
    { value: 'Service Details', icon: <IconInfoCircle /> },
    { value: 'Routes', icon: <AltRouteIcon /> },
    { value: 'Plugins', icon: <ExtensionIcon /> },
  ];

  const [currentPage, setCurrentPage] = React.useState(list[0].value);

  const [number, setNumber] = React.useState(0);

  const handleCurrentPage = (value: string): void => {
    setCurrentPage(value);
    setNumber(() => number + 1);
  };

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const serviceData = useSelector(
    (state: any) => state.serviceReducer.currentServiceData
  );

  const query = new URLSearchParams(search);

  const param = query.get('newId') === 'true';

  const loadingData = useSelector((state: any) => state.loadingData);

  React.useEffect(() => {
    const put = (): void => {
      dispatch(getCurrentServiceData(id as string));
      dispatch(getCurrentServiceRouteData(id as string));
    };
    if (!param) {
      put();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderComponent = {
    'Service Details': (
      <ServiceEditor content={serviceData} textFields={SERVICE_TEXT_FIELDS} />
    ),
    Routes: <Routes nested />,
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
        header={`Service ${serviceData.name}`}
        description="<a href='/services' style=color:'#79C2E3';text-decoration:none>service</a> / show"
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
                  !param ? handleCurrentPage(text.value) : null;
                }}
                disablePadding
              >
                <ListItemButton disabled={param && currentPage !== text.value}>
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

export default ServiceDetail;
