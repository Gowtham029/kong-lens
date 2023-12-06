/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import { Box, CssBaseline, Divider, TabPanel } from '@mui/joy';
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
import { getCurrentConsumerData } from '../../Actions/consumerActions';
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

export default function ConsumerDetail(): JSX.Element {
  const { id } = useParams();

  const { search } = useLocation();

  const dispatch = useDispatch();

  const list: navBarProps[] = [
    { value: 'Details', icon: <IconInfoCircle /> },
    { value: 'Groups', icon: <GroupsIcon /> },
    { value: 'Credentials', icon: <SecurityIcon /> },
    { value: 'Accessible Routes', icon: <FilterDramaIcon /> },
    { value: 'Plugins', icon: <ExtensionIcon /> },
  ];

  const [currentPage, setCurrentPage] = React.useState(list[0].value);

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
    dispatch(getCurrentPagePluginData(id as string, 'consumers'));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (!serviceData.length) dispatch(getServiceData());
    if (!routeData.length) dispatch(getRouteData());
    if (!pluginData.length) dispatch(getPluginData());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
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
    // let data;
    // serviceData.forEach((service: any) => {
    //   data = service;
    //   serviceMappedData[data.id] = data;
    // });
    // routeData.forEach((route: any) => {
    //   data = route;
    //   routeMappedData[data.id] = data;
    // });
    // pluginData.forEach((plugin: any) => {
    //   data = plugin;
    //   pluginMappedData[data.id] = data;
    // });
    // routeData.forEach((route: any) => {
    //   data = route;
    //   if (serviceMappedData[data.service.id]) {
    //     let { routes } = serviceMappedData[data.service.id];
    //     if (routes) routes.push(data);
    //     else routes = [data];
    //     serviceMappedData[data.service.id] = {
    //       ...serviceMappedData[data.service.id],
    //       routes,
    //     };
    //   }
    // });
    // pluginData.forEach((plugin: any) => {
    //   data = plugin;
    //   if (serviceMappedData[data.service.id]) {
    //     let { plugins } = serviceMappedData[data.service.id];
    //     if (plugins) plugins.push(data);
    //     else plugins = [data];
    //     serviceMappedData[data.service.id] = {
    //       ...serviceMappedData[data.service.id],
    //       plugins,
    //     };
    //   }
    // });
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
  }, [dispatch, id, pluginData, routeData, serviceData]);
  React.useEffect(() => {
    const put = (): void => {
      dispatch(getCurrentConsumerData(id as string));
    };
    if (!param) {
      put();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderComponent = {
    Details: (
      <ConsumerEditor
        content={currentConsumerData}
        textFields={CONSUMER_TEXT_FIELDS}
      />
    ),
    Groups: <Routes nested />,
    'Accessible Routes': <AccessibleRoutes collatedData={tableData} />,
    Plugins: <Plugins nested />,
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
        defaultValue={currentPage}
        sx={{
          width: 1250,
          margin: 'auto',
        }}
        onChange={(event, value) => {
          if (!param) setCurrentPage(value as string);
        }}
      >
        <TabList variant="plain">
          {list.map((tab) => (
            <Tab
              value={tab.value}
              sx={{
                background: tab.value === currentPage ? '#1ABB9C' : 'white',
              }}
              disabled={param && currentPage !== tab.value}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
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
          <TabPanel value={currentPage}>
            {renderComponent[currentPage as keyof typeof renderComponent]}
          </TabPanel>
        )}
      </Tabs>
    </>
  );
}
