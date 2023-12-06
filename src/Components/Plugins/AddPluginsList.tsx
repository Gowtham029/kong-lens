/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Button, Tooltip } from '@mui/joy';
import * as React from 'react';

type AddPluginsListProps = {
  navBarValueList: any;
  currentPage: any;
  showType: string;
};

export const AddPluginsList = ({
  navBarValueList,
  currentPage,
  showType,
}: AddPluginsListProps): JSX.Element => (
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '292px',
                  width: '292px',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                  background: 'white',
                }}
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
                >
                  ADD PLUGIN
                </Button>
              </div>
            )
        )}
    </div>
  </div>
);
