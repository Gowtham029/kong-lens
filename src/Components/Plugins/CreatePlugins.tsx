/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {
  ModalClose,
  Typography,
  Modal,
  ModalOverflow,
  ModalDialog,
  Divider,
  TabList,
  Tabs,
  Tab,
  Box,
} from '@mui/joy';
import {
  Traffic as TrafficIcon,
  CloudSync as CloudSyncIcon,
  Analytics as AnalyticsIcon,
  Transform as TransformIcon,
  ContentPaste as ContentPasteIcon,
  Portrait as PortraitIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { AddPluginsList } from './AddPluginsList';
import { ModalOpenCLoseProps } from '../../interfaces';
import { addPlugins } from '../../Shared/constants';

export const CreatePlugins = ({
  open,
  onClose,
}: ModalOpenCLoseProps): JSX.Element => {
  const navBarValueList: any = {
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
    navBarValueList.Security.value
  );
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
    >
      <ModalOverflow>
        <ModalDialog
          aria-labelledby="modal-dialog-overflow"
          sx={{
            maxWidth: 'auto',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            border: '3px solid #1ABB9C',
          }}
        >
          <ModalClose />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            ADD PLUGIN
          </Typography>
          <Divider />
          <br />
          <Tabs
            defaultValue={currentPage}
            sx={{
              width: '1250px',
              margin: 'auto',
              display: 'flex',
              gap: '50px',
              justifyContent: 'space-between',
            }}
            orientation="vertical"
            onChange={(event, value) => {
              setCurrentPage(value as string);
            }}
          >
            <TabList variant="plain">
              {Object.values(navBarValueList).map((tab: any) => (
                <Tab
                  value={tab.value}
                  sx={{
                    background:
                      tab.value === currentPage ? '#1ABB9C' : '#F9F9F9',
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
            <AddPluginsList
              navBarValueList={navBarValueList}
              currentPage={currentPage}
              showType="separate"
            />
          </Tabs>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};
