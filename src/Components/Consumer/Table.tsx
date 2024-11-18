/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Table from '@mui/joy/Table';
import { Button } from '@mui/joy';
import { Delete } from '@mui/icons-material';
import { DateTimeFormat } from '../../Utils/DateTimeFormatter';

type TableProps = {
  headers: any[];
  values: any;
};

export default function BasicTable({
  headers,
  values,
}: TableProps): JSX.Element {
  console.log('values', values);
  return (
    <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: '40px' }}>#</th>
          {Object.values(headers).map((header: any) => {
            return <th style={{ width: header.width }}>{header.header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {values.map((row: any, index: number) => {
          return (
            <tr>
              <td>{index + 1}</td>
              {Object.keys(headers).map((header: any) => {
                return (
                  <td>
                    {header === 'created_at' ? (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {DateTimeFormat(row[header])}
                        <Button>
                          <Delete />
                          DELETE
                        </Button>
                      </div>
                    ) : (
                      <div>{row[header]}</div>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
