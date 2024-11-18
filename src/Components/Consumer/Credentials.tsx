/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Divider,
  Tab,
  TabList,
  TabPanel,
  tabClasses,
  Tabs,
} from '@mui/joy';
import React, { useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CodeIcon from '@mui/icons-material/Code';
import AddIcon from '@mui/icons-material/Add';
import SecurityIcon from '@mui/icons-material/Security';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getCurrentPagePluginData } from '../../Actions/pluginActions';
import {
  BASE_API_URL,
  CREDS_SCHEMA,
  tableHeadersCreds,
} from '../../Shared/constants';
import Spinner from '../Features/spinner/Spinner';
import {
  getCurrentServiceData,
  getCurrentServiceRouteData,
} from '../../Actions/serviceActions';
import { toastDisable } from '../../Actions/toastActions';
import MiniPageHeader from '../Features/MiniPageHeader';
import { SnackBarAlert } from '../Features/SnackBarAlert';
import BasicTable from './Table';
import Editor from '../Features/Editor';
import { ModalForm } from '../Features/ModalForm';

type getCredsEditorProps = {
  page: string;
  formData: any;
  setFormData: any;
};

const GetCredsEditor = ({
  page,
  formData,
  setFormData,
}: getCredsEditorProps): JSX.Element => {
  switch (page) {
    case 'basic-auth': {
      return (
        <Editor
          content={CREDS_SCHEMA['basic-auth']}
          textFields={CREDS_SCHEMA['basic-auth'].textFields}
          handleOnCancel={() => {}}
          handleOnSubmit={() => {}}
          formData={formData}
          setFormData={setFormData}
          requiredCancel
          submitText="Submit"
        />
      );
    }
    case 'api-key': {
      return (
        <Editor
          content={CREDS_SCHEMA['key-auth']}
          textFields={CREDS_SCHEMA['key-auth'].textFields}
          handleOnCancel={() => {}}
          handleOnSubmit={() => {}}
          formData={formData}
          setFormData={setFormData}
          requiredCancel
          submitText="Submit"
        />
      );
    }
    case 'hmac': {
      return (
        <Editor
          content={CREDS_SCHEMA['hmac-auth']}
          textFields={CREDS_SCHEMA['hmac-auth'].textFields}
          handleOnCancel={() => {}}
          handleOnSubmit={() => {}}
          formData={formData}
          setFormData={setFormData}
          requiredCancel
          submitText="Submit"
        />
      );
    }
    case 'oauth2': {
      return (
        <Editor
          content={CREDS_SCHEMA.oauth2}
          textFields={CREDS_SCHEMA.oauth2.textFields}
          handleOnCancel={() => {}}
          handleOnSubmit={() => {}}
          formData={formData}
          setFormData={setFormData}
          requiredCancel
          submitText="Submit"
        />
      );
    }
    case 'jwt': {
      return (
        <Editor
          content={CREDS_SCHEMA.jwt}
          textFields={CREDS_SCHEMA.jwt.textFields}
          handleOnCancel={() => {}}
          handleOnSubmit={() => {}}
          formData={formData}
          setFormData={setFormData}
          requiredCancel
          submitText="Submit"
        />
      );
    }
    default:
      return <div />;
  }
};

const Credentials = (): JSX.Element => {
  const { search } = useLocation();

  const dispatch = useDispatch();

  const { credentials, currentConsumerData } = useSelector(
    (state: any) => state.consumerReducer
  );

  const [formData, setFormData] = React.useState({});

  const { isOpen, toastMessage } = useSelector(
    (state: any) => state.toastReducer
  );

  const query = new URLSearchParams(search);

  const param = query.get('newId') === 'true';

  const loadingData = useSelector((state: any) => state.loadingData);
  const list: any = {
    'basic-auth': {
      value: 'BASIC AUTH',
      icon: <PersonIcon />,
      comp: (
        <BasicTable
          headers={tableHeadersCreds['basic-auth']}
          values={credentials['basic-auth'] && credentials['basic-auth'].data}
        />
      ),
    },
    'api-key': {
      value: 'API KEY',
      icon: <VpnKeyIcon />,
      comp: (
        <BasicTable
          headers={tableHeadersCreds['api-key']}
          values={credentials['key-auth'] && credentials['key-auth'].data}
        />
      ),
    },
    hmac: {
      value: 'HMAC',
      icon: <CodeIcon />,
      comp: (
        <BasicTable
          headers={tableHeadersCreds['hmac-auth']}
          values={credentials['hmac-auth'] && credentials['hmac-auth'].data}
        />
      ),
    },
    oauth2: {
      value: 'OAUTH2',
      icon: <SecurityIcon />,
      comp: (
        <BasicTable
          headers={tableHeadersCreds.oauth2}
          values={credentials.oauth2 && credentials.oauth2.data}
        />
      ),
    },
    jwt: {
      value: 'JWT',
      icon: <FingerprintIcon />,
      comp: (
        <BasicTable
          headers={tableHeadersCreds['basic-auth']}
          values={credentials['basic-auth'] && credentials['basic-auth'].data}
        />
      ),
    },
  };
  const headers: any = Object.keys(list);
  const [currentPage, setCurrentPage] = React.useState(list[headers[0]]);

  const [openModal, setOpenModal] = React.useState(false);
  return (
    <Box sx={{ width: '1250px', margin: 'auto' }}>
      <>
        <SnackBarAlert
          open={isOpen}
          message={toastMessage.message}
          severity={toastMessage.severity}
          handleClose={() => {
            dispatch(toastDisable());
          }}
        />
        <Divider />
        <Tabs
          defaultValue={0}
          sx={{
            width: '1250px',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          orientation="vertical"
          onChange={(_event, value) => {
            if (!param) {
              setCurrentPage(list[headers[value as number] as string]);
            }
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
            {Object.entries(list).map(([key, tab, index]: any) => (
              <Tab
                value={index}
                sx={{
                  width: '300px',
                }}
                variant="plain"
                disableIndicator
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
                  <div>{tab.value}</div>
                </Box>
              </Tab>
            ))}
          </TabList>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <MiniPageHeader
              header={`<b>${currentPage.value}</b>`}
              icon={currentPage.icon}
              button={
                <Button
                  sx={{ height: 'match-content', bgcolor: '#1ABB9C' }}
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <AddIcon />
                  {`CREATE ${currentPage.value}`}
                </Button>
              }
              style={{
                bgcolor: '#EDEDED',
                padding: '15px',
                width: '940px',
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            />
            {loadingData ? (
              <Spinner />
            ) : (
              Object.keys(list).map((tab: any, index: any) => (
                <TabPanel value={index}>{list[tab].comp}</TabPanel>
              ))
            )}
          </Box>
        </Tabs>
      </>
      {openModal && (
        <ModalForm
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          serviceName={`Create ${currentPage.value} for ${currentConsumerData.username}`}
          component={
            <GetCredsEditor
              page={currentPage.value.toLowerCase().replaceAll(' ', '-')}
              formData={formData}
              setFormData={setFormData}
            />
          }
        />
      )}
    </Box>
  );
};
export default Credentials;
