import { withStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';

const MyTableCell = withStyles(theme => ({
  root: {
    fontSize: theme.typography.fontSize,
    borderBottomColor: theme.palette.border.borderEf,
  },
}))(TableCell);

export default MyTableCell;
