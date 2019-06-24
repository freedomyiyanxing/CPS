import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const MyTableCell = withStyles(theme => ({
  root: {
    fontSize: theme.typography.fontSize,
    borderBottomColor: theme.palette.border.borderEf,
  },
}))(TableCell);

const useStyle = makeStyles(theme => ({
  tableHeader: {
    background: theme.palette.primary[100],
  },
  tableBody: {
    border: `1px solid ${theme.palette.border.borderEf}`,
    borderBottom: 'none',
  },
}));

const MyTable = (props) => {
  const { headers, rows } = props;
  const classes = useStyle();
  // 数组中第一个元素必须是对象, 获取对象中的所有key 返回一个数组
  const rowsKey = Object.keys(rows[0]);
  return (
    <Table className={classes.table}>
      <TableHead className={classes.tableHeader}>
        <TableRow>
          {
            headers.map(header => (
              <MyTableCell key={header}>{header}</MyTableCell>
            ))
          }
        </TableRow>
      </TableHead>
      <TableBody className={classes.tableBody}>
        {rows.map(row => (
          <TableRow key={row.id} className={row.id}>
            {
              rowsKey.map(item => (
                item !== 'id'
                  ? <MyTableCell key={item}>{row[item]}</MyTableCell>
                  : null
              ))
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

MyTable.propTypes = {
  headers: PropTypes.objectOf(PropTypes.array).isRequired,
  rows: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default MyTable;
