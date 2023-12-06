/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { CssBaseline, Box } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, Breadcrumbs, Typography, TabList, Tab, Tabs } from '@mui/joy';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Traffic as TrafficIcon,
  CloudSync as CloudSyncIcon,
  Analytics as AnalyticsIcon,
  Transform as TransformIcon,
  ContentPaste as ContentPasteIcon,
  Portrait as PortraitIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { SnackBarAlert } from '../Components/Features/SnackBarAlert';
import PageHeader from '../Components/Features/PageHeader';
import { toastDisable } from '../Actions/toastActions';
import { addPlugins } from '../Shared/constants';
import { AddPluginsList } from '../Components/Plugins/AddPluginsList';

const navigationComp = (navigate: any): JSX.Element => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        variant="plain"
        onClick={() => navigate(-1)}
        sx={{
          '&:hover': {
            cursor: 'pointer',
            border: 'none',
            lineHeight: '-5',
            color: 'none',
          },
        }}
      >
        plugins
      </Link>
      <Typography sx={{ color: 'grey' }}>add</Typography>
    </Breadcrumbs>
  );
};

export default function GlobalPlugin(): JSX.Element {
  const dispatch = useDispatch();

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const navigate = useNavigate();
  const [showInfo, setShowInfo] = React.useState(true);

  const navBarValueList: any = {
    Authentication: {
      value: 'Authentication',
      icon: <PersonIcon />,
      description:
        'Protect your services with additional authentication layers',
      addPluginList: addPlugins.Authentication,
    },
    Security: {
      value: 'Security',
      icon: <SecurityIcon />,
      description: 'Protect your services with additional security layers',
      addPluginList: addPlugins.Security,
    },
    'Traffic Control': {
      value: 'Traffic Control',
      icon: <TrafficIcon />,
      description:
        'Manage, throttle and restrict inbound and outbound API traffic',
      addPluginList: addPlugins.TrafficControl,
    },
    Serverless: {
      value: 'Serverless',
      icon: <CloudSyncIcon />,
      description:
        'Invoke serverless functions in combination with other plugins',
      addPluginList: addPlugins.Serverless,
    },
    'Analytics & Monitoring': {
      value: 'Analytics & Monitoring',
      icon: <AnalyticsIcon />,
      description:
        'Visualize, inspect and monitor APIs and microservices traffic',
      addPluginList: addPlugins.AnalyticsAndMonitoring,
    },
    Tranformation: {
      value: 'Tranformation',
      icon: <TransformIcon />,
      description: 'Transform request and responses on the fly on Kong',
      addPluginList: addPlugins.Transformation,
    },
    Logging: {
      value: 'Logging',
      icon: <ContentPasteIcon />,
      description:
        'Log requests and response data using the best transport for your infrastructure',
      addPluginList: addPlugins.Logging,
    },
    Other: {
      value: 'Other',
      icon: <PortraitIcon />,
      description: 'Other Plugins',
      addPluginList: addPlugins.Others,
    },
  };
  const [currentPage, setCurrentPage] = React.useState(
    navBarValueList.Authentication.value
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}
      >
        <CssBaseline />

        <PageHeader
          header="Add Global Plugins "
          description=""
          component={navigationComp(navigate)}
        />
        {showInfo && (
          <div
            style={{
              backgroundColor: '#E1EEF7',
              padding: '15px',
              width: '1250px',
              height: '80px',
              margin: 'auto',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '3px',
              lineHeight: '5px',
              fontSize: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#4B7BA6' }}>
                  Plugins added in this section will be applied Globally.
                </p>
                <p style={{ color: '#7A9DBE' }}>
                  - If you need to add plugins to a specific Service or Route,
                  you can do it in the respective section.
                </p>{' '}
                <p style={{ color: '#7A9DBE' }}>
                  - If you need to add plugins to a specific Consumer, you can
                  do it in the respective Consumer&apos;s page.
                </p>
              </div>
              <CloseIcon
                onClick={() => setShowInfo(false)}
                sx={{
                  cursor: 'pointer',
                  color: '#7A9DBE',
                  '&:hover': {
                    color: 'black',
                  },
                }}
              />
            </div>
          </div>
        )}
        <Tabs
          defaultValue={currentPage}
          sx={{
            width: '1250px',
            margin: 'auto',
            display: 'flex',
            background: '#F9F9F9',
            justifyContent: 'space-between',
          }}
          orientation="horizontal"
          onChange={(event, value) => {
            setCurrentPage(value as string);
          }}
        >
          <TabList variant="plain">
            {Object.values(navBarValueList).map((tab: any) => (
              <Tab
                value={tab.value}
                sx={{
                  background: tab.value === currentPage ? '#1ABB9C' : '#F9F9F9',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '13px',
                    color: tab.value === currentPage ? 'white' : '#4B7BA6',
                  }}
                >
                  <div>{tab.value}</div>
                </Box>
              </Tab>
            ))}
          </TabList>
        </Tabs>
        <AddPluginsList
          navBarValueList={navBarValueList}
          currentPage={currentPage}
          showType="global"
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
    </>
  );
}
