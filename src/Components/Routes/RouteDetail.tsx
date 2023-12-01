/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CssBaseline, Divider } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { IconInfoCircle } from '@tabler/icons-react';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import PageHeader from '../Features/PageHeader';
import MiniPageHeader from '../Features/MiniPageHeader';
import { ROUTE_TEXT_FIELDS } from '../../Shared/constants';
import { navBarProps } from '../../interfaces';
import Plugins from '../../Pages/Plugins';
import { SnackBarAlert } from '../Features/SnackBarAlert';
import { toastDisable } from '../../Actions/toastActions';
import Spinner from '../Features/spinner/Spinner';
import { getCurrentRouteData } from '../../Actions/routeActions';
import RouteEditor from './RouteEditor';
import { getCurrentServicePluginData } from '../../Actions/serviceActions';

const RouteDetail = (): JSX.Element => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const list: navBarProps[] = [
    { value: 'Route Details', icon: <IconInfoCircle /> },
    { value: 'Plugins', icon: <ExtensionIcon /> },
  ];

  const [currentPage, setCurrentPage] = React.useState(list[0].value);

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const { currentRouteData } = useSelector((state: any) => state.routeReducer);

  const loadingData = useSelector((state: any) => state.loadingData);

  React.useEffect(() => {
    dispatch(getCurrentRouteData(id as string));
    dispatch(getCurrentServicePluginData(id as string, 'routes'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderComponent = {
    'Route Details': (
      <RouteEditor
        content={currentRouteData}
        textFields={ROUTE_TEXT_FIELDS}
        param
      />
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
        header={`Route ${currentRouteData.name}`}
        description="<a href='/routes' style=color:'#79C2E3';text-decoration:none>routes</a> / show"
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
          setCurrentPage(value as string);
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

export default RouteDetail;
