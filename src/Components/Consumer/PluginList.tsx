/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { TagComponent } from '../Features/TagComponent';

type pluginListProp = {
  pluginList: any[];
};

const PluginList = ({ pluginList }: pluginListProp): JSX.Element => {
  return (
    <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
      <List role="menubar" orientation="vertical">
        {pluginList.map((plugin) => {
          return (
            <ListItem role="none">
              <TagComponent tag={plugin.name} isList={false} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default PluginList;
