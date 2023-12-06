/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DropDown from './DropDown';

type ColumnListProp = {
  dataList: [];
  type: string;
  rawData: any;
};

const ColumnList = ({
  dataList,
  type,
  rawData,
}: ColumnListProp): JSX.Element => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 100,
          gap: 10,
        }}
      >
        {dataList.map((data: any) => (
          <div style={{ color: data.color }}>{data.value}</div>
        ))}
        {type === 'Service' ? (
          <div>
            <DropDown type={type} rawData={rawData} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ColumnList;
