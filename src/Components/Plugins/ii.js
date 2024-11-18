/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Select, Input, Option, Box } from '@mui/joy';
import { TagsInput } from 'react-tag-input-component';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ToggleComponent } from './ToggleComponent';

type TextFieldsProps = {
  text: any;
  formData: any;
  setFormData: any;
  content: any;
};

const setOptionComponent = (option: any): JSX.Element => {
  return option.map((value: any) => <Option value={value}>{value}</Option>);
};

export const GetTextFields = ({
  text,
  formData,
  setFormData,
  content,
}: TextFieldsProps): JSX.Element => {
  const handleOnChange = (e: {
    preventDefault: any;
    target: { name: any; type: any; value: any };
  }): void => {
    e.preventDefault;
    const { name, type, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === 'number'
          ? parseInt(value === undefined || Number.isNaN(value) ? 0 : value, 10)
          : value,
    });
  };

  const handleRecordOnChange = (
    e: {
      preventDefault: any;
      target: { name: any; type: any; value: any };
    },
    key: any
  ): void => {
    e.preventDefault;
    const { name, type, value } = e.target;

    setFormData({
      ...formData,
      [key]: {
        ...formData[key],
        [name]:
          type === 'number'
            ? parseInt(
                value === undefined || Number.isNaN(value) ? 0 : value,
                10
              )
            : value,
      },
    });
  };

  const handleToggle = (key: string): void => {
    setFormData({
      ...formData,
      [key]: !formData[key],
    });
  };

  const handleRecordToggle = (key: string, nestedKey: string): void => {
    setFormData({
      ...formData,
      [key]: {
        ...formData[key],
        [nestedKey]: !formData[key],
      },
    });
  };

  const handleListChange = (
    key: keyof typeof content,
    value: string[]
  ): void => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleRecordValueChange = (
    key: keyof typeof content,
    nestedKey: keyof typeof content,
    value: any
  ): void => {
    setFormData({
      ...formData,
      [key]: {
        ...formData[key],
        [nestedKey]: value,
      },
    });
  };

  const handlePathHandling = (value: any, key: any): void => {
    setFormData({ ...formData, [key]: value });
  };

  const getRecordFields  = (field: any): JSX.Element=>{
     switch (field.type) {
                    case 'boolean':
                      return (
                        <div
                          style={{
                            flexDirection: 'row',
                            display: 'flex',
                          }}
                        >
                          <div>
                            <ArrowForwardIosIcon sx={{ width: 30 }} />
                            {field.key}
                          </div>
                          <div style={{ display: 'block' }}>
                            <ToggleComponent
                              yes={
                                formData[text.key as keyof typeof content][
                                  field.key as keyof typeof content
                                ]
                              }
                              onChange={() =>
                                handleRecordToggle(text.key, field.key)
                              }
                            />
                          </div>
                        </div>
                      );
                    case 'list':
                      return (
                        <div
                          style={{
                            flexDirection: 'row',
                            display: 'flex',
                          }}
                        >
                          <div>
                            <ArrowForwardIosIcon sx={{ width: 30 }} />
                            {field.key}
                          </div>
                          <div style={{ maxWidth: 800 }}>
                            <TagsInput
                              value={
                                formData[text.key as keyof typeof content][
                                  field.key as keyof typeof content
                                ]
                              }
                              onChange={(e) => {
                                handleRecordValueChange(
                                  text.key as keyof typeof content,
                                  field.key as keyof typeof content,
                                  e
                                );
                              }}
                            />
                          </div>
                        </div>
                      );
                    case 'dropdown':
                      return (
                        <div
                          style={{
                            flexDirection: 'row',
                            display: 'flex',
                          }}
                        >
                          <div>
                            <ArrowForwardIosIcon sx={{ width: 30 }} />
                            {field.key}
                          </div>
                          <Select
                            sx={{ maxWidth: 800 }}
                            defaultValue={
                              formData[text.key as keyof typeof content][
                                field.key as keyof typeof content
                              ]
                            }
                            value={
                              formData[text.key as keyof typeof content][
                                field.key as keyof typeof content
                              ]
                            }
                            onChange={(
                              _event: React.SyntheticEvent | null,
                              newValue: string | null
                            ) =>
                              handleRecordValueChange(
                                text.key,
                                field.key,
                                newValue
                              )
                            }
                          >
                            {setOptionComponent(field.option)}
                          </Select>
                        </div>
                      );

                    default:
                      return (
                        <div
                          style={{
                            flexDirection: 'row',
                            display: 'flex',
                          }}
                        >
                          <div>
                            <ArrowForwardIosIcon sx={{ width: 30 }} />
                            {field.key}
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              maxWidth: 800,
                            }}
                          >
                            <input
                              style={{
                                padding: '10px',
                                border: 'none',
                                backgroundColor: '#f2f2f2',
                                borderBottom: '2px solid grey',
                                outline: 'none',
                              }}
                               onChange={(e) =>
                                handleRecordOnChange(e, text.key)
                              }
                              type={field.type}
                              name={field.key}
                              value={
                                formData[text.key as keyof typeof content][
                                  field.key as keyof typeof content
                                ]
                              }
                            />
                            <Input
                              variant="soft"
                              slotProps={{
                                input: {
                                  min: `${
                                    field.between[0] ? field.between[0] : ''
                                  }`,
                                  max: `${
                                    field.between[1] ? field.between[1] : ''
                                  }`,
                                },
                              }}
                              type={field.type}
                              name={field.key}
                              value={
                                formData[text.key as keyof typeof content][
                                  field.key as keyof typeof content
                                ]
                              }
                              onChange={(e) =>
                                handleRecordOnChange(e, text.key)
                              }
                            />
                          </div>
                        </div>
                      );
                  }
  }

  switch (text.type) {
    case 'boolean':
      return (
        <div style={{ display: 'block' }}>
          <ToggleComponent
            yes={formData[text.key as keyof typeof content]}
            onChange={() => handleToggle(text.key)}
          />
        </div>
      );
    case 'list':
      return (
        <>
          <div style={{ maxWidth: 800 }}>
            <TagsInput
              value={formData[text.key as keyof typeof content]}
              onChange={(e) => {
                handleListChange(text.key as keyof typeof content, e);
              }}
            />
          </div>
          <span
            style={{
              fontSize: '13px',
              color: '#B2B2B2',
              maxWidth: 800,
              display: 'flex',
            }}
          >
            Tip: Press&nbsp;
            <span id="tip">Enter</span>&nbsp;to accept a value.
          </span>
        </>
      );
    case 'dropdown':
      return (
        <Select
          sx={{ maxWidth: 800 }}
          defaultValue={formData[text.key as keyof typeof content]}
          value={formData[text.key as keyof typeof content]}
          onChange={(
            _event: React.SyntheticEvent | null,
            newValue: string | null
          ) => handlePathHandling(newValue, text.key)}
        >
          {setOptionComponent(text.option)}
        </Select>
      );
    case 'record':
      return (
        <Box sx={{ width: '100%', height: 'max-content', maxWidth: '800px' }}>
          <div
            style={{
              width: '60%',
              backgroundColor: '#EDEDED',
              borderRadius: '10px',
            }}
          >
            <div style={{ padding: '10px 0' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                {text.fields.map((field: any) => {
                  return (
                <div style={{ padding: '10px 0' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding: '10px 20px',
                      }}
                    >
                      <ArrowForwardIosIcon sx={{ width: 30 }} />

                      {field.key}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      padding: '20 0px',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    {getRecordFields(field)}
                  </div>
                </div>
              );
                })}
              </div>
            </div>
          </div>
        </Box>
      );
    default:
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 800,
          }}
        >
          <Input
            sx={{
              borderRadius: '5px',
            }}
            slotProps={{
              input: {
                min: `${text.between[0] ? text.between[0] : ''}`,
                max: `${text.between[1] ? text.between[1] : ''}`,
              },
            }}
            type={text.type}
            name={text.key}
            value={formData[text.key as keyof typeof content]}
            onChange={handleOnChange}
          />
        </div>
      );
  }
};
