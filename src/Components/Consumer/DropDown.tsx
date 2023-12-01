/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Select } from '@mui/joy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RawView } from '../Features/RawView';
import { ACTION_TYPES } from '../../Shared/actionTypes';
import { ROUTE_TYPE } from '../../Shared/constants';

type DropDownProps = {
  type: string;
  rawData: any;
};

const DropDown = ({ type, rawData }: DropDownProps): JSX.Element => {
  const { showAccessibleRoutesRawView } = useSelector(
    (state: any) => state.rawViewReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRawView = (key: string, value: boolean): void => {
    dispatch({
      type: ACTION_TYPES.HANDLE_ACCESS_ROUTE_RAW_VIEW,
      payload: { key, value },
    });
  };
  const navigateTo = (routeType: any, data: any): void => {
    if (routeType === ROUTE_TYPE.SERVICE) {
      navigate(`../services/${data.id}?newId=false`);
    } else {
      navigate(`../routes/${data.id}?newId=false`);
    }
  };
  return (
    <div>
      <Select placeholder="MORE" size="sm" sx={{ width: 80 }}>
        <Button
          variant="plain"
          sx={{ color: 'black' }}
          onClick={() => handleRawView(rawData.id, true)}
        >
          <div
            style={{
              width: '120px',
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <VisibilityIcon />
            <div style={{ textAlign: 'left', width: '90px' }}>Raw View</div>
          </div>
        </Button>
        <RawView
          json={rawData}
          open={showAccessibleRoutesRawView[rawData.id] as boolean}
          onClose={() => handleRawView(rawData.id, false)}
        />
        <Button
          variant="plain"
          sx={{ color: 'black' }}
          onClick={() => {
            navigateTo(type, rawData);
          }}
        >
          <div
            style={{
              width: '120px',
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <EditIcon />
            <div style={{ textAlign: 'left', width: '90px' }}>Edit {type}</div>
          </div>
        </Button>
      </Select>
    </div>
  );
};

export default DropDown;
