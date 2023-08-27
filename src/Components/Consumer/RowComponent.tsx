/* eslint-disable react/require-default-props */
import { Tooltip, Button } from '@mui/joy';
import React from 'react';
import ArrowPointer from './ArrowPointer';
import ColumnList from './ColumnList';

type prop = {
  component: JSX.Element[];
  isSingleComponent?: boolean;
  backgroundColor?: string;
  style?: style;
};

type style = {
  justifyContent?: string;
  width?: string;
  padding?: string;
};

const RowComponent = ({
  component,
  isSingleComponent,
  backgroundColor,
  style,
}: prop): JSX.Element => {
  return (
    <div>
      <div>
        <div
          style={{
            backgroundColor: backgroundColor || '#f0eceb',
            borderRadius: 10,
            padding: style?.padding,
            display: 'flex',
            width: style?.width,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              gap: '30px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: style?.justifyContent || 'space-between',
            }}
          >
            <ColumnList />
            <ArrowPointer text="Plugins" />
            <Tooltip
              title="Add a service plugin that only targets this consumer"
              variant="soft"
              placement="top"
              sx={{ width: '150px', fontSize: 12 }}
            >
              <Button variant="plain" sx={{ width: 'fix-content' }}>
                + ADD PLUGIN
              </Button>
            </Tooltip>
          </div>
          <div
            style={{
              alignItems: 'center',
              margin: 'auto 0 auto 0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <ArrowPointer text="Routes" />
              <div
                style={{
                  gap: 10,
                  display: 'flex',
                  flexDirection: isSingleComponent ? 'row' : 'column',
                }}
              >
                {isSingleComponent
                  ? component[0]
                  : component.map((comp, index) => {
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={index}>{comp}</div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RowComponent;
