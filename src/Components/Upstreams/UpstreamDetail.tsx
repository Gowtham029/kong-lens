/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CssBaseline, Divider } from '@mui/material';
import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IconInfoCircle } from '@tabler/icons-react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { TabList, TabPanel, Tabs, Tab, tabClasses } from '@mui/joy';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PageHeader from '../Features/PageHeader';
import UpstreamEditor from './UpstreamEditor';
import MiniPageHeader from '../Features/MiniPageHeader';
import { UPSTREAM_DETAILS_TEXTFIELDS } from '../../Shared/constants';
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
import { getCurrentUpstreamData } from '../../Actions/upstreamActions';

const UpstreamDetail = (): JSX.Element => {
  const { id } = useParams();

  const { search } = useLocation();

  const dispatch = useDispatch();

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const { currentUpstreamData } = useSelector(
    (state: any) => state.upstreamReducer
  );

  const query = new URLSearchParams(search);

  const param = query.get('newId') === 'true';

  const loadingData = useSelector((state: any) => state.loadingData);

  React.useEffect(() => {
    const put = (): void => {
      dispatch(getCurrentUpstreamData(id as string));
    };
    if (!param) {
      put();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list: any = [
    {
      value: 'Details',
      icon: <IconInfoCircle />,
      comp: (
        <UpstreamEditor
          content={currentUpstreamData}
          textFields={UPSTREAM_DETAILS_TEXTFIELDS}
        />
      ),
    },
    {
      value: 'Targets',
      icon: <LocationSearchingIcon />,
      comp: <Routes nested />,
    },
    { value: 'Alerts', icon: <NotificationsIcon />, comp: <Plugins nested /> },
  ];

  const [currentPage, setCurrentPage] = React.useState(list[0].value);

  const onClickPageFunctions = (page: string): void => {
    switch (page) {
      case 'Details': {
        dispatch(getCurrentServiceData(id as string));
        break;
      }
      case 'Routes': {
        dispatch(getCurrentServiceRouteData(id as string));
        break;
      }
      case 'Plugins': {
        dispatch(getCurrentPagePluginData(id as string, 'services'));
        break;
      }
      default:
        break;
    }
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
        header={`Service ${currentUpstreamData.name}`}
        description="<a href='/services' style=color:'#79C2E3';text-decoration:none>service</a> / show"
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
          if (!param) setCurrentPage(list[value].value as string);
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
            <Tab
              value={index}
              variant="plain"
              disableIndicator
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
            list.map((tab: any, index: any) => (
              <TabPanel value={index}>{tab.comp}</TabPanel>
            ))
          )}
        </Box>
      </Tabs>
    </Box>
  );
};

export default UpstreamDetail;
