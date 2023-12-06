/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import RowComponent from './RowComponent';
import DropDown from './DropDown';

type AccesibleRoutesProp = {
  collatedData: Array<any>;
};

const getCommaSepValue = (list: any): any => {
  let result = '';
  if (list.length)
    list.forEach((value: any) => {
      result += `${value},`;
    });
  return result.substring(0, result.length - 1);
};

const colorCode = ['#000000', '#808080', '#454545', '#FF0000'];

const getMappedComponent = (service: { routes: any[] }): any => {
  if (service.routes) {
    const mappedData: React.JSX.Element[] = [];
    service.routes.forEach((route: any) => {
      const routeList = [{ value: route.name, color: colorCode[0] }];
      if (route.hosts && route.hosts.length)
        routeList.push({
          value: getCommaSepValue(route.hosts),
          color: colorCode[1],
        });
      if (route.paths && route.paths.length)
        routeList.push({
          value: getCommaSepValue(route.paths),
          color: colorCode[2],
        });
      if (route.methods && route.methods.length)
        routeList.push({
          value: getCommaSepValue(route.methods),
          color: colorCode[3],
        });
      mappedData.push(
        <RowComponent
          style={{
            justifyContent: 'space-between',
            padding: '5px',
          }}
          component={[
            <DropDown
              type="Route"
              rawData={{ ...route, service: { id: route.service.id } }}
            />,
          ]}
          backgroundColor="white"
          service={routeList}
          type="Route"
          rawData={route}
        />
      );
    });
    return mappedData;
  }
  return [];
};

const AccesibleRoutes = ({
  collatedData,
}: AccesibleRoutesProp): JSX.Element => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const actualLength = collatedData.length;
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {collatedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell
                      key={row.id}
                      align="left"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                        }}
                      >
                        <RowComponent
                          style={{
                            justifyContent: 'space-evenly',
                            padding: '10px',
                          }}
                          component={getMappedComponent(row)}
                          service={[
                            { value: row.name, color: colorCode[0] },
                            {
                              value: row.host ? row.host : '',
                              color: colorCode[1],
                            },
                          ]}
                          type="Service"
                          rawData={row}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={actualLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AccesibleRoutes;
