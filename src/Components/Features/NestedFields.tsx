/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Select, Input, Option, Box } from '@mui/joy';
import { TagsInput } from 'react-tag-input-component';
import { ToggleComponent } from './ToggleComponent';

type TextFieldsProps = {
  text: any;
  formData: any;
  setFormData: any;
  content: any;
  toggleValues: any;
};

const setOptionComponent = (option: any): JSX.Element => {
  return option.map((value: any) => <Option value={value}>{value}</Option>);
};

export const NestedFields = ({
  text,
  formData,
  setFormData,
  content,
  toggleValues,
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

  const handleToggle = (key: string): void => {
    setFormData({
      ...formData,
      [key]: toggleValues[key as keyof typeof toggleValues],
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

  const handlePathHandling = (value: any, key: any): void => {
    setFormData({ ...formData, [key]: value });
  };
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
