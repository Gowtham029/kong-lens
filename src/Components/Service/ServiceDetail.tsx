/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CssBaseline, Divider } from '@mui/material';
import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IconInfoCircle } from '@tabler/icons-react';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useDispatch, useSelector } from 'react-redux';
import { TabList, TabPanel, Tabs, Tab } from '@mui/joy';
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
import { getCurrentPagePluginData } from '../../Actions/pluginActions';

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
      dispatch(getCurrentPagePluginData(id as string, 'services'));
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
      <Tabs
        defaultValue={currentPage}
        sx={{
          width: '1250px',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        orientation="vertical"
        onChange={(event, value) => {
          if (!param) setCurrentPage(value as string);
        }}
      >
        <TabList variant="plain" sx={{ gap: '5px' }}>
          {list.map((tab) => (
            <Tab
              value={tab.value}
              sx={{
                background: tab.value === currentPage ? '#1ABB9C' : 'white',
                width: '200px',
              }}
              disabled={param && currentPage !== tab.value}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '160px',
                  gap: '20px',
                }}
              >
                {tab.icon}
                <div>{tab.value}</div>
              </Box>
            </Tab>
          ))}
        </TabList>
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <MiniPageHeader
            header={`<b>${currentPage}</b>`}
            icon={<IconInfoCircle />}
          />
          {loadingData ? (
            <Spinner />
          ) : (
            <TabPanel value={currentPage}>
              {renderComponent[currentPage as keyof typeof renderComponent]}
            </TabPanel>
          )}
        </Box>
      </Tabs>
    </Box>
  );
};

export default ServiceDetail;
