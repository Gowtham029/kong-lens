/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import { Box, CssBaseline, Divider, TabPanel, tabClasses } from '@mui/joy';
import { IconInfoCircle } from '@tabler/icons-react';
import GroupsIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import * as _ from 'lodash';
import PageHeader from '../Features/PageHeader';
import { navBarProps } from '../../interfaces';
import {
  getCurrentConsumerData,
  getConsumerCredsAction,
} from '../../Actions/consumerActions';
import ConsumerEditor from './ConsumerEditor';
import { CONSUMER_TEXT_FIELDS } from '../../Shared/constants';
import Spinner from '../Features/spinner/Spinner';
import Routes from '../../Pages/Routes';
import AccessibleRoutes from './AccessibleRoutes';
import { getServiceData } from '../../Actions/serviceActions';
import {
  getCurrentPagePluginData,
  getPluginData,
} from '../../Actions/pluginActions';
import { getRouteData } from '../../Actions/routeActions';
import { ACTION_TYPES } from '../../Shared/actionTypes';
import Plugins from '../../Pages/Plugins';
import Credentials from './Credentials';

export default function ConsumerDetail(): JSX.Element {
  const { id } = useParams();

  const { search } = useLocation();

  const dispatch = useDispatch();

  const query = new URLSearchParams(search);

  const param = query.get('newId') === 'true';

  const loadingData = useSelector((state: any) => state.loadingData);
  const { currentConsumerData } = useSelector(
    (state: any) => state.consumerReducer
  );
  const { serviceData } = useSelector((state: any) => state.serviceReducer);
  const { routeData } = useSelector((state: any) => state.routeReducer);
  const { pluginData } = useSelector((state: any) => state.pluginReducer);
  const [tableData, setTableData] = React.useState<any>([]);

  React.useEffect(() => {
    if (!param) {
      if (!serviceData.length) dispatch(getServiceData());
      if (!routeData.length) dispatch(getRouteData());
      if (!pluginData.length) dispatch(getPluginData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const put = (): void => {
      dispatch(getCurrentConsumerData(id as string));
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
        <ConsumerEditor
          content={currentConsumerData}
          textFields={CONSUMER_TEXT_FIELDS}
        />
      ),
    },
    { value: 'Groups', icon: <GroupsIcon />, comp: <Routes nested /> },
    { value: 'Credentials', icon: <SecurityIcon />, comp: <Credentials /> },
    {
      value: 'Accessible Routes',
      icon: <FilterDramaIcon />,
      comp: <AccessibleRoutes collatedData={tableData} />,
    },
    { value: 'Plugins', icon: <ExtensionIcon />, comp: <Plugins nested /> },
  ];

  const [currentPage, setCurrentPage] = React.useState(list[0].value);

  const constructAccessibleRoutes = (): void => {
    if (!param) {
      const serviceMappedData: any = {};
      serviceData.forEach((service: any) => {
        // Assign the consumer_id to the service.
        // We need this @ the frontend
        service.consumer_id = id;
        // Assign plugins to the service
        service.plugins = _.filter(pluginData, (plugin: any) => {
          return service.id === _.get(plugin, 'service.id');
        });
      });
      const servicesResults = serviceData;
      routeData.forEach((route: any) => {
        // Assign the consumer_id to the route.
        // We need this @ the frontend
        route.consumer_id = id;
        // Assign plugins to the service
        route.plugins = _.filter(pluginData, (plugin: any) => {
          return route.id === _.get(plugin, 'route.id');
        });
      });
      servicesResults.forEach((service: any) => {
        const routess = _.filter(routeData, (route: any) => {
          return route.service.id === service.id;
        });

        if (routess) {
          service.routes = routess;
        }
      });

      // Filter out the servicesRecords that have no eligible routes
      const filtered = _.filter(servicesResults, (service: any) => {
        return service.routes && service.routes.length;
      });

      filtered.forEach((service: any) => {
        serviceMappedData[service.id] = service;
      });

      setTableData(filtered);
      dispatch({
        type: ACTION_TYPES.SET_ACCESS_ROUTE_RAW_VIEW,
        payload: serviceMappedData,
      });
      dispatch({
        type: ACTION_TYPES.SET_ACCESS_ROUTE_DATA,
        payload: filtered,
      });
    }
  };

  const onClickPageFunctions = (page: string): any => {
    switch (page) {
      case 'Details': {
        if (!param) {
          return getCurrentConsumerData(id as string);
        }
        break;
      }
      case 'Plugins': {
        if (!param) {
          return dispatch(getCurrentPagePluginData(id as string, 'consumers'));
        }
        break;
      }
      case 'Accessible Routes': {
        return constructAccessibleRoutes();
      }
      case 'Credentials': {
        const apiKeyValue: any = [
          'basic-auth',
          'key-auth',
          'hmac-auth',
          'oauth2',
          'jwt',
        ];
        apiKeyValue.forEach((value: any) =>
          dispatch(getConsumerCredsAction({ id, type: value }))
        );
        return;
      }
      default:
        return null;
    }
  };
  return (
    <>
      <CssBaseline />
      <PageHeader
        header={`Consumer ${currentConsumerData.username}`}
        description="<a href='/consumers' style=color:'#79C2E3';text-decoration:none>consumer</a> / show"
      />
      <br />
      <Tabs
        defaultValue={0}
        sx={{
          width: 1250,
          margin: 'auto',
          bgcolor: 'transparent',
          height: 'fit-content',
        }}
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
                  margin: 'auto',
                  alignItems: 'center',
                }}
              >
                {tab.icon}
                {tab.value}
              </Box>
            </Tab>
          ))}
        </TabList>
        <Divider />
        {loadingData ? (
          <Spinner />
        ) : (
          list.map((tab: any, index: any) => (
            <TabPanel value={index}>{tab.comp}</TabPanel>
          ))
        )}
      </Tabs>
    </>
  );
}
