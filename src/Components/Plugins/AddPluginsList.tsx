/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Button, Tooltip } from '@mui/joy';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalForm } from '../Features/ModalForm';
import Editor from '../Features/Editor';
import { BASE_API_URL, pluginDescriptions } from '../../Shared/constants';
import { GET } from '../../Helpers/ApiHelpers';
import { postCurrentPluginData } from '../../Actions/pluginActions';

type AddPluginsListProps = {
  navBarValueList: any;
  currentPage: any;
  showType: string;
  nested: boolean;
};

export const AddPluginsList = ({
  navBarValueList,
  currentPage,
  showType,
  nested,
}: AddPluginsListProps): JSX.Element => {
  const [modalOpen, setModalOpen] = React.useState<any>(false);
  const [formHeader, setFormHeader] = React.useState<string>('ADD BASIC AUTH');
  const [headerDescription, setHeaderDescription] = React.useState<string>('');
  const [toggleValues, setToggleValues] = React.useState<any>([]);
  const [form, setForm] = React.useState<any>([]);
  const [formData, setFormData] = React.useState<any>({});
  const { dashboardResultReducer } = useSelector(
    (state: any) => state.dashboardReducer
  );

  const constructFormData = (formLabel: any, object: any): void => {
    const consumerId: any = {
      key: 'consumer',
      help: 'The CONSUMER ID that this plugin configuration will target. This value can only be used if authentication has been enabled so that the system can identify the user making the request. If left blank, the plugin will be applied to all consumers.',
      type: 'text',
      option: [],
      between: [],
    };
    const final = [];
    if (!nested) final.push(consumerId);
    const default_values: any = { consumer: '' };
    const toggle_values: any = [];
    Object.keys(object).forEach((key) => {
      const values: any = {
        key: '',
        option: [],
        help: '',
        type: '',
        between: [],
        fields: [],
      };
      const valueKey = key.replaceAll('_', ' ');
      values.key = valueKey;
      default_values[valueKey] =
        object[key].default !== undefined ? object[key].default : '';

      if (object[key].type !== 'array') {
        values.option = object[key].elements ? object[key].elements.one_of : [];
      }
      values.option = object[key].one_of ? object[key].one_of : [];
      values.help = object[key].help || '';
      if (object[key].type === 'string')
        values.type = !object[key].one_of ? 'text' : 'dropdown';
      else if (object[key].type === 'array') values.type = 'list';
      else if (object[key].type === 'set') values.type = 'dropdown';
      else if (object[key].type === 'record') {
        default_values[valueKey] = {};
        const recordToggleValues: any = { [valueKey]: {} };
        const finalFields: any = [];
        values.type = 'record';
        object[key].fields.forEach((records: any) => {
          Object.entries(records).forEach(([objectRecordKey, record]: any) => {
            const recordValues = {
              key: '',
              option: [],
              help: '',
              type: '',
              between: [],
              fields: [],
            };
            recordToggleValues[valueKey][objectRecordKey] = [];
            recordValues.key = objectRecordKey;
            if (record.type === 'integer') recordValues.type = 'number';
            else if (record.type === 'string')
              recordValues.type = !record.one_of ? 'text' : 'dropdown';
            else if (record.type === 'array') recordValues.type = 'list';
            else if (record.type === 'set') recordValues.type = 'dropdown';
            else recordValues.type = record.type;
            recordValues.option = record.one_of ? record.one_of : [];
            if (recordValues.type === 'boolean')
              recordToggleValues[valueKey][objectRecordKey].push(
                objectRecordKey
              );
            finalFields.push(recordValues);
          });
        });
        toggle_values.push(recordToggleValues);
        values.fields = finalFields;
      }
      values.type = object[key].type;

      if (object[key].type === 'boolean') toggle_values.push(valueKey);
      values.between = object[key].between ? object[key].between : [];
      final.push(values);
    });
    setForm(final);
    setFormData(default_values);
    const toggleValuesData: any = {};
    toggle_values.forEach((toggleValue: any) => {
      if (typeof toggleValue === 'string')
        toggleValuesData[toggleValue] = default_values[toggleValue];
    });
    setToggleValues(toggleValuesData);
  };

  const getFormData = async (formLabel: any) => {
    const request = {
      url: `${BASE_API_URL}/plugins/schema/${formLabel}`,
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
    const { data }: any = await GET(request);
    const objectData: any = {};
    data.fields.forEach((field: any) => {
      Object.keys(field).forEach((key: any) => {
        if (
          pluginDescriptions[formLabel] &&
          pluginDescriptions[formLabel][key]
        ) {
          // eslint-disable-next-line no-param-reassign
          field[key] = {
            ...field[key],
            ...pluginDescriptions[formLabel][key],
          };
        }
        objectData[key] = field[key];
      });
    });
    setHeaderDescription(
      pluginDescriptions[formLabel] &&
        pluginDescriptions[formLabel].meta &&
        pluginDescriptions[formLabel].meta.description
        ? pluginDescriptions[formLabel].meta.description
        : 'Configure the plugin'
    );

    constructFormData(formLabel, objectData);
  };

  const dispatch = useDispatch();
  const handleOnCancel = (): void => {
    //
  };
  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    name: string
  ): void => {
    e.preventDefault();
    const requestPayload: any = { config: {}, name };
    Object.keys(formData).forEach((key) => {
      if (
        (typeof formData[key] === 'string' && formData[key].length !== 0) ||
        typeof formData[key] === 'number' ||
        typeof formData[key] === 'object'
      )
        requestPayload.config[key.replaceAll(' ', '_')] = formData[key];
    });
    dispatch(postCurrentPluginData(requestPayload));
  };

  return (
    <div
      style={{
        width: '1250px',
        margin: 'auto',
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <div
        style={{
          fontSize: '20px',
          gap: '8px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        {navBarValueList[currentPage].icon}
        {navBarValueList[currentPage].value}
      </div>
      <div style={{ fontSize: '14px', color: 'grey' }}>
        {navBarValueList[currentPage].description}
      </div>
      <Divider />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '25px',
        }}
      >
        {navBarValueList[currentPage].addPluginList &&
          navBarValueList[currentPage].addPluginList.map(
            (pluginType: any) =>
              (pluginType.scope === showType ||
                pluginType.scope === 'globalOrSeparate') && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '292px',
                      width: '292px',
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                      background: 'white',
                      border:
                        dashboardResultReducer.plugins.enabled_in_cluster.includes(
                          pluginType.toolTip.replaceAll(' ', '-')
                        ) && '2px solid #1ABB9C',
                    }}
                    id="plugin-box"
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '10px',
                        margin: 'auto',
                        width: '258px',
                        height: '252px',
                      }}
                    >
                      <Tooltip
                        title={pluginType.toolTip}
                        variant="soft"
                        placement="top"
                      >
                        <h3
                          style={{
                            fontSize: '20px',
                            margin: '10px 0 11.5px',
                          }}
                        >
                          {pluginType.header}
                        </h3>
                      </Tooltip>
                      <img
                        src={pluginType.image}
                        alt={pluginType.toolTip}
                        height="70px"
                        width="70px"
                      />
                      <p
                        style={{
                          textAlign: 'center',
                          fontSize: '14px',
                          textOverflow: 'ellipsis',
                          color: 'grey',
                        }}
                      >
                        {pluginType.description}
                      </p>
                    </div>
                    <Button
                      sx={{
                        background: '#1ABB9C',
                        width: '250px',
                        margin: '-30px auto auto auto',
                      }}
                      onClick={() => {
                        setFormHeader(`ADD ${pluginType.header.toUpperCase()}`);

                        getFormData(
                          pluginType.header.toLowerCase().replaceAll(' ', '-')
                        );
                        setModalOpen(true);
                      }}
                    >
                      ADD PLUGIN
                    </Button>
                  </div>

                  <ModalForm
                    open={modalOpen}
                    onClose={() => {
                      setModalOpen(false);
                      setForm([]);
                      setFormData({});
                    }}
                    serviceName={formHeader}
                    headerDescription={headerDescription}
                    component={
                      <Editor
                        content={pluginType.initialContent}
                        textFields={form}
                        handleOnCancel={handleOnCancel}
                        handleOnSubmit={(
                          e: React.FormEvent<HTMLFormElement>
                        ) => {
                          handleOnSubmit(e, pluginType.header.toLowerCase());
                        }}
                        formData={formData}
                        setFormData={setFormData}
                        requiredCancel={false}
                        submitText="ADD PLUGIN"
                      />
                    }
                  />
                </>
              )
          )}
      </div>
    </div>
  );
};
