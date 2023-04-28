import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import LanIcon from '@mui/icons-material/Lan';
import StorageIcon from '@mui/icons-material/Storage';
import PluginBox from '../Components/PluginBox';
import InfoBox from '../Components/InfoBox';
import { GET } from '../Helpers/ApiHelpers';

// Define the container for the three boxes
const BoxContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '1rem',
});

// Example usage
const icon1 = (
  <span>
    <InfoIcon />
  </span>
);
const name1 = 'NODE INFO';
const keyValues1 = [
  { key: 'Host Name', value: 'dazzling-ocean-1234.example.com' },
  { key: 'Tag Line', value: 'Value 2' },
  { key: 'Version', value: 'Value 3' },
  { key: 'LUA Version', value: 'Value 4' },
  { key: 'Admin Listen', value: '["127.0.0.0:8001", "127.0.0.0:8444"]' },
];

const icon2 = (
  <span>
    <LanIcon />
  </span>
);
const name2 = 'CONNECTIONS';
const keyValues2 = [
  { key: 'Active', value: '4' },
  { key: 'Reading', value: '0' },
  { key: 'Writing', value: '1' },
  { key: 'Waiting', value: '3' },
  { key: 'Total Requests', value: '77k+' },
];

const icon3 = (
  <span>
    <StorageIcon />
  </span>
);
const name3 = 'DATABASE INFO';
const keyValues3 = [
  { key: 'DBMS', value: 'postgres' },
  { key: 'Host', value: 'mydatabase.abcdefghijk.us-west-2.rds.amazonaws.com' },
  { key: 'Database', value: 'kong_api_gateway' },
  { key: 'User', value: 'kong_api_gateway' },
  { key: 'Port', value: '5432' },
];

export const Dashboard = (): JSX.Element => {
  const [apiData, setApiData] = useState<any>({});
  const [infoData, setInfoData] = useState<any>([]);

  // Use useEffect to fetch API data on component mount
  useEffect(() => {
    async function getData() {
      const result = await GET({ url: 'https://localhost:8001/' });
      setApiData(result.data);
    }
    getData();
  }, []);

  // Use useEffect to update the infoData state after apiData has changed
  useEffect(() => {
    const data = [
      { key: 'Host Name', value: apiData.hostname },
      { key: 'Tag Line', value: apiData.tagline },
      { key: 'Version', value: apiData.version },
      { key: 'LUA Version', value: apiData.lua_version },
      { key: 'Admin Listen', value: apiData.lua_version },
    ];
    setInfoData(data);
  }, [apiData]);
  return (
    <Box>
      <BoxContainer>
        <InfoBox icon={icon1} name={name1} keyValues={infoData} />
        <InfoBox icon={icon2} name={name2} keyValues={keyValues2} />
        <InfoBox icon={icon3} name={name3} keyValues={keyValues3} />
      </BoxContainer>
      <br />
      <br />
      <PluginBox />
    </Box>
  );
};
