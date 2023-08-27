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

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [{ id: 'name', label: 'Name', minWidth: 170 }];

const rows = [
  { id: '1', element: <div>hello1</div> },
  { id: '1', element: <div>hello2</div> },
];

const AccesibleRoutes = (): JSX.Element => {
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

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
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
                              component={[
                                <RowComponent
                                  style={{
                                    justifyContent: 'space-between',
                                    padding: '5px',
                                  }}
                                  component={[<DropDown />]}
                                  backgroundColor="white"
                                />,
                                <RowComponent
                                  style={{
                                    justifyContent: 'space-between',
                                    padding: '5px',
                                  }}
                                  component={[<DropDown />]}
                                  isSingleComponent
                                  backgroundColor="white"
                                />,
                                <RowComponent
                                  style={{
                                    justifyContent: 'space-between',
                                    padding: '5px',
                                  }}
                                  component={[<DropDown />]}
                                  isSingleComponent
                                  backgroundColor="white"
                                />,
                              ]}
                            />
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AccesibleRoutes;
