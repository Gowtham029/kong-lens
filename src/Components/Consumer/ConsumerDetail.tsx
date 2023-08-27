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
import PageHeader from '../Features/PageHeader';
import { navBarProps } from '../../interfaces';
import { getCurrentConsumerData } from '../../Actions/consumerActions';
import ConsumerEditor from './ConsumerEditor';
import { CONSUMER_TEXT_FIELDS } from '../../Shared/constants';
import Spinner from '../Features/spinner/Spinner';
import Routes from '../../Pages/Routes';
import AccessibleRoutes from './AccessibleRoutes';

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
    'Accessible Routes': <AccessibleRoutes />,
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
