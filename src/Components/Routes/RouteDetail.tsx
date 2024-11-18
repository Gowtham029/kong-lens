/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CssBaseline, Divider } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { IconInfoCircle } from '@tabler/icons-react';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy';
import PageHeader from '../Features/PageHeader';
import MiniPageHeader from '../Features/MiniPageHeader';
import { ROUTE_TEXT_FIELDS } from '../../Shared/constants';
import Plugins from '../../Pages/Plugins';
import { SnackBarAlert } from '../Features/SnackBarAlert';
import { toastDisable } from '../../Actions/toastActions';
import Spinner from '../Features/spinner/Spinner';
import { getCurrentRouteData } from '../../Actions/routeActions';
import RouteEditor from './RouteEditor';
import { getCurrentPagePluginData } from '../../Actions/pluginActions';

const RouteDetail = (): JSX.Element => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const { currentRouteData } = useSelector((state: any) => state.routeReducer);

  const loadingData = useSelector((state: any) => state.loadingData);

  React.useEffect(() => {
    dispatch(getCurrentRouteData(id as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickPageFunctions = (page: string): any => {
    switch (page) {
      case 'Route Details': {
        return dispatch(getCurrentRouteData(id as string));
      }
      case 'Plugins': {
        return dispatch(getCurrentPagePluginData(id as string, 'routes'));
      }
      default:
        return null;
    }
  };
  const list: any = [
    {
      value: 'Route Details',
      icon: <IconInfoCircle />,
      comp: (
        <RouteEditor
          content={currentRouteData}
          textFields={ROUTE_TEXT_FIELDS}
          param
        />
      ),
    },
    { value: 'Plugins', icon: <ExtensionIcon />, comp: <Plugins nested /> },
  ];

  const [currentPage, setCurrentPage] = React.useState(list[0].value);

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
        defaultValue={0}
        sx={{
          width: '1250px',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'transparent',
          height: 'fit-content',
        }}
        orientation="vertical"
        onChange={(event, value: any) => {
          setCurrentPage(list[value].value as string);
          onClickPageFunctions(list[value].value as string);
        }}
      >
        <TabList
          disableUnderline
          variant="soft"
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: 'xl',
            bgcolor: 'background.level1',
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'sm',
              bgcolor: 'background.surface',
            },
            height: 'fit-content',
          }}
        >
          {list.map((tab: any, index: any) => (
            <Tab value={index} variant="plain" disableIndicator>
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
            list.map((tab: any, index: any) => (
              <TabPanel value={index}>{tab.comp}</TabPanel>
            ))
          )}
        </Box>
      </Tabs>
    </Box>
  );
};

export default RouteDetail;
